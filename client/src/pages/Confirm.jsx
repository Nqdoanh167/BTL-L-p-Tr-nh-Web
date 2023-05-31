/** @format */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Buffer} from 'buffer';
export default function Confirm() {
   const [buys, setBuys] = useState([]);
   useEffect(() => {
      const fetchAllBooks = async () => {
         try {
            const res = await axios.get('http://localhost:8888/buys');
            setBuys(res.data);
         } catch (err) {
            console.log(err);
         }
      };
      fetchAllBooks();
   }, []);
   const handleConfirm = async (book) => {
      book.status = 1;
      let check = window.confirm('Xác nhận ? ');
      if (check) {
         try {
            await axios.put(`http://localhost:8888/buys/${book.id}`, book);
            window.location.reload();
         } catch (error) {
            console.log(error);
         }
      }
   };
   const handleRemove = async (book) => {
      book.status = 2;
      let check = window.confirm('Bạn muốn hủy ? ');
      if (check) {
         try {
            await axios.put(`http://localhost:8888/buys/${book.id}`, book);
            window.location.reload();
         } catch (error) {
            console.log(error);
         }
      }
   };
   return (
      <div className='container'>
         <div className='list row'>
            <div className='col-md-12'>
               <h4>Danh sách sản phẩm cần xử lý</h4>
               <table className='table'>
                  <thead className='table-success'>
                     <tr>
                        <th>STT</th>

                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Thể loại</th>

                        <th>Số lượng</th>

                        <th>Hành động</th>
                     </tr>
                  </thead>
                  <tbody>
                     {buys &&
                        buys.map((book, index) => (
                           <tr key={index}>
                              <td>{index + 1}</td>

                              <td>{book.title}</td>
                              <td>{book.author}</td>
                              <td>{book.category}</td>

                              <td>{book.quantity}</td>

                              {book.status === 0 ? (
                                 <td>
                                    <button className='btn btn-success' onClick={() => handleConfirm(book)}>
                                       Xác nhận
                                    </button>
                                    <button className='btn btn-danger' onClick={() => handleRemove(book)}>
                                       Hủy
                                    </button>
                                 </td>
                              ) : book.status === 1 ? (
                                 <td>Thành công</td>
                              ) : (
                                 <td>Đã hủy</td>
                              )}
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
