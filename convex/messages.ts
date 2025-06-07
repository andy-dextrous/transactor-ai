import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("messages"),
      _creationTime: v.number(),
      body: v.string(),
      author: v.string(),
      threadId: v.optional(v.string()),
      userId: v.optional(v.id("users")),
      createdAt: v.number(),
    })
  ),
  handler: async ctx => {
    // Grab the most recent messages.
    const messages = await ctx.db.query("messages").order("desc").take(100)
    return messages
  },
})

export const send = mutation({
  args: {
    body: v.string(),
    author: v.string(),
    threadId: v.optional(v.string()),
    userId: v.optional(v.id("users")),
  },
  returns: v.id("messages"),
  handler: async (ctx, { body, author, threadId, userId }) => {
    // Send a new message.
    const messageId = await ctx.db.insert("messages", {
      body,
      author,
      threadId,
      userId,
      createdAt: Date.now(),
    })
    return messageId
  },
})
