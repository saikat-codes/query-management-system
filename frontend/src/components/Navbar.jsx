import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <nav
      className="mx-6 mt-5 px-8 py-4 rounded-2xl border border-white/10 flex items-center justify-between"
      style={{ background: "rgba(30,30,46,0.7)", backdropFilter: "blur(20px)" }}
    >
      <Link to="/" className="flex items-center gap-2 no-underline">
        <div className="w-2 h-2 rounded-full bg-indigo-500" />
        <span className="text-white text-sm font-semibold tracking-tight">
          QueryFlow
        </span>
      </Link>

      <Link
        to={isAdmin ? "/" : "/admin"}
        className="text-white/40 text-sm hover:text-white/80 transition-colors no-underline"
      >
        {isAdmin ? "← Submit a query" : "Admin panel →"}
      </Link>
    </nav>
  );
}

export default Navbar
