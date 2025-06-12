/*************************************************************************/
/*  MESSAGE LIST COMPONENT
/*************************************************************************/

interface Message {
  _id: string
  content: string
  role: "user" | "assistant"
  _creationTime: number
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-gray-500">
        Start a conversation by asking about properties, settlements, or market data...
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      {messages.map(message => (
        <div
          key={message._id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-3 ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "border bg-gray-100 text-gray-900"
            }`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
            <div
              className={`mt-2 text-xs ${
                message.role === "user" ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {new Date(message._creationTime).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
