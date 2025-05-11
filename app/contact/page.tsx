import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { DecorativeHeading } from "@/components/decorative-heading"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact Us | LegalInsight",
  description: "Get in touch with the LegalInsight team for submissions, reviews, or media inquiries.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="font-bold text-xl font-serif">LegalInsight</div>
          </Link>
          <Navigation className="mx-6" />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <DecorativeHeading level={1}>Contact Us</DecorativeHeading>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We welcome your inquiries and feedback. Please use the form below or contact us directly.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-serif font-semibold mb-4">Get in Touch</h2>
              <p className="mb-6 text-muted-foreground">
                We welcome your inquiries and feedback. Please use the form to reach out to us, and we'll respond as
                soon as possible.
              </p>

              <div className="space-y-6">
                <div className="bg-card rounded-lg p-4 shadow-sm border">
                  <h3 className="font-medium mb-2">Submission Queries</h3>
                  <p className="text-sm text-muted-foreground">
                    Questions about submitting your paper, formatting requirements, or submission status.
                  </p>
                </div>

                <div className="bg-card rounded-lg p-4 shadow-sm border">
                  <h3 className="font-medium mb-2">Review Opportunities</h3>
                  <p className="text-sm text-muted-foreground">
                    Interested in becoming a reviewer or have questions about the review process.
                  </p>
                </div>

                <div className="bg-card rounded-lg p-4 shadow-sm border">
                  <h3 className="font-medium mb-2">Media Inquiries</h3>
                  <p className="text-sm text-muted-foreground">
                    Press requests, interview opportunities, or content republication permissions.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>
                      <a href="mailto:journal@ojlp.in" className="hover:text-primary transition">
                        journal@ojlp.in
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>+91 123 456 7890</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Faculty of Law, University Campus, New Delhi, India</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 hover:bg-primary hover:text-white p-2 rounded-full transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 hover:bg-primary hover:text-white p-2 rounded-full transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 hover:bg-primary hover:text-white p-2 rounded-full transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
