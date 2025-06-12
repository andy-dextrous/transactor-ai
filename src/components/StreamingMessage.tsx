import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot } from "lucide-react"

/*************************************************************************/
/*  STREAMING MESSAGE COMPONENT
/*************************************************************************/

interface StreamingMessageProps {
  streamId: string
  threadId: string
}

export function StreamingMessage({ streamId, threadId }: StreamingMessageProps) {
  return (
    <div className="animate-fade-in flex justify-start gap-4">
      <Avatar size="sm" className="ring-primary-100 mt-1 ring-2">
        <AvatarFallback variant="colored">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[85%] rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-neutral-900 shadow-sm">
        <div className="text-sm leading-relaxed font-medium">
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
        <p className="mt-2 text-xs text-neutral-500">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}
