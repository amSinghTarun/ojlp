import Link from "next/link"
import Image from "next/image"
import { Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Article } from "@/lib/types"

interface ArticleCardProps {
  article: Article
  index?: number
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <Card
      className="overflow-hidden law-card ornamental-corners animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-40 sm:h-48 w-full overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={article.type === "journal" ? "default" : "secondary"} className="text-xs">
            {article.type === "journal" ? "Journal" : "Blog"}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-3 sm:p-4 border-b border-muted">
        <div className="space-y-1">
          <Link
            href={`/${article.type === "journal" ? "journals" : "blogs"}/${article.slug}`}
            className="hover:underline group"
          >
            <h3 className="font-bold text-base sm:text-xl line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-2 sm:pt-3">
        <p className="text-muted-foreground text-sm line-clamp-3">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground gap-2 sm:gap-4 border-t border-muted mt-2">
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <Link
            href={`/authors/${article.authorSlug}`}
            className="hover:underline hover:text-primary transition-colors"
          >
            {article.author}
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{article.date}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
