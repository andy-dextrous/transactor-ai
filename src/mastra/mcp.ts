import { MCPClient } from "@mastra/mcp"

// Configure MCPClient to connect to your server(s)
export const mcp = new MCPClient({
  id: "transactor-filesystem-client", // Unique ID to prevent multiple initializations
  servers: {
    filesystem: {
      command: "npx",
      args: [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/Scriviante/Desktop",
      ],
    },
  },
})
