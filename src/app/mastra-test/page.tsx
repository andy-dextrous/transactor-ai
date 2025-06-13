"use client"

import { MastraChatUI } from "@/components/mastra-chat-ui"

export default function MastraTestPage() {
  return (
    <main className="container mx-auto py-10">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold">Transactor AI Concierge</h1>
        <p className="text-neutral-600">
          Chat with your AI assistant powered by Transactor with streaming and tool
          calling
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <MastraChatUI />
      </div>
    </main>
  )
}
