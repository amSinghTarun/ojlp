"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { createUser, updateUser, getCurrentUser } from "@/lib/auth"
import { hasPermission, PERMISSIONS } from "@/lib/permissions"
import type { User } from "@/lib/types"

// Form validation schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).optional(),
  role: z.string({
    required_error: "Please select a role",
  }),
})

interface UserFormProps {
  user?: User
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Get current user to check permissions
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser()
        setCurrentUser(user)
      } catch (error) {
        console.error("Failed to fetch current user:", error)
      }
    }
    fetchCurrentUser()
  }, [])

  // Initialize form with default values or existing user data
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "", // Don't pre-fill password
      role: user?.role || "VIEWER",
    },
  })

  const onSubmit = async (data: z.infer<typeof userFormSchema>) => {
    setIsSubmitting(true)

    try {
      let result

      if (user) {
        // Update existing user
        result = await updateUser(user.id, {
          name: data.name,
          email: data.email,
          ...(data.password && data.password.length > 0 ? { password: data.password } : {}),
          role: data.role,
        })
      } else {
        // Create new user
        result = await createUser({
          name: data.name,
          email: data.email,
          password: data.password || "defaultpassword", // Fallback password (should never happen with validation)
          role: data.role,
        })
      }

      if (result.success) {
        toast({
          title: "Success",
          description: user ? "User updated successfully" : "User created successfully",
        })
        router.push("/admin/users")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to save user",
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
      setIsSubmitting(false)
    }
  }

  // Check if current user can manage roles
  const canManageRoles = currentUser && hasPermission(currentUser, PERMISSIONS.MANAGE_ROLES)

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>The user's full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>The user's email address for login.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{user ? "New Password" : "Password"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={user ? "Leave blank to keep current password" : "Password"}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {user ? "Leave blank to keep the current password." : "Must be at least 8 characters."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!canManageRoles && user?.role === "SUPER_ADMIN"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* Only super admins can create other super admins */}
                      {canManageRoles && <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>}
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="EDITOR">Editor</SelectItem>
                      <SelectItem value="AUTHOR">Author</SelectItem>
                      <SelectItem value="VIEWER">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The user's role determines their permissions in the system.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/users")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : user ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
