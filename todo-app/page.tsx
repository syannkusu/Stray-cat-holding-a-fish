"use client"

import { useState } from "react"

export default function Home() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (input === "") return
    setTodos([...todos, input])
    setInput("")
  }

  return (
    <main>
      <h1>TODOリスト</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="やることを入力"
      />

      <button onClick={addTodo}>
        追加
      </button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </main>
  )
}