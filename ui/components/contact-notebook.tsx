"use client"
import { useState } from "react"
import { BookOpen, Plus, Trash2 } from "lucide-react"

export function ContactNotebook({ notes, setNotes }: any) {
  const [newNote, setNewNote] = useState("")

  const addNote = () => {
    if (!newNote.trim()) return
    const note = {
      id: Date.now().toString(),
      content: newNote,
      date: new Date().toLocaleDateString()
    }
    setNotes([note, ...notes])
    setNewNote("")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">せんせいへのれんらく</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="なにかかく？"
          className="flex-1 rounded-xl border-2 border-border p-3 focus:border-primary focus:outline-none"
        />
        <button onClick={addNote} className="rounded-xl bg-primary px-4 py-3 text-primary-foreground font-bold">
          <Plus className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-3">
        {notes.map((note: any) => (
          <div key={note.id} className="rounded-xl border-2 border-border bg-card p-4 shadow-sm">
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>{note.date}</span>
              <button onClick={() => setNotes(notes.filter((n: any) => n.id !== note.id))}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </button>
            </div>
            <p className="font-medium">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
