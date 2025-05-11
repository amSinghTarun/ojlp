"use client"

import { useState } from "react"
import { Download, Loader2, FileText, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Article } from "@/lib/types"

interface JournalDownloadButtonProps {
  article: Article
}

export function JournalDownloadButton({ article }: JournalDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadAsTxt = async () => {
    setIsDownloading(true)

    try {
      // Create the content for the download
      const title = `# ${article.title}\n\n`
      const author = `By: ${article.author}\n`
      const date = `Date: ${article.date}\n\n`
      const content = article.content

      // Format the content for download
      const formattedContent = `${title}${author}${date}${content}`

      // Create a blob with the content
      const blob = new Blob([formattedContent], { type: "text/plain" })

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)

      // Create a temporary anchor element
      const a = document.createElement("a")
      a.href = url
      a.download = `${article.slug}.txt`

      // Trigger the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading journal as TXT:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAsPdf = async () => {
    setIsDownloading(true)

    try {
      // Create HTML content for the PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${article.title}</title>
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              margin: 2cm;
              line-height: 1.5;
            }
            .header {
              text-align: center;
              margin-bottom: 2cm;
            }
            h1 {
              font-size: 24pt;
              margin-bottom: 0.5cm;
            }
            .author {
              font-size: 14pt;
              margin-bottom: 0.2cm;
            }
            .date {
              font-size: 12pt;
              margin-bottom: 1cm;
            }
            .content {
              font-size: 12pt;
              text-align: justify;
            }
            .content p:first-of-type::first-letter {
              font-size: 300%;
              float: left;
              line-height: 0.8;
              margin-right: 0.1em;
            }
            .footer {
              text-align: center;
              margin-top: 2cm;
              font-size: 10pt;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${article.title}</h1>
            <div class="author">By: ${article.author}</div>
            <div class="date">${article.date}</div>
          </div>
          <div class="content">
            ${article.content
              .split("\n\n")
              .map((p) => `<p>${p}</p>`)
              .join("")}
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} LegalInsight. All rights reserved.
          </div>
        </body>
        </html>
      `

      // Convert HTML to a Blob
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Create a temporary anchor element
      const a = document.createElement("a")
      a.href = url
      a.download = `${article.slug}.html` // Using HTML as a simple alternative to PDF

      // Trigger the download
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading journal as PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (isDownloading) {
    return (
      <Button variant="outline" size="sm" disabled className="flex items-center gap-1">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Downloading...</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span className="hidden md:inline-block">Download</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={downloadAsTxt}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Download as Text</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadAsPdf}>
          <FileDown className="mr-2 h-4 w-4" />
          <span>Download as PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
