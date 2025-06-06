import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

/*************************************************************************/
/*  NAVIGATION COMPONENTS SECTION
    Displays navigation elements like tabs, breadcrumbs, and pagination
*************************************************************************/

export function NavigationSection() {
  return (
    <Card className="card-elevated col-span-full rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <BarChart3 className="text-primary h-5 w-5" />
          </div>
          Navigation Components
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-12">
          {/* Tabs */}
          <div className="space-y-6">
            <h6 className="font-semibold text-neutral-800">Tabs</h6>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-lg bg-neutral-100 p-1">
                <TabsTrigger
                  value="tab1"
                  className="data-[state=active]:bg-primary text-neutral-600 transition-all duration-200 hover:text-neutral-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="tab2"
                  className="data-[state=active]:bg-primary text-neutral-600 transition-all duration-200 hover:text-neutral-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="tab3"
                  className="data-[state=active]:bg-primary text-neutral-600 transition-all duration-200 hover:text-neutral-900 data-[state=active]:text-white data-[state=active]:shadow-sm"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="tab1"
                className="mt-6 rounded-lg border border-neutral-200 bg-white p-6"
              >
                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">Overview Content</h4>
                  <p className="text-sm text-neutral-600">
                    This is the overview tab content. Display key metrics and summary
                    information here.
                  </p>
                </div>
              </TabsContent>
              <TabsContent
                value="tab2"
                className="mt-6 rounded-lg border border-neutral-200 bg-white p-6"
              >
                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">Analytics Content</h4>
                  <p className="text-sm text-neutral-600">
                    Analytics tab shows detailed charts and performance metrics.
                  </p>
                </div>
              </TabsContent>
              <TabsContent
                value="tab3"
                className="mt-6 rounded-lg border border-neutral-200 bg-white p-6"
              >
                <div className="space-y-3">
                  <h4 className="font-medium text-neutral-900">Settings Content</h4>
                  <p className="text-sm text-neutral-600">
                    Configure application preferences and user settings.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Breadcrumbs */}
          <div className="space-y-6">
            <h6 className="font-semibold text-neutral-800">Breadcrumbs</h6>
            <div className="space-y-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                    >
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-neutral-400" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/components"
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                    >
                      Components
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-neutral-400" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium text-neutral-600">
                      Breadcrumb
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/"
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                    >
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-neutral-400" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/properties"
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                    >
                      Properties
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-neutral-400" />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href="/properties/commercial"
                      className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                    >
                      Commercial
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-neutral-400" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium text-neutral-600">
                      Office Building
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* Pagination */}
          <div className="space-y-6">
            <h6 className="font-semibold text-neutral-800">Pagination</h6>
            <div className="space-y-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      className="bg-primary hover:bg-primary/90 border-primary text-white"
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis className="text-neutral-400" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive
                      className="bg-primary hover:bg-primary/90 border-primary text-white"
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    >
                      4
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    >
                      5
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      className="hover:text-primary hover:bg-primary/5 text-neutral-600 transition-colors duration-200"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
