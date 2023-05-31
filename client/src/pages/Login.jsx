/** @format */

import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
export default function Login({setAdminNav, setLogout}) {
   const [user, setUser] = useState({
      id: undefined,
      name: undefined,
      email: undefined,
      password: undefined,
   });
   const handleOnchange = (e) => {
      setUser((prev) => ({...prev, [e.target.name]: e.target.value}));
   };
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);
   const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const res = await axios.get('http://localhost:8888/users');
         var findUser = res.data.find((item) => item.email === user.email && item.password === user.password);
         if (findUser) {
            delete findUser.password;
            localStorage.setItem('user', JSON.stringify(findUser));
            navigate('/');
            window.location.reload();
         } else if (res.data.find((item) => item.email === user.email && item.password !== user.password)) {
            alert('Sai mật khẩu');
            setLoading(false);
         } else if (res.data.find((item) => item.email !== user.email)) {
            alert('Tài khoản không tồn tại');
            setLoading(false);
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className='Login'>
         <div className='form '>
            <h1>ĐĂNG NHẬP</h1>
            <div className='form-group'>
               <input type='text' className='form-control' placeholder='E-mail' name='email' onChange={handleOnchange} />
            </div>
            <div className='form-group'>
               <input type='password' className='form-control' placeholder='Mật khẩu' name='password' onChange={handleOnchange} />
               {/* {errMessage && <span style={{color: 'red', float: 'left'}}>{errMessage}</span>} */}
            </div>
            <div className='remember-forget'>
               <div className='remember'>
                  <input type='checkbox' name='' id='' />
                  <span>Nhớ tôi</span>
               </div>
               <div className='forget'>
                  <a href='/'>Quên mật khẩu?</a>
               </div>
            </div>

            <button type='submit' className='btn-submit' onClick={handleLogin}>
               Đăng nhập
               {loading && <FadeLoader color='#36d7b7' height={7} margin={-10} radius={-4} width={2} className='load' style={{position: 'relative', top: '17px', left: '34px'}} />}
            </button>

            <div className='login-with'>
               <span>Or Login With</span>
            </div>
            <div className='col-12 social-login'>
               <i className='fab fa-google-plus-g google'></i>
               <i className='fab fa-facebook-f facebook'></i>
            </div>
            <div className='text-center'>
               <p>Không có tài khoản</p>
               <span
                  onClick={() => {
                     navigate('/register');
                  }}
               >
                  Đăng ký ngay
               </span>
            </div>
         </div>
      </div>
   );
}
