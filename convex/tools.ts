import { z } from "zod"
import { v } from "convex/values"
import { ActionCtx } from "./_generated/server"
import { internal } from "./_generated/api"

/*************************************************************************/
/*  TOOL DEFINITIONS WITH ZOD SCHEMAS
/*************************************************************************/

export const toolDefinitions = {
  propertySearch: {
    name: "propertySearch",
    description:
      "Search for properties based on location, type, price range, and features. Returns real property listings with detailed information.",
    parameters: z.object({
      location: z.string().optional().describe("Suburb, city, or postcode to search in"),
      propertyType: z
        .enum(["house", "apartment", "townhouse", "any"])
        .optional()
        .describe("Type of property"),
      minPrice: z.number().optional().describe("Minimum price in AUD"),
      maxPrice: z.number().optional().describe("Maximum price in AUD"),
      minBedrooms: z.number().optional().describe("Minimum number of bedrooms"),
      features: z
        .array(z.string())
        .optional()
        .describe("Desired features like 'ocean views', 'gym', 'parking'"),
    }),
  },
  checkSettlementStatus: {
    name: "checkSettlementStatus",
    description:
      "Check the detailed status of a property settlement including milestones, timeline, and risk factors",
    parameters: z.object({
      settlementId: z.string().optional().describe("Specific settlement ID to check"),
      propertyAddress: z
        .string()
        .optional()
        .describe("Property address to find settlement for"),
      buyerName: z.string().optional().describe("Buyer name to find settlement for"),
    }),
  },
  analyzeDocument: {
    name: "analyzeDocument",
    description:
      "Analyze property-related documents including contracts, inspection reports, and finance approvals",
    parameters: z.object({
      documentId: z.string().optional().describe("Specific document ID to analyze"),
      documentType: z
        .enum(["contract", "building_report", "pest_report", "finance_approval", "all"])
        .optional()
        .describe("Type of document to find"),
      settlementId: z.string().optional().describe("Settlement ID to find documents for"),
    }),
  },
  getMarketInsights: {
    name: "getMarketInsights",
    description:
      "Get detailed market insights and trends for specific suburbs including prices, growth rates, and demographics",
    parameters: z.object({
      suburb: z.string().describe("Suburb name to get market insights for"),
      propertyType: z
        .enum(["apartment", "house", "townhouse", "all"])
        .optional()
        .describe("Property type for specific insights"),
    }),
  },
} as const

export type PropertyToolName = keyof typeof toolDefinitions

/*************************************************************************/
/*  TOOL IMPLEMENTATIONS
/*************************************************************************/

export const createPropertyTools = (ctx: ActionCtx) => ({
  propertySearch: {
    description: toolDefinitions.propertySearch.description,
    parameters: toolDefinitions.propertySearch.parameters,
    execute: async (args: z.infer<typeof toolDefinitions.propertySearch.parameters>) => {
      const result = await ctx.runQuery(internal.tools.internal.searchProperties, args)
      return JSON.stringify(result)
    },
  },
  checkSettlementStatus: {
    description: toolDefinitions.checkSettlementStatus.description,
    parameters: toolDefinitions.checkSettlementStatus.parameters,
    execute: async (
      args: z.infer<typeof toolDefinitions.checkSettlementStatus.parameters>
    ) => {
      const result = await ctx.runQuery(internal.tools.internal.getSettlementStatus, args)
      return JSON.stringify(result)
    },
  },
  analyzeDocument: {
    description: toolDefinitions.analyzeDocument.description,
    parameters: toolDefinitions.analyzeDocument.parameters,
    execute: async (args: z.infer<typeof toolDefinitions.analyzeDocument.parameters>) => {
      const result = await ctx.runQuery(internal.tools.internal.analyzeDocuments, args)
      return JSON.stringify(result)
    },
  },
  getMarketInsights: {
    description: toolDefinitions.getMarketInsights.description,
    parameters: toolDefinitions.getMarketInsights.parameters,
    execute: async (
      args: z.infer<typeof toolDefinitions.getMarketInsights.parameters>
    ) => {
      const result = await ctx.runQuery(internal.tools.internal.getMarketData, args)
      return JSON.stringify(result)
    },
  },
})

/*************************************************************************/
/*  INTERNAL TOOL QUERY IMPLEMENTATIONS
/*************************************************************************/

// These will be implemented in convex/tools/internal.ts
export const toolQueryValidators = {
  searchProperties: {
    args: {
      location: v.optional(v.string()),
      propertyType: v.optional(
        v.union(
          v.literal("house"),
          v.literal("apartment"),
          v.literal("townhouse"),
          v.literal("any")
        )
      ),
      minPrice: v.optional(v.number()),
      maxPrice: v.optional(v.number()),
      minBedrooms: v.optional(v.number()),
      features: v.optional(v.array(v.string())),
    },
    returns: v.string(),
  },
  getSettlementStatus: {
    args: {
      settlementId: v.optional(v.string()),
      propertyAddress: v.optional(v.string()),
      buyerName: v.optional(v.string()),
    },
    returns: v.string(),
  },
  analyzeDocuments: {
    args: {
      documentId: v.optional(v.string()),
      documentType: v.optional(
        v.union(
          v.literal("contract"),
          v.literal("building_report"),
          v.literal("pest_report"),
          v.literal("finance_approval"),
          v.literal("all")
        )
      ),
      settlementId: v.optional(v.string()),
    },
    returns: v.string(),
  },
  getMarketData: {
    args: {
      suburb: v.string(),
      propertyType: v.optional(
        v.union(
          v.literal("apartment"),
          v.literal("house"),
          v.literal("townhouse"),
          v.literal("all")
        )
      ),
    },
    returns: v.string(),
  },
}
