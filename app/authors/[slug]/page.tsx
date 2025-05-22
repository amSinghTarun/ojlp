import Link from "next/link"
import { notFound } from "next/navigation"
import { Scale } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Separator } from "@/components/ui/separator"
import { ArticleCard } from "@/components/article-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { AuthorProfile } from "@/components/author-profile"
import { authors } from "@/lib/authors"
import { articles } from "@/lib/data"

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = authors.find((author) => author.slug === params.slug)

  if (!author) {
    notFound()
  }

  const authorArticles = articles.filter((article) => article.authorSlug === params.slug)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8">
            <Link
              href="/articles"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center mb-4"
            >
              ← Back to Articles
            </Link>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <AuthorProfile author={author} articleCount={authorArticles.length} />
              </div>

              <div className="md:col-span-2">
                <DecorativeHeading>Articles by {author.name}</DecorativeHeading>

                {authorArticles.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    {authorArticles.map((article, index) => (
                      <ScrollReveal key={article.slug} delay={index * 100}>
                        <ArticleCard article={article} index={index} />
                      </ScrollReveal>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No articles found for this author.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
