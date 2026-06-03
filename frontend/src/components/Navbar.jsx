import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  const isUser = location.pathname === '/'
  const isTrack = location.pathname === '/track'

  return (
    <nav className="px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-white/5">

      {/* brand */}
      <Link to="/" className="no-underline flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="w-3 rounded-2xl h-3 animate-pulse shadow-[0_0_8px_2px_rgba(42,225,196,0.5)] bg-teal-300" />
        <span className="text-white font-poppins text-[16px] sm:text-[20px] font-bold tracking-[2px]">
          QueryFlow
        </span>
      </Link>

      {/* links */}
      <div className="flex items-center gap-3 sm:gap-6">
        <Link
          to="/admin"
          className={`no-underline text-[10px] sm:text-xs hover:text-teal-300 transition-colors tracking-wide uppercase font-bold
            ${isAdmin ? 'text-teal-300' : 'text-slate-500'}`}
        >
          <span className="hidden sm:inline">Admin panel</span>
          <span className="sm:hidden">Admin</span>
        </Link>

        <Link
          to="/"
          className={`no-underline text-[10px] sm:text-xs hover:text-teal-300 transition-colors tracking-wide uppercase font-bold
            ${isUser ? 'text-teal-300' : 'text-slate-500'}`}
        >
          <span className="hidden sm:inline">User page</span>
          <span className="sm:hidden">Submit</span>
        </Link>

        <Link
          to="/track"
          className={`no-underline text-[10px] sm:text-xs hover:text-teal-300 transition-colors tracking-wide uppercase font-bold
            ${isTrack ? 'text-teal-300' : 'text-slate-500'}`}
        >
          <span className="hidden sm:inline">Track Query</span>
          <span className="sm:hidden">Track</span>
        </Link>
      </div>

    </nav>
  )
}

export default Navbar
