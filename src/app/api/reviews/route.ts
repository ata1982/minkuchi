import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('companyId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // クエリ条件を構築
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {}
    if (companyId) {
      where.companyId = companyId
    }

    // ソート条件を構築
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderBy: Record<string, any> = {}
    switch (sortBy) {
      case 'rating':
        orderBy.rating = sortOrder
        break
      case 'helpfulCount':
        orderBy.helpfulCount = sortOrder
        break
      case 'createdAt':
        orderBy.createdAt = sortOrder
        break
      default:
        orderBy.createdAt = 'desc'
    }

    // レビューデータを取得
    const [reviews, totalCount] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              avatar: true
            }
          },
          company: {
            select: {
              name: true,
              category: true
            }
          },
          response: true
        }
      }),
      prisma.review.count({ where })
    ])

    // データを整形
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      images: review.images ? JSON.parse(review.images) : [],
      tags: review.tags ? JSON.parse(review.tags) : [],
      helpfulCount: review.helpfulCount,
      verified: review.verified,
      createdAt: review.createdAt.toISOString(),
      user: {
        name: review.user.name,
        avatar: review.user.avatar
      },
      company: review.company,
      response: review.response && review.response.length > 0 && review.response[0] ? {
        id: review.response[0].id,
        content: review.response[0].content,
        createdAt: review.response[0].createdAt.toISOString()
      } : null
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      reviews: formattedReviews,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })

  } catch (error) {
    console.error('Reviews fetch error:', error)
    return NextResponse.json(
      { error: 'レビューデータの取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const { companyId, rating, title, content, images, tags } = await request.json()

    // バリデーション
    if (!companyId || !rating || !title || !content) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: '評価は1〜5の範囲で入力してください' },
        { status: 400 }
      )
    }

    // 企業の存在確認
    const company = await prisma.company.findUnique({
      where: { id: companyId }
    })

    if (!company) {
      return NextResponse.json(
        { error: '企業が見つかりません' },
        { status: 404 }
      )
    }

    // 既存レビューの確認（1企業につき1レビューの制限）
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        companyId: companyId
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'この企業には既にレビューを投稿済みです' },
        { status: 409 }
      )
    }

    // レビューを作成
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        companyId,
        rating,
        title,
        content,
        images: JSON.stringify(images || []),
        tags: JSON.stringify(tags || []),
        verified: false // 管理者による承認が必要
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true
          }
        }
      }
    })

    // 企業の平均評価を更新
    await updateCompanyRating(companyId)

    // ユーザーのポイントを加算
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        points: {
          increment: 50 // レビュー投稿で50ポイント
        }
      }
    })

    return NextResponse.json({
      message: 'レビューが投稿されました',
      review: {
        id: review.id,
        rating: review.rating,
        title: review.title,
        content: review.content,
        createdAt: review.createdAt.toISOString(),
        user: {
          name: review.user.name,
          avatar: review.user.avatar
        }
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Review creation error:', error)
    return NextResponse.json(
      { error: 'レビューの投稿に失敗しました' },
      { status: 500 }
    )
  }
}

// 企業の平均評価を更新
async function updateCompanyRating(companyId: string) {
  const reviews = await prisma.review.findMany({
    where: { companyId },
    select: { rating: true }
  })

  if (reviews.length > 0) {
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    
    await prisma.company.update({
      where: { id: companyId },
      data: {
        rating: Math.round(averageRating * 10) / 10, // 小数点第1位まで
        reviewCount: reviews.length
      }
    })
  }
}