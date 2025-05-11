import Image from "next/image"
import Link from "next/link"
import { Mail, Twitter, Linkedin, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Author } from "@/lib/types"

interface AuthorProfileProps {
  author: Author
  articleCount: number
}

export function AuthorProfile({ author, articleCount }: AuthorProfileProps) {
  return (
    <Card className="overflow-hidden">
      {author.image && (
        <div className="relative aspect-square w-full max-h-64 overflow-hidden md:aspect-auto md:h-48">
          <Image src={author.image || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
        </div>
      )}
      <CardContent className="p-6">
        <div className="mb-4 space-y-2">
          <h1 className="text-2xl font-bold font-serif">{author.name}</h1>
          {author.title && <p className="text-muted-foreground">{author.title}</p>}
        </div>

        {author.bio && (
          <div className="mb-4">
            <p className="text-sm leading-relaxed">{author.bio}</p>
          </div>
        )}

        {author.expertise && author.expertise.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {author.expertise.map((area) => (
                <Badge key={area} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {author.education && author.education.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Education</h3>
            <ul className="text-sm space-y-1">
              {author.education.map((edu) => (
                <li key={edu}>{edu}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              <BookOpen className="inline-block mr-1 h-4 w-4" />
              {articleCount} {articleCount === 1 ? "Article" : "Articles"} Published
            </p>
          </div>
          {author.socialLinks && (
            <div className="flex gap-2">
              {author.socialLinks.twitter && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </Button>
              )}
              {author.socialLinks.linkedin && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              )}
              {author.socialLinks.email && (
                <Button variant="outline" size="icon" asChild>
                  <Link href={`mailto:${author.socialLinks.email}`}>
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
