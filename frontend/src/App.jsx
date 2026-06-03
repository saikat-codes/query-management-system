import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import Navbar from './components/Navbar'
import TrackPage from './pages/Trackpage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-hidden"
     style={{
       background: '#111010'
     }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/track" element={<TrackPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
