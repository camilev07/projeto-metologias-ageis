import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[lightpink] p-10 flex justify-between">
      <h1 className="font-bold text-lg">Utility Portal</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/taskmaster">TaskMaster</Link>
        <Link to="/connecthub">ConnectHub</Link>
        <Link to="/moneyflow">MoneyFlow</Link>
      </div>
    </nav>
  );
}

export default Navbar;