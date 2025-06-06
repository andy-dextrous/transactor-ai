import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive [&>svg]:text-destructive",
        success: "border-success/50 text-success [&>svg]:text-success bg-success/5",
        warning: "border-warning/50 text-warning [&>svg]:text-warning bg-warning/5",
        info: "border-primary/50 text-primary [&>svg]:text-primary bg-primary/5",
      },
      size: {
        default: "p-4",
        sm: "p-3 text-sm",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Alert({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 leading-none font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
