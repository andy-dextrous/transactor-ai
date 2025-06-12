import { mutation } from "./_generated/server"
import { v } from "convex/values"
import { internal } from "./_generated/api"

/*************************************************************************/
/*  PUBLIC CHAT MUTATIONS
/*************************************************************************/

export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
  },
  returns: v.object({
    messageId: v.id("messages"),
    conversationId: v.id("conversations"),
  }),
  handler: async (ctx, { conversationId, content }) => {
    // Add user message to conversation
    const messageId = await ctx.runMutation(internal.conversations.addMessageInternal, {
      conversationId,
      role: "user",
      content,
    })

    // Schedule AI response processing
    await ctx.scheduler.runAfter(0, internal.chatActions.processMessage, {
      conversationId,
      userMessage: content,
    })

    return {
      messageId,
      conversationId,
    }
  },
})

export const startConversation = mutation({
  args: {
    initialMessage: v.string(),
    title: v.optional(v.string()),
  },
  returns: v.object({
    conversationId: v.id("conversations"),
    messageId: v.id("messages"),
  }),
  handler: async (ctx, { initialMessage, title }) => {
    // Create new conversation
    const conversationId = await ctx.runMutation(
      internal.conversations.createConversationInternal,
      {
        title:
          title ||
          initialMessage.slice(0, 50) + (initialMessage.length > 50 ? "..." : ""),
      }
    )

    // Add user message
    const messageId = await ctx.runMutation(internal.conversations.addMessageInternal, {
      conversationId,
      role: "user",
      content: initialMessage,
    })

    // Schedule AI response processing
    await ctx.scheduler.runAfter(0, internal.chatActions.processMessage, {
      conversationId,
      userMessage: initialMessage,
    })

    return {
      conversationId,
      messageId,
    }
  },
})
