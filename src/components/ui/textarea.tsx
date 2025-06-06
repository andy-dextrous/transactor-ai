import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const textareaVariants = cva(
  "flex w-full rounded-md border bg-background text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-vertical",
  {
    variants: {
      variant: {
        default: "border-input",
        destructive: "border-destructive focus-visible:ring-destructive",
        success: "border-success focus-visible:ring-success",
        warning: "border-warning focus-visible:ring-warning",
      },
      size: {
        default: "min-h-[80px] px-3 py-2",
        sm: "min-h-[60px] px-2.5 py-1.5 text-sm",
        lg: "min-h-[120px] px-4 py-3",
        xl: "min-h-[160px] px-5 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Textarea({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea className={cn(textareaVariants({ variant, size }), className)} {...props} />
  )
}

export { Textarea, textareaVariants }
