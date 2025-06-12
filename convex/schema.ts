import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  // The Convex Agent component manages its own internal tables for messages
  // This schema file is required by Convex but the agent handles message storage
  // You can add custom tables here if needed for your application
  // For example, if you want to store user profiles or other data

  // Conversations table for thread management
  conversations: defineTable({
    title: v.string(),
    lastMessageTime: v.number(),
    status: v.union(v.literal("active"), v.literal("archived")),
  }).index("by_last_message", ["lastMessageTime"]),

  // Messages table for storing conversation messages
  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    // Store tool calls and their results
    toolCalls: v.optional(
      v.array(
        v.object({
          id: v.string(),
          type: v.literal("function"),
          function: v.object({
            name: v.string(),
            arguments: v.string(),
          }),
        })
      )
    ),
    toolResults: v.optional(
      v.array(
        v.object({
          toolCallId: v.string(),
          result: v.string(),
        })
      )
    ),
  }).index("by_conversation", ["conversationId"]),

  // Property data for tool responses
  properties: defineTable({
    address: v.string(),
    type: v.union(v.literal("apartment"), v.literal("house"), v.literal("townhouse")),
    bedrooms: v.number(),
    bathrooms: v.number(),
    carSpaces: v.number(),
    price: v.number(),
    landSize: v.optional(v.number()),
    buildingSize: v.number(),
    yearBuilt: v.number(),
    features: v.array(v.string()),
    description: v.string(),
    images: v.array(v.string()),
    listingAgent: v.string(),
    inspectionTimes: v.array(v.string()),
    auctionDate: v.optional(v.string()),
    priceGuide: v.string(),
  })
    .index("by_type", ["type"])
    .index("by_price", ["price"])
    .index("by_bedrooms", ["bedrooms"]),

  // Settlement tracking
  settlements: defineTable({
    propertyId: v.id("properties"),
    propertyAddress: v.string(),
    buyerName: v.string(),
    sellerName: v.string(),
    purchasePrice: v.number(),
    contractDate: v.string(),
    settlementDate: v.string(),
    financeApprovalDue: v.string(),
    inspectionDue: v.string(),
    status: v.union(
      v.literal("on_track"),
      v.literal("at_risk"),
      v.literal("delayed"),
      v.literal("completed")
    ),
    daysToSettlement: v.number(),
    milestones: v.array(
      v.object({
        name: v.string(),
        date: v.string(),
        status: v.union(
          v.literal("completed"),
          v.literal("pending"),
          v.literal("upcoming"),
          v.literal("delayed"),
          v.literal("at_risk")
        ),
      })
    ),
    conveyancer: v.string(),
    mortgageBroker: v.string(),
    riskFactors: v.array(v.string()),
  }).index("by_status", ["status"]),

  // Documents for analysis
  documents: defineTable({
    settlementId: v.id("settlements"),
    type: v.union(
      v.literal("contract"),
      v.literal("building_report"),
      v.literal("pest_report"),
      v.literal("finance_approval")
    ),
    title: v.string(),
    description: v.string(),
    keyPoints: v.array(v.string()),
    riskFlags: v.array(v.string()),
    complianceStatus: v.union(
      v.literal("compliant"),
      v.literal("requires_review"),
      v.literal("non_compliant")
    ),
    uploadDate: v.string(),
  }).index("by_settlement", ["settlementId"]),
})
