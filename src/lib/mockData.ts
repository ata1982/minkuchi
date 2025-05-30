// モックデータとユーティリティ関数
import { Company, Review, Event, User, Category } from '@/types/index'

// モック企業データ
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'カフェ・ド・パリ',
    category: 'restaurant',
    rating: 4.5,
    reviewCount: 127,
    description: '本格的なフレンチカフェ。落ち着いた雰囲気でゆっくりとお食事をお楽しみいただけます。',
    location: '渋谷区',
    address: '東京都渋谷区神南1-2-3',
    phone: '03-1234-5678',
    website: 'https://cafe-de-paris.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    hours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '08:00', close: '23:00', closed: false },
      sunday: { open: '08:00', close: '22:00', closed: false }
    },
    tags: ['フレンチ', 'カフェ', 'おしゃれ'],
    verified: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15'),
    owner: {
      id: 'owner1',
      name: '田中オーナー',
      email: 'owner@cafe-de-paris.jp',
      verified: true
    }
  },
  {
    id: '2',
    name: 'ビューティーサロン LUXE',
    category: 'beauty',
    rating: 4.8,
    reviewCount: 89,
    description: '最新の美容技術と丁寧なカウンセリングで、お客様の美をサポートします。',
    location: '新宿区',
    address: '東京都新宿区西新宿1-5-7',
    phone: '03-2345-6789',
    website: 'https://luxe-salon.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '10:00', close: '20:00', closed: false },
      tuesday: { open: '10:00', close: '20:00', closed: false },
      wednesday: { open: '10:00', close: '20:00', closed: false },
      thursday: { open: '10:00', close: '20:00', closed: false },
      friday: { open: '10:00', close: '21:00', closed: false },
      saturday: { open: '09:00', close: '21:00', closed: false },
      sunday: { open: '09:00', close: '19:00', closed: false }
    },
    tags: ['美容院', 'ヘアサロン', '高級'],
    verified: true,
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Tech Repair Plus',
    category: 'repair',
    rating: 4.2,
    reviewCount: 156,
    description: 'スマートフォン・パソコンの修理専門店。迅速で丁寧な対応を心がけています。',
    location: '秋葉原',
    address: '東京都千代田区外神田1-8-9',
    phone: '03-3456-7890',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '10:00', close: '19:00', closed: false },
      tuesday: { open: '10:00', close: '19:00', closed: false },
      wednesday: { open: '10:00', close: '19:00', closed: false },
      thursday: { open: '10:00', close: '19:00', closed: false },
      friday: { open: '10:00', close: '19:00', closed: false },
      saturday: { open: '10:00', close: '18:00', closed: false },
      sunday: { open: '11:00', close: '17:00', closed: false }
    },
    tags: ['修理', 'スマホ', 'パソコン'],
    verified: false,
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2024-01-10')
  },

  // 教育・学習カテゴリ
  {
    id: 'edu-1',
    name: '明進学習塾',
    category: 'education',
    rating: 4.6,
    reviewCount: 234,
    description: '小中高生を対象とした総合学習塾。個別指導と集団授業を組み合わせ、一人ひとりに最適な学習プランを提供します。',
    location: '世田谷区',
    address: '東京都世田谷区成城2-15-8',
    phone: '03-5555-1111',
    website: 'https://meishin-juku.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    hours: {
      monday: { open: '15:00', close: '22:00', closed: false },
      tuesday: { open: '15:00', close: '22:00', closed: false },
      wednesday: { open: '15:00', close: '22:00', closed: false },
      thursday: { open: '15:00', close: '22:00', closed: false },
      friday: { open: '15:00', close: '22:00', closed: false },
      saturday: { open: '09:00', close: '19:00', closed: false },
      sunday: { open: '09:00', close: '17:00', closed: false }
    },
    tags: ['進学塾', '個別指導', '受験対策'],
    verified: true,
    createdAt: new Date('2022-04-01'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'edu-2',
    name: 'ECC外語学院 渋谷校',
    category: 'education',
    rating: 4.4,
    reviewCount: 189,
    description: '英会話・多言語学習の専門スクール。ネイティブ講師による質の高いレッスンで、実践的な語学力を身につけられます。',
    location: '渋谷区',
    address: '東京都渋谷区道玄坂1-12-1',
    phone: '03-6666-2222',
    website: 'https://ecc.jp/shibuya',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '10:00', close: '21:00', closed: false },
      tuesday: { open: '10:00', close: '21:00', closed: false },
      wednesday: { open: '10:00', close: '21:00', closed: false },
      thursday: { open: '10:00', close: '21:00', closed: false },
      friday: { open: '10:00', close: '21:00', closed: false },
      saturday: { open: '10:00', close: '19:00', closed: false },
      sunday: { open: '10:00', close: '18:00', closed: false }
    },
    tags: ['英会話', 'ネイティブ講師', 'TOEIC'],
    verified: true,
    createdAt: new Date('2021-09-15'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'edu-3',
    name: 'パソコン教室わかるとできる',
    category: 'education',
    rating: 4.3,
    reviewCount: 167,
    description: 'シニア世代から学生まで、パソコン・スマホの基本操作から資格取得まで幅広くサポート。個人のペースに合わせた丁寧な指導が評判です。',
    location: '練馬区',
    address: '東京都練馬区石神井公園2-26-10',
    phone: '03-7777-3333',
    website: 'https://pc-wakaru.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '10:00', close: '20:00', closed: false },
      tuesday: { open: '10:00', close: '20:00', closed: false },
      wednesday: { open: '10:00', close: '20:00', closed: false },
      thursday: { open: '10:00', close: '20:00', closed: false },
      friday: { open: '10:00', close: '20:00', closed: false },
      saturday: { open: '10:00', close: '17:00', closed: false },
      sunday: { open: '10:00', close: '17:00', closed: false }
    },
    tags: ['パソコン教室', 'シニア向け', '資格取得'],
    verified: true,
    createdAt: new Date('2022-11-20'),
    updatedAt: new Date('2024-01-12')
  },

  // 医療・ヘルスケアカテゴリ
  {
    id: 'med-1',
    name: '青空クリニック',
    category: 'healthcare',
    rating: 4.7,
    reviewCount: 342,
    description: '内科・小児科・皮膚科を診療する地域密着型クリニック。土日診療も行っており、お忙しい方にも通いやすい環境を提供しています。',
    location: '杉並区',
    address: '東京都杉並区荻窪3-47-17',
    phone: '03-8888-4444',
    website: 'https://aozora-clinic.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    hours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '15:00', closed: false },
      sunday: { open: '09:00', close: '15:00', closed: false }
    },
    tags: ['内科', '小児科', '土日診療'],
    verified: true,
    createdAt: new Date('2020-03-01'),
    updatedAt: new Date('2024-01-30')
  },
  {
    id: 'med-2',
    name: 'スマイル歯科医院',
    category: 'healthcare',
    rating: 4.5,
    reviewCount: 198,
    description: '一般歯科から審美歯科、インプラント治療まで幅広く対応。最新の設備と痛みの少ない治療で、患者様の笑顔をサポートします。',
    location: '品川区',
    address: '東京都品川区大井町1-23-12',
    phone: '03-9999-5555',
    website: 'https://smile-dental.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '09:30', close: '19:00', closed: false },
      tuesday: { open: '09:30', close: '19:00', closed: false },
      wednesday: { open: '09:30', close: '19:00', closed: false },
      thursday: { open: '09:30', close: '19:00', closed: true },
      friday: { open: '09:30', close: '19:00', closed: false },
      saturday: { open: '09:00', close: '17:00', closed: false },
      sunday: { open: '09:00', close: '15:00', closed: false }
    },
    tags: ['歯科', 'インプラント', '審美歯科'],
    verified: true,
    createdAt: new Date('2019-07-10'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: 'med-3',
    name: 'さくら薬局 新宿店',
    category: 'healthcare',
    rating: 4.2,
    reviewCount: 156,
    description: '処方箋調剤はもちろん、健康相談や在宅医療サポートも行う調剤薬局。薬剤師が丁寧にお薬の説明をいたします。',
    location: '新宿区',
    address: '東京都新宿区新宿3-38-1',
    phone: '03-1111-6666',
    website: 'https://sakura-pharmacy.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '09:00', close: '20:00', closed: false },
      tuesday: { open: '09:00', close: '20:00', closed: false },
      wednesday: { open: '09:00', close: '20:00', closed: false },
      thursday: { open: '09:00', close: '20:00', closed: false },
      friday: { open: '09:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '18:00', closed: false },
      sunday: { open: '10:00', close: '17:00', closed: false }
    },
    tags: ['調剤薬局', '健康相談', '在宅医療'],
    verified: true,
    createdAt: new Date('2021-05-20'),
    updatedAt: new Date('2024-01-15')
  },

  // エンターテインメントカテゴリ
  {
    id: 'ent-1',
    name: 'TOHOシネマズ渋谷',
    category: 'entertainment',
    rating: 4.3,
    reviewCount: 567,
    description: '最新映画からクラシック作品まで楽しめるシネマコンプレックス。IMAX、4DXなど最新の上映システムも完備しています。',
    location: '渋谷区',
    address: '東京都渋谷区道玄坂2-6-17',
    phone: '03-2222-7777',
    website: 'https://tohocinemas.jp/shibuya',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    hours: {
      monday: { open: '09:00', close: '24:00', closed: false },
      tuesday: { open: '09:00', close: '24:00', closed: false },
      wednesday: { open: '09:00', close: '24:00', closed: false },
      thursday: { open: '09:00', close: '24:00', closed: false },
      friday: { open: '09:00', close: '25:00', closed: false },
      saturday: { open: '09:00', close: '25:00', closed: false },
      sunday: { open: '09:00', close: '24:00', closed: false }
    },
    tags: ['映画館', 'IMAX', '4DX'],
    verified: true,
    createdAt: new Date('2018-12-01'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: 'ent-2',
    name: 'カラオケビッグエコー新宿東口店',
    category: 'entertainment',
    rating: 4.1,
    reviewCount: 423,
    description: '最新のカラオケ機器と豊富な楽曲数で楽しめるカラオケ店。パーティールームや個室も充実しており、様々なシーンでご利用いただけます。',
    location: '新宿区',
    address: '東京都新宿区新宿3-24-3',
    phone: '03-3333-8888',
    website: 'https://bigecho.jp/shinjuku',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '11:00', close: '05:00', closed: false },
      tuesday: { open: '11:00', close: '05:00', closed: false },
      wednesday: { open: '11:00', close: '05:00', closed: false },
      thursday: { open: '11:00', close: '05:00', closed: false },
      friday: { open: '11:00', close: '06:00', closed: false },
      saturday: { open: '11:00', close: '06:00', closed: false },
      sunday: { open: '11:00', close: '05:00', closed: false }
    },
    tags: ['カラオケ', 'パーティー', '深夜営業'],
    verified: true,
    createdAt: new Date('2020-08-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'ent-3',
    name: 'ゲームセンターセガ秋葉原',
    category: 'entertainment',
    rating: 4.4,
    reviewCount: 289,
    description: '最新アーケードゲームからクレーンゲームまで充実のラインナップ。e-sportsエリアも設置し、競技ゲームも楽しめます。',
    location: '千代田区',
    address: '東京都千代田区外神田1-10-9',
    phone: '03-4444-9999',
    website: 'https://sega.jp/akihabara',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '10:00', close: '24:00', closed: false },
      tuesday: { open: '10:00', close: '24:00', closed: false },
      wednesday: { open: '10:00', close: '24:00', closed: false },
      thursday: { open: '10:00', close: '24:00', closed: false },
      friday: { open: '10:00', close: '25:00', closed: false },
      saturday: { open: '10:00', close: '25:00', closed: false },
      sunday: { open: '10:00', close: '24:00', closed: false }
    },
    tags: ['ゲームセンター', 'e-sports', 'クレーンゲーム'],
    verified: true,
    createdAt: new Date('2019-11-30'),
    updatedAt: new Date('2024-01-25')
  },

  // スポーツ・フィットネスカテゴリ
  {
    id: 'sports-1',
    name: 'メガロス渋谷店',
    category: 'sports',
    rating: 4.4,
    reviewCount: 342,
    description: '最新マシンを完備した総合フィットネスクラブ。プール、スタジオ、サウナも併設。初心者から上級者まで幅広いプログラムをご用意しています。',
    location: '渋谷区',
    address: '東京都渋谷区宇田川町12-9',
    phone: '03-5555-1111',
    website: 'https://megalos.co.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    hours: {
      monday: { open: '06:00', close: '23:00', closed: false },
      tuesday: { open: '06:00', close: '23:00', closed: false },
      wednesday: { open: '06:00', close: '23:00', closed: false },
      thursday: { open: '06:00', close: '23:00', closed: false },
      friday: { open: '06:00', close: '23:00', closed: false },
      saturday: { open: '09:00', close: '21:00', closed: false },
      sunday: { open: '09:00', close: '21:00', closed: false }
    },
    tags: ['フィットネス', 'プール', 'サウナ'],
    verified: true,
    createdAt: new Date('2020-02-01'),
    updatedAt: new Date('2024-01-29')
  },
  {
    id: 'sports-2',
    name: 'LAVA新宿東口店',
    category: 'sports',
    rating: 4.6,
    reviewCount: 598,
    description: 'ホットヨガスタジオLAVA。温かい環境でのヨガで、心と体をリフレッシュ。初心者向けから上級者向けまで多彩なプログラムを展開。',
    location: '新宿区',
    address: '東京都新宿区新宿3-36-10',
    phone: '03-6666-2222',
    website: 'https://yoga-lava.com',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '07:00', close: '22:30', closed: false },
      tuesday: { open: '07:00', close: '22:30', closed: false },
      wednesday: { open: '07:00', close: '22:30', closed: false },
      thursday: { open: '07:00', close: '22:30', closed: false },
      friday: { open: '07:00', close: '22:30', closed: false },
      saturday: { open: '08:00', close: '19:30', closed: false },
      sunday: { open: '08:00', close: '19:30', closed: false }
    },
    tags: ['ホットヨガ', '初心者歓迎', '女性専用'],
    verified: true,
    createdAt: new Date('2021-06-15'),
    updatedAt: new Date('2024-01-24')
  },
  {
    id: 'sports-3',
    name: '東京ゴルフクラブ',
    category: 'sports',
    rating: 4.5,
    reviewCount: 267,
    description: '都心からアクセス良好な本格ゴルフ場。美しい景観と充実した設備で、快適なゴルフライフをサポート。初心者レッスンも充実。',
    location: '世田谷区',
    address: '東京都世田谷区砧8-10-1',
    phone: '03-7777-3333',
    website: 'https://tokyo-golf.jp',
    imageUrl: '/api/placeholder/400/300',
    images: ['/api/placeholder/400/300'],
    hours: {
      monday: { open: '06:00', close: '18:00', closed: false },
      tuesday: { open: '06:00', close: '18:00', closed: false },
      wednesday: { open: '06:00', close: '18:00', closed: false },
      thursday: { open: '06:00', close: '18:00', closed: false },
      friday: { open: '06:00', close: '18:00', closed: false },
      saturday: { open: '05:30', close: '18:00', closed: false },
      sunday: { open: '05:30', close: '18:00', closed: false }
    },
    tags: ['ゴルフ', 'レッスン', '景観'],
    verified: true,
    createdAt: new Date('2018-09-20'),
    updatedAt: new Date('2024-01-26')
  }
]

