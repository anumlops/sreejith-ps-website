"use client"

import { deleteActivity } from "@actions/activities"
import { Button } from "@components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-500"
      onClick={async () => {
        if (confirm("Delete this activity?")) {
          await deleteActivity(id)
          router.refresh()
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
