import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Zap,
  Search,
  Heart,
  Settings,
  Plus,
  Download,
  Share,
  Edit,
  Trash,
} from "lucide-react"

/*************************************************************************/
/*  BUTTONS COMPONENT
    Displays all button variants, sizes, states, and configurations
*************************************************************************/

export function ButtonsSection() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Zap className="text-primary h-5 w-5" />
          </div>
          Buttons
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Button Variants */}
        <div className="space-y-4">
          <h5 className="font-semibold text-neutral-800">Variants</h5>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-4">
          <h5 className="font-semibold text-neutral-800">Sizes</h5>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </div>

        {/* Icon Buttons */}
        <div className="space-y-4">
          <h5 className="font-semibold text-neutral-800">Icon Buttons</h5>
          <div className="flex flex-wrap gap-3">
            <Button size="icon-sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon-lg">
              <Settings className="h-5 w-5" />
            </Button>
            <Button size="icon-xl">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Buttons with Icons */}
        <div className="space-y-4">
          <h5 className="font-semibold text-neutral-800">With Icons</h5>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Loading & Disabled States */}
        <div className="space-y-4">
          <h5 className="font-semibold text-neutral-800">States</h5>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
            <Button>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Loading
            </Button>
          </div>
        </div>

        {/* Rounded Variants */}
        <div className="space-y-4">
          <h5 className="font-semibold text-neutral-800">Custom Variants</h5>
          <div className="flex flex-wrap gap-3">
            <Button variant="rounded">Rounded Primary</Button>
            <Button variant="rounded-ghost">Rounded Ghost</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
