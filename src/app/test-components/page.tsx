import { PropertyCard } from "@/components/property-card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/*************************************************************************/
/*  TEST COMPONENTS PAGE
/*************************************************************************/

export default function TestComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Component Migration Test</h1>
          <p className="text-lg text-gray-600">
            Testing Tailwind 4.0 with migrated components
          </p>
        </div>

        {/* Badges Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Avatars Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Avatars</h2>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Property Cards Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Property Cards</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <PropertyCard
              title="Modern Downtown Apartment"
              price="$2,500/month"
              location="Downtown, NYC"
              beds={2}
              baths={2}
              parking={1}
              imageUrl="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
              featured={true}
              rating={4.8}
              priceChange="+5% this month"
            />
            <PropertyCard
              title="Cozy Suburban House"
              price="$3,200/month"
              location="Brooklyn, NYC"
              beds={3}
              baths={2}
              parking={2}
              imageUrl="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
              rating={4.6}
            />
            <PropertyCard
              title="Luxury Penthouse"
              price="$8,500/month"
              location="Manhattan, NYC"
              beds={4}
              baths={3}
              parking={2}
              imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
              featured={true}
              rating={4.9}
              priceChange="+12% this month"
            />
          </div>
        </section>
      </div>
    </div>
  )
}
