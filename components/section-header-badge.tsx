import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Shared badge for project section headers (Editing: Documentary, Corporate, Advertising;
 * Animation: Motion Graphics Design, Animated Shorts, etc.).
 * Style is controlled here so size, color, and appearance stay consistent across pages.
 */
export function SectionHeaderBadge({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Badge>) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "px-3 py-0.5 text-sm rounded-md border-transparent bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900",
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  )
}
