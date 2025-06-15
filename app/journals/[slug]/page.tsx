import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Clock, FileText, Tag, User } from "lucide-react"
import { Fragment } from "react"
import { articles } from "@/lib/data"
import { ArticleCard } from "@/components/article-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { JournalDownloadButton } from "@/components/journal-download-button"
import { JournalCitation } from "@/components/journal-citation"
import { JournalMetricsButton } from "@/components/journal-metrics-button"

interface JournalPageProps {
  params: {
    slug: string
  }
}

export default function JournalPage({ params }: JournalPageProps) {
  const article = articles.find((article) => article.slug === params.slug && article.type === "journal")

  if (!article) {
    notFound()
  }

  const relatedArticles = articles.filter((a) => a.slug !== params.slug && a.type === "journal").slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <article className="container max-w-6xl px-4 py-8 md:px-6">
          <div className="mb-8 space-y-4 animate-slide-up">
            <div className="flex items-center justify-end">
            </div>
            <h1 className="text-4xl lg:text-5xl text-primary font-bold  ">
              {article.title}
            </h1>
            <div className="space-y-2">
              {/* First line: date, read time, DOI */}
              <div className="flex flex-wrap items-center gap-4 text-base text-muted-foreground">
                <div className="flex items-center gap-1">
                  {article.authors && article.authors.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {article.authors.map((author, i) => (
                        <span key={author.slug}>
                          <Link
                            href={`/authors/${author.slug}`}
                            className="hover:underline hover:text-primary font-medium transition-colors text-primary"
                          >
                            {author.name}
                          </Link>
                          {i < article.authors.length - 1 && <span> • </span>}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={`/authors/${article.authorSlug}`}
                      className="hover:underline hover:text-primary transition-colors"
                    >
                      {article.author}
                    </Link>
                  )}
                </div>
              </div>

              {/* Third Line */}
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

          {/* Decorative section with buttons and lines */}
          <div className="relative w-full mb-8 rounded-lg overflow-hidden ornamental-corners animate-fade-in">
            <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
              {/* Left decorative line */}
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
              
              {/* Buttons container */}
              <div className="flex gap-2 px-8">
                <JournalMetricsButton article={article} />
                <JournalCitation article={article} />
                <JournalDownloadButton article={article} />
              </div>
              
              {/* Right decorative line */}
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
            </div>
          </div>

          {/* Find the prose div that contains the article content */}
          <div
            className=" flex flex-col max-w-none items-center animate-fade-in"
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
              <DecorativeHeading>Related Journals</DecorativeHeading>
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