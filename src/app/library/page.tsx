"use client"

import { Button } from "@/components/ui/button"
import { Download, Copy, Building } from "lucide-react"
import {
  ColorPaletteSection,
  TypographySection,
  ButtonsSection,
  BadgesAlertsSection,
  FormElementsSection,
  DisplayComponentsSection,
  NavigationSection,
  DataDisplaySection,
  OverlaysSection,
  ChatUISection,
  IconsSection,
  StatisticsSection,
} from "./_layout"

/*************************************************************************/
/*  COMPONENT LIBRARY PAGE
    Main design system documentation page with all UI components
*************************************************************************/

export default function ComponentLibrary() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 px-8 py-6 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-xl p-2">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                PropertyAI Design System
              </h1>
              <p className="text-sm font-medium text-neutral-600">
                Complete UI Component Library
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="btn rounded-xl font-semibold">
              <Download className="mr-2 h-4 w-4" />
              Export Tokens
            </Button>
            <Button variant="outline" className="btn-outline rounded-xl font-semibold">
              <Copy className="mr-2 h-4 w-4" />
              Copy CSS
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Design System Overview */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-900">
              Genesis-Inspired Design System
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              A comprehensive, modern design system featuring refined typography,
              sophisticated color palettes, and elegant component styling for premium user
              experiences.
            </p>
          </div>

          {/* Color Palette Section */}
          <ColorPaletteSection />
        </div>

        <div className="space-y-8">
          {/* Typography & Buttons */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <TypographySection />
            <ButtonsSection />
          </div>

          {/* Badges & Alerts */}
          <BadgesAlertsSection />

          {/* Form Elements */}
          <FormElementsSection />

          {/* Display Components */}
          <DisplayComponentsSection />

          {/* Navigation Components */}
          <NavigationSection />

          {/* Data Display */}
          <DataDisplaySection />

          {/* Overlays */}
          <OverlaysSection />

          {/* Chat UI */}
          <ChatUISection />

          {/* Icons */}
          <IconsSection />

          {/* Statistics */}
          <StatisticsSection />
        </div>
      </div>
    </div>
  )
}
