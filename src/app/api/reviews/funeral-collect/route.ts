import { NextRequest, NextResponse } from 'next/server';
import { generateFuneralHomeReviews, FuneralReviewResponse } from '@/lib/services/funeral-review-generator';

export async function POST(request: NextRequest) {
  try {
    // CORS ヘッダーを追加
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    const body = await request.json();
    const { companyName, location } = body;

    // バリデーション
    if (!companyName || typeof companyName !== 'string') {
      return NextResponse.json(
        { 
          error: '企業名が必要です',
          code: 'MISSING_COMPANY_NAME'
        },
        { status: 400, headers }
      );
    }

    if (!location || typeof location !== 'string') {
      return NextResponse.json(
        { 
          error: '場所が必要です',
          code: 'MISSING_LOCATION'
        },
        { status: 400, headers }
      );
    }

    console.log(`葬儀屋レビュー収集開始: ${companyName} (${location})`);

    // レビュー生成の実行
    const reviewData: FuneralReviewResponse = await generateFuneralHomeReviews(companyName, location);

    // 成功レスポンス
    const response = {
      success: true,
      message: `${companyName}のレビューを${reviewData.statistics.totalReviews}件収集しました`,
      data: reviewData,
      metadata: {
        generatedAt: new Date().toISOString(),
        companyName,
        location,
        version: '1.0.0'
      }
    };

    console.log(`レビュー収集成功: ${reviewData.statistics.totalReviews}件生成`);
    return NextResponse.json(response, { status: 200, headers });

  } catch (error) {
    console.error('葬儀屋レビュー収集APIエラー:', error);

    // エラーレスポンス
    const errorResponse = {
      success: false,
      error: 'レビューの収集に失敗しました',
      code: 'REVIEW_GENERATION_FAILED',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(
      errorResponse,
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

// OPTIONS メソッドの処理（CORS対応）
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}