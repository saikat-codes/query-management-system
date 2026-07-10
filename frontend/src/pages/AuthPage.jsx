import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth'
import axios from 'axios'
import { authSchema } from '../utils/validation'

function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('trying to authenticate...', formData)
    setApiError('')
    setErrors({})

    // Zod validation check
    const result = authSchema.safeParse(formData)
    if (!result.success) {
      console.log('zod validation failed!', result.error.errors)
      const fieldErrors = {}

      for (let i = 0; i < result.error.errors.length; i++) {
        const err = result.error.errors[i]
        fieldErrors[err.path[0]] = err.message
      }
      setErrors(fieldErrors)
      return
    }

    try {
      setLoading(true)
      if (isLogin) {
        console.log('doing login process...')
        const res = await loginUser({ email: formData.email, password: formData.password })
        onLoginSuccess(res.data.name)
        navigate('/submit')
      } else {
        console.log('doing registration process...')
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, formData, { withCredentials: true })
        setIsLogin(true)
        setApiError('Account created successfully! Please log in.')
      }
    } catch (err) {
      console.log('auth error occurred:', err)
      setApiError(err.response?.data?.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-8 py-20">
      <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3">
        Gateway
      </p>
      <h1 className="text-3xl font-bold text-white mb-6 font-poppins">
        {isLogin ? 'Sign In' : 'Create Account'}
      </h1>

      {apiError && (
        <div className="bg-green-500/5 border border-green-500/20 rounded px-4 py-3 text-green-400 text-sm mb-6">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tony Stark"
              className="w-full bg-[#1a1a1a] border border-[#1e293b] text-slate-200 text-sm px-4 py-3 rounded outline-none focus:border-teal-300/50 transition-colors placeholder-slate-600 font-mono"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tony@starkindustries.com"
            className={`w-full bg-[#1a1a1a] border text-slate-200 text-sm px-4 py-3 rounded outline-none transition-colors placeholder-slate-600 font-mono ${errors.email ? 'border-rose-500' : 'border-[#1e293b] focus:border-teal-300/50'}`}
          />
          {errors.email && <p className="text-rose-400 text-xs mt-1 font-mono">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full bg-[#1a1a1a] border text-slate-200 text-sm px-4 py-3 rounded outline-none transition-colors placeholder-slate-600 font-mono ${errors.password ? 'border-rose-500' : 'border-[#1e293b] focus:border-teal-300/50'}`}
          />
          {errors.password && <p className="text-rose-400 text-xs mt-1 font-mono">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-teal-300 text-slate-900 text-xs font-semibold uppercase tracking-widest rounded hover:bg-teal-200 transition-colors hover:cursor-pointer"
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <button
        onClick={() => { setIsLogin(!isLogin); setErrors({}); setApiError(''); }}
        className="text-xs text-slate-500 hover:text-teal-300 transition-colors mt-6 block text-center w-full font-mono font-bold hover:cursor-pointer"
      >
        {isLogin ? "No account? Register here" : "Have an account? Log in"}
      </button>
    </div>
  )
}

export default AuthPage
