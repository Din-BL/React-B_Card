import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Register from './forms/Register'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './forms/Login';
import About from './pages/About';
import Favorite from './pages/Favorite';
import My_Cards from './pages/My_Cards';
import Cards from './context/Cards';
import Add from './forms/Add';
import Edit from './forms/Edit';
import LoginInfo from './context/LoginInfo';
import Business from './pages/Business';
import Theme from './context/Theme';
import BackGround from './components/BackGround';
import SandBox from './pages/SandBox';
import RouteGuard from './components/RouteGuard';
import User from './forms/User';


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
              <Route path='/home/:id?' element={<Home />} />
              <Route path='/business/:id' element={<Business />} />
              <Route path='/favorite/:id' element={<RouteGuard><Favorite /></RouteGuard>} />
              <Route path='/user/:id' element={<RouteGuard><User /></RouteGuard>} />
              <Route path='/my cards/:id' element={<RouteGuard><My_Cards /></RouteGuard>} />
              <Route path='/add/:id' element={<RouteGuard><Add /></RouteGuard>} />
              <Route path='/edit/:id' element={<RouteGuard><Edit /></RouteGuard>} />
              <Route path='/sandbox/:id' element={<RouteGuard><SandBox /></RouteGuard>} />
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
