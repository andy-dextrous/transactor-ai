import { ServiceProviderCard } from "@/components/service-provider-card"
import { ServiceProviderCardHorizontal } from "@/components/service-provider-card-horizontal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

/*************************************************************************/
/*  SERVICE PROVIDERS SECTION
    Displays service provider components in different layouts
*************************************************************************/

export function ServiceProvidersSection() {
  const sampleProviders = [
    {
      name: "Sarah Chen",
      specialty: "Conveyancer",
      rating: 4.9,
      location: "Sydney CBD",
      price: "$1,200 - $1,800",
      availability: "Available this week",
      badges: ["Licensed", "5+ years", "Property Law"],
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b169b469?q=80&w=3000&auto=format&fit=crop",
    },
    {
      name: "Mike Johnson",
      specialty: "Building Inspector",
      rating: 4.8,
      location: "Eastern Suburbs",
      price: "$450 - $650",
      availability: "Next available: Tomorrow",
      badges: ["Certified", "Thermal Imaging", "Pest Inspection"],
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3000&auto=format&fit=crop",
    },
    {
      name: "David Park",
      specialty: "Mortgage Broker",
      rating: 4.9,
      location: "North Shore",
      price: "No upfront fees",
      availability: "Available today",
      badges: ["MFAA Member", "30+ Lenders", "First Home Buyer"],
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3000&auto=format&fit=crop",
    },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Users className="text-primary h-5 w-5" />
          </div>
          Service Providers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Vertical Cards Grid */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Card Layout</h6>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleProviders.map((provider, index) => (
              <ServiceProviderCard key={index} {...provider} />
            ))}
          </div>
        </div>

        {/* Horizontal Cards */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Horizontal Layout</h6>
          <div className="space-y-4">
            {sampleProviders.map((provider, index) => (
              <ServiceProviderCardHorizontal key={index} {...provider} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
