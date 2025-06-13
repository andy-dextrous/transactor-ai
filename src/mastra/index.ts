import { Mastra } from "@mastra/core/mastra"
import { PinoLogger } from "@mastra/loggers"
import { LibSQLStore } from "@mastra/libsql"

import { weatherAgent, fileAgent } from "./agents"
import { orchestratorNetwork } from "./network"
import { propertyDueDiligenceWorkflow } from "./workflows/property-due-diligence"

export const mastra = new Mastra({
  agents: { weatherAgent, fileAgent },
  networks: { orchestratorNetwork },
  workflows: { propertyDueDiligenceWorkflow },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
})
