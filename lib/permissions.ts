import type { User } from "./types"

// Define all possible permissions in the system
export const PERMISSIONS = {
  // Content management
  VIEW_DASHBOARD: "view_dashboard",
  MANAGE_POSTS: "manage_posts",
  MANAGE_AUTHORS: "manage_authors",
  MANAGE_JOURNALS: "manage_journals",
  MANAGE_ARTICLES: "manage_articles",
  MANAGE_CALL_FOR_PAPERS: "manage_call_for_papers",
  MANAGE_NOTIFICATIONS: "manage_notifications",
  MANAGE_MEDIA: "manage_media",
  MANAGE_EDITORIAL_BOARD: "manage_editorial_board",
  MANAGE_BOARD_ADVISORS: "manage_board_advisors",
  MANAGE_USERS: "manage_users",

  // User management (super admin only)
  MANAGE_ROLES: "manage_roles",
  MANAGE_PERMISSIONS: "manage_permissions",
}

// Define route permissions mapping
export const ROUTE_PERMISSIONS: Record<string, string> = {
  "/admin": PERMISSIONS.VIEW_DASHBOARD,
  "/admin/posts": PERMISSIONS.MANAGE_POSTS,
  "/admin/authors": PERMISSIONS.MANAGE_AUTHORS,
  "/admin/journals": PERMISSIONS.MANAGE_JOURNALS,
  "/admin/journal-articles": PERMISSIONS.MANAGE_ARTICLES,
  "/admin/call-for-papers": PERMISSIONS.MANAGE_CALL_FOR_PAPERS,
  "/admin/notifications": PERMISSIONS.MANAGE_NOTIFICATIONS,
  "/admin/media": PERMISSIONS.MANAGE_MEDIA,
  "/admin/editorial-board": PERMISSIONS.MANAGE_EDITORIAL_BOARD,
  "/admin/board-advisors": PERMISSIONS.MANAGE_BOARD_ADVISORS,
  "/admin/users": PERMISSIONS.MANAGE_USERS,
  "/admin/roles": PERMISSIONS.MANAGE_ROLES,
  "/admin/permissions": PERMISSIONS.MANAGE_PERMISSIONS,
}

// Define role-based permissions
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS), // Super admins have all permissions

  ADMIN: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_POSTS,
    PERMISSIONS.MANAGE_AUTHORS,
    PERMISSIONS.MANAGE_JOURNALS,
    PERMISSIONS.MANAGE_ARTICLES,
    PERMISSIONS.MANAGE_CALL_FOR_PAPERS,
    PERMISSIONS.MANAGE_NOTIFICATIONS,
    PERMISSIONS.MANAGE_MEDIA,
    PERMISSIONS.MANAGE_EDITORIAL_BOARD,
    PERMISSIONS.MANAGE_BOARD_ADVISORS,
    PERMISSIONS.MANAGE_USERS,
    // No MANAGE_ROLES permission
    // No MANAGE_PERMISSIONS permission
  ],

  EDITOR: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_POSTS,
    PERMISSIONS.MANAGE_AUTHORS,
    PERMISSIONS.MANAGE_JOURNALS,
    PERMISSIONS.MANAGE_ARTICLES,
    PERMISSIONS.MANAGE_CALL_FOR_PAPERS,
    PERMISSIONS.MANAGE_NOTIFICATIONS,
  ],

  AUTHOR: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.MANAGE_POSTS],

  VIEWER: [PERMISSIONS.VIEW_DASHBOARD],
}

// Helper functions to check permissions
export function hasPermission(user: User, permission: string): boolean {
  if (!user) return false

  // Super admins have all permissions
  if (user.role === "SUPER_ADMIN") return true

  // Check if the user has the specific permission
  if (user.permissions && user.permissions.includes(permission)) {
    return true
  }

  // Check if the user's role has the permission
  return ROLE_PERMISSIONS[user.role]?.includes(permission) || false
}

// Check if user has permission to access a specific route
export function hasRoutePermission(user: User, route: string): boolean {
  // If the route doesn't have a specific permission requirement, allow access
  if (!ROUTE_PERMISSIONS[route]) return true

  // Check if the user has permission for this route
  return hasPermission(user, ROUTE_PERMISSIONS[route])
}

// Check if user has any of the given permissions
export function hasAnyPermission(user: User, permissions: string[]): boolean {
  return permissions.some((permission) => hasPermission(user, permission))
}

// Check if user has all of the given permissions
export function hasAllPermissions(user: User, permissions: string[]): boolean {
  return permissions.every((permission) => hasPermission(user, permission))
}

// Check if user is a super admin
export function isSuperAdmin(user: User): boolean {
  return user?.role === "SUPER_ADMIN"
}

// Get all available routes with their permission requirements
export function getAllRoutePermissions(): Array<{ route: string; permission: string; description: string }> {
  return Object.entries(ROUTE_PERMISSIONS).map(([route, permission]) => {
    // Generate a human-readable description
    const description = permission
      .replace("manage_", "Manage ")
      .replace("view_", "View ")
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return {
      route,
      permission,
      description,
    }
  })
}

// Get all available permissions with descriptions
export function getAllPermissions(): Array<{ id: string; name: string }> {
  return Object.entries(PERMISSIONS).map(([key, value]) => {
    // Generate a human-readable name
    const name = key
      .replace("MANAGE_", "Manage ")
      .replace("VIEW_", "View ")
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return {
      id: value,
      name,
    }
  })
}
