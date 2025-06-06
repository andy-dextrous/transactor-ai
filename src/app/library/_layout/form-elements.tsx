import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Search, Bold, Italic, Underline } from "lucide-react"

/*************************************************************************/
/*  FORM ELEMENTS COMPONENT
    Displays all form inputs, selection controls, and interactive elements
*************************************************************************/

export function FormElementsSection() {
  return (
    <Card className="card-elevated col-span-full rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Users className="text-primary h-5 w-5" />
          </div>
          Form Elements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Input Fields */}
          <div className="space-y-8">
            <h6 className="font-semibold text-neutral-800">Input Fields</h6>

            <div className="space-y-3">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter password" />
            </div>

            <div className="space-y-3">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message..." rows={3} />
            </div>

            <div className="space-y-3">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                <Input id="search" placeholder="Search..." className="pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="disabled">Disabled Input</Label>
              <Input id="disabled" placeholder="Disabled input" disabled />
            </div>
          </div>

          {/* Selection Controls */}
          <div className="space-y-8">
            <h6 className="font-semibold text-neutral-800">Selection Controls</h6>

            <div className="space-y-4">
              <Label>Select Option</Label>
              <Select defaultValue="option2">
                <SelectTrigger>
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Radio Group</Label>
              <RadioGroup defaultValue="option2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2">Option 2 (selected)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="r3" />
                  <Label htmlFor="r3">Option 3</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Checkboxes</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="check1" />
                  <Label htmlFor="check1">Checkbox 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check2" defaultChecked />
                  <Label htmlFor="check2">Checkbox 2 (checked)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check3" disabled />
                  <Label htmlFor="check3">Checkbox 3 (disabled)</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="space-y-8">
            <h6 className="font-semibold text-neutral-800">Interactive Controls</h6>

            <div className="space-y-4">
              <Label>Switch</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Switch id="switch1" />
                  <Label htmlFor="switch1">Enable notifications</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch id="switch2" defaultChecked />
                  <Label htmlFor="switch2">Auto-save (enabled)</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Slider</Label>
              <Slider defaultValue={[75]} max={100} step={1} />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>0</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Toggle Group</Label>
              <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
                <ToggleGroupItem value="bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-4">
              <Label>Toggle Button</Label>
              <div className="flex gap-3">
                <Toggle>
                  <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle pressed>
                  <Italic className="h-4 w-4" />
                </Toggle>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
