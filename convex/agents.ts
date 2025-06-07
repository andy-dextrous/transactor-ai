/*************************************************************************/
/*  TRANSACTOR 2.0 - AI AGENTS SYSTEM
/*  Property Concierge Agent Infrastructure
/*  Built on Convex Agent components with OpenAI integration
/*************************************************************************/

import { action, mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { components } from "./_generated/api"
import { api } from "./_generated/api"

/*************************************************************************/
/*  AGENT CONFIGURATION & INITIALIZATION
/*************************************************************************/

// Initialize the orchestrator agent for property concierge
export const initializeOrchestratorAgent = action({
  args: {
    userId: v.id("users"),
    initialMessage: v.optional(v.string()),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    // Create a new agent thread using internal call
    const threadResult = await ctx.runMutation(components.agent.threads.createThread, {
      title: "Property Assistant",
      userId: args.userId.toString(),
      defaultSystemPrompt: `You are the Property Concierge AI for Transactor, an AI-driven property platform. 

Your role is to help users throughout their Australian property journey with:
- Property buying and selling guidance
- Financial calculations and planning
- Service provider connections
- Document assistance and timeline management

Always be helpful, proactive, and focused on Australian property market specifics.
Provide clear, actionable advice and use tools when calculations or searches would be helpful.`,
    })

    const threadId = threadResult._id

    // Create agent thread record in our schema
    await ctx.runMutation(api.agents.createAgentThread, {
      userId: args.userId,
      agentType: "buyer",
      convexThreadId: threadId,
      initialContext: {
        userRole: "buyer",
        phase: "onboarding",
      },
    })

    return threadId
  },
})

// Initialize specialized buyer agent
export const initializeBuyerAgent = action({
  args: {
    userId: v.id("users"),
    transactionId: v.optional(v.id("transactions")),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    // Create buyer-specific agent thread using internal call
    const threadResult = await ctx.runMutation(components.agent.threads.createThread, {
      title: "Property Buying Assistant",
      userId: args.userId.toString(),
      defaultSystemPrompt: `Hi! I'm your property buying specialist. I'm here to help you through every step of finding and purchasing your ideal property. 

I can help you with:
- Property search and comparison
- Financial calculations and budgeting
- Mortgage and finance guidance
- Service provider recommendations
- Timeline and milestone management

What's your current situation - are you a first-time buyer or looking to upgrade?`,
    })

    const threadId = threadResult._id

    // Create agent thread record
    await ctx.runMutation(api.agents.createAgentThread, {
      userId: args.userId,
      transactionId: args.transactionId,
      agentType: "buyer",
      convexThreadId: threadId,
      initialContext: {
        specialization: "property_purchase",
        phase: "discovery",
      },
    })

    return threadId
  },
})

/*************************************************************************/
/*  AGENT THREAD MANAGEMENT
/*************************************************************************/

// Create new agent thread record
export const createAgentThread = mutation({
  args: {
    userId: v.id("users"),
    transactionId: v.optional(v.id("transactions")),
    agentType: v.union(
      v.literal("buyer"),
      v.literal("seller"),
      v.literal("finance"),
      v.literal("conveyancing"),
      v.literal("match"),
      v.literal("insights")
    ),
    convexThreadId: v.string(),
    initialContext: v.optional(v.any()),
  },
  returns: v.id("agent_threads"),
  handler: async (ctx, args) => {
    const threadId = await ctx.db.insert("agent_threads", {
      transactionId: args.transactionId,
      userId: args.userId,
      orchestratorAgentId: args.convexThreadId,
      activeAgents: [
        {
          agentType: args.agentType,
          agentId: args.convexThreadId,
          status: "active",
          context: args.initialContext || {},
          memory: {},
        },
      ],
      currentPhase: "onboarding",
      metadata: {
        priority: "medium",
        tags: [],
        lastAgentActivity: Date.now(),
      },
      status: "active",
      createdAt: Date.now(),
    })

    // Initialize conversation context
    await ctx.db.insert("conversation_context", {
      threadId: args.convexThreadId,
      userId: args.userId,
      contextType: "user_preferences",
      data: {
        preferences: {},
        transactionState: {
          phase: "onboarding",
          activeWorkflows: [],
          pendingActions: [],
          keyDates: {},
        },
      },
      importance: "high",
      lastUpdated: Date.now(),
    })

    return threadId
  },
})

// Get agent thread
export const getAgentThread = query({
  args: {
    threadId: v.id("agent_threads"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.threadId)
  },
})

// Get agent thread by Convex thread ID
export const getAgentThreadByConvexId = query({
  args: {
    convexThreadId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("agent_threads")
      .filter(q => q.eq(q.field("orchestratorAgentId"), args.convexThreadId))
      .first()
  },
})

/*************************************************************************/
/*  AGENT MESSAGING & TOOL CALLING
/*************************************************************************/

// Send message to orchestrator agent with tool calling
export const sendMessageToOrchestrator = action({
  args: {
    threadId: v.string(),
    message: v.string(),
    userId: v.id("users"),
  },
  returns: v.any(),
  handler: async (ctx, args) => {
    try {
      // Add the user's message to the thread using internal call
      await ctx.runMutation(components.agent.messages.addMessages, {
        threadId: args.threadId,
        agentName: "property-assistant",
        messages: [
          {
            message: {
              role: "user",
              content: args.message,
            },
          },
        ],
      })

      // Update contextual panel based on conversation
      await updateContextFromMessage(ctx, {
        threadId: args.threadId,
        userId: args.userId,
        message: args.message,
        response: "Message received",
      })

      return { success: true, message: "Message sent" }
    } catch (error: any) {
      console.error("Agent messaging error:", error)
      throw new Error(`Failed to send message to agent: ${error.message || error}`)
    }
  },
})

// Process tool calls from agent
const processToolCall = async (
  ctx: any,
  args: {
    threadId: string
    toolName: string
    toolArguments: any
    userId: string
  }
) => {
  try {
    let result

    switch (args.toolName) {
      case "mortgageCalculator":
        result = await ctx.runQuery(
          api.financials.calculateLoanRepayments,
          args.toolArguments
        )
        break

      case "propertySearch":
        result = await ctx.runQuery(api.properties.searchProperties, args.toolArguments)
        break

      case "stampDutyCalculator":
        result = await ctx.runQuery(api.financials.calculateStampDuty, args.toolArguments)
        break

      case "providerMatcher":
        result = await ctx.runQuery(api.providers.getProvidersByType, args.toolArguments)
        break

      default:
        console.warn(`Unknown tool: ${args.toolName}`)
        return
    }

    // Save tool execution record
    await ctx.runMutation(api.agents.saveToolExecution, {
      threadId: args.threadId,
      toolName: args.toolName,
      parameters: args.toolArguments,
      result: {
        success: true,
        data: result,
        displayComponent: getDisplayComponent(args.toolName),
        actions: generateToolActions(args.toolName, result),
      },
      userId: args.userId,
    })
  } catch (error: any) {
    console.error(`Tool execution error for ${args.toolName}:`, error)

    // Save error record
    await ctx.runMutation(api.agents.saveToolExecution, {
      threadId: args.threadId,
      toolName: args.toolName,
      parameters: args.toolArguments,
      result: {
        success: false,
        error: error.message || error,
        displayComponent: "ErrorDisplay",
      },
      userId: args.userId,
    })
  }
}

// Save tool execution record
export const saveToolExecution = mutation({
  args: {
    threadId: v.string(),
    toolName: v.string(),
    parameters: v.any(),
    result: v.any(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tool_executions", {
      threadId: args.threadId,
      messageId: `msg_${Date.now()}`,
      toolName: args.toolName,
      parameters: args.parameters,
      result: args.result,
      executionTime: 0,
      userId: args.userId,
      createdAt: Date.now(),
    })
  },
})

