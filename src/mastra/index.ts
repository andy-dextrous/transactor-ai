import { Mastra } from "@mastra/core/mastra"
import { PinoLogger } from "@mastra/loggers"

import { weatherAgent, fileAgent, orchestratorAgent } from "./agents"
import { orchestratorNetwork } from "./network"
import { propertyDueDiligenceWorkflow } from "./workflows/property-due-diligence"
import { postgresStore } from "./database"

export const mastra = new Mastra({
  agents: { weatherAgent, fileAgent, orchestratorAgent },
  networks: { orchestratorNetwork },
  workflows: { propertyDueDiligenceWorkflow },
  storage: postgresStore,
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
})
