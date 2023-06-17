import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import { Box } from '@mui/material'

function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: '#e4f2fd' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Box>
      <Footer />
    </>
  )
}

export default App;
