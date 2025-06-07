/*************************************************************************/
/*  TRANSACTOR 2.0 - TRANSACTION MANAGEMENT FUNCTIONS
/*  Complete transaction lifecycle management with milestones
/*************************************************************************/

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

/*************************************************************************/
/*  TRANSACTION QUERIES
/*************************************************************************/

export const getTransaction = query({
  args: { transactionId: v.id("transactions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.transactionId)
  },
})

export const getTransactionsByProperty = query({
  args: {
    propertyId: v.id("properties"),
    status: v.optional(
      v.union(
        v.literal("planning"),
        v.literal("contract_signed"),
        v.literal("finance_pending"),
        v.literal("settled"),
        v.literal("cancelled")
      )
    ),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("transactions")
      .withIndex("by_property", q => q.eq("propertyId", args.propertyId))

    if (args.status) {
      queryBuilder = queryBuilder.filter(q => q.eq(q.field("status"), args.status))
    }

    return await queryBuilder.collect()
  },
})

export const getTransactionsByUser = query({
  args: {
    userId: v.id("users"),
    role: v.optional(
      v.union(
        v.literal("buyer"),
        v.literal("seller"),
        v.literal("conveyancer"),
        v.literal("broker"),
        v.literal("agent")
      )
    ),
    status: v.optional(
      v.union(
        v.literal("planning"),
        v.literal("contract_signed"),
        v.literal("finance_pending"),
        v.literal("settled"),
        v.literal("cancelled")
      )
    ),
  },
  handler: async (ctx, args) => {
    const allTransactions = await ctx.db.query("transactions").collect()

    const userTransactions = allTransactions.filter(
      transaction =>
        transaction.participants.some(
          participant =>
            participant.userId === args.userId &&
            (!args.role || participant.role === args.role) &&
            participant.status === "active"
        ) &&
        (!args.status || transaction.status === args.status)
    )

    return userTransactions
  },
})

export const getActiveTransactions = query({
  args: {},
  handler: async ctx => {
    return await ctx.db
      .query("transactions")
      .withIndex("by_status", q => q.eq("status", "contract_signed"))
      .collect()
  },
})

export const getTransactionTimeline = query({
  args: { transactionId: v.id("transactions") },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId)
    if (!transaction) {
      throw new Error(`Transaction ${args.transactionId} not found`)
    }

    const timeline = transaction.timeline
    const currentTime = Date.now()

    // Create milestone objects with status
    const milestones = [
      {
        name: "Contract Signed",
        date: timeline.contractDate,
        status: timeline.contractDate
          ? timeline.contractDate <= currentTime
            ? "completed"
            : "upcoming"
          : "pending",
        critical: true,
      },
      {
        name: "Cooling Off Expiry",
        date: timeline.coolOffExpiry,
        status: timeline.coolOffExpiry
          ? timeline.coolOffExpiry <= currentTime
            ? "completed"
            : "upcoming"
          : "pending",
        critical: true,
      },
      {
        name: "Finance Approval Due",
        date: timeline.financeApprovalDue,
        status: timeline.financeApprovalDue
          ? timeline.financeApprovalDue <= currentTime
            ? "overdue"
            : "upcoming"
          : "pending",
        critical: true,
      },
      {
        name: "Inspection Due",
        date: timeline.inspectionDue,
        status: timeline.inspectionDue
          ? timeline.inspectionDue <= currentTime
            ? "completed"
            : "upcoming"
          : "pending",
        critical: false,
      },
      {
        name: "Settlement",
        date: timeline.settlementDate,
        status: timeline.actualSettlement
          ? "completed"
          : timeline.settlementDate
            ? timeline.settlementDate <= currentTime
              ? "overdue"
              : "upcoming"
            : "pending",
        critical: true,
      },
    ]

    return {
      transactionId: args.transactionId,
      milestones,
      nextMilestone: milestones.find(
        m => m.status === "upcoming" || m.status === "pending"
      ),
      overdueMilestones: milestones.filter(m => m.status === "overdue"),
      progress:
        milestones.filter(m => m.status === "completed").length / milestones.length,
    }
  },
})

