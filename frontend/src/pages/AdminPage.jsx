import { useState, useEffect } from 'react'
import { getAllQueries, updateQuery, deleteQuery } from '../api/queries'

function AdminPage() {
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  // for password
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", emoji: "🌤️" };
    if (hour < 17) return { text: "Good afternoon", emoji: "☀️" };
    if (hour < 21) return { text: "Good evening", emoji: "🌆" };
    return { text: "Good night", emoji: "🌙" };
  };

  const greeting = getGreeting();

  const fetchQueries = async () => {
    try {
      const res = await getAllQueries()
      setQueries(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authed) fetchQueries()
  }, [authed])

  const handleStatus = async (id, status) => {
    try {
      await updateQuery(id, status)
      fetchQueries()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteQuery(id)
      fetchQueries()
    } catch (err) {
      console.log(err)
    }
  }

  const filtered = queries
    .filter(q => filter === 'all' ? true : q.status === filter)
    .filter(q =>
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.message.toLowerCase().includes(search.toLowerCase())
    )

//styling of status boxes
  const statusStyle = (status) => {
    if (status === 'pending') return 'text-amber-400 bg-amber-500/5 border-amber-500/20 shadow-[0_0_12px_rgba(251,191,36,0.12)]'
    if (status === 'in-progress') return 'text-indigo-400 bg-indigo-500/5 border-indigo-500/20 shadow-[0_0_12px_rgba(99,102,241,0.12)]'
    if (status === 'resolved') return 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.12)]'
  }

  const statusDotColor = (status) => {
    if (status === 'pending') return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]'
    if (status === 'in-progress') return 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.7)]'
    if (status === 'resolved') return 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]'
  }

//password box
  if (!authed) {
    return (
      <div className="flex justify-center items-center min-h-[85vh] px-4">
        <div className="w-full max-w-md rounded-2xl p-8 border border-white/10 bg-white/2 backdrop-blur-xl shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent">
          <h1 className="text-white text-2xl font-poppins font-semibold tracking-wide [word-spacing:0.2rem] mb-1.5">
            Admin Access
          </h1>
          <p className="text-slate-400/80 font-semibold text-sm mb-6">Enter the administrator key passphrase to view dashboards.</p>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (password === 'admin123' ? setAuthed(true) : alert('Wrong password'))}
            className="w-full h-11 px-3.5 rounded-xl text-sm text-white placeholder-white/20 bg-white/4 border border-white/10 outline-none focus:border-indigo-500/80 focus:bg-indigo-500/2 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 mb-5 font-mono font-bold"
          />

          <button
            onClick={() => {
              if (password === 'admin123') setAuthed(true)
              else alert('Wrong password')
            }}
            className="w-full relative px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 active:scale-[0.98] overflow-hidden bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:bg-linear-to-b before:from-white/10 before:to-transparent"
          >
            <span className="relative z-10 font-semibold">Enter Dashboard</span>
          </button>
        </div>
      </div>
    )
  }

  // main dashboard
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto min-h-[90vh]">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-slate-500 font-poppins tracking-wide text-[13.5px] font-bold capitalize mb-2">
            {greeting.emoji} {greeting.text}, Administrator
          </p>
          <h1 className="text-white text-4xl font-poppins font-semibold tracking-wider [word-spacing:0.2rem] pb-4">
            System Queries
          </h1>
          <p className="text-slate-400/80 text-[16px] font-mono font-semibold mt-1.5">
            You currently have{" " }
            <span className="text-amber-400 font-extrabold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse">
              {queries.filter((q) => q.status === "pending").length} pending
            </span>{" "}
            tasks requiring direct resolution action.
          </p>
        </div>
        <div className="md:text-right">
          <p className="text-slate-400 text-[14px] font-mono font-bold bg-white/4 border border-white/5 rounded-xl px-4 py-2 inline-block shadow-[0_4px_20px_rgba(255,255,255,0.02)] border-t-white/10">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
  {[
    {
      label: "Total Queries",
      count: queries.length,
      style: "border-white/10 text-white hover:border-white/20 shadow-[0_4px_20px_rgba(255,255,255,0.02)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.05)]"
    },
    {
      label: "Pending Review",
      count: queries.filter((q) => q.status === "pending").length,
      style: "border-amber-500/20 text-amber-400 bg-amber-500/[0.01] hover:border-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.03)] hover:shadow-[0_0_25px_rgba(251,191,36,0.12)]"
    },
    {
      label: "Resolved Queries",
      count: queries.filter((q) => q.status === "resolved").length,
      style: "border-emerald-500/20 text-emerald-400 bg-emerald-500/[0.01] hover:border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.03)] hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]"
    },
  ].map((stat) => (
    <div
      key={stat.label}
      className={`rounded-2xl p-5 border bg-white/2 backdrop-blur-sm relative overflow-hidden transition-all duration-300 active:scale-[0.99] before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-linear-to-r before:from-transparent before:via-white/10 before:to-transparent ${stat.style}`}
    >
      <p className="text-3xl font-poppins font-semibold tracking-tight">{stat.count}</p>
      <p className="text-slate-400/70 font-mono font-bold uppercase tracking-widest text-[10px] mt-2">{stat.label}</p>
    </div>
  ))}
