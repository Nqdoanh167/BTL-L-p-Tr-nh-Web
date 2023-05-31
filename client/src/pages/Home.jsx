/** @format */

import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios';
import {Buffer} from 'buffer';
import {useNavigate} from 'react-router-dom';

export default function Home() {
   const [books, setBooks] = useState([]);
   useEffect(() => {
      const fetchAllBooks = async () => {
         try {
            const res = await axios.get('http://localhost:8888/books');
            let books = res.data;
            for (const book of books) {
               if (book.image) {
                  let imageBase64 = Buffer(book.image, 'base64').toString('binary');
                  book.image = imageBase64;
               }
            }
            setBooks(books);
         } catch (err) {
            console.log(err);
         }
      };
      fetchAllBooks();
   }, []);
   const navigate = useNavigate();
   const handleClick = async (book) => {
      navigate(`book/${book.id}`);
   };
   return (
      <div className='home'>
         <h1>Book Shop</h1>
         <div className='books'>
            {books.map((book) => (
               <div key={book.id} className='book'>
                  <img src={book.image} alt='' onClick={() => handleClick(book)} />
                  <h4>{book.title}</h4>
                  <span>{book.author}</span>
               </div>
            ))}
         </div>
      </div>
   );
}
