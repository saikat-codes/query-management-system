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

  const statusStyle = (status) => {
    if (status === 'pending') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    if (status === 'in-progress') return 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20'
    if (status === 'resolved') return 'text-green-400 bg-green-400/10 border-green-400/20'
  }

  const statusEmoji = (status) => {
    if (status === 'pending') return '🟡'
    if (status === 'in-progress') return '🔵'
    if (status === 'resolved') return '🟢'
  }

  // password screen
  if (!authed) {
    return (
      <div className="flex justify-center items-center min-h-[85vh] px-4">
        <div className="w-full max-w-sm rounded-2xl p-8 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}>
          <h1 className="text-white text-xl font-semibold tracking-tight mb-1">Admin access</h1>
          <p className="text-white/35 text-sm mb-6">Enter the admin password to continue</p>
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            className="w-full h-10 px-3 rounded-lg text-sm text-white placeholder-white/20 outline-none border border-white/10 focus:border-indigo-500/60 transition-colors mb-4"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          />
          <button
            onClick={() => {
              if (password === 'admin123') setAuthed(true)
              else alert('Wrong password')
            }}
            className="w-full py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            Enter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">

      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-white/35 text-sm mb-1">
            {greeting.emoji} {greeting.text}, Admin
          </p>
          <h1 className="text-white text-2xl font-semibold tracking-tight">
            Admin Panel
          </h1>
          <p className="text-white/35 text-sm mt-1">
            You have{" "}
            <span className="text-yellow-400 font-extrabold">
              {queries.filter((q) => q.status === "pending").length} pending
            </span>{" "}
            {queries.filter((q) => q.status === "pending").length === 1
              ? "query"
              : "queries"}{" "}
            to review
          </p>
        </div>
        <div className="text-right">
          <p className="text-white/25 text-xs">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total", count: queries.length },
          {
            label: "Pending",
            count: queries.filter((q) => q.status === "pending").length,
          },
          {
            label: "Resolved",
            count: queries.filter((q) => q.status === "resolved").length,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 border border-white/8"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-white text-2xl font-semibold">{stat.count}</p>
            <p className="text-white/35 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search by name, email or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-10 px-3 rounded-lg text-sm text-white placeholder-white/20 outline-none border border-white/10 focus:border-indigo-500/60 transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 px-3 rounded-lg text-sm text-white outline-none border border-white/10 focus:border-indigo-500/60 transition-colors"
          style={{ background: "rgba(30,30,46,0.9)" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading ? (
        <div className="text-white/40 text-sm text-center py-20">
          Loading queries...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-white/40 text-sm text-center py-20">
          No queries found
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((query) => (
            <div
              key={query._id}
              className="rounded-xl p-5 border border-white/8 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-white text-sm font-medium">{query.name}</p>
                  <p className="text-white/35 text-xs mt-0.5">{query.email}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${statusStyle(query.status)}`}
                >
                  {statusEmoji(query.status)} {query.status}
                </span>
              </div>

              <p className="text-white/60 text-sm leading-relaxed">
                {query.message}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <p className="text-white/25 text-xs">
                  {new Date(query.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="flex gap-2">
                  <select
                    value={query.status}
                    onChange={(e) => handleStatus(query._id, e.target.value)}
                    className="h-8 px-2 rounded-lg text-xs text-white outline-none border border-white/10 transition-colors"
                    style={{ background: "rgba(30,30,46,0.9)" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() => handleDelete(query._id)}
                    className="h-8 px-3 rounded-lg text-xs text-red-400 border border-red-400/20 bg-red-400/10 hover:bg-red-400/20 transition-colors"
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
