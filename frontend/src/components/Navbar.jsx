import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  const isUser = location.pathname === '/'
  const isTrack = location.pathname === '/track'

  return (
    <nav className="px-8 py-5 flex items-center justify-between border-b border-white/5">
      <Link to="/" className="no-underline flex items-center gap-3">
        <div className="w-3 rounded-2xl h-3 animate-pulse shadow-[0_0_8px_2px_rgba(42,225,196,0.5)] bg-teal-300" />
        <span className="text-white font-poppins text-[20px] font-bold tracking-[2px]">
          QueryFlow
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/admin"
          className={`no-underline text-xs hover:text-teal-300 transition-colors tracking-wide uppercase font-bold
            ${isAdmin ? 'text-teal-300' : 'text-slate-500'}`}
        >
          Admin panel
        </Link>

        <Link
          to="/"
          className={`no-underline text-xs hover:text-teal-300 transition-colors tracking-wide uppercase font-bold
            ${isUser ? 'text-teal-300' : 'text-slate-500'}`}
        >
          User page
        </Link>

        <Link
          to="/track"
          className={`no-underline text-xs hover:text-teal-300 transition-colors tracking-wide uppercase font-bold
            ${isTrack ? 'text-teal-300' : 'text-slate-500'}`}
        >
          Track Query
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
