import { cn } from "@/lib/utils"
import type * as React from "react"
import type { JSX } from "react/jsx-runtime"

interface DecorativeHeadingProps {
  children: React.ReactNode
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  centered?: boolean
}

export function DecorativeHeading({ children, className, level = 2, centered = true }: DecorativeHeadingProps) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <div className={cn("relative py-4 sm:py-6", centered && "flex items-center justify-center text-center")}>
      <Heading
        className={cn(
          "relative px-4 text-base sm:text-xl md:text-xl font-heading font-normal tracking-tight",
          className,
        )}
      >
        {children}
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-primary rounded-full"></span>
      </Heading>
    </div>
  )
}
