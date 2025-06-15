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
          <div className="container px-4 py-10 md:px-6">
            <div className="mb-8 animate-slide-up">
              <DecorativeHeading level={1}>Journal</DecorativeHeading>
              <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
                {/* Left decorative line */}
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
                
                {/* Volume/Issue Info */}
                <div className="flex gap-2 px-8 font-medium">
                  VOLUME {latestIssue.volume}, ISSUE {latestIssue.issue} ({latestIssue.year})
                </div>
                
                {/* Right decorative line */}
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Responsive grid: 1 column on mobile, 2 on md, 3 on lg+ */}
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {latestIssueArticles.map((article, index) => (
                  <ScrollReveal key={article.slug} delay={index * 100}>
                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-0 duration-300">
                      <CardHeader className="flex-shrink-0 pb-4">
                        <div className="flex justify-between items-start flex-row">
                          <Link href={`/journals/${article.slug}`} className="hover:underline">
                            <CardTitle className="text-lg text-red-800 leading-tight line-clamp-3">
                              {article.title}
                            </CardTitle>
                          </Link>
                        </div>
                        
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-3">
                          {/* Authors */}
                          <div className="flex gap-1 text-red-800">
                            {article.authors && article.authors.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {article.authors.map((author, i) => (
                                  <span key={author.slug}>
                                    <Link
                                      href={`/authors/${author.slug}`}
                                      className="hover:underline hover:text-primary transition-colors font-medium"
                                    >
                                      {author.name}
                                    </Link>
                                    {i < article.authors.length - 1 && <span>{` • `}</span>}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <Link
                                href={`/authors/${article.authorSlug}`}
                                className="hover:underline hover:text-primary transition-colors font-medium"
                              >
                                {article.author}
                              </Link>
                            )}
                          </div>

                          {/* Keywords/Categories */}
                          <div className="flex flex-wrap gap-1 text-xs">
                            {article.keywords?.map((keyword, i) => (
                              <span key={keyword} className="text-black">
                                {keyword}
                                {i < ((article.keywords?.length ?? 0) - 1) && <span>{` • `}</span>}
                              </span>
                            ))}
                            {/* For backward compatibility, also display categories if keywords aren't available */}
                            {!article.keywords?.length &&
                              article.categories?.map((category, i) => (
                                <span key={category} className="">
                                  {category}
                                  {i < ((article.categories?.length ?? 0) - 1) && <span>{` • `}</span>}
                                </span>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="flex-grow h-fit">
                        <p className=" text-sm ">
                          <span className="text-muted-foreground text-sm">{article.date}</span> • {article.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
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