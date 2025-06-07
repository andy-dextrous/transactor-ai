/*************************************************************************/
/*  TRANSACTOR 2.0 - PROPERTY MANAGEMENT FUNCTIONS
/*  Property search, management, and valuation functions
/*************************************************************************/

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

/*************************************************************************/
/*  PROPERTY QUERIES
/*************************************************************************/

export const getProperty = query({
  args: { propertyId: v.union(v.id("properties"), v.string()) },
  handler: async (ctx, args) => {
    // Handle empty string or invalid ID
    if (!args.propertyId || args.propertyId === "") {
      return null
    }

    // If it's a string, try to parse as ID
    if (typeof args.propertyId === "string") {
      try {
        const property = await ctx.db.get(args.propertyId as any)
        return property
      } catch {
        return null
      }
    }

    return await ctx.db.get(args.propertyId)
  },
})

export const getPropertiesBySuburb = query({
  args: {
    suburb: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const queryBuilder = ctx.db
      .query("properties")
      .withIndex("by_suburb", q => q.eq("address.suburb", args.suburb))

    if (args.limit) {
      return await queryBuilder.take(args.limit)
    }

    return await queryBuilder.collect()
  },
})

export const getPropertiesByPostcode = query({
  args: {
    postcode: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const queryBuilder = ctx.db
      .query("properties")
      .withIndex("by_postcode", q => q.eq("address.postcode", args.postcode))

    if (args.limit) {
      return await queryBuilder.take(args.limit)
    }

    return await queryBuilder.collect()
  },
})

