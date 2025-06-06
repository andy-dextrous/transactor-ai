"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChatUI } from "@/components/chat-ui"
import { PropertyCard } from "@/components/property-card"
import { MainAppLayout, DashboardLayout } from "@/components/layout-examples"
import {
  Home,
  Search,
  Filter,
  Heart,
  Star,
  Download,
  Eye,
  Share,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Sparkles,
  Award,
  Zap,
  Shield,
  Users,
  BarChart3,
  Building,
  Clock,
} from "lucide-react"

export default function ComponentLibrary() {
  const [activeLayout, setActiveLayout] = useState<"main" | "dashboard" | "components">(
    "components"
  )

  if (activeLayout === "main") {
    return <MainAppLayout />
  }

  if (activeLayout === "dashboard") {
    return <DashboardLayout />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 px-8 py-6 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-xl p-2">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                PropertyAI Design System
              </h1>
              <p className="text-sm font-medium text-neutral-600">
                Comprehensive component library
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant={activeLayout === "components" ? "default" : "outline"}
              onClick={() => setActiveLayout("components")}
              className="btn rounded-xl font-semibold"
            >
              Components
            </Button>
            <Button
              onClick={() => setActiveLayout("main")}
              className="btn rounded-xl font-semibold"
            >
              Main Layout
            </Button>
            <Button
              onClick={() => setActiveLayout("dashboard")}
              className="btn rounded-xl font-semibold"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* Design System Overview */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-900">
              Genesis-Inspired Design System
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              A comprehensive, modern design system featuring refined typography,
              sophisticated color palettes, and elegant component styling for premium user
              experiences.
            </p>
          </div>

          {/* Color Palette */}
          <Card className="card-elevated mb-8 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-neutral-900">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Sparkles className="text-primary h-5 w-5" />
                </div>
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-900">Primary</h4>
                  <div className="space-y-2">
                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                      <div key={shade} className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-lg bg-primary-${shade} border border-neutral-200`}
                        />
                        <span className="font-mono text-sm text-neutral-600">
                          {shade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-900">Success</h4>
                  <div className="space-y-2">
                    {[50, 200, 400, 500, 600, 800].map(shade => (
                      <div key={shade} className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-lg bg-success-${shade} border border-neutral-200`}
                        />
                        <span className="font-mono text-sm text-neutral-600">
                          {shade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-900">Warning</h4>
                  <div className="space-y-2">
                    {[50, 200, 400, 500, 600, 800].map(shade => (
                      <div key={shade} className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-lg bg-warning-${shade} border border-neutral-200`}
                        />
                        <span className="font-mono text-sm text-neutral-600">
                          {shade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-900">Danger</h4>
                  <div className="space-y-2">
                    {[50, 200, 400, 500, 600, 800].map(shade => (
                      <div key={shade} className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-lg bg-danger-${shade} border border-neutral-200`}
                        />
                        <span className="font-mono text-sm text-neutral-600">
                          {shade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-neutral-900">Neutral</h4>
                  <div className="space-y-2">
                    {[50, 200, 400, 500, 600, 800].map(shade => (
                      <div key={shade} className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-lg bg-neutral-${shade} border border-neutral-200`}
                        />
                        <span className="font-mono text-sm text-neutral-600">
                          {shade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Typography */}
          <Card className="card-elevated rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Award className="text-primary h-5 w-5" />
                </div>
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-neutral-900">Heading 1 - Display Large</h1>
                <h2 className="text-neutral-900">Heading 2 - Display Medium</h2>
                <h3 className="text-neutral-900">Heading 3 - Display Small</h3>
                <h4 className="text-neutral-900">Heading 4 - Title Large</h4>
                <h5 className="text-neutral-900">Heading 5 - Title Medium</h5>
                <h6 className="text-neutral-900">Heading 6 - Title Small</h6>
              </div>
              <div className="space-y-3 border-t border-neutral-200 pt-4">
                <p className="text-lg font-medium text-neutral-900">
                  Body Large - Primary content
                </p>
                <p className="text-base text-neutral-700">
                  Body Medium - Standard paragraph text
                </p>
                <p className="text-sm text-neutral-600">
                  Body Small - Secondary information
                </p>
                <p className="text-xs font-medium text-neutral-500">
                  Caption - Labels and metadata
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Buttons Section */}
          <Card className="card-elevated rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Zap className="text-primary h-5 w-5" />
                </div>
                Buttons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="btn btn-primary rounded-xl font-semibold">
                    Primary
                  </Button>
                  <Button className="btn btn-secondary rounded-xl font-semibold">
                    Secondary
                  </Button>
                  <Button className="btn btn-outline rounded-xl font-semibold">
                    Outline
                  </Button>
                  <Button className="btn btn-ghost rounded-xl font-semibold">
                    Ghost
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="btn btn-primary rounded-xl font-semibold">
                    Small
                  </Button>
                  <Button className="btn btn-primary rounded-xl font-semibold">
                    Medium
                  </Button>
                  <Button size="lg" className="btn btn-primary rounded-xl font-semibold">
                    Large
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="btn btn-primary rounded-xl font-semibold">
                    <Sparkles className="mr-2 h-4 w-4" />
                    With Icon
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="btn-outline rounded-xl"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="btn-outline rounded-xl"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="btn-outline rounded-xl"
                  >
                    <Filter className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badges Section */}
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
            </CardContent>
          </Card>

          {/* Alerts Section */}
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

          {/* Form Elements */}
          <Card className="card-elevated col-span-full rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Users className="text-primary h-5 w-5" />
                </div>
                Form Elements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-neutral-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="input-field"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-semibold text-neutral-700"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message here..."
                      className="input-field min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <Switch id="notifications" />
                    <Label
                      htmlFor="notifications"
                      className="text-sm font-medium text-neutral-700"
                    >
                      Enable email notifications
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox id="terms" />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium text-neutral-700"
                    >
                      I agree to the terms and conditions
                    </Label>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-neutral-700">
                      User Type
                    </Label>
                    <RadioGroup defaultValue="buyer">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="buyer" id="buyer" />
                        <Label
                          htmlFor="buyer"
                          className="text-sm font-medium text-neutral-700"
                        >
                          Property Buyer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="seller" id="seller" />
                        <Label
                          htmlFor="seller"
                          className="text-sm font-medium text-neutral-700"
                        >
                          Property Seller
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="agent" id="agent" />
                        <Label
                          htmlFor="agent"
                          className="text-sm font-medium text-neutral-700"
                        >
                          Real Estate Agent
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-neutral-700">
                      Quick Actions
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="btn-outline rounded-lg"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="btn-outline rounded-lg"
                      >
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="btn-outline rounded-lg"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Card className="card-elevated col-span-full rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
                <div className="bg-primary/10 rounded-lg p-2">
                  <BarChart3 className="text-primary h-5 w-5" />
                </div>
                Tabs & Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 rounded-xl bg-neutral-100 p-1">
                  <TabsTrigger value="overview" className="rounded-lg font-semibold">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="properties" className="rounded-lg font-semibold">
                    Properties
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="rounded-lg font-semibold">
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="rounded-lg font-semibold">
                    Analytics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="from-primary-50 to-primary-100 rounded-xl border-0 bg-gradient-to-br shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/20 rounded-xl p-3">
                            <Home className="text-primary h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-primary-700 text-sm font-semibold">
                              Total Properties
                            </p>
                            <p className="text-primary text-3xl font-bold">247</p>
                            <p className="text-primary-600 text-xs">
                              +12% from last month
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="from-success-50 to-success-100 rounded-xl border-0 bg-gradient-to-br shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-success-500/20 rounded-xl p-3">
                            <DollarSign className="text-success-600 h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-success-700 text-sm font-semibold">
                              Total Value
                            </p>
                            <p className="text-success-600 text-3xl font-bold">$24.7M</p>
                            <p className="text-success-600 text-xs">
                              +8.5% from last month
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="from-warning-50 to-warning-100 rounded-xl border-0 bg-gradient-to-br shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-warning-500/20 rounded-xl p-3">
                            <Calendar className="text-warning-600 h-6 w-6" />
                          </div>
                          <div>
                            <p className="text-warning-700 text-sm font-semibold">
                              Active Deals
                            </p>
                            <p className="text-warning-600 text-3xl font-bold">18</p>
                            <p className="text-warning-600 text-xs">
                              3 closing this week
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="properties" className="mt-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <PropertyCard
                      title="Luxury Penthouse with Harbor Views"
                      price="$3,250,000"
                      location="Sydney Harbour, NSW"
                      beds={4}
                      baths={3}
                      parking={2}
                      imageUrl="/placeholder.svg?height=300&width=400"
                      featured
                      rating={4.9}
                      priceChange="+5.2%"
                    />
                    <PropertyCard
                      title="Modern Family Home with Pool"
                      price="$1,850,000"
                      location="Brighton, VIC"
                      beds={5}
                      baths={3}
                      parking={2}
                      imageUrl="/placeholder.svg?height=300&width=400"
                      rating={4.7}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="transactions" className="mt-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-gradient-to-r from-neutral-50 to-neutral-100 p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-success-100 rounded-lg p-2">
                          <CheckCircle className="text-success-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">
                            123 Collins Street, Melbourne
                          </p>
                          <p className="text-sm text-neutral-600">
                            Settlement completed successfully
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-success-500 rounded-full px-4 py-2 font-semibold text-white">
                        Complete
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-gradient-to-r from-neutral-50 to-neutral-100 p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-warning-100 rounded-lg p-2">
                          <Clock className="text-warning-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">
                            456 George Street, Sydney
                          </p>
                          <p className="text-sm text-neutral-600">
                            Awaiting finance approval
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-warning-500 rounded-full px-4 py-2 font-semibold text-white">
                        In Progress
                      </Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="mt-8">
                  <div className="py-12 text-center">
                    <div className="bg-primary/10 mb-4 inline-block rounded-2xl p-4">
                      <BarChart3 className="text-primary h-12 w-12" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-neutral-900">
                      Analytics Dashboard
                    </h3>
                    <p className="text-neutral-600">
                      Comprehensive analytics and reporting tools coming soon.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Chat UI Section */}
          <Card className="card-elevated col-span-full rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Sparkles className="text-primary h-5 w-5" />
                </div>
                AI Chat Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChatUI />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
