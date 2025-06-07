/*************************************************************************/
/*  TRANSACTOR 2.0 - TOOL EXECUTION TRACKING
/*  AI agent tool lifecycle and execution history management
/*************************************************************************/

import { Id } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

/*************************************************************************/
/*  TOOL EXECUTION QUERIES
/*************************************************************************/

export const getToolExecution = query({
  args: { executionId: v.id("tool_executions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.executionId)
  },
})

export const getToolExecutionsByThread = query({
  args: {
    threadId: v.string(),
    limit: v.optional(v.number()),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("running"),
        v.literal("completed"),
        v.literal("failed")
      )
    ),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("tool_executions")
      .withIndex("by_thread", q => q.eq("threadId", args.threadId))
      .order("desc")

    if (args.status) {
      queryBuilder = queryBuilder.filter(q => q.eq(q.field("status"), args.status))
    }

    if (args.limit) {
      return await queryBuilder.take(args.limit)
    }

    return await queryBuilder.collect()
  },
})

export const getToolExecutionsByUser = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
    toolName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("tool_executions")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .order("desc") as any

    if (args.toolName) {
      queryBuilder = queryBuilder.filter((q: any) =>
        q.eq(q.field("toolName"), args.toolName)
      )
    }

    if (args.limit) {
      queryBuilder = queryBuilder.take(args.limit)
    }

    return await queryBuilder.collect()
  },
})

export const getRunningExecutions = query({
  args: {},
  handler: async ctx => {
    return await ctx.db
      .query("tool_executions")
      .withIndex("by_status", q => q.eq("status", "running"))
      .collect()
  },
})

export const getToolStats = query({
  args: {
    userId: v.optional(v.id("users")),
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const days = args.days || 30
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000

    let executions

    if (args.userId) {
      executions = await ctx.db
        .query("tool_executions")
        .withIndex("by_user", q => q.eq("userId", args.userId as Id<"users">))
        .filter(q => q.gte(q.field("createdAt"), cutoffTime))
        .collect()
    } else {
      executions = await ctx.db
        .query("tool_executions")
        .filter(q => q.gte(q.field("createdAt"), cutoffTime))
        .collect()
    }

    const stats = {
      total: executions.length,
      byStatus: {} as Record<string, number>,
      byTool: {} as Record<string, number>,
      averageExecutionTime: 0,
      successRate: 0,
      mostUsedTool: "",
      fastestTool: "",
      slowestTool: "",
    }

    let totalExecutionTime = 0
    let completedExecutions = 0
    let successfulExecutions = 0

    const toolTimes: Record<string, number[]> = {}

    executions.forEach(execution => {
      // Count by status
      const status = execution.status || "unknown"
      stats.byStatus[status] = (stats.byStatus[status] || 0) + 1

      // Count by tool
      stats.byTool[execution.toolName] = (stats.byTool[execution.toolName] || 0) + 1

      // Calculate execution times for completed tools
      if (execution.status === "completed" && execution.completedAt) {
        const executionTime = execution.completedAt - execution.createdAt
        totalExecutionTime += executionTime
        completedExecutions++

        // Track tool-specific times
        if (!toolTimes[execution.toolName]) {
          toolTimes[execution.toolName] = []
        }
        toolTimes[execution.toolName].push(executionTime)

        if (execution.result && !execution.result.error) {
          successfulExecutions++
        }
      }
    })

    // Calculate averages
    stats.averageExecutionTime =
      completedExecutions > 0 ? Math.round(totalExecutionTime / completedExecutions) : 0

    stats.successRate =
      completedExecutions > 0
        ? Math.round((successfulExecutions / completedExecutions) * 100)
        : 0

    // Find most used tool
    let maxUsage = 0
    Object.entries(stats.byTool).forEach(([tool, count]) => {
      if (count > maxUsage) {
        maxUsage = count
        stats.mostUsedTool = tool
      }
    })

    // Find fastest and slowest tools
    let fastestTime = Infinity
    let slowestTime = 0

    Object.entries(toolTimes).forEach(([tool, times]) => {
      const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length

      if (avgTime < fastestTime) {
        fastestTime = avgTime
        stats.fastestTool = tool
      }

      if (avgTime > slowestTime) {
        slowestTime = avgTime
        stats.slowestTool = tool
      }
    })

    return stats
  },
})

