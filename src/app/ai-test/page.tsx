'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface TestResult {
  name: string;
  action: string;
  data: Record<string, unknown>;
  success: boolean;
  result?: any;
  error?: string;
  duration?: number;
  timestamp: string;
}

export default function AITestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runAITests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    const tests = [
      {
        name: 'Gemini API接続テスト',
        action: 'generateDescription',
        data: { companyName: 'テスト企業', category: 'IT・テクノロジー' }
      },
      {
        name: 'カテゴリー提案テスト',
        action: 'suggestCategories',
        data: { companyName: 'サンプルレストラン', description: '美味しい料理を提供します' }
      },
      {
        name: '入力改善テスト',
        action: 'validateInput',
        data: { field: 'name', value: 'てすと会社' }
      }
    ];

    for (const test of tests) {
      try {
        const startTime = Date.now();
        const response = await fetch('/api/ai-assist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: test.action, data: test.data }),
        });
        
        const result = await response.json();
        const endTime = Date.now();
        
        setTestResults(prev => [...prev, {
          ...test,
          success: response.ok,
          result: result,
          duration: endTime - startTime,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        setTestResults(prev => [...prev, {
          ...test,
          success: false,
          error: errorMessage,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    }
    
    setIsRunning(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI機能テスト</h1>
        
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">AI API接続テスト</h2>
            <Button 
              onClick={runAITests}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning && <LoadingSpinner size="sm" />}
              {isRunning ? 'テスト実行中...' : 'テスト開始'}
            </Button>
          </div>
          
          <p className="text-gray-600 mb-4">
            各AI機能の動作を確認します。環境変数とAPI接続をテストできます。
          </p>
        </Card>

        {/* テスト結果 */}
        {testResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">テスト結果</h3>
            {testResults.map((result, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{result.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{result.timestamp}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        result.success
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {result.success ? '成功' : '失敗'}
                    </span>
                  </div>
                </div>
                
                {result.duration && (
                  <p className="text-sm text-gray-600 mb-2">
                    実行時間: {result.duration}ms
                  </p>
                )}
                
                {result.success && result.result && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium mb-1">結果:</p>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(result.result, null, 2)}
                    </pre>
                  </div>
                )}
                
                {!result.success && result.error && (
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-red-800 mb-1">エラー:</p>
                    <p className="text-sm text-red-700">{result.error}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* 環境変数の状態表示 */}
        <Card className="p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">環境設定状況</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-medium">Gemini API</p>
              <p className="text-sm text-gray-600">
                キー設定: {process.env.NEXT_PUBLIC_GEMINI_CONFIGURED ? '✅' : '❌'}
              </p>
              <p className="text-sm text-gray-600">
                モデル: gemini-2.0-flash-exp
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">xAI Grok</p>
              <p className="text-sm text-gray-600">
                キー設定: {process.env.NEXT_PUBLIC_XAI_CONFIGURED ? '✅' : '❌'}
              </p>
              <p className="text-sm text-gray-600">
                モデル: grok-3
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}