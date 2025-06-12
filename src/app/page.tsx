"use client"

import { useState } from "react"
import { useQuery, useMutation, useAction } from "convex/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles, Plus, MessageSquare } from "lucide-react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"

export default function ChatPage() {
  const [currentConversationId, setCurrentConversationId] =
    useState<Id<"conversations"> | null>(null)
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Convex hooks
  const sendMessage = useMutation(api.chat.sendMessage)
  const startConversation = useMutation(api.chat.startConversation)

  const conversations = useQuery(api.conversations.listConversations, {
    paginationOpts: { cursor: null, numItems: 10 },
  })

  const messages = useQuery(
    api.conversations.listMessages,
    currentConversationId
      ? {
          conversationId: currentConversationId,
          paginationOpts: { cursor: null, numItems: 50 },
        }
      : "skip"
  )

  const currentConversation = useQuery(
    api.conversations.getConversation,
    currentConversationId ? { conversationId: currentConversationId } : "skip"
  )

  /*************************************************************************/
  /*  EVENT HANDLERS
  /*************************************************************************/

  function handleSendMessage() {
    if (!input.trim()) return

    const userInput = input
    setInput("")
    setIsGenerating(true)

    async function processMessage() {
      try {
        const conversationId = currentConversationId

        if (!conversationId) {
          // Start new conversation
          console.log("Starting new conversation...")
          const result = await startConversation({
            initialMessage: userInput,
            title: userInput.slice(0, 50) + (userInput.length > 50 ? "..." : ""),
          })
          setCurrentConversationId(result.conversationId)
          console.log("Conversation started:", result.conversationId)
        } else {
          // Send message to existing conversation
          console.log("Sending message to existing conversation:", userInput)
          await sendMessage({
            conversationId,
            content: userInput,
          })
          console.log("Message sent successfully")
        }
      } catch (error) {
        console.error("Error processing message:", error)
      } finally {
        setIsGenerating(false)
      }
    }

    processMessage()
  }

  function handleNewConversation() {
    setCurrentConversationId(null)
    setInput("")
    setIsGenerating(false)
  }

  function handleSelectConversation(conversationId: Id<"conversations">) {
    setCurrentConversationId(conversationId)
    setIsGenerating(false)
  }

  /*************************************************************************/
  /*  RENDER
  /*************************************************************************/

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Sidebar */}
      <div className="w-80 border-r border-neutral-200 bg-white shadow-sm">
        {/* Sidebar Header */}
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

        {/* Conversation List */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {/* New Conversation Button */}
            <Button
              onClick={handleNewConversation}
              variant="outline"
              className="w-full justify-start gap-3"
            >
              <Plus className="h-4 w-4" />
              New Conversation
            </Button>

            {/* Conversation List */}
            {conversations?.page?.map(conversation => (
              <Button
                key={conversation._id}
                onClick={() => handleSelectConversation(conversation._id)}
                variant={currentConversationId === conversation._id ? "default" : "ghost"}
                className="h-auto w-full justify-start gap-3 p-3"
              >
                <MessageSquare className="h-4 w-4" />
                <div className="min-w-0 flex-1 text-left">
                  <div className="truncate font-medium">{conversation.title}</div>
                  <div className="truncate text-xs text-neutral-500">
                    {new Date(conversation.lastMessageTime).toLocaleDateString()}
                  </div>
                </div>
              </Button>
            ))}

            {/* Usage Hints */}
            <div className="mt-6 rounded-lg bg-neutral-50 p-4">
              <h4 className="mb-2 text-sm font-medium text-neutral-900">
                Try asking about:
              </h4>
              <ul className="space-y-1 text-xs text-neutral-600">
                <li>• Properties in Melbourne CBD</li>
                <li>• Settlement status updates</li>
                <li>• Market insights for suburbs</li>
                <li>• Document analysis</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-l-2xl bg-white shadow-xl">
        {/* Chat Header */}
        <div className="border-b border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            {currentConversation ? currentConversation.title : "Welcome to PropertyAI"}
          </h2>
          <p className="text-sm text-neutral-600">
            {currentConversation
              ? "Ask about properties, settlements, or market data"
              : "Start a conversation to explore Australian property insights"}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-6">
            <div className="space-y-6">
              {(!currentConversationId || !messages?.page?.length) && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative mb-4">
                    <Avatar size="2xl" className="ring-primary-100 ring-4">
                      <AvatarFallback variant="colored" className="bg-primary">
                        <Bot className="h-8 w-8 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-success-500 absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-neutral-900">
                    Hello! I'm your AI property assistant
                  </h3>
                  <p className="max-w-md text-neutral-600">
                    I can help you navigate Australian property transactions, search
                    listings, track settlements, and provide market insights. What would
                    you like to know?
                  </p>
                </div>
              )}

              {/* Message List */}
              {messages?.page?.map(message => (
                <div
                  key={message._id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  {message.role === "assistant" && (
                    <Avatar size="sm" className="ring-primary-100 mt-1 ring-2">
                      <AvatarFallback variant="colored">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${
                      message.role === "user"
                        ? "bg-primary shadow-primary/20 text-white"
                        : "border border-neutral-200 bg-neutral-50 text-neutral-900"
                    }`}
                  >
                    <div
                      className={`text-sm leading-relaxed font-medium ${message.role === "user" ? "text-white" : ""}`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p
                      className={`mt-2 text-xs ${message.role === "user" ? "text-primary-100" : "text-neutral-500"}`}
                    >
                      {new Date(message._creationTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar size="sm" className="mt-1 ring-2 ring-neutral-200">
                      <AvatarFallback variant="neutral">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Generating Indicator */}
              {isGenerating && (
                <div className="animate-fade-in flex justify-start gap-4">
                  <Avatar size="sm" className="ring-primary-100 mt-1 ring-2">
                    <AvatarFallback variant="colored">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[85%] rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-neutral-900 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
                        <div
                          className="bg-primary h-2 w-2 animate-bounce rounded-full"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="bg-primary h-2 w-2 animate-bounce rounded-full"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-neutral-500">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Input Area */}
        <div className="border-t border-neutral-200 bg-neutral-50 p-6">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about property transactions, legal requirements, or market insights..."
              className="h-12 flex-1 border-neutral-300 bg-white px-4 py-3"
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              disabled={isGenerating}
            />
            <Button
              onClick={handleSendMessage}
              variant="rounded"
              size="xl"
              disabled={!input.trim() || isGenerating}
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
    </div>
  )
}