/*************************************************************************/
/*  CONTEXTUAL PANEL MANAGEMENT
/*************************************************************************/

// Update context based on conversation
const updateContextFromMessage = async (
  ctx: any,
  args: {
    threadId: string
    userId: string
    message: string
    response: string
  }
) => {
  // Analyze message for context clues
  const context = analyzeMessageForContext(args.message, args.response)

  if (Object.keys(context).length > 0) {
    await ctx.runMutation(api.agents.updateContextualPanel, {
      threadId: args.threadId,
      userId: args.userId,
      context,
    })
  }
}

// Update contextual panel
export const updateContextualPanel = mutation({
  args: {
    threadId: v.string(),
    userId: v.id("users"),
    context: v.any(),
  },
  handler: async (ctx, args) => {
    const existingPanel = await ctx.db
      .query("conversation_panels")
      .withIndex("by_thread", q => q.eq("threadId", args.threadId))
      .first()

    const panelData = {
      threadId: args.threadId,
      userId: args.userId,
      currentContext: args.context,
      panelComponents: determineVisibleComponents(args.context),
      lastUpdated: Date.now(),
      autoUpdated: true,
    }

    if (existingPanel) {
      await ctx.db.patch(existingPanel._id, panelData)
      return existingPanel._id
    } else {
      return await ctx.db.insert("conversation_panels", panelData)
    }
  },
})

