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
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
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
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h6 className="font-semibold text-neutral-800">Solid Badges</h6>
            <div className="flex flex-wrap gap-4">
              <Badge variant="featured" size="pill">
                Featured
              </Badge>
              <Badge variant="available" size="pill">
                Available
              </Badge>
              <Badge variant="pending" size="pill">
                Pending
              </Badge>
              <Badge variant="sold" size="pill">
                Sold
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h6 className="font-semibold text-neutral-800">Outlined Badges with Icons</h6>
            <div className="flex flex-wrap gap-4">
              <Badge variant="success-outlined" size="pill">
                <CheckCircle className="mr-1 h-3 w-3" />
                Verified
              </Badge>
              <Badge variant="warning-outlined" size="pill">
                <Star className="mr-1 h-3 w-3" />
                Premium
              </Badge>
              <Badge variant="primary-outlined" size="pill">
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
        <CardContent className="space-y-6">
          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertDescription variant="info">
              Your property listing has been successfully updated and is now live.
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription variant="success">
              Contract has been signed and submitted for legal review.
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription variant="warning">
              Finance approval deadline is approaching in 3 business days.
            </AlertDescription>
          </Alert>

          <Alert variant="danger">
            <X className="h-4 w-4" />
            <AlertDescription variant="danger">
              Payment processing failed. Please update your payment method.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
