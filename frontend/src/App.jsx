import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-hidden"
     style={{
       backgroundColor: '#090d16',
       backgroundImage: `
         linear-gradient(135deg, rgba(15, 23, 42, 0.3) 0%, rgba(9, 13, 22, 0.8) 100%),
         radial-gradient(at 80% 20%, rgba(139, 92, 246, 0.3) 0px, transparent 50%)
       `,
       backgroundAttachment: 'fixed'
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
