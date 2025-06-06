import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import Image from "next/image"

interface PropertyComparisonCardProps {
  title: string
  price: string
  address: string
  beds: number
  baths: number
  parking: number
  landSize: string
  yearBuilt: number
  councilRates: string
  strata: string
  imageUrl: string
}

/*************************************************************************/
/*  PROPERTY COMPARISON CARD COMPONENT
    Detailed property card with specifications for comparison
*************************************************************************/

export function PropertyComparisonCard({
  title,
  price,
  address,
  beds,
  baths,
  parking,
  landSize,
  yearBuilt,
  councilRates,
  strata,
  imageUrl,
}: PropertyComparisonCardProps) {
  return (
    <div className="space-y-4">
      <Image
        src={imageUrl}
        alt={title}
        className="h-48 w-full rounded-xl object-cover"
        width={400}
        height={200}
      />
      <div>
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-600">{address}</p>
        <p className="text-primary mt-2 text-xl font-bold">{price}</p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Bedrooms</span>
          <span className="font-medium">{beds}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Bathrooms</span>
          <span className="font-medium">{baths}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Parking</span>
          <span className="font-medium">{parking}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Land Size</span>
          <span className="font-medium">{landSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Year Built</span>
          <span className="font-medium">{yearBuilt}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Council Rates</span>
          <span className="font-medium">{councilRates}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-neutral-600">Strata Fees</span>
          <span className="font-medium">{strata}</span>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button className="flex-1 rounded-xl">
          <Heart className="mr-2 h-4 w-4" />
          Save Property
        </Button>
        <Button variant="outline" className="flex-1 rounded-xl">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
