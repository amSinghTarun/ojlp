"use client"

import * as React from "react"
import Link from "next/link"
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
import { Menu } from "lucide-react"
import { NotificationButton } from "@/components/notification-button"

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
  {
    title: "Call for Papers",
    href: "/journals/call-for-papers",
    description: "Submit your research for publication.",
  },
]

export function Navigation({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {aboutLinks.map((link) => (
                    <ListItem key={link.title} title={link.title} href={link.href}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Journal</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {journalLinks.map((link) => (
                    <ListItem key={link.title} title={link.title} href={link.href}>
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/blogs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blogs</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mx-4">
          <NotificationButton />
        </div>
        <Button asChild size="sm" className="transition-all duration-300 hover:scale-105 justify-right bg-primary">
          <Link href="/submit">Submit Paper</Link>
        </Button>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className={cn("hover:text-foreground/80", pathname === "/" ? "text-foreground" : "text-foreground/60")}
              >
                Home
              </Link>
              <div className="grid gap-3 pl-3">
                <h3 className="text-foreground font-semibold">About</h3>
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-muted-foreground hover:text-foreground",
                      pathname === link.href ? "text-foreground" : "text-foreground/60",
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <div className="grid gap-3 pl-3">
                <h3 className="text-foreground font-semibold">Journal</h3>
                {journalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-muted-foreground hover:text-foreground",
                      pathname === link.href ? "text-foreground" : "text-foreground/60",
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/blogs"
                className={cn(
                  "hover:text-foreground/80",
                  pathname === "/blogs" ? "text-foreground" : "text-foreground/60",
                )}
              >
                Blogs
              </Link>
              <div className="flex items-center">
                <NotificationButton />
                <span className="ml-2">Notifications</span>
              </div>
              <Button asChild size="sm" className="transition-all duration-300 hover:scale-105 bg-primary">
                <Link href="/submit">Submit Paper</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
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
