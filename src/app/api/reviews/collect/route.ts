import { NextRequest, NextResponse } from 'next/server'
import { reviewCollectionService, ReviewData, ReviewAnalysis } from '@/lib/services/review-collection-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyName = searchParams.get('company')
    const location = searchParams.get('location')
    const source = searchParams.get('source') // 'google', 'twitter', 'tabelog', 'all'
    const analyze = searchParams.get('analyze') === 'true'

    if (!companyName) {
      return NextResponse.json(
        { error: '企業名を指定してください' },
        { status: 400 }
      )
    }

    let reviews: ReviewData[] = []
    
    // ソース別にレビューを取得
    switch (source) {
      case 'google':
        reviews = await reviewCollectionService.searchGoogleReviews(companyName, location || undefined)
        break
      case 'twitter':
        reviews = await reviewCollectionService.searchTwitterReviews(companyName)
        break
      case 'tabelog':
        reviews = await reviewCollectionService.searchTabelogReviews(companyName)
        break
      case 'all':
      default:
        reviews = await reviewCollectionService.collectAllReviews(companyName, location || undefined)
        break
    }

    // 分析が要求された場合
    let analysis: ReviewAnalysis | null = null
    if (analyze && reviews.length > 0) {
      analysis = await reviewCollectionService.analyzeReviews(reviews)
    }

    return NextResponse.json({
      success: true,
      companyName,
      source: source || 'all',
      totalReviews: reviews.length,
      reviews,
      analysis,
      message: `${companyName}のレビュー・口コミを${reviews.length}件取得しました`
    })

  } catch (error) {
    console.error('Review collection API error:', error)
    return NextResponse.json(
      { 
        error: 'レビュー取得中にエラーが発生しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { companyName, location, sources = ['all'], keywords, analyzeAll = false } = body

    if (!companyName) {
      return NextResponse.json(
        { error: '企業名を指定してください' },
        { status: 400 }
      )
    }

    const results: {
      source: string
      reviews: ReviewData[]
      analysis?: ReviewAnalysis
    }[] = []

    // 複数ソースから並列取得
    for (const source of sources) {
      let reviews: ReviewData[] = []
      
      switch (source) {
        case 'google':
          reviews = await reviewCollectionService.searchGoogleReviews(companyName, location)
          break
        case 'twitter':
          reviews = await reviewCollectionService.searchTwitterReviews(companyName, keywords)
          break
        case 'tabelog':
          reviews = await reviewCollectionService.searchTabelogReviews(companyName)
          break
        case 'all':
          reviews = await reviewCollectionService.collectAllReviews(companyName, location)
          break
      }

      const result: {
        source: string
        reviews: ReviewData[]
        totalCount: number
        analysis?: ReviewAnalysis
      } = {
        source,
        reviews,
        totalCount: reviews.length
      }

      // 各ソースごとに分析
      if (analyzeAll && reviews.length > 0) {
        result.analysis = await reviewCollectionService.analyzeReviews(reviews)
      }

      results.push(result)
    }

    // 全体の統計
    const allReviews = results.flatMap(r => r.reviews)
    const overallAnalysis = analyzeAll && allReviews.length > 0 
      ? await reviewCollectionService.analyzeReviews(allReviews)
      : null

    return NextResponse.json({
      success: true,
      companyName,
      totalReviews: allReviews.length,
      results,
      overallAnalysis,
      timestamp: new Date().toISOString(),
      message: `${companyName}のレビュー・口コミを総計${allReviews.length}件取得しました`
    })

  } catch (error) {
    console.error('Bulk review collection error:', error)
    return NextResponse.json(
      { 
        error: '一括レビュー取得中にエラーが発生しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    )
  }
}