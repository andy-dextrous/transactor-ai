import { createStep, createWorkflow } from "@mastra/core/workflows"
import { z } from "zod"

/*************************************************************************/
/*  PROPERTY DUE DILIGENCE WORKFLOW
/*  
/*  This workflow automates the critical inspection and compliance checks
/*  during the contract-to-settlement phase of a property purchase.
/*  
/*  Features demonstrated:
/*  - Sequential execution with data transformation
/*  - Risk analysis and decision making
/*  - Human-in-the-loop simulation
/*  - Timeline management
/*************************************************************************/

// Input schema for the workflow
const PropertyDueDiligenceInput = z.object({
  propertyId: z.string(),
  contractDate: z.string(),
  coolingOffExpiry: z.string(),
  financeClause: z.boolean(),
  financeApprovalDue: z.string().optional(),
  buyerId: z.string(),
  propertyAddress: z.string(),
  purchasePrice: z.number(),
  propertyType: z.enum(["house", "apartment", "townhouse"]),
  isStrata: z.boolean(),
})

// Step schemas
const InspectionBookingSchema = z.object({
  inspectionType: z.enum(["building_pest", "strata", "flood_risk"]),
  providerId: z.string(),
  scheduledDate: z.string(),
  cost: z.number(),
  status: z.enum(["pending", "booked", "completed", "failed"]),
})

const InspectionResultSchema = z.object({
  inspectionType: z.string(),
  overallRating: z.enum(["pass", "minor_issues", "major_issues", "fail"]),
  criticalIssues: z.array(z.string()),
  estimatedRepairCost: z.number().optional(),
  reportUrl: z.string(),
  summary: z.string(),
})

const RiskAssessmentSchema = z.object({
  overallRisk: z.enum(["low", "medium", "high", "critical"]),
  riskFactors: z.array(z.string()),
  recommendedAction: z.enum(["proceed", "negotiate", "request_repairs", "withdraw"]),
  estimatedImpact: z.number(),
})

/*************************************************************************/
/*  STEP 1: INITIALIZE DUE DILIGENCE TIMELINE
/*************************************************************************/

const initializeTimeline = createStep({
  id: "initialize-timeline",
  description: "Creates a due diligence timeline with key milestones",
  inputSchema: PropertyDueDiligenceInput,
  outputSchema: z.object({
    timelineId: z.string(),
    milestones: z.array(
      z.object({
        name: z.string(),
        dueDate: z.string(),
        status: z.enum(["pending", "in_progress", "completed"]),
      })
    ),
    // Pass through original data for next steps
    propertyId: z.string(),
    propertyAddress: z.string(),
    propertyType: z.string(),
    isStrata: z.boolean(),
    buyerId: z.string(),
    purchasePrice: z.number(),
  }),
  execute: async ({ inputData }) => {
    // Create timeline with key milestones
    const milestones = [
      {
        name: "Building & Pest Inspection",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        status: "pending" as const,
      },
      {
        name: "Strata Report Review",
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days
        status: inputData.isStrata ? ("pending" as const) : ("completed" as const),
      },
      {
        name: "Finance Approval",
        dueDate:
          inputData.financeApprovalDue ||
          new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: inputData.financeClause ? ("pending" as const) : ("completed" as const),
      },
      {
        name: "Cooling Off Expiry",
        dueDate: inputData.coolingOffExpiry,
        status: "pending" as const,
      },
    ]

    // In a real implementation, this would save to your database
    const timelineId = `timeline_${inputData.propertyId}_${Date.now()}`

    console.log(`📅 Created due diligence timeline for ${inputData.propertyAddress}`)
    console.log(`⏰ Cooling off expires: ${inputData.coolingOffExpiry}`)

    return {
      timelineId,
      milestones,
      propertyId: inputData.propertyId,
      propertyAddress: inputData.propertyAddress,
      propertyType: inputData.propertyType,
      isStrata: inputData.isStrata,
      buyerId: inputData.buyerId,
      purchasePrice: inputData.purchasePrice,
    }
  },
})

/*************************************************************************/
/*  STEP 2: BOOK REQUIRED INSPECTIONS
/*************************************************************************/

