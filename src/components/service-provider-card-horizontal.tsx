import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, DollarSign, Clock, Mail, Plus } from "lucide-react"

interface ServiceProviderCardHorizontalProps {
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
/*  SERVICE PROVIDER CARD HORIZONTAL COMPONENT
    Horizontal layout service provider card with ratings and contact info
*************************************************************************/

export function ServiceProviderCardHorizontal({
  name,
  specialty,
  rating,
  location,
  price,
  availability,
  badges,
  avatar,
}: ServiceProviderCardHorizontalProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:shadow-md">
      <div className="flex gap-4">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {name
                .split(" ")
                .map(n => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-neutral-900">{name}</h4>
              <p className="text-sm text-neutral-600">{specialty}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="fill-warning-400 text-warning-400 h-4 w-4" />
              <span className="text-sm font-medium text-neutral-900">{rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              <span>{price}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{availability}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="rounded-full px-2 py-0 text-xs"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button size="sm" className="btn btn-primary rounded-lg">
            <Mail className="mr-2 h-3 w-3" />
            Contact
          </Button>
          <Button variant="outline" size="sm" className="btn-outline rounded-lg">
            <Plus className="mr-2 h-3 w-3" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
