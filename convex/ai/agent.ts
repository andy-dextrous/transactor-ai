"use node"

import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { action } from "../_generated/server"
import { internal } from "../_generated/api"
import { v } from "convex/values"
import { createPropertyTools } from "../tools"

/*************************************************************************/
/*  AI AGENT CONFIGURATION
/*************************************************************************/

const AGENT_INSTRUCTIONS = `You are a helpful property concierge assistant for Australian property professionals and buyers/sellers.

You have access to real property data, settlement information, and market insights. When users ask about properties, settlements, or market data, use the available tools to provide accurate, specific information from the database.

Key capabilities:
- Search and analyze real property listings with detailed information
- Track settlement progress with specific dates and milestones  
- Generate property-related documents and reports
- Provide market insights and suburb analysis
- Help with property investment and purchase decisions

Always provide specific, data-driven responses using the tools available to you. When you use tools, explain what you're doing and interpret the results for the user in a helpful way.

Be conversational and friendly while maintaining professionalism. If you need to use multiple tools to answer a question comprehensively, do so.`

/*************************************************************************/
/*  AGENT RESPONSE GENERATION
/*************************************************************************/

export const generateAgentResponse = action({
  args: {
    conversationId: v.id("conversations"),
    userMessage: v.string(),
  },
  returns: v.object({
    success: v.boolean(),
    messageId: v.optional(v.id("messages")),
    error: v.optional(v.string()),
  }),
  handler: async (ctx, { conversationId, userMessage }) => {
    try {
      console.log("Generating agent response for:", userMessage)

      // Add user message to conversation
      const userMessageId = await ctx.runMutation(
        internal.conversations.addMessageInternal,
        {
          conversationId,
          role: "user",
          content: userMessage,
        }
      )

      // Get conversation history for context
      const messagesResult = await ctx.runQuery(
        internal.conversations.listMessagesInternal,
        {
          conversationId,
          paginationOpts: { cursor: null, numItems: 20 },
        }
      )

      // Format messages for AI
      const messages = messagesResult.page.map((msg: any) => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
      }))

      // Add system message at the beginning
      const aiMessages = [
        { role: "system" as const, content: AGENT_INSTRUCTIONS },
        ...messages,
      ]

      console.log("Calling OpenAI with", aiMessages.length, "messages")

      // Generate response with tools
      const result = await generateText({
        model: openai("gpt-4o-mini"),
        messages: aiMessages,
        tools: createPropertyTools(ctx),
        maxSteps: 5,
        temperature: 0.7,
      })

      console.log("Generated response:", result.text)
      console.log("Tool results:", result.toolResults)

      // Store tool calls and results if any
      const toolCalls = result.toolCalls?.map(call => ({
        id: call.toolCallId,
        type: "function" as const,
        function: {
          name: call.toolName,
          arguments: JSON.stringify(call.args),
        },
      }))

      const toolResults = result.toolResults?.map(result => ({
        toolCallId: result.toolCallId,
        result: JSON.stringify(result.result),
      }))

      // Add assistant response to conversation
      const assistantMessageId = await ctx.runMutation(
        internal.conversations.addMessageInternal,
        {
          conversationId,
          role: "assistant",
          content: result.text,
          toolCalls,
          toolResults,
        }
      )

      return {
        success: true,
        messageId: assistantMessageId,
      }
    } catch (error) {
      console.error("Error generating agent response:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  },
})

/*************************************************************************/
/*  CONVERSATION UTILITIES
/*************************************************************************/

export const startNewConversation = action({
  args: {
    initialMessage: v.string(),
    title: v.optional(v.string()),
  },
  returns: v.object({
    conversationId: v.id("conversations"),
    success: v.boolean(),
    error: v.optional(v.string()),
  }),
  handler: async (ctx, { initialMessage, title }) => {
    try {
      // Create new conversation
      const conversationId = await ctx.runMutation(
        internal.conversations.createConversationInternal,
        {
          title: title || "Property Chat",
        }
      )

      // Generate response to initial message
      const result = await generateAgentResponse.handler(ctx, {
        conversationId,
        userMessage: initialMessage,
      })

      if (!result.success) {
        return {
          conversationId,
          success: false,
          error: result.error,
        }
      }

      return {
        conversationId,
        success: true,
      }
    } catch (error) {
      console.error("Error starting conversation:", error)
      throw error
    }
  },
})
