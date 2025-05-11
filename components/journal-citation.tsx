"use client"

import { useState } from "react"
import { Check, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Article } from "@/lib/types"

type CitationStyle = "APA" | "MLA" | "Chicago" | "Harvard" | "Bluebook" | "OSCOLA"

interface JournalCitationProps {
  article: Article
}

export function JournalCitation({ article }: JournalCitationProps) {
  const [copiedStyle, setCopiedStyle] = useState<CitationStyle | null>(null)

  // Extract year and other date components
  const dateParts = article.date.split(" ")
  const month = dateParts[0]
  const day = dateParts[1].replace(",", "")
  const year = dateParts[2]

  // Get author's last name for certain citation styles
  const authorParts = article.author.split(" ")
  const lastName = authorParts[authorParts.length - 1]
  const firstNameInitial = authorParts[0].charAt(0)

  // Generate citations in different formats
  const generateCitation = (style: CitationStyle): string => {
    const doiText = article.doi ? `https://doi.org/${article.doi}` : `https://legalinsight.com/journals/${article.slug}`

    switch (style) {
      case "APA":
        return `${lastName}, ${firstNameInitial}. (${year}). ${article.title}. LegalInsight Journal. ${article.doi ? `https://doi.org/${article.doi}` : `Retrieved from https://legalinsight.com/journals/${article.slug}`}`

      case "MLA":
        return `${lastName}, ${authorParts[0]}. "${article.title}." LegalInsight Journal, ${day} ${month} ${year}, ${article.doi ? `doi:${article.doi}` : `legalinsight.com/journals/${article.slug}`}.`

      case "Chicago":
        return `${lastName}, ${authorParts[0]}. "${article.title}." LegalInsight Journal (${month} ${day}, ${year}). ${article.doi ? `https://doi.org/${article.doi}` : `https://legalinsight.com/journals/${article.slug}`}.`

      case "Harvard":
        return `${lastName}, ${firstNameInitial}. (${year}) '${article.title}', LegalInsight Journal, ${article.doi ? `DOI: ${article.doi}` : `Available at: https://legalinsight.com/journals/${article.slug}`} (Accessed: ${new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}).`

      case "Bluebook":
        return `${authorParts.join(" ")}, ${article.title}, LegalInsight J. (${month}. ${day}, ${year}), ${article.doi ? `https://doi.org/${article.doi}` : `https://legalinsight.com/journals/${article.slug}`}.`

      case "OSCOLA":
        return `${authorParts[0]} ${lastName}, '${article.title}' [${year}] LegalInsight Journal ${article.volume || 1}(${article.issue || 1}) ${article.doi ? `<${article.doi}>` : `<https://legalinsight.com/journals/${article.slug}>`} accessed ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`

      default:
        return `${article.author}. (${year}). ${article.title}. LegalInsight Journal.`
    }
  }

  const handleCopy = async (style: CitationStyle) => {
    try {
      const textToCopy = generateCitation(style)
      await navigator.clipboard.writeText(textToCopy)
      setCopiedStyle(style)
      setTimeout(() => setCopiedStyle(null), 2000)
    } catch (err) {
      console.error("Failed to copy citation:", err)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Quote className="h-4 w-4" />
          <span className="hidden md:inline-block">Cite</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[350px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
        <div className="px-2 py-1.5 text-sm font-semibold">Citation Formats</div>
        {(["APA", "MLA", "Chicago", "Harvard", "Bluebook", "OSCOLA"] as CitationStyle[]).map((style) => (
          <DropdownMenuItem
            key={style}
            className="flex flex-col items-start p-3 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              handleCopy(style)
            }}
          >
            <div className="flex items-center w-full">
              <span className="font-medium">{style}</span>
              {copiedStyle === style && (
                <span className="ml-auto text-xs text-green-500 flex items-center">
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Copied
                </span>
              )}
            </div>
            <div className="mt-1 text-xs text-muted-foreground break-all pr-4">{generateCitation(style)}</div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
