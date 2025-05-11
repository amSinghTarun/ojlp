import type { JournalIssue, CallForPapers } from "./types"
import { articles } from "./data"

// Update some articles with volume and issue information
articles.forEach((article, index) => {
  if (article.type === "journal") {
    // Assign volume and issue based on date (for demo purposes)
    const year = Number.parseInt(article.date.split(" ")[2])
    article.year = year
    article.volume = year - 2020 // Volumes start from 2020
    article.issue = (index % 4) + 1 // 4 issues per volume

    // Add some categories
    article.categories = [
      ["Constitutional Law", "Criminal Justice", "Technology Law", "Human Rights", "International Law"][index % 5],
      ["Legal Theory", "Judicial Review", "Comparative Law", "Legal History"][index % 4],
    ]
  }
})

// Create journal issues
export const journalIssues: JournalIssue[] = [
  {
    id: "2024-v4-i2",
    volume: 4,
    issue: 2,
    year: 2024,
    title: "Digital Privacy and Constitutional Rights",
    description:
      "This issue explores the intersection of digital privacy and constitutional protections in the modern era.",
    coverImage: "/placeholder.svg?height=600&width=400",
    publishDate: "April 15, 2024",
    articles: articles.filter((a) => a.type === "journal" && a.volume === 4 && a.issue === 2).map((a) => a.slug),
  },
  {
    id: "2024-v4-i1",
    volume: 4,
    issue: 1,
    year: 2024,
    title: "Federalism in the 21st Century",
    description: "An examination of federalism principles and challenges in contemporary governance.",
    coverImage: "/placeholder.svg?height=600&width=400",
    publishDate: "January 15, 2024",
    articles: articles.filter((a) => a.type === "journal" && a.volume === 4 && a.issue === 1).map((a) => a.slug),
  },
  {
    id: "2023-v3-i4",
    volume: 3,
    issue: 4,
    year: 2023,
    title: "Judicial Independence and Democracy",
    description:
      "This issue examines the critical relationship between judicial independence and democratic governance.",
    coverImage: "/placeholder.svg?height=600&width=400",
    publishDate: "October 15, 2023",
    articles: articles.filter((a) => a.type === "journal" && a.volume === 3 && a.issue === 4).map((a) => a.slug),
  },
  {
    id: "2023-v3-i3",
    volume: 3,
    issue: 3,
    year: 2023,
    title: "Free Speech in the Digital Age",
    description: "Exploring the evolution of free speech doctrine in response to digital communication platforms.",
    coverImage: "/placeholder.svg?height=600&width=400",
    publishDate: "July 15, 2023",
    articles: articles.filter((a) => a.type === "journal" && a.volume === 3 && a.issue === 3).map((a) => a.slug),
  },
]

// Create calls for papers
export const callsForPapers: CallForPapers[] = [
  {
    id: "cfp-2024-v5-i1",
    title: "Call for Papers: Constitutional Law in the AI Era",
    thematicFocus: "Artificial Intelligence and Constitutional Rights",
    description:
      "We invite submissions exploring how artificial intelligence technologies challenge and reshape constitutional rights and protections. Topics may include AI-based surveillance, algorithmic decision-making in government, free speech implications of generative AI, and constitutional frameworks for regulating AI.",
    deadline: "October 15, 2024",
    volume: 5,
    issue: 1,
    year: 2025,
    guidelines:
      "Submissions should be between 5,000 and 15,000 words, including footnotes. All citations should follow the latest edition of The Bluebook: A Uniform System of Citation.",
    fee: "None",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "cfp-2024-v4-i3",
    title: "Call for Papers: Climate Change and Constitutional Law",
    thematicFocus: "Environmental Constitutionalism",
    description:
      "This special issue will examine the constitutional dimensions of climate change policy and litigation. We welcome articles addressing topics such as the constitutional basis for climate regulation, separation of powers in climate policy, federalism challenges, and comparative constitutional approaches to environmental protection.",
    deadline: "July 30, 2024",
    volume: 4,
    issue: 3,
    year: 2024,
    guidelines:
      "Manuscripts should be submitted in Microsoft Word format, double-spaced, in 12-point Times New Roman font with 1-inch margins. Please include an abstract of no more than 250 words.",
    fee: "None",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 1,
    title: "Constitutional Law and Democratic Governance",
    thematicFocus: "Constitutional Challenges in Modern Democracies",
    description:
      "This special issue focuses on contemporary constitutional challenges facing democratic systems worldwide. We invite papers examining constitutional design, judicial review, separation of powers, and democratic backsliding.",
    volume: 4,
    issue: 2,
    year: 2025,
    deadline: "July 30, 2025",
    fee: "₹1500 / $25",
    guidelines: "5,000-10,000 words, OSCOLA citation style, double-blind peer review process.",
    image: "/placeholder.svg?key=3ekom",
  },
  {
    id: 2,
    title: "Environmental Law and Climate Justice",
    thematicFocus: "Legal Frameworks for Climate Action",
    description:
      "This issue explores legal approaches to climate change mitigation and adaptation, with a focus on climate justice, international environmental agreements, and domestic climate legislation.",
    volume: 4,
    issue: 3,
    year: 2025,
    deadline: "September 15, 2025",
    fee: "₹1500 / $25",
    guidelines: "5,000-10,000 words, OSCOLA citation style, double-blind peer review process.",
    image: "/placeholder.svg?key=tsr4m",
  },
]

// Get the latest issue
export const getLatestIssue = (): JournalIssue => {
  return journalIssues.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year
    if (a.volume !== b.volume) return b.volume - a.volume
    return b.issue - a.issue
  })[0]
}

// Get articles for a specific issue
export const getArticlesByIssue = (volume: number, issue: number): typeof articles => {
  return articles.filter(
    (article) => article.type === "journal" && article.volume === volume && article.issue === issue,
  )
}

// Get all available years
export const getJournalYears = (): number[] => {
  const years = journalIssues.map((issue) => issue.year)
  return [...new Set(years)].sort((a, b) => b - a) // Unique years, sorted descending
}

// Get volumes for a specific year
export const getVolumesForYear = (year: number): number[] => {
  const volumes = journalIssues.filter((issue) => issue.year === year).map((issue) => issue.volume)
  return [...new Set(volumes)].sort((a, b) => b - a) // Unique volumes, sorted descending
}

// Get issues for a specific volume
export const getIssuesForVolume = (volume: number): number[] => {
  const issues = journalIssues.filter((issue) => issue.volume === volume).map((issue) => issue.issue)
  return [...new Set(issues)].sort((a, b) => b - a) // Unique issues, sorted descending
}

// Get all available categories
export const getJournalCategories = (): string[] => {
  const categoriesSet = new Set<string>()

  articles
    .filter((article) => article.type === "journal" && article.categories)
    .forEach((article) => {
      article.categories?.forEach((category) => categoriesSet.add(category))
    })

  return Array.from(categoriesSet).sort()
}
