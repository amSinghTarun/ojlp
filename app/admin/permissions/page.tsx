import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { isSuperAdmin } from "@/lib/permissions"
import { PermissionsManager } from "@/components/admin/permissions-manager"

export const metadata: Metadata = {
  title: "Route Permissions Management",
  description: "Manage route permissions for users",
}

export default async function PermissionsPage() {
  const user = await getCurrentUser()

  // Only super admins can access this page
  if (!user || !isSuperAdmin(user)) {
    redirect("/admin")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Route Permissions Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage which routes each admin user can access. Only super admins can modify permissions.
        </p>
      </div>
      <PermissionsManager />
    </div>
  )
}
