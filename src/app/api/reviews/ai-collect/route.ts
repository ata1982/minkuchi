import { NextRequest, NextResponse } from 'next/server';
import { aiReviewScraperService } from '../../../../lib/services/ai-review-scraper-service';

export async function POST(request: NextRequest) {
  try {
    const { restaurantName, location } = await request.json();

    if (!restaurantName) {
      return NextResponse.json(
        { error: 'レストラン名が必要です' },
        { status: 400 }
      );
    }

    // AIを使用してレビューとTwitter投稿を収集
    const reviewData = await aiReviewScraperService.collectAllReviews(
      restaurantName,
      location || '東京'
    );

    return NextResponse.json({
      success: true,
      data: reviewData,
      message: `${restaurantName}のレビューを収集しました`
    });

  } catch (error) {
    console.error('AI レビュー収集エラー:', error);
    return NextResponse.json(
      { error: 'レビューの収集に失敗しました' },
      { status: 500 }
    );
  }
}

// 個別のレビュー分析
export async function PUT(request: NextRequest) {
  try {
    const { reviewContent } = await request.json();

    if (!reviewContent) {
      return NextResponse.json(
        { error: 'レビュー内容が必要です' },
        { status: 400 }
      );
    }

    const analysis = await aiReviewScraperService.analyzeReviewSentiment(reviewContent);

    return NextResponse.json({
      success: true,
      analysis,
      message: 'レビューの感情分析が完了しました'
    });

  } catch (error) {
    console.error('レビュー分析エラー:', error);
    return NextResponse.json(
      { error: 'レビューの分析に失敗しました' },
      { status: 500 }
    );
  }
}