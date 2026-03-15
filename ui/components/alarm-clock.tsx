"use client"
import { Clock, Bell, BellOff } from "lucide-react"
import { cn } from "@/lib/utils"

export function AlarmClock({ alarmTime, setAlarmTime, alarmEnabled, setAlarmEnabled }: any) {
  return (
    <div className="rounded-3xl bg-card p-8 shadow-sm border-2 border-primary/20 text-center">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-primary/10 p-4"><Clock className="h-12 w-12 text-primary" /></div>
      </div>
      <h2 className="mb-6 text-2xl font-bold">おきるじかん</h2>
      <input type="time" value={alarmTime} onChange={(e) => setAlarmTime(e.target.value)}
        className="mb-8 block w-full rounded-2xl border-2 border-border bg-background p-4 text-center text-4xl font-bold" />
      <button onClick={() => setAlarmEnabled(!alarmEnabled)}
        className={cn("flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-xl font-bold transition-all",
          alarmEnabled ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
        {alarmEnabled ? <><Bell className="h-6 w-6" /> セット中</> : <><BellOff className="h-6 w-6" /> おやすみ</>}
      </button>
    </div>
  )
}
