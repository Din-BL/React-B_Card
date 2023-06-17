import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import { Container } from '@mui/material';
import Login from './pages/Login';
import About from './pages/About';

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ backgroundColor: '#e4f2fd' }} maxWidth='xl'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App;
