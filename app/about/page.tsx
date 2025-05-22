import Link from "next/link"
import Image from "next/image"
import { Scale } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DecorativeHeading } from "@/components/decorative-heading"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6">
          <div className="mb-8 animate-slide-up">
            <DecorativeHeading level={1}>About LegalInsight</DecorativeHeading>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Dedicated to advancing legal scholarship and constitutional understanding.
            </p>
          </div>

          <div className="grid gap-12 md:gap-16">
            <ScrollReveal>
              <div className="grid gap-6 md:grid-cols-2 items-center">
                <div className="relative aspect-video overflow-hidden rounded-lg ornamental-corners">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="LegalInsight headquarters"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight font-serif">Our Mission</h2>
                  <p className="text-muted-foreground">
                    Founded in 2010, LegalInsight is dedicated to providing thoughtful analysis and commentary on
                    constitutional law, legal developments, and judicial decisions. Our mission is to bridge the gap
                    between academic legal scholarship and public understanding, making complex legal concepts
                    accessible to a broader audience while maintaining intellectual rigor.
                  </p>
                  <p className="text-muted-foreground">
                    We believe that an informed citizenry is essential to a functioning democracy, and that
                    understanding the legal principles that shape our society is crucial for meaningful civic
                    participation.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid gap-6 md:grid-cols-2 items-center md:order-last">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight font-serif">Our Values</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">Intellectual Integrity:</span> We are committed to accurate,
                      well-researched analysis that respects diverse viewpoints while maintaining scholarly standards.
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">Accessibility:</span> We strive to make complex legal concepts
                      understandable without oversimplification.
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">Independence:</span> Our analysis is not influenced by political
                      affiliations or external pressures.
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">Diversity:</span> We actively seek diverse perspectives and
                      voices in our publications.
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-lg ornamental-corners md:order-first">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="LegalInsight team meeting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight font-serif text-center">Our Publications</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="border rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold font-serif">LegalInsight Journal</h3>
                    <p className="text-muted-foreground">
                      Our flagship academic publication featuring in-depth analysis of constitutional law, judicial
                      decisions, and legal theory. Published quarterly, the journal maintains rigorous academic
                      standards while remaining accessible to legal practitioners, scholars, and interested
                      non-specialists.
                    </p>
                  </div>
                  <div className="border rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-bold font-serif">LegalInsight Blog</h3>
                    <p className="text-muted-foreground">
                      Our blog provides timely commentary on current legal developments, emerging trends, and
                      significant court decisions. Updated weekly, it offers concise analysis for those seeking to stay
                      informed about the evolving legal landscape.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition text-lg"
                >
                  Contact Us
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  )
}
