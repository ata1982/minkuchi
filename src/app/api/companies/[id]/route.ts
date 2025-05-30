import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const companyId = params.id

    // 企業詳細データを取得
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        reviews: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            user: {
              select: {
                name: true,
                image: true
              }
            },
            response: true
          }
        },
        events: {
          where: {
            endDate: {
              gte: new Date()
            }
          },
          orderBy: {
            startDate: 'asc'
          },
          take: 5
        },
        _count: {
          select: {
            reviews: true,
            events: true
          }
        }
      }
    })

    if (!company) {
      return NextResponse.json(
        { error: '企業が見つかりません' },
        { status: 404 }
      )
    }

    // データを整形
    const formattedCompany = {
      id: company.id,
      name: company.name,
      category: company.category,
      rating: company.rating,
      reviewCount: company._count.reviews,
      description: company.description,
      location: company.location,
      address: company.address,
      phone: company.phone,
      website: company.website,
      imageUrl: company.imageUrl,
      images: company.images ? JSON.parse(company.images) : [],
      tags: company.tags ? JSON.parse(company.tags) : [],
      verified: company.verified,
      businessHours: company.businessHours ? JSON.parse(company.businessHours) : null,
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
      owner: company.owner,
      reviews: company.reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        title: review.title,
        content: review.content,
        images: review.images ? JSON.parse(review.images) : [],
        tags: review.tags ? JSON.parse(review.tags) : [],
        helpfulCount: review.helpfulCount,
        verified: review.verified,
        userName: review.user.name,
        userAvatar: review.user.image,
        createdAt: review.createdAt.toISOString(),
        response: review.response && review.response.length > 0 && review.response[0] ? {
          id: review.response[0].id,
          content: review.response[0].content,
          createdAt: review.response[0].createdAt.toISOString()
        } : null
      })),
      upcomingEvents: company.events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        location: event.location,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        category: event.category,
        imageUrl: event.imageUrl,
        tags: event.tags ? JSON.parse(event.tags) : [],
        attendeeCount: event.attendeeCount
      })),
      stats: {
        totalReviews: company._count.reviews,
        totalEvents: company._count.events,
        averageRating: company.rating,
        ratingDistribution: await getRatingDistribution(companyId)
      }
    }

    return NextResponse.json(formattedCompany)

  } catch (error) {
    console.error('Company detail fetch error:', error)
    return NextResponse.json(
      { error: '企業詳細データの取得に失敗しました' },
      { status: 500 }
    )
  }
}

// レビュー評価の分布を取得
async function getRatingDistribution(companyId: string) {
  const ratings = await prisma.review.groupBy({
    by: ['rating'],
    where: { companyId },
    _count: {
      rating: true
    }
  })

  const distribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }

  ratings.forEach(item => {
    distribution[item.rating as keyof typeof distribution] = item._count.rating
  })

  return distribution
}