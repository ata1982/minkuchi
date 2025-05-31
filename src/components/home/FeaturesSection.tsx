'use client'

import { useState, useEffect, useRef } from 'react'

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: "🧠",
      title: "AI感情分析",
      description: "最先端AIがレビューの感情を深層分析し、真の評価を導き出します",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      delay: "0s"
    },
    {
      icon: "🔮",
      title: "予測インサイト",
      description: "ビッグデータと機械学習でトレンドを予測し、最適な選択をサポート",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      delay: "0.2s"
    },
    {
      icon: "⚡",
      title: "リアルタイム同期",
      description: "瞬時に更新される情報で、常に最新の情報を提供します",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      delay: "0.4s"
    },
    {
      icon: "🌍",
      title: "グローバル対応",
      description: "多言語AI翻訳で世界中のレビューを理解し、グローバルな視点を提供",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      delay: "0.6s"
    },
    {
      icon: "🔒",
      title: "量子セキュリティ",
      description: "次世代暗号化技術でプライバシーを完全保護し、安心してご利用いただけます",
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50",
      delay: "0.8s"
    },
    {
      icon: "🎯",
      title: "パーソナライズ",
      description: "あなたの嗜好を学習し、完璧にマッチしたレコメンデーションを提供",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      delay: "1s"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card text-gray-800 text-sm font-medium mb-6">
            <span className="animate-pulse mr-2">🚀</span>
            革新的テクノロジー
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            <span className="block font-['Space_Grotesk']">
              未来を
            </span>
            <span className="text-gradient block">
              先取りする機能
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            最先端のAI技術と革新的なUXデザインが融合した、
            これまでにないレビュー体験をお届けします
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative card-gradient rounded-3xl p-8 hover-lift transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: isVisible ? feature.delay : '0s'
              }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 group-hover:text-gradient transition-all duration-300`}>
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <div className="h-full w-full" style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center px-8 py-4 button-modern text-lg font-semibold rounded-full hover-lift group">
            <span className="mr-3 group-hover:rotate-12 transition-transform">🔥</span>
            今すぐ体験してみる
            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}