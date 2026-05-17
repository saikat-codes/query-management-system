import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <nav className="mx-6 mt-5 px-8 py-3.5 rounded-2xl border border-white/10 bg-white/2 backdrop-blur-xl shadow-2xl flex items-center justify-between relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-linear-to-r before:from-transparent before:via-white/15 before:to-transparent">

      <Link to="/" className="flex items-center gap-3 no-underline group">
        <div className="relative flex h-3.5 w-3.5 items-center justify-center">

          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500/40 opacity-75 duration-1000"></span>

          <span className="absolute inline-flex h-3.5 w-3.5 rounded-full bg-indigo-400/30 animate-pulse"></span>

          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-linear-to-tr from-indigo-600 via-indigo-500 to-violet-400 shadow-[0_0_12px_rgba(99,102,241,0.9)] border border-white/20"></span>
        </div>
        <span className="text-white ml-1 text-[16.7px] font-poppins font-bold tracking-[1.5px] transition-colors group-hover:text-indigo-200">
          QueryFlow
        </span>
      </Link>

      <Link
        to={isAdmin ? "/" : "/admin"}
        className="relative px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wide uppercase text-slate-300 border border-white/5 bg-white/3 shadow-sm transition-all duration-200 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/20 active:scale-[0.95] no-underline hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
      >
        {isAdmin ? (
          <span className="flex items-center gap-1 font-extrabold">
            <span className="text-indigo-400 font-sans">←</span> Submit a query
          </span>
        ) : (
          <span className="flex items-center gap-1 font-extrabold">
            Admin panel <span className="text-indigo-400 font-sans">→</span>
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar
