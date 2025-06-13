import { openai } from "@ai-sdk/openai"
import { mcp } from "../mcp"
import { Agent } from "@mastra/core/agent"
import { Memory } from "@mastra/memory"
import { postgresStore, vectorStore } from "@/mastra/database"

// Create an agent and add tools from the MCP client
export const fileAgent = new Agent({
  name: "File Agent",
  description:
    "A specialized agent for file system operations including reading, writing, listing, and managing files and directories.",
  instructions: `
    You are a file management specialist that can help users with various file system operations.
    
    Your capabilities include:
    - Reading file contents
    - Writing/creating new files
    - Listing directory contents
    - Managing file and folder structures
    - Searching for files
    - File information and metadata
    
    When responding:
    - Always confirm the file path before performing operations
    - Provide clear feedback about what operations were performed
    - Handle errors gracefully and suggest alternatives
    - Ask for clarification if file paths are ambiguous
    - Be cautious with destructive operations (delete, overwrite)
    
    Use the available MCP file system tools to perform these operations.
  `,
  model: openai("gpt-4o-mini"),
  tools: await mcp.getTools(),
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
