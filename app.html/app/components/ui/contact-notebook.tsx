"use client"

import { useState } from "react"
import { BookOpen, Plus, Trash2, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Note {
  id: string
  content: string
  date: string
}

interface ContactNotebookProps {
  notes: Note[]
  setNotes: (notes: Note[]) => void
}

export function ContactNotebook({ notes, setNotes }: ContactNotebookProps) {
  const [newNote, setNewNote] = useState("")

  const addNote = () => {
    if (!newNote.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      content: newNote.trim(),
      date: new Date().toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
        weekday: "short",
      }),
    }
    setNotes([note, ...notes])
    setNewNote("")
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      addNote()
    }
  }

  return (
    <Card>
      <CardHeader className="bg-secondary text-secondary-foreground">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          れんらくちょう
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex flex-col gap-2">
          <Textarea
            placeholder="れんらくをかこう..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[80px] resize-none text-base"
          />
          <Button
            onClick={addNote}
            disabled={!newNote.trim()}
            className="self-end"
          >
            <Plus className="mr-1 h-4 w-4" />
            ついか
          </Button>
        </div>

        <div className="space-y-3">
          {notes.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <BookOpen className="mx-auto mb-2 h-12 w-12 opacity-50" />
              <p>れんらくはまだありません</p>
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {note.date}
                  </div>
                  <p className="whitespace-pre-wrap text-foreground">{note.content}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteNote(note.id)}
                  className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}