import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Eye, Download, Folder, Search, Filter } from "lucide-react"

/*************************************************************************/
/*  DOCUMENT MANAGEMENT SECTION
    Displays document management and upload components
*************************************************************************/

export function DocumentManagementSection() {
  const sampleDocuments = [
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
    {
      id: 4,
      name: "Property Title",
      type: "PDF",
      size: "1.2 MB",
      status: "verified",
      uploadedBy: "Land Registry",
      date: "2024-01-12",
    },
  ]

  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Folder className="text-primary h-5 w-5" />
          </div>
          Document Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Document Upload Area */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Document Upload</h6>
          <Card className="rounded-xl border border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Upload className="text-primary h-5 w-5" />
                </div>
                Upload Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="hover:border-primary cursor-pointer rounded-xl border-2 border-dashed border-neutral-300 p-8 text-center transition-colors">
                  <Upload className="mx-auto mb-3 h-12 w-12 text-neutral-400" />
                  <h4 className="mb-2 font-semibold text-neutral-900">
                    Upload Documents
                  </h4>
                  <p className="mb-4 text-sm text-neutral-600">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="mb-4 text-xs text-neutral-500">
                    Supports PDF, DOC, DOCX, JPG, PNG up to 10MB
                  </p>
                  <Button variant="outline" className="btn-outline rounded-lg">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Files
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-lg border border-neutral-200 p-3 text-center">
                    <FileText className="mx-auto mb-2 h-6 w-6 text-blue-500" />
                    <p className="text-sm font-medium text-neutral-900">Contracts</p>
                    <p className="text-xs text-neutral-600">Legal documents</p>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-3 text-center">
                    <FileText className="mx-auto mb-2 h-6 w-6 text-green-500" />
                    <p className="text-sm font-medium text-neutral-900">Reports</p>
                    <p className="text-xs text-neutral-600">Inspection reports</p>
                  </div>
                  <div className="rounded-lg border border-neutral-200 p-3 text-center">
                    <FileText className="mx-auto mb-2 h-6 w-6 text-purple-500" />
                    <p className="text-sm font-medium text-neutral-900">Finance</p>
                    <p className="text-xs text-neutral-600">Loan documents</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document List */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Document Library</h6>
          <Card className="rounded-xl border border-neutral-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <FileText className="text-primary h-5 w-5" />
                  </div>
                  All Documents
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="btn-outline rounded-lg">
                    <Filter className="mr-2 h-3 w-3" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="btn-outline rounded-lg">
                    <Search className="mr-2 h-3 w-3" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 rounded-xl bg-neutral-50 p-4 transition-colors hover:bg-neutral-100"
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
                                : doc.status === "verified"
                                  ? "bg-blue-100 text-blue-700"
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="btn-ghost rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="btn-ghost rounded-lg"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4">
                <p className="text-sm text-neutral-600">
                  {sampleDocuments.length} documents • 6.8 MB total
                </p>
                <Button className="btn btn-primary rounded-lg">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Categories */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Document Categories</h6>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                category: "Legal Documents",
                count: 3,
                color: "blue",
                description: "Contracts, agreements, legal forms",
              },
              {
                category: "Financial",
                count: 2,
                color: "green",
                description: "Loan docs, bank statements",
              },
              {
                category: "Inspections",
                count: 4,
                color: "purple",
                description: "Building, pest inspection reports",
              },
              {
                category: "Insurance",
                count: 1,
                color: "orange",
                description: "Policy documents, claims",
              },
            ].map((cat, index) => (
              <Card
                key={index}
                className="rounded-xl border border-neutral-200 p-4 text-center"
              >
                <div
                  className={`mx-auto mb-3 h-12 w-12 rounded-lg bg-${cat.color}-100 flex items-center justify-center`}
                >
                  <Folder className={`h-6 w-6 text-${cat.color}-600`} />
                </div>
                <h4 className="font-semibold text-neutral-900">{cat.category}</h4>
                <p className="mb-2 text-sm text-neutral-600">{cat.description}</p>
                <Badge variant="secondary" className="rounded-full text-xs">
                  {cat.count} files
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