const bookInspections = createStep({
  id: "book-inspections",
  description: "Books all required inspections based on property type",
  inputSchema: z.object({
    timelineId: z.string(),
    milestones: z.array(
      z.object({
        name: z.string(),
        dueDate: z.string(),
        status: z.enum(["pending", "in_progress", "completed"]),
      })
    ),
    propertyId: z.string(),
    propertyType: z.string(),
    isStrata: z.boolean(),
    propertyAddress: z.string(),
    buyerId: z.string(),
    purchasePrice: z.number(),
  }),
  outputSchema: z.object({
    inspections: z.array(InspectionBookingSchema),
    totalCost: z.number(),
    propertyAddress: z.string(),
    purchasePrice: z.number(),
  }),
  execute: async ({ inputData }) => {
    const inspections = []

    // Always book building & pest inspection
    inspections.push({
      inspectionType: "building_pest" as const,
      providerId: "provider_bp_001", // In real app, this would come from provider matching
      scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      cost: 650,
      status: "booked" as const,
    })

    // Book strata inspection if applicable
    if (inputData.isStrata) {
      inspections.push({
        inspectionType: "strata" as const,
        providerId: "provider_strata_001",
        scheduledDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        cost: 350,
        status: "booked" as const,
      })
    }

    // Book flood risk assessment for houses
    if (inputData.propertyType === "house") {
      inspections.push({
        inspectionType: "flood_risk" as const,
        providerId: "provider_flood_001",
        scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        cost: 200,
        status: "booked" as const,
      })
    }

    const totalCost = inspections.reduce((sum, inspection) => sum + inspection.cost, 0)

    console.log(
      `🔍 Booked ${inspections.length} inspections for ${inputData.propertyAddress}`
    )
    console.log(`💰 Total inspection cost: $${totalCost}`)

    return {
      inspections,
      totalCost,
      propertyAddress: inputData.propertyAddress,
      purchasePrice: inputData.purchasePrice,
    }
  },
})

/*************************************************************************/
/*  STEP 3: WAIT FOR INSPECTION COMPLETION
/*************************************************************************/

const awaitInspectionResults = createStep({
  id: "await-inspection-results",
  description: "Waits for and processes inspection results",
  inputSchema: z.object({
    inspections: z.array(InspectionBookingSchema),
    totalCost: z.number(),
    propertyAddress: z.string(),
    purchasePrice: z.number(),
  }),
  outputSchema: z.object({
    results: z.array(InspectionResultSchema),
    completedCount: z.number(),
    propertyAddress: z.string(),
    purchasePrice: z.number(),
  }),
  execute: async ({ inputData }) => {
    // Simulate inspection results
    // In a real implementation, this would poll external APIs or wait for webhooks
    const results: Array<z.infer<typeof InspectionResultSchema>> = []

    for (const inspection of inputData.inspections) {
      // Simulate different inspection outcomes
      let result: z.infer<typeof InspectionResultSchema>

      switch (inspection.inspectionType) {
        case "building_pest":
          result = {
            inspectionType: "building_pest",
            overallRating: "minor_issues",
            criticalIssues: ["Minor termite damage in garage", "Blocked gutters"],
            estimatedRepairCost: 2500,
            reportUrl: `https://reports.example.com/bp_${Date.now()}.pdf`,
            summary:
              "Property is structurally sound with minor maintenance issues that should be addressed.",
          }
          break

        case "strata":
          result = {
            inspectionType: "strata",
            overallRating: "pass",
            criticalIssues: [],
            reportUrl: `https://reports.example.com/strata_${Date.now()}.pdf`,
            summary: "Strata finances are healthy. No major upcoming levies planned.",
          }
          break

        case "flood_risk":
          result = {
            inspectionType: "flood_risk",
            overallRating: "pass",
            criticalIssues: [],
            reportUrl: `https://reports.example.com/flood_${Date.now()}.pdf`,
            summary: "Property is in a low flood risk area with adequate drainage.",
          }
          break

        default:
          throw new Error(`Unknown inspection type: ${inspection.inspectionType}`)
      }

      results.push(result)
      console.log(
        `✅ ${inspection.inspectionType} inspection completed: ${result.overallRating}`
      )
    }

    return {
      results,
      completedCount: results.length,
      propertyAddress: inputData.propertyAddress,
      purchasePrice: inputData.purchasePrice,
    }
  },
})

