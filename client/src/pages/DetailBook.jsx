/** @format */

import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Buffer} from 'buffer';
import axios from 'axios';
import {Rating} from '@mui/material';
const DetailBook = ({logout}) => {
   const user = localStorage.hasOwnProperty('user') ? JSON.parse(localStorage.getItem('user')) : [];
   const [book, setBook] = useState([]);
   const location = useLocation();
   const bookId = location.pathname.split('/')[2];
   const navigate = useNavigate();
   useEffect(() => {
      const fetchBookByID = async () => {
         try {
            const res = await axios.get(`http://localhost:8888/books/${bookId}`);
            let book = res.data[0];
            if (book.image) {
               let imageBase64 = Buffer(book.image, 'base64').toString('binary');
               book.image = imageBase64;
            }
            setBook(book);
         } catch (err) {
            console.log(err);
         }
      };
      fetchBookByID();
   }, [bookId]);

   //quantity
   const [value, setValue] = useState(1);
   const handleClickPlus = (book) => {
      setValue(value < book.quantitySold ? value + 1 : book.quantitySold);
   };
   const handleClickMinus = () => {
      setValue(value > 1 ? value - 1 : 1);
   };
   const handleonChangeQuantity = (e) => {
      setValue(e.target.value);
   };
   book.quantity = value;
   const handleAdd = (book) => {
      logout ? navigate('/login') : addToCart(book);
   };
   //feedback
   const [feedBack, setFeedBack] = useState({
      nameUser: '',
      idBook: '',
      starRate: '',
      comment: '',
   });
   const [comment, setComment] = useState('');
   const [star, setStar] = useState(0);
   const handleOnchangeComment = (e) => {
      setComment(e.target.value);
      setFeedBack((prev) => ({...prev, [e.target.name]: e.target.value}));
   };
   feedBack.nameUser = user && user.name;
   feedBack.starRate = star;
   feedBack.idBook = bookId;
   const handelSubmitFeedback = async () => {
      if (star === 0 && comment === '') alert('Bạn chưa nhận xét!');
      else {
         try {
            await axios.post('http://localhost:8888/feedbacks', feedBack);
            window.location.reload();
         } catch (err) {
            console.log(err);
         }
      }
   };
   const [feedbacks, setFeedBacks] = useState();
   useEffect(() => {
      const fetchFeedBack = async () => {
         try {
            const res = await axios.get(`http://localhost:8888/feedbacks/${bookId}`);
            setFeedBacks(res.data);
         } catch (err) {
            console.log(err);
         }
      };
      fetchFeedBack();
   }, [bookId]);
   //cart
   function checkInCart(book, cart) {
      var i;
      for (i = 0; i < cart.length; i++) {
         if (cart[i].id === book.id) {
            return true;
         }
      }
      return false;
   }
   const addToCart = (book) => {
      var cart = localStorage.hasOwnProperty('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      var newCart = [];
      if (checkInCart(book, cart)) {
         cart.forEach((item, index) => {
            if (item.id === book.id) {
               newCart.push({
                  ...item,
                  quantity: item.quantity + value,
               });
            } else {
               newCart.push(item);
            }
         });
      } else {
         cart.push({
            ...book,
            quantity: value,
         });
         newCart = cart;
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      window.location.reload();
   };

   book.idUser = user && user.id;
   book.status = 0;
   book.idP = bookId;
   const handleBuyBook = async (book) => {
      if (!logout) {
         try {
            await axios.post('http://localhost:8888/buys', book);
            navigate('/buy');
         } catch (err) {
            console.log(err);
         }
      } else navigate('/login');
   };

   return (
      <div className='container'>
         <h1 style={{textAlign: 'center', marginBottom: '20px'}}>Chi tiết sản phẩm</h1>
         <div className='row item-book'>
            {book && (
               <>
                  <div className='col-md-3'>
                     <img src={book.image} alt='' style={{height: '300px', width: '200px', objectFit: 'cover'}} />
                  </div>
                  <div className='col-md-6 ' style={{textAlign: 'left'}}>
                     <h5 className='card-title'>{book.title}</h5>
                     <p className='card-text'>{book.des}</p>
                     <p>Thể loại: {book.category}</p>
                     <p>Tác giả: {book.author}</p>
                     <p>Ngày phát hành: {book.dateRelease}</p>
                     <p>Số trang: {book.numberPage}</p>
                     <div className='count'>
                        <span>Số lượng: </span>
                        <button className='minus' onClick={handleClickMinus}>
                           -
                        </button>
                        <input type='text' onChange={(e) => handleonChangeQuantity(e)} />
                        {value}
                        <button className='plus' onClick={() => handleClickPlus(book)}>
                           +
                        </button>
                        <span className='remaining' style={{fontSize: '13px', marginLeft: '20px'}}>
                           Còn: {book.quantitySold}
                        </span>
                     </div>

                     <button onClick={() => handleBuyBook(book)} className='btn btn-success' style={{marginRight: '10px'}}>
                        Mua ngay
                     </button>
                     <button onClick={() => handleAdd(book)} className='btn btn-success'>
                        Thêm vào giỏ
                     </button>
                  </div>
                  <div className='desc' style={{marginTop: '20px', width: '600px'}}>
                     <h3>Mô tả</h3>
                     <span>{book.descBook}</span>
                  </div>
               </>
            )}
         </div>

         <div className='feedback jumbotron row mt-5'>
            <div className='col' style={{textAlign: 'left'}}>
               <h2>Nhận xét từ khách hàng</h2>
               {feedbacks &&
                  feedbacks.map((item) => (
                     <div className='fb-item card' key={item.id}>
                        <p>Độc giả: {item.nameUser}</p>
                        <p>
                           Đánh giá:
                           <Rating name='customized-10' value={item.starRate} style={{position: 'relative', top: '5px'}} />
                        </p>

                        <p>Nhận xét: {item.comment ? item.comment : ''}</p>
                     </div>
                  ))}
            </div>
            {!logout ? (
               <div className='col' style={{marginLeft: '200px', textAlign: 'center'}}>
                  <h3>Nhận xét của bạn về sách</h3>
                  <div className='evaluate'>
                     <span>Đánh giá: </span>
                     <Rating name='customized-10' defaultValue={0} max={5} onClick={(e) => setStar(e.target.value)} style={{position: 'relative', top: '5px'}} />
                  </div>
                  <span>Nhận xét:</span>
                  <div>
                     <textarea name='comment' value={comment} onChange={handleOnchangeComment} style={{padding: '10px'}}></textarea>
                  </div>
                  <button className='btn btn-success' onClick={handelSubmitFeedback}>
                     Đăng
                  </button>
               </div>
            ) : (
               <div className='user-feedback col' style={{marginLeft: '200px', textAlign: 'center'}}>
                  <p>Đăng nhập để gửi nhận xét của Bạn</p>
                  <button
                     className='btn btn-success'
                     onClick={() => {
                        navigate('/login');
                     }}
                  >
                     Đăng nhập
                  </button>
                  <p>
                     Bạn chưa có tài khoản? Hãy <a href='/register'>Đăng ký</a>
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};

export default DetailBook;
