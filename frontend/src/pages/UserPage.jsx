import { useState } from 'react'
import { submitQuery } from '../api/queries'

function UserPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill all fields')
      return
    }
    try {
      setLoading(true)
      setError('')
      await submitQuery(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError('Failed to submit query. Please try again.')
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-8 py-16">
      <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3">
        Support
      </p>

      <h1 className="text-3xl font-bold text-white tracking-[3px] mb-2 font-poppins">
        Submit a Query
      </h1>
      <p className="text-sm text-slate-500 mb-10 pb-8 border-b border-white/5 font-sans font-semibold">
        We'll get back to you as soon as possible
      </p>

      {success && (
        <div className="flex items-center gap-3 bg-teal-300/5 border border-teal-300/20 rounded px-4 py-3 text-teal-300 text-sm mb-8">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Query submitted — check your email for confirmation.
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-rose-500/5 border border-rose-500/20 rounded px-4 py-3 text-rose-400 text-sm mb-8">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="space-y-6 mb-10">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Peter Parker"
              className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 focus:bg-[#1c1c1c] transition-colors placeholder-slate-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="peter@dailybugle.com"
              className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 focus:bg-[#1c1c1c] transition-colors placeholder-slate-600 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              Your message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your issue or query..."
              rows={5}
              className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 focus:bg-[#1c1c1c] transition-colors placeholder-slate-600 resize-none font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
           <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Pending
              </span>
            </div>
          <button
            type="submit"
            disabled={loading}
            className={`text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded transition-all
              ${
                loading
                  ? "bg-teal-300/20 text-teal-300/40 cursor-not-allowed"
                  : "bg-teal-300 text-slate-900 hover:bg-teal-200 cursor-pointer"
              }`}
          >
            {loading ? "Submitting..." : "Submit query"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserPage
