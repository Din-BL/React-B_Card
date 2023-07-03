import './styles/App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Register from './forms/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './forms/Login';
import About from './pages/About';
import Favorite from './pages/Favorite';
import My_Cards from './pages/My_Cards';
import { ToastContainer } from 'react-toastify';
import Cards from './context/Cards';
import Add from './forms/Add';
import Edit from './forms/Edit';
import Data from './context/Cards';
import Business from './context/Business';


function App() {
  return (
    <>
      <Business>
        <Cards>
          <Navbar />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/:id?' element={<Home />} />
            <Route path='/favorite/:id' element={<Favorite />} />
            <Route path='/my cards/:id' element={<My_Cards />} />
            <Route path='/add/:id' element={<Add />} />
            <Route path='/edit/:id' element={<Edit />} />
            {/* <Route path='*' element={<Error_Page />} /> */}
            {/* If user logged in the "back button navigate to `home`" */}
          </Routes>
          <Footer />
          <ToastContainer />
        </Cards>
      </Business>
    </>
  )
}

export default App;
