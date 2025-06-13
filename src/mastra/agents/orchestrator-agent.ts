import { openai } from "@ai-sdk/openai"
import { Agent } from "@mastra/core/agent"
import { Memory } from "@mastra/memory"
import { createTool } from "@mastra/core/tools"
import { z } from "zod"
import { weatherAgent } from "./weather-agent"
import { fileAgent } from "./file-agent"
import { postgresStore, vectorStore } from "@/mastra/database"

/*************************************************************************/
/*  AGENT TOOLS - Converting agents into callable tools
/*************************************************************************/

const weatherAgentTool = createTool({
  id: "weather-agent",
  description:
    "Calls the weather agent to get weather information for any location. Use this for weather forecasts, current conditions, temperature, humidity, wind speed, and any weather-related queries.",
  inputSchema: z.object({
    query: z
      .string()
      .describe("The weather-related question or location to get weather for"),
  }),
  outputSchema: z.object({
    response: z.string().describe("Weather information response"),
  }),
  execute: async ({ context }) => {
    const result = await weatherAgent.generate(context.query)
    return { response: result.text }
  },
})

const fileAgentTool = createTool({
  id: "file-agent",
  description:
    "Calls the file agent to handle file operations including reading files, writing files, listing directories, file management, and any filesystem-related tasks.",
  inputSchema: z.object({
    query: z
      .string()
      .describe("The file operation request or question about files/directories"),
  }),
  outputSchema: z.object({
    response: z.string().describe("File operation response"),
  }),
  execute: async ({ context }) => {
    const result = await fileAgent.generate(context.query)
    return { response: result.text }
  },
})

/*************************************************************************/
/*  ORCHESTRATOR AGENT - Routes queries to specialized agents
/*************************************************************************/

export const orchestratorAgent = new Agent({
  name: "Orchestrator Agent",
  description:
    "An intelligent routing system that determines which specialized agent should handle each user query and coordinates between multiple agents when needed.",
  instructions: `
    You are an intelligent orchestrator that routes user queries to the appropriate specialized agents and coordinates their responses.
    
    Your available agent tools are:
    1. Weather Agent Tool: Use for weather forecasts, current conditions, temperature, humidity, wind speed, and any weather-related queries
    2. File Agent Tool: Use for file operations including reading files, writing files, listing directories, file management, and any filesystem-related tasks
    
    For each user query:
    1. Analyze the request to determine which domain(s) it belongs to
    2. Route the query to the appropriate specialized agent tool(s) based on the content
    3. If a query involves multiple domains, coordinate between agent tools to provide a comprehensive response
    4. Always provide a helpful response by leveraging the specialized capabilities of the agents
    5. If the query doesn't clearly fit weather or file operations, try to help with general information or ask for clarification
    
    Guidelines for routing:
    - Weather queries: "weather", "temperature", "forecast", "rain", "snow", "humidity", "wind", specific locations for weather
    - File queries: "file", "folder", "directory", "read", "write", "save", "delete", "list", "document", file paths, file extensions
    
    Always be helpful and provide clear, accurate responses. When using agent tools, present their responses naturally as part of your own response.
  `,
  model: openai("gpt-4o"),
  tools: {
    weatherAgentTool,
    fileAgentTool,
  },
  memory: new Memory({
    storage: postgresStore,
    vector: vectorStore,
    embedder: openai.embedding("text-embedding-3-small"),
    options: {
      lastMessages: 15, // More context for orchestration decisions
      semanticRecall: {
        topK: 5, // More recall for better routing
        messageRange: 3,
      },
    },
  }),
})
