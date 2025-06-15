"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Bell, Calendar, ExternalLink, Megaphone, BookOpen, Award, Briefcase, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Notification } from "@/lib/types"

export function NotificationCard({
  notification,
  index,
  unread = false,
}: {
  notification: Notification
  index: number
  unread?: boolean
}) {
  const priorityClasses = {
    high: "border-destructive/20 bg-destructive/5",
    medium: "border-primary/20 bg-primary/5",
    low: "border-muted",
  }

  // Map notification type to icon
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "call-for-papers":
        return <BookOpen className="h-4 w-4" />
      case "student-competition":
        return <Award className="h-4 w-4" />
      case "editorial-vacancy":
        return <Briefcase className="h-4 w-4" />
      case "special-issue":
        return <Users className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "publication":
        return <ExternalLink className="h-4 w-4" />
      case "announcement":
        return <Megaphone className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  // Get notification type display name
  const getNotificationTypeName = (type: Notification["type"]) => {
    switch (type) {
      case "call-for-papers":
        return "Call for Papers"
      case "student-competition":
        return "Student Competition"
      case "editorial-vacancy":
        return "Editorial Vacancy"
      case "special-issue":
        return "Special Issue"
      case "event":
        return "Event"
      case "publication":
        return "Publication"
      case "announcement":
        return "Announcement"
      default:
        return type.replace("-", " ")
    }
  }

  // Use a default placeholder image if the notification image is missing or invalid
  const defaultImage = "/placeholder.svg?key=urrlw"

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If image fails to load, replace with default placeholder
    e.currentTarget.src = defaultImage
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader className="p-4">
        <div className="flex flex-col justify-between items-start space-y-4">
          <span className="text-sm text-muted-foreground">{getNotificationTypeName(notification.type)}</span> 
          <CardTitle className="text-lg text-red-800 font-bold">{notification.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <p className="text-muted-foreground">{notification.content}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{notification.date}</span>
          {notification.expiresAt && (
            <span className="text-sm text-muted-foreground">Expires: {notification.expiresAt}</span>
          )}
        </div>
        {notification.link && (
          <Button asChild variant="outline" className="w-full">
            <Link href={notification.link}>View Details</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
