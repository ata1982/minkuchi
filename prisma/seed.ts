import { PrismaClient, UserRole, Theme, NotificationType } from '@prisma/client'
import { mockCompanies, mockUsers, mockReviews, mockEvents, mockCategories } from '../src/lib/mockData.js'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 データベースのシード処理を開始します...')

  // 既存データをクリア
  await prisma.notification.deleteMany()
  await prisma.eventAttendee.deleteMany()
  await prisma.event.deleteMany()
  await prisma.companyResponse.deleteMany()
  await prisma.review.deleteMany()
  await prisma.company.deleteMany()
  await prisma.subCategory.deleteMany()
  await prisma.category.deleteMany()
  await prisma.userBadge.deleteMany()
  await prisma.badge.deleteMany()
  await prisma.userPreferences.deleteMany()
  await prisma.user.deleteMany()

  console.log('📚 カテゴリを作成中...')
  // カテゴリの作成
  for (const category of mockCategories) {
    const createdCategory = await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        emoji: category.emoji,
        description: category.description,
        isActive: category.isActive,
      }
    })

    // サブカテゴリの作成
    for (const subcategory of category.subcategories) {
      await prisma.subCategory.create({
        data: {
          id: subcategory.id,
          categoryId: createdCategory.id,
          name: subcategory.name,
          description: subcategory.description,
        }
      })
    }
  }

  console.log('🏆 バッジを作成中...')
  // バッジの作成
  const badges = [
    {
      id: 'badge1',
      name: 'レビューマスター',
      description: '10件以上のレビューを投稿',
      icon: '🏆'
    },
    {
      id: 'badge2',
      name: 'トラベラー',
      description: '5つ以上の地域でレビューを投稿',
      icon: '🌏'
    },
    {
      id: 'badge3',
      name: 'グルメ',
      description: 'レストランレビューを20件投稿',
      icon: '🍽️'
    }
  ]

  for (const badge of badges) {
    await prisma.badge.create({
      data: badge
    })
  }

  console.log('👥 ユーザーを作成中...')
  // ユーザーの作成
  const users = [
    {
      id: 'user1',
      email: 'tanaka@example.com',
      name: '田中太郎',
      avatar: '/api/placeholder/40/40',
      role: UserRole.USER,
      points: 1250,
    },
    {
      id: 'user2',
      email: 'sato@example.com',
      name: '佐藤花子',
      avatar: '/api/placeholder/40/40',
      role: UserRole.USER,
      points: 890,
    },
    {
      id: 'admin1',
      email: 'admin@minkuchi.jp',
      name: '管理者',
      avatar: '/api/placeholder/40/40',
      role: UserRole.ADMIN,
      points: 0,
    }
  ]

  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user
    })

    // ユーザー設定の作成
    await prisma.userPreferences.create({
      data: {
        userId: createdUser.id,
        location: '東京都',
        categories: JSON.stringify(['restaurant', 'beauty']),
        notifications: true,
        theme: Theme.LIGHT,
        language: 'ja'
      }
    })

    // バッジの付与（最初のユーザーのみ）
    if (user.id === 'user1') {
      await prisma.userBadge.create({
        data: {
          userId: createdUser.id,
          badgeId: 'badge1',
        }
      })
    }
  }

  console.log('🏢 企業を作成中...')
  // 企業の作成
  for (const company of mockCompanies) {
    await prisma.company.create({
      data: {
        id: company.id,
        name: company.name,
        category: company.category,
        rating: company.rating,
        reviewCount: company.reviewCount,
        description: company.description,
        location: company.location,
        address: company.address,
        phone: company.phone || null,
        website: company.website || null,
        imageUrl: company.imageUrl || null,
        images: JSON.stringify(company.images),
        tags: JSON.stringify(company.tags),
        verified: company.verified,
        businessHours: company.businessHours || "{}",
        ownerId: company.owner ? 'user2' : null, // 一部の企業にオーナーを設定
      }
    })
  }

  console.log('⭐ レビューを作成中...')
  // レビューの作成
  const reviews = [
    {
      id: 'review1',
      userId: 'user1',
      companyId: '1',
      rating: 5,
      title: '素晴らしい雰囲気',
      content: 'フレンチの本格的な味を楽しめました。スタッフの方も親切で、また来たいと思います。',
      images: JSON.stringify(['/api/placeholder/300/200']),
      tags: JSON.stringify(['美味しい', 'おしゃれ', 'サービス良好']),
      helpfulCount: 12,
      verified: true,
    },
    {
      id: 'review2',
      userId: 'user2',
      companyId: '2',
      rating: 4,
      title: '技術力が高い',
      content: 'カットとカラーをお願いしました。仕上がりに満足しています。',
      images: JSON.stringify([]),
      tags: JSON.stringify(['技術力', '清潔']),
      helpfulCount: 8,
      verified: false,
    }
  ]

  for (const review of reviews) {
    await prisma.review.create({
      data: review
    })
  }

  console.log('🎉 イベントを作成中...')
  // イベントの作成
  for (const event of mockEvents) {
    await prisma.event.create({
      data: {
        id: event.id,
        title: event.title,
        description: event.description,
        companyId: event.companyId || null,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
        category: event.category,
        imageUrl: event.imageUrl || null,
        tags: JSON.stringify(event.tags),
        attendeeCount: event.attendeeCount,
      }
    })
  }

  console.log('🔔 通知を作成中...')
  // 通知の作成
  await prisma.notification.create({
    data: {
      userId: 'user1',
      type: NotificationType.NEW_REVIEW,
      title: '新しいレビューが投稿されました',
      content: 'カフェ・ド・パリに新しいレビューが投稿されました。',
      read: false,
    }
  })

  console.log('✅ シード処理が完了しました！')
}

main()
  .catch((e) => {
    console.error('❌ シード処理でエラーが発生しました:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })