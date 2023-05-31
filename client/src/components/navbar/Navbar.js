/** @format */

import './navbar.scss';
import {SentimentDissatisfiedOutlined, Close} from '@mui/icons-material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
export default function Navbar({logout}) {
   const user = localStorage.hasOwnProperty('user') ? JSON.parse(localStorage.getItem('user')) : [];

   const adminNav = user.id === 1;
   const cart = localStorage.hasOwnProperty('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

   const handleRemove = (e) => {
      const carts = cart.filter((item) => item.id !== e.id);
      localStorage.setItem('cart', JSON.stringify(carts));
      window.location.reload();
   };

   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   return (
      <div className='header'>
         <div className='nav'>
            <ul className='nav-left'>
               <li>
                  <NavLink to='/' className='nav-link'>
                     Home
                  </NavLink>
               </li>

               {adminNav && (
                  <li>
                     <Dropdown>
                        <Dropdown.Toggle id='dropdown-basic' className='drop'>
                           Admin
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                           <Dropdown.Item style={{color: '#000'}}>
                              <NavLink to='/admin' style={{textDecoration: 'none', color: '#000'}}>
                                 <div>Book List</div>
                              </NavLink>
                           </Dropdown.Item>

                           <Dropdown.Item>
                              <NavLink to='/confirm' style={{textDecoration: 'none', color: '#000'}}>
                                 <div>Confirm</div>
                              </NavLink>
                           </Dropdown.Item>
                        </Dropdown.Menu>
                     </Dropdown>
                  </li>
               )}
            </ul>

            {logout ? (
               <ul className='nav-right'>
                  <li>
                     <NavLink to='/login' className='nav-link'>
                        Login
                     </NavLink>
                  </li>
                  <li>
                     <NavLink to='/register' className='nav-link'>
                        Register
                     </NavLink>
                  </li>
               </ul>
            ) : (
               <ul className='nav-right'>
                  <li onClick={(e) => setIsOpen(!isOpen)} className='nav-right-cart'>
                     Cart
                     <span>{cart.length}</span>
                  </li>
                  {isOpen &&
                     (cart && cart.length > 0 ? (
                        <div className='has-cart-wrapper'>
                           <h3 className='title'>Sản phẩm trong giỏ hàng</h3>
                           {cart.map((item) => (
                              <div className='product-cart' key={item.id}>
                                 <img src={item.image} alt='' style={{height: '70px', width: '60px', objectFit: 'cover'}} />
                                 <div className='desc'>
                                    <h4>{item.title}</h4>
                                    <span>Số lượng: {item.quantity}</span>
                                 </div>
                                 <span className='close'>
                                    <Close onClick={() => handleRemove(item)} style={{cursor: 'pointer'}} />
                                 </span>
                              </div>
                           ))}

                           <div className='btn-cart'>
                              <button
                                 className='btn btn-success'
                                 onClick={() => {
                                    navigate('/cart');
                                    setIsOpen(false);
                                 }}
                              >
                                 Xem giỏ hàng
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div className='no-cart-wrapper'>
                           <SentimentDissatisfiedOutlined className='no-cart-icon' />
                           <span className='no-cart-text'>Your Cart is empty</span>
                        </div>
                     ))}
                  <li>
                     <NavLink to='/user' className='nav-link'>
                        User
                     </NavLink>
                  </li>
               </ul>
            )}
         </div>
      </div>
   );
}
