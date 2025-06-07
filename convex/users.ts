/*************************************************************************/
/*  TRANSACTOR 2.0 - USER MANAGEMENT FUNCTIONS
/*  Complete user lifecycle management with role-based access
/*************************************************************************/

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

/*************************************************************************/
/*  USER QUERIES
/*************************************************************************/

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId)
  },
})

export const getUserByAuthId = query({
  args: { authId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_authId", q => q.eq("authId", args.authId))
      .unique()
  },
})

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .unique()
  },
})

export const getAllUsers = query({
  args: {
    role: v.optional(
      v.union(
        v.literal("buyer"),
        v.literal("seller"),
        v.literal("investor"),
        v.literal("conveyancer"),
        v.literal("broker"),
        v.literal("inspector")
      )
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db.query("users") as any

    if (args.role) {
      queryBuilder = queryBuilder.filter((q: any) => q.eq(q.field("role"), args.role))
    }

    if (args.limit) {
      queryBuilder = queryBuilder.take(args.limit)
    }

    return await queryBuilder.collect()
  },
})

/*************************************************************************/
/*  USER MUTATIONS
/*************************************************************************/

export const createUser = mutation({
  args: {
    authId: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    role: v.union(
      v.literal("buyer"),
      v.literal("seller"),
      v.literal("investor"),
      v.literal("conveyancer"),
      v.literal("broker"),
      v.literal("inspector")
    ),
    profile: v.object({
      firstName: v.string(),
      lastName: v.string(),
      preferredName: v.optional(v.string()),
      avatar: v.optional(v.string()),
    }),
    preferences: v.optional(
      v.object({
        notifications: v.object({
          email: v.boolean(),
          sms: v.boolean(),
          push: v.boolean(),
        }),
        timezone: v.string(),
        language: v.union(v.literal("en"), v.literal("zh"), v.literal("vi")),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_authId", q => q.eq("authId", args.authId))
      .unique()

    if (existingUser) {
      throw new Error(`User with authId ${args.authId} already exists`)
    }

    // Create user with defaults
    const userId = await ctx.db.insert("users", {
      authId: args.authId,
      email: args.email,
      phone: args.phone,
      role: args.role,
      profile: args.profile,
      preferences: args.preferences || {
        notifications: { email: true, sms: true, push: true },
        timezone: "Australia/Sydney",
        language: "en",
      },
      status: "active",
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    })

    return { userId, success: true }
  },
})

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    updates: v.object({
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      profile: v.optional(
        v.object({
          firstName: v.optional(v.string()),
          lastName: v.optional(v.string()),
          preferredName: v.optional(v.string()),
          avatar: v.optional(v.string()),
        })
      ),
      preferences: v.optional(
        v.object({
          notifications: v.optional(
            v.object({
              email: v.boolean(),
              sms: v.boolean(),
              push: v.boolean(),
            })
          ),
          timezone: v.optional(v.string()),
          language: v.optional(v.string()),
        })
      ),
      status: v.optional(
        v.union(v.literal("active"), v.literal("inactive"), v.literal("suspended"))
      ),
    }),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId)
    if (!user) {
      throw new Error(`User ${args.userId} not found`)
    }

    // Merge updates with existing data
    const updatedData: any = { lastActiveAt: Date.now() }

    if (args.updates.email) updatedData.email = args.updates.email
    if (args.updates.phone) updatedData.phone = args.updates.phone
    if (args.updates.status) updatedData.status = args.updates.status

    if (args.updates.profile) {
      updatedData.profile = {
        ...user.profile,
        ...args.updates.profile,
      }
    }

    if (args.updates.preferences) {
      updatedData.preferences = {
        ...user.preferences,
        ...args.updates.preferences,
        notifications: {
          ...user.preferences?.notifications,
          ...args.updates.preferences.notifications,
        },
      }
    }

    await ctx.db.patch(args.userId, updatedData)
    return { success: true }
  },
})

export const updateLastActive = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      lastActiveAt: Date.now(),
    })
    return { success: true }
  },
})

export const deactivateUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId)
    if (!user) {
      throw new Error(`User ${args.userId} not found`)
    }

    await ctx.db.patch(args.userId, {
      status: "inactive",
      lastActiveAt: Date.now(),
    })

    return { success: true }
  },
})

/*************************************************************************/
/*  USER ANALYTICS FUNCTIONS
/*************************************************************************/

export const getUserStats = query({
  args: {},
  handler: async ctx => {
    const users = await ctx.db.query("users").collect()

    const stats = {
      total: users.length,
      active: users.filter(u => u.status === "active").length,
      byRole: {} as Record<string, number>,
      recentlyActive: users.filter(
        u => u.lastActiveAt > Date.now() - 7 * 24 * 60 * 60 * 1000
      ).length,
    }

    // Count by role
    users.forEach(user => {
      stats.byRole[user.role] = (stats.byRole[user.role] || 0) + 1
    })

    return stats
  },
})

export const searchUsers = query({
  args: {
    searchTerm: v.string(),
    role: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let users = await ctx.db.query("users").collect()

    // Filter by role if specified
    if (args.role) {
      users = users.filter(user => user.role === args.role)
    }

    // Search in name and email
    const searchTerm = args.searchTerm.toLowerCase()
    users = users.filter(
      user =>
        user.email.toLowerCase().includes(searchTerm) ||
        user.profile.firstName.toLowerCase().includes(searchTerm) ||
        user.profile.lastName.toLowerCase().includes(searchTerm) ||
        (user.profile.preferredName &&
          user.profile.preferredName.toLowerCase().includes(searchTerm))
    )

    // Limit results
    if (args.limit) {
      users = users.slice(0, args.limit)
    }

    return users
  },
})
