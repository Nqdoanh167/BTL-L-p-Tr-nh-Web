/** @format */

import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';

export default function Register() {
   const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      passwordConfirm: '',
   });

   const navigate = useNavigate();
   const handleOnchange = (e) => {
      setUser((prev) => ({...prev, [e.target.name]: e.target.value}));
   };
   const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (user.name === '') alert('Vui lòng nhập họ tên');
      else if (user.email === '') alert('Vui lòng nhập email');
      else if (user.password === '') alert('Vui lòng nhập mật khẩu');
      else if (user.passwordConfirm === '') alert('Vui lòng nhập lại mật khẩu');
      else if (user.password !== user.passwordConfirm) alert('Nhập lại mật khẩu không chính xác');
      else {
         try {
            await axios.post('http://localhost:8888/users', user);
            navigate('/login');
         } catch (err) {
            alert('Email đã tồn tại');
            setLoading(false);
         }
      }
   };
   const [loading, setLoading] = useState(false);
   return (
      <>
         <div className='Register'>
            <div className='form-register '>
               <h1>ĐĂNG KÝ</h1>
               <div className='form-group'>
                  <input type='text' className='form-control' placeholder='Họ và tên' onChange={handleOnchange} name='name' />
               </div>
               <div className='form-group'>
                  <input type='email' className='form-control' placeholder='E-mail' onChange={handleOnchange} name='email' />
               </div>
               <div className='form-group'>
                  <input type='password' className='form-control' placeholder='Mật khẩu' onChange={handleOnchange} name='password' />
               </div>
               <div className='form-group'>
                  <input type='password' className='form-control' placeholder='Xác nhận mật khẩu' onChange={handleOnchange} name='passwordConfirm' />
               </div>

               <div className='remember-forget'>
                  <input type='checkbox' name='' id='' />
                  <span>Bằng cách đăng ký, bạn đồng ý với các điều khoản và điều kiện của chúng tôi.</span>
               </div>

               <button type='submit' className='btn-submit' onClick={handleRegister}>
                  Đăng ký
                  {loading && <FadeLoader color='#36d7b7' height={7} margin={-10} radius={-4} width={2} className='load' style={{position: 'relative', top: '17px', left: '34px'}} />}
               </button>

               <div className='login-with'>
                  <span>Or Join With</span>
               </div>
               <div className='col-12 social-login'>
                  <i className='fab fa-google-plus-g google'></i>
                  <i className='fab fa-facebook-f facebook'></i>
               </div>
               <div className='text-center'>
                  <p>Bạn đã có tài khoản</p>
                  <span
                     onClick={() => {
                        navigate('/login');
                     }}
                  >
                     Đăng nhập
                  </span>
               </div>
            </div>
         </div>
      </>
   );
}