</div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <input
            placeholder="Search indexing names, emails or descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" font-mono font-semibold w-full h-11 px-4 rounded-xl text-sm text-white placeholder-white/25 bg-white/4 border border-white/10 outline-none focus:border-indigo-500/80 focus:bg-indigo-500/2 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-11 px-4 rounded-xl text-sm text-slate-300 font-semibold bg-zinc-900 border border-white/10 outline-none focus:border-indigo-500/80 transition-all cursor-pointer"
        >
          <option value="all">Show All Categories</option>
          <option value="pending">Status: Pending</option>
          <option value="in-progress">Status: In Progress</option>
          <option value="resolved">Status: Resolved</option>
        </select>
      </div>

      {loading ? (
        <div className="text-slate-400 font-mono text-xs text-center py-24 bg-white/1 border border-white/5 rounded-2xl">
          <span className="inline-block animate-pulse">Synchronizing directory modules...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-slate-400 font-mono text-xs text-center py-24 bg-white/1 border border-white/5 rounded-2xl">
          No matching records registered under targeted filters.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((query) => (
            <div
              key={query._id}
              className="rounded-2xl p-6 border border-white/10 bg-white/2 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:border-white/15 hover:bg-white/3 group flex flex-col gap-4 before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-linear-to-r before:from-transparent before:via-white/15 before:to-transparent"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-1">
                <div>
                  <p className="text-white text-base font-semibold font-sans tracking-tight">{query.name}</p>
                  <p className="text-indigo-300/70 font-mono font-bold text-xs mt-0.5">{query.email}</p>
                </div>

                <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest pl-2.5 pr-3.5 py-1.5 rounded-full border flex items-center gap-2 select-none ${statusStyle(query.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor(query.status)}`} />
                  {query.status.replace('-', ' ')}
                </span>
              </div>

              <p className="text-slate-300/90 text-sm font-mono font-bold placeholder:font-normal leading-relaxed bg-white/2 border border-white/5 p-4 rounded-xl">
                {query.message}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/5">
                <p className="text-slate-500 font-mono font-bold text-[11px] uppercase tracking-wider">
                  Logged: {new Date(query.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <div className="flex items-center gap-2 self-end sm:self-auto">

                  <select
                    value={query.status}
                    onChange={(e) => handleStatus(query._id, e.target.value)}
                    className="h-9 px-3 rounded-xl text-xs text-slate-300 font-bold bg-zinc-900 border border-white/10 outline-none focus:border-indigo-500/80 transition-all cursor-pointer"
                  >
                    <option value="pending">Set Pending</option>
                    <option value="in-progress">Set In Progress</option>
                    <option value="resolved">Set Resolved</option>
                  </select>

                  <button
                    onClick={() => handleDelete(query._id)}
                    className="h-9 px-4 rounded-xl text-xs font-mono font-extrabold uppercase tracking-wider text-rose-400 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/15 hover:border-rose-500/40 active:scale-[0.97] transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage
