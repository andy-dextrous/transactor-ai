import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Calendar, Search, Settings, User, Mail } from "lucide-react"

/*************************************************************************/
/*  OVERLAYS & INTERACTIONS SECTION
    Shows modal dialogs, tooltips, popovers, and command interfaces
*************************************************************************/

export function OverlaysSection() {
  return (
    <Card className="card-elevated col-span-full rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Sparkles className="text-primary h-5 w-5" />
          </div>
          Overlays & Interactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Dialog */}
          <div className="space-y-6">
            <h6 className="font-semibold text-neutral-800">Dialog</h6>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Property</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new property listing. This information will
                    be used to create the property profile.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Name</label>
                    <input
                      className="w-full rounded-md border border-neutral-200 px-3 py-2"
                      placeholder="Enter property name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <input
                      className="w-full rounded-md border border-neutral-200 px-3 py-2"
                      placeholder="Enter location"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tooltip */}
          <div className="space-y-6">
            <h6 className="font-semibold text-neutral-800">Tooltip</h6>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Hover for Tooltip
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This tooltip provides helpful information about the button</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Popover */}
          <div className="space-y-6">
            <h6 className="font-semibold text-neutral-800">Popover</h6>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  Open Popover
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-medium">Property Filters</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="commercial" />
                      <label htmlFor="commercial" className="text-sm">
                        Commercial
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="residential" />
                      <label htmlFor="residential" className="text-sm">
                        Residential
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="industrial" />
                      <label htmlFor="industrial" className="text-sm">
                        Industrial
                      </label>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Command */}
          <div className="space-y-6">
            <h6 className="font-semibold text-neutral-800">Command Palette</h6>
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Search commands..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search Properties</span>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </CommandItem>
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>User Profile</span>
                  </CommandItem>
                  <CommandItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
