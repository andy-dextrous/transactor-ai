import { mutation, query, action } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"
import { components } from "./_generated/api"
import { v } from "convex/values"
import chatAgent from "./agent"

/*************************************************************************/
/*  THREAD CREATION
/*************************************************************************/

export const createThread = mutation({
  args: {},
  handler: async (ctx): Promise<{ threadId: string }> => {
    console.log("Creating new thread...")
    const { threadId } = await chatAgent.createThread(ctx, {})
    console.log("Thread created:", threadId)
    return { threadId }
  },
})

/*************************************************************************/
/*  MESSAGE LISTING
/*************************************************************************/

export const listThreadMessages = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { threadId, paginationOpts }) => {
    console.log("Listing messages for thread:", threadId)
    const result = await chatAgent.listMessages(ctx, {
      threadId,
      paginationOpts,
    })
    console.log("Messages found:", result.page?.length || 0)
    return result
  },
})

/*************************************************************************/
/*  THREAD LISTING (NO USER SCOPING)
/*************************************************************************/

export const listAllThreads = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { paginationOpts }) => {
    // For now, return empty results since we'll create threads on demand
    return {
      results: [],
      cursor: null,
      isDone: true,
    }
  },
})

/*************************************************************************/
/*  GENERATE TEXT RESPONSE
/*************************************************************************/

export const generateResponse = action({
  args: {
    threadId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, { threadId, prompt }): Promise<string> => {
    console.log("Generating response for thread:", threadId, "with prompt:", prompt)

    try {
      const { thread } = await chatAgent.continueThread(ctx, { threadId })
      console.log("Thread continued successfully")

      const result = await thread.generateText({ prompt })
      console.log("Generated text response:", result.text)

      return result.text
    } catch (error) {
      console.error("Error in generateResponse:", error)
      throw error
    }
  },
})
