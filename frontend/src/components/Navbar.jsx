import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <nav className="px-8 py-5 flex items-center justify-between border-b border-white/5">
      <Link to="/" className="no-underline flex items-center gap-3">
        <div className="w-3 h-3 animate-pulse rounded-2xl bg-teal-300" />
        <span className="text-white text-[19px] font-bold tracking-[2px] font-poppins">
          QueryFlow
        </span>
      </Link>

      <Link
        to={isAdmin ? '/' : '/admin'}
        className="no-underline text-slate-500 text-xs font-bold hover:text-teal-300 transition-colors tracking-wide uppercase"
      >
        {isAdmin ? '← User page' : 'Admin panel →'}
      </Link>
    </nav>
  )
}

export default Navbar