/*************************************************************************/
/*  TRANSACTION MUTATIONS
/*************************************************************************/

export const createTransaction = mutation({
  args: {
    propertyId: v.id("properties"),
    type: v.union(v.literal("purchase"), v.literal("sale"), v.literal("refinance")),
    participants: v.array(
      v.object({
        userId: v.id("users"),
        role: v.union(
          v.literal("buyer"),
          v.literal("seller"),
          v.literal("conveyancer"),
          v.literal("broker"),
          v.literal("agent")
        ),
        status: v.optional(
          v.union(v.literal("active"), v.literal("completed"), v.literal("withdrawn"))
        ),
      })
    ),
    financial: v.optional(
      v.object({
        purchasePrice: v.optional(v.number()),
        deposit: v.optional(v.number()),
        loanAmount: v.optional(v.number()),
        stampDuty: v.optional(v.number()),
        legalFee: v.optional(v.number()),
        otherCosts: v.optional(v.number()),
      })
    ),
    agentThreadId: v.id("agent_threads"),
  },
  handler: async (ctx, args) => {
    const transactionId = await ctx.db.insert("transactions", {
      propertyId: args.propertyId,
      type: args.type,
      participants: args.participants.map(p => ({
        ...p,
        status: p.status || "active",
      })),
      timeline: {},
      financial: args.financial || {},
      status: "planning",
      agentThreadId: args.agentThreadId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return { transactionId, success: true }
  },
})

export const updateTransactionTimeline = mutation({
  args: {
    transactionId: v.id("transactions"),
    timeline: v.object({
      contractDate: v.optional(v.number()),
      coolOffExpiry: v.optional(v.number()),
      financeApprovalDue: v.optional(v.number()),
      inspectionDue: v.optional(v.number()),
      settlementDate: v.optional(v.number()),
      actualSettlement: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId)
    if (!transaction) {
      throw new Error(`Transaction ${args.transactionId} not found`)
    }

    const updatedTimeline = {
      ...transaction.timeline,
      ...args.timeline,
    }

    await ctx.db.patch(args.transactionId, {
      timeline: updatedTimeline,
      updatedAt: Date.now(),
    })

    return { success: true }
  },
})

export const updateTransactionFinancials = mutation({
  args: {
    transactionId: v.id("transactions"),
    financial: v.object({
      purchasePrice: v.optional(v.number()),
      deposit: v.optional(v.number()),
      loanAmount: v.optional(v.number()),
      stampDuty: v.optional(v.number()),
      legalFee: v.optional(v.number()),
      otherCosts: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId)
    if (!transaction) {
      throw new Error(`Transaction ${args.transactionId} not found`)
    }

    const updatedFinancial = {
      ...transaction.financial,
      ...args.financial,
    }

    await ctx.db.patch(args.transactionId, {
      financial: updatedFinancial,
      updatedAt: Date.now(),
    })

    return { success: true }
  },
})

export const updateTransactionStatus = mutation({
  args: {
    transactionId: v.id("transactions"),
    status: v.union(
      v.literal("planning"),
      v.literal("contract_signed"),
      v.literal("finance_pending"),
      v.literal("settled"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId)
    if (!transaction) {
      throw new Error(`Transaction ${args.transactionId} not found`)
    }

    await ctx.db.patch(args.transactionId, {
      status: args.status,
      updatedAt: Date.now(),
    })

    return { success: true }
  },
})

export const addTransactionParticipant = mutation({
  args: {
    transactionId: v.id("transactions"),
    participant: v.object({
      userId: v.id("users"),
      role: v.union(
        v.literal("buyer"),
        v.literal("seller"),
        v.literal("conveyancer"),
        v.literal("broker"),
        v.literal("agent")
      ),
      status: v.optional(
        v.union(v.literal("active"), v.literal("completed"), v.literal("withdrawn"))
      ),
    }),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId)
    if (!transaction) {
      throw new Error(`Transaction ${args.transactionId} not found`)
    }

    // Check if participant already exists
    const existingParticipant = transaction.participants.find(
      p => p.userId === args.participant.userId && p.role === args.participant.role
    )

    if (existingParticipant) {
      throw new Error(
        `User already has role ${args.participant.role} in this transaction`
      )
    }

    const updatedParticipants = [
      ...transaction.participants,
      {
        ...args.participant,
        status: args.participant.status || "active",
      },
    ]

    await ctx.db.patch(args.transactionId, {
      participants: updatedParticipants,
      updatedAt: Date.now(),
    })

    return { success: true }
  },
})

export const updateParticipantStatus = mutation({
  args: {
    transactionId: v.id("transactions"),
    userId: v.id("users"),
    role: v.union(
      v.literal("buyer"),
      v.literal("seller"),
      v.literal("conveyancer"),
      v.literal("broker"),
      v.literal("agent")
    ),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("withdrawn")),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId)
    if (!transaction) {
      throw new Error(`Transaction ${args.transactionId} not found`)
    }

    const updatedParticipants = transaction.participants.map(participant => {
      if (participant.userId === args.userId && participant.role === args.role) {
        return { ...participant, status: args.status }
      }
      return participant
    })

    await ctx.db.patch(args.transactionId, {
      participants: updatedParticipants,
      updatedAt: Date.now(),
    })

    return { success: true }
  },
})

/*************************************************************************/
/*  MILESTONE MANAGEMENT FUNCTIONS
/*************************************************************************/

export const getUpcomingMilestones = query({
  args: {
    userId: v.optional(v.id("users")),
    days: v.optional(v.number()), // Next X days
  },
  handler: async (ctx, args) => {
    const daysAhead = args.days || 14 // Default 2 weeks
    const futureTime = Date.now() + daysAhead * 24 * 60 * 60 * 1000
    const currentTime = Date.now()

    let transactions

    if (args.userId) {
      // Get user-specific transactions
      const allTransactions = await ctx.db.query("transactions").collect()
      transactions = allTransactions.filter(transaction =>
        transaction.participants.some(
          participant =>
            participant.userId === args.userId && participant.status === "active"
        )
      )
    } else {
      // Get all active transactions
      transactions = await ctx.db.query("transactions").collect()
    }

    const upcomingMilestones = []

    for (const transaction of transactions) {
      const timeline = transaction.timeline

      // Check each milestone type
      if (
        timeline.coolOffExpiry &&
        timeline.coolOffExpiry > currentTime &&
        timeline.coolOffExpiry <= futureTime
      ) {
        upcomingMilestones.push({
          transactionId: transaction._id,
          propertyId: transaction.propertyId,
          type: "Cooling Off Expiry",
          date: timeline.coolOffExpiry,
          daysUntil: Math.ceil(
            (timeline.coolOffExpiry - currentTime) / (24 * 60 * 60 * 1000)
          ),
          critical: true,
        })
      }

      if (
        timeline.financeApprovalDue &&
        timeline.financeApprovalDue > currentTime &&
        timeline.financeApprovalDue <= futureTime
      ) {
        upcomingMilestones.push({
          transactionId: transaction._id,
          propertyId: transaction.propertyId,
          type: "Finance Approval Due",
          date: timeline.financeApprovalDue,
          daysUntil: Math.ceil(
            (timeline.financeApprovalDue - currentTime) / (24 * 60 * 60 * 1000)
          ),
          critical: true,
        })
      }

      if (
        timeline.inspectionDue &&
        timeline.inspectionDue > currentTime &&
        timeline.inspectionDue <= futureTime
      ) {
        upcomingMilestones.push({
          transactionId: transaction._id,
          propertyId: transaction.propertyId,
          type: "Inspection Due",
          date: timeline.inspectionDue,
          daysUntil: Math.ceil(
            (timeline.inspectionDue - currentTime) / (24 * 60 * 60 * 1000)
          ),
          critical: false,
        })
      }

      if (
        timeline.settlementDate &&
        timeline.settlementDate > currentTime &&
        timeline.settlementDate <= futureTime
      ) {
        upcomingMilestones.push({
          transactionId: transaction._id,
          propertyId: transaction.propertyId,
          type: "Settlement",
          date: timeline.settlementDate,
          daysUntil: Math.ceil(
            (timeline.settlementDate - currentTime) / (24 * 60 * 60 * 1000)
          ),
          critical: true,
        })
      }
    }

    // Sort by date
    upcomingMilestones.sort((a, b) => a.date - b.date)

    return upcomingMilestones
  },
})

export const getOverdueMilestones = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const currentTime = Date.now()

    let transactions

    if (args.userId) {
      const allTransactions = await ctx.db.query("transactions").collect()
      transactions = allTransactions.filter(transaction =>
        transaction.participants.some(
          participant =>
            participant.userId === args.userId && participant.status === "active"
        )
      )
    } else {
      transactions = await ctx.db.query("transactions").collect()
    }

    const overdueMilestones = []

    for (const transaction of transactions) {
      const timeline = transaction.timeline

      // Only check critical milestones that are overdue
      if (
        timeline.financeApprovalDue &&
        timeline.financeApprovalDue < currentTime &&
        transaction.status !== "settled" &&
        transaction.status !== "cancelled"
      ) {
        overdueMilestones.push({
          transactionId: transaction._id,
          propertyId: transaction.propertyId,
          type: "Finance Approval Due",
          date: timeline.financeApprovalDue,
          daysOverdue: Math.floor(
            (currentTime - timeline.financeApprovalDue) / (24 * 60 * 60 * 1000)
          ),
          critical: true,
        })
      }

      if (
        timeline.settlementDate &&
        timeline.settlementDate < currentTime &&
        !timeline.actualSettlement &&
        transaction.status !== "settled" &&
        transaction.status !== "cancelled"
      ) {
        overdueMilestones.push({
          transactionId: transaction._id,
          propertyId: transaction.propertyId,
          type: "Settlement",
          date: timeline.settlementDate,
          daysOverdue: Math.floor(
            (currentTime - timeline.settlementDate) / (24 * 60 * 60 * 1000)
          ),
          critical: true,
        })
      }
    }

    return overdueMilestones
  },
})

