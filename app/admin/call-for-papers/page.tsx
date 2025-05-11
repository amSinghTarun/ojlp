import { DashboardHeader } from "@/components/admin/dashboard-header"
import { CallForPapersTable } from "@/components/admin/call-for-papers-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function CallForPapersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Call for Papers" text="Create and manage calls for papers." />
        <Button asChild>
          <Link href="/admin/call-for-papers/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Call for Papers
          </Link>
        </Button>
      </div>
      <CallForPapersTable />
    </div>
  )
}
