'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface AIAssistedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  aiField?: string;
  showAIButton?: boolean;
}

export const AIAssistedInput: React.FC<AIAssistedInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  aiField,
  showAIButton = true,
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleAIEnhance = async () => {
    if (!value.trim() || !aiField) return;

    setIsEnhancing(true);
    try {
      const response = await fetch('/api/ai-assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'validateInput',
          data: { field: aiField, value },
        }),
      });

      const result = await response.json();
      if (result.improvedValue) {
        onChange(result.improvedValue);
      }
    } catch (error) {
      console.error('AI enhancement failed:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex gap-2">
        <InputComponent
          type={type === 'text' ? 'text' : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={type === 'textarea' ? 4 : undefined}
        />
        {showAIButton && aiField && (
          <Button
            onClick={handleAIEnhance}
            disabled={!value.trim() || isEnhancing}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            {isEnhancing ? <LoadingSpinner size="sm" /> : 'AI改善'}
          </Button>
        )}
      </div>
    </div>
  );
};