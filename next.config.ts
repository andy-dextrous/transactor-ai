import { NextConfig } from "next"

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"

const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_URL].map(item => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", ""),
        }
      }),
      {
        hostname: "picsum.photos",
        protocol: "https",
      },
      {
        hostname: "logoipsum.com",
        protocol: "https",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: true,
} as NextConfig

export default nextConfig
