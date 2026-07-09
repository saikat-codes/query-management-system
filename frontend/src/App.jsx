import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'
import TrackPage from './pages/Trackpage'
import AuthPage from './pages/AuthPage'
import axios from 'axios' 

function App() {
  const [user, setUser] = useState(null)

  const handleLoginSuccess = (name) => {
    console.log('User logged in successfully, setting name:', name)
    setUser(name)
  }

  const handleLogout = async () => {
    console.log('logging out user...')
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {}, { withCredentials: true })
    } catch (err) {
      console.log('Backend logout error (safe to ignore on client):', err)
    }
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-hidden" style={{ background: '#111010' }}>

        <Navbar onLogout={handleLogout} currentUser={user} />

        <Routes>
          {/* Auth Base Route */}
          <Route
            path="/"
            element={user ? <Navigate to="/submit" replace /> : <AuthPage onLoginSuccess={handleLoginSuccess} />}
          />

          {/* Protected Channels */}
          <Route
            path="/submit"
            element={user ? <UserPage /> : <Navigate to="/" replace />}
          />

          <Route
            path="/track"
            element={user ? <TrackPage /> : <Navigate to="/" replace />}
          />

          {/* Admin */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
