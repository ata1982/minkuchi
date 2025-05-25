import { Hero, SearchForm, CategoryGrid, FeaturedServices, RecentReviews } from '@/components/home'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={session?.user || undefined} />
      
      <main className="flex-1">
        <Hero />
        
        <section className="container mx-auto px-4 py-8">
          <SearchForm />
        </section>

        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">カテゴリから探す</h2>
          <CategoryGrid />
        </section>

        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">注目のサービス</h2>
          <FeaturedServices />
        </section>

        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">最新のレビュー</h2>
          <RecentReviews />
        </section>
      </main>

      <Footer />
    </div>
  )
}