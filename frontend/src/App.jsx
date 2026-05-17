import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen"
        style={{
          background: '#1a1a2e',
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(79,70,229,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 50%)
          `
        }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
