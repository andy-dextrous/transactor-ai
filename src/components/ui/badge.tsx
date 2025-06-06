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
          "border-transparent bg-danger text-danger-foreground hover:bg-danger/80",
        outline: "text-neutral-900",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80",
        warning:
          "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        neutral:
          "border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
        featured: "border-transparent bg-primary/10 text-primary-800 hover:bg-primary/20",
        available:
          "border-transparent bg-success/10 text-success-800 hover:bg-success/20",
        pending: "border-transparent bg-warning/10 text-warning-800 hover:bg-warning/20",
        sold: "border-transparent bg-danger/10 text-danger-800 hover:bg-danger/20",
        "success-outlined":
          "bg-success/10 text-success-700 border-success/20 border hover:bg-success/20",
        "warning-outlined":
          "bg-warning/10 text-warning-700 border-warning/20 border hover:bg-warning/20",
        "primary-outlined":
          "bg-primary/10 text-primary-700 border-primary/20 border hover:bg-primary/20",
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
