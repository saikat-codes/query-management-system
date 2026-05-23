import { useState, useEffect } from 'react'
import { getAllQueries, updateQuery, deleteQuery } from '../api/queries'

function AdminPage() {
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: 'Good morning', emoji: '🌤️' }
    if (hour < 17) return { text: 'Good afternoon', emoji: '☀️' }
    if (hour < 21) return { text: 'Good evening', emoji: '🌆' }
    return { text: 'Good night', emoji: '🌙' }
  }
  const greeting = getGreeting()

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
    await updateQuery(id, status)
    fetchQueries()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this query?')) return
    await deleteQuery(id)
    fetchQueries()
  }

  const filtered = queries
    .filter(q => filter === 'all' ? true : q.status === filter)
    .filter(q =>
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.message.toLowerCase().includes(search.toLowerCase())
    )

  const statusConfig = (status) => {
    if (status === 'pending') return { color: 'text-amber-400', label: 'Pending' }
    if (status === 'in-progress') return { color: 'text-teal-300', label: 'In Progress' }
    if (status === 'resolved') return { color: 'text-slate-500', label: 'Resolved' }
  }

  // password screen
  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-8 py-20">
        <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3">
          Admin
        </p>
        <h1 className="text-2xl text-white  mb-2 font-poppins font-bold tracking-wide">
          Restricted access
        </h1>
        <p className="text-sm text-slate-500 mb-8 pb-8 border-b border-white/5 font-semibold font-sans">
          Enter your password to continue
        </p>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (password === import.meta.env.VITE_AUTH_PASSWORD ? setAuthed(true) : alert('Wrong password'))}
          className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 transition-colors placeholder-slate-600 mb-6"
        />
        <button
          onClick={() => password === import.meta.env.VITE_AUTH_PASSWORD ? setAuthed(true) : alert('Wrong password')}
          className="w-full bg-teal-300 text-slate-900 text-xs font-semibold uppercase tracking-widest py-3 rounded hover:bg-teal-200 transition-colors"
        >
          Enter
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">

      <div className="flex items-start justify-between mb-10 pb-8 border-b border-white/5">
        <div>
          <p className="text-xs text-teal-300 uppercase tracking-widest font-semibold mb-2">
            {greeting.emoji} {greeting.text}, Admin
          </p>
          <h1 className="text-3xl text-white mb-2 font-poppins font-bold tracking-wide">
            Admin panel
          </h1>
          <p className="text-sm text-slate-500 font-semibold font-sans">
            You have{' '}
            <span className="text-amber-400 font-bold font-poppins animate-pulse">
              {queries.filter(q => q.status === 'pending').length} pending
            </span>{' '}
            {queries.filter(q => q.status === 'pending').length === 1 ? 'query' : 'queries'} to review
          </p>
        </div>
        <p className="text-sm text-slate-600 font-poppins font-medium">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total queries', count: queries.length },
          { label: 'Pending', count: queries.filter(q => q.status === 'pending').length },
          { label: 'Resolved', count: queries.filter(q => q.status === 'resolved').length },
        ].map(stat => (
          <div key={stat.label} className="bg-[#141414] border border-white/5 rounded p-5">
            <p className="text-2xl font-semibold text-white mb-1 font-mono">{stat.count}</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <input
          placeholder="Search by name, email or message..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-2.5 rounded outline-none focus:border-teal-300/50 transition-colors placeholder-slate-600 font-mono"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-[#1a1a1a] border border-[#1e293b] text-slate-400 text-sm px-4 py-2.5 rounded outline-none focus:border-teal-300/50 transition-colors"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading ? (
        <p className="text-slate-600 text-sm text-center py-20 uppercase tracking-widest">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-slate-600 text-sm text-center py-20 uppercase tracking-widest">No queries found</p>
      ) : (
        <div className="divide-y divide-white/5 border border-white/5 rounded">
          {filtered.map(query => {
            const s = statusConfig(query.status)
            return (
              <div key={query._id} className="p-5 bg-[#141414] hover:bg-[#161616] transition-colors">

                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-[16px] font-semibold text-slate-200 font-poppins">{query.name}</p>
                    <p className="text-[12px] text-slate-500 mt-0.5 font-mono font-medium">{query.email}</p>
                  </div>
                  <span className={`text-xs uppercase tracking-widest font-semibold ${s.color}`}>
                    {s.label}
                  </span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-4 font-sans font-medium">
                  {query.message}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-600 font-semibold">
                    {new Date(query.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                  <div className="flex gap-2">
                    <select
                      value={query.status}
                      onChange={e => handleStatus(query._id, e.target.value)}
                      className="bg-[#1a1a1a] border border-[#1e293b] text-slate-400 text-xs px-3 py-1.5 rounded outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button
                      onClick={() => handleDelete(query._id)}
                      className="text-xs text-slate-600 hover:text-rose-400 border border-white/5 hover:border-rose-400/20 px-3 py-1.5 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}

export default AdminPage
