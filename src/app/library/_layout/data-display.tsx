import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database } from "lucide-react"

/*************************************************************************/
/*  DATA DISPLAY COMPONENTS SECTION
    Shows components for displaying structured data like tables and accordions
*************************************************************************/

export function DataDisplaySection() {
  return (
    <Card className="card-elevated col-span-full rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Database className="text-primary h-5 w-5" />
          </div>
          Data Display
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Table */}
          <div className="space-y-4">
            <h5 className="font-semibold text-neutral-800">Table</h5>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>
                      <Badge className="bg-success-500 text-white">Active</Badge>
                    </TableCell>
                    <TableCell>2 hours ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>
                      <Badge className="bg-warning-500 text-white">Pending</Badge>
                    </TableCell>
                    <TableCell>1 day ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>
                      <Badge className="bg-success-500 text-white">Active</Badge>
                    </TableCell>
                    <TableCell>5 minutes ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Alice Brown</TableCell>
                    <TableCell>alice@example.com</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>
                      <Badge className="bg-neutral-500 text-white">Inactive</Badge>
                    </TableCell>
                    <TableCell>3 weeks ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            <h5 className="font-semibold text-neutral-800">Accordion</h5>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is PropertyAI?</AccordionTrigger>
                <AccordionContent>
                  PropertyAI is a comprehensive platform that leverages artificial
                  intelligence to streamline property management, investment analysis, and
                  real estate operations. Our platform provides intelligent insights and
                  automated workflows to help real estate professionals make better
                  decisions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does the design system work?</AccordionTrigger>
                <AccordionContent>
                  Our design system is built with modern web technologies including React,
                  TypeScript, and Tailwind CSS. It provides a consistent set of reusable
                  components that maintain design consistency across all PropertyAI
                  applications while ensuring accessibility and performance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it customizable?</AccordionTrigger>
                <AccordionContent>
                  Yes, absolutely! The design system is built with customization in mind.
                  You can modify colors, typography, spacing, and component behaviors
                  through our theming system. All components support custom CSS classes
                  and can be extended to meet specific design requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What about performance?</AccordionTrigger>
                <AccordionContent>
                  Performance is a key priority. All components are optimized for fast
                  loading, minimal bundle size, and smooth interactions. We use modern
                  React patterns like lazy loading, memoization, and efficient
                  re-rendering to ensure excellent user experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
