import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JournalCitation } from "@/components/journal-citation"
import { JournalDownloadButton } from "@/components/journal-download-button"
import { getLatestIssue, getArticlesByIssue } from "@/lib/journal-data"
import { redirect } from "next/navigation"

export default function JournalsPage({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view

  // If view is call-for-papers, render the call for papers content
  if (view === "call-for-papers") {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Call for Papers</h1>
        <p>This is the call for papers page.</p>
      </div>
    )
  }

  // Otherwise, render the regular journals content or redirect to archive
  if (view === "archive") {
    redirect("/journals/archive")
  }

  // Default journals content
  if (!view || view === "") {
    const latestIssue = getLatestIssue()
    const latestIssueArticles = getArticlesByIssue(latestIssue.volume, latestIssue.issue)

    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <div className="container px-4 py-12 md:px-6">
            <div className="mb-8 animate-slide-up">
              <DecorativeHeading level={1}>LegalInsight Journal</DecorativeHeading>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                Scholarly articles and analysis on constitutional law and legal developments.
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <Card>
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={latestIssue.coverImage || "/placeholder.svg?height=600&width=400&query=law journal cover"}
                        alt={latestIssue.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Volume {latestIssue.volume}, Issue {latestIssue.issue} ({latestIssue.year})
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Published {latestIssue.publishDate}</p>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-bold mb-2">{latestIssue.title}</h3>
                      <p className="text-sm text-muted-foreground">{latestIssue.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <h2 className="text-2xl font-bold font-serif">In This Issue</h2>

                  {latestIssueArticles.map((article, index) => (
                    <ScrollReveal key={article.slug} delay={index * 100}>
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <Link href={`/journals/${article.slug}`} className="hover:underline">
                              <CardTitle className="text-xl">{article.title}</CardTitle>
                            </Link>
                            <div className="flex gap-2">
                              <JournalCitation article={article} />
                              <JournalDownloadButton article={article} />
                            </div>
                          </div>
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
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{article.readTime} min read</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{article.excerpt}</p>

                          {/* Display keywords with amber styling */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {article.keywords?.map((keyword) => (
                              <Badge key={keyword} className="bg-amber-500 hover:bg-amber-600 text-white border-0">
                                {keyword}
                              </Badge>
                            ))}
                            {/* For backward compatibility, also display categories if keywords aren't available */}
                            {!article.keywords?.length &&
                              article.categories?.map((category) => (
                                <Badge key={category} className="bg-amber-500 hover:bg-amber-600 text-white border-0">
                                  {category}
                                </Badge>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Journals</h1>
      <p>This is the journals page.</p>
    </div>
  )
}
