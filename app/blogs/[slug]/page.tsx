import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Clock, User, Share2, BookmarkPlus, Heart } from "lucide-react"
import { Fragment } from "react"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { articles } from "@/lib/data"
import { ArticleCard } from "@/components/article-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { constructMetadata } from "@/lib/metadata"

interface BlogPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the blog page
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const article = articles.find((article) => article.slug === params.slug && article.type === "blog")

  if (!article) {
    return constructMetadata({
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
      noIndex: true,
    })
  }

  return constructMetadata({
    title: article.title,
    description:
      article.excerpt ||
      `Read ${article.title} by ${article.author || (article.authors && article.authors.map((a) => a.name).join(", "))}`,
    image: article.image || undefined,
    pathname: `/blogs/${params.slug}`,
  })
}

export default function BlogPage({ params }: BlogPageProps) {
  const article = articles.find((article) => article.slug === params.slug && article.type === "blog")

  if (!article) {
    notFound()
  }

  const relatedArticles = articles.filter((a) => a.slug !== params.slug && a.type === "blog").slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <article className="container max-w-6xl px-4 py-8 md:px-6">
          {/* Header Section */}
          <div className="mb-8 space-y-4 animate-slide-up">
            <h1 className="text-4xl lg:text-5xl text-primary font-bold font-serif">
              {article.title}
            </h1>
            
            <div className="space-y-2">
              {/* Authors */}
              <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground">
                <div className="flex items-center gap-1">
                  {article.authors && article.authors.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {article.authors.map((author, i) => (
                        <span key={author?.slug || `author-${i}`}>
                          {author?.slug ? (
                            <Link
                              href={`/authors/${author.slug}`}
                              className="hover:underline hover:text-primary font-medium transition-colors text-primary"
                            >
                              {author.name || "Unknown Author"}
                            </Link>
                          ) : (
                            <span className="font-medium text-primary">{author?.name || "Unknown Author"}</span>
                          )}
                          {i < article.authors.length - 1 && <span> • </span>}
                        </span>
                      ))}
                    </div>
                  ) : article.authorSlug ? (
                    <Link
                      href={`/authors/${article.authorSlug}`}
                      className="hover:underline hover:text-primary font-medium transition-colors text-primary"
                    >
                      {article.author || "Unknown Author"}
                    </Link>
                  ) : (
                    <span className="font-medium text-primary">{article.author || "Unknown Author"}</span>
                  )}
                </div>
              </div>

              {/* Keywords/Tags if available */}
              {article.keywords && article.keywords.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-1">
                      {article.keywords.map((keyword, index) => (
                        <span key={index} className="text-muted-foreground hover:text-primary transition-colors">
                          {keyword}
                          {index < article.keywords.length - 1 && " •"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div
            className="flex flex-col max-w-none items-center animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            {article.content.split("\n\n").map((paragraph, index) => {
              // Check if the paragraph contains an image tag
              if (paragraph.includes("<img")) {
                // This is a simple approach - in a real app you might want to use a proper HTML parser
                return (
                  <Fragment key={index}>
                    <div dangerouslySetInnerHTML={{ __html: paragraph }} className="my-8" />
                  </Fragment>
                )
              }

              return (
                <p key={index} className={index === 0 ? "drop-cap text-justify max-w-4xl" : "max-w-4xl text-justify"}>
                  {paragraph}
                </p>
              )
            })}
          </div>

          <div className="decorative-divider my-12"></div>

          <ScrollReveal>
            <div className="space-y-4">
              <DecorativeHeading>Related Blogs</DecorativeHeading>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
                {relatedArticles.map((article, index) => (
                  <ArticleCard key={article.slug} article={article} index={index} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </article>
      </main>
    </div>
  )
}