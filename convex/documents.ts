/*************************************************************************/
/*  TRANSACTOR 2.0 - DOCUMENT MANAGEMENT
/*  File upload, document workflow, and transaction documentation
/*************************************************************************/

import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

/*************************************************************************/
/*  DOCUMENT QUERIES
/*************************************************************************/

export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.documentId)
  },
})

export const getDocumentsByTransaction = query({
  args: {
    transactionId: v.id("transactions"),
    category: v.optional(
      v.union(
        v.literal("contract"),
        v.literal("finance"),
        v.literal("inspection"),
        v.literal("legal"),
        v.literal("insurance"),
        v.literal("settlement"),
        v.literal("other")
      )
    ),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("uploaded"),
        v.literal("verified"),
        v.literal("approved"),
        v.literal("rejected")
      )
    ),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("documents")
      .filter(q => q.eq(q.field("transactionId"), args.transactionId))
      .order("desc")

    if (args.category) {
      queryBuilder = queryBuilder.filter(q => q.eq(q.field("category"), args.category))
    }

    if (args.status) {
      queryBuilder = queryBuilder.filter(q => q.eq(q.field("status"), args.status))
    }

    return await queryBuilder.collect()
  },
})

export const getDocumentsByUser = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const queryBuilder = ctx.db
      .query("documents")
      .filter(q => q.eq(q.field("uploadedBy"), args.userId))
      .order("desc")

    if (args.limit) {
      return await queryBuilder.take(args.limit)
    }

    return await queryBuilder.collect()
  },
})

export const getRequiredDocuments = query({
  args: {
    transactionId: v.id("transactions"),
    phase: v.union(
      v.literal("contract"),
      v.literal("finance"),
      v.literal("pre_settlement"),
      v.literal("settlement")
    ),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.transactionId)
    if (!transaction) {
      throw new Error(`Transaction ${args.transactionId} not found`)
    }

    // Get document requirements based on transaction phase
    const requirements = getDocumentRequirements(args.phase, transaction.type)

    // Get existing documents
    const existingDocs = await ctx.db
      .query("documents")
      .filter(q => q.eq(q.field("transactionId"), args.transactionId))
      .collect()

    // Map requirements to status
    const documentStatus = requirements.map(req => {
      const existingDoc = existingDocs.find(
        doc => doc.category === req.category && doc.subcategory === req.subcategory
      )

      return {
        ...req,
        status: existingDoc ? existingDoc.status : "pending",
        documentId: existingDoc?._id,
        uploadedAt: existingDoc?.uploadedAt,
      }
    })

    return {
      phase: args.phase,
      transactionType: transaction.type,
      requirements: documentStatus,
      completionRate: Math.round(
        (documentStatus.filter(r => r.status === "approved").length /
          requirements.length) *
          100
      ),
    }
  },
})

export const getWorkflowStatus = query({
  args: { workflowId: v.id("workflows") },
  handler: async (ctx, args) => {
    const workflow = await ctx.db.get(args.workflowId)
    if (!workflow) {
      throw new Error(`Workflow ${args.workflowId} not found`)
    }

    // Get related documents
    const documents = await ctx.db
      .query("documents")
      .filter(q => q.eq(q.field("workflowId"), args.workflowId))
      .collect()

    // Calculate progress
    const totalSteps = workflow.steps.length
    const completedSteps = workflow.steps.filter(
      step => step.status === "completed"
    ).length
    const progress = Math.round((completedSteps / totalSteps) * 100)

    return {
      ...workflow,
      documents,
      progress,
      nextStep: workflow.steps.find(step => step.status === "pending"),
    }
  },
})

/*************************************************************************/
/*  DOCUMENT MUTATIONS
/*************************************************************************/

