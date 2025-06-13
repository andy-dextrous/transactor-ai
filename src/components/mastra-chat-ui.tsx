"use client"

import { useState, useEffect, useRef } from "react"
import { readStreamableValue } from "ai/rsc"
import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Send,
  Bot,
  User,
  Sparkles,
  ChevronDown,
  ChevronRight,
  RotateCcw,
} from "lucide-react"
import { streamChatResponse, type ChatMessage } from "@/app/mastra-test/chat-action"

/*************************************************************************/
/*  THINKING INDICATOR COMPONENT
/*************************************************************************/

function ThinkingIndicator() {
  return (
    <motion.div
      className="flex justify-start gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
    >
      <Avatar size="sm" className="ring-primary-100 mt-1 ring-2">
        <AvatarFallback variant="colored">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[85%]">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-neutral-900 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex space-x-1">
              <motion.div
                className="h-2 w-2 rounded-full bg-neutral-400"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-neutral-400"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0.2,
                }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-neutral-400"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: 0.4,
                }}
              />
            </div>
            <span className="text-sm font-medium text-neutral-600">Thinking...</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/*************************************************************************/
/*  TOOL CALL DISPLAY COMPONENT
/*************************************************************************/

function ToolCallDisplay({ toolCall }: { toolCall: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="mt-3 cursor-pointer rounded-lg border border-neutral-200 bg-neutral-50 p-3 transition-colors hover:bg-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary h-4 w-4" />
                <span className="text-sm font-medium text-neutral-700">
                  Using tool: {toolCall.name}
                </span>
                {toolCall.result && <Sparkles className="text-success h-4 w-4" />}
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="h-4 w-4 text-neutral-500" />
              </motion.div>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <motion.div
            className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {toolCall.args && (
              <div className="mb-2">
                <p className="mb-1 text-xs text-neutral-500">Input:</p>
                <div className="rounded bg-neutral-100 p-2 font-mono text-xs">
                  {JSON.stringify(toolCall.args, null, 2)}
                </div>
              </div>
            )}

            {toolCall.result && (
              <div>
                <p className="mb-1 text-xs text-neutral-500">Result:</p>
                <div className="bg-success-50 border-success-200 rounded border p-2 text-xs">
                  {typeof toolCall.result === "object"
                    ? JSON.stringify(toolCall.result, null, 2)
                    : String(toolCall.result)}
                </div>
              </div>
            )}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  )
}

/*************************************************************************/
/*  MASTRA CHAT UI COMPONENT
/*************************************************************************/

