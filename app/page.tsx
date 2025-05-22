import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { ArticleCard } from "@/components/article-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { articles } from "@/lib/data"
import { ArticleCarousel } from "@/components/article-carousel"
import { NotificationTicker } from "@/components/notification-ticker"
import { getLatestIssue, getArticlesByIssue } from "@/lib/journal-data"
import { constructMetadata } from "@/lib/metadata"

export const metadata: Metadata = constructMetadata({
  title: "Open Journal of Law & Policy - Law and Constitution Blog",
  description: "Expert analysis and commentary on legal developments, constitutional law, and judicial decisions.",
  pathname: "/",
})

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
      <main className="flex-1">
        <section className="w-full">
          <ArticleCarousel articles={carouselArticles} issueInfo={issueInfo} />
        </section>

        <div className="z-30 text-center py-2 px-4 text-sm text-primary bg-muted font-medium">Latest Issue: {issueInfo}</div>

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
        </section>
      </main>
    </div>
  )
}
