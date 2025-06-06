"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-neutral-50)",
          "--normal-text": "var(--color-neutral-900)",
          "--normal-border": "var(--color-neutral-300)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