/*************************************************************************/
/*  TRANSACTION ANALYTICS FUNCTIONS
/*************************************************************************/

export const getTransactionStats = query({
  args: {},
  handler: async ctx => {
    const transactions = await ctx.db.query("transactions").collect()

    const stats = {
      total: transactions.length,
      byStatus: {} as Record<string, number>,
      byType: {} as Record<string, number>,
      averageTimeToSettlement: 0,
      totalValue: 0,
      activeTransactions: 0,
    }

    let totalValue = 0
    let settledTransactions = 0
    let totalSettlementTime = 0

    transactions.forEach(transaction => {
      // Count by status
      stats.byStatus[transaction.status] = (stats.byStatus[transaction.status] || 0) + 1

      // Count by type
      stats.byType[transaction.type] = (stats.byType[transaction.type] || 0) + 1

      // Calculate total value
      if (transaction.financial.purchasePrice) {
        totalValue += transaction.financial.purchasePrice
      }

      // Calculate average settlement time
      if (transaction.timeline.contractDate && transaction.timeline.actualSettlement) {
        totalSettlementTime +=
          transaction.timeline.actualSettlement - transaction.timeline.contractDate
        settledTransactions++
      }

      // Count active transactions
      if (
        transaction.status === "contract_signed" ||
        transaction.status === "finance_pending"
      ) {
        stats.activeTransactions++
      }
    })

    stats.totalValue = totalValue
    stats.averageTimeToSettlement =
      settledTransactions > 0
        ? Math.round(totalSettlementTime / settledTransactions / (24 * 60 * 60 * 1000))
        : 0 // Convert to days

    return stats
  },
})
