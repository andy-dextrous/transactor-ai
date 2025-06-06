"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utilities/cn"

const separatorVariants = cva("shrink-0", {
  variants: {
    variant: {
      default: "bg-border",
      muted: "bg-muted",
      primary: "bg-primary",
      secondary: "bg-secondary",
    },
    size: {
      default: "",
      thick: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>) {
  const sizeClasses =
    orientation === "horizontal"
      ? size === "thick"
        ? "h-[2px] w-full"
        : "h-[1px] w-full"
      : size === "thick"
        ? "h-full w-[2px]"
        : "h-full w-[1px]"

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant }), sizeClasses, className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
