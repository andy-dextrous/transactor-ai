import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  Search,
  Filter,
  Heart,
  Star,
  Download,
  Share,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Eye,
  Edit,
  Copy,
  Trash,
  Plus,
  Minus,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Moon,
  Sun,
  Bell,
  Wifi,
  Database,
  Server,
  Shield,
  Award,
  TrendingUp,
  BarChart3,
  Building,
} from "lucide-react"

/*************************************************************************/
/*  ICONS SECTION
    Displays the comprehensive icon library with hover effects
*************************************************************************/

export function IconsSection() {
  const iconList = [
    { icon: Home, name: "Home" },
    { icon: Search, name: "Search" },
    { icon: Filter, name: "Filter" },
    { icon: Heart, name: "Heart" },
    { icon: Star, name: "Star" },
    { icon: Download, name: "Download" },
    { icon: Share, name: "Share" },
    { icon: Settings, name: "Settings" },
    { icon: User, name: "User" },
    { icon: Mail, name: "Mail" },
    { icon: Phone, name: "Phone" },
    { icon: MapPin, name: "Location" },
    { icon: Calendar, name: "Calendar" },
    { icon: Clock, name: "Clock" },
    { icon: Eye, name: "Eye" },
    { icon: Edit, name: "Edit" },
    { icon: Copy, name: "Copy" },
    { icon: Trash, name: "Trash" },
    { icon: Plus, name: "Plus" },
    { icon: Minus, name: "Minus" },
    { icon: ChevronUp, name: "Up" },
    { icon: ChevronDown, name: "Down" },
    { icon: ChevronLeft, name: "Left" },
    { icon: ChevronRight, name: "Right" },
    { icon: Play, name: "Play" },
    { icon: Pause, name: "Pause" },
    { icon: Volume2, name: "Volume" },
    { icon: Moon, name: "Moon" },
    { icon: Sun, name: "Sun" },
    { icon: Bell, name: "Bell" },
    { icon: Wifi, name: "Wifi" },
    { icon: Database, name: "Database" },
    { icon: Server, name: "Server" },
    { icon: Shield, name: "Shield" },
    { icon: Award, name: "Award" },
    { icon: TrendingUp, name: "Trending" },
    { icon: BarChart3, name: "Chart" },
    { icon: Building, name: "Building" },
  ]

  return (
    <Card className="card-elevated col-span-full rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-neutral-900">
          <div className="bg-primary/10 rounded-lg p-2">
            <Star className="text-primary h-5 w-5" />
          </div>
          Icon Library
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-8 md:grid-cols-8 lg:grid-cols-12">
          {iconList.map(({ icon: Icon, name }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 transition-colors hover:bg-neutral-100">
                <Icon className="h-5 w-5 text-neutral-600" />
              </div>
              <span className="text-xs text-neutral-500">{name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
