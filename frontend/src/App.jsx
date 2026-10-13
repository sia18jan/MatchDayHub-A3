 import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import ScheduleBuilder from './pages/ScheduleBuilder'
import LiveScores from './pages/LiveScores'
import Confirmation from './pages/Confirmation'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule" element={<ScheduleBuilder />} />
        <Route path="/scores" element={<LiveScores />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App