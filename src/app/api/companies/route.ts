import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'rating'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // クエリ条件を構築
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {}

    if (category) {
      where.category = category
    }

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      }
    }

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ]
    }

    // ソート条件を構築
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderBy: Record<string, any> = {}
    
    switch (sortBy) {
      case 'rating':
        orderBy.rating = sortOrder
        break
      case 'reviewCount':
        orderBy.reviewCount = sortOrder
        break
      case 'name':
        orderBy.name = sortOrder
        break
      case 'createdAt':
        orderBy.createdAt = sortOrder
        break
      default:
        orderBy.rating = 'desc'
    }

    // 企業データを取得
    const [companies, totalCount] = await Promise.all([
      prisma.company.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          reviews: {
            take: 3,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              user: {
                select: {
                  name: true,
                  avatar: true
                }
              }
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        }
      }),
      prisma.company.count({ where })
    ])

    // データを整形
    const formattedCompanies = companies.map(company => ({
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
      recentReviews: company.reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        title: review.title,
        content: review.content.substring(0, 100) + (review.content.length > 100 ? '...' : ''),
        userName: review.user.name,
        userAvatar: review.user.avatar,
        createdAt: review.createdAt.toISOString()
      }))
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      companies: formattedCompanies,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })

  } catch (error) {
    console.error('Companies fetch error:', error)
    return NextResponse.json(
      { error: '企業データの取得に失敗しました' },
      { status: 500 }
    )
  }
}