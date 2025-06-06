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
  Menu,
  ArrowRight,
  ChevronDown,
} from "lucide-react"

/*************************************************************************/
/*  BUTTONS COMPONENT
    Displays all button variants, sizes, and configurations
    Organized by type with variant demonstrations
*************************************************************************/

export function ButtonsSection() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Zap className="text-primary h-5 w-5" />
          </div>
          Button
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-12">
        {/* Button with Center Icon */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Button with Center Icon</h6>
          <div className="grid grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Default</p>
              <Button size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Outline</p>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Secondary</p>
              <Button variant="secondary" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Ghost</p>
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Button with Left Icon */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Button with Left Icon</h6>
          <div className="grid grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Default</p>
              <Button>
                <Menu className="mr-2 h-4 w-4" />
                Left Icon
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Outline</p>
              <Button variant="outline">
                <Menu className="mr-2 h-4 w-4" />
                Left Icon
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Secondary</p>
              <Button variant="secondary">
                <Menu className="mr-2 h-4 w-4" />
                Left Icon
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Ghost</p>
              <Button variant="ghost">
                <Menu className="mr-2 h-4 w-4" />
                Left Icon
              </Button>
            </div>
          </div>
        </div>

        {/* Button with Right Icon */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Button with Right Icon</h6>
          <div className="grid grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Default</p>
              <Button>
                Right Icon
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Outline</p>
              <Button variant="outline">
                Right Icon
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Secondary</p>
              <Button variant="secondary">
                Right Icon
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Ghost</p>
              <Button variant="ghost">
                Right Icon
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Button Large */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Button Large</h6>
          <div className="grid grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Default</p>
              <Button size="lg" className="w-full">
                SIGN IN
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Outline</p>
              <Button variant="outline" size="lg" className="w-full">
                SIGN IN
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Secondary</p>
              <Button variant="secondary" size="lg" className="w-full">
                SIGN IN
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Destructive</p>
              <Button variant="destructive" size="lg" className="w-full">
                DELETE
              </Button>
            </div>
          </div>
        </div>

        {/* Button Medium */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Button Medium</h6>
          <div className="grid grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Default</p>
              <Button>SIGN IN</Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Outline</p>
              <Button variant="outline">SIGN IN</Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Secondary</p>
              <Button variant="secondary">SIGN IN</Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Link</p>
              <Button variant="link">SIGN IN</Button>
            </div>
          </div>
        </div>

        {/* Button Small */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Button Small</h6>
          <div className="grid grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Default</p>
              <Button size="sm">Default</Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Outline</p>
              <Button variant="outline" size="sm">
                Default
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Secondary</p>
              <Button variant="secondary" size="sm">
                Default
              </Button>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-neutral-600">Ghost</p>
              <Button variant="ghost" size="sm">
                Default
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
