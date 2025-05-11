import Link from "next/link"
import { Scale } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { DecorativeHeading } from "@/components/decorative-heading"
import { Footer } from "@/components/footer"

export default function ArchivePage() {
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
            <DecorativeHeading level={1}>Journal Archive</DecorativeHeading>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Browse our complete collection of past journal issues and articles.
            </p>
          </div>

          <div className="text-center py-12">
            <p className="text-lg">Archive content is coming soon.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
