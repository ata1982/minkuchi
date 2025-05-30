import { NextRequest, NextResponse } from 'next/server';
import { realReviewScraperService } from '../../../../lib/services/real-review-scraper-service';

export async function POST(request: NextRequest) {
  try {
    const { restaurantName, location } = await request.json();

    if (!restaurantName) {
      return NextResponse.json(
        { error: 'レストラン名が必要です' },
        { status: 400 }
      );
    }

    // リアルなレビューを収集してフィルタリング
    const filterResults = await realReviewScraperService.collectAndFilterReviews(
      restaurantName,
      location || '東京'
    );

    return NextResponse.json({
      success: true,
      data: filterResults,
      message: `${restaurantName}のレビューを収集・分析しました`,
      recommendations: {
        showTrustedFirst: true,
        suspiciousHighWarning: '上位5%の口コミは身内からのサクラ口コミの可能性もあるので除外しています。',
        suspiciousLowWarning: '下位5%の口コミは同業他社からの嫌がらせ口コミの可能性もあるため除外しています。'
      }
    });

  } catch (error) {
    console.error('リアルレビュー収集エラー:', error);
    return NextResponse.json(
      { error: 'レビューの収集に失敗しました' },
      { status: 500 }
    );
  }
}

// 疑わしいレビューの詳細分析
export async function PUT(request: NextRequest) {
  try {
    const { reviewId, reviewType } = await request.json();

    if (!reviewId || !reviewType) {
      return NextResponse.json(
        { error: 'レビューIDとタイプが必要です' },
        { status: 400 }
      );
    }

    // 実際の実装では、DBからレビューを取得して詳細分析
    const detailAnalysis = {
      reviewId,
      type: reviewType,
      warningMessage: reviewType === 'high' 
        ? 'このレビューは過度にポジティブで、サクラレビューの可能性があります。'
        : 'このレビューは過度にネガティブで、嫌がらせレビューの可能性があります。',
      riskFactors: reviewType === 'high'
        ? ['具体性の欠如', '過度な賞賛', '投稿パターンの類似性']
        : ['感情的表現', '建設的でない批判', '競合との関連性'],
      recommendation: '参考程度に留めることをお勧めします。'
    };

    return NextResponse.json({
      success: true,
      analysis: detailAnalysis,
      message: '詳細分析が完了しました'
    });

  } catch (error) {
    console.error('詳細分析エラー:', error);
    return NextResponse.json(
      { error: '詳細分析に失敗しました' },
      { status: 500 }
    );
  }
}