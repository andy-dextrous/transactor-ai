import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  ClipboardList,
  Activity,
  FileCheck,
  Gavel,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Scissors,
  RotateCcw,
  Save,
  Plus,
  Edit,
  Eye,
} from "lucide-react"

/*************************************************************************/
/*  TRANSACTION MANAGEMENT SECTION
    Displays transaction-related components for property purchase process
*************************************************************************/

export function TransactionManagementSection() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <ClipboardList className="text-primary h-5 w-5" />
          </div>
          Transaction Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Transaction Timeline */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Transaction Timeline</h6>
          <Card className="rounded-xl border border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Activity className="text-primary h-5 w-5" />
                </div>
                Property Purchase Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-700">
                      Overall Progress
                    </span>
                    <span className="text-sm text-neutral-500">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-4">
                  {[
                    {
                      step: "Offer Submitted",
                      status: "completed",
                      date: "Jan 15, 2024",
                      description: "Offer of $1.2M submitted and accepted",
                    },
                    {
                      step: "Finance Application",
                      status: "completed",
                      date: "Jan 18, 2024",
                      description: "Pre-approval obtained from ANZ Bank",
                    },
                    {
                      step: "Building Inspection",
                      status: "in-progress",
                      date: "In Progress",
                      description: "Scheduled for Jan 25, 2024",
                    },
                    {
                      step: "Contract Exchange",
                      status: "pending",
                      date: "Pending",
                      description: "Awaiting building inspection completion",
                    },
                    {
                      step: "Settlement",
                      status: "pending",
                      date: "Feb 15, 2024",
                      description: "Expected settlement date",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`rounded-full p-2 ${
                            item.status === "completed"
                              ? "bg-success-100"
                              : item.status === "in-progress"
                                ? "bg-warning-100"
                                : "bg-neutral-100"
                          }`}
                        >
                          {item.status === "completed" ? (
                            <CheckCircle2 className="text-success-600 h-4 w-4" />
                          ) : item.status === "in-progress" ? (
                            <Clock className="text-warning-600 h-4 w-4" />
                          ) : (
                            <Clock className="h-4 w-4 text-neutral-400" />
                          )}
                        </div>
                        {index < 4 && (
                          <div
                            className={`h-8 w-px ${
                              item.status === "completed"
                                ? "bg-success-200"
                                : "bg-neutral-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-neutral-900">{item.step}</h4>
                          <Badge
                            className={`rounded-full text-xs ${
                              item.status === "completed"
                                ? "bg-success-100 text-success-700"
                                : item.status === "in-progress"
                                  ? "bg-warning-100 text-warning-700"
                                  : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {item.date}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-neutral-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offer Management */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Offer Management</h6>
          <Card className="rounded-xl border border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Gavel className="text-primary h-5 w-5" />
                </div>
                Active Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    property: "123 Collins St, Melbourne",
                    amount: "$850,000",
                    status: "pending",
                    submitted: "2 hours ago",
                    expires: "48 hours",
                    conditions: ["Finance approval", "Building inspection"],
                  },
                  {
                    property: "456 Smith St, Sydney",
                    amount: "$1,200,000",
                    status: "accepted",
                    submitted: "3 days ago",
                    expires: "Accepted",
                    conditions: ["Unconditional"],
                  },
                ].map((offer, index) => (
                  <div key={index} className="rounded-xl border border-neutral-200 p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-neutral-900">
                          {offer.property}
                        </h4>
                        <p className="text-primary text-2xl font-bold">{offer.amount}</p>
                      </div>
                      <Badge
                        className={`rounded-full ${
                          offer.status === "accepted"
                            ? "bg-success-500 text-white"
                            : offer.status === "pending"
                              ? "bg-warning-500 text-white"
                              : "bg-neutral-500 text-white"
                        }`}
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
                        {offer.conditions.map((condition, condIndex) => (
                          <Badge
                            key={condIndex}
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
        </div>

        {/* Digital Signature */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Digital Signatures</h6>
          <Card className="rounded-xl border border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <FileCheck className="text-primary h-5 w-5" />
                </div>
                Document Signing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-xl border-2 border-dashed border-neutral-300 p-6 text-center">
                  <div className="mb-4 inline-block rounded-xl bg-neutral-100 p-3">
                    <Scissors className="h-6 w-6 text-neutral-600" />
                  </div>
                  <h4 className="mb-2 font-semibold text-neutral-900">Sign Document</h4>
                  <p className="mb-4 text-sm text-neutral-600">
                    Draw your signature in the box below
                  </p>
                  <div className="mb-4 flex h-24 items-center justify-center rounded-lg border-2 border-neutral-200 bg-white">
                    <p className="text-sm text-neutral-400">Signature area</p>
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
                    {
                      doc: "Building Inspection Waiver",
                      status: "awaiting",
                      party: "Vendor",
                    },
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
        </div>
      </CardContent>
    </Card>
  )
}
