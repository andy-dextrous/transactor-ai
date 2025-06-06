"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Calculator,
  DollarSign,
  FileText,
  MessageSquare,
  Upload,
  CheckCircle,
  Clock,
  Star,
  Mail,
  MapPin,
  Shield,
  TrendingUp,
  Calendar,
  Eye,
  Download,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Briefcase,
  Target,
  BookOpen,
  Settings,
  AlertTriangle,
  FileCheck,
  Gavel,
  Heart,
  Key,
  PieChart,
  Ruler,
  Scissors,
  Timer,
  Truck,
  Zap,
  Info,
  RotateCcw,
  BarChart3,
  Bell,
  Bookmark,
  Edit,
  Grid,
  Save,
  Share2,
  X,
} from "lucide-react"

// Property Comparison Tool
function PropertyComparison() {
  const properties = [
    {
      id: 1,
      title: "Modern Apartment",
      price: "$850,000",
      address: "123 Collins St, Melbourne",
      beds: 2,
      baths: 2,
      parking: 1,
      landSize: "N/A",
      yearBuilt: 2019,
      councilRates: "$2,400/year",
      strata: "$3,200/year",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=3550&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Family House",
      price: "$1,200,000",
      address: "456 Smith St, Sydney",
      beds: 4,
      baths: 3,
      parking: 2,
      landSize: "650m²",
      yearBuilt: 2015,
      councilRates: "$3,800/year",
      strata: "N/A",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Grid className="text-primary h-5 w-5" />
          </div>
          Property Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {properties.map(property => (
            <div key={property.id} className="space-y-4">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="h-48 w-full rounded-xl object-cover"
              />
              <div>
                <h3 className="font-semibold text-neutral-900">{property.title}</h3>
                <p className="text-sm text-neutral-600">{property.address}</p>
                <p className="text-primary mt-2 text-xl font-bold">{property.price}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Bedrooms</span>
                  <span className="font-medium">{property.beds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Bathrooms</span>
                  <span className="font-medium">{property.baths}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Parking</span>
                  <span className="font-medium">{property.parking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Land Size</span>
                  <span className="font-medium">{property.landSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Council Rates</span>
                  <span className="font-medium">{property.councilRates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Strata Fees</span>
                  <span className="font-medium">{property.strata}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="btn btn-primary flex-1 rounded-xl">
            <Heart className="mr-2 h-4 w-4" />
            Save Comparison
          </Button>
          <Button variant="outline" className="btn-outline flex-1 rounded-xl">
            <Share2 className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Market Analysis Dashboard
function MarketAnalysis() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <BarChart3 className="text-primary h-5 w-5" />
          </div>
          Market Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="from-primary-50 to-primary-100 rounded-xl bg-gradient-to-br p-4 text-center">
            <TrendingUp className="text-primary mx-auto mb-2 h-8 w-8" />
            <p className="text-primary-700 text-sm font-medium">Median Price</p>
            <p className="text-primary text-2xl font-bold">$1.2M</p>
            <p className="text-primary-600 text-xs">+8.5% YoY</p>
          </div>
          <div className="from-success-50 to-success-100 rounded-xl bg-gradient-to-br p-4 text-center">
            <Timer className="text-success-600 mx-auto mb-2 h-8 w-8" />
            <p className="text-success-700 text-sm font-medium">Days on Market</p>
            <p className="text-success-600 text-2xl font-bold">28</p>
            <p className="text-success-600 text-xs">-12% vs last quarter</p>
          </div>
          <div className="from-warning-50 to-warning-100 rounded-xl bg-gradient-to-br p-4 text-center">
            <PieChart className="text-warning-600 mx-auto mb-2 h-8 w-8" />
            <p className="text-warning-700 text-sm font-medium">Auction Rate</p>
            <p className="text-warning-600 text-2xl font-bold">72%</p>
            <p className="text-warning-600 text-xs">Above reserve</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-neutral-900">Recent Sales</h4>
          <div className="space-y-3">
            {[
              {
                address: "789 Park Ave",
                price: "$1.15M",
                date: "2 days ago",
                type: "Auction",
              },
              {
                address: "321 Oak St",
                price: "$980K",
                date: "1 week ago",
                type: "Private Sale",
              },
              {
                address: "654 Pine Rd",
                price: "$1.35M",
                date: "2 weeks ago",
                type: "Auction",
              },
            ].map((sale, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-neutral-50 p-3"
              >
                <div>
                  <p className="font-medium text-neutral-900">{sale.address}</p>
                  <p className="text-sm text-neutral-600">
                    {sale.date} • {sale.type}
                  </p>
                </div>
                <p className="text-primary font-bold">{sale.price}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Inspection Scheduler
function InspectionScheduler() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Calendar className="text-primary h-5 w-5" />
          </div>
          Schedule Inspections
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Property Address</Label>
            <Input placeholder="Enter property address" className="input-field" />
          </div>
          <div className="space-y-2">
            <Label>Inspection Type</Label>
            <Select>
              <SelectTrigger className="input-field">
                <SelectValue placeholder="Select inspection type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="building">Building Inspection</SelectItem>
                <SelectItem value="pest">Pest Inspection</SelectItem>
                <SelectItem value="combined">Building + Pest</SelectItem>
                <SelectItem value="strata">Strata Inspection</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Mon 29", "Tue 30", "Wed 31", "Thu 1"].map(date => (
            <Button
              key={date}
              variant="outline"
              className="btn-outline h-auto flex-col rounded-xl p-4"
            >
              <span className="text-sm font-medium">{date}</span>
              <span className="text-xs text-neutral-500">Available</span>
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-neutral-900">Available Time Slots</h4>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"].map(time => (
              <Button key={time} variant="outline" className="btn-outline rounded-lg">
                {time}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Special Instructions</Label>
          <Textarea
            placeholder="Any special access requirements or notes..."
            className="input-field min-h-[80px]"
          />
        </div>

        <Button className="btn btn-primary w-full rounded-xl">
          <Calendar className="mr-2 h-4 w-4" />
          Book Inspection
        </Button>
      </CardContent>
    </Card>
  )
}

// Offer Management System
function OfferManagement() {
  const offers = [
    {
      id: 1,
      property: "123 Collins St, Melbourne",
      amount: "$850,000",
      status: "pending",
      submitted: "2 hours ago",
      expires: "48 hours",
      conditions: ["Finance approval", "Building inspection"],
    },
    {
      id: 2,
      property: "456 Smith St, Sydney",
      amount: "$1,200,000",
      status: "accepted",
      submitted: "3 days ago",
      expires: "Accepted",
      conditions: ["Unconditional"],
    },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Gavel className="text-primary h-5 w-5" />
          </div>
          Offer Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {offers.map(offer => (
            <div key={offer.id} className="rounded-xl border border-neutral-200 p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-neutral-900">{offer.property}</h4>
                  <p className="text-primary text-2xl font-bold">{offer.amount}</p>
                </div>
                <Badge
                  className={`rounded-full ${
                    offer.status === "accepted"
                      ? "bg-success-500"
                      : offer.status === "pending"
                        ? "bg-warning-500"
                        : "bg-neutral-500"
                  } text-white`}
                >
                  {offer.status}
                </Badge>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-600">Submitted:</span>
                  <span className="ml-2 font-medium">{offer.submitted}</span>
                </div>
                <div>
                  <span className="text-neutral-600">Expires:</span>
                  <span className="ml-2 font-medium">{offer.expires}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="mb-2 text-sm text-neutral-600">Conditions:</p>
                <div className="flex flex-wrap gap-2">
                  {offer.conditions.map((condition, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="rounded-full text-xs"
                    >
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="btn-outline flex-1 rounded-lg">
                  <Edit className="mr-2 h-4 w-4" />
                  Modify
                </Button>
                <Button variant="outline" className="btn-outline flex-1 rounded-lg">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          ))}

          <Button className="btn btn-primary w-full rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Submit New Offer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Settlement Calculator
function SettlementCalculator() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Calculator className="text-primary h-5 w-5" />
          </div>
          Settlement Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Purchase Price</Label>
            <Input placeholder="$1,200,000" className="input-field" />
          </div>
          <div className="space-y-2">
            <Label>Deposit Paid</Label>
            <Input placeholder="$120,000" className="input-field" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-neutral-900">Additional Costs</h4>
          <div className="space-y-3">
            {[
              { label: "Stamp Duty", amount: "$48,000", editable: false },
              { label: "Legal Fees", amount: "$1,500", editable: true },
              { label: "Building Inspection", amount: "$600", editable: true },
              { label: "Loan Establishment", amount: "$800", editable: true },
            ].map((cost, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-neutral-50 p-3"
              >
                <span className="text-sm text-neutral-700">{cost.label}</span>
                {cost.editable ? (
                  <Input
                    className="h-8 w-24 text-right"
                    defaultValue={cost.amount.replace("$", "")}
                  />
                ) : (
                  <span className="font-medium">{cost.amount}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="from-primary-50 to-primary-100 rounded-xl bg-gradient-to-r p-6">
          <div className="text-center">
            <p className="text-primary-700 mb-2 text-sm font-medium">
              Total Required at Settlement
            </p>
            <p className="text-primary text-3xl font-bold">$1,130,900</p>
            <p className="text-primary-600 mt-2 text-sm">
              Including all fees and adjustments
            </p>
          </div>
        </div>

        <Button className="btn btn-primary w-full rounded-xl">
          <Download className="mr-2 h-4 w-4" />
          Download Settlement Statement
        </Button>
      </CardContent>
    </Card>
  )
}

// Digital Signature Component
function DigitalSignature() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <FileCheck className="text-primary h-5 w-5" />
          </div>
          Digital Signatures
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-xl border-2 border-dashed border-neutral-300 p-8 text-center">
            <div className="mb-4 inline-block rounded-xl bg-neutral-100 p-3">
              <Scissors className="h-8 w-8 text-neutral-600" />
            </div>
            <h3 className="mb-2 font-semibold text-neutral-900">Sign Document</h3>
            <p className="mb-4 text-sm text-neutral-600">
              Draw your signature in the box below
            </p>
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg border-2 border-neutral-200 bg-white">
              <p className="text-neutral-400">Signature area</p>
            </div>
            <div className="flex justify-center gap-2">
              <Button variant="outline" className="btn-outline rounded-lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button className="btn btn-primary rounded-lg">
                <Save className="mr-2 h-4 w-4" />
                Save Signature
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900">Pending Signatures</h4>
            {[
              { doc: "Contract of Sale", status: "awaiting", party: "You" },
              { doc: "Finance Clause Waiver", status: "signed", party: "You" },
              { doc: "Building Inspection Waiver", status: "awaiting", party: "Vendor" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-neutral-50 p-3"
              >
                <div>
                  <p className="font-medium text-neutral-900">{item.doc}</p>
                  <p className="text-sm text-neutral-600">
                    Awaiting signature from {item.party}
                  </p>
                </div>
                <Badge
                  className={`rounded-full ${
                    item.status === "signed"
                      ? "bg-success-100 text-success-700"
                      : "bg-warning-100 text-warning-700"
                  }`}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Notification Center
function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      type: "urgent",
      title: "Finance approval expires in 2 days",
      message:
        "Your finance approval from ANZ expires on Feb 15. Contact your broker to extend.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Building inspection completed",
      message:
        "Mike Johnson has completed the building inspection. Report available for download.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "New message from conveyancer",
      message: "Sarah Chen has sent you an updated contract for review.",
      time: "1 day ago",
      read: true,
    },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Bell className="text-primary h-5 w-5" />
          </div>
          Notifications
          <Badge className="bg-primary rounded-full text-white">3</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`rounded-xl border p-4 ${
                !notification.read
                  ? "bg-primary-50 border-primary-200"
                  : "border-neutral-200 bg-neutral-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-lg p-1.5 ${
                    notification.type === "urgent"
                      ? "bg-danger-100"
                      : notification.type === "success"
                        ? "bg-success-100"
                        : "bg-primary-100"
                  }`}
                >
                  {notification.type === "urgent" ? (
                    <AlertTriangle className="text-danger-600 h-4 w-4" />
                  ) : notification.type === "success" ? (
                    <CheckCircle className="text-success-600 h-4 w-4" />
                  ) : (
                    <Info className="text-primary h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-neutral-900">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-neutral-500">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">{notification.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="btn-outline mt-4 w-full rounded-xl">
          View All Notifications
        </Button>
      </CardContent>
    </Card>
  )
}

// Property Watchlist
function PropertyWatchlist() {
  const watchedProperties = [
    {
      id: 1,
      title: "Modern Apartment",
      address: "789 Collins St, Melbourne",
      price: "$850,000",
      priceChange: "+$25,000",
      changeType: "increase",
      daysListed: 14,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Family Home",
      address: "321 Smith St, Sydney",
      price: "$1,150,000",
      priceChange: "-$50,000",
      changeType: "decrease",
      daysListed: 28,
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Bookmark className="text-primary h-5 w-5" />
          </div>
          Property Watchlist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {watchedProperties.map(property => (
            <div key={property.id} className="flex gap-4 rounded-xl bg-neutral-50 p-4">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="h-16 w-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">{property.title}</h4>
                <p className="text-sm text-neutral-600">{property.address}</p>
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-primary font-bold">{property.price}</span>
                  <Badge
                    className={`rounded-full text-xs ${
                      property.changeType === "increase"
                        ? "bg-danger-100 text-danger-700"
                        : "bg-success-100 text-success-700"
                    }`}
                  >
                    {property.priceChange}
                  </Badge>
                  <span className="text-xs text-neutral-500">
                    {property.daysListed} days listed
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="icon" className="btn-ghost rounded-lg">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="btn-ghost rounded-lg">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button className="btn btn-primary mt-4 w-full rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          Add Property to Watchlist
        </Button>
      </CardContent>
    </Card>
  )
}

// Finance Calculator Component
function FinanceCalculator() {
  const [loanAmount, setLoanAmount] = useState("800000")
  const [interestRate, setInterestRate] = useState("6.5")
  const [loanTerm, setLoanTerm] = useState("30")

  const monthlyPayment = (
    (Number.parseFloat(loanAmount) * (Number.parseFloat(interestRate) / 100 / 12)) /
    (1 -
      Math.pow(
        1 + Number.parseFloat(interestRate) / 100 / 12,
        -Number.parseFloat(loanTerm) * 12
      ))
  ).toFixed(2)

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Calculator className="text-primary h-5 w-5" />
          </div>
          Loan Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="loan-amount">Loan Amount</Label>
            <Input
              id="loan-amount"
              value={loanAmount}
              onChange={e => setLoanAmount(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              value={interestRate}
              onChange={e => setInterestRate(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loan-term">Loan Term (years)</Label>
            <Input
              id="loan-term"
              value={loanTerm}
              onChange={e => setLoanTerm(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="from-primary-50 to-primary-100 rounded-xl bg-gradient-to-r p-6">
          <div className="text-center">
            <p className="text-primary-700 mb-2 text-sm font-medium">Monthly Payment</p>
            <p className="text-primary text-3xl font-bold">${monthlyPayment}</p>
            <p className="text-primary-600 mt-2 text-sm">Principal & Interest</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-neutral-50 p-4 text-center">
            <p className="text-sm text-neutral-600">Total Interest</p>
            <p className="text-xl font-bold text-neutral-900">
              $
              {(
                Number.parseFloat(monthlyPayment) * Number.parseFloat(loanTerm) * 12 -
                Number.parseFloat(loanAmount)
              ).toFixed(0)}
            </p>
          </div>
          <div className="rounded-xl bg-neutral-50 p-4 text-center">
            <p className="text-sm text-neutral-600">Total Paid</p>
            <p className="text-xl font-bold text-neutral-900">
              $
              {(
                Number.parseFloat(monthlyPayment) *
                Number.parseFloat(loanTerm) *
                12
              ).toFixed(0)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Equity Calculator Component
function EquityCalculator() {
  const [propertyValue, setPropertyValue] = useState("1200000")
  const [loanBalance, setLoanBalance] = useState("800000")

  const equity = Number.parseFloat(propertyValue) - Number.parseFloat(loanBalance)
  const equityPercentage = ((equity / Number.parseFloat(propertyValue)) * 100).toFixed(1)

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-success-500/10 rounded-lg p-2">
            <TrendingUp className="text-success-600 h-5 w-5" />
          </div>
          Equity Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="property-value">Current Property Value</Label>
            <Input
              id="property-value"
              value={propertyValue}
              onChange={e => setPropertyValue(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loan-balance">Outstanding Loan Balance</Label>
            <Input
              id="loan-balance"
              value={loanBalance}
              onChange={e => setLoanBalance(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="from-success-50 to-success-100 rounded-xl bg-gradient-to-r p-6">
          <div className="text-center">
            <p className="text-success-700 mb-2 text-sm font-medium">Your Equity</p>
            <p className="text-success-600 text-3xl font-bold">
              ${equity.toLocaleString()}
            </p>
            <p className="text-success-600 mt-2 text-sm">
              {equityPercentage}% of property value
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Equity Percentage</span>
            <span className="font-semibold">{equityPercentage}%</span>
          </div>
          <Progress value={Number.parseFloat(equityPercentage)} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}

// Service Provider Card Component
function ServiceProviderCard({ provider }: { provider: any }) {
  return (
    <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={provider.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary font-semibold text-white">
                {provider.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-neutral-900">{provider.name}</h3>
              <p className="text-sm text-neutral-600">{provider.specialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="text-warning-400 h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{provider.rating}</span>
          </div>
        </div>

        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin className="h-4 w-4" />
            <span>{provider.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <DollarSign className="h-4 w-4" />
            <span>{provider.price}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Clock className="h-4 w-4" />
            <span>{provider.availability}</span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {provider.badges.map((badge: string, index: number) => (
            <Badge key={index} variant="secondary" className="rounded-full text-xs">
              {badge}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button className="btn btn-primary flex-1 rounded-xl">
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button variant="outline" className="btn-outline rounded-xl">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Transaction Timeline Component
function TransactionTimeline() {
  const milestones = [
    { id: 1, title: "Contract Signed", status: "completed", date: "2024-01-15" },
    { id: 2, title: "Finance Approval", status: "completed", date: "2024-01-22" },
    { id: 3, title: "Building Inspection", status: "in-progress", date: "2024-01-28" },
    { id: 4, title: "Unconditional", status: "pending", date: "2024-02-05" },
    { id: 5, title: "Settlement", status: "pending", date: "2024-02-20" },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Calendar className="text-primary h-5 w-5" />
          </div>
          Transaction Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    milestone.status === "completed"
                      ? "bg-success-500"
                      : milestone.status === "in-progress"
                        ? "bg-warning-500"
                        : "bg-neutral-200"
                  }`}
                >
                  {milestone.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-white" />
                  ) : milestone.status === "in-progress" ? (
                    <Clock className="h-5 w-5 text-white" />
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-neutral-400" />
                  )}
                </div>
                {index < milestones.length - 1 && (
                  <div className="mt-2 h-8 w-0.5 bg-neutral-200" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-neutral-900">{milestone.title}</h4>
                  <span className="text-sm text-neutral-500">{milestone.date}</span>
                </div>
                <Badge
                  className={`mt-1 rounded-full text-xs ${
                    milestone.status === "completed"
                      ? "bg-success-100 text-success-700"
                      : milestone.status === "in-progress"
                        ? "bg-warning-100 text-warning-700"
                        : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {milestone.status.replace("-", " ")}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Communication Hub Component
function CommunicationHub() {
  const conversations = [
    {
      id: 1,
      participant: "Sarah Chen - Conveyancer",
      lastMessage: "Contract review completed. Ready for your signature.",
      timestamp: "2 hours ago",
      unread: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      participant: "Mike Johnson - Building Inspector",
      lastMessage: "Inspection scheduled for tomorrow at 10 AM",
      timestamp: "5 hours ago",
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      participant: "Emma Wilson - Real Estate Agent",
      lastMessage: "Vendor has accepted your offer!",
      timestamp: "1 day ago",
      unread: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <MessageSquare className="text-primary h-5 w-5" />
          </div>
          Communication Hub
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl bg-neutral-50 p-4 transition-colors hover:bg-neutral-100"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-sm text-white">
                  {conversation.participant.split(" ")[0][0]}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="truncate font-semibold text-neutral-900">
                    {conversation.participant}
                  </h4>
                  <span className="text-xs text-neutral-500">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="truncate text-sm text-neutral-600">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread > 0 && (
                <Badge className="bg-primary h-5 min-w-[20px] rounded-full text-xs text-white">
                  {conversation.unread}
                </Badge>
              )}
            </div>
          ))}
          <Button className="btn btn-primary w-full rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Start New Conversation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Document Manager Component
function DocumentManager() {
  const documents = [
    {
      id: 1,
      name: "Contract of Sale",
      type: "PDF",
      size: "2.4 MB",
      status: "signed",
      uploadedBy: "Sarah Chen",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Building Inspection Report",
      type: "PDF",
      size: "1.8 MB",
      status: "pending",
      uploadedBy: "Mike Johnson",
      date: "2024-01-20",
    },
    {
      id: 3,
      name: "Finance Pre-approval",
      type: "PDF",
      size: "856 KB",
      status: "approved",
      uploadedBy: "You",
      date: "2024-01-10",
    },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <FileText className="text-primary h-5 w-5" />
          </div>
          Document Manager
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="hover:border-primary rounded-xl border-2 border-dashed border-neutral-300 p-6 text-center transition-colors">
            <Upload className="mx-auto mb-2 h-8 w-8 text-neutral-400" />
            <p className="mb-2 text-sm text-neutral-600">
              Drag and drop files here, or click to browse
            </p>
            <Button variant="outline" className="btn-outline rounded-lg">
              Upload Documents
            </Button>
          </div>

          <div className="space-y-3">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="flex items-center gap-3 rounded-xl bg-neutral-50 p-4"
              >
                <div className="bg-primary/10 rounded-lg p-2">
                  <FileText className="text-primary h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-neutral-900">{doc.name}</h4>
                    <Badge
                      className={`rounded-full text-xs ${
                        doc.status === "signed"
                          ? "bg-success-100 text-success-700"
                          : doc.status === "approved"
                            ? "bg-primary-100 text-primary-700"
                            : "bg-warning-100 text-warning-700"
                      }`}
                    >
                      {doc.status}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-sm text-neutral-600">
                    <span>
                      {doc.type} • {doc.size}
                    </span>
                    <span>Uploaded by {doc.uploadedBy}</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="btn-ghost rounded-lg">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="btn-ghost rounded-lg">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Service Provider Directory Component
function ServiceProviderDirectory() {
  const providers = [
    {
      name: "Sarah Chen",
      specialty: "Conveyancer",
      rating: 4.9,
      location: "Sydney CBD",
      price: "$1,200 - $1,800",
      availability: "Available this week",
      badges: ["Licensed", "5+ years", "Property Law"],
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "Mike Johnson",
      specialty: "Building Inspector",
      rating: 4.8,
      location: "Eastern Suburbs",
      price: "$450 - $650",
      availability: "Next available: Tomorrow",
      badges: ["Certified", "Thermal Imaging", "Pest Inspection"],
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      name: "David Park",
      specialty: "Mortgage Broker",
      rating: 4.9,
      location: "North Shore",
      price: "No upfront fees",
      availability: "Available today",
      badges: ["MFAA Member", "30+ Lenders", "First Home Buyer"],
      avatar: "/placeholder.svg?height=48&width=48",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-neutral-900">Service Providers</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="btn-outline rounded-xl">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="btn-outline rounded-xl">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider, index) => (
          <ServiceProviderCard key={index} provider={provider} />
        ))}
      </div>
    </div>
  )
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("pre-purchase")

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 px-8 py-6 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-xl p-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Component Library</h1>
              <p className="text-sm font-medium text-neutral-600">
                Real Estate Transaction Management Components
              </p>
            </div>
          </div>
          <Button className="btn btn-primary rounded-xl">
            <ArrowRight className="mr-2 h-4 w-4" />
            Back to Main
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-3 rounded-xl bg-neutral-100 p-1">
            <TabsTrigger value="pre-purchase" className="rounded-lg font-semibold">
              <Target className="mr-2 h-4 w-4" />
              Pre-Purchase
            </TabsTrigger>
            <TabsTrigger value="during-purchase" className="rounded-lg font-semibold">
              <Briefcase className="mr-2 h-4 w-4" />
              During Purchase
            </TabsTrigger>
            <TabsTrigger value="post-purchase" className="rounded-lg font-semibold">
              <Key className="mr-2 h-4 w-4" />
              Post-Purchase
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pre-purchase" className="space-y-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">
                Pre-Purchase Components
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-neutral-600">
                Tools and components to help buyers prepare for their property purchase
                journey
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <FinanceCalculator />
              <EquityCalculator />
            </div>

            <ServiceProviderDirectory />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <PropertyComparison />
              <MarketAnalysis />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <InspectionScheduler />
              <PropertyWatchlist />
            </div>

            <OfferManagement />
            <SettlementCalculator />
          </TabsContent>

          <TabsContent value="during-purchase" className="space-y-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">
                During Purchase Components
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-neutral-600">
                Manage communications, track progress, and handle documentation throughout
                the transaction
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <TransactionTimeline />
              <CommunicationHub />
            </div>

            <DocumentManager />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <DigitalSignature />
              <NotificationCenter />
            </div>
          </TabsContent>

          <TabsContent value="post-purchase" className="space-y-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-900">
                Post-Purchase Components
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-neutral-600">
                Tools and services to help after settlement completion
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Utility Connection Card */}
              <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-warning-500/10 mb-4 inline-block rounded-xl p-3">
                    <Zap className="text-warning-600 h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">
                    Utility Connections
                  </h3>
                  <p className="mb-4 text-sm text-neutral-600">
                    Set up electricity, gas, water, and internet
                  </p>
                  <Button className="btn btn-primary w-full rounded-xl">
                    Connect Services
                  </Button>
                </CardContent>
              </Card>

              {/* Home Insurance Card */}
              <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-success-500/10 mb-4 inline-block rounded-xl p-3">
                    <Shield className="text-success-600 h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">Home Insurance</h3>
                  <p className="mb-4 text-sm text-neutral-600">
                    Compare and purchase home insurance policies
                  </p>
                  <Button className="btn btn-primary w-full rounded-xl">
                    Get Quotes
                  </Button>
                </CardContent>
              </Card>

              {/* Moving Services Card */}
              <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 mb-4 inline-block rounded-xl p-3">
                    <Truck className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">Moving Services</h3>
                  <p className="mb-4 text-sm text-neutral-600">
                    Find and book professional moving companies
                  </p>
                  <Button className="btn btn-primary w-full rounded-xl">
                    Find Movers
                  </Button>
                </CardContent>
              </Card>

              {/* Home Maintenance Card */}
              <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-block rounded-xl bg-neutral-500/10 p-3">
                    <Settings className="h-8 w-8 text-neutral-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">
                    Home Maintenance
                  </h3>
                  <p className="mb-4 text-sm text-neutral-600">
                    Schedule regular maintenance and repairs
                  </p>
                  <Button className="btn btn-primary w-full rounded-xl">
                    Book Services
                  </Button>
                </CardContent>
              </Card>

              {/* Property Valuation Card */}
              <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 mb-4 inline-block rounded-xl p-3">
                    <TrendingUp className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">
                    Property Valuation
                  </h3>
                  <p className="mb-4 text-sm text-neutral-600">
                    Track your property's value over time
                  </p>
                  <Button className="btn btn-primary w-full rounded-xl">
                    Get Valuation
                  </Button>
                </CardContent>
              </Card>

              {/* Renovation Planning Card */}
              <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-warning-500/10 mb-4 inline-block rounded-xl p-3">
                    <Ruler className="text-warning-600 h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-semibold text-neutral-900">
                    Renovation Planning
                  </h3>
                  <p className="mb-4 text-sm text-neutral-600">
                    Plan and manage home improvement projects
                  </p>
                  <Button className="btn btn-primary w-full rounded-xl">
                    Start Planning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Component Showcase */}
        <div className="mt-16 space-y-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900">
              Additional Components
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              Supporting components for enhanced user experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Quick Action Cards */}
            <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 mb-4 inline-block rounded-xl p-3">
                  <Calculator className="text-primary h-8 w-8" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  Stamp Duty Calculator
                </h3>
                <p className="mb-4 text-sm text-neutral-600">
                  Calculate stamp duty costs for your state
                </p>
                <Button className="btn btn-primary w-full rounded-xl">
                  Calculate Now
                </Button>
              </CardContent>
            </Card>

            <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="bg-success-500/10 mb-4 inline-block rounded-xl p-3">
                  <Shield className="text-success-600 h-8 w-8" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">Insurance Quotes</h3>
                <p className="mb-4 text-sm text-neutral-600">
                  Compare home insurance providers
                </p>
                <Button className="btn btn-primary w-full rounded-xl">Get Quotes</Button>
              </CardContent>
            </Card>

            <Card className="card-elevated rounded-2xl transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="bg-warning-500/10 mb-4 inline-block rounded-xl p-3">
                  <Settings className="text-warning-600 h-8 w-8" />
                </div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  Utility Connections
                </h3>
                <p className="mb-4 text-sm text-neutral-600">
                  Set up electricity, gas, and internet
                </p>
                <Button className="btn btn-primary w-full rounded-xl">Get Started</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
