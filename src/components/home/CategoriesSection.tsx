'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export function CategoriesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const categories = [
    {
      href: "/category/restaurant",
      icon: "🍽️",
      title: "レストラン・飲食店",
      description: "グルメ・カフェ",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      count: "12,500+",
      delay: "0s"
    },
    {
      href: "/category/retail",
      icon: "🛍️",
      title: "小売・ショッピング",
      description: "ファッション・雑貨",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      count: "8,200+",
      delay: "0.1s"
    },
    {
      href: "/category/housing",
      icon: "🏠",
      title: "住宅・不動産",
      description: "賃貸・売買・リフォーム",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      count: "3,400+",
      delay: "0.2s"
    },
    {
      href: "/category/beauty",
      icon: "💄",
      title: "美容・健康",
      description: "サロン・フィットネス",
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      count: "6,800+",
      delay: "0.3s"
    },
    {
      href: "/category/education",
      icon: "📚",
      title: "教育・学習",
      description: "学校・塾・スクール",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      count: "4,100+",
      delay: "0.4s"
    },
    {
      href: "/category/healthcare",
      icon: "🏥",
      title: "医療・ヘルスケア",
      description: "病院・クリニック・薬局",
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
      count: "2,900+",
      delay: "0.5s"
    },
    {
      href: "/category/entertainment",
      icon: "🎬",
      title: "エンターテインメント",
      description: "映画・音楽・レジャー",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      count: "5,600+",
      delay: "0.6s"
    },
    {
      href: "/category/sports",
      icon: "⚽",
      title: "スポーツ・フィットネス",
      description: "ジム・ヨガ・スポーツ施設",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      count: "3,700+",
      delay: "0.7s"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-40 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-40 right-40 w-64 h-64 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card text-gray-800 text-sm font-medium mb-6">
            <span className="animate-pulse mr-2">🎯</span>
            カテゴリから探索
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            <span className="block font-['Space_Grotesk']">
              あなたの
            </span>
            <span className="text-gradient block">
              理想を見つけよう
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            幅広いカテゴリから、あなたにぴったりのサービスを発見。
            AIが最適なマッチングをサポートします
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className={`group relative card-gradient rounded-3xl p-6 text-center hover-lift transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: isVisible ? category.delay : '0s'
              }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon with glow effect */}
                <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                  {category.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gradient transition-all duration-300">
                  {category.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {category.description}
                </p>

                {/* Count Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${category.gradient} text-white text-xs font-semibold`}>
                  {category.count} 件
                </div>

                {/* Hover Effect Line */}
                <div className={`h-1 bg-gradient-to-r ${category.gradient} rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center`}></div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-600 mb-6">もっと詳しく探したいですか？</p>
          <Link href="/search" className="inline-flex items-center px-8 py-4 button-modern text-lg font-semibold rounded-full hover-lift group">
            <span className="mr-3 group-hover:rotate-12 transition-transform">🔍</span>
            詳細検索で探す
            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}