export const getPropertiesByType = query({
  args: {
    type: v.union(
      v.literal("house"),
      v.literal("apartment"),
      v.literal("townhouse"),
      v.literal("land")
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("properties")
      .withIndex("by_type", q => q.eq("propertyDetails.type", args.type)) as any

    if (args.limit) {
      queryBuilder = queryBuilder.take(args.limit)
    }

    return await queryBuilder.collect()
  },
})

export const searchProperties = query({
  args: {
    filters: v.object({
      suburb: v.optional(v.string()),
      postcode: v.optional(v.string()),
      type: v.optional(
        v.union(
          v.literal("house"),
          v.literal("apartment"),
          v.literal("townhouse"),
          v.literal("land")
        )
      ),
      priceMin: v.optional(v.number()),
      priceMax: v.optional(v.number()),
      bedrooms: v.optional(v.number()),
      bathrooms: v.optional(v.number()),
      status: v.optional(
        v.union(
          v.literal("active"),
          v.literal("under_contract"),
          v.literal("settled"),
          v.literal("withdrawn")
        )
      ),
    }),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { filters, limit = 50, offset = 0 } = args

    // Start with all properties
    const allProperties = await ctx.db.query("properties").collect()

    // Apply filters
    const filteredProperties = allProperties.filter(property => {
      // Suburb filter
      if (
        filters.suburb &&
        !property.address.suburb.toLowerCase().includes(filters.suburb.toLowerCase())
      ) {
        return false
      }

      // Postcode filter
      if (filters.postcode && property.address.postcode !== filters.postcode) {
        return false
      }

      // Type filter
      if (filters.type && property.propertyDetails.type !== filters.type) {
        return false
      }

      // Price range filter
      if (filters.priceMin && property.valuation.estimatedValue < filters.priceMin) {
        return false
      }

      if (filters.priceMax && property.valuation.estimatedValue > filters.priceMax) {
        return false
      }

      // Bedrooms filter
      if (filters.bedrooms && property.propertyDetails.bedrooms !== filters.bedrooms) {
        return false
      }

      // Bathrooms filter
      if (filters.bathrooms && property.propertyDetails.bathrooms !== filters.bathrooms) {
        return false
      }

      // Status filter
      if (filters.status && property.status !== filters.status) {
        return false
      }

      return true
    })

    // Apply pagination
    const paginatedProperties = filteredProperties.slice(offset, offset + limit)

    return {
      properties: paginatedProperties,
      total: filteredProperties.length,
      hasMore: offset + limit < filteredProperties.length,
    }
  },
})

export const getPropertiesForUser = query({
  args: {
    userId: v.id("users"),
    role: v.optional(
      v.union(
        v.literal("owner"),
        v.literal("buyer"),
        v.literal("seller"),
        v.literal("agent"),
        v.literal("conveyancer")
      )
    ),
  },
  handler: async (ctx, args) => {
    const allProperties = await ctx.db.query("properties").collect()

    const userProperties = allProperties.filter(property =>
      property.stakeholders.some(
        stakeholder =>
          stakeholder.userId === args.userId &&
          (!args.role || stakeholder.role === args.role)
      )
    )

    return userProperties
  },
})

/*************************************************************************/
/*  PROPERTY MUTATIONS
/*************************************************************************/

export const createProperty = mutation({
  args: {
    address: v.object({
      street: v.string(),
      suburb: v.string(),
      state: v.string(),
      postcode: v.string(),
      country: v.literal("AU"),
    }),
    coordinates: v.object({
      lat: v.number(),
      lon: v.number(),
    }),
    propertyDetails: v.object({
      type: v.union(
        v.literal("house"),
        v.literal("apartment"),
        v.literal("townhouse"),
        v.literal("land")
      ),
      bedrooms: v.optional(v.number()),
      bathrooms: v.optional(v.number()),
      carSpaces: v.optional(v.number()),
      landSize: v.optional(v.number()),
      buildingSize: v.optional(v.number()),
      yearBuilt: v.optional(v.number()),
    }),
    valuation: v.object({
      estimatedValue: v.number(),
      source: v.union(v.literal("corelogic"), v.literal("domain"), v.literal("manual")),
      confidence: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    }),
    stakeholders: v.array(
      v.object({
        userId: v.id("users"),
        role: v.union(
          v.literal("owner"),
          v.literal("buyer"),
          v.literal("seller"),
          v.literal("agent"),
          v.literal("conveyancer")
        ),
        relationship: v.string(),
      })
    ),
    status: v.optional(
      v.union(
        v.literal("active"),
        v.literal("under_contract"),
        v.literal("settled"),
        v.literal("withdrawn")
      )
    ),
  },
  handler: async (ctx, args) => {
    const propertyId = await ctx.db.insert("properties", {
      address: args.address,
      coordinates: args.coordinates,
      propertyDetails: args.propertyDetails,
      valuation: {
        ...args.valuation,
        lastUpdated: Date.now(),
      },
      stakeholders: args.stakeholders,
      status: args.status || "active",
      createdAt: Date.now(),
    })

    return { propertyId, success: true }
  },
})

export const updateProperty = mutation({
  args: {
    propertyId: v.id("properties"),
    updates: v.object({
      address: v.optional(
        v.object({
          street: v.optional(v.string()),
          suburb: v.optional(v.string()),
          state: v.optional(v.string()),
          postcode: v.optional(v.string()),
        })
      ),
      coordinates: v.optional(
        v.object({
          lat: v.optional(v.number()),
          lon: v.optional(v.number()),
        })
      ),
      propertyDetails: v.optional(
        v.object({
          type: v.optional(
            v.union(
              v.literal("house"),
              v.literal("apartment"),
              v.literal("townhouse"),
              v.literal("land")
            )
          ),
          bedrooms: v.optional(v.number()),
          bathrooms: v.optional(v.number()),
          carSpaces: v.optional(v.number()),
          landSize: v.optional(v.number()),
          buildingSize: v.optional(v.number()),
          yearBuilt: v.optional(v.number()),
        })
      ),
      valuation: v.optional(
        v.object({
          estimatedValue: v.optional(v.number()),
          source: v.optional(
            v.union(v.literal("corelogic"), v.literal("domain"), v.literal("manual"))
          ),
          confidence: v.optional(
            v.union(v.literal("high"), v.literal("medium"), v.literal("low"))
          ),
        })
      ),
      status: v.optional(
        v.union(
          v.literal("active"),
          v.literal("under_contract"),
          v.literal("settled"),
          v.literal("withdrawn")
        )
      ),
    }),
  },
  handler: async (ctx, args) => {
    const property = await ctx.db.get(args.propertyId)
    if (!property) {
      throw new Error(`Property ${args.propertyId} not found`)
    }

    const updatedData: any = {}

    if (args.updates.address) {
      updatedData.address = {
        ...property.address,
        ...args.updates.address,
      }
    }

    if (args.updates.coordinates) {
      updatedData.coordinates = {
        ...property.coordinates,
        ...args.updates.coordinates,
      }
    }

    if (args.updates.propertyDetails) {
      updatedData.propertyDetails = {
        ...property.propertyDetails,
        ...args.updates.propertyDetails,
      }
    }

    if (args.updates.valuation) {
      updatedData.valuation = {
        ...property.valuation,
        ...args.updates.valuation,
        lastUpdated: Date.now(),
      }
    }

    if (args.updates.status) {
      updatedData.status = args.updates.status
    }

    await ctx.db.patch(args.propertyId, updatedData)
    return { success: true }
  },
})

export const addStakeholder = mutation({
  args: {
    propertyId: v.id("properties"),
    stakeholder: v.object({
      userId: v.id("users"),
      role: v.union(
        v.literal("owner"),
        v.literal("buyer"),
        v.literal("seller"),
        v.literal("agent"),
        v.literal("conveyancer")
      ),
      relationship: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const property = await ctx.db.get(args.propertyId)
    if (!property) {
      throw new Error(`Property ${args.propertyId} not found`)
    }

    // Check if stakeholder already exists
    const existingStakeholder = property.stakeholders.find(
      s => s.userId === args.stakeholder.userId && s.role === args.stakeholder.role
    )

    if (existingStakeholder) {
      throw new Error(`User already has role ${args.stakeholder.role} for this property`)
    }

    const updatedStakeholders = [...property.stakeholders, args.stakeholder]

    await ctx.db.patch(args.propertyId, {
      stakeholders: updatedStakeholders,
    })

    return { success: true }
  },
})

export const removeStakeholder = mutation({
  args: {
    propertyId: v.id("properties"),
    userId: v.id("users"),
    role: v.union(
      v.literal("owner"),
      v.literal("buyer"),
      v.literal("seller"),
      v.literal("agent"),
      v.literal("conveyancer")
    ),
  },
  handler: async (ctx, args) => {
    const property = await ctx.db.get(args.propertyId)
    if (!property) {
      throw new Error(`Property ${args.propertyId} not found`)
    }

    const updatedStakeholders = property.stakeholders.filter(
      s => !(s.userId === args.userId && s.role === args.role)
    )

    await ctx.db.patch(args.propertyId, {
      stakeholders: updatedStakeholders,
    })

    return { success: true }
  },
})

/*************************************************************************/
/*  PROPERTY ANALYTICS FUNCTIONS
/*************************************************************************/

export const getPropertyStats = query({
  args: {},
  handler: async ctx => {
    const properties = await ctx.db.query("properties").collect()

    const stats = {
      total: properties.length,
      byType: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
      averageValue: 0,
      priceRanges: {
        under500k: 0,
        "500k-750k": 0,
        "750k-1m": 0,
        over1m: 0,
      },
    }

    let totalValue = 0

    properties.forEach(property => {
      // Count by type
      stats.byType[property.propertyDetails.type] =
        (stats.byType[property.propertyDetails.type] || 0) + 1

      // Count by status
      stats.byStatus[property.status] = (stats.byStatus[property.status] || 0) + 1

      // Calculate price ranges
      const value = property.valuation.estimatedValue
      totalValue += value

      if (value < 500000) {
        stats.priceRanges.under500k++
      } else if (value < 750000) {
        stats.priceRanges["500k-750k"]++
      } else if (value < 1000000) {
        stats.priceRanges["750k-1m"]++
      } else {
        stats.priceRanges.over1m++
      }
    })

    stats.averageValue = properties.length > 0 ? totalValue / properties.length : 0

    return stats
  },
})

export const getSuburbProperties = query({
  args: { suburb: v.string() },
  handler: async (ctx, args) => {
    const properties = await ctx.db
      .query("properties")
      .withIndex("by_suburb", q => q.eq("address.suburb", args.suburb))
      .collect()

    if (properties.length === 0) {
      return null
    }

    const totalValue = properties.reduce((sum, p) => sum + p.valuation.estimatedValue, 0)
    const averageValue = totalValue / properties.length

    const typeCount = properties.reduce(
      (acc, p) => {
        acc[p.propertyDetails.type] = (acc[p.propertyDetails.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    return {
      suburb: args.suburb,
      totalProperties: properties.length,
      averageValue,
      medianValue: calculateMedian(properties.map(p => p.valuation.estimatedValue)),
      propertyTypes: typeCount,
      properties: properties,
    }
  },
})

/*************************************************************************/
/*  UTILITY FUNCTIONS
/*************************************************************************/

function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0

  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2
  } else {
    return sorted[mid]
  }
}
