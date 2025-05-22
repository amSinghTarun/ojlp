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
        <article className="container max-w-3xl px-4 py-12 md:px-6">
          <div className="mb-8 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <Link
                href="/journals"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
              >
                ← Back to Journals
              </Link>
              <div className="flex items-center gap-2">
                <JournalMetricsButton article={article} />
                <JournalCitation article={article} />
                <JournalDownloadButton article={article} />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-serif">
              {article.title}
            </h1>
            <div className="space-y-2">
              {/* First line: date, read time, DOI */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
                {article.doi && (
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>
                      DOI:{" "}
                      <a
                        href={`https://doi.org/${article.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-primary"
                      >
                        {article.doi}
                      </a>
                    </span>
                  </div>
                )}
              </div>

              {/* Second line: authors */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.authors && article.authors.length > 0 ? (
                    <div className="flex flex-wrap">
                      {article.authors.map((author, i) => (
                        <span key={author.slug}>
                          <Link
                            href={`/authors/${author.slug}`}
                            className="hover:underline hover:text-primary transition-colors"
                          >
                            {author.name}
                          </Link>
                          {i < article.authors.length - 1 && <span>, </span>}
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
              {article.keywords && article.keywords.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-2">
                      {article.keywords.map((keyword, index) => (
                        <span key={index} className="text-muted-foreground hover:text-primary transition-colors">
                          {keyword}
                          {index < article.keywords.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Keywords section - integrated with metadata */}
          </div>

          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] mb-8 rounded-lg overflow-hidden ornamental-corners animate-fade-in">
            <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>

          {/* Find the prose div that contains the article content */}
          <div
            className="prose prose-slate max-w-none dark:prose-invert animate-fade-in"
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
                <p key={index} className={index === 0 ? "drop-cap text-justify" : "text-justify"}>
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
