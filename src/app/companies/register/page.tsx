'use client';

import { AICompanyRegistrationForm } from '@/components/AICompanyRegistrationForm';

export default function CompanyRegistrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            企業登録
          </h1>
          <p className="text-lg text-gray-600">
            AI支援機能を使って簡単に企業情報を登録できます
          </p>
        </div>
        
        <AICompanyRegistrationForm />
      </div>
    </div>
  );
}