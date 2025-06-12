/*************************************************************************/
/*  MESSAGE LIST COMPONENT
/*************************************************************************/

import { toUIMessages } from "@convex-dev/agent/react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User } from "lucide-react"

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const uiMessages = toUIMessages(messages)

  return (
    <div className="space-y-6">
      {uiMessages.map(message => (
        <div
          key={message.key}
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
              {typeof message.content === "string" ? (
                <p>{message.content}</p>
              ) : (
                message.content
              )}
            </div>
            <p
              className={`mt-2 text-xs ${message.role === "user" ? "text-primary-100" : "text-neutral-500"}`}
            >
              {new Date().toLocaleTimeString([], {
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
    </div>
  )
}
