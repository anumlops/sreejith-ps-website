import Link from "next/link"
import { getAllActivities } from "@actions/activities"
import { Button } from "@components/ui/button"

export const dynamic = "force-dynamic"
import { Card, CardContent } from "@components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { formatDate } from "@lib/utils"
import { DeleteButton } from "./delete-button"

export default async function AdminActivities() {
  const activities = await getAllActivities()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Activities</h1>
        <Link href="/admin/activities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Activity
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {activities.length === 0 ? (
            <div className="p-6 text-center text-neutral-500">
              No activities yet.
            </div>
          ) : (
            <div className="divide-y">
              {activities.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {a.coverImage && (
                      <img
                        src={a.coverImage}
                        alt=""
                        className="w-12 h-12 rounded object-cover shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium truncate">{a.title}</p>
                      <p className="text-sm text-neutral-500">
                        {formatDate(a.createdAt)} ·{" "}
                        {a.category?.name ?? "Uncategorized"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        a.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {a.status}
                    </span>
                    <Link href={`/admin/activities/${a.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteButton id={a.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
