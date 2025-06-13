import { Mastra } from "@mastra/core/mastra"
import { PinoLogger } from "@mastra/loggers"
import { LibSQLStore } from "@mastra/libsql"

import { weatherAgent, fileAgent, orchestratorAgent } from "./agents"
import { orchestratorNetwork } from "./network"
import { propertyDueDiligenceWorkflow } from "./workflows/property-due-diligence"

export const mastra = new Mastra({
  agents: { weatherAgent, fileAgent, orchestratorAgent },
  networks: { orchestratorNetwork },
  workflows: { propertyDueDiligenceWorkflow },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
})
