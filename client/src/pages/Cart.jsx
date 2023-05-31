/** @format */

import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../style.scss';
import axios from 'axios';
const Cart = () => {
   const navigate = useNavigate();
   const handleRemove = (e) => {
      const carts = cart.filter((item) => item.id !== e.id);
      localStorage.setItem('cart', JSON.stringify(carts));
      window.location.reload();
   };
   const cart = localStorage.hasOwnProperty('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
   const handleBuyBook = async (item) => {
      try {
         await axios.post('http://localhost:8888/buys', item);
         navigate('/buy');
      } catch (err) {
         console.log(err);
      }
   };
   const handleClickPlus = (index) => {
      let book = cart;
      book[index].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(book));
      window.location.reload();
   };
   const handleClickMinus = (index) => {
      let book = cart;
      if (book[index].quantity > 1) {
         book[index].quantity -= 1;
         localStorage.setItem('cart', JSON.stringify(book));
         window.location.reload();
      }
   };
   return (
      <div className='container'>
         <h1 style={{textAlign: 'center', marginBottom: '40px'}}>Sản phẩm trong giỏ</h1>
         <div className='cartDetail'>
            {cart &&
               cart.map((item, index) => (
                  <div className='cartItem row' style={{marginBottom: '30px', marginRight: '30px'}} key={index}>
                     <div className='col-md-6'>
                        <img src={item.image} alt='' style={{height: '300px', width: '200px', objectFit: 'cover'}} />
                     </div>
                     <div className='col-md-6 ' style={{textAlign: 'left'}}>
                        <h5 className='card-title'>{item.title}</h5>
                        <p className='card-text'>{item.des}</p>
                        <p>Thể loại: {item.category}</p>
                        <p>Tác giả: {item.author}</p>
                        <p>Năm xuất bản: {item.dateRelease}</p>
                        <p>Số trang: {item.numberPage}</p>
                        <div className='count'>
                           <span>Số lượng: </span>
                           <button
                              className='minus'
                              onClick={() => {
                                 handleClickMinus(index);
                              }}
                           >
                              -
                           </button>
                           <input type='text' />
                           {item.quantity}
                           <button className='plus' onClick={() => handleClickPlus(index)}>
                              +
                           </button>
                        </div>

                        <button onClick={() => handleBuyBook(item)} className='btn btn-success' style={{marginRight: '10px'}}>
                           Mua ngay
                        </button>
                        <button onClick={() => handleRemove(item)} className='btn btn-success'>
                           Xóa khỏi giỏ hàng
                        </button>
                     </div>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default Cart;
