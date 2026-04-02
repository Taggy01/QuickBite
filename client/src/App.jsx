import './App.css'
import Homepage from './pages/Homepage'
import Adminpanel from './pages/Adminpage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AdminPanel" element={<Adminpanel />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App