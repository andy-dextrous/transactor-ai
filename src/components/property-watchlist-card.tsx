import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, X } from "lucide-react"
import Image from "next/image"

interface PropertyWatchlistCardProps {
  title: string
  address: string
  price: string
  priceChange: string
  changeType: "increase" | "decrease"
  daysListed: number
  imageUrl: string
}

/*************************************************************************/
/*  PROPERTY WATCHLIST CARD COMPONENT
    Compact horizontal card for watchlist properties with price tracking
*************************************************************************/

export function PropertyWatchlistCard({
  title,
  address,
  price,
  priceChange,
  changeType,
  daysListed,
  imageUrl,
}: PropertyWatchlistCardProps) {
  return (
    <div className="flex gap-4 rounded-xl bg-neutral-100 p-4">
      <Image
        src={imageUrl}
        alt={title}
        className="h-16 w-20 rounded-lg object-cover"
        width={80}
        height={64}
      />
      <div className="flex-1">
        <h4 className="font-semibold text-neutral-900">{title}</h4>
        <p className="text-sm text-neutral-600">{address}</p>
        <div className="mt-2 flex items-center gap-4">
          <span className="text-primary font-bold">{price}</span>
          <Badge
            className={`rounded-full text-xs ${
              changeType === "increase"
                ? "bg-danger-100 text-danger-700"
                : "bg-success-100 text-success-700"
            }`}
          >
            {priceChange}
          </Badge>
          <span className="text-xs text-neutral-500">{daysListed} days listed</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="ghost" size="icon" className="rounded-lg">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-lg">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
