import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { isSuperAdmin } from "@/lib/permissions"
import { UserRolesTable } from "@/components/admin/user-roles-table"

export const metadata: Metadata = {
  title: "User Role Management",
  description: "Manage user roles and permissions",
}

export default async function RolesPage() {
  const user = await getCurrentUser()

  // Only super admins can access this page
  if (!user || !isSuperAdmin(user)) {
    redirect("/admin")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">User Role Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage user roles and permissions. Only super admins can access this page.
        </p>
      </div>
      <UserRolesTable />
    </div>
  )
}
