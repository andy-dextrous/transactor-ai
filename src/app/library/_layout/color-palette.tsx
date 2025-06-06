import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

/*************************************************************************/
/*  COLOR PALETTE COMPONENT
    Displays the complete color system with all theme variants
*************************************************************************/

export function ColorPaletteSection() {
  const colors = [
    { name: "Primary Blue", class: "bg-primary-500" },
    { name: "Secondary Slate", class: "bg-secondary-500" },
    { name: "Success Green", class: "bg-success-500" },
    { name: "Warning Orange", class: "bg-warning-500" },
    { name: "Danger Red", class: "bg-danger-500" },
    { name: "Neutral Gray", class: "bg-neutral-500" },
  ]

  const opacities = [
    { value: "100", class: "opacity-100" },
    { value: "90", class: "opacity-90" },
    { value: "80", class: "opacity-80" },
    { value: "60", class: "opacity-60" },
    { value: "40", class: "opacity-40" },
    { value: "20", class: "opacity-20" },
    { value: "10", class: "opacity-10" },
    { value: "5", class: "opacity-5" },
  ]

  return (
    <Card className="card-elevated mb-8 rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Sparkles className="text-primary h-5 w-5" />
          </div>
          Color Palette
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-12">
          {colors.map((color, colorIndex) => (
            <div key={colorIndex} className="space-y-6">
              <h6 className="text-h6 font-semibold text-neutral-900">{color.name}</h6>
              <div className="grid grid-cols-8 gap-4">
                {opacities.map((opacity, opacityIndex) => (
                  <div key={opacityIndex} className="space-y-3">
                    <div
                      className={`h-16 w-full rounded-lg border border-neutral-200 ${color.class} ${opacity.class}`}
                    />
                    <div className="text-center">
                      <div className="text-xs text-neutral-600">{opacity.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
