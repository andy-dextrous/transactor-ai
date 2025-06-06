import { PropertyCard } from "@/components/property-card"
import { PropertyComparisonCard } from "@/components/property-comparison-card"
import { PropertyWatchlistCard } from "@/components/property-watchlist-card"
import { ServiceProviderCard } from "@/components/service-provider-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home } from "lucide-react"

/*************************************************************************/
/*  PROPERTY CARDS SECTION
    Displays property card components with different configurations
    Note: More property card variants coming soon
*************************************************************************/

export function PropertyCardsSection() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Home className="text-primary h-5 w-5" />
          </div>
          Property Cards
          <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
            More coming soon
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-12">
        {/* Standard Property Cards Grid (3-column) */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Standard Property Cards</h6>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <PropertyCard
              title="Modern Apartment in Sydney CBD"
              price="$850,000"
              location="Sydney, NSW"
              beds={2}
              baths={2}
              parking={1}
              imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=3550&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              featured
              rating={4.8}
              priceChange="+12%"
            />
            <PropertyCard
              title="Family Home in Melbourne"
              price="$1,200,000"
              location="Melbourne, VIC"
              beds={4}
              baths={3}
              parking={2}
              imageUrl="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              rating={4.6}
            />
            <PropertyCard
              title="Luxury Penthouse"
              price="$2,500,000"
              location="Perth, WA"
              beds={3}
              baths={2}
              parking={2}
              imageUrl="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              featured
              rating={4.9}
              priceChange="+8%"
            />
          </div>
        </div>

        {/* Property Comparison Cards */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Property Comparison Cards</h6>
          <p className="text-sm text-neutral-600">
            Detailed property cards with specifications for side-by-side comparison
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PropertyComparisonCard
              title="Modern Apartment"
              price="$850,000"
              address="123 Collins St, Melbourne"
              beds={2}
              baths={2}
              parking={1}
              landSize="N/A"
              yearBuilt={2019}
              councilRates="$2,400/year"
              strata="$3,200/year"
              imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=3550&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <PropertyComparisonCard
              title="Family House"
              price="$1,200,000"
              address="456 Smith St, Sydney"
              beds={4}
              baths={3}
              parking={2}
              landSize="650m²"
              yearBuilt={2015}
              councilRates="$3,800/year"
              strata="N/A"
              imageUrl="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>

        {/* Property Watchlist Cards */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Property Watchlist Cards</h6>
          <p className="text-sm text-neutral-600">
            Compact horizontal cards for tracking saved properties and price changes
          </p>
          <div className="space-y-4">
            <PropertyWatchlistCard
              title="Modern Apartment"
              address="789 Collins St, Melbourne"
              price="$850,000"
              priceChange="+$25,000"
              changeType="increase"
              daysListed={14}
              imageUrl="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=3550&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <PropertyWatchlistCard
              title="Family Home"
              address="321 Smith St, Sydney"
              price="$1,150,000"
              priceChange="-$50,000"
              changeType="decrease"
              daysListed={28}
              imageUrl="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
