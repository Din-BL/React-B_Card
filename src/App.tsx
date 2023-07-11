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
import LoginInfo from './context/LoginInfo';
import Business from './pages/Business';
import Theme from './context/Theme';
import BackGround from './components/BackGround';


function App() {
  return (
    <Theme>
      <LoginInfo>
        <Cards>
          <Navbar />
          <BackGround>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/about' element={<About />} />
              <Route path='/:id?' element={<Home />} />
              <Route path='/favorite/:id' element={<Favorite />} />
              <Route path='/my cards/:id' element={<My_Cards />} />
              <Route path='/add/:id' element={<Add />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/business/:id' element={<Business />} />
              {/* <Route path='*' element={<Error_Page />} /> */}
              {/* If user that is logged in click the "back button" navigate to `home` */}
            </Routes>
          </BackGround>
          <Footer />
        </Cards>
      </LoginInfo>
    </Theme>
  )
}

export default App;