/*************************************************************************/
/*  TOOL EXECUTION MUTATIONS
/*************************************************************************/

export const createToolExecution = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    toolName: v.string(),
    toolConfig: v.any(),
    input: v.any(),
    context: v.optional(
      v.object({
        propertyId: v.optional(v.id("properties")),
        transactionId: v.optional(v.id("transactions")),
        agentState: v.optional(v.any()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const executionId = await ctx.db.insert("tool_executions", {
      threadId: args.threadId,
      messageId: "temp-message-id",
      userId: args.userId,
      toolName: args.toolName,
      parameters: args.input,
      toolConfig: args.toolConfig,
      input: args.input,
      context: args.context || {},
      status: "pending",
      executionTime: 0,
      result: {
        success: false,
      },
      createdAt: Date.now(),
    })

    return { executionId, success: true }
  },
})

export const startToolExecution = mutation({
  args: {
    executionId: v.id("tool_executions"),
    agentState: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const execution = await ctx.db.get(args.executionId)
    if (!execution) {
      throw new Error(`Tool execution ${args.executionId} not found`)
    }

    if (execution.status !== "pending") {
      throw new Error(`Tool execution ${args.executionId} is not in pending state`)
    }

    await ctx.db.patch(args.executionId, {
      status: "running",
      ...(args.agentState && {
        context: { ...execution.context, agentState: args.agentState },
      }),
    })

    return { success: true }
  },
})

export const completeToolExecution = mutation({
  args: {
    executionId: v.id("tool_executions"),
    result: v.any(),
    metrics: v.optional(
      v.object({
        executionTime: v.number(),
        tokensUsed: v.optional(v.number()),
        apiCalls: v.optional(v.number()),
        cacheHits: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const execution = await ctx.db.get(args.executionId)
    if (!execution) {
      throw new Error(`Tool execution ${args.executionId} not found`)
    }

    if (execution.status !== "running") {
      throw new Error(`Tool execution ${args.executionId} is not running`)
    }

    await ctx.db.patch(args.executionId, {
      status: "completed",
      result: args.result,
      completedAt: Date.now(),
    })

    return { success: true }
  },
})

export const failToolExecution = mutation({
  args: {
    executionId: v.id("tool_executions"),
    error: v.object({
      message: v.string(),
      code: v.optional(v.string()),
      details: v.optional(v.any()),
    }),
  },
  handler: async (ctx, args) => {
    const execution = await ctx.db.get(args.executionId)
    if (!execution) {
      throw new Error(`Tool execution ${args.executionId} not found`)
    }

    await ctx.db.patch(args.executionId, {
      status: "failed",
      result: {
        success: false,
        error: args.error.message,
      },
      completedAt: Date.now(),
    })

    return { success: true }
  },
})

export const retryToolExecution = mutation({
  args: {
    executionId: v.id("tool_executions"),
    newInput: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const originalExecution = await ctx.db.get(args.executionId)
    if (!originalExecution) {
      throw new Error(`Tool execution ${args.executionId} not found`)
    }

    // Create new execution based on the original
    const newExecutionId = await ctx.db.insert("tool_executions", {
      threadId: originalExecution.threadId,
      messageId: originalExecution.messageId,
      userId: originalExecution.userId,
      toolName: originalExecution.toolName,
      parameters: args.newInput || originalExecution.parameters,
      toolConfig: originalExecution.toolConfig,
      input: args.newInput || originalExecution.input,
      context: originalExecution.context,
      status: "pending",
      executionTime: 0,
      result: {
        success: false,
      },
      createdAt: Date.now(),
    })

    return { executionId: newExecutionId, success: true }
  },
})

/*************************************************************************/
/*  AGENT TOOL MANAGEMENT
/*************************************************************************/

export const getAvailableTools = query({
  args: {
    userId: v.optional(v.id("users")),
    category: v.optional(
      v.union(
        v.literal("financial"),
        v.literal("search"),
        v.literal("communication"),
        v.literal("workflow"),
        v.literal("analysis")
      )
    ),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db.query("agent_tools")

    if (args.category) {
      queryBuilder = queryBuilder.filter(q => q.eq(q.field("category"), args.category))
    }

    const tools = await queryBuilder.collect()

    // Filter tools based on user permissions if userId provided
    if (args.userId) {
      // Get user to check role/permissions
      const user = await ctx.db.get(args.userId)
      if (user) {
        return tools.filter(tool => {
          // Add role-based filtering logic here
          if (Array.isArray(tool.permissions)) {
            return (
              tool.permissions.includes("all") || tool.permissions.includes(user.role)
            )
          } else {
            return (
              tool.permissions.roles.includes("all") ||
              tool.permissions.roles.includes(user.role)
            )
          }
        })
      }
    }

    return tools
  },
})

export const registerTool = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.union(
      v.literal("financial"),
      v.literal("search"),
      v.literal("communication"),
      v.literal("workflow"),
      v.literal("analysis")
    ),
    config: v.object({
      inputSchema: v.any(),
      outputSchema: v.any(),
      defaultParams: v.optional(v.any()),
      timeout: v.optional(v.number()),
      retryCount: v.optional(v.number()),
    }),
    permissions: v.array(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Check if tool already exists
    const existingTool = await ctx.db
      .query("agent_tools")
      .filter(q => q.eq(q.field("name"), args.name))
      .unique()

    if (existingTool) {
      throw new Error(`Tool ${args.name} already exists`)
    }

    const toolId = await ctx.db.insert("agent_tools", {
      toolName: args.name,
      name: args.name,
      toolType: "calculator", // Default type, can be updated later
      description: args.description,
      parameters: {
        schema: args.config.inputSchema,
        required: [],
      },
      handler: `tools.${args.name}`, // Convex function reference
      category: args.category,
      permissions: args.permissions,
      config: args.config,
      isActive: args.isActive !== false, // Default to true
      usageCount: 0,
      createdAt: Date.now(),
    })

    return { toolId, success: true }
  },
})

export const updateToolConfig = mutation({
  args: {
    toolId: v.id("agent_tools"),
    config: v.optional(
      v.object({
        inputSchema: v.optional(v.any()),
        outputSchema: v.optional(v.any()),
        defaultParams: v.optional(v.any()),
        timeout: v.optional(v.number()),
        retryCount: v.optional(v.number()),
      })
    ),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const tool = await ctx.db.get(args.toolId)
    if (!tool) {
      throw new Error(`Tool ${args.toolId} not found`)
    }

    const updates: any = {}

    if (args.config) {
      updates.config = {
        ...tool.config,
        ...args.config,
      }
    }

    if (args.isActive !== undefined) {
      updates.isActive = args.isActive
    }

    await ctx.db.patch(args.toolId, updates)

    return { success: true }
  },
})

export const incrementToolUsage = mutation({
  args: {
    toolName: v.string(),
  },
  handler: async (ctx, args) => {
    const tool = await ctx.db
      .query("agent_tools")
      .filter(q => q.eq(q.field("name"), args.toolName))
      .unique()

    if (tool) {
      await ctx.db.patch(tool._id, {
        usageCount: (tool.usageCount || 0) + 1,
      })
    }

    return { success: true }
  },
})

/*************************************************************************/
/*  EXECUTION CLEANUP AND MAINTENANCE
/*************************************************************************/

export const cleanupOldExecutions = mutation({
  args: {
    days: v.optional(v.number()),
    keepSuccessful: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const days = args.days || 30
    const keepSuccessful = args.keepSuccessful !== false // Default to true
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000

    let query = ctx.db
      .query("tool_executions")
      .filter(q => q.lt(q.field("createdAt"), cutoffTime))

    if (keepSuccessful) {
      query = query.filter(q =>
        q.or(q.eq(q.field("status"), "failed"), q.eq(q.field("status"), "pending"))
      )
    }

    const oldExecutions = await query.collect()

    let deletedCount = 0
    for (const execution of oldExecutions) {
      await ctx.db.delete(execution._id)
      deletedCount++
    }

    return { deletedCount, success: true }
  },
})
