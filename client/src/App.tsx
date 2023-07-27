import './App.css';
import Register from './forms/Register'
import Home from './pages/Home';
import Login from './forms/Login';
import About from './pages/About';
import Favorite from './pages/Favorite';
import MyCards from './pages/MyCards';
import Cards from './context/Cards';
import Add from './forms/Add';
import Edit from './forms/Edit';
import LoginInfo from './context/LoginInfo';
import Business from './pages/Business';
import Theme from './context/Theme';
import SandBox from './pages/SandBox';
import User from './forms/User';
import Error from './pages/Error';
import { Routes, Route } from 'react-router-dom'
import Footer from './layouts/Footer';
import BackGround from './layouts/BackGround';
import Navbar from './layouts/Navbar';
import RouteGuard from './layouts/RouteGuard';

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
              <Route path='/about/:id?' element={<About />} />
              <Route path='/home/:id?' element={<Home />} />
              <Route path='/business/:id' element={<Business />} />
              <Route path='/favorite/:id' element={<RouteGuard><Favorite /></RouteGuard>} />
              <Route path='/user/:id' element={<RouteGuard><User /></RouteGuard>} />
              <Route path='/my-cards/:id' element={<RouteGuard><MyCards /></RouteGuard>} />
              <Route path='/add/:id' element={<RouteGuard><Add /></RouteGuard>} />
              <Route path='/edit/:id' element={<RouteGuard><Edit /></RouteGuard>} />
              <Route path='/sandbox/:id' element={<RouteGuard><SandBox /></RouteGuard>} />
              <Route path='*' element={<Error />} />
            </Routes>
          </BackGround>
          <Footer />
        </Cards>
      </LoginInfo>
    </Theme>
  )
}

export default App;