// モックユーザーデータ
export const mockUsers: User[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    avatar: '/api/placeholder/40/40',
    role: 'user',
    createdAt: new Date('2023-01-01'),
    preferences: {
      location: '東京都渋谷区',
      categories: ['restaurant', 'beauty'],
      notifications: true,
      theme: 'light',
      language: 'ja'
    },
    points: 1250,
    badges: [
      {
        id: '1',
        name: 'レビューマスター',
        description: '10件以上のレビューを投稿',
        icon: '🏆',
        unlockedAt: new Date('2023-06-15')
      }
    ]
  }
]

// モックレビューデータ
export const mockReviews: Review[] = [
  {
    id: '1',
    companyId: '1',
    userId: 'user1',
    userName: '田中太郎',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: '素晴らしい雰囲気',
    content: 'フレンチの本格的な味を楽しめました。スタッフの方も親切で、また来たいと思います。',
    images: ['/api/placeholder/300/200'],
    helpful: 12,
    createdAt: new Date('2024-01-10'),
    verified: true
  },
  {
    id: '2',
    companyId: '2',
    userId: 'user2',
    userName: '佐藤花子',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: '技術力が高い',
    content: 'カットとカラーをお願いしました。仕上がりに満足しています。',
    helpful: 8,
    createdAt: new Date('2024-01-08'),
    verified: false
  },

  // 教育・学習カテゴリのレビュー
  {
    id: 'edu-rev-1',
    companyId: 'edu-1',
    userId: 'user-edu-1',
    userName: '山田母',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: '成績が大幅に向上しました',
    content: '息子が中学2年生からお世話になっています。個別指導のおかげで苦手だった数学の成績が大幅に上がりました。先生方も熱心で、親身になって指導してくださいます。',
    helpful: 23,
    createdAt: new Date('2024-01-20'),
    verified: true
  },
  {
    id: 'edu-rev-2',
    companyId: 'edu-1',
    userId: 'user-edu-2',
    userName: '高校生A',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: '自習室が使いやすい',
    content: '受験勉強で利用しています。自習室が静かで集中できるし、わからないことがあったらすぐに先生に聞けるのが良いです。',
    helpful: 15,
    createdAt: new Date('2024-01-15'),
    verified: true
  },
  {
    id: 'edu-rev-3',
    companyId: 'edu-2',
    userId: 'user-edu-3',
    userName: 'ビジネスマン',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: 'TOEIC対策が充実',
    content: 'TOEIC対策コースを受講しました。ネイティブ講師の実践的な指導で、目標スコアを達成できました。駅からも近くて通いやすいです。',
    helpful: 31,
    createdAt: new Date('2024-01-12'),
    verified: true
  },
  {
    id: 'edu-rev-4',
    companyId: 'edu-3',
    userId: 'user-edu-4',
    userName: 'シニア学習者',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: 'シニアにも優しい指導',
    content: '60歳からパソコンを始めました。わからないことを何度聞いても丁寧に教えてくれるので、安心して学習できています。',
    helpful: 18,
    createdAt: new Date('2024-01-08'),
    verified: true
  },

  // 医療・ヘルスケアカテゴリのレビュー
  {
    id: 'med-rev-1',
    companyId: 'med-1',
    userId: 'user-med-1',
    userName: '地域住民',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: '土日診療が助かります',
    content: '平日は仕事で通えないので、土日診療をしてくれるのは本当に助かります。先生も看護師さんも優しく、安心して受診できます。',
    helpful: 42,
    createdAt: new Date('2024-01-25'),
    verified: true
  },
  {
    id: 'med-rev-2',
    companyId: 'med-1',
    userId: 'user-med-2',
    userName: '子育てママ',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: '小児科が信頼できる',
    content: '子供の風邪で受診しました。小児科の先生が子供にも優しく接してくれて、説明も分かりやすかったです。',
    helpful: 26,
    createdAt: new Date('2024-01-18'),
    verified: true
  },
  {
    id: 'med-rev-3',
    companyId: 'med-2',
    userId: 'user-med-3',
    userName: '患者さん',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: '痛みの少ない治療',
    content: '虫歯の治療で通っています。本当に痛みが少なくて驚きました。設備も新しく、清潔感があります。',
    helpful: 35,
    createdAt: new Date('2024-01-22'),
    verified: true
  },
  {
    id: 'med-rev-4',
    companyId: 'med-3',
    userId: 'user-med-4',
    userName: '薬局利用者',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: '薬剤師さんが親切',
    content: '処方薬について詳しく説明してくれました。飲み合わせについても気を付けてくれて、安心して薬を受け取れます。',
    helpful: 19,
    createdAt: new Date('2024-01-16'),
    verified: true
  },

  // エンターテインメントカテゴリのレビュー
  {
    id: 'ent-rev-1',
    companyId: 'ent-1',
    userId: 'user-ent-1',
    userName: '映画好き',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: 'IMAX体験が最高！',
    content: 'IMAX上映で映画を観ました。音響も映像も迫力満点で、映画館でしか味わえない体験でした。座席も快適です。',
    helpful: 67,
    createdAt: new Date('2024-01-28'),
    verified: true
  },
  {
    id: 'ent-rev-2',
    companyId: 'ent-1',
    userId: 'user-ent-2',
    userName: 'デートカップル',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: 'アクセスが良い',
    content: '渋谷駅から近くてアクセスが良いです。上映スケジュールも豊富で、見たい映画がいつでも楽しめます。',
    helpful: 34,
    createdAt: new Date('2024-01-24'),
    verified: true
  },
  {
    id: 'ent-rev-3',
    companyId: 'ent-2',
    userId: 'user-ent-3',
    userName: 'カラオケ好き',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: '楽曲数が豊富',
    content: '最新曲から懐かしい曲まで、楽曲数がとても豊富です。音響設備も良くて、気持ちよく歌えました。',
    helpful: 28,
    createdAt: new Date('2024-01-21'),
    verified: true
  },
  {
    id: 'ent-rev-4',
    companyId: 'ent-3',
    userId: 'user-ent-4',
    userName: 'ゲーマー',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: '最新ゲームが充実',
    content: '最新のアーケードゲームがすぐに導入されるので、いつ来ても新しい楽しみがあります。e-sportsエリアも本格的です。',
    helpful: 45,
    createdAt: new Date('2024-01-26'),
    verified: true
  },

  // スポーツ・フィットネスカテゴリのレビュー
  {
    id: 'sports-rev-1',
    companyId: 'sports-1',
    userId: 'user-sports-1',
    userName: 'フィットネス愛好者',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: '設備が充実している',
    content: '最新のマシンが豊富で、プールやサウナも完備されています。スタッフの方も親切で、トレーニングのアドバイスもしてくれます。',
    helpful: 52,
    createdAt: new Date('2024-01-29'),
    verified: true
  },
  {
    id: 'sports-rev-2',
    companyId: 'sports-1',
    userId: 'user-sports-2',
    userName: '初心者',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: '初心者にも優しい',
    content: 'ジム初心者でしたが、スタッフの方が丁寧にマシンの使い方を教えてくれました。初心者向けプログラムも充実しています。',
    helpful: 38,
    createdAt: new Date('2024-01-25'),
    verified: true
  },
  {
    id: 'sports-rev-3',
    companyId: 'sports-2',
    userId: 'user-sports-3',
    userName: 'ヨガ初心者',
    userAvatar: '/api/placeholder/40/40',
    rating: 5,
    title: '心も体もリフレッシュ',
    content: 'ホットヨガ初体験でしたが、インストラクターの方が優しく指導してくれました。汗をかいてとてもスッキリしました。',
    helpful: 41,
    createdAt: new Date('2024-01-23'),
    verified: true
  },
  {
    id: 'sports-rev-4',
    companyId: 'sports-3',
    userId: 'user-sports-4',
    userName: 'ゴルフ愛好者',
    userAvatar: '/api/placeholder/40/40',
    rating: 4,
    title: '景色が美しい',
    content: '都心からのアクセスも良く、コースの景観が素晴らしいです。初心者レッスンも受けましたが、プロの指導で上達を実感できました。',
    helpful: 33,
    createdAt: new Date('2024-01-27'),
    verified: true
  }
]

