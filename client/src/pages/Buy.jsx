/** @format */

import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function Buy() {
   const navigate = useNavigate();
   const handleClick = (item) => {
      navigate(`/book/${item.idP}`);
   };
   const user = localStorage.hasOwnProperty('user') ? JSON.parse(localStorage.getItem('user')) : [];
   const [book, setBook] = useState([]);
   useEffect(() => {
      const fetchBookByID = async () => {
         try {
            const res = await axios.get(`http://localhost:8888/buys/${user.id}`);
            setBook(res.data);
         } catch (err) {
            console.log(err);
         }
      };
      fetchBookByID();
   }, []);

   const handleRemove = async (item) => {
      let check = window.confirm('Bạn muốn hủy mua? ');

      if (check) {
         try {
            await axios.delete(`http://localhost:8888/buys/${item.id}`);
            window.location.reload();
         } catch (err) {
            console.log(err);
         }
      }
   };
   const [value, setValue] = useState(0);
   return (
      <div className='container'>
         <div className='list row'>
            <div className='col-md-12'>
               <h1 style={{marginBottom: '50px', textAlign: 'center'}}>Danh sách sản phẩm đặt mua </h1>
               <div className='nav-buy'>
                  <span onClick={() => setValue(0)}>Đang chờ xử lý/</span>
                  <span onClick={() => setValue(1)}>Thành công/</span>
                  <span onClick={() => setValue(2)}>Đã bị hủy</span>
               </div>
               <table className='table'>
                  <thead className='table-success'>
                     <tr>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Loại</th>

                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                     </tr>
                  </thead>
                  <tbody>
                     {book &&
                        book.length > 0 &&
                        book.map((item, index) => {
                           return (
                              item.status === value && (
                                 <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.category}</td>

                                    <td>{item.quantity}</td>
                                    <td>{item.status === 0 ? 'Đang chờ xử lý' : item.status === 1 ? 'Thành công' : 'Đã bị hủy'}</td>

                                    <td>
                                       <button className='btn btn-success' onClick={() => handleClick(item)}>
                                          Xem chi tiet
                                       </button>
                                       {item.status === 0 && (
                                          <button className='btn btn-danger' onClick={() => handleRemove(item)}>
                                             Hủy mua
                                          </button>
                                       )}
                                    </td>
                                 </tr>
                              )
                           );
                        })}
                  </tbody>
               </table>
            </div>
            {/* <div className='col-md-12'>
               <h1 style={{marginBottom: '50px', textAlign: 'center', marginTop: '100px'}}>Danh sách sản phẩm đã mua</h1>
               <table className='table'>
                  <thead className='table-success'>
                     <tr>
                        <th>STT</th>

                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Loại</th>

                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                     </tr>
                  </thead>
                  <tbody>
                     {book &&
                        book.length > 0 &&
                        book.map((item, index) => {
                           return (
                              item.status === 1 && (
                                 <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.category}</td>

                                    <td>{item.quantity}</td>
                                    <td>Thành công</td>

                                    <td>
                                       <button className='btn btn-success' onClick={() => handleClick(item)}>
                                          Xem chi tiet
                                       </button>
                                    </td>
                                 </tr>
                              )
                           );
                        })}
                  </tbody>
               </table>
            </div>
            <div className='col-md-12'>
               <h1 style={{marginBottom: '50px', textAlign: 'center', marginTop: '100px'}}>Danh sách sản phẩm đã bị hủy</h1>
               <table className='table'>
                  <thead className='table-success'>
                     <tr>
                        <th>STT</th>

                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Loại</th>

                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                     </tr>
                  </thead>
                  <tbody>
                     {book &&
                        book.length > 0 &&
                        book.map((item, index) => {
                           return (
                              item.status === 2 && (
                                 <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.category}</td>

                                    <td>{item.quantity}</td>
                                    <td>Đã bị hủy</td>

                                    <td>
                                       <button className='btn btn-success' onClick={() => handleClick(item)}>
                                          Xem chi tiet
                                       </button>
                                    </td>
                                 </tr>
                              )
                           );
                        })}
                  </tbody>
               </table>
            </div> */}
         </div>
      </div>
   );
}
