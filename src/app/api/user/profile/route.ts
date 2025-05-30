import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        userPreferences: true,
        badges: {
          include: {
            badge: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 }
      )
    }

    // パスワードを除外してレスポンス
    const { password, ...userWithoutPassword } = user

    // バッジデータの整形
    const badges = user.badges.map(userBadge => ({
      id: userBadge.badge.id,
      name: userBadge.badge.name,
      description: userBadge.badge.description,
      icon: userBadge.badge.icon,
      unlockedAt: userBadge.unlockedAt.toISOString()
    }))

    // 設定データの整形
    const preferences = user.userPreferences ? {
      location: user.userPreferences.location,
      categories: user.userPreferences.categories ? JSON.parse(user.userPreferences.categories) : [],
      notifications: user.userPreferences.notifications,
      theme: user.userPreferences.theme,
      language: user.userPreferences.language
    } : {
      location: null,
      categories: [],
      notifications: true,
      theme: 'LIGHT',
      language: 'ja'
    }

    return NextResponse.json({
      ...userWithoutPassword,
      preferences,
      badges
    })

  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { error: 'プロフィールの取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const { name, location, categories, notifications } = await request.json()

    // ユーザー基本情報を更新
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
      }
    })

    // ユーザー設定を更新または作成
    await prisma.userPreferences.upsert({
      where: { userId: session.user.id },
      update: {
        location,
        categories: JSON.stringify(categories),
        notifications,
      },
      create: {
        userId: session.user.id,
        location,
        categories: JSON.stringify(categories),
        notifications,
        theme: 'LIGHT',
        language: 'ja'
      }
    })

    return NextResponse.json({
      message: 'プロフィールが更新されました',
      user: { id: updatedUser.id, name: updatedUser.name }
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'プロフィールの更新に失敗しました' },
      { status: 500 }
    )
  }
}