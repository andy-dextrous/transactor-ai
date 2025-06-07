/*************************************************************************/
/*  TRANSACTOR 2.0 - CONVERSATION CONTEXT MANAGEMENT
/*  AI agent memory and contextual panel state management
/*************************************************************************/

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { api } from "./_generated/api"
import type { Id } from "./_generated/dataModel"

/*************************************************************************/
/*  CONVERSATION CONTEXT QUERIES
/*************************************************************************/

export const getConversationContext = query({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    contextType: v.optional(
      v.union(
        v.literal("user_preferences"),
        v.literal("transaction_state"),
        v.literal("tool_history"),
        v.literal("learning")
      )
    ),
  },
  returns: v.array(
    v.object({
      _id: v.id("conversation_context"),
      _creationTime: v.number(),
      threadId: v.string(),
      userId: v.id("users"),
      contextType: v.union(
        v.literal("user_preferences"),
        v.literal("transaction_state"),
        v.literal("tool_history"),
        v.literal("learning")
      ),
      data: v.any(),
      importance: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
      lastUpdated: v.number(),
      expiresAt: v.optional(v.number()),
    })
  ),
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("conversation_context")
      .filter(q =>
        q.and(
          q.eq(q.field("threadId"), args.threadId),
          q.eq(q.field("userId"), args.userId)
        )
      )

    if (args.contextType) {
      queryBuilder = queryBuilder.filter(q =>
        q.eq(q.field("contextType"), args.contextType)
      )
    }

    return await queryBuilder.collect()
  },
})

export const getActiveContext = query({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
  },
  returns: v.object({
    preferences: v.any(),
    transactionState: v.any(),
    toolHistory: v.any(),
    learning: v.any(),
  }),
  handler: async (ctx, args) => {
    const contexts = await ctx.db
      .query("conversation_context")
      .filter(q =>
        q.and(
          q.eq(q.field("threadId"), args.threadId),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .collect()

    // Organize contexts by type for easy access
    const organizedContext = {
      preferences: null as any,
      transactionState: null as any,
      toolHistory: null as any,
      learning: null as any,
    }

    contexts.forEach(context => {
      switch (context.contextType) {
        case "user_preferences":
          organizedContext.preferences = context.data.preferences
          break
        case "transaction_state":
          organizedContext.transactionState = context.data.transactionState
          break
        case "tool_history":
          organizedContext.toolHistory = context.data.toolUsage
          break
        case "learning":
          organizedContext.learning = context.data
          break
      }
    })

    return organizedContext
  },
})

export const getPanelState = query({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
  },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("conversation_panels"),
      _creationTime: v.number(),
      threadId: v.string(),
      userId: v.id("users"),
      currentContext: v.any(),
      panelComponents: v.any(),
      lastUpdated: v.number(),
      autoUpdated: v.boolean(),
    })
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversation_panels")
      .filter(q =>
        q.and(
          q.eq(q.field("threadId"), args.threadId),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .unique()
  },
})

export const getUserPreferences = query({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    const context = await ctx.db
      .query("conversation_context")
      .filter(q =>
        q.and(
          q.eq(q.field("threadId"), args.threadId),
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("contextType"), "user_preferences")
        )
      )
      .unique()

    return context?.data.preferences || null
  },
})

/*************************************************************************/
/*  CONVERSATION CONTEXT MUTATIONS
/*************************************************************************/

export const saveConversationContext = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    contextType: v.union(
      v.literal("user_preferences"),
      v.literal("transaction_state"),
      v.literal("tool_history"),
      v.literal("learning")
    ),
    data: v.object({
      preferences: v.optional(
        v.object({
          propertyType: v.optional(v.string()),
          budget: v.optional(
            v.object({
              min: v.number(),
              max: v.number(),
            })
          ),
          locations: v.optional(v.array(v.string())),
          priorities: v.optional(v.array(v.string())),
        })
      ),
      transactionState: v.optional(
        v.object({
          phase: v.string(),
          activeWorkflows: v.array(v.string()),
          pendingActions: v.array(v.string()),
          keyDates: v.any(),
        })
      ),
      toolUsage: v.optional(
        v.object({
          frequentTools: v.array(v.string()),
          lastUsed: v.any(),
          preferences: v.any(),
        })
      ),
    }),
    importance: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
    expiresAt: v.optional(v.number()),
  },
  returns: v.object({
    contextId: v.id("conversation_context"),
    success: v.boolean(),
    action: v.union(v.literal("created"), v.literal("updated")),
  }),
  handler: async (ctx, args) => {
    // Check if context already exists
    const existingContext = await ctx.db
      .query("conversation_context")
      .filter(q =>
        q.and(
          q.eq(q.field("threadId"), args.threadId),
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("contextType"), args.contextType)
        )
      )
      .unique()

    if (existingContext) {
      // Update existing context
      await ctx.db.patch(existingContext._id, {
        data: args.data,
        importance: args.importance || "medium",
        lastUpdated: Date.now(),
        expiresAt: args.expiresAt,
      })

      return {
        contextId: existingContext._id,
        success: true,
        action: "updated" as const,
      }
    } else {
      // Create new context
      const contextId = await ctx.db.insert("conversation_context", {
        threadId: args.threadId,
        userId: args.userId,
        contextType: args.contextType,
        data: args.data,
        importance: args.importance || "medium",
        lastUpdated: Date.now(),
        expiresAt: args.expiresAt,
      })

      return {
        contextId,
        success: true,
        action: "created" as const,
      }
    }
  },
})

