import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    variant: {
      default: "rounded-md",
      circle: "rounded-full",
      rounded: "rounded-lg",
      text: "rounded h-4",
      avatar: "rounded-full aspect-square",
      card: "rounded-lg",
    },
    size: {
      default: "",
      sm: "h-4",
      md: "h-6",
      lg: "h-8",
      xl: "h-12",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Skeleton({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof skeletonVariants>) {
  return <div className={cn(skeletonVariants({ variant, size }), className)} {...props} />
}

export { Skeleton, skeletonVariants }
