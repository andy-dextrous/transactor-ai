import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

/*************************************************************************/
/*  STATISTICS SECTION
    Displays design system metrics and overview statistics
*************************************************************************/

export function StatisticsSection() {
  return (
    <Card className="card-elevated col-span-full rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <BarChart3 className="text-primary h-5 w-5" />
          </div>
          Design System Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="text-primary text-3xl font-bold">40+</div>
            <div className="text-sm text-neutral-600">Components</div>
            <div className="mt-2 text-xs text-neutral-500">
              Buttons, forms, navigation, overlays, and more
            </div>
          </div>

          <div className="text-center">
            <div className="text-success-600 text-3xl font-bold">6</div>
            <div className="text-sm text-neutral-600">Color Themes</div>
            <div className="mt-2 text-xs text-neutral-500">
              Primary, secondary, success, warning, danger, neutral
            </div>
          </div>

          <div className="text-center">
            <div className="text-warning-600 text-3xl font-bold">100+</div>
            <div className="text-sm text-neutral-600">Icons</div>
            <div className="mt-2 text-xs text-neutral-500">
              Lucide React icons for every use case
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-600">∞</div>
            <div className="text-sm text-neutral-600">Possibilities</div>
            <div className="mt-2 text-xs text-neutral-500">
              Endless customization and combinations
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h5 className="font-semibold text-neutral-800">Technology Stack</h5>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  React
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  TypeScript
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  Tailwind CSS
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  Radix UI
                </span>
                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  Lucide Icons
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-neutral-800">Features</h5>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <div className="bg-success-500 h-2 w-2 rounded-full"></div>
                  <span>Fully accessible components</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-success-500 h-2 w-2 rounded-full"></div>
                  <span>Dark mode support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-success-500 h-2 w-2 rounded-full"></div>
                  <span>Responsive design</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-success-500 h-2 w-2 rounded-full"></div>
                  <span>Customizable theming</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
