import {useState} from 'react'
import {submitQuery} from '../api/queries'

function UserPage() {
  const [formData, setFormData] = useState({ name:'', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill all fields');
      return;
    } try {
      setLoading(true);
      setError('');
      await submitQuery(formData);
      setSuccess(true);
      setFormData({ name:'', email: '', message: '' });
    } catch (error) {
      setError('Failed to submit query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="flex justify-center items-center min-h-[85vh] px-4">
      <div className="w-full max-w-md rounded-2xl p-8 border border-white/10"
        style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}>

        <h1 className="text-white text-2xl font-semibold tracking-tight mb-1">
          Submit a query
        </h1>
        <p className="text-white/35 text-sm mb-7">
          We'll get back to you as soon as possible
        </p>

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-green-400 text-sm mb-5">
            ✅ Query submitted! Check your email for confirmation.
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-5">
            ❌ {error}
          </div>
        )}

        <label className="text-white/40 text-xs uppercase tracking-widest">
          Full name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Peter Parker"
          className="w-full mt-2 mb-4 h-10 px-3 rounded-lg text-sm text-white placeholder-white/20 outline-none border border-white/10 focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />

        <label className="text-white/40 text-xs uppercase tracking-widest">
          Email address
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="yourspidey@sheild.gov"
          className="w-full mt-2 mb-4 h-10 px-3 rounded-lg text-sm text-white placeholder-white/20 outline-none border border-white/10 focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />

        <label className="text-white/40 text-xs uppercase tracking-widest">
          Your message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your issue or query..."
          rows={4}
          className="w-full mt-2 mb-6 px-3 py-2 rounded-lg text-sm text-white placeholder-white/20 outline-none border border-white/10 focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-colors resize-none"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
            ● Pending
          </span>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-sm font-medium text-white transition-all
              ${loading ? 'bg-indigo-500/40 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'}`}
          >
            {loading ? 'Submitting...' : 'Submit query'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default UserPage

