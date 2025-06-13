import { WorkflowForm } from "./workflow-form"

/*************************************************************************/
/*  WORKFLOW DEMO PAGE
/*************************************************************************/

export default function WorkflowDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Property Due Diligence
          </h1>
          <p className="mb-8 text-gray-600">
            Start an automated due diligence workflow for your property purchase
          </p>
        </div>

        <WorkflowForm />
      </div>
    </div>
  )
}
