'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AIAssistedInput } from '@/components/ui/AIAssistedInput';

interface CompanyFormData {
  name: string;
  category: string;
  description: string;
  address: string;
  website: string;
  phone: string;
}

export const AICompanyRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    category: '',
    description: '',
    address: '',
    website: '',
    phone: '',
  });

  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isEnhancingAll, setIsEnhancingAll] = useState(false);

  const updateField = (field: keyof CompanyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSuggestCategories = async () => {
    if (!formData.name.trim()) return;

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'suggestCategories',
          data: {
            companyName: formData.name,
            description: formData.description,
          },
        }),
      });

      const result = await response.json();
      if (result.categories) {
        setSuggestedCategories(result.categories);
      }
    } catch (error) {
      console.error('Category suggestion failed:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.name.trim() || !formData.category.trim()) return;

    setIsGeneratingDescription(true);
    try {
      const response = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateDescription',
          data: {
            companyName: formData.name,
            category: formData.category,
          },
        }),
      });

      const result = await response.json();
      if (result.description) {
        updateField('description', result.description);
      }
    } catch (error) {
      console.error('Description generation failed:', error);
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleEnhanceAll = async () => {
    setIsEnhancingAll(true);
    try {
      const response = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'enhanceInfo',
          data: formData,
        }),
      });

      const result = await response.json();
      if (result.enhancedData) {
        setFormData(result.enhancedData);
      }
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setIsEnhancingAll(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 実際の企業登録APIを呼び出し
    console.log('Submitting company data:', formData);
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          企業登録 - AI支援
        </h2>
        <p className="text-gray-600">
          AIがあなたの企業情報の入力をサポートします
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 企業名 */}
        <AIAssistedInput
          label="企業名 *"
          value={formData.name}
          onChange={(value) => updateField('name', value)}
          placeholder="企業名を入力してください"
          aiField="name"
        />

        {/* カテゴリー */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AIAssistedInput
              label="カテゴリー *"
              value={formData.category}
              onChange={(value) => updateField('category', value)}
              placeholder="業種・カテゴリーを入力してください"
              showAIButton={false}
            />
            <Button
              type="button"
              onClick={handleSuggestCategories}
              disabled={!formData.name.trim() || isLoadingSuggestions}
              variant="outline"
              size="sm"
              className="mt-7"
            >
              {isLoadingSuggestions ? <LoadingSpinner size="sm" /> : 'AI提案'}
            </Button>
          </div>

          {/* カテゴリー提案 */}
          {suggestedCategories.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">AI提案カテゴリー:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedCategories.map((category, index) => (
                  <Button
                    key={index}
                    type="button"
                    onClick={() => updateField('category', category)}
                    variant="outline"
                    size="sm"
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 企業説明 */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <AIAssistedInput
              label="企業説明 *"
              value={formData.description}
              onChange={(value) => updateField('description', value)}
              placeholder="企業の特徴やサービス内容を入力してください"
              type="textarea"
              aiField="description"
            />
            <Button
              type="button"
              onClick={handleGenerateDescription}
              disabled={!formData.name.trim() || !formData.category.trim() || isGeneratingDescription}
              variant="outline"
              size="sm"
              className="mt-7 whitespace-nowrap"
            >
              {isGeneratingDescription ? <LoadingSpinner size="sm" /> : 'AI生成'}
            </Button>
          </div>
        </div>

        {/* 住所 */}
        <AIAssistedInput
          label="住所"
          value={formData.address}
          onChange={(value) => updateField('address', value)}
          placeholder="企業の住所を入力してください"
          aiField="address"
        />

        {/* ウェブサイト */}
        <AIAssistedInput
          label="ウェブサイト"
          value={formData.website}
          onChange={(value) => updateField('website', value)}
          placeholder="https://example.com"
          showAIButton={false}
        />

        {/* 電話番号 */}
        <AIAssistedInput
          label="電話番号"
          value={formData.phone}
          onChange={(value) => updateField('phone', value)}
          placeholder="03-1234-5678"
          showAIButton={false}
        />

        {/* アクションボタン */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={handleEnhanceAll}
            disabled={!formData.name.trim() || isEnhancingAll}
            variant="outline"
            className="flex-1"
          >
            {isEnhancingAll ? <LoadingSpinner size="sm" /> : 'AI全体改善'}
          </Button>
          
          <Button
            type="submit"
            disabled={!formData.name.trim() || !formData.category.trim() || !formData.description.trim()}
            className="flex-1"
          >
            企業を登録
          </Button>
        </div>
      </form>
    </Card>
  );
};