/*************************************************************************/
/*  STEP 4: ANALYZE RISK AND GENERATE RECOMMENDATIONS
/*************************************************************************/

const analyzeRisk = createStep({
  id: "analyze-risk",
  description: "Analyzes inspection results and generates risk assessment",
  inputSchema: z.object({
    results: z.array(InspectionResultSchema),
    completedCount: z.number(),
    propertyAddress: z.string(),
    purchasePrice: z.number(),
  }),
  outputSchema: RiskAssessmentSchema.extend({
    propertyAddress: z.string(),
    buyerId: z.string(),
  }),
  execute: async ({ inputData }) => {
    const criticalIssues: string[] = []
    let totalRepairCost = 0
    let highestRisk = "low"

    // Analyze each inspection result
    for (const result of inputData.results) {
      criticalIssues.push(...result.criticalIssues)
      totalRepairCost += result.estimatedRepairCost || 0

      // Determine highest risk level
      const riskLevels = ["low", "medium", "high", "critical"]
      const currentRiskIndex = riskLevels.indexOf(
        result.overallRating === "fail"
          ? "critical"
          : result.overallRating === "major_issues"
            ? "high"
            : result.overallRating === "minor_issues"
              ? "medium"
              : "low"
      )
      const highestRiskIndex = riskLevels.indexOf(highestRisk)

      if (currentRiskIndex > highestRiskIndex) {
        highestRisk = riskLevels[currentRiskIndex]
      }
    }

    // Calculate risk as percentage of purchase price
    const repairCostPercentage = (totalRepairCost / inputData.purchasePrice) * 100

    // Determine recommended action
    let recommendedAction: "proceed" | "negotiate" | "request_repairs" | "withdraw"

    if (highestRisk === "critical" || repairCostPercentage > 5) {
      recommendedAction = "withdraw"
    } else if (highestRisk === "high" || repairCostPercentage > 2) {
      recommendedAction = "request_repairs"
    } else if (highestRisk === "medium" || repairCostPercentage > 0.5) {
      recommendedAction = "negotiate"
    } else {
      recommendedAction = "proceed"
    }

    const riskFactors = [
      ...criticalIssues,
      ...(repairCostPercentage > 1
        ? [`Repair costs represent ${repairCostPercentage.toFixed(1)}% of purchase price`]
        : []),
    ]

    console.log(`🎯 Risk analysis complete for ${inputData.propertyAddress}`)
    console.log(`📊 Overall risk: ${highestRisk}`)
    console.log(`💡 Recommendation: ${recommendedAction}`)

    return {
      overallRisk: highestRisk as "low" | "medium" | "high" | "critical",
      riskFactors,
      recommendedAction,
      estimatedImpact: totalRepairCost,
      propertyAddress: inputData.propertyAddress,
      buyerId: "buyer_001", // In real app, this would come from context
    }
  },
})

/*************************************************************************/
/*  STEP 5: HUMAN DECISION POINT (CONDITIONAL)
/*************************************************************************/