// モックイベントデータ
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'フレンチ料理教室',
    description: 'プロのシェフが教える本格フレンチ料理教室。初心者歓迎です。',
    companyId: '1',
    location: '渋谷区神南1-2-3',
    startDate: new Date('2024-02-15T14:00:00'),
    endDate: new Date('2024-02-15T17:00:00'),
    category: 'workshop',
    imageUrl: '/api/placeholder/400/300',
    tags: ['料理', 'フレンチ', '体験'],
    attendeeCount: 12
  },
  {
    id: '2',
    title: 'ヘアケア講座',
    description: '美容のプロが教えるヘアケアの基本。正しいシャンプー方法から学べます。',
    companyId: '2',
    location: '新宿区西新宿1-5-7',
    startDate: new Date('2024-02-20T19:00:00'),
    endDate: new Date('2024-02-20T20:30:00'),
    category: 'seminar',
    imageUrl: '/api/placeholder/400/300',
    tags: ['美容', 'ヘアケア', '講座'],
    attendeeCount: 8
  }
]

// モックカテゴリデータ
export const mockCategories: Category[] = [
  {
    id: 'restaurant',
    name: 'レストラン・飲食',
    emoji: '🍽️',
    description: 'レストラン、カフェ、居酒屋など',
    isActive: true,
    subcategories: [
      { id: 'french', name: 'フレンチ', description: 'フランス料理' },
      { id: 'italian', name: 'イタリアン', description: 'イタリア料理' },
      { id: 'japanese', name: '和食', description: '日本料理' }
    ]
  },
  {
    id: 'beauty',
    name: '美容・ヘルスケア',
    emoji: '💄',
    description: '美容院、エステ、マッサージなど',
    isActive: true,
    subcategories: [
      { id: 'hair', name: 'ヘアサロン', description: '美容院・理容院' },
      { id: 'nail', name: 'ネイルサロン', description: 'ネイルケア' },
      { id: 'massage', name: 'マッサージ', description: 'リラクゼーション' }
    ]
  },
  {
    id: 'retail',
    name: '小売・ショッピング',
    emoji: '🛍️',
    description: '衣料品、雑貨、家電など',
    isActive: true,
    subcategories: [
      { id: 'clothing', name: 'ファッション', description: '衣料品・アクセサリー' },
      { id: 'electronics', name: '家電', description: '電化製品' },
      { id: 'books', name: '書籍', description: '本・雑誌' }
    ]
  },
  {
    id: 'service',
    name: 'サービス',
    emoji: '🔧',
    description: '修理、清掃、配送など',
    isActive: true,
    subcategories: [
      { id: 'repair', name: '修理サービス', description: 'スマホ・PC修理など' },
      { id: 'cleaning', name: 'クリーニング', description: '清掃・洗濯サービス' },
      { id: 'delivery', name: '配送', description: '宅配・配送サービス' }
    ]
  },
  {
    id: 'education',
    name: '教育・学習',
    emoji: '📚',
    description: '学習塾、語学学校、オンライン講座など',
    isActive: true,
    subcategories: [
      { id: 'tutoring', name: '個別指導', description: 'マンツーマンの学習支援' },
      { id: 'language', name: '語学学習', description: '英会話・多言語' },
      { id: 'online-course', name: 'オンライン講座', description: 'インターネットを利用した学習' }
    ]
  },
  {
    id: 'healthcare',
    name: '医療・ヘルスケア',
    emoji: '🏥',
    description: '病院、クリニック、薬局など',
    isActive: true,
    subcategories: [
      { id: 'clinic', name: 'クリニック', description: '一般診療・専門診療' },
      { id: 'dental', name: '歯科医院', description: '歯の治療・予防' },
      { id: 'pharmacy', name: '薬局', description: '処方箋調剤・健康相談' }
    ]
  },
  {
    id: 'entertainment',
    name: 'エンターテインメント',
    emoji: '🎭',
    description: '映画館、カラオケ、ゲームセンターなど',
    isActive: true,
    subcategories: [
      { id: 'cinema', name: '映画館', description: '映画の上映・鑑賞' },
      { id: 'karaoke', name: 'カラオケ', description: '歌唱・パーティー' },
      { id: 'arcade', name: 'ゲームセンター', description: 'アーケードゲーム・クレーンゲーム' }
    ]
  },
  {
    id: 'sports',
    name: 'スポーツ・フィットネス',
    emoji: '🏋️‍♀️',
    description: 'ジム、ヨガ、ゴルフ場など',
    isActive: true,
    subcategories: [
      { id: 'gym', name: 'ジム', description: 'フィットネス・トレーニング' },
      { id: 'yoga', name: 'ヨガ', description: '心と体のリフレッシュ' },
      { id: 'golf', name: 'ゴルフ場', description: 'ゴルフのプレー・レッスン' }
    ]
  }
]

// ユーティリティ関数
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInDays > 0) {
    return `${diffInDays}日前`
  } else if (diffInHours > 0) {
    return `${diffInHours}時間前`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}分前`
  } else {
    return 'たった今'
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getBusinessStatus(hours: Company['hours']): { isOpen: boolean; nextChange: string } {
  const now = new Date()
  const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()] as keyof typeof hours
  const currentTime = now.getHours() * 100 + now.getMinutes()
  
  const todayHours = hours[currentDay]
  
  if (todayHours.closed) {
    return { isOpen: false, nextChange: '定休日' }
  }
  
  const openTime = parseInt(todayHours.open.replace(':', ''))
  const closeTime = parseInt(todayHours.close.replace(':', ''))
  
  const isOpen = currentTime >= openTime && currentTime < closeTime
  
  return {
    isOpen,
    nextChange: isOpen ? `${todayHours.close}に閉店` : `${todayHours.open}に開店`
  }
}