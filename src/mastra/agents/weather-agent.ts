import { openai } from "@ai-sdk/openai"
import { Agent } from "@mastra/core/agent"
import { Memory } from "@mastra/memory"
import { weatherTool } from "@/mastra/tools/weather-tool"
import { postgresStore, vectorStore } from "@/mastra/database"

export const weatherAgent = new Agent({
  name: "Weather Agent",
  description:
    "A specialized agent for weather information including current conditions, forecasts, and weather-related queries.",
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: openai("gpt-4o-mini"),
  tools: { weatherTool },
  memory: new Memory({
    storage: postgresStore,
    vector: vectorStore,
    embedder: openai.embedding("text-embedding-3-small"),
    options: {
      lastMessages: 10,
      semanticRecall: {
        topK: 3,
        messageRange: 2,
      },
    },
  }),
})
