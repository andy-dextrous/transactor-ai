"use client"

import { Building } from "lucide-react"
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
import Image from "next/image"

/*************************************************************************/
/*  COMPONENT LIBRARY PAGE
    Main design system documentation page with all UI components
*************************************************************************/

export default function ComponentLibrary() {
  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 px-8 py-6 backdrop-blur-md">
        <div className="container">
          <div className="flex items-center justify-center">
            <Image src="/logos/logo.png" alt="logo" width={200} height={100} />
          </div>
        </div>
      </header>

      {/* Design System Overview */}
      <section className="pb-0">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-neutral-900">Transactor UI Library</h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              The official design system and component library for Transactor
              applications. Built with modern web standards and carefully crafted to
              provide consistent, high-quality user experiences across our product suite.
            </p>
          </div>
        </div>
      </section>

      {/* Component Library Sections */}
      <section className="flex flex-col gap-12">
        {/* Color Palette */}
        <div className="container">
          <ColorPaletteSection />
        </div>

        {/* Typography */}
        <div className="container">
          <TypographySection />
        </div>

        {/* Buttons */}
        <div className="container">
          <ButtonsSection />
        </div>

        {/* Badges & Alerts */}
        <div className="container">
          <BadgesAlertsSection />
        </div>

        {/* Form Elements */}
        <div className="container">
          <FormElementsSection />
        </div>

        {/* Display Components */}
        <div className="container">
          <DisplayComponentsSection />
        </div>

        {/* Navigation Components */}
        <div className="container">
          <NavigationSection />
        </div>

        {/* Data Display */}
        <div className="container">
          <DataDisplaySection />
        </div>

        {/* Overlays */}
        <div className="container">
          <OverlaysSection />
        </div>

        {/* Chat UI */}
        <div className="container">
          <ChatUISection />
        </div>

        {/* Icons */}
        <div className="container">
          <IconsSection />
        </div>
      </section>
    </div>
  )
}
