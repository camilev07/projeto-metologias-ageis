import { useState, useEffect } from "react"

type Contact = {
  id: string
  name: string
  email: string
  phone: string
}

export default function ConnectHub() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [contacts, setContacts] = useState<Contact[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("contacts")
    if (stored) {
      setContacts(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts])

  function handleAddContact() {
    if (!name.trim()) {
      setError("The name is required")
      return
    }

    if (!email.includes("@")) {
      setError("Invalid email address")
      return
    }

    if (!/^\d+$/.test(phone)) {
      setError("The phone should only contain numbers.")
      return
    }

    const newContact: Contact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone
    }

    setContacts(prev => [...prev, newContact])

    // limpar formulário
    setName("")
    setEmail("")
    setPhone("")
    setError("")
  }

  function removeContact(id: string) {
    setContacts(prev => prev.filter(contact => contact.id !== id))
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">ConnectHub</h1>

      <div className="space-y-3">

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Telephone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="border p-2 w-full"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleAddContact}
          className="bg-[lightpink] p-10 px-4 py-2 w-full"
        >
        Add Contact
        </button>

      </div>

      <ul className="mt-6 space-y-3">
        {contacts.map(contact => (
          <li
            key={contact.id}
            className="border p-3 rounded flex justify-between"
          >
            <div>
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="text-sm text-gray-600">{contact.phone}</p>
            </div>

            <button
              onClick={() => removeContact(contact.id)}
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