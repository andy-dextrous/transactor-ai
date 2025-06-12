"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@/hooks/useChat"
import { MessageList } from "@/components/MessageList"
import { StreamingMessage } from "@/components/StreamingMessage"

/*************************************************************************/
/*  MAIN CHAT PAGE
/*************************************************************************/

export default function ChatPage() {
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null)
  const [streamId, setStreamId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [localMessages, setLocalMessages] = useState<any[]>([])

  const { sendMessage } = useChat(currentThreadId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [localMessages, isStreaming])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isStreaming) return

    const userMessage = {
      _id: `user-${Date.now()}`,
      content: inputValue.trim(),
      role: "user" as const,
      _creationTime: Date.now(),
    }

    // Add user message immediately
    setLocalMessages(prev => [...prev, userMessage])

    const messageText = inputValue.trim()
    setInputValue("")
    setIsStreaming(true)

    try {
      const result = await sendMessage(messageText)
      setCurrentThreadId(result.threadId)
      setStreamId(result.streamId)

      // Simulate AI response for now
      setTimeout(() => {
        const aiMessage = {
          _id: `ai-${Date.now()}`,
          content: `I received your message: "${messageText}". I'm a property concierge assistant with access to real Australian property data. I can help you search properties, check settlement status, analyze documents, and get market insights. Try asking me about properties in Melbourne CBD or Bondi Beach!`,
          role: "assistant" as const,
          _creationTime: Date.now(),
        }
        setLocalMessages(prev => [...prev, aiMessage])
        setIsStreaming(false)
        setStreamId(null)
      }, 2000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsStreaming(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white shadow-sm">
        <div className="border-b p-6">
          <h1 className="text-xl font-semibold text-gray-900">Property Concierge AI</h1>
          <p className="mt-1 text-sm text-gray-600">Your Australian property assistant</p>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            <div
              className={`cursor-pointer rounded-lg border border-dashed border-gray-300 p-3 hover:bg-gray-50 ${
                !currentThreadId ? "border-blue-200 bg-blue-50" : ""
              }`}
              onClick={() => {
                setCurrentThreadId(null)
                setLocalMessages([])
                setStreamId(null)
                setIsStreaming(false)
              }}
            >
              <div className="font-medium text-gray-900">+ New Conversation</div>
              <div className="text-xs text-gray-500">
                Start fresh chat about properties
              </div>
            </div>

            {currentThreadId && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="font-medium text-gray-900">Current Chat</div>
                <div className="text-xs text-gray-500">
                  Thread: {currentThreadId.slice(0, 8)}...
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-medium text-gray-900">Try asking about:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Properties in Melbourne CBD</li>
              <li>• Settlement status updates</li>
              <li>• Market insights for Bondi Beach</li>
              <li>• Document analysis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b bg-white px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">
            {currentThreadId ? "Property Chat" : "Welcome"}
          </h2>
          <p className="text-sm text-gray-600">
            {currentThreadId
              ? "Ask about properties, settlements, or market data"
              : "Start a conversation to explore Australian property data"}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            {localMessages.length > 0 ? (
              <>
                <MessageList messages={localMessages} />
                {isStreaming && streamId && (
                  <div className="mt-4">
                    <StreamingMessage streamId={streamId} isVisible={true} />
                  </div>
                )}
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto max-w-md">
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Property Concierge AI
                  </h3>
                  <p className="mb-6 text-gray-600">
                    I'm your Australian property assistant with access to real property
                    data, settlement tracking, and market insights. How can I help you
                    today?
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <button
                      className="rounded-lg border p-3 text-left hover:bg-gray-50"
                      onClick={() =>
                        setInputValue(
                          "Show me properties in Melbourne CBD under $900,000"
                        )
                      }
                    >
                      🏢 Search Properties
                    </button>
                    <button
                      className="rounded-lg border p-3 text-left hover:bg-gray-50"
                      onClick={() =>
                        setInputValue("Check settlement status for all current deals")
                      }
                    >
                      📋 Settlement Status
                    </button>
                    <button
                      className="rounded-lg border p-3 text-left hover:bg-gray-50"
                      onClick={() => setInputValue("Get market insights for Bondi Beach")}
                    >
                      📊 Market Data
                    </button>
                    <button
                      className="rounded-lg border p-3 text-left hover:bg-gray-50"
                      onClick={() =>
                        setInputValue("Analyze documents for settlement settle_001")
                      }
                    >
                      📄 Document Analysis
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-white p-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex gap-3">
              <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about property settlements, searches, market data..."
                className="flex-1 resize-none rounded-lg border p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows={2}
                disabled={isStreaming}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isStreaming}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isStreaming ? "..." : "Send"}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
