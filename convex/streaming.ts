import { mutation, internalAction } from "./_generated/server"
import { v } from "convex/values"
import { PersistentTextStreaming } from "@convex-dev/persistent-text-streaming"
import { components } from "./_generated/api"
import { internal } from "./_generated/api"
import chatAgent from "./agent"

const persistentTextStreaming = new PersistentTextStreaming(
  components.persistentTextStreaming
)

/*************************************************************************/
/*  STREAM CREATION
/*************************************************************************/

export const createChatStream = mutation({
  args: {
    threadId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, { threadId, prompt }) => {
    const streamId = await persistentTextStreaming.createStream(ctx)

    // Schedule streaming response
    await ctx.scheduler.runAfter(0, internal.streaming.generateStreamingResponse, {
      streamId,
      threadId,
      prompt,
    })

    return { streamId }
  },
})

/*************************************************************************/
/*  INTERNAL STREAMING ACTION
/*************************************************************************/

export const generateStreamingResponse = internalAction({
  args: {
    streamId: v.string(),
    threadId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, { streamId, threadId, prompt }) => {
    const { thread } = await chatAgent.continueThread(ctx, { threadId })

    // Generate response (will implement streaming later)
    const result = await thread.generateText({
      prompt,
    })

    // TODO: Integrate with persistent text streaming properly
    return { success: true, text: result.text }
  },
})
