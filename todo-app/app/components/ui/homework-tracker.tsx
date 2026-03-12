"use client"

import { useState } from "react"
import {
  BookMarked,
  Plus,
  Check,
  Circle,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface HomeworkItem {
  id: string
  subject: string
  task: string
  dueDate: string
  completed: boolean
}

interface HomeworkTrackerProps {
  homework: HomeworkItem[]
  setHomework: (homework: HomeworkItem[]) => void
}

const subjects = [
  { value: "kokugo", label: "こくご", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  { value: "sansu", label: "さんすう", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { value: "rika", label: "りか", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { value: "shakai", label: "しゃかい", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200" },
  { value: "eigo", label: "えいご", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  { value: "other", label: "そのほか", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" },
]

export function HomeworkTracker({
  homework,
  setHomework,
}: HomeworkTrackerProps) {
  const [newTask, setNewTask] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("kokugo")
  const [dueDate, setDueDate] = useState("")

  const addHomework = () => {
    if (!newTask.trim()) return

    const item: HomeworkItem = {
      id: Date.now().toString(),
      subject: selectedSubject,
      task: newTask.trim(),
      dueDate: dueDate || new Date().toISOString().split("T")[0],
      completed: false,
    }
    setHomework([...homework, item])
    setNewTask("")
    setDueDate("")
  }

  const toggleHomework = (id: string) => {
    setHomework(
      homework.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const deleteHomework = (id: string) => {
    setHomework(homework.filter((item) => item.id !== id))
  }

  const getSubjectInfo = (subjectValue: string) => {
    return subjects.find((s) => s.value === subjectValue) || subjects[5]
  }

  const isOverdue = (date: string) => {
    return new Date(date) < new Date(new Date().toDateString())
  }

  const completedCount = homework.filter((item) => item.completed).length
  const progress =
    homework.length > 0 ? (completedCount / homework.length) * 100 : 0
  const allCompleted = homework.length > 0 && completedCount === homework.length

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addHomework()
    }
  }

  const pendingHomework = homework.filter((h) => !h.completed)
  const completedHomework = homework.filter((h) => h.completed)

  return (
    <Card>
      <CardHeader className="bg-chart-5 text-foreground">
        <CardTitle className="flex items-center gap-2">
          <BookMarked className="h-6 w-6" />
          しゅくだいチェック
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completedCount} / {homework.length} おわった
            </span>
            {allCompleted && homework.length > 0 && (
              <span className="font-bold text-success">すべてかんりょう!</span>
            )}
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="mb-4 space-y-3 rounded-xl border border-border bg-muted/30 p-3">
          <div className="flex gap-2">
            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="しゅくだいのないよう..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={addHomework} disabled={!newTask.trim()}>
              <Plus className="mr-1 h-4 w-4" />
              ついか
            </Button>
          </div>
        </div>

        {pendingHomework.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-bold text-muted-foreground">
              やること
            </h3>
            <div className="space-y-2">
              {pendingHomework.map((item) => (
                <HomeworkItemRow
                  key={item.id}
                  item={item}
                  subjectInfo={getSubjectInfo(item.subject)}
                  isOverdue={isOverdue(item.dueDate)}
                  onToggle={toggleHomework}
                  onDelete={deleteHomework}
                />
              ))}
            </div>
          </div>
        )}

        {completedHomework.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-muted-foreground">
              おわったもの
            </h3>
            <div className="space-y-2">
              {completedHomework.map((item) => (
                <HomeworkItemRow
                  key={item.id}
                  item={item}
                  subjectInfo={getSubjectInfo(item.subject)}
                  isOverdue={false}
                  onToggle={toggleHomework}
                  onDelete={deleteHomework}
                />
              ))}
            </div>
          </div>
        )}

        {homework.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <BookMarked className="mx-auto mb-2 h-12 w-12 opacity-50" />
            <p>しゅくだいをついかしよう</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function HomeworkItemRow({
  item,
  subjectInfo,
  isOverdue,
  onToggle,
  onDelete,
}: {
  item: HomeworkItem
  subjectInfo: { label: string; color: string }
  isOverdue: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border p-3 transition-all",
        item.completed
          ? "border-success/30 bg-success/10"
          : isOverdue
            ? "border-destructive/30 bg-destructive/10"
            : "border-border bg-card hover:bg-muted/50"
      )}
    >
      <button
        onClick={() => onToggle(item.id)}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          item.completed
            ? "border-success bg-success text-success-foreground"
            : "border-muted-foreground hover:border-primary"
        )}
      >
        {item.completed ? (
          <Check className="h-4 w-4" />
        ) : (
          <Circle className="h-4 w-4 opacity-0" />
        )}
      </button>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              subjectInfo.color
            )}
          >
            {subjectInfo.label}
          </span>
          {isOverdue && !item.completed && (
            <span className="flex items-center gap-1 text-xs font-medium text-destructive">
              <AlertCircle className="h-3 w-3" />
              きげんすぎ
            </span>
          )}
        </div>
        <p
          className={cn(
            "mt-1 text-sm",
            item.completed && "text-muted-foreground line-through"
          )}
        >
          {item.task}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatDate(item.dueDate)}まで
        </p>
      </div>

      <button
        onClick={() => onDelete(item.id)}
        className="p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}