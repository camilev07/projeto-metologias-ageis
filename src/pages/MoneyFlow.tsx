import { useState, useEffect } from "react"

type Transaction = {
  id: string
  description: string
  value: number
  type: "Input" | "Output"
}

export default function MoneyFlow() {
  const [description, setDescription] = useState("")
  const [value, setValue] = useState<number>(0)
  const [type, setType] = useState<"Input" | "Output">("Input")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("transactions")
    if (stored) {
      setTransactions(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  function handleAddTransaction() {
    if (value <= 0) {
      setError("The value must be greater than zero.")
      return
    }

    if (!description) {
      setError("A description is required.")
      return
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      description,
      value,
      type
    }

    setTransactions(prev => [...prev, newTransaction])
    setDescription("")
    setValue(0)
    setError("")
  }

  function removeTransaction(id: string) {
    setTransactions(prev => prev.filter(item => item.id !== id))
  }

  const total = transactions.reduce((acc, item) => {
    return item.type === "Input"
      ? acc + item.value
      : acc - item.value
  }, 0)

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">MoneyFlow</h1>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold">
          Total balance: 
          <span className={total >= 0 ? "text-green-600" : "text-red-600"}>
            {" "}R$ {total.toFixed(2)}
          </span>
        </h2>
      </div>

      <div className="space-y-3">

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="border p-2 w-full"
        />

        <select
          value={type}
          onChange={e => setType(e.target.value as "Input" | "Output")}
          className="border p-2 w-full"
        >
          <option>Entry</option>
          <option>Exit</option>
        </select>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleAddTransaction}
          className="bg-[lightpink] p-10 px-4 py-2 w-full"
        >
          Adicionar
        </button>

      </div>

      <ul className="mt-6 space-y-2">
        {transactions.map(item => (
          <li
            key={item.id}
            className="flex justify-between border p-3 rounded"
          >
            <span>
              {item.description} - R$ {item.value}
            </span>

            <button
              onClick={() => removeTransaction(item.id)}
              className="text-red-600"
            >
              X
            </button>
          </li>
        ))}
      </ul>

    </div>
  )
}