import Link from "next/link"
import Image from "next/image"
import { Scale } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { DecorativeHeading } from "@/components/decorative-heading"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { boardAdvisors } from "@/lib/board-advisors"
import { Badge } from "@/components/ui/badge"

export default function BoardOfAdvisorsPage() {
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
            <DecorativeHeading level={1}>Board of Advisors</DecorativeHeading>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Our distinguished board of advisors provides strategic guidance and expertise to ensure the highest
              standards of legal scholarship.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {boardAdvisors
              .sort((a, b) => a.order - b.order)
              .map((advisor) => (
                <ScrollReveal key={advisor.id}>
                  <div className="border rounded-lg overflow-hidden bg-card">
                    {advisor.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={advisor.image || "/placeholder.svg"}
                          alt={advisor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold font-serif">{advisor.name}</h2>
                      <p className="text-muted-foreground mb-4">{advisor.designation}</p>

                      {advisor.bio && <p className="text-sm mb-4">{advisor.bio}</p>}

                      {advisor.expertise && advisor.expertise.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-sm font-semibold mb-2">Areas of Expertise</h3>
                          <div className="flex flex-wrap gap-2">
                            {advisor.expertise.map((area) => (
                              <Badge key={area} variant="secondary">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {advisor.email && (
                        <div className="text-sm">
                          <Link href={`mailto:${advisor.email}`} className="text-primary hover:underline">
                            Contact
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
