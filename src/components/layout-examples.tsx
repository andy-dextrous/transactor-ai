import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatUI } from "./chat-ui"
import { PropertyCard } from "./property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Menu } from "lucide-react"

export function MainAppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-primary text-xl font-bold">PropertyAI</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search properties..."
                className="w-64 rounded-xl border-gray-200 pl-10"
              />
            </div>
            <Button variant="outline" className="rounded-xl">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Panel */}
        <div className="w-1/2 p-6">
          <ChatUI />
        </div>

        {/* Info Panel */}
        <div className="w-1/2 border-l border-gray-200 bg-white p-6">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-lg font-semibold">Featured Properties</h2>
              <div className="space-y-4">
                <PropertyCard
                  title="Modern Apartment in Sydney CBD"
                  price="$850,000"
                  location="Sydney, NSW"
                  beds={2}
                  baths={2}
                  parking={1}
                  imageUrl="/placeholder.svg?height=200&width=300"
                  featured
                />
                <PropertyCard
                  title="Family Home in Melbourne"
                  price="$1,200,000"
                  location="Melbourne, VIC"
                  beds={4}
                  baths={3}
                  parking={2}
                  imageUrl="/placeholder.svg?height=200&width=300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Card className="rounded-2xl border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-primary">Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start rounded-xl">
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl">
                Properties
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl">
                Transactions
              </Button>
              <Button variant="ghost" className="w-full justify-start rounded-xl">
                Documents
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-6">
          <div className="space-y-6">
            <Card className="rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Transaction Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Contract Review</span>
                    <span className="font-medium text-green-600">Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Finance Approval</span>
                    <span className="font-medium text-yellow-600">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Settlement</span>
                    <span className="font-medium text-gray-400">Pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-3">
          <ChatUI />
        </div>
      </div>
    </div>
  )
}
