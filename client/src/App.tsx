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
import Contact from './pages/Contact';
import Redirect from './layouts/Redirect';
import { companyInfo } from './utils/cards';
import ViewMode from './context/ViewMode';
import Loading from './context/Loading';
import Maintenance from './pages/Maintenance ';

function App() {
  return (
    <Theme>
      <LoginInfo>
        <Cards>
          <ViewMode>
            <Navbar />
            <BackGround>
              <Loading>
                <Routes>
                  <Route path='/' element={<Redirect />} />
                  <Route path='*' element={<Error />} />
                  <Route path='/maintenance' element={<Maintenance />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/about/:id?' element={<Redirect><About businessInfo={companyInfo} /></Redirect>} />
                  <Route path='/home/:id?' element={<Redirect><Home /></Redirect>} />
                  <Route path='/contact' element={<Contact businessInfo={companyInfo} />} />
                  <Route path='/business/:id' element={<Business />} />
                  <Route path='/favorite/:id' element={<RouteGuard><Favorite /></RouteGuard>} />
                  <Route path='/user/:id' element={<RouteGuard><User /></RouteGuard>} />
                  <Route path='/sandbox/:id' element={<RouteGuard><SandBox /></RouteGuard>} />
                  <Route path='/my-cards/:id' >
                    <Route index element={<RouteGuard><MyCards /></RouteGuard>} />
                    <Route path='add' element={<RouteGuard><Add /></RouteGuard>} />
                    <Route path='edit/:id' element={<RouteGuard><Edit /></RouteGuard>} />
                  </Route>
                </Routes>
              </Loading>
            </BackGround>
            <Footer />
          </ViewMode>
        </Cards>
      </LoginInfo>
    </Theme>
  )
}

export default App;
