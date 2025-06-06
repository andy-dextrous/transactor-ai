import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MapPin, Bed, Bath, Car, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PropertyCardProps {
  title: string
  price: string
  location: string
  beds: number
  baths: number
  parking: number
  imageUrl: string
  featured?: boolean
  rating?: number
  priceChange?: string
}

/*************************************************************************/
/*  PROPERTY CARD COMPONENT
/*************************************************************************/

export function PropertyCard({
  title,
  price,
  location,
  beds,
  baths,
  parking,
  imageUrl,
  featured = false,
  rating = 4.8,
  priceChange,
}: PropertyCardProps) {
  return (
    <Card className="transform overflow-hidden rounded-2xl border-0 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="group relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
        >
          <Heart className="h-5 w-5 text-gray-600" />
        </Button>

        {featured && (
          <Badge className="bg-primary absolute top-4 left-4 rounded-full px-3 py-1 font-semibold text-white shadow-lg">
            <Star className="mr-1 h-3 w-3" />
            Featured
          </Badge>
        )}

        {priceChange && (
          <Badge className="absolute bottom-4 left-4 rounded-full bg-green-500 px-3 py-1 font-semibold text-white shadow-lg">
            <TrendingUp className="mr-1 h-3 w-3" />
            {priceChange}
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">{rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gray-100 p-1.5">
                <Bed className="h-4 w-4" />
              </div>
              <span className="font-medium">{beds} beds</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gray-100 p-1.5">
                <Bath className="h-4 w-4" />
              </div>
              <span className="font-medium">{baths} baths</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gray-100 p-1.5">
                <Car className="h-4 w-4" />
              </div>
              <span className="font-medium">{parking} parking</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-primary text-2xl font-bold">{price}</span>
              <p className="text-sm font-medium text-gray-500">Negotiable</p>
            </div>
            <Button className="rounded-xl px-6 font-semibold shadow-md hover:shadow-lg">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
