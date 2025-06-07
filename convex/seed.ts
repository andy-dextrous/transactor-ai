/*************************************************************************/
/*  TRANSACTOR 2.0 - DATABASE SEEDING FUNCTIONS
/*  Automated database population for development & testing
/*  Implements section 2.2 of development tasklist
/*************************************************************************/

import { mutation } from "./_generated/server"
import { serviceProviders, sampleProperties } from "./seedData"

/*************************************************************************/
/*  SERVICE PROVIDER SEEDING
/*************************************************************************/

export const seedServiceProviders = mutation({
  args: {},
  handler: async ctx => {
    console.log("🌱 Seeding service providers...")

    const existingProviders = await ctx.db.query("providers").collect()
    if (existingProviders.length > 0) {
      console.log(`⚠️  ${existingProviders.length} providers already exist. Skipping...`)
      return { message: "Providers already seeded", count: existingProviders.length }
    }

    const seededProviders = []

    for (const provider of serviceProviders) {
      const providerId = await ctx.db.insert("providers", {
        businessName: provider.businessName,
        serviceType: provider.serviceType,
        credentials: provider.credentials,
        serviceAreas: provider.serviceAreas,
        pricing: provider.pricing,
        ratings: provider.ratings,
        availability: provider.availability,
        status: provider.status,
        createdAt: Date.now(),
      })

      seededProviders.push({ id: providerId, name: provider.businessName })
    }

    console.log(`✅ Successfully seeded ${seededProviders.length} service providers`)
    return {
      message: "Service providers seeded successfully",
      providers: seededProviders,
    }
  },
})

/*************************************************************************/
/*  PROPERTY SEEDING
/*************************************************************************/

export const seedProperties = mutation({
  args: {},
  handler: async ctx => {
    console.log("🌱 Seeding sample properties...")

    const existingProperties = await ctx.db.query("properties").collect()
    if (existingProperties.length > 0) {
      console.log(
        `⚠️  ${existingProperties.length} properties already exist. Skipping...`
      )
      return { message: "Properties already seeded", count: existingProperties.length }
    }

    const seededProperties = []

    for (const property of sampleProperties) {
      const propertyId = await ctx.db.insert("properties", {
        address: property.address,
        coordinates: property.coordinates,
        propertyDetails: property.propertyDetails,
        valuation: property.valuation,
        stakeholders: property.stakeholders,
        status: property.status,
        createdAt: Date.now(),
      })

      seededProperties.push({
        id: propertyId,
        address: `${property.address.street}, ${property.address.suburb}`,
        price: property.valuation.estimatedValue,
      })
    }

    console.log(`✅ Successfully seeded ${seededProperties.length} properties`)
    return { message: "Properties seeded successfully", properties: seededProperties }
  },
})

/*************************************************************************/
/*  SIMPLIFIED MASTER SEEDING FUNCTION
/*************************************************************************/

export const seedAllData = mutation({
  args: {},
  handler: async ctx => {
    console.log("🌱 Starting comprehensive database seeding...")

    try {
      // Check if already seeded
      const existingProviders = await ctx.db.query("providers").collect()
      const existingProperties = await ctx.db.query("properties").collect()

      if (existingProviders.length > 0 || existingProperties.length > 0) {
        return {
          message: "Database already contains data",
          providers: existingProviders.length,
          properties: existingProperties.length,
          timestamp: Date.now(),
        }
      }

      // Seed service providers directly
      console.log("1️⃣ Seeding service providers...")
      const seededProviders = []

      for (const provider of serviceProviders) {
        const providerId = await ctx.db.insert("providers", {
          businessName: provider.businessName,
          serviceType: provider.serviceType,
          credentials: provider.credentials,
          serviceAreas: provider.serviceAreas,
          pricing: provider.pricing,
          ratings: provider.ratings,
          availability: provider.availability,
          status: provider.status,
          createdAt: Date.now(),
        })

        seededProviders.push({ id: providerId, name: provider.businessName })
      }

      // Seed properties directly
      console.log("2️⃣ Seeding sample properties...")
      const seededProperties = []

      for (const property of sampleProperties) {
        const propertyId = await ctx.db.insert("properties", {
          address: property.address,
          coordinates: property.coordinates,
          propertyDetails: property.propertyDetails,
          valuation: property.valuation,
          stakeholders: property.stakeholders,
          status: property.status,
          createdAt: Date.now(),
        })

        seededProperties.push({
          id: propertyId,
          address: `${property.address.street}, ${property.address.suburb}`,
          price: property.valuation.estimatedValue,
        })
      }

      console.log("🎉 Database seeding completed!")
      return {
        message: "Database seeding completed successfully",
        providers: seededProviders.length,
        properties: seededProperties.length,
        providersList: seededProviders.slice(0, 5), // Show first 5 for confirmation
        propertiesList: seededProperties.slice(0, 5), // Show first 5 for confirmation
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error("❌ Error during seeding:", error)
      throw new Error(
        `Seeding failed: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
  },
})
