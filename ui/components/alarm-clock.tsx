"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff, Sun, Moon, CloudSun } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface AlarmClockProps {
  alarmTime: string
  setAlarmTime: (time: string) => void
  alarmEnabled: boolean
  setAlarmEnabled: (enabled: boolean) => void
}

export function AlarmClock({
  alarmTime,
  setAlarmTime,
  alarmEnabled,
  setAlarmEnabled,
}: AlarmClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRinging, setIsRinging] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!alarmEnabled) return

    const now = currentTime
    const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number)

    if (
      now.getHours() === alarmHour &&
      now.getMinutes() === alarmMinute &&
      now.getSeconds() === 0
    ) {
      setIsRinging(true)
    }
  }, [currentTime, alarmTime, alarmEnabled])

  const stopAlarm = () => {
    setIsRinging(false)
  }

  const getTimeOfDay = () => {
    const hour = currentTime.getHours()
    if (hour >= 5 && hour < 10) return { text: "おはよう!", icon: Sun, bg: "bg-primary" }
    if (hour >= 10 && hour < 17) return { text: "こんにちは!", icon: CloudSun, bg: "bg-secondary" }
    return { text: "おやすみ", icon: Moon, bg: "bg-accent" }
  }

  const timeOfDay = getTimeOfDay()
  const TimeIcon = timeOfDay.icon

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${timeOfDay.bg} text-foreground`}>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TimeIcon className="h-6 w-6" />
            {timeOfDay.text}
          </span>
          <span className="text-sm font-normal opacity-80">
            {formatDate(currentTime)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 text-center">
          <div className="text-6xl font-bold tracking-tight text-foreground">
            {formatTime(currentTime)}
          </div>
        </div>

        {isRinging && (
          <div className="mb-4 animate-pulse rounded-xl bg-accent p-4 text-center">
            <p className="mb-2 text-lg font-bold text-accent-foreground">
              アラーム!
            </p>
            <Button
              onClick={stopAlarm}
              variant="secondary"
              className="font-bold"
            >
              とめる
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-xl bg-muted p-4">
            <div className="flex items-center gap-3">
              {alarmEnabled ? (
                <Bell className="h-5 w-5 text-primary" />
              ) : (
                <BellOff className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="font-medium">アラーム</span>
            </div>
            <Switch
              checked={alarmEnabled}
              onCheckedChange={setAlarmEnabled}
            />
          </div>

          {alarmEnabled && (
            <div className="flex items-center justify-center gap-4 rounded-xl border border-border p-4">
              <label className="font-medium text-muted-foreground">
                じかん:
              </label>
              <input
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                className="rounded-lg border border-border bg-background px-4 py-2 text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}