"use client"

import { CheckCircle2, Circle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ItemChecklist({ items, setItems }: any) {
  const toggleItem = (id: string) => {
    setItems(items.map((item: any) => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">わすれものはないかな？</h2>
      {items.map((item: any) => (
        <button
          key={item.id}
          onClick={() => toggleItem(item.id)}
          className={cn(
            "flex w-full items-center justify-between rounded-2xl border-2 p-5 transition-all active:scale-[0.98]",
            item.checked ? "border-success bg-success/5 opacity-70" : "border-border bg-card shadow-sm"
          )}
        >
          <div className="flex items-center gap-3 text-lg font-bold">
            {item.checked ? (
              <CheckCircle2 className="h-7 w-7 text-success" />
            ) : (
              <Circle className="h-7 w-7 text-muted-foreground" />
            )}
            <span className={item.checked ? "line-through text-muted-foreground" : ""}>
              {item.name}
            </span>
          </div>
          {item.isImportant && !item.checked && (
            <AlertCircle className="h-5 w-5 text-destructive animate-pulse" />
          )}
        </button>
      ))}
    </div>
  )
}
