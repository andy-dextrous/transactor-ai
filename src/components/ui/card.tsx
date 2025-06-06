import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const cardVariants = cva("border bg-neutral-50 text-neutral-900", {
  variants: {
    variant: {
      default: "rounded-lg shadow-sm",
      elevated: "rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300",
      interactive:
        "rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform overflow-hidden",
      flat: "rounded-lg border-0 shadow-none",
      outline: "rounded-lg border-2",
    },
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Card({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return <div className={cn(cardVariants({ variant, size }), className)} {...props} />
}

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    size: {
      default: "p-6",
      sm: "p-4",
      lg: "p-8",
      none: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function CardHeader({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardHeaderVariants>) {
  return <div className={cn(cardHeaderVariants({ size }), className)} {...props} />
}

const cardContentVariants = cva("", {
  variants: {
    size: {
      default: "p-6 pt-0",
      sm: "p-4 pt-0",
      lg: "p-8 pt-0",
      none: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function CardContent({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardContentVariants>) {
  return <div className={cn(cardContentVariants({ size }), className)} {...props} />
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-2xl leading-none font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm text-neutral-600", className)} {...props} />
}

const cardFooterVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "p-6 pt-0",
      sm: "p-4 pt-0",
      lg: "p-8 pt-0",
      none: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function CardFooter({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardFooterVariants>) {
  return <div className={cn(cardFooterVariants({ size }), className)} {...props} />
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
}
