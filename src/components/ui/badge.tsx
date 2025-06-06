import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        neutral:
          "border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
        featured: "border-transparent bg-primary text-white shadow-lg",
        "price-change": "border-transparent bg-success-500 text-white shadow-lg",
      },
      size: {
        default: "rounded-full",
        sm: "rounded-md px-2 py-0.5 text-xs",
        lg: "rounded-lg px-3 py-1 text-sm",
        pill: "rounded-full px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
