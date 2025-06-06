import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutral-900",
  {
    variants: {
      variant: {
        default: "bg-neutral-50 text-neutral-900",
        destructive: "border-danger/50 text-danger [&>svg]:text-danger",
        success: "border-success/20 bg-success/10 [&>svg]:text-success-700",
        warning: "border-warning/20 bg-warning/10 [&>svg]:text-warning-700",
        info: "border-primary/20 bg-primary/10 [&>svg]:text-primary-700",
        danger: "border-danger/20 bg-danger/10 [&>svg]:text-danger-700",
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

const alertDescriptionVariants = cva("text-sm [&_p]:leading-relaxed font-medium", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      success: "text-success-800",
      warning: "text-warning-800",
      info: "text-primary-800",
      danger: "text-danger-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

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
  variant,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof alertDescriptionVariants>) {
  return (
    <div className={cn(alertDescriptionVariants({ variant }), className)} {...props} />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
