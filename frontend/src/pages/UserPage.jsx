import { useState } from 'react'
import { submitQuery } from '../api/queries'
import { querySchema } from '../utils/validation'

function UserPage() {
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submitting form data:', formData)
    setErrors({})
    setApiError('')

    //zod checks
    const result = querySchema.safeParse(formData)
    if (!result.success) {
      console.log('validation errors found!', result.error.errors)
      const fieldErrors = {}

      for (let i = 0; i < result.error.errors.length; i++) {
        const errorItem = result.error.errors[i]
        fieldErrors[errorItem.path[0]] = errorItem.message
      }
      setErrors(fieldErrors)
      return
    }

    try {
      setLoading(true)
      await submitQuery(formData)
      setSuccess(true)
      setFormData({ name: '', message: '' })
    } catch (err) {
      console.log('Error submitting info:', err)
      setApiError('Failed to submit query. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-8 py-16">
      <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3">Support</p>
      <h1 className="text-3xl font-bold text-white tracking-[3px] mb-2 font-poppins">Submit a Query</h1>
      <p className="text-sm text-slate-500 mb-10 pb-8 border-b border-white/5 font-sans font-semibold">Logged-in session active</p>

      {success && <div className="bg-teal-300/5 border border-teal-300/20 rounded px-4 py-3 text-teal-300 text-sm mb-8">Query logged and dispatched successfully!</div>}
      {apiError && <div className="bg-rose-500/5 border border-rose-500/20 rounded px-4 py-3 text-rose-400 text-sm mb-8">{apiError}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tony Stark"
            className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 font-mono"
          />
          {errors.name && <p className="text-rose-400 text-xs mt-1 font-mono">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Message Description</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your query..."
            rows={5}
            className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 resize-none font-mono"
          />
          {errors.message && <p className="text-rose-400 text-xs mt-1 font-mono">{errors.message}</p>}
        </div>

        <button type="submit" disabled={loading} className="w-full py-3 bg-teal-300 text-slate-900 text-xs font-semibold uppercase tracking-widest rounded hover:bg-teal-200 transition-colors">
          {loading ? "Submitting..." : "Submit query"}
        </button>
      </form>
    </div>
  )
}

export default UserPage
