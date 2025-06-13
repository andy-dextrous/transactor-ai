"use server"

import { mastra } from "../../../mastra"

export async function testAgent() {
  try {
    console.log("Testing Mastra agent...")

    const agent = mastra.getAgent("weatherAgent")
    console.log("Got agent:", agent.name)

    const result = await agent.generate("Hello, can you tell me about yourself?")
    console.log("Agent response:", result.text)

    return { success: true, response: result.text }
  } catch (error) {
    console.error("Error testing agent:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
