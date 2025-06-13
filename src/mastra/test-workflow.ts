import { mastra } from "./index"

/*************************************************************************/
/*  PROPERTY DUE DILIGENCE WORKFLOW TEST
/*************************************************************************/

async function testPropertyDueDiligenceWorkflow() {
  console.log("🏠 Testing Property Due Diligence Workflow\n")

  const workflow = mastra.getWorkflow("propertyDueDiligenceWorkflow")

  if (!workflow) {
    throw new Error("Property due diligence workflow not found")
  }

  // Create a test property purchase scenario
  const testInput = {
    propertyId: "prop_123456",
    contractDate: "2024-01-15",
    coolingOffExpiry: "2024-01-22T17:00:00Z", // 7 days from contract
    financeClause: true,
    financeApprovalDue: "2024-02-01T17:00:00Z", // 17 days from contract
    buyerId: "buyer_001",
    propertyAddress: "123 Collins Street, Melbourne VIC 3000",
    purchasePrice: 1200000,
    propertyType: "apartment" as const,
    isStrata: true,
  }

  console.log("📋 Test Scenario:")
  console.log(`   Property: ${testInput.propertyAddress}`)
  console.log(`   Price: $${testInput.purchasePrice.toLocaleString()}`)
  console.log(`   Type: ${testInput.propertyType}`)
  console.log(`   Strata: ${testInput.isStrata ? "Yes" : "No"}`)
  console.log(`   Cooling off expires: ${testInput.coolingOffExpiry}`)
  console.log("")

  try {
    // Create and start the workflow run
    const run = workflow.createRun()
    const workflowResult = await run.start({ inputData: testInput })

    console.log("\n🎉 Workflow completed successfully!")
    console.log("📊 Final Result:")

    if (workflowResult.status === "success" && workflowResult.result) {
      const result = workflowResult.result
      console.log(`   Status: ${result.status}`)
      console.log(`   Next Steps: ${result.nextSteps.length} items`)
      result.nextSteps.forEach((step: string, index: number) => {
        console.log(`     ${index + 1}. ${step}`)
      })
      console.log(`   Notifications sent: ${result.notificationsSent}`)
    } else {
      console.log("   Workflow did not complete successfully")
      console.log(`   Status: ${workflowResult.status}`)
    }

    return workflowResult
  } catch (error) {
    console.error("❌ Workflow failed:", error)
    throw error
  }
}

// Export for use in other files
export { testPropertyDueDiligenceWorkflow }

// Run the test if this file is executed directly
if (require.main === module) {
  testPropertyDueDiligenceWorkflow()
    .then(() => {
      console.log("\n✅ Test completed successfully")
      process.exit(0)
    })
    .catch(error => {
      console.error("\n❌ Test failed:", error)
      process.exit(1)
    })
}
