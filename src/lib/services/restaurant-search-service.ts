// 外部レストラン情報検索サービス
export interface RestaurantInfo {
  name: string;
  category: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  cuisine?: string;
  priceRange?: string;
  hours?: Record<string, { open: string; close: string; closed: boolean }>;
  tags?: string[];
  images?: string[];
}

export interface SearchFilters {
  location?: string;
  cuisine?: string;
  priceRange?: string;
  rating?: number;
  openNow?: boolean;
}

export class RestaurantSearchService {
  // Google Places API風のモック検索（実際の実装ではAPIキーが必要）
  async searchRestaurants(query: string, filters?: SearchFilters): Promise<RestaurantInfo[]> {
    try {
      // 実際の実装では外部APIを呼び出し
      // const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=restaurant&key=${API_KEY}`);
      
      // モックデータで代替
      const mockResults = await this.generateMockRestaurants(query, filters);
      return mockResults;
    } catch (error) {
      console.error('レストラン検索エラー:', error);
      return [];
    }
  }

  // ぐるなびAPI風の検索（モック）
  async searchGurunavi(area: string = '東京'): Promise<RestaurantInfo[]> {
    try {
      // 実際の実装
      // const response = await fetch(`https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=${API_KEY}&area=${area}&format=json`);
      
      return this.generateMockGurunaviResults(area);
    } catch (error) {
      console.error('ぐるなび検索エラー:', error);
      return [];
    }
  }

  // 食べログ風の検索（モック）
  async searchTabelog(keyword: string, area: string = '東京'): Promise<RestaurantInfo[]> {
    try {
      // 実際の実装では食べログAPIまたはスクレイピング（利用規約要確認）
      return this.generateMockTabelogResults(keyword, area);
    } catch (error) {
      console.error('食べログ検索エラー:', error);
      return [];
    }
  }

  // 複数ソースから検索結果を統合
  async searchFromMultipleSources(query: string, area: string = '東京'): Promise<RestaurantInfo[]> {
    const results: RestaurantInfo[] = [];
    
    try {
      // 並列で複数のソースから検索
      const [googleResults, gurunaviResults, tabelogResults] = await Promise.all([
        this.searchRestaurants(`${query} ${area}`),
        this.searchGurunavi(area),
        this.searchTabelog(query, area)
      ]);

      // 結果を統合（重複除去）
      const allResults = [...googleResults, ...gurunaviResults, ...tabelogResults];
      const uniqueResults = this.removeDuplicates(allResults);
      
      return uniqueResults.slice(0, 50); // 最大50件
    } catch (error) {
      console.error('統合検索エラー:', error);
      return results;
    }
  }

  // 重複レストランの除去
  private removeDuplicates(restaurants: RestaurantInfo[]): RestaurantInfo[] {
    const seen = new Set<string>();
    return restaurants.filter(restaurant => {
      const key = `${restaurant.name}-${restaurant.address}`.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // モックデータ生成
  private async generateMockRestaurants(query: string, filters?: SearchFilters): Promise<RestaurantInfo[]> {
    const cuisineTypes = ['和食', 'イタリアン', 'フレンチ', '中華', 'インド料理', 'タイ料理', '韓国料理', 'アメリカン'];
    const areas = ['渋谷区', '新宿区', '港区', '世田谷区', '中央区', '千代田区'];
    
    const mockRestaurants: RestaurantInfo[] = [];
    
    for (let i = 0; i < 20; i++) {
      const cuisine = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)];
      const area = filters?.location || areas[Math.floor(Math.random() * areas.length)];
      
      mockRestaurants.push({
        name: `${query}風${cuisine}レストラン ${i + 1}`,
        category: 'restaurant',
        description: `本格的な${cuisine}を提供する人気レストラン。新鮮な食材を使用し、伝統的な調理法で作られた料理をお楽しみいただけます。`,
        address: `東京都${area}${Math.floor(Math.random() * 10) + 1}-${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 10) + 1}`,
        phone: `03-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        website: `https://${query.toLowerCase()}-restaurant-${i + 1}.com`,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0-5.0
        reviewCount: Math.floor(Math.random() * 500) + 50,
        cuisine: cuisine || 'レストラン',
        priceRange: (['¥', '¥¥', '¥¥¥'][Math.floor(Math.random() * 3)]) as string,
        hours: this.generateBusinessHours(),
        tags: [cuisine || 'レストラン', '人気', 'おすすめ'],
        images: [`/api/placeholder/400/300`]
      });
    }
    
    return mockRestaurants;
  }

  private async generateMockGurunaviResults(area: string): Promise<RestaurantInfo[]> {
    const restaurants: RestaurantInfo[] = [
      {
        name: '銀座すし処 まさる',
        category: 'restaurant',
        description: '築地直送の新鮮なネタを使用した江戸前寿司の名店。職人の技が光る本格寿司をお楽しみください。',
        address: `東京都${area}1-2-3`,
        phone: '03-1234-5678',
        website: 'https://sushi-masaru.com',
        rating: 4.8,
        reviewCount: 342,
        cuisine: '寿司',
        priceRange: '¥¥¥',
        hours: this.generateBusinessHours(),
        tags: ['寿司', '築地直送', '高級'],
        images: ['/api/placeholder/400/300']
      },
      {
        name: 'トラットリア・ベラヴィスタ',
        category: 'restaurant',
        description: 'イタリア直輸入の食材を使用した本格イタリアン。パスタとピザが自慢のアットホームなレストランです。',
        address: `東京都${area}2-3-4`,
        phone: '03-2345-6789',
        rating: 4.5,
        reviewCount: 189,
        cuisine: 'イタリアン',
        priceRange: '¥¥',
        hours: this.generateBusinessHours(),
        tags: ['イタリアン', 'パスタ', 'ピザ'],
        images: ['/api/placeholder/400/300']
      }
    ];
    
    return restaurants;
  }

  private async generateMockTabelogResults(keyword: string, area: string): Promise<RestaurantInfo[]> {
    return [
      {
        name: `${keyword} 食堂`,
        category: 'restaurant',
        description: `地元で愛される${keyword}の老舗食堂。家庭的な味と温かいおもてなしでお客様をお迎えします。`,
        address: `東京都${area}3-4-5`,
        phone: '03-3456-7890',
        rating: 4.2,
        reviewCount: 95,
        cuisine: '家庭料理',
        priceRange: '¥',
        hours: this.generateBusinessHours(),
        tags: ['家庭料理', '老舗', 'アットホーム'],
        images: ['/api/placeholder/400/300']
      }
    ];
  }

  private generateBusinessHours() {
    return {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: false },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '23:00', closed: false },
      saturday: { open: '11:00', close: '23:00', closed: false },
      sunday: { open: '11:00', close: '21:00', closed: false }
    };
  }
}

export const restaurantSearchService = new RestaurantSearchService();