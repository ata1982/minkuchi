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
        
        {/* Revolutionary CTA Section */}
        <section className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white text-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-card text-white text-sm font-medium mb-8">
              <span className="animate-pulse mr-2">💫</span>
              コミュニティの力で未来を創る
              <span className="animate-pulse ml-2">🌟</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
              <span className="block font-['Space_Grotesk']">
                あなたの
              </span>
              <span className="text-gradient-tertiary block">
                体験が世界を変える
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              一つ一つのレビューが、誰かの大切な決断を支え、
              <br className="hidden md:block" />
              <span className="text-gradient-secondary">より良い未来</span>を築いていきます
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/companies" className="group relative button-modern text-xl px-12 py-6 hover-lift">
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  体験を発見する
                </span>
              </Link>
              
              <Link href="/companies" className="group relative glass-card text-white text-xl px-12 py-6 rounded-full font-semibold hover-lift border border-white/20">
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  レビューを投稿
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: "🔥", text: "24時間で1000件の新レビュー", gradient: "text-gradient" },
                { icon: "⭐", text: "99.8%のユーザー満足度", gradient: "text-gradient-secondary" },
                { icon: "🌍", text: "47都道府県で利用中", gradient: "text-gradient-tertiary" }
              ].map((item, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl hover-lift group">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className={`font-bold text-lg ${item.gradient} group-hover:scale-105 transition-transform`}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}