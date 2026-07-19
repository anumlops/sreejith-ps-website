import { Card, CardContent } from "@components/ui/card"
import {
  FileText,
  FileCheck,
  FilePen,
  Folder,
} from "lucide-react"

interface Stats {
  total: number
  drafts: number
  published: number
  categories: number
}

const statCards = [
  {
    label: "Total Activities",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Published",
    icon: FileCheck,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Drafts",
    icon: FilePen,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Categories",
    icon: Folder,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
]

export function DashboardStats({ stats }: { stats: Stats }) {
  const values = [stats.total, stats.published, stats.drafts, stats.categories]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, i) => {
        const Icon = card.icon
        return (
          <Card key={card.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{values[i]}</p>
                <p className="text-sm text-neutral-500">{card.label}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
