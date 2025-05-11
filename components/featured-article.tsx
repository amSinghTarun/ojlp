import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Article } from "@/lib/types"

interface FeaturedArticleProps {
  article: Article
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 items-center animate-fade-in">
      <div className="relative aspect-video overflow-hidden rounded-lg ornamental-corners">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="space-y-4 animate-slide-in-right">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight lg:text-3xl">{article.title}</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">{article.excerpt}</p>
        <Button asChild className="transition-all duration-300 hover:scale-105">
          <Link href={`/articles/${article.slug}`}>Read Article</Link>
        </Button>
      </div>
    </div>
  )
}
