import Link from "next/link"
import { ArrowRight, Scale } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { ArticleCard } from "@/components/article-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { articles } from "@/lib/data"
import { ArticleCarousel } from "@/components/article-carousel"
import { NotificationTicker } from "@/components/notification-ticker"
import { getLatestIssue, getArticlesByIssue } from "@/lib/journal-data"

export default function Home() {
  // Get the latest journal issue
  const latestIssue = getLatestIssue()

  // Get articles from the latest issue
  const latestIssueArticles = getArticlesByIssue(latestIssue.volume, latestIssue.issue)

  // Use latest issue articles for the carousel if available, otherwise fallback to first 5 articles
  const carouselArticles = latestIssueArticles.length > 0 ? latestIssueArticles : articles.slice(0, 5)

  // Create issue info string
  const issueInfo = `Volume ${latestIssue.volume}, Issue ${latestIssue.issue} (${latestIssue.year}): ${latestIssue.title}`

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="seal">
              <Scale className="h-6 w-6" />
            </div>
            <div className="font-bold text-xl font-serif">LegalInsight</div>
          </Link>
          <Navigation className="mx-6" />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full">
          <ArticleCarousel articles={carouselArticles} issueInfo={issueInfo} />
        </section>

        <NotificationTicker />

        <section className="container px-4 py-12 md:px-6">
          {/* Recent Content Section */}
          <ScrollReveal threshold={0.2} delay={200}>
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <DecorativeHeading>Recent Content</DecorativeHeading>
                <div className="flex space-x-4">
                  <Link href="/journals" className="text-primary hover:underline flex items-center group">
                    All Journals
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link href="/blogs" className="text-primary hover:underline flex items-center group">
                    All Blogs
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
                {articles.slice(0, 6).map((article, index) => (
                  <ArticleCard key={article.slug} article={article} index={index} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal threshold={0.2} delay={400}>
            <div className="rounded-lg border bg-card p-4 md:p-8 shadow-sm ornamental-corners">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="space-y-3 md:w-2/3">
                  <h3 className="text-xl md:text-2xl font-bold font-serif">Stay updated with our newsletter</h3>
                  <p className="text-muted-foreground">
                    Get the latest legal insights and analysis delivered to your inbox.
                  </p>
                </div>
                <div className="flex w-full md:w-1/3 space-x-2">
                  <Button className="w-full transition-all duration-300 hover:scale-105">Subscribe</Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </div>
  )
}
