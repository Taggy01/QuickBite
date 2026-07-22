import './App.css'
import Homepage from './pages/Homepage'
import Adminpanel from './pages/Adminpage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyOrderPage from './pages/MyOrderpage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-center' />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/orders" element={<MyOrderPage />} />
        <Route path="/adminPanel" element={<Adminpanel />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App