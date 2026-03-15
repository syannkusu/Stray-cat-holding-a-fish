"use client"
import { cn } from "@/lib/utils"

export function GroomingCheck({ items, setItems }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item: any) => (
        <button key={item.id} onClick={() => setItems(items.map((i:any) => i.id === item.id ? {...i, checked: !i.checked} : i))}
          className={cn("flex flex-col items-center gap-3 rounded-3xl border-2 p-6 transition-all",
            item.checked ? "border-primary bg-primary/5" : "border-border bg-card")}>
          <span className="text-5xl">{item.emoji}</span>
          <span className="font-bold">{item.name}</span>
        </button>
      ))}
    </div>
  )
}
