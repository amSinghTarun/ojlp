import { Navigation } from "@/components/navigation"
import { ArticleCard } from "@/components/article-card"
import { articles } from "@/lib/data"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Scale } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"

export default function ArticlesPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8 animate-slide-up">
            <DecorativeHeading level={1}>Articles & Blogs</DecorativeHeading>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Explore our collection of articles and blogs on law and constitutional matters.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 100}>
                <ArticleCard article={article} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 LegalInsight. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline hover:text-primary transition-colors">
              Terms
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="#" className="hover:underline hover:text-primary transition-colors">
              Privacy
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="#" className="hover:underline hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
