// モックデータとユーティリティ関数
import { Company, Review, Event, User, Category, CategoryEssenceConfig, BusinessHours } from '@/types/index'

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
    images: JSON.stringify(['/api/placeholder/400/300', '/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '08:00', close: '23:00', closed: false },
      sunday: { open: '08:00', close: '22:00', closed: false }
    }),
    tags: JSON.stringify(['フレンチ', 'カフェ', 'おしゃれ']),
    verified: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15'),
    ownerId: 'owner1',
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '10:00', close: '20:00', closed: false },
      tuesday: { open: '10:00', close: '20:00', closed: false },
      wednesday: { open: '10:00', close: '20:00', closed: false },
      thursday: { open: '10:00', close: '20:00', closed: false },
      friday: { open: '10:00', close: '21:00', closed: false },
      saturday: { open: '09:00', close: '21:00', closed: false },
      sunday: { open: '09:00', close: '19:00', closed: false }
    }),
    tags: JSON.stringify(['美容院', 'ヘアサロン', '高級']),
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '10:00', close: '19:00', closed: false },
      tuesday: { open: '10:00', close: '19:00', closed: false },
      wednesday: { open: '10:00', close: '19:00', closed: false },
      thursday: { open: '10:00', close: '19:00', closed: false },
      friday: { open: '10:00', close: '19:00', closed: false },
      saturday: { open: '10:00', close: '18:00', closed: false },
      sunday: { open: '11:00', close: '17:00', closed: false }
    }),
    tags: JSON.stringify(['修理', 'スマホ', 'パソコン']),
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
    images: JSON.stringify(['/api/placeholder/400/300', '/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '15:00', close: '22:00', closed: false },
      tuesday: { open: '15:00', close: '22:00', closed: false },
      wednesday: { open: '15:00', close: '22:00', closed: false },
      thursday: { open: '15:00', close: '22:00', closed: false },
      friday: { open: '15:00', close: '22:00', closed: false },
      saturday: { open: '09:00', close: '19:00', closed: false },
      sunday: { open: '09:00', close: '17:00', closed: false }
    }),
    tags: JSON.stringify(['進学塾', '個別指導', '受験対策']),
    verified: true,
    createdAt: new Date('2022-04-01'),
    updatedAt: new Date('2024-01-25'),
    ownerId: 'owner2',
    owner: {
      id: 'owner2',
      name: '鈴木オーナー',
      email: 'owner@meishin-juku.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '10:00', close: '21:00', closed: false },
      tuesday: { open: '10:00', close: '21:00', closed: false },
      wednesday: { open: '10:00', close: '21:00', closed: false },
      thursday: { open: '10:00', close: '21:00', closed: false },
      friday: { open: '10:00', close: '21:00', closed: false },
      saturday: { open: '10:00', close: '19:00', closed: false },
      sunday: { open: '10:00', close: '18:00', closed: false }
    }),
    tags: JSON.stringify(['英会話', 'ネイティブ講師', 'TOEIC']),
    verified: true,
    createdAt: new Date('2021-09-15'),
    updatedAt: new Date('2024-01-18'),
    ownerId: 'owner3',
    owner: {
      id: 'owner3',
      name: '佐藤オーナー',
      email: 'owner@ecc.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '10:00', close: '20:00', closed: false },
      tuesday: { open: '10:00', close: '20:00', closed: false },
      wednesday: { open: '10:00', close: '20:00', closed: false },
      thursday: { open: '10:00', close: '20:00', closed: false },
      friday: { open: '10:00', close: '20:00', closed: false },
      saturday: { open: '10:00', close: '17:00', closed: false },
      sunday: { open: '10:00', close: '17:00', closed: false }
    }),
    tags: JSON.stringify(['パソコン教室', 'シニア向け', '資格取得']),
    verified: true,
    createdAt: new Date('2022-11-20'),
    updatedAt: new Date('2024-01-12'),
    ownerId: 'owner4',
    owner: {
      id: 'owner4',
      name: '高橋オーナー',
      email: 'owner@pc-wakaru.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300', '/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '15:00', closed: false },
      sunday: { open: '09:00', close: '15:00', closed: false }
    }),
    tags: JSON.stringify(['内科', '小児科', '土日診療']),
    verified: true,
    createdAt: new Date('2020-03-01'),
    updatedAt: new Date('2024-01-30'),
    ownerId: 'owner5',
    owner: {
      id: 'owner5',
      name: '中村オーナー',
      email: 'owner@aozora-clinic.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '09:30', close: '19:00', closed: false },
      tuesday: { open: '09:30', close: '19:00', closed: false },
      wednesday: { open: '09:30', close: '19:00', closed: false },
      thursday: { open: '09:30', close: '19:00', closed: true },
      friday: { open: '09:30', close: '19:00', closed: false },
      saturday: { open: '09:00', close: '17:00', closed: false },
      sunday: { open: '09:00', close: '15:00', closed: false }
    }),
    tags: JSON.stringify(['歯科', 'インプラント', '審美歯科']),
    verified: true,
    createdAt: new Date('2019-07-10'),
    updatedAt: new Date('2024-01-22'),
    ownerId: 'owner6',
    owner: {
      id: 'owner6',
      name: '佐々木オーナー',
      email: 'owner@smile-dental.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '09:00', close: '20:00', closed: false },
      tuesday: { open: '09:00', close: '20:00', closed: false },
      wednesday: { open: '09:00', close: '20:00', closed: false },
      thursday: { open: '09:00', close: '20:00', closed: false },
      friday: { open: '09:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '18:00', closed: false },
      sunday: { open: '10:00', close: '17:00', closed: false }
    }),
    tags: JSON.stringify(['調剤薬局', '健康相談', '在宅医療']),
    verified: true,
    createdAt: new Date('2021-05-20'),
    updatedAt: new Date('2024-01-15'),
    ownerId: 'owner7',
    owner: {
      id: 'owner7',
      name: '伊藤オーナー',
      email: 'owner@sakura-pharmacy.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300', '/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '09:00', close: '24:00', closed: false },
      tuesday: { open: '09:00', close: '24:00', closed: false },
      wednesday: { open: '09:00', close: '24:00', closed: false },
      thursday: { open: '09:00', close: '24:00', closed: false },
      friday: { open: '09:00', close: '25:00', closed: false },
      saturday: { open: '09:00', close: '25:00', closed: false },
      sunday: { open: '09:00', close: '24:00', closed: false }
    }),
    tags: JSON.stringify(['映画館', 'IMAX', '4DX']),
    verified: true,
    createdAt: new Date('2018-12-01'),
    updatedAt: new Date('2024-01-28'),
    ownerId: 'owner8',
    owner: {
      id: 'owner8',
      name: '渡辺オーナー',
      email: 'owner@tohocinemas.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '11:00', close: '05:00', closed: false },
      tuesday: { open: '11:00', close: '05:00', closed: false },
      wednesday: { open: '11:00', close: '05:00', closed: false },
      thursday: { open: '11:00', close: '05:00', closed: false },
      friday: { open: '11:00', close: '06:00', closed: false },
      saturday: { open: '11:00', close: '06:00', closed: false },
      sunday: { open: '11:00', close: '05:00', closed: false }
    }),
    tags: JSON.stringify(['カラオケ', 'パーティー', '深夜営業']),
    verified: true,
    createdAt: new Date('2020-08-15'),
    updatedAt: new Date('2024-01-20'),
    ownerId: 'owner9',
    owner: {
      id: 'owner9',
      name: '山本オーナー',
      email: 'owner@bigecho.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '10:00', close: '24:00', closed: false },
      tuesday: { open: '10:00', close: '24:00', closed: false },
      wednesday: { open: '10:00', close: '24:00', closed: false },
      thursday: { open: '10:00', close: '24:00', closed: false },
      friday: { open: '10:00', close: '25:00', closed: false },
      saturday: { open: '10:00', close: '25:00', closed: false },
      sunday: { open: '10:00', close: '24:00', closed: false }
    }),
    tags: JSON.stringify(['ゲームセンター', 'e-sports', 'クレーンゲーム']),
    verified: true,
    createdAt: new Date('2019-11-30'),
    updatedAt: new Date('2024-01-25'),
    ownerId: 'owner10',
    owner: {
      id: 'owner10',
      name: '小林オーナー',
      email: 'owner@sega.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300', '/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '06:00', close: '23:00', closed: false },
      tuesday: { open: '06:00', close: '23:00', closed: false },
      wednesday: { open: '06:00', close: '23:00', closed: false },
      thursday: { open: '06:00', close: '23:00', closed: false },
      friday: { open: '06:00', close: '23:00', closed: false },
      saturday: { open: '09:00', close: '21:00', closed: false },
      sunday: { open: '09:00', close: '21:00', closed: false }
    }),
    tags: JSON.stringify(['フィットネス', 'プール', 'サウナ']),
    verified: true,
    createdAt: new Date('2020-02-01'),
    updatedAt: new Date('2024-01-29'),
    ownerId: 'owner11',
    owner: {
      id: 'owner11',
      name: '松本オーナー',
      email: 'owner@megalos.co.jp',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '07:00', close: '22:30', closed: false },
      tuesday: { open: '07:00', close: '22:30', closed: false },
      wednesday: { open: '07:00', close: '22:30', closed: false },
      thursday: { open: '07:00', close: '22:30', closed: false },
      friday: { open: '07:00', close: '22:30', closed: false },
      saturday: { open: '08:00', close: '19:30', closed: false },
      sunday: { open: '08:00', close: '19:30', closed: false }
    }),
    tags: JSON.stringify(['ホットヨガ', '初心者歓迎', '女性専用']),
    verified: true,
    createdAt: new Date('2021-06-15'),
    updatedAt: new Date('2024-01-24'),
    ownerId: 'owner12',
    owner: {
      id: 'owner12',
      name: '井上オーナー',
      email: 'owner@yoga-lava.com',
      verified: true
    }
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
    images: JSON.stringify(['/api/placeholder/400/300']),
    businessHours: JSON.stringify({
      monday: { open: '06:00', close: '18:00', closed: false },
      tuesday: { open: '06:00', close: '18:00', closed: false },
      wednesday: { open: '06:00', close: '18:00', closed: false },
      thursday: { open: '06:00', close: '18:00', closed: false },
      friday: { open: '06:00', close: '18:00', closed: false },
      saturday: { open: '05:30', close: '18:00', closed: false },
      sunday: { open: '05:30', close: '18:00', closed: false }
    }),
    tags: JSON.stringify(['ゴルフ', 'レッスン', '景観']),
    verified: true,
    createdAt: new Date('2018-09-20'),
    updatedAt: new Date('2024-01-26'),
    ownerId: 'owner13',
    owner: {
      id: 'owner13',
      name: '山崎オーナー',
      email: 'owner@tokyo-golf.jp',
      verified: true
    }
  }
]

