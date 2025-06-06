import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

/*************************************************************************/
/*  DISPLAY COMPONENTS SECTION
    Shows visual feedback elements like avatars, progress, skeletons, etc.
*************************************************************************/

export function DisplayComponentsSection() {
  return (
    <Card className="card-elevated col-span-full rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Eye className="text-primary h-5 w-5" />
          </div>
          Display Components
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Avatars & Progress */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h6 className="font-semibold text-neutral-800">Avatars</h6>
              <div className="flex items-center gap-6">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>XL</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="space-y-4">
              <h6 className="font-semibold text-neutral-800">Progress Bars</h6>
              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span>Completion</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span>Loading</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-3" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h6 className="font-semibold text-neutral-800">Skeleton Loading</h6>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separator & Calendar */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h6 className="font-semibold text-neutral-800">Separators</h6>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-neutral-600">Content above</p>
                  <Separator className="my-6" />
                  <p className="text-sm text-neutral-600">Content below</p>
                </div>
                <div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">Left</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-sm">Right</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h6 className="font-semibold text-neutral-800">Calendar</h6>
              <div className="flex justify-center">
                <div className="rounded-md border">
                  <CalendarComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
