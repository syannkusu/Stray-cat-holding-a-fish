"use client"

import { useState } from "react"
import { Backpack, Plus, Check, Circle, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ChecklistItem {
  id: string
  name: string
  checked: boolean
  isImportant: boolean
}

interface ItemChecklistProps {
  items: ChecklistItem[]
  setItems: (items: ChecklistItem[]) => void
}

export function ItemChecklist({ items, setItems }: ItemChecklistProps) {
  const [newItem, setNewItem] = useState("")

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const addItem = () => {
    if (!newItem.trim()) return

    const item: ChecklistItem = {
      id: Date.now().toString(),
      name: newItem.trim(),
      checked: false,
      isImportant: false,
    }
    setItems([...items, item])
    setNewItem("")
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const toggleImportant = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isImportant: !item.isImportant } : item
      )
    )
  }

  const resetAll = () => {
    setItems(items.map((item) => ({ ...item, checked: false })))
  }

  const checkedCount = items.filter((item) => item.checked).length
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0
  const allChecked = items.length > 0 && checkedCount === items.length

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addItem()
    }
  }

  const importantItems = items.filter((item) => item.isImportant)
  const regularItems = items.filter((item) => !item.isImportant)

  return (
    <Card>
      <CardHeader className="bg-accent text-accent-foreground">
        <CardTitle className="flex items-center gap-2">
          <Backpack className="h-6 w-6" />
          わすれものチェック
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {checkedCount} / {items.length} できた
            </span>
            {allChecked && (
              <span className="font-bold text-success">かんぺき!</span>
            )}
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="あたらしいアイテム..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={addItem} disabled={!newItem.trim()} size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {importantItems.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 flex items-center gap-1 text-sm font-bold text-accent">
              <Star className="h-4 w-4 fill-current" />
              だいじなもの
            </h3>
            <div className="space-y-2">
              {importantItems.map((item) => (
                <ChecklistItemRow
                  key={item.id}
                  item={item}
                  onToggle={toggleItem}
                  onDelete={deleteItem}
                  onToggleImportant={toggleImportant}
                />
              ))}
            </div>
          </div>
        )}

        {regularItems.length > 0 && (
          <div className="mb-4 space-y-2">
            {regularItems.map((item) => (
              <ChecklistItemRow
                key={item.id}
                item={item}
                onToggle={toggleItem}
                onDelete={deleteItem}
                onToggleImportant={toggleImportant}
              />
            ))}
          </div>
        )}

        {items.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <Backpack className="mx-auto mb-2 h-12 w-12 opacity-50" />
            <p>アイテムをついかしよう</p>
          </div>
        )}

        {items.length > 0 && (
          <Button
            variant="outline"
            onClick={resetAll}
            className="mt-2 w-full"
          >
            リセット
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function ChecklistItemRow({
  item,
  onToggle,
  onDelete,
  onToggleImportant,
}: {
  item: ChecklistItem
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onToggleImportant: (id: string) => void
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border p-3 transition-all",
        item.checked
          ? "border-success/30 bg-success/10"
          : "border-border bg-card hover:bg-muted/50"
      )}
    >
      <button
        onClick={() => onToggle(item.id)}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          item.checked
            ? "border-success bg-success text-success-foreground"
            : "border-muted-foreground hover:border-primary"
        )}
      >
        {item.checked ? (
          <Check className="h-4 w-4" />
        ) : (
          <Circle className="h-4 w-4 opacity-0" />
        )}
      </button>

      <span
        className={cn(
          "flex-1 text-base transition-all",
          item.checked && "text-muted-foreground line-through"
        )}
      >
        {item.name}
      </span>

      <button
        onClick={() => onToggleImportant(item.id)}
        className={cn(
          "p-1 transition-colors",
          item.isImportant
            ? "text-accent"
            : "text-muted-foreground opacity-0 group-hover:opacity-100"
        )}
      >
        <Star
          className={cn("h-5 w-5", item.isImportant && "fill-current")}
        />
      </button>

      <button
        onClick={() => onDelete(item.id)}
        className="p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}