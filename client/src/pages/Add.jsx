/** @format */

import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FileToBase64 from '../utils/FileToBase64';
export default function Add() {
   const [book, setBook] = useState({
      title: '',
      author: '',
      category: '',
      dateRelease: '',
      quantitySold: '',
      numberPage: '',
      image: '',
      descBook: '',
   });

   const navigate = useNavigate();

   const handleOnchange = (e) => {
      setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
   };

   const handleOnchangeImage = async (e) => {
      let file = e.target.files[0];
      if (file) {
         const base64 = await FileToBase64(file);
         let b = {...book};
         b.image = base64;
         setBook(b);
      }
   };
   const handleClick = async (e) => {
      e.preventDefault();

      if (book.title === '') alert('Nhập tiêu đề');
      else if (book.author === '') alert('Nhập tên tác giả');
      else if (book.dateRelease === '') alert('Nhập ngày phát hành');
      else {
         const check = window.confirm('Xác nhận');
         if (check) {
            try {
               await axios.post('http://localhost:8888/books', book);
               navigate('/admin');
            } catch (err) {
               alert('Sách đã có trong CSDL');
            }
         }
      }
   };

   return (
      <div>
         <h3 style={{textAlign: 'center'}}>Sách</h3>
         <div className='row'>
            <div className='col-md-6'>
               <div className='row'>
                  <div className='form-row' style={{display: 'flex'}}>
                     <div className='form-group col-md-6' style={{paddingRight: '10px'}}>
                        <label htmlFor='title'>Tiêu đề</label>
                        <input type='text' className='form-control' name='title' placeholder='Tiêu đề' value={book.title} required onChange={handleOnchange} />
                     </div>
                     <div className='form-group col-md-6'>
                        <label htmlFor='author'>Tác giả</label>
                        <input type='text' className='form-control' name='author' placeholder='Tác giả' value={book.author} required onChange={handleOnchange} />
                     </div>
                  </div>
                  <div className='form-row'>
                     <div className='form-group col-md-12'>
                        <label htmlFor='descBook'>Mô tả về sách</label>
                        <textarea name='descBook' rows='4' cols='88' className='form-control' value={book.descBook} onChange={handleOnchange} style={{padding: '10px'}}></textarea>
                     </div>
                  </div>
                  <div className='form-row' style={{display: 'flex'}}>
                     <div className='form-group col-md-6' style={{paddingRight: '10px'}}>
                        <label>Ngày phát hành</label>
                        <input type='date' className='form-control' name='dateRelease' value={book.dateRelease} required onChange={handleOnchange} />
                     </div>
                     <div className='form-group col-md-6'>
                        <label>Số trang</label>
                        <input type='text' className='form-control' name='numberPage' placeholder='Số trang' value={book.numberPage} required onChange={handleOnchange} />
                     </div>
                  </div>
                  <div className='form-row' style={{display: 'flex'}}>
                     <div className='form-group col-md-6' style={{paddingRight: '10px'}}>
                        <label htmlFor='category'>Category</label>
                        <select name='category' id='' className='form-control' value={book.category} onChange={handleOnchange}>
                           <option value=''></option>
                           <option value='Văn học'>Văn học</option>
                           <option value='Toán học'>Toán học </option>
                           <option value='Khoa học'>Khoa học</option>
                        </select>
                        <i className='fa-sharp fa-solid fa-caret-down' style={{position: 'relative', left: '285px', top: '-31px', fontSize: '19px'}}></i>
                     </div>
                     <div className='form-group col-md-6'>
                        <label>Số lượng bán</label>
                        <input type='text' className='form-control' name='quantitySold' placeholder='Số lượng bán' value={book.quantitySold} required onChange={handleOnchange} />
                     </div>
                  </div>
               </div>
            </div>
            <div className='col-md-6'>
               <div className='row'>
                  <div className='col-md-6 ' style={{textAlign: 'center', marginLeft: 200}}>
                     <div>
                        <input
                           type='file'
                           className='form-control'
                           name='image'
                           id='image'
                           hidden
                           onChange={(e) => {
                              handleOnchangeImage(e);
                           }}
                        />
                        <label htmlFor='image'>Upload file</label>
                        {book.image && <img src={book.image} alt='anh' width='200' height='300' style={{objectFit: 'cover'}} />}
                     </div>
                  </div>
               </div>
            </div>
            <div className='form-group '>
               <button className='btn btn-primary' onClick={handleClick} style={{float: 'right'}}>
                  Add Book
               </button>
            </div>
         </div>
      </div>
   );
}
