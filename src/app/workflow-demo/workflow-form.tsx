"use client"

import { useState } from "react"
import {
  runPropertyDueDiligence,
  testPropertyWorkflow,
} from "../actions/workflow-actions"

/*************************************************************************/
/*  WORKFLOW FORM COMPONENT
/*************************************************************************/

export function WorkflowForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await runPropertyDueDiligence(formData)
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleTestWorkflow() {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await testPropertyWorkflow()
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="address"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Property Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            placeholder="123 Collins Street, Melbourne VIC 3000"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
            Purchase Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            placeholder="850000"
            min="0"
            step="1000"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select property type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Running..." : "Start Due Diligence"}
          </button>

          <button
            type="button"
            onClick={handleTestWorkflow}
            disabled={isLoading}
            className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Test
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 rounded-md border p-4">
          <h3 className="mb-2 font-medium">
            {result.success ? "✅ Success" : "❌ Error"}
          </h3>

          {result.success ? (
            <div className="space-y-2">
              <p className="text-green-700">{result.message}</p>
              {result.data && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-gray-600">
                    View workflow result
                  </summary>
                  <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ) : (
            <p className="text-red-700">{result.error}</p>
          )}
        </div>
      )}
    </div>
  )
}
