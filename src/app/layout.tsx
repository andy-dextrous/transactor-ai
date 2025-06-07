import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./css/globals.css"
import { ConvexClientProvider } from "@/providers/convex"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Transactor 2.0 - AI Property Concierge",
  description:
    "AI-driven property concierge platform for buyers, sellers, and professionals",
  icons: {
    icon: "/convex.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ConvexClientProvider>
          <main className="min-h-screen bg-neutral-100">{children}</main>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
