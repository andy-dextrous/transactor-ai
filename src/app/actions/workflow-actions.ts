"use server"

import { mastra } from "../../mastra"

/*************************************************************************/
/*  WORKFLOW SERVER ACTIONS
/*************************************************************************/

export async function runPropertyDueDiligence(formData: FormData) {
  try {
    // Extract form data
    const propertyAddress = formData.get("address")?.toString()
    const purchasePrice = Number(formData.get("price"))
    const propertyType = formData.get("type")?.toString() as
      | "house"
      | "apartment"
      | "townhouse"

    // Validate required fields
    if (!propertyAddress || !purchasePrice || !propertyType) {
      return {
        success: false,
        error: "Missing required fields: address, price, or property type",
      }
    }

    // Get the workflow from Mastra (correct name)
    const workflow = mastra.getWorkflow("propertyDueDiligenceWorkflow")

    if (!workflow) {
      return {
        success: false,
        error: "Property due diligence workflow not found",
      }
    }

    // Create workflow input data matching the schema
    const inputData = {
      propertyId: `prop_${Date.now()}`,
      contractDate: new Date().toISOString().split("T")[0],
      coolingOffExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      financeClause: true,
      financeApprovalDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      buyerId: `buyer_${Date.now()}`,
      propertyAddress,
      purchasePrice,
      propertyType,
      isStrata: propertyType === "apartment",
    }

    console.log(`Starting property due diligence for ${propertyAddress}...`)

    // Create and start the workflow run (correct API)
    const run = workflow.createRun()
    const result = await run.start({ inputData })

    return {
      success: true,
      data: result,
      message: `Due diligence completed for ${propertyAddress}`,
    }
  } catch (error) {
    console.error("Error running property due diligence workflow:", error)

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/*************************************************************************/
/*  WORKFLOW STATUS ACTIONS
/*************************************************************************/

export async function getWorkflowStatus(runId: string) {
  try {
    const workflow = mastra.getWorkflow("propertyDueDiligenceWorkflow")

    if (!workflow) {
      return {
        success: false,
        error: "Workflow not found",
      }
    }

    // Note: This would need to be implemented in Mastra if available
    // const run = await workflow.getRun(runId)

    return {
      success: true,
      status: "completed", // Placeholder
      runId,
    }
  } catch (error) {
    console.error("Error getting workflow status:", error)

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/*************************************************************************/
/*  QUICK TEST ACTION
/*************************************************************************/

export async function testPropertyWorkflow() {
  try {
    // Create test input data matching the workflow schema
    const inputData = {
      propertyId: "prop_test_123",
      contractDate: "2024-01-15",
      coolingOffExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      financeClause: true,
      financeApprovalDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      buyerId: "buyer_test_001",
      propertyAddress: "123 Collins Street, Melbourne VIC 3000",
      purchasePrice: 850000,
      propertyType: "apartment" as const,
      isStrata: true,
    }

    const workflow = mastra.getWorkflow("propertyDueDiligenceWorkflow")

    if (!workflow) {
      return {
        success: false,
        error: "Property due diligence workflow not found",
      }
    }

    const run = workflow.createRun()
    const result = await run.start({ inputData })

    return {
      success: true,
      data: result,
      message: "Test workflow completed successfully",
    }
  } catch (error) {
    console.error("Error running test workflow:", error)

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
