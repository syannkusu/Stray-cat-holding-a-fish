"use client"
import { BookMarked, CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export function HomeworkTracker({ homework, setHomework }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">しゅくだい、おわった？</h2>
      {homework.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-border p-8 text-center text-muted-foreground">
          <BookMarked className="mx-auto mb-2 h-10 w-10 opacity-20" />
          <p>しゅくだいの登録はありません</p>
        </div>
      ) : (
        homework.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setHomework(homework.map((h: any) => h.id === item.id ? { ...h, completed: !h.completed } : h))}
            className={cn(
              "flex w-full items-center justify-between rounded-2xl border-2 p-5 transition-all",
              item.completed ? "border-success bg-success/5 opacity-70" : "border-border bg-card"
            )}
          >
            <div className="text-left">
              <p className="text-xs text-muted-foreground">{item.subject}</p>
              <p className="text-lg font-bold">{item.task}</p>
            </div>
            {item.completed ? (
              <CheckCircle2 className="h-8 w-8 text-success" />
            ) : (
              <Circle className="h-8 w-8 text-muted-foreground" />
            )}
          </button>
        ))
      )}
    </div>
  )
}
