'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <>
      <Header user={user} />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        
        {/* CTA Section */}
        <section className="cta py-20 bg-blue-600 text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">あなたの体験をシェアしませんか？</h2>
            <p className="text-lg mb-8">利用したサービスの口コミを投稿して、地域コミュニティに貢献しましょう</p>
            <Link href="/companies" className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold text-lg rounded-xl hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
              レビューを見る
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}