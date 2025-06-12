import { mutation, query, internalMutation, internalQuery } from "./_generated/server"
import { v } from "convex/values"
import { paginationOptsValidator, PaginationResult } from "convex/server"

/*************************************************************************/
/*  CONVERSATION MANAGEMENT
/*************************************************************************/

export const createConversation = mutation({
  args: {
    title: v.optional(v.string()),
  },
  returns: v.id("conversations"),
  handler: async (ctx, args) => {
    const conversationId = await ctx.db.insert("conversations", {
      title: args.title || "New Conversation",
      lastMessageTime: Date.now(),
      status: "active",
    })

    return conversationId
  },
})

export const listConversations = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { paginationOpts }) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_last_message")
      .order("desc")
      .paginate(paginationOpts)
  },
})

export const updateConversationTitle = mutation({
  args: {
    conversationId: v.id("conversations"),
    title: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, { conversationId, title }) => {
    await ctx.db.patch(conversationId, { title })
    return null
  },
})

/*************************************************************************/
/*  MESSAGE MANAGEMENT
/*************************************************************************/

export const addMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    toolCalls: v.optional(
      v.array(
        v.object({
          id: v.string(),
          type: v.literal("function"),
          function: v.object({
            name: v.string(),
            arguments: v.string(),
          }),
        })
      )
    ),
    toolResults: v.optional(
      v.array(
        v.object({
          toolCallId: v.string(),
          result: v.string(),
        })
      )
    ),
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    // Update conversation last message time
    await ctx.db.patch(args.conversationId, {
      lastMessageTime: Date.now(),
    })

    // Insert the message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      role: args.role,
      content: args.content,
      toolCalls: args.toolCalls,
      toolResults: args.toolResults,
    })

    return messageId
  },
})

export const listMessages = query({
  args: {
    conversationId: v.id("conversations"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { conversationId, paginationOpts }) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_conversation", q => q.eq("conversationId", conversationId))
      .order("asc")
      .paginate(paginationOpts)
  },
})

export const getConversation = query({
  args: {
    conversationId: v.id("conversations"),
  },
  returns: v.union(
    v.object({
      _id: v.id("conversations"),
      _creationTime: v.number(),
      title: v.string(),
      lastMessageTime: v.number(),
      status: v.union(v.literal("active"), v.literal("archived")),
    }),
    v.null()
  ),
  handler: async (ctx, { conversationId }) => {
    return await ctx.db.get(conversationId)
  },
})

/*************************************************************************/
/*  INTERNAL FUNCTIONS FOR AI AGENT
/*************************************************************************/

export const addMessageInternal = internalMutation({
  args: {
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    toolCalls: v.optional(
      v.array(
        v.object({
          id: v.string(),
          type: v.literal("function"),
          function: v.object({
            name: v.string(),
            arguments: v.string(),
          }),
        })
      )
    ),
    toolResults: v.optional(
      v.array(
        v.object({
          toolCallId: v.string(),
          result: v.string(),
        })
      )
    ),
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    // Update conversation last message time
    await ctx.db.patch(args.conversationId, {
      lastMessageTime: Date.now(),
    })

    // Insert the message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      role: args.role,
      content: args.content,
      toolCalls: args.toolCalls,
      toolResults: args.toolResults,
    })

    return messageId
  },
})

export const createConversationInternal = internalMutation({
  args: {
    title: v.optional(v.string()),
  },
  returns: v.id("conversations"),
  handler: async (ctx, args) => {
    const conversationId = await ctx.db.insert("conversations", {
      title: args.title || "New Conversation",
      lastMessageTime: Date.now(),
      status: "active",
    })

    return conversationId
  },
})

export const listMessagesInternal = internalQuery({
  args: {
    conversationId: v.id("conversations"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { conversationId, limit = 20 }) => {
    // Get messages for conversation without pagination
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", q => q.eq("conversationId", conversationId))
      .order("asc")
      .take(limit)

    return { page: messages, isDone: true, continueCursor: "" }
  },
})
