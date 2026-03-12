"use client"

import { Sparkles, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface GroomingItem {
  id: string
  name: string
  emoji: string
  checked: boolean
}

interface GroomingCheckProps {
  items: GroomingItem[]
  setItems: (items: GroomingItem[]) => void
}

export function GroomingCheck({ items, setItems }: GroomingCheckProps) {
  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const resetAll = () => {
    setItems(items.map((item) => ({ ...item, checked: false })))
  }

  const checkedCount = items.filter((item) => item.checked).length
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0
  const allChecked = items.length > 0 && checkedCount === items.length

  return (
    <Card>
      <CardHeader className="bg-chart-4 text-foreground">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6" />
          みだしなみチェック
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {checkedCount} / {items.length} できた
            </span>
            {allChecked && (
              <span className="font-bold text-success">ばっちり!</span>
            )}
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all",
                item.checked
                  ? "border-success bg-success/10"
                  : "border-border bg-card hover:border-primary hover:bg-muted/50"
              )}
            >
              {item.checked && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <span className="text-4xl">{item.emoji}</span>
              <span
                className={cn(
                  "text-sm font-medium",
                  item.checked ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {items.length > 0 && (
          <Button
            variant="outline"
            onClick={resetAll}
            className="mt-4 w-full"
          >
            リセット
          </Button>
        )}

        {items.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <Sparkles className="mx-auto mb-2 h-12 w-12 opacity-50" />
            <p>チェックこうもくがありません</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}