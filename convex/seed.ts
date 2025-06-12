import { mutation } from "./_generated/server"
import { v } from "convex/values"
import { SEED_PROPERTIES, SEED_SETTLEMENTS, SEED_DOCUMENTS } from "./seedData"

/*************************************************************************/
/*  DATABASE SEEDING
/*************************************************************************/

export const seedDatabase = mutation({
  args: {},
  returns: v.object({
    propertiesCreated: v.number(),
    settlementsCreated: v.number(),
    documentsCreated: v.number(),
  }),
  handler: async ctx => {
    console.log("Starting database seeding...")

    // Clear existing data
    const existingProperties = await ctx.db.query("properties").collect()
    const existingSettlements = await ctx.db.query("settlements").collect()
    const existingDocuments = await ctx.db.query("documents").collect()

    for (const prop of existingProperties) {
      await ctx.db.delete(prop._id)
    }
    for (const settlement of existingSettlements) {
      await ctx.db.delete(settlement._id)
    }
    for (const doc of existingDocuments) {
      await ctx.db.delete(doc._id)
    }

    // Seed properties
    const propertyIds: Record<string, any> = {}
    for (const property of SEED_PROPERTIES) {
      const { id, ...propertyData } = property
      const propertyId = await ctx.db.insert("properties", propertyData)
      propertyIds[id] = propertyId
    }

    // Seed settlements
    const settlementIds: Record<string, any> = {}
    for (const settlement of SEED_SETTLEMENTS) {
      const { id, propertyId, ...settlementData } = settlement
      const dbPropertyId = propertyIds[propertyId]
      if (dbPropertyId) {
        const settlementId = await ctx.db.insert("settlements", {
          ...settlementData,
          propertyId: dbPropertyId,
        })
        settlementIds[id] = settlementId
      }
    }

    // Seed documents
    let documentsCreated = 0
    for (const document of SEED_DOCUMENTS) {
      const { id, settlementId, ...documentData } = document
      const dbSettlementId = settlementIds[settlementId]
      if (dbSettlementId) {
        await ctx.db.insert("documents", {
          ...documentData,
          settlementId: dbSettlementId,
        })
        documentsCreated++
      }
    }

    console.log("Database seeding completed!")

    return {
      propertiesCreated: SEED_PROPERTIES.length,
      settlementsCreated: Object.keys(settlementIds).length,
      documentsCreated,
    }
  },
})
