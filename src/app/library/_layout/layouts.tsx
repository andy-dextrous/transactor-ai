import { MainAppLayout, DashboardLayout } from "@/components/layout-examples"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layout } from "lucide-react"

/*************************************************************************/
/*  LAYOUTS SECTION
    Displays pre-built layout components and patterns
    Shows common application layout structures
*************************************************************************/

export function LayoutsSection() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Layout className="text-primary h-5 w-5" />
          </div>
          Application Layouts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-12">
        {/* Main App Layout Preview */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Main Application Layout</h6>
          <p className="text-sm text-neutral-600">
            Split-screen layout with chat interface and property display panel
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <div className="origin-top-left scale-50 transform-gpu overflow-hidden rounded-md border bg-white shadow-lg">
              <div className="h-96 w-[800px]">
                <MainAppLayout />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Layout Preview */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Dashboard Layout</h6>
          <p className="text-sm text-neutral-600">
            Three-column layout with sidebar navigation, main content, and chat panel
          </p>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <div className="origin-top-left scale-50 transform-gpu overflow-hidden rounded-md border bg-white shadow-lg">
              <div className="h-96 w-[800px]">
                <DashboardLayout />
              </div>
            </div>
          </div>
        </div>

        {/* Layout Features */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Layout Features</h6>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-neutral-200 p-4">
              <h6 className="mb-2 font-medium text-neutral-900">Responsive Design</h6>
              <p className="text-sm text-neutral-600">
                All layouts adapt seamlessly to different screen sizes and devices
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4">
              <h6 className="mb-2 font-medium text-neutral-900">Flexible Grids</h6>
              <p className="text-sm text-neutral-600">
                Built with CSS Grid and Flexbox for flexible, maintainable layouts
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4">
              <h6 className="mb-2 font-medium text-neutral-900">Component Integration</h6>
              <p className="text-sm text-neutral-600">
                Seamlessly integrates with all design system components
              </p>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50/50 p-6">
          <div className="space-y-3">
            <h6 className="font-semibold text-neutral-800">Usage Guidelines</h6>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                • Use MainAppLayout for chat-focused applications with property listings
              </li>
              <li>• Use DashboardLayout for admin panels and data-heavy interfaces</li>
              <li>• Both layouts are fully responsive and mobile-optimized</li>
              <li>
                • Customize layouts by modifying the grid structure and component
                placement
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
