"use node"

import { internalAction } from "./_generated/server"
import { v } from "convex/values"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { createPropertyTools } from "./tools"
import { internal } from "./_generated/api"

/*************************************************************************/
/*  INTERNAL AI PROCESSING ACTIONS
/*************************************************************************/

export const processMessage = internalAction({
  args: {
    conversationId: v.id("conversations"),
    userMessage: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, { conversationId, userMessage }) => {
    try {
      console.log("Processing message:", userMessage)

      // Get conversation history for context
      const messagesResult = await ctx.runQuery(
        internal.conversations.listMessagesInternal,
        {
          conversationId,
          limit: 20,
        }
      )

      // Format messages for AI
      const messages = (messagesResult as any).page.map((msg: any) => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content,
      }))

      // Add system message at the beginning
      const aiMessages = [
        {
          role: "system" as const,
          content: `You are a helpful property concierge assistant for Australian property professionals and buyers/sellers.

You have access to real property data, settlement information, and market insights. When users ask about properties, settlements, or market data, use the available tools to provide accurate, specific information from the database.

Key capabilities:
- Search and analyze real property listings with detailed information
- Track settlement progress with specific dates and milestones  
- Generate property-related documents and reports
- Provide market insights and suburb analysis
- Help with property investment and purchase decisions

Always provide specific, data-driven responses using the tools available to you. When you use tools, explain what you're doing and interpret the results for the user in a helpful way.

Be conversational and friendly while maintaining professionalism. If you need to use multiple tools to answer a question comprehensively, do so.`,
        },
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

      // Store tool calls and results if any
      const toolCalls = result.toolCalls?.map(call => ({
        id: call.toolCallId,
        type: "function" as const,
        function: {
          name: call.toolName,
          arguments: JSON.stringify(call.args),
        },
      }))

      const toolResults = result.toolResults?.map(toolResult => ({
        toolCallId: toolResult.toolCallId,
        result: JSON.stringify(toolResult.result),
      }))

      // Add assistant response to conversation
      await ctx.runMutation(internal.conversations.addMessageInternal, {
        conversationId,
        role: "assistant",
        content: result.text,
        toolCalls,
        toolResults,
      })

      return null
    } catch (error) {
      console.error("Error in processMessage:", error)

      // Add error message to conversation
      await ctx.runMutation(internal.conversations.addMessageInternal, {
        conversationId,
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your message. Please try again.",
      })

      return null
    }
  },
})
