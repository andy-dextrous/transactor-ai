"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const avatarVariants = cva("relative flex shrink-0 overflow-hidden", {
  variants: {
    variant: {
      default: "rounded-full",
      square: "rounded-lg",
      rounded: "rounded-xl",
    },
    size: {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
      "2xl": "h-20 w-20",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Avatar({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
}

const avatarFallbackVariants = cva("flex h-full w-full items-center justify-center", {
  variants: {
    variant: {
      default: "rounded-full bg-neutral-100",
      square: "rounded-lg bg-neutral-100",
      rounded: "rounded-xl bg-neutral-100",
      colored: "rounded-full bg-primary text-primary-foreground",
      neutral: "rounded-full bg-neutral-100 text-neutral-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function AvatarFallback({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> &
  VariantProps<typeof avatarFallbackVariants>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(avatarFallbackVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants, avatarFallbackVariants }
