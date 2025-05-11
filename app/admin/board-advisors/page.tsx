import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AdminSidebar } from "@/components/admin/sidebar"
import { BoardAdvisorsTable } from "@/components/admin/board-advisors-table"

export default function BoardAdvisorsPage() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Board of Advisors</h1>
            <Button asChild>
              <Link href="/admin/board-advisors/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Advisor
              </Link>
            </Button>
          </div>
          <BoardAdvisorsTable />
        </main>
      </div>
    </div>
  )
}
