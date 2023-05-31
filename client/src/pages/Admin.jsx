/** @format */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Admin() {
   const navigate = useNavigate();
   const [books, setBooks] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   useEffect(() => {
      const fetchAllBooks = async () => {
         try {
            const res = await axios.get('http://localhost:8888/books');
            setBooks(res.data);
         } catch (err) {
            console.log(err);
         }
      };
      fetchAllBooks();
   }, []);
   const filteredData = books.filter((item) => item.title.toLowerCase().startsWith(searchValue.toLowerCase()) || item.author.toLowerCase().startsWith(searchValue.toLowerCase()));
   const handleDelete = async (id) => {
      const check = window.confirm('Bạn muốn xóa ?');
      if (check) {
         try {
            await axios.delete(`http://localhost:8888/books/${id}`);
            window.location.reload();
         } catch (err) {
            console.log(err);
         }
      }
   };
   return (
      <div className='container'>
         <div className='list row'>
            <div className='col-md-12'>
               <div className='input-group mb-3'>
                  <input
                     type='text'
                     className='form-control'
                     placeholder='Search by name'
                     value={searchValue}
                     onChange={(e) => {
                        setSearchValue(e.target.value);
                     }}
                  />
                  <div className='input-group-append'>
                     <button className='btn btn-outline-secondary' type='button'>
                        Search
                     </button>
                  </div>
               </div>
            </div>

            <div className='col-md-12'>
               <h4>Books List</h4>
               <table className='table'>
                  <thead className='table-success'>
                     <tr>
                        <th>STT</th>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Thể loại</th>
                        <th>Ngày phát hành</th>
                        <th>Số lượng bán</th>
                        <th>Số trang</th>
                        {/* <th>Image</th> */}
                        <th>Hành động</th>
                     </tr>
                  </thead>
                  <tbody>
                     {books &&
                        filteredData.map((book, index) => (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{book.title}</td>
                              <td>{book.author}</td>
                              <td>{book.category}</td>
                              <td>{book.dateRelease}</td>
                              <td>{book.quantitySold}</td>
                              <td>{book.numberPage}</td>
                              {/* <td>{book.image}</td> */}
                              <td>
                                 <button className='btn btn-warning' onClick={() => navigate(`/admin/book/${book.id}`)}>
                                    View
                                 </button>
                                 <button
                                    className='btn btn-danger'
                                    onClick={() => {
                                       handleDelete(book.id);
                                    }}
                                 >
                                    Delete
                                 </button>
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
               <button className='btn btn-success mt-3' onClick={() => navigate('/admin/add')}>
                  New Book
               </button>
            </div>
         </div>
      </div>
   );
}