export const updateUserPreferences = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    preferences: v.object({
      propertyType: v.optional(v.string()),
      budget: v.optional(
        v.object({
          min: v.number(),
          max: v.number(),
        })
      ),
      locations: v.optional(v.array(v.string())),
      priorities: v.optional(v.array(v.string())),
    }),
  },
  returns: v.object({
    contextId: v.id("conversation_context"),
    success: v.boolean(),
    action: v.union(v.literal("created"), v.literal("updated")),
  }),
  handler: async (
    ctx,
    args
  ): Promise<{
    contextId: Id<"conversation_context">
    success: boolean
    action: "created" | "updated"
  }> => {
    return await ctx.runMutation(api.context.saveConversationContext, {
      threadId: args.threadId,
      userId: args.userId,
      contextType: "user_preferences",
      data: { preferences: args.preferences },
      importance: "high",
    })
  },
})

export const updateTransactionState = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    transactionState: v.object({
      phase: v.string(),
      activeWorkflows: v.array(v.string()),
      pendingActions: v.array(v.string()),
      keyDates: v.any(),
    }),
  },
  returns: v.object({
    contextId: v.id("conversation_context"),
    success: v.boolean(),
    action: v.union(v.literal("created"), v.literal("updated")),
  }),
  handler: async (
    ctx,
    args
  ): Promise<{
    contextId: Id<"conversation_context">
    success: boolean
    action: "created" | "updated"
  }> => {
    return await ctx.runMutation(api.context.saveConversationContext, {
      threadId: args.threadId,
      userId: args.userId,
      contextType: "transaction_state",
      data: { transactionState: args.transactionState },
      importance: "high",
    })
  },
})

export const recordToolUsage = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    toolName: v.string(),
    executionData: v.any(),
  },
  returns: v.object({
    contextId: v.id("conversation_context"),
    success: v.boolean(),
    action: v.union(v.literal("created"), v.literal("updated")),
  }),
  handler: async (
    ctx,
    args
  ): Promise<{
    contextId: Id<"conversation_context">
    success: boolean
    action: "created" | "updated"
  }> => {
    // Get existing tool usage context
    const existingContext = await ctx.db
      .query("conversation_context")
      .filter(q =>
        q.and(
          q.eq(q.field("threadId"), args.threadId),
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("contextType"), "tool_history")
        )
      )
      .unique()

    let toolUsage = {
      frequentTools: [] as string[],
      lastUsed: {} as Record<string, number>,
      preferences: {} as Record<string, any>,
    }

    if (existingContext) {
      toolUsage = { ...existingContext.data.toolUsage, ...toolUsage }
    }

    // Update tool usage statistics
    toolUsage.lastUsed[args.toolName] = Date.now()

    // Update frequent tools list
    if (!toolUsage.frequentTools.includes(args.toolName)) {
      toolUsage.frequentTools.push(args.toolName)
    }

    // Keep only top 10 most frequent tools
    if (toolUsage.frequentTools.length > 10) {
      toolUsage.frequentTools = toolUsage.frequentTools.slice(-10)
    }

    return await ctx.runMutation(api.context.saveConversationContext, {
      threadId: args.threadId,
      userId: args.userId,
      contextType: "tool_history",
      data: { toolUsage },
      importance: "low",
    })
  },
})

/*************************************************************************/
/*  CONTEXTUAL PANEL STATE MANAGEMENT
/*************************************************************************/

