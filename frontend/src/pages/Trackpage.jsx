import { useState } from 'react'
import { loginUser, getMyQueries } from '../api/auth'

function TrackPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  const handleLogin = async () => {
    console.log('handleLogin fired', email, password)
    if (!email || !password) {
      setError('Please fill all fields')
      return
    }
    try {
      setLoading(true)
      setError('')
      const res = await loginUser({ email, password })
      setUserName(res.data.name)
      const queriesRes = await getMyQueries()
      setQueries(queriesRes.data)
      setLoggedIn(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const statusConfig = (status) => {
    if (status === 'pending') return { color: 'text-amber-400', bg: 'bg-amber-500/5 border-amber-500/20', dot: 'bg-amber-400', label: 'Pending' }
    if (status === 'in-progress') return { color: 'text-teal-300', bg: 'bg-teal-500/5 border-teal-500/20', dot: 'bg-teal-300', label: 'In Progress' }
    if (status === 'resolved') return { color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20', dot: 'bg-emerald-400', label: 'Resolved' }
  }

  // login screen
  if (!loggedIn) {
    return (
      <div className="max-w-sm mx-auto px-8 py-20">
        <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3">
          Query Tracker
        </p>
        <h1 className="text-3xl font-bold text-white mb-2 font-poppins">
          Track your queries
        </h1>
        <p className="text-sm font-bold text-slate-500 mb-8 pb-8 border-b border-white/5">
          Enter your email and password to see your submitted queries
        </p>

        {error && (
          <div className="flex items-center gap-3 bg-rose-500/5 border border-rose-500/20 rounded px-4 py-3 text-rose-400 text-sm mb-6">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            {error}
          </div>
        )}

        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tony@starkindustries.com"
          className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 transition-colors placeholder-slate-600 mb-4 font-mono"
        />

        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="••••••••"
          className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 transition-colors placeholder-slate-600 mb-6 font-mono"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded text-xs font-semibold uppercase tracking-widest transition-colors
            ${loading
              ? 'bg-teal-300/20 text-teal-300/40 cursor-not-allowed'
              : 'bg-teal-300 text-slate-900 hover:bg-teal-200 cursor-pointer'
            }`}
        >
          {loading ? 'Verifying...' : 'View my queries'}
        </button>
      </div>
    )
  }

  // queries screen
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">

      <div className="mb-10 pb-8 border-b border-white/5">
        <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3">
          Query Tracker
        </p>
        <h1 className="text-3xl font-bold text-white  mb-2 font-poppins">
          Your queries
        </h1>
        <p className="text-sm text-slate-500 font-bold">
          {queries.length === 0
            ? 'No queries submitted yet'
            : `${queries.length} ${queries.length === 1 ? 'query' : 'queries'} submitted`}
        </p>
      </div>

      {queries.length === 0 ? (
        <div className="text-slate-600 text-sm text-center py-20 border border-white/5 rounded uppercase tracking-widest font-mono">
          No queries found
        </div>
      ) : (
        <div className="divide-y divide-white/5 border border-white/5 rounded">
          {queries.map(query => {
            const s = statusConfig(query.status)
            return (
              <div key={query._id} className="p-5 bg-[#141414] hover:bg-[#161616] transition-colors">

                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-xs text-slate-500 font-mono">
                    {new Date(query.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                  <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border flex items-center gap-2 ${s.bg} ${s.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed bg-white/2 border border-white/5 px-4 py-3 rounded font-mono">
                  {query.message}
                </p>

              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}

export default TrackPage
