import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { restaurantSearchService } from '@/lib/services/restaurant-search-service'
import { aiRegistrationService } from '@/lib/services/ai-registration-service'

// レストラン自動検索・登録API
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const { query, location = '東京', maxResults = 20, autoRegister = false } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: '検索キーワードが必要です' },
        { status: 400 }
      )
    }

    // 外部ソースからレストラン情報を検索
    const searchResults = await restaurantSearchService.searchFromMultipleSources(query, location)
    
    if (searchResults.length === 0) {
      return NextResponse.json({
        message: 'レストランが見つかりませんでした',
        restaurants: [],
        registered: 0
      })
    }

    // 結果を制限
    const limitedResults = searchResults.slice(0, maxResults)
    
    let registeredCount = 0
    const registrationResults = []

    // 自動登録が有効な場合
    if (autoRegister) {
      for (const restaurant of limitedResults) {
        try {
          // 既存の企業をチェック（重複防止）
          const existingCompany = await prisma.company.findFirst({
            where: {
              OR: [
                { name: restaurant.name },
                { address: restaurant.address }
              ]
            }
          })

          if (existingCompany) {
            registrationResults.push({
              restaurant: restaurant.name,
              status: 'skipped',
              reason: '既に登録済みです'
            })
            continue
          }

          // AIで説明文を改善
          const enhancedDescription = await aiRegistrationService.generateCompanyDescription(
            restaurant.name, 
            'restaurant'
          )

          // データベースに登録
          const newCompany = await prisma.company.create({
            data: {
              name: restaurant.name,
              category: 'restaurant',
              description: enhancedDescription || restaurant.description,
              location: extractLocationFromAddress(restaurant.address),
              address: restaurant.address,
              phone: restaurant.phone || null,
              website: restaurant.website || null,
              rating: restaurant.rating || 0,
              reviewCount: 0, // 新規登録時は0
              imageUrl: restaurant.images?.[0] || '/api/placeholder/400/300',
              images: JSON.stringify(restaurant.images || []),
              tags: JSON.stringify([
                ...(restaurant.tags || []),
                restaurant.cuisine || 'レストラン',
                restaurant.priceRange || '一般'
              ]),
              businessHours: JSON.stringify(restaurant.hours || {}),
              verified: false, // 管理者による承認が必要
              ownerId: session.user.id
            }
          })

          registeredCount++
          registrationResults.push({
            restaurant: restaurant.name,
            status: 'registered',
            companyId: newCompany.id
          })

        } catch (error) {
          console.error(`レストラン登録エラー (${restaurant.name}):`, error)
          registrationResults.push({
            restaurant: restaurant.name,
            status: 'error',
            reason: '登録中にエラーが発生しました'
          })
        }
      }
    }

    return NextResponse.json({
      message: `${limitedResults.length}件のレストランが見つかりました`,
      restaurants: limitedResults,
      registered: registeredCount,
      registrationResults: autoRegister ? registrationResults : undefined,
      searchQuery: query,
      searchLocation: location
    })

  } catch (error) {
    console.error('レストラン検索・登録エラー:', error)
    return NextResponse.json(
      { error: 'レストラン検索・登録に失敗しました' },
      { status: 500 }
    )
  }
}

// 既存のレストラン検索API（登録なし）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const location = searchParams.get('location') || '東京'
    const source = searchParams.get('source') || 'all' // google, gurunavi, tabelog, all

    if (!query) {
      return NextResponse.json(
        { error: '検索キーワードが必要です' },
        { status: 400 }
      )
    }

    let results = []

    switch (source) {
      case 'google':
        results = await restaurantSearchService.searchRestaurants(query, { location })
        break
      case 'gurunavi':
        results = await restaurantSearchService.searchGurunavi(location)
        break
      case 'tabelog':
        results = await restaurantSearchService.searchTabelog(query, location)
        break
      case 'all':
      default:
        results = await restaurantSearchService.searchFromMultipleSources(query, location)
        break
    }

    return NextResponse.json({
      restaurants: results,
      count: results.length,
      source,
      query,
      location
    })

  } catch (error) {
    console.error('レストラン検索エラー:', error)
    return NextResponse.json(
      { error: 'レストラン検索に失敗しました' },
      { status: 500 }
    )
  }
}

// 住所から地域を抽出するヘルパー関数
function extractLocationFromAddress(address: string): string {
  const patterns = [
    /東京都(.+?)区/,
    /(.+?)市/,
    /(.+?)町/,
    /(.+?)村/
  ]

  for (const pattern of patterns) {
    const match = address.match(pattern)
    if (match) {
      return match[1] + (pattern.source.includes('区') ? '区' : 
                         pattern.source.includes('市') ? '市' : 
                         pattern.source.includes('町') ? '町' : '村')
    }
  }

  return '東京都'
}