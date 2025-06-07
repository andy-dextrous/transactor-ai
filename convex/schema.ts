import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

/*************************************************************************/
/*  TRANSACTOR 2.0 - COMPREHENSIVE CONVEX SCHEMA
/*  AI-Driven Property Concierge Platform
/*  Based on detailed data model from planning documentation
/*************************************************************************/

export default defineSchema({
  /*************************************************************************/
  /*  CORE ENTITY TABLES
  /*************************************************************************/

  // User Management
  users: defineTable({
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
    preferences: v.object({
      notifications: v.object({
        email: v.boolean(),
        sms: v.boolean(),
        push: v.boolean(),
      }),
      timezone: v.string(),
      language: v.union(v.literal("en"), v.literal("zh"), v.literal("vi")),
    }),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("suspended")),
    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_authId", ["authId"])
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  // Messages for conversation history
  messages: defineTable({
    body: v.string(),
    author: v.string(),
    threadId: v.optional(v.string()),
    userId: v.optional(v.id("users")),
    createdAt: v.number(),
  })
    .index("by_thread", ["threadId"])
    .index("by_user", ["userId"]),

  // Property Management
  properties: defineTable({
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
      lastUpdated: v.number(),
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
    status: v.union(
      v.literal("active"),
      v.literal("under_contract"),
      v.literal("settled"),
      v.literal("withdrawn")
    ),
    createdAt: v.number(),
  })
    .index("by_suburb", ["address.suburb"])
    .index("by_postcode", ["address.postcode"])
    .index("by_type", ["propertyDetails.type"])
    .index("by_status", ["status"]),

  // Transaction Management
  transactions: defineTable({
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
        status: v.union(
          v.literal("active"),
          v.literal("completed"),
          v.literal("withdrawn")
        ),
      })
    ),
    timeline: v.object({
      contractDate: v.optional(v.number()),
      coolOffExpiry: v.optional(v.number()),
      financeApprovalDue: v.optional(v.number()),
      inspectionDue: v.optional(v.number()),
      settlementDate: v.optional(v.number()),
      actualSettlement: v.optional(v.number()),
    }),
    financial: v.object({
      purchasePrice: v.optional(v.number()),
      deposit: v.optional(v.number()),
      loanAmount: v.optional(v.number()),
      stampDuty: v.optional(v.number()),
      legalFee: v.optional(v.number()),
      otherCosts: v.optional(v.number()),
    }),
    status: v.union(
      v.literal("planning"),
      v.literal("contract_signed"),
      v.literal("finance_pending"),
      v.literal("settled"),
      v.literal("cancelled")
    ),
    agentThreadId: v.id("agent_threads"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_property", ["propertyId"])
    .index("by_status", ["status"])
    .index("by_type", ["type"]),

  /*************************************************************************/
  /*  AI AGENT SYSTEM TABLES
  /*************************************************************************/

  // Agent Orchestration
  agent_threads: defineTable({
    transactionId: v.optional(v.id("transactions")),
    userId: v.id("users"),
    orchestratorAgentId: v.string(),
    activeAgents: v.array(
      v.object({
        agentType: v.union(
          v.literal("buyer"),
          v.literal("seller"),
          v.literal("finance"),
          v.literal("conveyancing"),
          v.literal("match"),
          v.literal("insights")
        ),
        agentId: v.string(),
        status: v.union(v.literal("active"), v.literal("paused"), v.literal("completed")),
        context: v.any(), // Agent-specific context
        memory: v.any(), // Persistent agent memory
      })
    ),
    currentPhase: v.union(
      v.literal("onboarding"),
      v.literal("search"),
      v.literal("contract"),
      v.literal("settlement"),
      v.literal("ownership")
    ),
    metadata: v.object({
      priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
      tags: v.array(v.string()),
      lastAgentActivity: v.number(),
    }),
    status: v.union(v.literal("active"), v.literal("archived")),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_transaction", ["transactionId"])
    .index("by_status", ["status"]),

  // Contextual Panel Management
  conversation_panels: defineTable({
    threadId: v.string(), // Convex agent thread ID
    userId: v.id("users"),
    currentContext: v.object({
      activeProperty: v.optional(
        v.object({
          id: v.string(),
          address: v.string(),
          price: v.number(),
          type: v.union(
            v.literal("target"),
            v.literal("current"),
            v.literal("comparison")
          ),
        })
      ),
      activeTransaction: v.optional(
        v.object({
          id: v.id("transactions"),
          phase: v.union(
            v.literal("search"),
            v.literal("contract"),
            v.literal("finance"),
            v.literal("settlement"),
            v.literal("ownership")
          ),
          priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
        })
      ),
      activeCalculations: v.array(
        v.object({
          toolName: v.string(),
          executionId: v.id("tool_executions"),
          priority: v.number(),
          displayType: v.union(v.literal("summary"), v.literal("detailed")),
        })
      ),
      pendingActions: v.array(
        v.object({
          actionType: v.union(
            v.literal("upload_document"),
            v.literal("contact_provider"),
            v.literal("approve_milestone"),
            v.literal("schedule_inspection")
          ),
          priority: v.union(
            v.literal("urgent"),
            v.literal("important"),
            v.literal("normal")
          ),
          dueDate: v.optional(v.number()),
          description: v.string(),
        })
      ),
    }),
    panelComponents: v.array(
      v.object({
        componentType: v.union(
          v.literal("PropertySummary"),
          v.literal("TransactionProgress"),
          v.literal("FinancialSummary"),
          v.literal("QuickActions"),
          v.literal("DocumentQuickAccess"),
          v.literal("CalculationResults"),
          v.literal("MilestoneAlerts"),
          v.literal("MarketInsights"),
          v.literal("CommunicationHub")
        ),
        priority: v.number(),
        isVisible: v.boolean(),
        config: v.any(), // Component-specific configuration
      })
    ),
    lastUpdated: v.number(),
    autoUpdated: v.boolean(), // Whether this was AI-updated or user-configured
  })
    .index("by_thread", ["threadId"])
    .index("by_user", ["userId"]),

  // Tool Definitions
  agent_tools: defineTable({
    toolName: v.string(),
    name: v.optional(v.string()), // Alias for compatibility
    toolType: v.union(
      v.literal("calculator"),
      v.literal("search"),
      v.literal("document_analysis"),
      v.literal("valuation"),
      v.literal("comparison")
    ),
    description: v.string(),
    parameters: v.object({
      schema: v.any(), // Zod schema for tool parameters
      required: v.array(v.string()),
    }),
    handler: v.string(), // Reference to Convex function
    uiComponent: v.optional(v.string()), // Frontend component for tool result display
    category: v.union(
      v.literal("finance"),
      v.literal("financial"), // Alias for compatibility
      v.literal("legal"),
      v.literal("search"),
      v.literal("analysis"),
      v.literal("workflow"),
      v.literal("communication") // Additional category
    ),
    permissions: v.union(
      v.object({
        roles: v.array(v.string()), // User roles that can access this tool
        contextRequired: v.optional(v.array(v.string())), // Required context for tool execution
      }),
      v.array(v.string()) // For compatibility with functions expecting string array
    ),
    config: v.optional(v.any()), // Tool configuration
    usageCount: v.optional(v.number()), // Track usage
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_name", ["toolName"])
    .index("by_tool_name", ["name"])
    .index("by_category", ["category"])
    .index("by_type", ["toolType"]),

  // Tool Execution Tracking
  tool_executions: defineTable({
    threadId: v.string(), // Convex agent thread ID
    messageId: v.string(), // Convex agent message ID
    toolName: v.string(),
    parameters: v.any(),
    result: v.object({
      success: v.boolean(),
      data: v.optional(v.any()),
      error: v.optional(v.string()),
      displayComponent: v.optional(v.string()), // UI component to render result
      actions: v.optional(
        v.array(
          v.object({
            // Follow-up actions user can take
            label: v.string(),
            type: v.union(
              v.literal("navigate"),
              v.literal("download"),
              v.literal("share"),
              v.literal("save")
            ),
            target: v.string(),
          })
        )
      ),
    }),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("running"),
        v.literal("completed"),
        v.literal("failed")
      )
    ),
    executionTime: v.number(), // Milliseconds
    completedAt: v.optional(v.number()),
    input: v.optional(v.any()),
    context: v.optional(v.any()),
    toolConfig: v.optional(v.any()),
    userId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_thread", ["threadId"])
    .index("by_tool", ["toolName"])
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  // Conversation Context & Memory
  conversation_context: defineTable({
    threadId: v.string(), // Convex agent thread ID
    userId: v.id("users"),
    contextType: v.union(
      v.literal("user_preferences"),
      v.literal("transaction_state"),
      v.literal("tool_history"),
      v.literal("learning")
    ),
    data: v.object({
      // User preferences learned from conversation
      preferences: v.optional(
        v.object({
          propertyType: v.optional(v.string()),
          budget: v.optional(v.object({ min: v.number(), max: v.number() })),
          locations: v.optional(v.array(v.string())),
          priorities: v.optional(v.array(v.string())),
        })
      ),
      // Current transaction state
      transactionState: v.optional(
        v.object({
          phase: v.string(),
          activeWorkflows: v.array(v.string()),
          pendingActions: v.array(v.string()),
          keyDates: v.any(),
        })
      ),
      // Tool usage patterns for personalization
      toolUsage: v.optional(
        v.object({
          frequentTools: v.array(v.string()),
          lastUsed: v.any(),
          preferences: v.any(),
        })
      ),
    }),
    importance: v.union(v.literal("low"), v.literal("medium"), v.literal("high")), // For memory prioritization
    lastUpdated: v.number(),
    expiresAt: v.optional(v.number()), // For temporary context
  })
    .index("by_thread", ["threadId"])
    .index("by_user", ["userId"])
    .index("by_type", ["contextType"]),

  /*************************************************************************/
  /*  DOCUMENT & WORKFLOW TABLES
  /*************************************************************************/

  // Financial Profiles
  financial_profiles: defineTable({
    userId: v.id("users"),
    employment: v.object({
      status: v.union(
        v.literal("employed"),
        v.literal("self_employed"),
        v.literal("contractor"),
        v.literal("unemployed")
      ),
      income: v.object({
        gross: v.number(),
        net: v.number(),
        frequency: v.union(
          v.literal("weekly"),
          v.literal("fortnightly"),
          v.literal("monthly"),
          v.literal("annually")
        ),
      }),
      employer: v.optional(v.string()),
      yearsInRole: v.number(),
      stability: v.union(
        v.literal("permanent"),
        v.literal("contract"),
        v.literal("casual")
      ),
    }),
    assets: v.object({
      savings: v.number(),
      propertyEquity: v.number(),
      superannuation: v.number(),
      other: v.number(),
    }),
    liabilities: v.object({
      creditCards: v.number(),
      personalLoans: v.number(),
      existingMortgage: v.number(),
      other: v.number(),
    }),
    borrowingCapacity: v.object({
      amount: v.number(),
      calculatedAt: v.number(),
      assumptions: v.any(),
      stressTestPassed: v.boolean(),
    }),
    creditScore: v.optional(
      v.object({
        score: v.number(),
        provider: v.string(),
        lastUpdated: v.number(),
      })
    ),
    firstHomeBuyer: v.boolean(),
    governmentGrants: v.object({
      eligible: v.array(v.string()),
      applied: v.array(v.string()),
      received: v.array(v.string()),
    }),
    lastUpdated: v.number(),
    verified: v.boolean(),
  }).index("by_user", ["userId"]),

  // Document Management
  documents: defineTable({
    transactionId: v.optional(v.id("transactions")),
    uploadedBy: v.id("users"),
    type: v.union(
      v.literal("contract"),
      v.literal("building_report"),
      v.literal("pest_report"),
      v.literal("bank_statement"),
      v.literal("payslip"),
      v.literal("id_document")
    ),
    filename: v.string(),
    fileName: v.string(), // Alias for compatibility
    fileUrl: v.string(), // Convex file storage URL
    mimeType: v.string(),
    fileSize: v.number(),
    category: v.optional(v.string()),
    subcategory: v.optional(v.string()),
    description: v.optional(v.string()),
    workflowId: v.optional(v.string()),
    uploadedAt: v.optional(v.number()),
    aiAnalysis: v.object({
      summary: v.string(),
      keyPoints: v.array(v.string()),
      riskFlags: v.array(v.string()),
      complianceStatus: v.union(
        v.literal("compliant"),
        v.literal("requires_review"),
        v.literal("non_compliant")
      ),
      confidence: v.number(),
      lastAnalyzed: v.number(),
    }),
    status: v.union(
      v.literal("uploaded"),
      v.literal("analyzing"),
      v.literal("analyzed"),
      v.literal("archived"),
      v.literal("verified"),
      v.literal("rejected")
    ),
    permissions: v.array(
      v.object({
        userId: v.id("users"),
        canView: v.boolean(),
        canEdit: v.boolean(),
        canShare: v.boolean(),
      })
    ),
    createdAt: v.number(),
  })
    .index("by_transaction", ["transactionId"])
    .index("by_type", ["type"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_workflow", ["workflowId"]),

  // Workflow Management
  workflows: defineTable({
    transactionId: v.id("transactions"),
    type: v.union(
      v.literal("purchase_workflow"),
      v.literal("sale_workflow"),
      v.literal("finance_workflow"),
      v.literal("document_collection"),
      v.literal("approval_process"),
      v.literal("compliance_check"),
      v.literal("settlement_preparation")
    ),
    currentStep: v.string(),
    steps: v.array(
      v.object({
        id: v.string(),
        stepId: v.optional(v.string()), // Alias for compatibility
        name: v.string(),
        title: v.optional(v.string()), // Alias for compatibility
        description: v.optional(v.string()),
        details: v.optional(v.string()), // Alias for compatibility
        assignedTo: v.optional(v.id("users")),
        dueDate: v.optional(v.number()),
        status: v.union(
          v.literal("pending"),
          v.literal("in_progress"),
          v.literal("completed"),
          v.literal("blocked"),
          v.literal("skipped")
        ),
        dependencies: v.array(v.string()), // Step IDs this depends on
        requirements: v.optional(v.array(v.string())),
        aiAgent: v.optional(v.string()), // Agent responsible for automation
        automationLevel: v.union(
          v.literal("manual"),
          v.literal("assisted"),
          v.literal("automated")
        ),
        notes: v.optional(v.string()),
        updatedBy: v.optional(v.id("users")),
        updatedAt: v.optional(v.number()),
      })
    ),
    milestones: v.array(
      v.object({
        name: v.string(),
        targetDate: v.number(),
        actualDate: v.optional(v.number()),
        status: v.union(
          v.literal("upcoming"),
          v.literal("due"),
          v.literal("completed"),
          v.literal("overdue")
        ),
        criticalPath: v.boolean(),
      })
    ),
    status: v.union(
      v.literal("active"),
      v.literal("paused"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_transaction", ["transactionId"])
    .index("by_type", ["type"])
    .index("by_status", ["status"]),

  /*************************************************************************/
  /*  MARKETPLACE & PROVIDER TABLES
  /*************************************************************************/

  // Service Providers
  providers: defineTable({
    userId: v.optional(v.id("users")), // Optional for seeded providers
    businessName: v.string(),
    serviceType: v.union(
      v.literal("conveyancing"),
      v.literal("mortgage_broker"),
      v.literal("building_inspector"),
      v.literal("real_estate_agent")
    ),
    type: v.optional(v.string()), // Alias for serviceType for compatibility
    location: v.optional(
      v.object({
        state: v.optional(v.string()),
        city: v.optional(v.string()),
        suburb: v.optional(v.string()),
        postcode: v.optional(v.string()),
      })
    ),
    credentials: v.object({
      licenseNumber: v.optional(v.string()),
      accreditation: v.optional(v.array(v.string())),
      yearsExperience: v.number(),
      insuranceDetails: v.optional(v.string()),
    }),
    serviceAreas: v.array(v.string()), // Postcodes or regions
    specializations: v.optional(v.array(v.string())),
    pricing: v.object({
      feeStructure: v.union(
        v.literal("fixed"),
        v.literal("percentage"),
        v.literal("hourly")
      ),
      basePrice: v.optional(v.number()),
      baseRate: v.optional(v.number()), // Alias for compatibility
      priceRange: v.optional(v.object({ min: v.number(), max: v.number() })),
      details: v.string(),
    }),
    ratings: v.object({
      averageRating: v.number(),
      totalReviews: v.number(),
      responseTime: v.number(), // Average hours to respond
      completionRate: v.number(), // Percentage of successful completions
    }),
    rating: v.optional(v.number()), // Alias for averageRating for compatibility
    totalReviews: v.optional(v.number()), // Alias for ratings.totalReviews for compatibility
    availability: v.object({
      currentCapacity: v.number(),
      maxCapacity: v.number(),
      nextAvailable: v.number(),
    }),
    aiMatchScore: v.optional(v.number()), // Dynamic matching score for current query
    status: v.union(v.literal("active"), v.literal("busy"), v.literal("unavailable")),
    createdAt: v.number(),
  })
    .index("by_service_type", ["serviceType"])
    .index("by_type", ["type"])
    .index("by_rating", ["ratings.averageRating"])
    .index("by_status", ["status"]),

  // Quotes & Engagements
  quotes: defineTable({
    transactionId: v.optional(v.id("transactions")),
    providerId: v.id("providers"),
    requestedBy: v.id("users"),
    userId: v.optional(v.id("users")), // Alias for requestedBy for compatibility
    providers: v.optional(
      v.array(
        v.object({
          providerId: v.id("providers"),
          status: v.optional(v.string()),
        })
      )
    ), // For compatibility with some functions
    serviceType: v.string(),
    scope: v.object({
      description: v.string(),
      requirements: v.array(v.string()),
      timeline: v.string(),
      specialConditions: v.optional(v.array(v.string())),
    }),
    pricing: v.object({
      totalFee: v.number(),
      breakdown: v.any(),
      paymentTerms: v.string(),
      validUntil: v.number(),
    }),
    status: v.union(
      v.literal("pending"),
      v.literal("provided"),
      v.literal("accepted"),
      v.literal("declined"),
      v.literal("expired")
    ),
    proposedTimeline: v.object({
      startDate: v.number(),
      milestones: v.array(v.any()),
      completionDate: v.number(),
    }),
    createdAt: v.number(),
    respondedAt: v.optional(v.number()),
    acceptedAt: v.optional(v.number()),
  })
    .index("by_transaction", ["transactionId"])
    .index("by_provider", ["providerId"])
    .index("by_status", ["status"]),

  /*************************************************************************/
  /*  MARKET INTELLIGENCE TABLES
  /*************************************************************************/

  // Market Data
  market_data: defineTable({
    suburb: v.string(),
    postcode: v.string(),
    propertyType: v.union(
      v.literal("house"),
      v.literal("apartment"),
      v.literal("townhouse")
    ),
    metrics: v.object({
      medianPrice: v.number(),
      priceGrowth: v.object({
        quarterly: v.number(),
        yearly: v.number(),
        fiveYear: v.number(),
      }),
      salesVolume: v.number(),
      daysOnMarket: v.number(),
      auctionClearanceRate: v.optional(v.number()),
      rentalYield: v.optional(v.number()),
    }),
    demographics: v.object({
      populationGrowth: v.number(),
      medianAge: v.number(),
      medianIncome: v.number(),
      ownerOccupierRate: v.number(),
    }),
    infrastructure: v.object({
      transportScore: v.number(),
      schoolRatings: v.array(v.number()),
      amenitiesScore: v.number(),
      futureProjects: v.array(v.string()),
    }),
    dataSource: v.union(
      v.literal("corelogic"),
      v.literal("domain"),
      v.literal("government")
    ),
    timestamp: v.number(),
  })
    .index("by_suburb", ["suburb"])
    .index("by_postcode", ["postcode"])
    .index("by_property_type", ["propertyType"]),
})
