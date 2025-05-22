import Link from "next/link"
import Image from "next/image"
import { Scale } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Separator } from "@/components/ui/separator"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { authors } from "@/lib/authors"
import { articles } from "@/lib/data"

export default function AuthorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8 animate-slide-up">
            <DecorativeHeading level={1}>Our Authors</DecorativeHeading>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Meet the legal experts and scholars who contribute to LegalInsight.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {authors.map((author, index) => {
              const authorArticleCount = articles.filter((article) => article.authorSlug === author.slug).length

              return (
                <ScrollReveal key={author.slug} delay={index * 100}>
                  <Card className="overflow-hidden law-card ornamental-corners animate-fade-in">
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={author.image || "/placeholder.svg"}
                        alt={author.name}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4 border-b border-muted">
                      <div className="space-y-1">
                        <Link href={`/authors/${author.slug}`} className="hover:underline group">
                          <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors">
                            {author.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{author.title}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-3">
                      <p className="text-muted-foreground line-clamp-3">{author.bio}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex flex-wrap items-center text-sm text-muted-foreground gap-4 border-t border-muted mt-2">
                      <div className="flex items-center gap-1">
                        <span>
                          {authorArticleCount} {authorArticleCount === 1 ? "Article" : "Articles"}
                        </span>
                      </div>
                      <Button asChild size="sm" variant="outline" className="ml-auto">
                        <Link href={`/authors/${author.slug}`}>View Profile</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