export function MastraChatUI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI assistant powered by Mastra. I can help you with various tasks including checking the weather. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [streamingContent, setStreamingContent] = useState("")
  const [streamingToolCalls, setStreamingToolCalls] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate persistent IDs for user sessions that survive page refreshes
  const [resourceId, setResourceId] = useState("")
  const [threadId, setThreadId] = useState("")

  // Initialize IDs on client side only
  useEffect(() => {
    // Set resourceId
    const storedUserId = localStorage.getItem("mastra-user-id")
    if (storedUserId) {
      setResourceId(storedUserId)
    } else {
      const newUserId = `user_${Date.now()}`
      localStorage.setItem("mastra-user-id", newUserId)
      setResourceId(newUserId)
    }

    // Set threadId
    const storedThreadId = localStorage.getItem("mastra-thread-id")
    if (storedThreadId) {
      setThreadId(storedThreadId)
    } else {
      const newThreadId = `thread_${Date.now()}`
      localStorage.setItem("mastra-thread-id", newThreadId)
      setThreadId(newThreadId)
    }

    // Load chat history for current thread
    const historyKey = `mastra-chat-history-${storedThreadId || `thread_${Date.now()}`}`
    const storedHistory = localStorage.getItem(historyKey)
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory)
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedHistory.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error("Failed to parse chat history:", error)
      }
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (threadId && messages.length > 0) {
      const historyKey = `mastra-chat-history-${threadId}`
      localStorage.setItem(historyKey, JSON.stringify(messages))
    }
  }, [messages, threadId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent, streamingToolCalls, isThinking])

  const startNewConversation = () => {
    const newThreadId = `thread_${Date.now()}`
    setThreadId(newThreadId)
    localStorage.setItem("mastra-thread-id", newThreadId)

    // Clear old chat history and start fresh
    const newMessages = [
      {
        id: "1",
        content:
          "Hello! I'm your AI assistant powered by Mastra. I can help you with various tasks including checking the weather. What would you like to know?",
        sender: "ai" as const,
        timestamp: new Date(),
      },
    ]
    setMessages(newMessages)

    // Save the new initial message to localStorage
    const historyKey = `mastra-chat-history-${newThreadId}`
    localStorage.setItem(historyKey, JSON.stringify(newMessages))
  }

  const sendMessage = async () => {
    if (!input.trim() || isStreaming || !resourceId || !threadId) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsStreaming(true)
    setIsThinking(true)
    setStreamingContent("")
    setStreamingToolCalls([])

    try {
      // Get the streaming response from our server action
      const streamableValue = await streamChatResponse(
        updatedMessages,
        resourceId,
        threadId
      )

      let accumulatedContent = ""
      let accumulatedToolCalls: any[] = []

      // Read the stream
      for await (const chunk of readStreamableValue(streamableValue)) {
        if (!chunk) {
          continue
        }

        try {
          const parsed = JSON.parse(chunk)

          switch (parsed.type) {
            case "text_chunk":
              // Hide thinking indicator when first content arrives
              if (isThinking) {
                setIsThinking(false)
              }
              accumulatedContent += parsed.content
              setStreamingContent(accumulatedContent)
              break

            case "tool_calls":
              // Hide thinking indicator when first tool call arrives
              if (isThinking) {
                setIsThinking(false)
              }
              accumulatedToolCalls = [...accumulatedToolCalls, ...parsed.toolCalls]
              setStreamingToolCalls(accumulatedToolCalls)
              break

            case "error":
              setIsThinking(false)
              const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                content: parsed.content,
                sender: "ai",
                timestamp: new Date(),
              }
              setMessages(prev => [...prev, errorMessage])
              break

            case "done":
              setIsThinking(false)
              // Finalize the streaming message
              if (accumulatedContent || accumulatedToolCalls.length > 0) {
                const finalMessage: ChatMessage = {
                  id: (Date.now() + 1).toString(),
                  content: accumulatedContent,
                  sender: "ai",
                  timestamp: new Date(),
                  toolCalls:
                    accumulatedToolCalls.length > 0 ? accumulatedToolCalls : undefined,
                }
                setMessages(prev => [...prev, finalMessage])
              }
              break
          }
        } catch (parseError) {
          // Handle non-JSON chunks gracefully
          continue
        }
      }
    } catch (error) {
      setIsThinking(false)
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}`,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsStreaming(false)
      setIsThinking(false)
      setStreamingContent("")
      setStreamingToolCalls([])
    }
  }

  return (
    <div className="flex h-[700px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
      {/* Chat Header */}
      <div className="bg-primary border-primary-200 flex flex-shrink-0 items-center gap-4 border-b p-6">
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
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Transactor AI Concierge</h3>
          <p className="text-sm font-medium text-white/90">
            Powered by Transactor • {isStreaming ? "Thinking..." : "Online now"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={startNewConversation}
          disabled={isStreaming}
          className="text-white hover:bg-white/10"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-6">
            {messages.map(message => (
              <motion.div
                key={message.id}
                className={`flex gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {message.sender === "ai" && (
                  <Avatar size="sm" className="ring-primary-100 mt-1 ring-2">
                    <AvatarFallback variant="colored">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="max-w-[85%] space-y-3">
                  {/* Tool calls display - shown first */}
                  {message.toolCalls && message.toolCalls.length > 0 && (
                    <div className="space-y-2">
                      {message.toolCalls.map(toolCall => (
                        <ToolCallDisplay key={toolCall.id} toolCall={toolCall} />
                      ))}
                    </div>
                  )}

                  {/* Text content */}
                  {message.content && (
                    <div
                      className={`rounded-2xl px-5 py-4 shadow-sm ${
                        message.sender === "user"
                          ? "bg-primary shadow-primary/20 text-white [&_*]:text-white"
                          : "border border-neutral-200 bg-neutral-50 text-neutral-900"
                      }`}
                    >
                      <div
                        className={`text-sm leading-relaxed font-medium ${message.sender === "user" ? "text-white" : ""}`}
                      >
                        {message.sender === "user" ? (
                          <p>{message.content}</p>
                        ) : (
                          <div className="prose prose-sm prose-neutral max-w-none">
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <p className="mb-2 last:mb-0">{children}</p>
                                ),
                                ul: ({ children }) => (
                                  <ul className="mb-2 pl-4 last:mb-0">{children}</ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="mb-2 pl-4 last:mb-0">{children}</ol>
                                ),
                                li: ({ children }) => (
                                  <li className="mb-1">{children}</li>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-semibold">{children}</strong>
                                ),
                                em: ({ children }) => (
                                  <em className="italic">{children}</em>
                                ),
                                code: ({ children }) => (
                                  <code className="rounded bg-neutral-200 px-1 py-0.5 font-mono text-xs">
                                    {children}
                                  </code>
                                ),
                                pre: ({ children }) => (
                                  <pre className="my-2 overflow-x-auto rounded-lg bg-neutral-100 p-3">
                                    {children}
                                  </pre>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>

                      <p
                        className={`mt-2 text-xs ${message.sender === "user" ? "text-primary-100" : "text-neutral-500"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  )}
                </div>
                {message.sender === "user" && (
                  <Avatar size="sm" className="mt-1 ring-2 ring-neutral-200">
                    <AvatarFallback variant="neutral">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}

            {/* Thinking indicator - only show when thinking and no content yet */}
            {isThinking && streamingContent === "" && streamingToolCalls.length === 0 && (
              <ThinkingIndicator />
            )}

            {/* Streaming message - show when we have content OR when not thinking */}
            {isStreaming && (streamingContent || streamingToolCalls.length > 0) && (
              <motion.div
                className="flex justify-start gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Avatar size="sm" className="ring-primary-100 mt-1 ring-2">
                  <AvatarFallback variant="colored">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[85%] space-y-3">
                  {/* Streaming tool calls - shown first */}
                  {streamingToolCalls.length > 0 && (
                    <div className="space-y-2">
                      {streamingToolCalls.map(toolCall => (
                        <ToolCallDisplay key={toolCall.id} toolCall={toolCall} />
                      ))}
                    </div>
                  )}

                  {/* Streaming text content - regular streaming without chunk animation */}
                  {streamingContent && (
                    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-neutral-900 shadow-sm">
                      <div className="text-sm leading-relaxed font-medium">
                        <div className="prose prose-sm prose-neutral max-w-none">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="mb-2 pl-4 last:mb-0">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="mb-2 pl-4 last:mb-0">{children}</ol>
                              ),
                              li: ({ children }) => <li className="mb-1">{children}</li>,
                              strong: ({ children }) => (
                                <strong className="font-semibold">{children}</strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic">{children}</em>
                              ),
                              code: ({ children }) => (
                                <code className="rounded bg-neutral-200 px-1 py-0.5 font-mono text-xs">
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="my-2 overflow-x-auto rounded-lg bg-neutral-100 p-3">
                                  {children}
                                </pre>
                              ),
                            }}
                          >
                            {streamingContent}
                          </ReactMarkdown>
                        </div>
                        <span className="animate-pulse">|</span>
                      </div>

                      <p className="mt-2 text-xs text-neutral-500">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="border-t border-neutral-200 bg-neutral-50 p-6">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything, including about the weather..."
            className="h-12 flex-1 border-neutral-300 bg-white px-4 py-3"
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            disabled={isStreaming}
          />
          <Button
            onClick={sendMessage}
            variant="rounded"
            size="xl"
            disabled={!input.trim() || isStreaming}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-neutral-500">
            Powered by Mastra with tool calling capabilities • Resource:{" "}
            {resourceId.slice(-8)} • Thread: {threadId.slice(-8)}
          </p>
          {isStreaming && (
            <Badge variant="secondary" className="text-xs">
              <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Generating...
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
