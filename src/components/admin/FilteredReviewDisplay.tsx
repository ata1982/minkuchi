'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface FilteredReview {
  id: string;
  restaurantName: string;
  reviewerName: string;
  rating: number;
  content: string;
  source: string;
  platform: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  keywords: string[];
  trustScore: number;
  riskFlags: string[];
}

interface ReviewFilterResults {
  trustedReviews: FilteredReview[];
  suspiciousHighReviews: FilteredReview[];
  suspiciousLowReviews: FilteredReview[];
  statistics: {
    totalReviews: number;
    trustedCount: number;
    suspiciousHighCount: number;
    suspiciousLowCount: number;
    averageRating: number;
    averageTrustScore: number;
  };
}

interface Props {
  restaurantName: string;
  onClose?: () => void;
}

const FilteredReviewDisplay: React.FC<Props> = ({ restaurantName, onClose }) => {
  const [reviewData, setReviewData] = useState<ReviewFilterResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuspiciousHigh, setShowSuspiciousHigh] = useState(false);
  const [showSuspiciousLow, setShowSuspiciousLow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const collectReviews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/reviews/real-collect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantName,
          location: '東京'
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setReviewData(result.data);
      } else {
        setError(result.error || 'レビューの収集に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
      console.error('Review collection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {restaurantName} のリアル口コミ分析
        </h1>
        <p className="text-gray-600">
          Google Maps、ブログ、SNSからの口コミを収集・分析し、信頼性でフィルタリングします
        </p>
      </div>

      {!reviewData && (
        <div className="text-center">
          <Button
            onClick={collectReviews}
            disabled={loading}
            className="px-8 py-3"
          >
            {loading ? '収集中...' : 'リアル口コミを収集・分析'}
          </Button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {reviewData && (
        <>
          {/* 統計情報 */}
          <Card className="mb-6 p-6">
            <h2 className="text-xl font-bold mb-4">分析結果サマリー</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {reviewData.statistics.totalReviews}
                </div>
                <div className="text-sm text-gray-600">総レビュー数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {reviewData.statistics.trustedCount}
                </div>
                <div className="text-sm text-gray-600">信頼できるレビュー</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {reviewData.statistics.averageRating}
                </div>
                <div className="text-sm text-gray-600">平均評価</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {reviewData.statistics.averageTrustScore}%
                </div>
                <div className="text-sm text-gray-600">平均信頼度</div>
              </div>
            </div>
          </Card>

          {/* 信頼できるレビュー */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              ✅ 信頼できるレビュー ({reviewData.statistics.trustedCount}件)
            </h2>
            <div className="grid gap-4">
              {reviewData.trustedReviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold">{review.reviewerName}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        {review.platform}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-500">{renderStars(review.rating)}</div>
                      <div className={`text-sm ${getTrustScoreColor(review.trustScore)}`}>
                        信頼度: {review.trustScore}%
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.content}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex flex-wrap gap-1">
                      {review.keywords.map((keyword, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={getSentimentColor(review.sentiment)}>
                        {review.sentiment === 'positive' ? '😊' : 
                         review.sentiment === 'negative' ? '😞' : '😐'}
                      </span>
                      <span className="text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 疑わしい高評価レビュー */}
          {reviewData.statistics.suspiciousHighCount > 0 && (
            <div className="mb-8">
              <div className="bg-orange-50 border border-orange-200 p-4 rounded mb-4">
                <h3 className="font-bold text-orange-800 mb-2">
                  ⚠️ 上位5%の高評価レビューについて
                </h3>
                <p className="text-orange-700 text-sm mb-3">
                  これらのレビューは身内からのサクラ口コミの可能性もあるので、デフォルトでは除外しています。
                  参考程度に確認したい場合は下のボタンをクリックしてください。
                </p>
                <Button
                  onClick={() => setShowSuspiciousHigh(!showSuspiciousHigh)}
                  variant="outline"
                  size="sm"
                >
                  {showSuspiciousHigh ? '隠す' : `それでも見る (${reviewData.statistics.suspiciousHighCount}件)`}
                </Button>
              </div>

              {showSuspiciousHigh && (
                <div className="grid gap-4">
                  {reviewData.suspiciousHighReviews.map((review) => (
                    <Card key={review.id} className="p-4 border-orange-200 bg-orange-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold">{review.reviewerName}</span>
                          <span className="ml-2 text-sm text-gray-500">
                            {review.platform}
                          </span>
                          <span className="ml-2 text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">
                            疑わしい高評価
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-500">{renderStars(review.rating)}</div>
                          <div className={`text-sm ${getTrustScoreColor(review.trustScore)}`}>
                            信頼度: {review.trustScore}%
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{review.content}</p>
                      <div className="bg-orange-100 p-2 rounded mb-2">
                        <div className="text-sm text-orange-800">
                          <strong>リスク要因:</strong> {review.riskFlags.join(', ')}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex flex-wrap gap-1">
                          {review.keywords.map((keyword, idx) => (
                            <span key={idx} className="bg-orange-100 px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-500">{review.date}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 疑わしい低評価レビュー */}
          {reviewData.statistics.suspiciousLowCount > 0 && (
            <div className="mb-8">
              <div className="bg-red-50 border border-red-200 p-4 rounded mb-4">
                <h3 className="font-bold text-red-800 mb-2">
                  ⚠️ 下位5%の低評価レビューについて
                </h3>
                <p className="text-red-700 text-sm mb-3">
                  これらのレビューは同業他社からの嫌がらせ口コミの可能性もあるため、デフォルトでは除外しています。
                  参考程度に確認したい場合は下のボタンをクリックしてください。
                </p>
                <Button
                  onClick={() => setShowSuspiciousLow(!showSuspiciousLow)}
                  variant="outline"
                  size="sm"
                >
                  {showSuspiciousLow ? '隠す' : `それでも見る (${reviewData.statistics.suspiciousLowCount}件)`}
                </Button>
              </div>

              {showSuspiciousLow && (
                <div className="grid gap-4">
                  {reviewData.suspiciousLowReviews.map((review) => (
                    <Card key={review.id} className="p-4 border-red-200 bg-red-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold">{review.reviewerName}</span>
                          <span className="ml-2 text-sm text-gray-500">
                            {review.platform}
                          </span>
                          <span className="ml-2 text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                            疑わしい低評価
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-500">{renderStars(review.rating)}</div>
                          <div className={`text-sm ${getTrustScoreColor(review.trustScore)}`}>
                            信頼度: {review.trustScore}%
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{review.content}</p>
                      <div className="bg-red-100 p-2 rounded mb-2">
                        <div className="text-sm text-red-800">
                          <strong>リスク要因:</strong> {review.riskFlags.join(', ')}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex flex-wrap gap-1">
                          {review.keywords.map((keyword, idx) => (
                            <span key={idx} className="bg-red-100 px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-500">{review.date}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-8">
            <Button onClick={() => setReviewData(null)} variant="outline">
              新しい検索
            </Button>
            {onClose && (
              <Button onClick={onClose} className="ml-4">
                閉じる
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FilteredReviewDisplay;