const buyerDecision = createStep({
  id: "buyer-decision",
  description: "Captures buyer decision based on risk assessment",
  inputSchema: RiskAssessmentSchema.extend({
    propertyAddress: z.string(),
    buyerId: z.string(),
  }),
  outputSchema: z.object({
    decision: z.enum(["proceed", "negotiate", "withdraw"]),
    notes: z.string().optional(),
    negotiationPoints: z.array(z.string()).optional(),
    propertyAddress: z.string(),
    timelineId: z.string(),
  }),
  execute: async ({ inputData }) => {
    // This would typically pause the workflow and wait for human input
    // For demo purposes, we'll simulate the decision based on risk level

    console.log(`🤔 Buyer decision required for ${inputData.propertyAddress}`)
    console.log(`📋 Risk assessment: ${inputData.overallRisk}`)
    console.log(`💭 AI recommendation: ${inputData.recommendedAction}`)

    // Simulate buyer decision (in real app, this would pause and wait for user input)
    let decision: "proceed" | "negotiate" | "withdraw"
    let notes: string | undefined
    let negotiationPoints: string[] | undefined

    switch (inputData.recommendedAction) {
      case "withdraw":
        decision = "withdraw"
        notes = "Too many critical issues identified. Risk too high to proceed."
        break

      case "request_repairs":
        decision = "negotiate"
        notes = "Proceeding with negotiation for repairs before settlement."
        negotiationPoints = [
          "Request vendor to fix termite damage before settlement",
          "Negotiate $2,500 reduction in price for gutter repairs",
        ]
        break

      case "negotiate":
        decision = "negotiate"
        notes = "Minor issues identified. Negotiating price reduction."
        negotiationPoints = [
          `Request $${inputData.estimatedImpact} price reduction for repairs`,
        ]
        break

      default:
        decision = "proceed"
        notes = "No significant issues found. Proceeding with purchase as planned."
        break
    }

    console.log(`✅ Buyer decision: ${decision}`)

    return {
      decision,
      notes,
      negotiationPoints,
      propertyAddress: inputData.propertyAddress,
      timelineId: "timeline_001", // In real app, this would come from context
    }
  },
})

/*************************************************************************/
/*  STEP 6: UPDATE TIMELINE AND NOTIFY STAKEHOLDERS
/*************************************************************************/

const finalizeDueDiligence = createStep({
  id: "finalize-due-diligence",
  description: "Updates timeline and notifies all stakeholders of the outcome",
  inputSchema: z.object({
    decision: z.enum(["proceed", "negotiate", "withdraw"]),
    notes: z.string().optional(),
    negotiationPoints: z.array(z.string()).optional(),
    propertyAddress: z.string(),
    timelineId: z.string(),
  }),
  outputSchema: z.object({
    status: z.enum(["completed", "negotiating", "withdrawn"]),
    nextSteps: z.array(z.string()),
    notificationsSent: z.number(),
  }),
  execute: async ({ inputData }) => {
    let status: "completed" | "negotiating" | "withdrawn"
    let nextSteps: string[] = []

    switch (inputData.decision) {
      case "proceed":
        status = "completed"
        nextSteps = [
          "Proceed to finance approval",
          "Prepare for settlement",
          "Arrange building insurance",
        ]
        break

      case "negotiate":
        status = "negotiating"
        nextSteps = [
          "Contact real estate agent with negotiation points",
          "Await vendor response",
          "Prepare alternative offers",
        ]
        break

      case "withdraw":
        status = "withdrawn"
        nextSteps = [
          "Notify conveyancer to withdraw from contract",
          "Ensure cooling-off period compliance",
          "Resume property search",
        ]
        break
    }

    // Simulate sending notifications
    const notifications = [
      "Buyer notification sent",
      "Conveyancer updated",
      "Real estate agent notified",
    ]

    console.log(`🏁 Due diligence workflow completed for ${inputData.propertyAddress}`)
    console.log(`📊 Final status: ${status}`)
    console.log(`📧 Sent ${notifications.length} notifications`)

    return {
      status,
      nextSteps,
      notificationsSent: notifications.length,
    }
  },
})

/*************************************************************************/
/*  WORKFLOW DEFINITION AND EXECUTION
/*************************************************************************/

export const propertyDueDiligenceWorkflow = createWorkflow({
  id: "property-due-diligence",
  description: "Automates property due diligence process from contract to decision",
  inputSchema: PropertyDueDiligenceInput,
  outputSchema: z.object({
    status: z.enum(["completed", "negotiating", "withdrawn"]),
    nextSteps: z.array(z.string()),
    notificationsSent: z.number(),
  }),
})
  .then(initializeTimeline)
  .then(bookInspections)
  .then(awaitInspectionResults)
  .then(analyzeRisk)
  .then(buyerDecision)
  .then(finalizeDueDiligence)
  .commit()
