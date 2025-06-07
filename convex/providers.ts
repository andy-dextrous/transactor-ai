/*************************************************************************/
/*  TRANSACTOR 2.0 - PROVIDER MATCHING AND QUOTES
/*  Service provider discovery, matching, and quote management
/*************************************************************************/

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

/*************************************************************************/
/*  PROVIDER QUERIES
/*************************************************************************/

export const getProvider = query({
  args: { providerId: v.id("providers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.providerId)
  },
})

export const getProvidersByType = query({
  args: {
    type: v.union(
      v.literal("conveyancer"),
      v.literal("broker"),
      v.literal("inspector"),
      v.literal("valuer"),
      v.literal("agent"),
      v.literal("accountant"),
      v.literal("removalist")
    ),
    location: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("providers")
      .filter(q => q.eq(q.field("type"), args.type))

    if (args.location) {
      queryBuilder = queryBuilder.filter(q =>
        q.or(
          q.eq(q.field("location.state"), args.location),
          q.eq(q.field("location.city"), args.location),
          q.eq(q.field("location.suburb"), args.location)
        )
      )
    }

    if (args.limit) {
      return await queryBuilder.take(args.limit)
    }

    return await queryBuilder.collect()
  },
})

export const searchProviders = query({
  args: {
    filters: v.object({
      type: v.optional(
        v.union(
          v.literal("conveyancer"),
          v.literal("broker"),
          v.literal("inspector"),
          v.literal("valuer"),
          v.literal("agent"),
          v.literal("accountant"),
          v.literal("removalist")
        )
      ),
      location: v.optional(
        v.object({
          state: v.optional(v.string()),
          city: v.optional(v.string()),
          suburb: v.optional(v.string()),
          postcode: v.optional(v.string()),
        })
      ),
      specializations: v.optional(v.array(v.string())),
      rating: v.optional(
        v.object({
          min: v.number(),
          max: v.optional(v.number()),
        })
      ),
      priceRange: v.optional(
        v.object({
          min: v.optional(v.number()),
          max: v.optional(v.number()),
        })
      ),
      availability: v.optional(
        v.union(
          v.literal("immediate"),
          v.literal("within_week"),
          v.literal("within_month")
        )
      ),
    }),
    sortBy: v.optional(
      v.union(
        v.literal("rating"),
        v.literal("price"),
        v.literal("distance"),
        v.literal("reviews")
      )
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { filters, sortBy = "rating", limit = 20 } = args

    const allProviders = await ctx.db.query("providers").collect()

    const filteredProviders = allProviders.filter(provider => {
      // Type filter
      if (filters.type && provider.type !== filters.type) {
        return false
      }

      // Location filters
      if (filters.location) {
        const location = filters.location
        if (location.state && provider.location?.state !== location.state) {
          return false
        }
        if (location.city && provider.location?.city !== location.city) {
          return false
        }
        if (location.suburb && provider.location?.suburb !== location.suburb) {
          return false
        }
        if (location.postcode && provider.location?.postcode !== location.postcode) {
          return false
        }
      }

      // Specializations filter
      if (filters.specializations && filters.specializations.length > 0) {
        const hasSpecialization = filters.specializations.some(spec =>
          provider.specializations?.includes(spec)
        )
        if (!hasSpecialization) {
          return false
        }
      }

      // Rating filter
      if (filters.rating) {
        if ((provider.rating || 0) < filters.rating.min) {
          return false
        }
        if (filters.rating.max && (provider.rating || 0) > filters.rating.max) {
          return false
        }
      }

      // Price range filter
      if (filters.priceRange && provider.pricing.baseRate) {
        if (
          filters.priceRange.min &&
          provider.pricing.baseRate < filters.priceRange.min
        ) {
          return false
        }
        if (
          filters.priceRange.max &&
          provider.pricing.baseRate > filters.priceRange.max
        ) {
          return false
        }
      }

      return true
    })

    // Sort providers
    filteredProviders.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "price":
          return (a.pricing.baseRate || 0) - (b.pricing.baseRate || 0)
        case "reviews":
          return (b.totalReviews || 0) - (a.totalReviews || 0)
        default:
          return (b.rating || 0) - (a.rating || 0)
      }
    })

    return filteredProviders.slice(0, limit)
  },
})

export const createQuoteRequest = mutation({
  args: {
    userId: v.id("users"),
    propertyId: v.optional(v.id("properties")),
    transactionId: v.optional(v.id("transactions")),
    providerId: v.id("providers"),
    serviceDetails: v.object({
      type: v.union(
        v.literal("conveyancer"),
        v.literal("broker"),
        v.literal("inspector"),
        v.literal("valuer"),
        v.literal("agent"),
        v.literal("accountant"),
        v.literal("removalist")
      ),
      requirements: v.string(),
      timeline: v.optional(v.string()),
      budget: v.optional(
        v.object({
          min: v.number(),
          max: v.number(),
        })
      ),
      urgency: v.optional(
        v.union(v.literal("immediate"), v.literal("within_week"), v.literal("flexible"))
      ),
    }),
    contactPreferences: v.object({
      method: v.union(v.literal("email"), v.literal("phone"), v.literal("both")),
      timeFrame: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const requestId = await ctx.db.insert("quotes", {
      transactionId: args.transactionId,
      providerId: args.providerId,
      requestedBy: args.userId,
      userId: args.userId,
      serviceType: args.serviceDetails.type,
      scope: {
        description: args.serviceDetails.requirements,
        requirements: [args.serviceDetails.requirements],
        timeline: args.serviceDetails.timeline || "To be discussed",
        specialConditions: args.serviceDetails.urgency
          ? [args.serviceDetails.urgency]
          : undefined,
      },
      pricing: {
        totalFee: 0, // To be provided by provider
        breakdown: {},
        paymentTerms: "To be discussed",
        validUntil: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      },
      status: "pending",
      proposedTimeline: {
        startDate: Date.now(),
        milestones: [],
        completionDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days default
      },
      createdAt: Date.now(),
    })

    return { requestId, success: true }
  },
})

export const getQuoteRequests = query({
  args: {
    userId: v.optional(v.id("users")),
    providerId: v.optional(v.id("providers")),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("partially_completed"),
        v.literal("completed"),
        v.literal("cancelled")
      )
    ),
  },
  handler: async (ctx, args) => {
    let quotes = await ctx.db.query("quotes").collect()

    if (args.userId) {
      quotes = quotes.filter(quote => quote.userId === args.userId)
    }

    if (args.providerId) {
      quotes = quotes.filter(quote =>
        quote.providers?.some((p: any) => p.providerId === args.providerId)
      )
    }

    if (args.status) {
      quotes = quotes.filter(quote => quote.status === args.status)
    }

    return quotes
  },
})