export const uploadDocument = mutation({
  args: {
    transactionId: v.optional(v.id("transactions")),
    workflowId: v.optional(v.id("workflows")),
    uploadedBy: v.id("users"),
    fileName: v.string(),
    fileSize: v.number(),
    mimeType: v.string(),
    category: v.union(
      v.literal("contract"),
      v.literal("finance"),
      v.literal("inspection"),
      v.literal("legal"),
      v.literal("insurance"),
      v.literal("settlement"),
      v.literal("other")
    ),
    subcategory: v.optional(v.string()),
    description: v.optional(v.string()),
    fileUrl: v.string(), // URL where file is stored (e.g., Convex file storage)
    metadata: v.optional(
      v.object({
        pages: v.optional(v.number()),
        version: v.optional(v.string()),
        originalFileName: v.optional(v.string()),
        extractedText: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const documentId = await ctx.db.insert("documents", {
      transactionId: args.transactionId,
      workflowId: args.workflowId,
      uploadedBy: args.uploadedBy,
      type: "id_document", // Default type, should be passed as arg
      filename: args.fileName,
      fileName: args.fileName,
      fileSize: args.fileSize,
      mimeType: args.mimeType,
      fileUrl: args.fileUrl,
      category: args.category,
      subcategory: args.subcategory,
      description: args.description,
      status: "uploaded",
      uploadedAt: Date.now(),
      createdAt: Date.now(),
      permissions: [],
      aiAnalysis: {
        summary: "",
        keyPoints: [],
        riskFlags: [],
        complianceStatus: "requires_review",
        confidence: 0,
        lastAnalyzed: Date.now(),
      },
    })

    return { documentId, success: true }
  },
})

export const updateDocumentStatus = mutation({
  args: {
    documentId: v.id("documents"),
    status: v.union(
      v.literal("pending"),
      v.literal("uploaded"),
      v.literal("verified"),
      v.literal("approved"),
      v.literal("rejected")
    ),
    reviewedBy: v.optional(v.id("users")),
    reviewNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId)
    if (!document) {
      throw new Error(`Document ${args.documentId} not found`)
    }

    const updates: any = {
      status: args.status,
      updatedAt: Date.now(),
    }

    if (args.reviewedBy) {
      updates.reviewedBy = args.reviewedBy
      updates.reviewedAt = Date.now()
    }

    if (args.reviewNotes) {
      updates.reviewNotes = args.reviewNotes
    }

    await ctx.db.patch(args.documentId, updates)

    return { success: true }
  },
})

export const createWorkflow = mutation({
  args: {
    transactionId: v.id("transactions"),
    createdBy: v.id("users"),
    type: v.union(
      v.literal("document_collection"),
      v.literal("approval_process"),
      v.literal("compliance_check"),
      v.literal("settlement_preparation")
    ),
    title: v.string(),
    description: v.optional(v.string()),
    steps: v.array(
      v.object({
        stepId: v.string(),
        title: v.string(),
        description: v.optional(v.string()),
        assignedTo: v.optional(v.id("users")),
        dueDate: v.optional(v.number()),
        status: v.union(
          v.literal("pending"),
          v.literal("in_progress"),
          v.literal("completed"),
          v.literal("skipped")
        ),
        requirements: v.optional(v.array(v.string())),
      })
    ),
    priority: v.optional(
      v.union(
        v.literal("low"),
        v.literal("medium"),
        v.literal("high"),
        v.literal("urgent")
      )
    ),
  },
  handler: async (ctx, args) => {
    const mappedSteps = args.steps.map((step, index) => ({
      id: step.stepId,
      stepId: step.stepId,
      name: step.title,
      title: step.title,
      description: step.description,
      details: step.description,
      assignedTo: step.assignedTo,
      dueDate: step.dueDate,
      status: step.status,
      dependencies: [],
      requirements: step.requirements || [],
      automationLevel: "manual" as const,
      notes: "",
      updatedBy: undefined,
      updatedAt: undefined,
    }))

    const workflowId = await ctx.db.insert("workflows", {
      transactionId: args.transactionId,
      type: args.type,
      currentStep: mappedSteps[0]?.id || "start",
      steps: mappedSteps,
      milestones: [],
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return { workflowId, success: true }
  },
})

export const updateWorkflowStep = mutation({
  args: {
    workflowId: v.id("workflows"),
    stepId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("skipped")
    ),
    updatedBy: v.id("users"),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const workflow = await ctx.db.get(args.workflowId)
    if (!workflow) {
      throw new Error(`Workflow ${args.workflowId} not found`)
    }

    const updatedSteps = workflow.steps.map(step => {
      if (step.stepId === args.stepId) {
        return {
          ...step,
          status: args.status,
          updatedBy: args.updatedBy,
          updatedAt: Date.now(),
          ...(args.notes && { notes: args.notes }),
        }
      }
      return step
    })

    // Check if workflow is complete
    const allCompleted = updatedSteps.every(
      step => step.status === "completed" || step.status === "skipped"
    )

    await ctx.db.patch(args.workflowId, {
      steps: updatedSteps,
      status: allCompleted ? "completed" : workflow.status,
      updatedAt: Date.now(),
    })

    return { success: true }
  },
})

/*************************************************************************/
/*  DOCUMENT VALIDATION AND PROCESSING
/*************************************************************************/

export const validateDocument = mutation({
  args: {
    documentId: v.id("documents"),
    validatedBy: v.id("users"),
    validationRules: v.array(
      v.object({
        rule: v.string(),
        passed: v.boolean(),
        message: v.optional(v.string()),
      })
    ),
    extractedData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId)
    if (!document) {
      throw new Error(`Document ${args.documentId} not found`)
    }

    const allRulesPassed = args.validationRules.every(rule => rule.passed)

    await ctx.db.patch(args.documentId, {
      status: allRulesPassed ? "verified" : "rejected",
      aiAnalysis: {
        ...document.aiAnalysis,
        complianceStatus: allRulesPassed ? "compliant" : "non_compliant",
        lastAnalyzed: Date.now(),
      },
    })

    return { success: true, validationPassed: allRulesPassed }
  },
})

export const generateDocumentSummary = query({
  args: {
    transactionId: v.id("transactions"),
    includeContent: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .filter(q => q.eq(q.field("transactionId"), args.transactionId))
      .collect()

    const summary = {
      totalDocuments: documents.length,
      byCategory: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
      recentActivity: [] as any[],
      missingDocuments: [] as string[],
      filesSizeTotal: 0,
    }

    documents.forEach(doc => {
      // Count by category
      summary.byCategory[doc.category || ""] =
        (summary.byCategory[doc.category || ""] || 0) + 1

      // Count by status
      summary.byStatus[doc.status] = (summary.byStatus[doc.status] || 0) + 1

      // Total file size
      summary.filesSizeTotal += doc.fileSize

      // Recent activity (last 7 days)
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      if (doc.uploadedAt && doc.uploadedAt > weekAgo) {
        summary.recentActivity.push({
          documentId: doc._id,
          fileName: doc.fileName,
          category: doc.category,
          status: doc.status,
          uploadedAt: doc.uploadedAt,
        })
      }
    })

    // Sort recent activity by date
    summary.recentActivity.sort((a, b) => b.uploadedAt - a.uploadedAt)

    // Include document details if requested
    if (args.includeContent) {
      return {
        ...summary,
        documents: documents.map(doc => ({
          _id: doc._id,
          fileName: doc.fileName,
          category: doc.category,
          subcategory: doc.subcategory,
          status: doc.status,
          uploadedAt: doc.uploadedAt,
          fileSize: doc.fileSize,
          description: doc.description,
        })),
      }
    }

    return summary
  },
})

/*************************************************************************/
/*  UTILITY FUNCTIONS
/*************************************************************************/

function getDocumentRequirements(phase: string, transactionType: string) {
  const baseRequirements = [
    {
      category: "legal",
      subcategory: "contract",
      title: "Contract of Sale",
      mandatory: true,
    },
    {
      category: "legal",
      subcategory: "identification",
      title: "Photo ID",
      mandatory: true,
    },
  ]

  switch (phase) {
    case "contract":
      return [
        ...baseRequirements,
        {
          category: "finance",
          subcategory: "pre_approval",
          title: "Finance Pre-approval",
          mandatory: false,
        },
        {
          category: "inspection",
          subcategory: "building",
          title: "Building Inspection",
          mandatory: false,
        },
        {
          category: "inspection",
          subcategory: "pest",
          title: "Pest Inspection",
          mandatory: false,
        },
      ]

    case "finance":
      return [
        {
          category: "finance",
          subcategory: "application",
          title: "Loan Application",
          mandatory: true,
        },
        {
          category: "finance",
          subcategory: "payslips",
          title: "Recent Payslips",
          mandatory: true,
        },
        {
          category: "finance",
          subcategory: "bank_statements",
          title: "Bank Statements",
          mandatory: true,
        },
        {
          category: "finance",
          subcategory: "tax_returns",
          title: "Tax Returns",
          mandatory: true,
        },
        {
          category: "legal",
          subcategory: "valuation",
          title: "Property Valuation",
          mandatory: true,
        },
      ]

    case "pre_settlement":
      return [
        {
          category: "finance",
          subcategory: "approval",
          title: "Finance Approval",
          mandatory: true,
        },
        {
          category: "insurance",
          subcategory: "building",
          title: "Building Insurance",
          mandatory: true,
        },
        {
          category: "legal",
          subcategory: "title_search",
          title: "Title Search",
          mandatory: true,
        },
        {
          category: "settlement",
          subcategory: "statement",
          title: "Settlement Statement",
          mandatory: true,
        },
      ]

    case "settlement":
      return [
        {
          category: "settlement",
          subcategory: "funds",
          title: "Settlement Funds",
          mandatory: true,
        },
        {
          category: "settlement",
          subcategory: "keys",
          title: "Property Keys",
          mandatory: true,
        },
        {
          category: "legal",
          subcategory: "title_transfer",
          title: "Title Transfer",
          mandatory: true,
        },
      ]

    default:
      return baseRequirements
  }
}
