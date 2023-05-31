/** @format */

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Add from './pages/Add';
import Update from './pages/Update';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DetailBook from './pages/DetailBook';
import Cart from './pages/Cart';
import Buy from './pages/Buy';

import {useState} from 'react';
import User from './pages/User';
import Confirm from './pages/Confirm';
function App() {
   var checkLogin = localStorage.hasOwnProperty('user');
   const [logout, setLogout] = useState(!checkLogin);
   return (
      <div className='app'>
         <Router>
            <Navbar logout={logout} setLogout={setLogout} />
            <div className='container ' style={{marginTop: '60px'}}>
               <Routes>
                  <Route path='/' element={<Home />} />

                  <Route path='/admin' element={<Admin />} />
                  <Route path='/admin/add' element={<Add />} />
                  <Route path='/admin/book/:id' element={<Update />} />
                  <Route path='/login' element={<Login setLogout={setLogout} />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/book/:id' element={<DetailBook logout={logout} />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/buy' element={<Buy />} />
                  <Route path='/user' element={<User setLogout={setLogout} />} />
                  <Route path='/confirm' element={<Confirm />} />
               </Routes>
            </div>
         </Router>
      </div>
   );
}

export default App;
