'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        
        {/* Floating Elements */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px',
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        ></div>
        
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
          style={{
            right: mousePosition.x * 0.01 + 'px',
            bottom: mousePosition.y * 0.01 + 'px',
            transform: `translateY(${scrollY * 0.5}px)`,
            animationDelay: '2s'
          }}
        ></div>
        
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{
            left: '60%',
            top: '20%',
            transform: `translateY(${scrollY * 0.2}px)`,
            animationDelay: '4s'
          }}
        ></div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45 animate-morph"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-purple-400/30 rotate-12 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full glass-card text-white text-sm font-medium mb-8 hover-lift">
          <span className="animate-pulse mr-2">✨</span>
          次世代AI駆動レビュープラットフォーム
          <span className="animate-pulse ml-2">🚀</span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight">
          <span className="block font-['Space_Grotesk']">
            未来の
          </span>
          <span className="text-gradient-tertiary block animate-shimmer bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            レビュー体験
          </span>
          <span className="block font-['Space_Grotesk']">
            がここに
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
          AIが織りなす革新的なレビューシステムで、
          <br className="hidden md:block" />
          <span className="text-gradient-secondary">真実の声</span>と<span className="text-gradient-secondary">本物の体験</span>を発見しよう
        </p>

        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <form className="relative group" role="search">
            <div className="gradient-border p-1 rounded-full">
              <input 
                type="text" 
                placeholder="🔍 AIが最適なサービスを見つけます..." 
                className="w-full pl-8 pr-20 py-6 text-lg rounded-full bg-white/95 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-gray-800 placeholder-gray-500 font-medium shadow-2xl transition-all duration-300 group-hover:shadow-3xl" 
                aria-label="AI支援サービス検索"
                role="searchbox"
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 button-modern px-6 py-3 rounded-full animate-glow"
                aria-label="AI検索実行"
                type="submit"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                検索
              </button>
            </div>
          </form>
        </div>
        
        {/* Revolutionary CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <Link href="/companies" className="group relative button-modern text-xl px-12 py-6 hover-lift">
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              体験を探索する
            </span>
          </Link>
          
          <Link href="/companies" className="group relative glass-card text-white text-xl px-12 py-6 rounded-full font-semibold hover-lift border border-white/20">
            <span className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              レビューを投稿
            </span>
          </Link>
        </div>

        {/* Dynamic Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { number: "50,000+", label: "AI分析レビュー", gradient: "text-gradient" },
            { number: "10,000+", label: "登録サービス", gradient: "text-gradient-secondary" },
            { number: "98%", label: "満足度スコア", gradient: "text-gradient-tertiary" }
          ].map((stat, index) => (
            <div key={index} className="glass-card p-8 rounded-3xl hover-lift group">
              <div className={`text-4xl md:text-6xl font-black mb-4 ${stat.gradient} group-hover:scale-110 transition-transform`}>
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}