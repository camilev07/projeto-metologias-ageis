import { useState, useEffect } from "react"

type Task = {
  id: string
  title: string
  category: string
}

export default function TaskMaster() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Trabalho")
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState("")

 
  useEffect(() => {
    const stored = localStorage.getItem("tasks")
    if (stored) setTasks(JSON.parse(stored))
  }, [])

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function handleAddTask() {
    if (title.length < 5) {
      setError("The task must have at least 5 characters.")
      return
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      category
    }

    setTasks(prev => [...prev, newTask])
    setTitle("")
    setError("")
  }

  function removeTask(id: string) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">TaskMaster</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Ex: Meet on 7am"
        className="border p-2 w-full mb-2"
      />

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option>Work</option>
        <option>Personal</option>
        <option>Urgent</option>
      </select>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleAddTask}
        className="bg-[lightpink] p-10 px-4 py-2"
      >
        Add
      </button>

      <ul className="mt-6 space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between border p-2">
            <span>{task.title} - {task.category}</span>
            <button onClick={() => removeTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}