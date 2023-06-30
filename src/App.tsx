import './styles/App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Register from './auth/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './auth/Login';
import About from './pages/About';
import Favorite from './pages/Favorite';
import My_Cards from './pages/My_Cards';
import Add_Card from './pages/Add_Card';
import { ToastContainer } from 'react-toastify';
import Cards from './context/Cards';


function App() {
  return (
    <>
      <Cards>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/:id?' element={<Home />} />
          <Route path='/favorite/:id' element={<Favorite />} />
          <Route path='/my cards/:id' element={<My_Cards />} />
          <Route path='/add card/:id' element={<Add_Card />} />
          {/* <Route path='*' element={<Error_Page />} /> */}
        </Routes>
        <Footer />
        <ToastContainer />
      </Cards>
    </>
  )
}

export default App;
