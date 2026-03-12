"use client"

import { useState, useEffect } from "react"

export default function Page() {
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([])
  const [input, setInput] = useState("")

  // 保存データ読み込み
  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  // データ保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (input === "") return
    setTodos([...todos, { text: input, done: false }])
    setInput("")
  }

  const toggleTodo = (index: number) => {
    const newTodos = [...todos]
    newTodos[index].done = !newTodos[index].done
    setTodos(newTodos)
  }

  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  return (
    <main style={{ padding: "30px", maxWidth: "500px" }}>
      <h1>TODOリスト</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="やることを書く"
      />

      <button onClick={addTodo}>追加</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(index)}
            />

            <span
              style={{
                marginLeft: "8px",
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(index)}
              style={{ marginLeft: "10px" }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}