export const updatePanelState = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    currentContext: v.object({
      activeProperty: v.optional(
        v.object({
          id: v.string(),
          address: v.string(),
          price: v.number(),
          type: v.union(
            v.literal("target"),
            v.literal("current"),
            v.literal("comparison")
          ),
        })
      ),
      activeTransaction: v.optional(
        v.object({
          id: v.id("transactions"),
          phase: v.union(
            v.literal("search"),
            v.literal("contract"),
            v.literal("finance"),
            v.literal("settlement"),
            v.literal("ownership")
          ),
          priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
        })
      ),
      activeCalculations: v.array(
        v.object({
          toolName: v.string(),
          executionId: v.id("tool_executions"),
          priority: v.number(),
          displayType: v.union(v.literal("summary"), v.literal("detailed")),
        })
      ),
      pendingActions: v.array(
        v.object({
          actionType: v.union(
            v.literal("upload_document"),
            v.literal("contact_provider"),
            v.literal("approve_milestone"),
            v.literal("schedule_inspection")
          ),
          priority: v.union(
            v.literal("urgent"),
            v.literal("important"),
            v.literal("normal")
          ),
          dueDate: v.optional(v.number()),
          description: v.string(),
        })
      ),
    }),
    panelComponents: v.array(
      v.object({
        componentType: v.union(
          v.literal("PropertySummary"),
          v.literal("TransactionProgress"),
          v.literal("FinancialSummary"),
          v.literal("QuickActions"),
          v.literal("DocumentQuickAccess"),
          v.literal("CalculationResults"),
          v.literal("MilestoneAlerts"),
          v.literal("MarketInsights"),
          v.literal("CommunicationHub")
        ),
        priority: v.number(),
        isVisible: v.boolean(),
        config: v.any(),
      })
    ),
    autoUpdated: v.optional(v.boolean()),
  },
  returns: v.object({
    panelId: v.id("conversation_panels"),
    success: v.boolean(),
    action: v.union(v.literal("created"), v.literal("updated")),
  }),
  handler: async (ctx, args) => {
    const existingPanel = await ctx.db
      .query("conversation_panels")
      .filter(q =>
        q.and(
          q.eq(q.field("threadId"), args.threadId),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .unique()

    if (existingPanel) {
      await ctx.db.patch(existingPanel._id, {
        currentContext: args.currentContext,
        panelComponents: args.panelComponents,
        lastUpdated: Date.now(),
        autoUpdated: args.autoUpdated || true,
      })

      return { panelId: existingPanel._id, success: true, action: "updated" as const }
    } else {
      const panelId = await ctx.db.insert("conversation_panels", {
        threadId: args.threadId,
        userId: args.userId,
        currentContext: args.currentContext,
        panelComponents: args.panelComponents,
        lastUpdated: Date.now(),
        autoUpdated: args.autoUpdated || true,
      })

      return { panelId, success: true, action: "created" as const }
    }
  },
})

export const addPendingAction = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    action: v.object({
      actionType: v.union(
        v.literal("upload_document"),
        v.literal("contact_provider"),
        v.literal("approve_milestone"),
        v.literal("schedule_inspection")
      ),
      priority: v.union(v.literal("urgent"), v.literal("important"), v.literal("normal")),
      dueDate: v.optional(v.number()),
      description: v.string(),
    }),
  },
  returns: v.object({
    panelId: v.id("conversation_panels"),
    success: v.boolean(),
  }),
  handler: async (ctx, args) => {
    const panel = await ctx.db
      .query("conversation_panels")
      .filter(q =>
        q.and(
          q.eq(q.field("threadId"), args.threadId),
          q.eq(q.field("userId"), args.userId)
        )
      )
      .unique()

    if (!panel) {
      throw new Error("Panel not found for user")
    }

    const updatedContext = {
      ...panel.currentContext,
      pendingActions: [...panel.currentContext.pendingActions, args.action],
    }

    await ctx.db.patch(panel._id, {
      currentContext: updatedContext,
      lastUpdated: Date.now(),
      autoUpdated: true,
    })

    return { panelId: panel._id, success: true }
  },
})

export const clearExpiredContext = mutation({
  args: {},
  returns: v.object({
    deletedCount: v.number(),
    success: v.boolean(),
  }),
  handler: async ctx => {
    const currentTime = Date.now()
    const expiredContexts = await ctx.db
      .query("conversation_context")
      .filter(q => q.lt(q.field("expiresAt"), currentTime))
      .collect()

    for (const context of expiredContexts) {
      await ctx.db.delete(context._id)
    }

    return {
      deletedCount: expiredContexts.length,
      success: true,
    }
  },
})
