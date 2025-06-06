"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI property assistant powered by advanced technology. I can help you navigate Australian property transactions, answer legal questions, and guide you through buying or selling processes. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I understand you're interested in property transactions. Let me provide you with detailed, accurate information tailored to Australian property law. Could you tell me more about your specific situation?",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="flex h-[700px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
      {/* Chat Header */}
      <div className="bg-primary border-primary-200 flex items-center gap-4 border-b p-6">
        <div className="relative">
          <Avatar size="lg" className="ring-secondary bg-secondary ring-2">
            <AvatarFallback variant="colored" className="bg-secondary/9">
              <Bot className="h-6 w-6 text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="bg-success-500 absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white">
            <Sparkles className="h-2 w-2 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">PropertyAI Assistant</h3>
          <p className="text-sm font-medium text-white/90">
            Powered by Transactor AI • Online now
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              {message.sender === "ai" && (
                <Avatar size="sm" className="ring-primary-100 mt-1 ring-2">
                  <AvatarFallback variant="colored">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${
                  message.sender === "user"
                    ? "bg-primary shadow-primary/20 text-white"
                    : "border border-neutral-200 bg-neutral-50 text-neutral-900"
                }`}
              >
                <p
                  className={`text-sm leading-relaxed font-medium ${message.sender === "user" ? "text-white" : ""}`}
                >
                  {message.content}
                </p>
                <p
                  className={`mt-2 text-xs ${message.sender === "user" ? "text-primary-100" : "text-neutral-500"}`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.sender === "user" && (
                <Avatar size="sm" className="mt-1 ring-2 ring-neutral-200">
                  <AvatarFallback variant="neutral">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-neutral-200 bg-neutral-50 p-6">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about property transactions, legal requirements, or market insights..."
            className="h-12 flex-1 border-neutral-300 bg-white px-4 py-3"
            onKeyDown={e => e.key === "Enter" && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            variant="rounded"
            size="xl"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="mt-3 text-center text-xs text-neutral-500">
          AI responses are for informational purposes. Always consult with qualified
          professionals.
        </p>
      </div>
    </div>
  )
}
