import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"

/*************************************************************************/
/*  CHAT HOOK
/*************************************************************************/

export function useChat(threadId: string | null) {
  const createThread = useMutation(api.messages.createThread)
  const createStream = useMutation(api.streaming.createChatStream)

  const sendMessage = async (prompt: string) => {
    let currentThreadId = threadId

    // Create thread if none exists
    if (!currentThreadId) {
      const result = await createThread({})
      currentThreadId = result.threadId
    }

    // Create streaming response
    const { streamId } = await createStream({
      threadId: currentThreadId,
      prompt,
    })

    return { threadId: currentThreadId, streamId }
  }

  return {
    sendMessage,
  }
}
