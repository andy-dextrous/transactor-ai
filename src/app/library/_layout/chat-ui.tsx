import { ChatUI } from "@/components/chat-ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

/*************************************************************************/
/*  CHAT UI SECTION
    Displays the AI chat interface component with feature highlights
*************************************************************************/

export function ChatUISection() {
  return (
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
        <div className="space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <h5 className="mb-4 font-semibold text-neutral-800">
              Interactive Chat Component
            </h5>
            <ChatUI />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="from-primary-50 to-primary-100 rounded-lg border border-neutral-200 bg-gradient-to-br p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-primary h-2 w-2 rounded-full"></div>
                <span className="text-primary-700 text-sm font-medium">
                  Real-time messaging
                </span>
              </div>
              <p className="text-primary-600 text-xs">
                Instant message delivery and response
              </p>
            </div>

            <div className="from-success-50 to-success-100 rounded-lg border border-neutral-200 bg-gradient-to-br p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-success-500 h-2 w-2 rounded-full"></div>
                <span className="text-success-700 text-sm font-medium">
                  AI-powered responses
                </span>
              </div>
              <p className="text-success-600 text-xs">
                Intelligent conversation handling
              </p>
            </div>

            <div className="from-warning-50 to-warning-100 rounded-lg border border-neutral-200 bg-gradient-to-br p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="bg-warning-500 h-2 w-2 rounded-full"></div>
                <span className="text-warning-700 text-sm font-medium">
                  Rich interactions
                </span>
              </div>
              <p className="text-warning-600 text-xs">
                Support for multimedia and actions
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
