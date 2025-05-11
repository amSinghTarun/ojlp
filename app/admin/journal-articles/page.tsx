import { DashboardHeader } from "@/components/admin/dashboard-header"
import { JournalArticlesTable } from "@/components/admin/journal-articles-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function JournalArticlesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Journal Articles" text="Create and manage journal articles." />
        <Button asChild>
          <Link href="/admin/journal-articles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Journal Article
          </Link>
        </Button>
      </div>
      <JournalArticlesTable />
    </div>
  )
}
