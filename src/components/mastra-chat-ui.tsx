"use client"

import { useState, useEffect, useRef } from "react"
import { readStreamableValue } from "ai/rsc"
import ReactMarkdown from "react-markdown"
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
import { Send, Bot, User, Sparkles, ChevronDown, ChevronRight } from "lucide-react"
import { streamChatResponse, type ChatMessage } from "@/app/mastra-test/chat-action"

/*************************************************************************/
/*  THINKING INDICATOR COMPONENT
/*************************************************************************/

function ThinkingIndicator() {
  return (
    <div className="animate-fade-in flex justify-start gap-4">
      <Avatar size="sm" className="ring-primary-100 mt-1 ring-2">
        <AvatarFallback variant="colored">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[85%]">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-neutral-900 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex space-x-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400"></div>
            </div>
            <span className="text-sm font-medium text-neutral-600">Thinking...</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/*************************************************************************/
/*  TOOL CALL DISPLAY COMPONENT
/*************************************************************************/

function ToolCallDisplay({ toolCall }: { toolCall: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
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
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-neutral-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-neutral-500" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
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
        </div>
      </CollapsibleContent>
    </Collapsible>
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

  // Generate unique IDs for user sessions
  const [resourceId] = useState(() => `user_${Date.now()}`)
  const [threadId] = useState(() => `thread_${Date.now()}`)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingContent, streamingToolCalls, isThinking])

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return

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
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-6">
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
              </div>
            ))}

            {/* Thinking indicator - only show when thinking and no content yet */}
            {isThinking && streamingContent === "" && streamingToolCalls.length === 0 && (
              <ThinkingIndicator />
            )}

            {/* Streaming message - show when we have content OR when not thinking */}
            {isStreaming && (streamingContent || streamingToolCalls.length > 0) && (
              <div className="animate-fade-in flex justify-start gap-4">
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

                  {/* Streaming text content */}
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
              </div>
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
