import { Agent, createTool } from "@convex-dev/agent"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"
import { components } from "./_generated/api"
import {
  SEED_PROPERTIES,
  SEED_SETTLEMENTS,
  SEED_DOCUMENTS,
  MARKET_DATA,
} from "./seedData"

/*************************************************************************/
/*  PROPERTY SEARCH TOOL - Real Data
/*************************************************************************/

export const propertySearch = createTool({
  description:
    "Search for properties based on location, type, price range, and features. Returns real property listings with detailed information.",
  args: z.object({
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
  handler: async (ctx, args): Promise<string> => {
    let results = [...SEED_PROPERTIES]

    // Filter by location (fuzzy match on address)
    if (args.location) {
      results = results.filter(prop =>
        prop.address.toLowerCase().includes(args.location!.toLowerCase())
      )
    }

    // Filter by property type
    if (args.propertyType && args.propertyType !== "any") {
      results = results.filter(prop => prop.type === args.propertyType)
    }

    // Filter by price range
    if (args.minPrice) {
      results = results.filter(prop => prop.price >= args.minPrice!)
    }
    if (args.maxPrice) {
      results = results.filter(prop => prop.price <= args.maxPrice!)
    }

    // Filter by bedrooms
    if (args.minBedrooms) {
      results = results.filter(prop => prop.bedrooms >= args.minBedrooms!)
    }

    // Filter by features (partial match)
    if (args.features && args.features.length > 0) {
      results = results.filter(prop =>
        args.features!.some(feature =>
          prop.features.some(propFeature =>
            propFeature.toLowerCase().includes(feature.toLowerCase())
          )
        )
      )
    }

    if (results.length === 0) {
      return "No properties found matching your criteria. Try adjusting your search parameters."
    }

    // Format results
    const formattedResults = results
      .map(
        prop => `
**${prop.address}**
- Type: ${prop.type} | ${prop.bedrooms} bed, ${prop.bathrooms} bath
- Price: $${prop.price.toLocaleString()} ${prop.priceGuide ? `(Guide: ${prop.priceGuide})` : ""}
- Size: ${prop.buildingSize}m² ${prop.landSize ? `on ${prop.landSize}m² land` : ""}
- Features: ${prop.features.join(", ")}
- Agent: ${prop.listingAgent}
- Inspections: ${prop.inspectionTimes.join(", ")}
${prop.auctionDate ? `- Auction: ${prop.auctionDate}` : ""}

${prop.description}
`
      )
      .join("\n---\n")

    return `Found ${results.length} propert${results.length === 1 ? "y" : "ies"} matching your search:\n\n${formattedResults}`
  },
})

/*************************************************************************/
/*  SETTLEMENT STATUS TOOL - Real Data
/*************************************************************************/

export const checkSettlementStatus = createTool({
  description:
    "Check the detailed status of a property settlement including milestones, timeline, and risk factors",
  args: z.object({
    settlementId: z.string().optional().describe("Specific settlement ID to check"),
    propertyAddress: z
      .string()
      .optional()
      .describe("Property address to find settlement for"),
    buyerName: z.string().optional().describe("Buyer name to find settlement for"),
  }),
  handler: async (ctx, args): Promise<string> => {
    let settlement = null

    // Find settlement by ID, address, or buyer name
    if (args.settlementId) {
      settlement = SEED_SETTLEMENTS.find(s => s.id === args.settlementId)
    } else if (args.propertyAddress) {
      settlement = SEED_SETTLEMENTS.find(s =>
        s.propertyAddress.toLowerCase().includes(args.propertyAddress!.toLowerCase())
      )
    } else if (args.buyerName) {
      settlement = SEED_SETTLEMENTS.find(s =>
        s.buyerName.toLowerCase().includes(args.buyerName!.toLowerCase())
      )
    } else {
      // Return all settlements if no specific criteria
      const allSettlements = SEED_SETTLEMENTS.map(
        s => `
**${s.propertyAddress}** (${s.id})
- Buyer: ${s.buyerName}
- Status: ${s.status.replace("_", " ").toUpperCase()}
- Settlement Date: ${s.settlementDate}
- Days to Settlement: ${s.daysToSettlement}
      `
      ).join("\n")

      return `All current settlements:\n${allSettlements}\n\nUse a specific settlement ID, property address, or buyer name to get detailed information.`
    }

    if (!settlement) {
      return "Settlement not found. Please check the settlement ID, property address, or buyer name and try again."
    }

    // Format detailed settlement information
    const statusEmoji: Record<string, string> = {
      on_track: "✅",
      at_risk: "⚠️",
      delayed: "🚨",
      completed: "🎉",
    }

    const milestoneStatus = settlement.milestones
      .map(milestone => {
        const statusIcon: Record<string, string> = {
          completed: "✅",
          pending: "⏳",
          upcoming: "📅",
          delayed: "🚨",
          at_risk: "⚠️",
        }
        return `  ${statusIcon[milestone.status] || "📋"} ${milestone.name}: ${milestone.date} (${milestone.status})`
      })
      .join("\n")

    const riskSection =
      settlement.riskFactors.length > 0
        ? `\n**Risk Factors:**\n${settlement.riskFactors.map(risk => `⚠️ ${risk}`).join("\n")}`
        : ""

    return `
**Settlement Status Report**
${statusEmoji[settlement.status]} **Status: ${settlement.status.replace("_", " ").toUpperCase()}**

**Property:** ${settlement.propertyAddress}
**Purchase Price:** $${settlement.purchasePrice.toLocaleString()}
**Settlement Date:** ${settlement.settlementDate}
**Days to Settlement:** ${settlement.daysToSettlement}

**Parties:**
- Buyer: ${settlement.buyerName}
- Seller: ${settlement.sellerName}
- Conveyancer: ${settlement.conveyancer}
- Mortgage Broker: ${settlement.mortgageBroker}

**Milestone Progress:**
${milestoneStatus}
${riskSection}

**Key Dates:**
- Contract Date: ${settlement.contractDate}
- Finance Approval Due: ${settlement.financeApprovalDue}
- Building Inspection Due: ${settlement.inspectionDue}
    `
  },
})

/*************************************************************************/
/*  DOCUMENT ANALYSIS TOOL - Real Data
/*************************************************************************/

export const analyzeDocument = createTool({
  description:
    "Analyze property-related documents including contracts, inspection reports, and finance approvals",
  args: z.object({
    documentId: z.string().optional().describe("Specific document ID to analyze"),
    documentType: z
      .enum(["contract", "building_report", "pest_report", "finance_approval", "all"])
      .optional()
      .describe("Type of document to find"),
    settlementId: z.string().optional().describe("Settlement ID to find documents for"),
  }),
  handler: async (ctx, args): Promise<string> => {
    let documents = [...SEED_DOCUMENTS]

    // Filter documents based on criteria
    if (args.documentId) {
      documents = documents.filter(doc => doc.id === args.documentId)
    }

    if (args.documentType && args.documentType !== "all") {
      documents = documents.filter(doc => doc.type === args.documentType)
    }

    if (args.settlementId) {
      documents = documents.filter(doc => doc.settlementId === args.settlementId)
    }

    if (documents.length === 0) {
      return "No documents found matching your criteria."
    }

    // Format document analysis
    const analysisResults = documents
      .map(doc => {
        const complianceIcon: Record<string, string> = {
          compliant: "✅",
          requires_review: "⚠️",
          non_compliant: "🚨",
        }

        const riskSection =
          doc.riskFlags.length > 0
            ? `\n**Risk Flags:**\n${doc.riskFlags.map(risk => `🚨 ${risk}`).join("\n")}`
            : ""

        return `
**${doc.title}** (${doc.id})
${complianceIcon[doc.complianceStatus]} **Compliance Status:** ${doc.complianceStatus.replace("_", " ").toUpperCase()}

**Document Type:** ${doc.type.replace("_", " ").toUpperCase()}
**Upload Date:** ${doc.uploadDate}

**Description:** ${doc.description}

**Key Points:**
${doc.keyPoints.map(point => `• ${point}`).join("\n")}
${riskSection}
`
      })
      .join("\n---\n")

    return `Document Analysis Results:\n\n${analysisResults}`
  },
})

/*************************************************************************/
/*  MARKET INSIGHTS TOOL - Real Data
/*************************************************************************/

export const getMarketInsights = createTool({
  description:
    "Get detailed market insights and trends for specific suburbs including prices, growth rates, and demographics",
  args: z.object({
    suburb: z.string().describe("Suburb name to get market insights for"),
    propertyType: z
      .enum(["apartment", "house", "townhouse", "all"])
      .optional()
      .describe("Property type for specific insights"),
  }),
  handler: async (ctx, args): Promise<string> => {
    // Normalize suburb name for lookup
    const suburbKey = args.suburb.toLowerCase().replace(/\s+/g, "_")
    const marketData = (MARKET_DATA as Record<string, any>)[suburbKey]

    if (!marketData) {
      const availableSuburbs = Object.keys(MARKET_DATA)
        .map(key => key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()))
        .join(", ")

      return `Market data not available for "${args.suburb}". Available suburbs: ${availableSuburbs}`
    }

    // Format market insights
    let priceInfo = ""
    if (args.propertyType && args.propertyType !== "all") {
      const price = marketData.medianPrice[args.propertyType]
      priceInfo = `**${args.propertyType.toUpperCase()} MEDIAN PRICE:** $${price.toLocaleString()}\n\n`
    } else {
      priceInfo = `**MEDIAN PRICES:**
• Apartments: $${marketData.medianPrice.apartment.toLocaleString()}
• Houses: $${marketData.medianPrice.house.toLocaleString()}
• Townhouses: $${marketData.medianPrice.townhouse.toLocaleString()}

`
    }

    return `
**Market Insights: ${marketData.suburb} (${marketData.postcode})**

${priceInfo}**PRICE GROWTH:**
• Quarterly: ${marketData.priceGrowth.quarterly > 0 ? "+" : ""}${marketData.priceGrowth.quarterly}%
• Yearly: ${marketData.priceGrowth.yearly > 0 ? "+" : ""}${marketData.priceGrowth.yearly}%
• 5-Year: ${marketData.priceGrowth.fiveYear > 0 ? "+" : ""}${marketData.priceGrowth.fiveYear}%

**MARKET ACTIVITY:**
• Days on Market: ${marketData.daysOnMarket} days
• Auction Clearance Rate: ${marketData.auctionClearanceRate}%
• Rental Yield: ${marketData.rentalYield}%

**DEMOGRAPHICS:**
• Median Age: ${marketData.demographics.medianAge} years
• Median Income: $${marketData.demographics.medianIncome.toLocaleString()}
• Population Growth: ${marketData.demographics.populationGrowth > 0 ? "+" : ""}${marketData.demographics.populationGrowth}%

**MARKET SUMMARY:**
${marketData.priceGrowth.yearly > 10 ? "🔥 Strong growth market" : marketData.priceGrowth.yearly > 5 ? "📈 Moderate growth" : "📊 Stable market"} | ${marketData.daysOnMarket < 30 ? "⚡ Fast-moving" : "🐌 Slower sales"} | ${marketData.rentalYield > 4 ? "💰 Good rental returns" : "🏠 Capital growth focused"}
    `
  },
})

/*************************************************************************/
/*  AGENT CONFIGURATION
/*************************************************************************/

const chatAgent = new Agent(components.agent, {
  chat: openai.chat("gpt-4o-mini"),
  textEmbedding: openai.embedding("text-embedding-3-small"),
  instructions: `You are a helpful property concierge assistant for Australian property professionals and buyers/sellers. 

You have access to real property data, settlement information, and market insights. When users ask about properties, settlements, or market data, use the available tools to provide accurate, specific information from the database.

Key capabilities:
- Search and analyze real property listings with detailed information
- Track settlement progress with specific dates and milestones  
- Generate property-related documents and reports
- Provide market insights and suburb analysis
- Help with property investment and purchase decisions

Always provide specific, data-driven responses using the tools available to you.`,
  tools: {
    propertySearch,
    checkSettlementStatus,
    analyzeDocument,
    getMarketInsights,
  },
  maxSteps: 5, // Allow tool calls
  contextOptions: {
    includeToolCalls: false,
    recentMessages: 50,
    searchOptions: {
      limit: 5,
      textSearch: false,
      vectorSearch: true,
    },
  },
})

export default chatAgent
