"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { getUsers, updateUserRole } from "@/lib/auth"
import type { User } from "@/lib/types"

export function UserRolesTable() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  // Fetch users on component mount
  useState(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers()
        setUsers(userData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdating(userId)
    try {
      const result = await updateUserRole(userId, newRole)
      if (result.success) {
        // Update the local state
        setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole as any } : user)))

        toast({
          title: "Success",
          description: `User role updated to ${newRole}`,
        })

        // Refresh the page to reflect changes
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update user role",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Current Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                    disabled={updating === user.id}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="EDITOR">Editor</SelectItem>
                      <SelectItem value="AUTHOR">Author</SelectItem>
                      <SelectItem value="VIEWER">Viewer</SelectItem>
                    </SelectContent>
                  </Select>

                  {updating === user.id && (
                    <Button variant="ghost" size="sm" disabled>
                      Updating...
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
