"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {currentYear} LegalInsight. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms-of-service" className="hover:underline hover:text-primary transition-colors">
            Terms
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/privacy-policy" className="hover:underline hover:text-primary transition-colors">
            Privacy
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/cookie-policy" className="hover:underline hover:text-primary transition-colors">
            Cookies
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/contact" className="hover:underline hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
