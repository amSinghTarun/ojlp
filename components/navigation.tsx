"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, FileText, ChevronDown, Search } from "lucide-react"
import { NotificationButton } from "@/components/notification-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const aboutLinks = [
  {
    title: "About Us",
    href: "/about",
    description: "Learn about our mission, values, and history.",
  },
  {
    title: "Editorial Board",
    href: "/editorial-board",
    description: "Meet our distinguished editorial board members.",
  },
  {
    title: "Board of Advisors",
    href: "/board-of-advisors",
    description: "Meet our expert advisors who guide our strategic direction.",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with our team.",
  },
]

const journalLinks = [
  {
    title: "Current Issue",
    href: "/journals",
    description: "Read our latest journal issue.",
  },
  {
    title: "Archive",
    href: "/journals/archive",
    description: "Browse our past journal issues.",
  },
]

const submitLinks = [
  {
    title: "Submit Paper",
    href: "/submit",
    description: "Submit your research paper for publication.",
  },
  {
    title: "Call for Papers",
    href: "/journals/call-for-papers",
    description: "View current calls for papers and submission deadlines.",
  },
]

// Custom navigation link style with transparent background and subtle hover effect
const customNavLinkStyle = cn(
  navigationMenuTriggerStyle(),
  "bg-transparent hover:bg-secondary/50 text-foreground font-medium tracking-tight",
)

// Custom navigation trigger style with transparent background and subtle hover effect
const customNavTriggerStyle = cn(
  "bg-transparent data-[state=open]:bg-secondary/50 data-[active]:bg-transparent hover:bg-secondary/50 text-foreground font-medium tracking-tight",
)

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 relative">
            <Image
              src="/logo.png"
              alt="Open Journal of Law & Policy"
              fill
              className="object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="font-heading font-semibold text-lg tracking-tight">Open Journal of Law & Policy</div>
        </Link>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
