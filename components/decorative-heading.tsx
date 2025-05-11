import { cn } from "@/lib/utils"
import type * as React from "react"
import type { JSX } from "react/jsx-runtime"

interface DecorativeHeadingProps {
  children: React.ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export function DecorativeHeading({ children, className, level = 2 }: DecorativeHeadingProps) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <div className="relative flex items-center py-2 sm:py-4">
      <div className="flex-grow border-t border-muted"></div>
      <Heading className={cn("px-2 sm:px-4 text-center text-lg sm:text-xl md:text-2xl", className)}>{children}</Heading>
      <div className="flex-grow border-t border-muted"></div>
    </div>
  )
}