// モックユーザーデータ
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    image: '/api/placeholder/40/40',
    role: 'USER',
    createdAt: new Date('2023-01-01'),
    preferences: {
      location: '東京都',
      categories: ['restaurant', 'cafe'],
      notifications: true,
      theme: 'light'
    },
    points: 150,
    badges: []
  },
  {
    id: 'user2',
    name: '佐藤花子',
    email: 'sato@example.com',
    image: '/api/placeholder/40/40',
    role: 'USER',
    createdAt: new Date('2023-02-01'),
    preferences: {
      location: '東京都',
      categories: ['beauty'],
      notifications: true,
      theme: 'light'
    },
    points: 80,
    badges: []
  },
  {
    id: 'user3',
    name: '山田母',
    email: 'yamada@example.com',
    image: '/api/placeholder/40/40',
    role: 'USER',
    createdAt: new Date('2023-03-01'),
    preferences: {
      location: '東京都',
      categories: ['education'],
      notifications: true,
      theme: 'light'
    },
    points: 200,
    badges: []
  },
  {
    id: 'user4',
    name: '高校生A',
    email: 'student@example.com',
    image: '/api/placeholder/40/40',
    role: 'USER',
    createdAt: new Date('2023-04-01'),
    preferences: {
      location: '東京都',
      categories: ['education'],
      notifications: true,
      theme: 'light'
    },
    points: 50,
    badges: []
  },
  {
    id: 'user5',
    name: 'ビジネスマン',
    email: 'business@example.com',
    image: '/api/placeholder/40/40',
    role: 'USER',
    createdAt: new Date('2023-05-01'),
    preferences: {
      location: '東京都',
      categories: ['education', 'restaurant'],
      notifications: true,
      theme: 'light'
    },
    points: 120,
    badges: []
  },
  {
    id: 'user6',
    name: '学習者B',
    email: 'learner@example.com',
    image: '/api/placeholder/40/40',
    role: 'USER',
    createdAt: new Date('2023-06-01'),
    preferences: {
      location: '東京都',
      categories: ['education'],
      notifications: true,
      theme: 'light'
    },
    points: 90,
    badges: []
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    companyId: '1',
    userId: 'user1',
    rating: 5,
    title: '素晴らしい雰囲気',
    content: 'フレンチの本格的な味を楽しめました。スタッフの方も親切で、また来たいと思います。',
    images: ['/api/placeholder/300/200'],
    tags: ['フレンチ', 'おしゃれ', 'デート'],
    helpfulCount: 12,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    user: mockUsers[0]!,
    verified: true
  },
  {
    id: '2',
    companyId: '2',
    userId: 'user2',
    rating: 4,
    title: '技術力が高い',
    content: 'カットとカラーをお願いしました。仕上がりに満足しています。',
    images: [],
    tags: ['カット', 'カラー'],
    helpfulCount: 8,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    user: mockUsers[1]!,
    verified: false
  },

  // 教育・学習カテゴリのレビュー
  {
    id: 'edu-rev-1',
    companyId: 'edu-1',
    userId: 'user3',
    rating: 5,
    title: '成績が大幅に向上しました',
    content: '息子が中学2年生からお世話になっています。個別指導のおかげで苦手だった数学の成績が大幅に上がりました。先生方も熱心で、親身になって指導してくださいます。',
    images: [],
    tags: ['個別指導', '数学', '成績向上'],
    helpfulCount: 23,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    user: mockUsers[2]!,
    verified: true
  },
  {
    id: 'edu-rev-2',
    companyId: 'edu-1',
    userId: 'user4',
    rating: 4,
    title: '自習室が使いやすい',
    content: '受験勉強で利用しています。自習室が静かで集中できるし、わからないことがあったらすぐに先生に聞けるのが良いです。',
    images: [],
    tags: ['自習室', '受験勉強'],
    helpfulCount: 15,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    user: mockUsers[3]!,
    verified: true
  },
  {
    id: 'edu-rev-3',
    companyId: 'edu-2',
    userId: 'user5',
    rating: 5,
    title: 'TOEIC対策が充実',
    content: 'TOEIC対策コースを受講しました。ネイティブ講師の実践的な指導で、目標スコアを達成できました。駅からも近くて通いやすいです。',
    images: [],
    tags: ['TOEIC', 'ネイティブ講師'],
    helpfulCount: 31,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    user: mockUsers[4]!,
    verified: true
  },
  {
    id: 'edu-rev-4',
    companyId: 'edu-3',
    userId: 'user6',
    rating: 4,
    title: 'シニアにも優しい指導',
    content: '60歳からパソコンを始めました。わからないことを何度聞いても丁寧に教えてくれるので、安心して学習できています。',
    images: [],
    tags: ['シニア', 'パソコン教室'],
    helpfulCount: 18,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    user: mockUsers[5]!,
    verified: true
  },

  // 医療・ヘルスケアカテゴリのレビュー
  {
    id: 'med-rev-1',
    companyId: 'med-1',
    userId: 'user1',
    rating: 5,
    title: '土日診療が助かります',
    content: '平日は仕事で通えないので、土日診療をしてくれるのは本当に助かります。先生も看護師さんも優しく、安心して受診できます。',
    images: [],
    tags: ['土日診療', '家族診療'],
    helpfulCount: 42,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    user: mockUsers[0]!,
    verified: true
  },
  {
    id: 'med-rev-2',
    companyId: 'med-1',
    userId: 'user2',
    rating: 4,
    title: '小児科が信頼できる',
    content: '子供の風邪で受診しました。小児科の先生が子供にも優しく接してくれて、説明も分かりやすかったです。',
    images: [],
    tags: ['小児科'],
    helpfulCount: 26,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    user: mockUsers[1]!,
    verified: true
  },
  {
    id: 'med-rev-3',
    companyId: 'med-2',
    userId: 'user3',
    rating: 5,
    title: '痛みの少ない治療',
    content: '虫歯の治療で通っています。本当に痛みが少なくて驚きました。設備も新しく、清潔感があります。',
    images: [],
    tags: ['無痛治療', '最新設備'],
    helpfulCount: 35,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22'),
    user: mockUsers[2]!,
    verified: true
  },
  {
    id: 'med-rev-4',
    companyId: 'med-3',
    userId: 'user4',
    rating: 4,
    title: '薬剤師さんが親切',
    content: '処方薬について詳しく説明してくれました。飲み合わせについても気を付けてくれて、安心して薬を受け取れます。',
    images: [],
    tags: ['薬局', '丁寧な説明'],
    helpfulCount: 19,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    user: mockUsers[3]!,
    verified: true
  },

  // エンターテインメントカテゴリのレビュー
  {
    id: 'ent-rev-1',
    companyId: 'ent-1',
    userId: 'user5',
    rating: 5,
    title: 'IMAX体験が最高！',
    content: 'IMAX上映で映画を観ました。音響も映像も迫力満点で、映画館でしか味わえない体験でした。座席も快適です。',
    images: [],
    tags: ['IMAX', '映画館'],
    helpfulCount: 67,
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28'),
    user: mockUsers[4]!,
    verified: true
  },
  {
    id: 'ent-rev-2',
    companyId: 'ent-1',
    userId: 'user6',
    rating: 4,
    title: 'アクセスが良い',
    content: '渋谷駅から近くてアクセスが良いです。上映スケジュールも豊富で、見たい映画がいつでも楽しめます。',
    images: [],
    tags: ['アクセス良好'],
    helpfulCount: 34,
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24'),
    user: mockUsers[5]!,
    verified: true
  },
  {
    id: 'ent-rev-3',
    companyId: 'ent-2',
    userId: 'user1',
    rating: 4,
    title: '楽曲数が豊富',
    content: '最新曲から懐かしい曲まで、楽曲数がとても豊富です。音響設備も良くて、気持ちよく歌えました。',
    images: [],
    tags: ['カラオケ', '豊富な楽曲'],
    helpfulCount: 28,
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21'),
    user: mockUsers[0]!,
    verified: true
  },
  {
    id: 'ent-rev-4',
    companyId: 'ent-3',
    userId: 'user2',
    rating: 5,
    title: '最新ゲームが充実',
    content: '最新のアーケードゲームがすぐに導入されるので、いつ来ても新しい楽しみがあります。e-sportsエリアも本格的です。',
    images: [],
    tags: ['ゲームセンター', 'e-sports'],
    helpfulCount: 45,
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-01-26'),
    user: mockUsers[1]!,
    verified: true
  },

  // スポーツ・フィットネスカテゴリのレビュー
  {
    id: 'sports-rev-1',
    companyId: 'sports-1',
    userId: 'user3',
    rating: 5,
    title: '設備が充実している',
    content: '最新のマシンが豊富で、プールやサウナも完備されています。スタッフの方も親切で、トレーニングのアドバイスもしてくれます。',
    images: [],
    tags: ['ジム', '設備充実'],
    helpfulCount: 52,
    createdAt: new Date('2024-01-29'),
    updatedAt: new Date('2024-01-29'),
    user: mockUsers[2]!,
    verified: true
  },
  {
    id: 'sports-rev-2',
    companyId: 'sports-1',
    userId: 'user4',
    rating: 4,
    title: '初心者にも優しい',
    content: 'ジム初心者でしたが、スタッフの方が丁寧にマシンの使い方を教えてくれました。初心者向けプログラムも充実しています。',
    images: [],
    tags: ['初心者向け'],
    helpfulCount: 38,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    user: mockUsers[3]!,
    verified: true
  },
  {
    id: 'sports-rev-3',
    companyId: 'sports-2',
    userId: 'user5',
    rating: 5,
    title: '心も体もリフレッシュ',
    content: 'ホットヨガ初体験でしたが、インストラクターの方が優しく指導してくれました。汗をかいてとてもスッキリしました。',
    images: [],
    tags: ['ホットヨガ', 'リフレッシュ'],
    helpfulCount: 41,
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23'),
    user: mockUsers[4]!,
    verified: true
  },
  {
    id: 'sports-rev-4',
    companyId: 'sports-3',
    userId: 'user6',
    rating: 4,
    title: '景色が美しい',
    content: '都心からのアクセスも良く、コースの景観が素晴らしいです。初心者レッスンも受けましたが、プロの指導で上達を実感できました。',
    images: [],
    tags: ['ゴルフ', '景観'],
    helpfulCount: 33,
    createdAt: new Date('2024-01-27'),
    updatedAt: new Date('2024-01-27'),
    user: mockUsers[5]!,
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

// 業種別本質評価設定
export const categoryEssenceConfigs: CategoryEssenceConfig[] = [
  {
    id: 'restaurant',
    name: 'レストラン・飲食',
    emoji: '🍽️',
    essenceAspect: {
      name: '味',
      description: '料理の味・品質・調理技術',
      weight: 0.8
    },
    otherAspects: [
      { name: '接客', description: 'スタッフの対応・サービス', weight: 0.6 },
      { name: '雰囲気', description: '店内の環境・清潔感', weight: 0.5 },
      { name: 'コスパ', description: '価格と品質のバランス', weight: 0.7 },
      { name: 'アクセス', description: '立地・交通の便', weight: 0.3 }
    ],
    reviewQuestions: {
      essence: [
        '料理の味はいかがでしたか？',
        '食材の品質について教えてください',
        '調理技術・盛り付けはどうでしたか？',
        'メニューの豊富さはいかがでしたか？'
      ],
      other: [
        'スタッフの接客態度はいかがでしたか？',
        '店内の雰囲気・清潔感はどうでしたか？',
        '価格は適正だと思いますか？',
        'アクセスの良さはいかがでしたか？'
      ]
    }
  },
  {
    id: 'service',
    name: '引越サービス',
    emoji: '🚚',
    essenceAspect: {
      name: 'コスパ',
      description: '価格と作業品質のバランス',
      weight: 0.9
    },
    otherAspects: [
      { name: '作業品質', description: '丁寧さ・技術力', weight: 0.8 },
      { name: '時間厳守', description: 'スケジュール通りの作業', weight: 0.7 },
      { name: '接客', description: 'スタッフの対応', weight: 0.5 },
      { name: '追加料金', description: '料金の透明性', weight: 0.6 }
    ],
    reviewQuestions: {
      essence: [
        '料金は妥当でしたか？',
        'サービス内容に対して満足のいく価格でしたか？',
        '他社と比較してコストパフォーマンスはいかがでしたか？'
      ],
      other: [
        '作業は丁寧に行われましたか？',
        '予定時間通りに作業は完了しましたか？',
        'スタッフの対応はいかがでしたか？',
        '追加料金などの説明は明確でしたか？'
      ]
    }
  },
  {
    id: 'healthcare',
    name: '葬儀サービス',
    emoji: '🕊️',
    essenceAspect: {
      name: '思いやり',
      description: '心のこもった対応・配慮',
      weight: 0.9
    },
    otherAspects: [
      { name: '料金', description: '費用の適正性・透明性', weight: 0.7 },
      { name: '設備', description: '施設・設備の充実度', weight: 0.5 },
      { name: '進行', description: '式の進行・段取り', weight: 0.6 },
      { name: 'アフターケア', description: '事後のサポート', weight: 0.4 }
    ],
    reviewQuestions: {
      essence: [
        'スタッフの心配りはいかがでしたか？',
        '故人・ご遺族への配慮は十分でしたか？',
        '丁寧で思いやりのある対応でしたか？',
        '悲しみに寄り添ってくれましたか？'
      ],
      other: [
        '料金体系は明確でしたか？',
        '施設・設備は充実していましたか？',
        '式の進行はスムーズでしたか？',
        '事後のサポートはいかがでしたか？'
      ]
    }
  },
  {
    id: 'beauty',
    name: '美容・ヘルスケア',
    emoji: '💄',
    essenceAspect: {
      name: '技術力',
      description: '技術・仕上がりの品質',
      weight: 0.8
    },
    otherAspects: [
      { name: '接客', description: 'カウンセリング・対応', weight: 0.6 },
      { name: '清潔感', description: '衛生管理・環境', weight: 0.7 },
      { name: 'コスパ', description: '価格と品質のバランス', weight: 0.6 },
      { name: 'アクセス', description: '立地・予約の取りやすさ', weight: 0.4 }
    ],
    reviewQuestions: {
      essence: [
        '技術力・仕上がりはいかがでしたか？',
        '期待通りの結果でしたか？',
        'スタッフの技術レベルはどうでしたか？',
        '持続性・品質はいかがでしたか？'
      ],
      other: [
        'カウンセリングは丁寧でしたか？',
        '店内の清潔感はいかがでしたか？',
        '料金は適正だと思いますか？',
        '予約は取りやすいですか？'
      ]
    }
  },
  {
    id: 'education',
    name: '教育・学習',
    emoji: '📚',
    essenceAspect: {
      name: '教育効果',
      description: '学習成果・成長実感',
      weight: 0.9
    },
    otherAspects: [
      { name: '講師品質', description: '指導力・専門性', weight: 0.8 },
      { name: '教材', description: 'カリキュラム・教材の質', weight: 0.6 },
      { name: 'サポート', description: 'フォロー体制', weight: 0.5 },
      { name: '環境', description: '学習環境・設備', weight: 0.4 }
    ],
    reviewQuestions: {
      essence: [
        '学習効果は実感できましたか？',
        '目標達成に役立ちましたか？',
        '成長を感じることができましたか？',
        '投資に見合う成果でしたか？'
      ],
      other: [
        '講師の指導力はいかがでしたか？',
        '教材・カリキュラムの質はどうでしたか？',
        'サポート体制は充実していましたか？',
        '学習環境は整っていましたか？'
      ]
    }
  },
  {
    id: 'entertainment',
    name: 'エンターテインメント',
    emoji: '🎭',
    essenceAspect: {
      name: '楽しさ',
      description: 'エンターテインメント性・満足度',
      weight: 0.9
    },
    otherAspects: [
      { name: '設備', description: '機器・施設の品質', weight: 0.6 },
      { name: 'コスパ', description: '料金と満足度のバランス', weight: 0.7 },
      { name: '接客', description: 'スタッフの対応', weight: 0.5 },
      { name: 'アクセス', description: '立地・利便性', weight: 0.3 }
    ],
    reviewQuestions: {
      essence: [
        '楽しい時間を過ごせましたか？',
        '満足のいくエンターテインメントでしたか？',
        'また利用したいと思いますか？',
        'ストレス発散・リフレッシュできましたか？'
      ],
      other: [
        '設備・機器の品質はいかがでしたか？',
        '料金に見合う価値でしたか？',
        'スタッフの対応はどうでしたか？',
        'アクセスの良さはいかがでしたか？'
      ]
    }
  },
  {
    id: 'sports',
    name: 'スポーツ・フィットネス',
    emoji: '🏋️‍♀️',
    essenceAspect: {
      name: '効果実感',
      description: 'トレーニング効果・健康改善',
      weight: 0.9
    },
    otherAspects: [
      { name: '設備', description: 'マシン・施設の充実度', weight: 0.7 },
      { name: '指導', description: 'トレーナーの質・サポート', weight: 0.6 },
      { name: '清潔感', description: '衛生管理・環境', weight: 0.6 },
      { name: 'コスパ', description: '料金と設備のバランス', weight: 0.5 }
    ],
    reviewQuestions: {
      essence: [
        'トレーニング効果は実感できましたか？',
        '健康状態の改善を感じますか？',
        '目標達成に近づいていますか？',
        '継続したいと思える内容でしたか？'
      ],
      other: [
        '設備・マシンは充実していましたか？',
        'トレーナーの指導はいかがでしたか？',
        '施設の清潔感はどうでしたか？',
        '料金は適正だと思いますか？'
      ]
    }
  },
  {
    id: 'retail',
    name: '小売・ショッピング',
    emoji: '🛍️',
    essenceAspect: {
      name: '商品品質',
      description: '商品の質・品揃え・価値',
      weight: 0.8
    },
    otherAspects: [
      { name: '接客', description: 'スタッフの対応・専門性', weight: 0.6 },
      { name: '価格', description: '料金の適正性・コスパ', weight: 0.7 },
      { name: '店内環境', description: '雰囲気・清潔感・利便性', weight: 0.5 },
      { name: 'アフターサービス', description: '保証・サポート体制', weight: 0.4 }
    ],
    reviewQuestions: {
      essence: [
        '商品の品質はいかがでしたか？',
        '品揃えは充実していましたか？',
        '期待通りの商品でしたか？',
        '商品の価値は感じられましたか？'
      ],
      other: [
        'スタッフの対応はいかがでしたか？',
        '価格は適正だと思いますか？',
        '店内の環境・雰囲気はどうでしたか？',
        'アフターサービスは充実していましたか？'
      ]
    }
  }
];

// 業種別本質評価設定を取得する関数
export function getCategoryEssenceConfig(categoryId: string): CategoryEssenceConfig | undefined {
  return categoryEssenceConfigs.find(config => config.id === categoryId);
}

// 本質評価かどうかを判定するキーワード
export const essenceKeywords: Record<string, string[]> = {
  restaurant: ['味', '美味しい', 'まずい', '料理', '食事', '素材', '調理', '盛り付け', 'メニュー', '食材'],
  service: ['料金', '価格', '安い', '高い', 'コスパ', 'コストパフォーマンス', '費用', '見積もり', '値段'],
  healthcare: ['思いやり', '配慮', '心配り', '丁寧', '親身', '寄り添う', '優しい', '温かい', '心のこもった'],
  beauty: ['技術', '仕上がり', '上手', '下手', 'カット', 'カラー', 'パーマ', '施術', 'テクニック'],
  education: ['効果', '成果', '成長', '上達', '習得', '理解', '向上', '実力', '学習', '勉強'],
  entertainment: ['楽しい', 'つまらない', '面白い', '満足', '退屈', 'エキサイティング', 'ワクワク', '興奮'],
  sports: ['効果', '筋肉', '体力', '健康', 'ダイエット', '体重', '体型', '持久力', '筋力', 'トレーニング'],
  retail: ['品質', '商品', '品揃え', 'クオリティ', '作り', '素材', 'ブランド', '機能性', '耐久性']
};

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

export function getBusinessStatus(businessHours: string | null): { isOpen: boolean; nextChange: string } {
  if (!businessHours) {
    return { isOpen: false, nextChange: '営業時間不明' }
  }

  try {
    const hours = JSON.parse(businessHours) as BusinessHours
    const now = new Date()
    const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()] as keyof BusinessHours
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
  } catch (error) {
    return { isOpen: false, nextChange: '営業時間不明' }
  }
}