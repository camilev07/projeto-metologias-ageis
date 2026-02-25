import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Tools Portal
      </h1>

      <p className="text-gray-600 mb-10 text-center max-w-xl">
        Welcome to your utility toolbar.
Choose one of the options below to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

        <Link
          to="/taskmaster"
          className="bg-white border p-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-2 ">
            TaskMaster
          </h2>
          <p className="text-gray-600">
            Manage your tasks efficiently.
          </p>
        </Link>

        <Link
          to="/connecthub"
          className="bg-white border p-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">
            ConnectHub
          </h2>
          <p className="text-gray-600">
            Register and organize your contacts.
          </p>
        </Link>

        <Link
          to="/moneyflow"
          className="bg-white border p-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">
            MoneyFlow
          </h2>
          <p className="text-gray-600">
            Manage your finances easily.
          </p>
        </Link>

      </div>

    </div>
  )
}