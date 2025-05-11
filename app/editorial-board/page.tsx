import Link from "next/link"
import Image from "next/image"
import { Scale, Mail } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Separator } from "@/components/ui/separator"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { editorialBoardMembers } from "@/lib/editorial-board"

export default function EditorialBoardPage() {
  // Sort members by their order property
  const sortedMembers = [...editorialBoardMembers].sort((a, b) => a.order - b.order)

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
            <DecorativeHeading level={1}>Editorial Board</DecorativeHeading>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Meet the distinguished scholars and legal experts who guide our publications.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedMembers.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 100}>
                <Card className="overflow-hidden law-card ornamental-corners animate-fade-in h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4 border-b border-muted">
                    <div className="space-y-1">
                      <h3 className="font-bold text-xl line-clamp-2">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.designation}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-3 flex-grow">
                    <p className="text-muted-foreground line-clamp-4">{member.bio}</p>
                  </CardContent>
                  {member.email && (
                    <CardFooter className="p-4 pt-0 border-t border-muted mt-auto">
                      <Button asChild size="sm" variant="outline" className="w-full">
                        <a href={`mailto:${member.email}`} className="flex items-center justify-center">
                          <Mail className="mr-2 h-4 w-4" />
                          Contact
                        </a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
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
