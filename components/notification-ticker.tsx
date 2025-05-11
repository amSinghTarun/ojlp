"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, ChevronRight, BookOpen, Award, Briefcase, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notifications } from "@/lib/notifications"
import { cn } from "@/lib/utils"
import type { Notification } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export function NotificationTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter notifications - show all unread high priority notifications
  const unreadHighPriorityNotifications = notifications.filter((n) => !n.read && n.priority === "high")

  const hasNotifications = unreadHighPriorityNotifications.length > 0

  useEffect(() => {
    if (!hasNotifications) return

    // Rotate through notifications every 8 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % unreadHighPriorityNotifications.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [hasNotifications, unreadHighPriorityNotifications.length])

  if (!hasNotifications) return null

  const notification = unreadHighPriorityNotifications[currentIndex]

  // Get the appropriate icon based on notification type
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "call-for-papers":
        return <BookOpen className="h-5 w-5 text-primary" />
      case "student-competition":
        return <Award className="h-5 w-5 text-primary" />
      case "editorial-vacancy":
        return <Briefcase className="h-5 w-5 text-primary" />
      case "special-issue":
        return <Users className="h-5 w-5 text-primary" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div className="bg-muted py-4 border-y relative overflow-hidden">
      <div className="container px-4 relative">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center text-sm flex-1 overflow-hidden">
            <div className="bg-primary/10 p-2 rounded-full mr-4 flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center">
                <span className="font-bold mr-2">{notification.title}</span>
                <Badge variant="outline" className="text-xs">
                  {notification.type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              </div>
              <div className="overflow-hidden whitespace-nowrap animate-marquee">
                <span className="text-muted-foreground">{notification.content}</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="px-3 h-8 text-xs border-primary/20 hover:bg-primary/20"
            >
              <Link href={notification.link || "/notifications"}>
                View Details
                <ChevronRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        {unreadHighPriorityNotifications.length > 1 && (
          <div className="flex gap-1 absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-1">
            {unreadHighPriorityNotifications.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 w-8 rounded-full bg-primary/20 transition-all duration-300",
                  index === currentIndex && "bg-primary",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
