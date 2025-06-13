"use server"

import { createStreamableValue } from "ai/rsc"
import { mastra } from "../../../mastra"

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  toolCalls?: Array<{
    id: string
    name: string
    args: any
    result?: any
  }>
}

export async function streamChatResponse(
  messages: ChatMessage[],
  resourceId: string = "default-user",
  threadId: string = "default-thread"
) {
  const stream = createStreamableValue("")

  // Start the streaming in an async function to ensure proper handling
  ;(async () => {
    try {
      const agent = mastra.getAgent("weatherAgent")

      // Get the latest user message
      const latestUserMessage = messages[messages.length - 1]
      if (latestUserMessage.sender !== "user") {
        throw new Error("Last message must be from user")
      }

      // Stream the response from the agent
      const response = await agent.stream(latestUserMessage.content, {
        resourceId,
        threadId,
        maxSteps: 5,
        onStepFinish: ({ toolCalls, toolResults }) => {
          // Handle tool calls when a step finishes
          if (toolCalls && toolCalls.length > 0) {
            const formattedToolCalls = toolCalls.map((toolCall, index) => ({
              id: `tool-${Date.now()}-${index}`,
              name: toolCall.toolName,
              args: toolCall.args,
              result: toolResults?.[index]?.result || null,
            }))

            // Stream tool calls
            stream.update(
              JSON.stringify({
                type: "tool_calls",
                toolCalls: formattedToolCalls,
              }) + "\n"
            )
          }
        },
      })

      // Stream the text response chunk by chunk
      for await (const chunk of response.textStream) {
        // Send each chunk immediately and update the stream
        stream.update(
          JSON.stringify({
            type: "text_chunk",
            content: chunk,
          }) + "\n"
        )

        // Small delay to ensure chunks are processed separately
        await new Promise(resolve => setTimeout(resolve, 10))
      }

      // Mark the stream as done
      stream.update(
        JSON.stringify({
          type: "done",
        }) + "\n"
      )
    } catch (error) {
      stream.update(
        JSON.stringify({
          type: "error",
          content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}`,
        }) + "\n"
      )

      stream.update(
        JSON.stringify({
          type: "done",
        }) + "\n"
      )
    } finally {
      stream.done()
    }
  })()

  return stream.value
}
