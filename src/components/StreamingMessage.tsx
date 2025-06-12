import { useState, useEffect } from "react"

/*************************************************************************/
/*  STREAMING MESSAGE COMPONENT
/*************************************************************************/

interface StreamingMessageProps {
  streamId: string
  isVisible: boolean
}

export function StreamingMessage({ streamId, isVisible }: StreamingMessageProps) {
  const [text, setText] = useState("")
  const [isStreaming, setIsStreaming] = useState(true)

  useEffect(() => {
    if (!isVisible || !streamId) return

    // For now, simulate streaming with a simple timer
    // TODO: Replace with actual streaming from Convex
    let currentText = ""
    const simulatedResponse = "I'm processing your request..."

    const streamingInterval = setInterval(() => {
      if (currentText.length < simulatedResponse.length) {
        currentText += simulatedResponse[currentText.length]
        setText(currentText)
      } else {
        setIsStreaming(false)
        clearInterval(streamingInterval)
      }
    }, 100)

    return () => clearInterval(streamingInterval)
  }, [streamId, isVisible])

  if (!isVisible) return null

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-lg border bg-gray-100 px-4 py-3 text-gray-900">
        <div className="whitespace-pre-wrap">{text}</div>
        {isStreaming && (
          <div className="mt-2 flex items-center">
            <div className="flex space-x-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-100"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-200"></div>
            </div>
            <span className="ml-2 text-xs text-gray-500">AI is thinking...</span>
          </div>
        )}
      </div>
    </div>
  )
}
