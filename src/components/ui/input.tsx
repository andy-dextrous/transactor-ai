import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const inputVariants = cva(
  "flex w-full rounded-md border bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-input",
        destructive: "border-destructive focus-visible:ring-destructive",
        success: "border-success focus-visible:ring-success",
        warning: "border-warning focus-visible:ring-warning",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2.5 py-1.5 text-sm",
        lg: "h-12 px-4 py-3",
        xl: "h-14 px-5 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