// Get contextual panel data
export const getContextualPanel = query({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversation_panels")
      .withIndex("by_thread", q => q.eq("threadId", args.threadId))
      .first()
  },
})

// Get thread messages
export const getThreadMessages = query({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    // For now, return a simple response until we have the correct agent message API
    return {
      messages: [],
      threadId: args.threadId,
    }
  },
})

// Get tool executions for thread
export const getToolExecutions = query({
  args: {
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tool_executions")
      .withIndex("by_thread", q => q.eq("threadId", args.threadId))
      .order("desc")
      .take(20)
  },
})

/*************************************************************************/
/*  HELPER FUNCTIONS
/*************************************************************************/

function analyzeMessageForContext(message: string, response: string) {
  const context: any = {}

  // Look for property price mentions
  const priceMatch = message.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)[kK]?/)
  if (priceMatch) {
    const price = parseInt(priceMatch[1].replace(/,/g, ""))
    if (price > 100000) {
      context.activeProperty = {
        id: `property_${Date.now()}`,
        address: "Property of Interest",
        price: price,
        type: "target",
      }
    }
  }

  // Look for location mentions
  const locationKeywords = ["suburb", "area", "location", "near", "in "]
  if (locationKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
    context.searchContext = {
      hasLocation: true,
      lastSearch: Date.now(),
    }
  }

  return context
}

function determineVisibleComponents(context: any) {
  const components = []

  if (context.activeProperty) {
    components.push({
      componentType: "PropertySummary" as const,
      priority: 1,
      isVisible: true,
      config: { property: context.activeProperty },
    })
  }

  if (context.activeTransaction) {
    components.push({
      componentType: "TransactionProgress" as const,
      priority: 2,
      isVisible: true,
      config: { transaction: context.activeTransaction },
    })
  }

  if (context.activeCalculations?.length > 0) {
    components.push({
      componentType: "CalculationResults" as const,
      priority: 3,
      isVisible: true,
      config: { calculations: context.activeCalculations },
    })
  }

  // Always show quick actions
  components.push({
    componentType: "QuickActions" as const,
    priority: 10,
    isVisible: true,
    config: {},
  })

  return components
}

function getDisplayComponent(toolName: string): string {
  const componentMap: Record<string, string> = {
    mortgageCalculator: "MortgageCalculatorResult",
    propertySearch: "PropertySearchResults",
    stampDutyCalculator: "StampDutyCalculatorResult",
    providerMatcher: "ProviderMatchResults",
  }

  return componentMap[toolName] || "GenericToolResult"
}

function generateToolActions(toolName: string, result: any) {
  const baseActions = [
    {
      label: "Save Result",
      type: "save" as const,
      target: `${toolName}_result`,
    },
  ]

  switch (toolName) {
    case "mortgageCalculator":
      return [
        ...baseActions,
        {
          label: "Refine Calculation",
          type: "navigate" as const,
          target: "/tools/calculator/mortgage",
        },
      ]

    case "propertySearch":
      return [
        ...baseActions,
        {
          label: "View More Properties",
          type: "navigate" as const,
          target: "/tools/property-search",
        },
      ]

    case "stampDutyCalculator":
      return [
        ...baseActions,
        {
          label: "Calculate Total Costs",
          type: "navigate" as const,
          target: "/tools/calculator/total-costs",
        },
      ]

    case "providerMatcher":
      return [
        ...baseActions,
        {
          label: "View All Providers",
          type: "navigate" as const,
          target: "/marketplace/providers",
        },
      ]

    default:
      return baseActions
  }
}
