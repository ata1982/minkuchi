import { AIClientFactory } from '../ai/client-factory';

export interface CompanyRegistrationData {
  name: string;
  category: string;
  description: string;
  address?: string;
  website?: string;
  phone?: string;
}

export interface AIRegistrationService {
  generateCompanyDescription(companyName: string, category: string): Promise<string>;
  suggestCategories(companyName: string, description?: string): Promise<string[]>;
  enhanceCompanyInfo(companyData: Partial<CompanyRegistrationData>): Promise<CompanyRegistrationData>;
  validateAndImproveInput(field: string, value: string): Promise<string>;
  generateReviewQuestions(category: string): Promise<string[]>;
}

export class AIRegistrationServiceImpl implements AIRegistrationService {
  async generateCompanyDescription(companyName: string, category: string): Promise<string> {
    try {
      const client = await AIClientFactory.createClientWithFallback();
      const prompt = `
企業名「${companyName}」で、カテゴリー「${category}」の企業について、魅力的で分かりやすい紹介文を300文字程度で作成してください。
以下の要素を含めてください：
- 企業の特徴や強み
- 提供するサービスや商品
- 顧客にとってのメリット
- 地域密着性（該当する場合）

自然で読みやすい日本語で書いてください。
      `;
      
      return await client.generateContent(prompt);
    } catch (error) {
      console.error('AI description generation failed:', error);
      return `${companyName}は${category}分野で高品質なサービスを提供しています。お客様のニーズに合わせた最適なソリューションをお届けします。`;
    }
  }

  async suggestCategories(companyName: string, description?: string): Promise<string[]> {
    try {
      const client = await AIClientFactory.createClientWithFallback();
      const prompt = `
企業名「${companyName}」${description ? `、説明「${description}」` : ''}から、
適切なビジネスカテゴリーを5つ提案してください。

一般的なカテゴリー例：
レストラン・飲食店、小売店、美容・ヘルスケア、教育・学習支援、IT・テクノロジー、
建設・不動産、金融・保険、医療・福祉、交通・運輸、娯楽・レジャー、
製造業、農業・漁業、法律・会計、コンサルティング、その他サービス業

カテゴリー名のみを改行区切りで出力してください。
      `;
      
      const response = await client.generateContent(prompt);
      return response.split('\n').filter(line => line.trim()).slice(0, 5);
    } catch (error) {
      console.error('AI category suggestion failed:', error);
      return ['その他サービス業', 'ビジネスサービス', '地域サービス'];
    }
  }

  async enhanceCompanyInfo(companyData: Partial<CompanyRegistrationData>): Promise<CompanyRegistrationData> {
    try {
      // 不足している情報を補完
      const enhancedData = { ...companyData } as CompanyRegistrationData;
      
      if (!enhancedData.description && enhancedData.name && enhancedData.category) {
        enhancedData.description = await this.generateCompanyDescription(
          enhancedData.name, 
          enhancedData.category
        );
      }
      
      if (!enhancedData.category && enhancedData.name) {
        const categories = await this.suggestCategories(enhancedData.name, enhancedData.description);
        enhancedData.category = categories[0] || 'その他サービス業';
      }
      
      return enhancedData;
    } catch (error) {
      console.error('AI enhancement failed:', error);
      return companyData as CompanyRegistrationData;
    }
  }

  async validateAndImproveInput(field: string, value: string): Promise<string> {
    try {
      const client = await AIClientFactory.createClientWithFallback();
      
      // 各フィールドに応じた改善処理
      const improved = await client.enhanceText(value, 'grammar');
      return improved || value;
    } catch (error) {
      console.error('AI validation failed:', error);
      return value;
    }
  }

  async generateReviewQuestions(category: string): Promise<string[]> {
    try {
      const client = await AIClientFactory.createClientWithFallback();
      const prompt = `
「${category}」カテゴリーの企業・サービスに対する有用なレビュー質問を5つ作成してください。
顧客が実際に評価したい要素を考慮して、具体的で答えやすい質問を作ってください。

例：サービスの質、料金の妥当性、スタッフの対応、清潔さ、アクセスのしやすさなど

質問のみを改行区切りで出力してください。
      `;
      
      const response = await client.generateContent(prompt);
      return response.split('\n').filter(line => line.trim()).slice(0, 5);
    } catch (error) {
      console.error('AI question generation failed:', error);
      return [
        'サービスの質はいかがでしたか？',
        '料金は適切だと思いますか？',
        'スタッフの対応はどうでしたか？',
        'また利用したいと思いますか？',
        '友人に勧めたいと思いますか？'
      ];
    }
  }
}

export const aiRegistrationService = new AIRegistrationServiceImpl();