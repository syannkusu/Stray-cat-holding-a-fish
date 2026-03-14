"use client"

import { useState, useEffect } from "react"
import {
  Clock,
  BookOpen,
  Backpack,
  Sparkles,
  BookMarked,
  Sun,
} from "lucide-react"
import { AlarmClock } from "@/app/ui/components/alarm-clock";
import { ContactNotebook } from "@/ui/components/contact-notebook"
import { ItemChecklist } from "@/ui/components/item-checklist"
import { GroomingCheck } from "@/ui/components/grooming-check"
import { HomeworkTracker } from "@/ui/components/homework-tracker"
import { cn } from "@/ui/lib/utils" 

type Tab = "alarm" | "notebook" | "checklist" | "grooming" | "homework"

interface Note {
  id: string
  content: string
  date: string
}

interface ChecklistItem {
  id: string
  name: string
  checked: boolean
  isImportant: boolean
}

interface GroomingItem {
  id: string
  name: string
  emoji: string
  checked: boolean
}

interface HomeworkItem {
  id: string
  subject: string
  task: string
  dueDate: string
  completed: boolean
}

const defaultChecklistItems: ChecklistItem[] = [
  { id: "1", name: "きょうかしょ", checked: false, isImportant: true },
  { id: "2", name: "ノート", checked: false, isImportant: true },
  { id: "3", name: "ふでばこ", checked: false, isImportant: true },
  { id: "4", name: "れんらくちょう", checked: false, isImportant: true },
  { id: "5", name: "ハンカチ", checked: false, isImportant: false },
  { id: "6", name: "ティッシュ", checked: false, isImportant: false },
  { id: "7", name: "すいとう", checked: false, isImportant: false },
]

const defaultGroomingItems: GroomingItem[] = [
  { id: "1", name: "かおをあらう", emoji: "💧", checked: false },
  { id: "2", name: "はをみがく", emoji: "🦷", checked: false },
  { id: "3", name: "かみをとかす", emoji: "💇", checked: false },
  { id: "4", name: "ふくをきがえる", emoji: "👕", checked: false },
  { id: "5", name: "くつしたをはく", emoji: "🧦", checked: false },
  { id: "6", name: "つめをチェック", emoji: "✋", checked: false },
]

const tabs = [
  { id: "alarm" as Tab, label: "とけい", icon: Clock },
  { id: "notebook" as Tab, label: "れんらく", icon: BookOpen },
  { id: "checklist" as Tab, label: "もちもの", icon: Backpack },
  { id: "grooming" as Tab, label: "みだしなみ", icon: Sparkles },
  { id: "homework" as Tab, label: "しゅくだい", icon: BookMarked },
]

export default function MorningNaviApp() {
  const [activeTab, setActiveTab] = useState<Tab>("alarm")
  const [alarmTime, setAlarmTime] = useState("07:00")
  const [alarmEnabled, setAlarmEnabled] = useState(true)
  const [notes, setNotes] = useState<Note[]>([])
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(defaultChecklistItems)
  const [groomingItems, setGroomingItems] = useState<GroomingItem[]>(defaultGroomingItems)
  const [homework, setHomework] = useState<HomeworkItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("ohayo-navi-data")
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        if (data.alarmTime) setAlarmTime(data.alarmTime)
        if (typeof data.alarmEnabled === "boolean") setAlarmEnabled(data.alarmEnabled)
        if (data.notes) setNotes(data.notes)
        if (data.checklistItems) setChecklistItems(data.checklistItems)
        if (data.groomingItems) setGroomingItems(data.groomingItems)
        if (data.homework) setHomework(data.homework)
      } catch {
        // ignore parse errors
      }
    }
    setIsLoaded(true)
  }, [])

  // Save data to localStorage
  useEffect(() => {
    if (!isLoaded) return
    const data = {
      alarmTime,
      alarmEnabled,
      notes,
      checklistItems,
      groomingItems,
      homework,
    }
    localStorage.setItem("ohayo-navi-data", JSON.stringify(data))
  }, [alarmTime, alarmEnabled, notes, checklistItems, groomingItems, homework, isLoaded])

  const getTabProgress = (tab: Tab) => {
    switch (tab) {
      case "checklist": {
        const checked = checklistItems.filter((i) => i.checked).length
        return checklistItems.length > 0 ? Math.round((checked / checklistItems.length) * 100) : 0
      }
      case "grooming": {
        const checked = groomingItems.filter((i) => i.checked).length
        return groomingItems.length > 0 ? Math.round((checked / groomingItems.length) * 100) : 0
      }
      case "homework": {
        const completed = homework.filter((h) => h.completed).length
        return homework.length > 0 ? Math.round((completed / homework.length) * 100) : 0
      }
      default:
        return null
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Sun className="h-12 w-12 animate-pulse text-primary" />
          <p className="text-lg font-medium text-muted-foreground">よみこみちゅう...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-lg items-center justify-center gap-2">
          <Sun className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold text-foreground">おはようナビ</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="mx-auto max-w-lg p-4">
          {activeTab === "alarm" && (
            <AlarmClock
              alarmTime={alarmTime}
              setAlarmTime={setAlarmTime}
              alarmEnabled={alarmEnabled}
              setAlarmEnabled={setAlarmEnabled}
            />
          )}
          {activeTab === "notebook" && (
            <ContactNotebook notes={notes} setNotes={setNotes} />
          )}
          {activeTab === "checklist" && (
            <ItemChecklist
              items={checklistItems}
              setItems={setChecklistItems}
            />
          )}
          {activeTab === "grooming" && (
            <GroomingCheck items={groomingItems} setItems={setGroomingItems} />
          )}
          {activeTab === "homework" && (
            <HomeworkTracker homework={homework} setHomework={setHomework} />
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-card shadow-lg">
        <div className="mx-auto flex max-w-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const progress = getTabProgress(tab.id)

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex flex-1 flex-col items-center gap-1 px-2 py-3 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <Icon className={cn("h-6 w-6", isActive && "drop-shadow-sm")} />
                  {progress !== null && progress === 100 && (
                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-success" />
                  )}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}