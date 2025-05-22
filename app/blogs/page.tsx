import { Navigation } from "@/components/navigation"
import { ArticleCard } from "@/components/article-card"
import { articles } from "@/lib/data"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Scale } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"

export default function BlogsPage() {
  const blogs = articles.filter((article) => article.type === "blog")

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8 animate-slide-up">
            <DecorativeHeading level={1}>Blogs</DecorativeHeading>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Explore our collection of blogs on contemporary legal issues and analysis.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 100}>
                <ArticleCard article={article} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
