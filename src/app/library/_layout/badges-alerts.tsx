import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertCircle, CheckCircle, Star, TrendingUp, Info, X } from "lucide-react"

/*************************************************************************/
/*  BADGES & ALERTS COMPONENT
    Displays status indicators, badges, and notification alerts
*************************************************************************/

export function BadgesAlertsSection() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Badges */}
      <Card className="card-elevated rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
            <div className="bg-primary/10 rounded-lg p-2">
              <Shield className="text-primary h-5 w-5" />
            </div>
            Badges & Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h5 className="font-semibold text-neutral-800">Solid Badges</h5>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-primary rounded-full px-3 py-1 font-semibold text-white">
                Featured
              </Badge>
              <Badge className="bg-success-500 rounded-full px-3 py-1 font-semibold text-white">
                Available
              </Badge>
              <Badge className="bg-warning-500 rounded-full px-3 py-1 font-semibold text-white">
                Pending
              </Badge>
              <Badge className="bg-danger-500 rounded-full px-3 py-1 font-semibold text-white">
                Sold
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-semibold text-neutral-800">Outlined Badges with Icons</h5>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-success-100 text-success-700 border-success-200 rounded-full border px-3 py-1 font-semibold">
                <CheckCircle className="mr-1 h-3 w-3" />
                Verified
              </Badge>
              <Badge className="bg-warning-100 text-warning-700 border-warning-200 rounded-full border px-3 py-1 font-semibold">
                <Star className="mr-1 h-3 w-3" />
                Premium
              </Badge>
              <Badge className="bg-primary-100 text-primary-700 border-primary-200 rounded-full border px-3 py-1 font-semibold">
                <TrendingUp className="mr-1 h-3 w-3" />
                Trending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="card-elevated rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
            <div className="bg-primary/10 rounded-lg p-2">
              <AlertCircle className="text-primary h-5 w-5" />
            </div>
            Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-primary-200 bg-primary-50 rounded-xl">
            <Info className="text-primary h-4 w-4" />
            <AlertDescription className="text-primary-800 font-medium">
              Your property listing has been successfully updated and is now live.
            </AlertDescription>
          </Alert>

          <Alert className="border-success-200 bg-success-50 rounded-xl">
            <CheckCircle className="text-success-600 h-4 w-4" />
            <AlertDescription className="text-success-800 font-medium">
              Contract has been signed and submitted for legal review.
            </AlertDescription>
          </Alert>

          <Alert className="border-warning-200 bg-warning-50 rounded-xl">
            <AlertCircle className="text-warning-600 h-4 w-4" />
            <AlertDescription className="text-warning-800 font-medium">
              Finance approval deadline is approaching in 3 business days.
            </AlertDescription>
          </Alert>

          <Alert className="border-danger-200 bg-danger-50 rounded-xl">
            <X className="text-danger-600 h-4 w-4" />
            <AlertDescription className="text-danger-800 font-medium">
              Payment processing failed. Please update your payment method.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
