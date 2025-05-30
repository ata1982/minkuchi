export interface BusinessEssenceConfig {
  categoryId: string
  categoryName: string
  essenceAspects: string[]
  otherAspects: string[]
  description: string
  keywords: {
    essence: string[]
    other: string[]
  }
}

const businessEssenceConfigs: BusinessEssenceConfig[] = [
  {
    categoryId: 'restaurant',
    categoryName: '飲食店',
    essenceAspects: ['味', '料理の質'],
    otherAspects: ['接客', '店内の清潔感', '雰囲気', '価格', '待ち時間'],
    description: '飲食店では「味」が最も重要な評価軸です。',
    keywords: {
      essence: [
        '味', '美味しい', 'まずい', '料理', '食材', '調理', '塩加減', '甘い', '辛い', 
        '苦い', '酸っぱい', '濃い', '薄い', '新鮮', '冷めた', '温かい', '食感', 
        'ジューシー', 'パサパサ', 'もちもち', 'さくさく', 'とろとろ', '香り',
        '風味', 'コク', 'うまみ', '食べ応え', '満足感', 'ボリューム'
      ],
      other: [
        '接客', '店員', 'サービス', '態度', '笑顔', '親切', '丁寧', '失礼',
        '清潔', '汚い', 'きれい', '掃除', '衛生', '雰囲気', 'BGM', '照明',
        '内装', '座席', '価格', '値段', '高い', '安い', 'コスパ', '待ち時間',
        '混雑', '予約', 'アクセス', '駐車場', '立地'
      ]
    }
  },
  {
    categoryId: 'moving',
    categoryName: '引越し業者',
    essenceAspects: ['コスパ', '料金対効果'],
    otherAspects: ['スタッフ対応', '時間の正確性', '作業の丁寧さ'],
    description: '引越し業者では「コストパフォーマンス」が最も重要な評価軸です。',
    keywords: {
      essence: [
        'コスパ', '料金', '価格', '安い', '高い', '費用', 'お得', '割高',
        '見積もり', '追加料金', '値段', '金額', 'コストパフォーマンス',
        '料金対効果', '経済的', 'リーズナブル', '格安'
      ],
      other: [
        'スタッフ', '作業員', '対応', '態度', '親切', '丁寧', '失礼', '愛想',
        '時間', '遅刻', '早い', '正確', 'スケジュール', '予定', '作業',
        '梱包', '運搬', '設置', '丁寧', '雑', '破損', '傷', '保護'
      ]
    }
  },
  {
    categoryId: 'funeral',
    categoryName: '葬儀屋',
    essenceAspects: ['思いやり', '心のケア'],
    otherAspects: ['施設の設備', '価格', '手続きのサポート'],
    description: '葬儀屋では「思いやり」が最も重要な評価軸です。',
    keywords: {
      essence: [
        '思いやり', '優しい', '親身', '寄り添う', '心のケア', '配慮', '気遣い',
        '温かい', '理解', '共感', '支え', '慰め', '安心', '信頼', '真摯',
        '誠実', '丁寧', '心配り', 'ホスピタリティ', '人間性'
      ],
      other: [
        '施設', '設備', '会館', 'ホール', '駐車場', '控室', '料金', '価格',
        '費用', '見積もり', '手続き', 'サポート', '段取り', '準備', '進行',
        'アクセス', '立地', '清潔感', '雰囲気'
      ]
    }
  },
  {
    categoryId: 'hospital',
    categoryName: '病院・クリニック',
    essenceAspects: ['医療技術', '診療の質'],
    otherAspects: ['待ち時間', '施設の清潔感', '受付対応'],
    description: '病院・クリニックでは「医療技術・診療の質」が最も重要な評価軸です。',
    keywords: {
      essence: [
        '医療技術', '診療', '治療', '技術', '腕', '経験', '知識', '専門性',
        '診断', '検査', '手術', '薬', '治る', '改善', '効果', '結果',
        '的確', '正確', '適切', '信頼できる', '安心', '説明', 'インフォームドコンセント'
      ],
      other: [
        '待ち時間', '混雑', '予約', '受付', 'スタッフ', '看護師', '対応',
        '態度', '親切', '清潔', 'きれい', '施設', '設備', '駐車場',
        'アクセス', '立地', '料金', '費用'
      ]
    }
  },
  {
    categoryId: 'beauty',
    categoryName: '美容院・サロン',
    essenceAspects: ['技術力', '仕上がり'],
    otherAspects: ['接客', '雰囲気', '価格'],
    description: '美容院・サロンでは「技術力・仕上がり」が最も重要な評価軸です。',
    keywords: {
      essence: [
        '技術', '仕上がり', 'カット', 'カラー', 'パーマ', 'セット', 'スタイリング',
        '上手', '下手', '満足', '思い通り', 'イメージ', 'センス', 'デザイン',
        '髪質', 'ダメージ', 'ツヤ', 'まとまり', '持ち', '再現性'
      ],
      other: [
        '接客', 'スタッフ', '対応', '態度', '親切', '会話', '雰囲気',
        '内装', 'BGM', 'リラックス', '清潔', '価格', '料金', '値段',
        '予約', '待ち時間', 'アクセス', '立地', '駐車場'
      ]
    }
  },
  {
    categoryId: 'hotel',
    categoryName: 'ホテル・旅館',
    essenceAspects: ['快適性', '宿泊の質'],
    otherAspects: ['サービス', '料金', 'アクセス'],
    description: 'ホテル・旅館では「快適性・宿泊の質」が最も重要な評価軸です。',
    keywords: {
      essence: [
        '快適', '部屋', '寝心地', 'ベッド', '布団', '枕', '静か', 'うるさい',
        '清潔', '温度', 'エアコン', '暖房', '冷房', 'バス', 'シャワー',
        'アメニティ', '設備', 'Wi-Fi', 'ネット環境', '眺望', '景色'
      ],
      other: [
        'サービス', 'スタッフ', '接客', 'フロント', '対応', '親切', '丁寧',
        '料金', '価格', '値段', 'コスパ', 'アクセス', '立地', '駅近',
        '駐車場', '朝食', '食事', 'レストラン', 'チェックイン', 'チェックアウト'
      ]
    }
  }
]

export function getBusinessEssenceConfig(categoryId: string): BusinessEssenceConfig | null {
  return businessEssenceConfigs.find(config => config.categoryId === categoryId) || null
}

export function getAllBusinessEssenceConfigs(): BusinessEssenceConfig[] {
  return businessEssenceConfigs
}

// カテゴリー名からcategoryIdを取得
export function getCategoryIdByName(categoryName: string): string | null {
  const config = businessEssenceConfigs.find(config => 
    config.categoryName === categoryName || config.categoryId === categoryName
  )
  return config?.categoryId || null
}