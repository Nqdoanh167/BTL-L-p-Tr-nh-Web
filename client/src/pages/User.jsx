/** @format */

import {useNavigate} from 'react-router-dom';
import '../style.scss';
import {AccountCircle} from '@mui/icons-material';
import {useState} from 'react';
import axios from 'axios';
export default function User({setLogout}) {
   const navigate = useNavigate();
   const user = localStorage.hasOwnProperty('user') ? JSON.parse(localStorage.getItem('user')) : [];

   const [name, setName] = useState(user.name);
   const [phone, setPhone] = useState(user.phone);
   const [address, setAddress] = useState(user.address);
   user.name = name;
   user.phone = phone;
   user.address = address;

   const handleUpdate = async () => {
      const check = window.confirm('Xác nhận');
      if (check) {
         setOpen(!open);
         try {
            await axios.put(`http://localhost:8888/users/${user.id}`, user);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload();
         } catch (error) {
            console.log(error);
         }
      }
   };
   const [open, setOpen] = useState(false);
   const handleEdit = () => {
      setOpen(!open);
   };
   return (
      <div className='wrapUser'>
         <div className='grid wide'>
            <div className='row '>
               <div className='left-bar col-md-3'>
                  <div className='left-bar-wrap'>
                     <div className='user-wrap'>
                        <AccountCircle className='user-icon' />

                        <div className='user-name'>{user.name}</div>
                        <button
                           className='user-btn'
                           onClick={() => {
                              setLogout(true);
                              localStorage.clear();
                              navigate('/login');
                              window.scrollTo(0, 0);
                           }}
                        >
                           Đăng xuất
                        </button>
                     </div>
                     <ul>
                        <li onClick={() => navigate('/buy')}>Đơn hàng của tôi</li>
                        <li>Đổi mật khẩu</li>
                     </ul>
                  </div>
               </div>
               <div className='right-bar col-md-9'>
                  <div className='right-bar-wrap'>
                     <h3>Thông tin cá nhân</h3>
                     <hr />
                     <ul>
                        <li>Họ và tên: {user.name}</li>
                        <li>Địa chỉ Email: {user.email}</li>
                        <li>Số điện thoại: {user.phone}</li>
                        <li>Địa chỉ: {user.address}</li>
                     </ul>
                     <button className='user-edit' onClick={handleEdit}>
                        Sửa thông tin cá nhân
                     </button>
                     {open && (
                        <div className='modal '>
                           <div className='modal__container' style={{borderRadius: '10px'}}>
                              <h3>Thông tin khách hàng</h3>
                              <form>
                                 <div className='form-group'>
                                    <label htmlFor='name'>Họ và tên:</label>
                                    <input type='text' className='form-control' name='name' placeholder='Nhập họ và tên' value={name} onChange={(e) => setName(e.target.value)} />
                                 </div>

                                 <div className='form-group'>
                                    <label htmlFor='phone'>Số điện thoại:</label>
                                    <input type='tel' className='form-control' name='phone' placeholder='Nhập số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                 </div>

                                 <div className='form-group'>
                                    <label htmlFor='address'>Địa chỉ :</label>
                                    <textarea className='form-control' name='address' rows='3' placeholder='Nhập địa chỉ ' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                 </div>
                                 <button className='btn btn-success' onClick={handleUpdate} style={{marginTop: '5px'}}>
                                    UpDate
                                 </button>
                              </form>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
