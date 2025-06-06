import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, TrendingUp, PiggyBank } from "lucide-react"

/*************************************************************************/
/*  FINANCIAL TOOLS SECTION
    Displays financial calculator components for property transactions
*************************************************************************/

export function FinancialToolsSection() {
  return (
    <Card className="card-elevated rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Calculator className="text-primary h-5 w-5" />
          </div>
          Financial Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Finance Calculator */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Loan Calculator</h6>
          <Card className="rounded-xl border border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <DollarSign className="text-primary h-5 w-5" />
                </div>
                Finance Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Purchase Price</Label>
                  <Input placeholder="$1,200,000" className="input-field" />
                </div>
                <div className="space-y-2">
                  <Label>Down Payment</Label>
                  <Input placeholder="$240,000" className="input-field" />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate (%)</Label>
                  <Input placeholder="6.5" className="input-field" />
                </div>
                <div className="space-y-2">
                  <Label>Loan Term (years)</Label>
                  <Input placeholder="30" className="input-field" />
                </div>
              </div>

              <div className="rounded-xl bg-neutral-50 p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-neutral-600">Monthly Payment</p>
                    <p className="text-primary text-2xl font-bold">$6,847</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Total Interest</p>
                    <p className="text-2xl font-bold text-neutral-900">$1,464,871</p>
                  </div>
                </div>
              </div>

              <Button className="btn btn-primary w-full rounded-xl">
                Calculate Loan Details
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Equity Calculator */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Equity Calculator</h6>
          <Card className="rounded-xl border border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-success-500/10 rounded-lg p-2">
                  <TrendingUp className="text-success-600 h-5 w-5" />
                </div>
                Home Equity Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Current Property Value</Label>
                  <Input placeholder="$1,350,000" className="input-field" />
                </div>
                <div className="space-y-2">
                  <Label>Outstanding Mortgage</Label>
                  <Input placeholder="$850,000" className="input-field" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-success-50 rounded-xl p-4">
                  <div className="text-center">
                    <p className="text-success-600 text-sm">Available Equity</p>
                    <p className="text-success-600 text-3xl font-bold">$500,000</p>
                    <p className="text-success-600 text-xs">37% of property value</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-neutral-100 p-3 text-center">
                    <p className="text-sm text-neutral-600">Usable Equity (80%)</p>
                    <p className="font-bold text-neutral-900">$400,000</p>
                  </div>
                  <div className="rounded-lg bg-neutral-100 p-3 text-center">
                    <p className="text-sm text-neutral-600">LVR After Equity Use</p>
                    <p className="font-bold text-neutral-900">63%</p>
                  </div>
                </div>
              </div>

              <Button className="btn btn-primary w-full rounded-xl">
                <TrendingUp className="mr-2 h-4 w-4" />
                Calculate Investment Options
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Settlement Calculator */}
        <div className="space-y-6">
          <h6 className="font-semibold text-neutral-800">Settlement Calculator</h6>
          <Card className="rounded-xl border border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="bg-warning-500/10 rounded-lg p-2">
                  <PiggyBank className="text-warning-600 h-5 w-5" />
                </div>
                Settlement Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Purchase Price</Label>
                  <Input placeholder="$1,200,000" className="input-field" />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input placeholder="NSW" className="input-field" />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-neutral-900">Estimated Costs</h4>
                <div className="space-y-2">
                  {[
                    { label: "Stamp Duty", amount: "$48,490", type: "government" },
                    {
                      label: "Legal & Conveyancing",
                      amount: "$1,500",
                      type: "professional",
                    },
                    {
                      label: "Building Inspection",
                      amount: "$550",
                      type: "professional",
                    },
                    { label: "Loan Application", amount: "$600", type: "finance" },
                    { label: "Title Search", amount: "$150", type: "government" },
                  ].map((cost, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-neutral-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className={`rounded-full text-xs ${
                            cost.type === "government"
                              ? "bg-blue-100 text-blue-700"
                              : cost.type === "professional"
                                ? "bg-green-100 text-green-700"
                                : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {cost.type}
                        </Badge>
                        <span className="font-medium text-neutral-900">{cost.label}</span>
                      </div>
                      <span className="font-bold text-neutral-900">{cost.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-900">
                      Total Settlement Costs
                    </span>
                    <span className="text-primary text-xl font-bold">$51,290</span>
                  </div>
                </div>
              </div>

              <Button className="btn btn-primary w-full rounded-xl">
                <PiggyBank className="mr-2 h-4 w-4" />
                Get Detailed Breakdown
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
