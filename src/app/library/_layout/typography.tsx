import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

/*************************************************************************/
/*  TYPOGRAPHY COMPONENT
    Displays the complete typography hierarchy and text styles
*************************************************************************/

export function TypographySection() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Award className="text-primary h-5 w-5" />
          </div>
          Typography
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <h1 className="text-neutral-900">Heading 1 - Display Large</h1>
          <h2 className="text-neutral-900">Heading 2 - Display Medium</h2>
          <h3 className="text-neutral-900">Heading 3 - Display Small</h3>
          <h4 className="text-neutral-900">Heading 4 - Title Large</h4>
          <h5 className="text-neutral-900">Heading 5 - Title Medium</h5>
          <h6 className="text-neutral-900">Heading 6 - Title Small</h6>
        </div>
        <div className="space-y-4 border-t border-neutral-200 pt-6">
          <p className="text-lg font-medium text-neutral-900">
            Body Large - Primary content
          </p>
          <p className="text-base text-neutral-700">
            Body Medium - Standard paragraph text
          </p>
          <p className="text-sm text-neutral-600">Body Small - Secondary information</p>
          <p className="text-xs font-medium text-neutral-500">
            Caption - Labels and metadata
          </p>
        </div>
        <div className="space-y-4 border-t border-neutral-200 pt-6">
          <h6 className="font-semibold text-neutral-800">Font Weights & Styles</h6>
          <div className="space-y-3">
            <p className="font-light text-neutral-700">Light - 300</p>
            <p className="font-normal text-neutral-700">Regular - 400</p>
            <p className="font-medium text-neutral-700">Medium - 500</p>
            <p className="font-semibold text-neutral-700">Semibold - 600</p>
            <p className="font-bold text-neutral-700">Bold - 700</p>
            <p className="text-neutral-700 italic">Italic style</p>
            <p className="text-neutral-700 underline">Underlined text</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
