"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useCallback } from "react"
import type { Id } from "../../convex/_generated/dataModel"

export function useContextualPanel(threadId?: string) {
  // Real-time subscription to panel data
  const panelData = useQuery(
    api.agents.getContextualPanel,
    threadId ? { threadId } : "skip"
  )

  // Mutation for manual panel updates
  const updatePanel = useMutation(api.agents.updateContextualPanel)

  const updateContext = useCallback(
    async (userId: Id<"users">, context: any) => {
      if (!threadId) return

      try {
        await updatePanel({
          threadId,
          userId,
          context,
        })
      } catch (error) {
        console.error("Failed to update contextual panel:", error)
        throw error
      }
    },
    [threadId, updatePanel]
  )

  // Extract visible components from panel data
  const visibleComponents =
    panelData?.panelComponents
      ?.filter(component => component.isVisible)
      ?.sort((a, b) => a.priority - b.priority) || []

  return {
    // Data
    panelData,
    visibleComponents,
    currentContext: panelData?.currentContext,

    // Actions
    updateContext,

    // State
    isLoading: panelData === undefined,
    lastUpdated: panelData?.lastUpdated,
    autoUpdated: panelData?.autoUpdated,
  }
}

export type ContextualPanelHook = ReturnType<typeof useContextualPanel>
