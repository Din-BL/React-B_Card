import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Favorite from './pages/Favorite';
import My_Cards from './pages/My_Cards';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/my cards' element={<My_Cards />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
