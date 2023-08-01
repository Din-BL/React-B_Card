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
import Contact from './components/Contact';
import Redirect from './layouts/Redirect';
import { companyInfo } from './utils/cards';

function App() {
  return (
    <Theme>
      <LoginInfo>
        <Cards>
          <Navbar />
          <BackGround>
            <Routes>
              <Route path='/' element={<Redirect />} />
              <Route path='*' element={<Error />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/about/:id?' element={<Redirect><About /></Redirect>} />
              <Route path='/contact' element={<Contact businessInfo={companyInfo} />} />
              <Route path='/home/:id?' element={<Redirect><Home /></Redirect>} />
              <Route path='/business/:id' element={<Business />} />
              <Route path='/favorite/:id' element={<RouteGuard><Favorite /></RouteGuard>} />
              <Route path='/user/:id' element={<RouteGuard><User /></RouteGuard>} />
              <Route path='/my-cards/:id' element={<RouteGuard><MyCards /></RouteGuard>} />
              <Route path='/add/:id' element={<RouteGuard><Add /></RouteGuard>} />
              <Route path='/edit/:id' element={<RouteGuard><Edit /></RouteGuard>} />
              <Route path='/sandbox/:id' element={<RouteGuard><SandBox /></RouteGuard>} />
            </Routes>
          </BackGround>
          <Footer />
        </Cards>
      </LoginInfo>
    </Theme>
  )
}

export default App;
