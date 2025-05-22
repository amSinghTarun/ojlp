"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getUsers, deleteUser } from "@/lib/auth"
import { hasPermission, PERMISSIONS, isSuperAdmin } from "@/lib/permissions"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import type { User } from "@/lib/types"

interface UsersTableProps {
  currentUser: User
}

export function UsersTable({ currentUser }: UsersTableProps) {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
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

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    setIsDeleting(true)
    try {
      const result = await deleteUser(userToDelete)
      if (result.success) {
        setUsers(users.filter((user) => user.id !== userToDelete))
        toast({
          title: "Success",
          description: "User deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete user",
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
      setIsDeleting(false)
      setUserToDelete(null)
    }
  }

  const canManageRoles = hasPermission(currentUser, PERMISSIONS.MANAGE_ROLES)

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link href="/admin/users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New User
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/users/${user.id}/edit`}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>

                      {/* Only allow deletion if:
                          1. Current user is not deleting themselves
                          2. If target is SUPER_ADMIN, only another SUPER_ADMIN can delete them */}
                      {user.id !== currentUser.id && (user.role !== "SUPER_ADMIN" || isSuperAdmin(currentUser)) && (
                        <Button variant="destructive" size="sm" onClick={() => setUserToDelete(user.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDeleteUser()
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
