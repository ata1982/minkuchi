import { NextRequest, NextResponse } from 'next/server'
import { reviewClassificationService } from '@/lib/services/review-classification-service'

export async function POST(request: NextRequest) {
  try {
    const { reviews, categoryId } = await request.json()

    if (!reviews || !Array.isArray(reviews) || !categoryId) {
      return NextResponse.json(
        { error: 'レビューとカテゴリIDが必要です' },
        { status: 400 }
      )
    }

    const classifiedReviews = await reviewClassificationService.classifyReviews(
      reviews,
      categoryId
    )

    return NextResponse.json({ classifiedReviews })
  } catch (error) {
    console.error('レビュー分類エラー:', error)
    return NextResponse.json(
      { error: 'レビューの分類に失敗しました' },
      { status: 500 }
    )
  }
}