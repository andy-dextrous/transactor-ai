import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, DollarSign, Clock, Mail, Plus } from "lucide-react"

interface ServiceProviderCardProps {
  name: string
  specialty: string
  rating: number
  location: string
  price: string
  availability: string
  badges: string[]
  avatar?: string
}

/*************************************************************************/
/*  SERVICE PROVIDER CARD COMPONENT
    Professional service provider card with ratings and contact info
*************************************************************************/

export function ServiceProviderCard({
  name,
  specialty,
  rating,
  location,
  price,
  availability,
  badges,
  avatar,
}: ServiceProviderCardProps) {
  return (
    <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatar} />
              <AvatarFallback className="bg-primary font-semibold text-white">
                {name
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-neutral-900">{name}</h3>
              <p className="text-sm text-neutral-600">{specialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="text-warning-400 h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>

        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <DollarSign className="h-4 w-4" />
            <span>{price}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Clock className="h-4 w-4" />
            <span>{availability}</span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <Badge key={index} variant="secondary" className="rounded-full text-xs">
              {badge}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 rounded-xl">
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
