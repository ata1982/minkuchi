import { NextRequest, NextResponse } from 'next/server';
import { aiRegistrationService } from '@/lib/services/ai-registration-service';

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json();

    switch (action) {
      case 'generateDescription': {
        const { companyName, category } = data;
        if (!companyName || !category) {
          return NextResponse.json(
            { error: '企業名とカテゴリーが必要です' },
            { status: 400 }
          );
        }
        
        const description = await aiRegistrationService.generateCompanyDescription(
          companyName,
          category
        );
        
        return NextResponse.json({ description });
      }

      case 'suggestCategories': {
        const { companyName, description } = data;
        if (!companyName) {
          return NextResponse.json(
            { error: '企業名が必要です' },
            { status: 400 }
          );
        }
        
        const categories = await aiRegistrationService.suggestCategories(
          companyName,
          description
        );
        
        return NextResponse.json({ categories });
      }

      case 'enhanceInfo': {
        const companyData = data;
        if (!companyData || !companyData.name) {
          return NextResponse.json(
            { error: '企業データが必要です' },
            { status: 400 }
          );
        }
        
        const enhancedData = await aiRegistrationService.enhanceCompanyInfo(companyData);
        
        return NextResponse.json({ enhancedData });
      }

      case 'validateInput': {
        const { field, value } = data;
        if (!field || !value) {
          return NextResponse.json(
            { error: 'フィールド名と値が必要です' },
            { status: 400 }
          );
        }
        
        const improvedValue = await aiRegistrationService.validateAndImproveInput(
          field,
          value
        );
        
        return NextResponse.json({ improvedValue });
      }

      case 'generateQuestions': {
        const { category } = data;
        if (!category) {
          return NextResponse.json(
            { error: 'カテゴリーが必要です' },
            { status: 400 }
          );
        }
        
        const questions = await aiRegistrationService.generateReviewQuestions(category);
        
        return NextResponse.json({ questions });
      }

      default:
        return NextResponse.json(
          { error: '無効なアクションです' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI assistance API error:', error);
    return NextResponse.json(
      { error: 'AI支援サービスでエラーが発生しました' },
      { status: 500 }
    );
  }
}