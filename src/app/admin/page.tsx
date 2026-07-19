import Link from "next/link"
import { getDashboardStats, getRecentActivities } from "@actions/activities"
import { DashboardStats } from "@components/admin/dashboard-stats"

export const dynamic = "force-dynamic"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Plus } from "lucide-react"
import { formatDate } from "@lib/utils"

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([
    getDashboardStats(),
    getRecentActivities(5),
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/admin/activities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Activity
          </Button>
        </Link>
      </div>

      <DashboardStats stats={stats} />

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-neutral-500 text-sm">
              No activities yet. Create your first one!
            </p>
          ) : (
            <div className="space-y-3">
              {recent.map((a) => (
                <Link
                  key={a.id}
                  href={`/admin/activities/${a.id}/edit`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-neutral-500">
                      {formatDate(a.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      a.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
