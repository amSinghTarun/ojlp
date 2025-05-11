export interface Article {
  slug: string
  title: string
  author: string
  authorSlug: string
  date: string
  readTime: number
  image: string
  excerpt: string
  content: string
  type: "blog" | "journal"
  draft?: boolean
  views?: number
  images?: string[]
  doi?: string
  volume?: number
  issue?: number
  year?: number
  categories?: string[]
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
}

// Update the Author interface to include userId and make most fields optional
export interface Author {
  slug: string
  name: string
  email: string // Required field
  title?: string
  bio?: string
  image?: string
  expertise?: string[]
  education?: string[]
  socialLinks?: {
    twitter?: string
    linkedin?: string
    email?: string
  }
  userId?: string // Link to User
}

export interface EditorialBoardMember {
  id: string
  name: string
  designation: string
  image: string
  order: number
  bio?: string
  email?: string
}

export interface BoardAdvisor {
  id: string
  name: string
  designation: string
  image: string
  order: number
  bio?: string
  email?: string
  expertise?: string[]
}

export interface Notification {
  id: string
  title: string
  content: string
  date: string
  type:
    | "call-for-papers"
    | "student-competition"
    | "editorial-vacancy"
    | "special-issue"
    | "event"
    | "announcement"
    | "publication"
  priority: "low" | "medium" | "high"
  read: boolean
  link?: string
  expiresAt?: string
  image?: string
}

export interface JournalIssue {
  id: string
  volume: number
  issue: number
  year: number
  title: string
  description: string
  coverImage: string
  publishDate: string
  articles: string[] // Array of article slugs
}

export interface CallForPapers {
  id: string
  title: string
  thematicFocus: string
  description: string
  deadline: string
  volume: number
  issue: number
  year: number
  guidelines: string
  fee?: string
  image?: string
}
