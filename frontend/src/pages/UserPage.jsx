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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4">
  <div className="w-full max-w-md rounded-2xl p-8 border border-white/10 bg-white/2 backdrop-blur-xl shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent">


    <div className="mb-8">
      <h1 className="text-white text-3xl font-poppins font-semibold tracking-wider [word-spacing:0.3rem] mb-1.5">
  Submit a Query
</h1>
      <p className="text-slate-400/80 pl-1 font-semibold text-sm">
        We'll get back to you as soon as possible.
      </p>
    </div>


    {success && (
      <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] rounded-xl px-4 py-3 text-emerald-400 text-sm mb-6 animate-in fade-in duration-200">
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        <span className='font-semibold'>Query submitted! Check your email for confirmation.</span>
      </div>
    )}

    {error && (
      <div className="flex items-center gap-2.5 bg-rose-500/10 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)] rounded-xl px-4 py-3 text-rose-400 text-sm mb-6 animate-in fade-in duration-200">
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        <span>{error}</span>
      </div>
    )}


    <div className="space-y-5 mb-8">

      <div className="flex flex-col gap-2">
        <label className="text-slate-400 text-[13px] uppercase tracking-widest font-bold">
          Full name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Peter Parker"
          className="w-full h-11 px-3.5 rounded-xl text-sm text-white placeholder-white/25 bg-white/4 border border-white/10 outline-none focus:border-indigo-500/80 focus:bg-indigo-500/2 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-mono font-bold placeholder:font-normal"
        />
      </div>


      <div className="flex flex-col gap-2">
        <label className="text-slate-400 text-[13px] uppercase tracking-widest font-bold">
          Email address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="yourspidey@shield.gov"
          className="w-full h-11 px-3.5 rounded-xl text-sm text-white placeholder-white/25 bg-white/4 border border-white/10 outline-none focus:border-indigo-500/80 focus:bg-indigo-500/2 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-mono font-bold placeholder:font-normal"
        />
      </div>


      <div className="flex flex-col gap-2">
        <label className="text-slate-400 text-[13px] uppercase tracking-widest font-bold">
          Your message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your issue or query..."
          rows={4}
          className="w-full px-3.5 py-3 rounded-xl text-sm text-white placeholder-white/25 bg-white/4 border border-white/10 outline-none focus:border-indigo-500/80 focus:bg-indigo-500/2 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 resize-none font-mono font-bold placeholder:font-normal"
        />
      </div>
    </div>


    <div className="flex items-center justify-between pt-4 border-t border-white/5">

      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/5 border border-amber-500/20 shadow-[0_0_12px_rgba(251,191,36,0.15)] ">
        <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
          Pending
        </span>
      </div>


      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`relative px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 active:scale-[0.98] overflow-hidden
          ${loading
            ? 'bg-indigo-600/40 cursor-not-allowed opacity-50 shadow-none'
            : 'bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 cursor-pointer before:absolute before:inset-0 before:w-full before:h-full before:bg-linear-to-b before:from-white/10 before:to-transparent'
          }`}
      >
        <span className="relative z-10 font-semibold">
          {loading ? 'Submitting...' : 'Submit Query'}
        </span>
      </button>
    </div>

  </div>
</div>
  )
}

export default UserPage

