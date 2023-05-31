/** @format */

import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'btl',
});

app.get('/', (req, res) => {
   res.json('hello');
});

app.get('/books', (req, res) => {
   const q = 'SELECT * FROM books ';
   db.query(q, (err, data) => {
      if (err) {
         console.log(err);
         return res.json(err);
      }
      return res.json(data);
   });
});
app.get('/books/:id', (req, res) => {
   const bookId = req.params.id;
   const q = 'SELECT * FROM books WHERE id=?';
   db.query(q, [bookId], (err, data) => {
      if (err) {
         console.log(err);
         return res.json(err);
      }
      return res.json(data);
   });
});
// create book
app.post('/books', (req, res) => {
   const {title, author, category, dateRelease, quantitySold, numberPage, image, descBook} = req.body;
   const values = [title, author, category, dateRelease, quantitySold, numberPage, image, descBook];

   const checkQuery = 'SELECT COUNT(*) AS count FROM books WHERE title = ? AND author = ?';
   db.query(checkQuery, [title, author], (err, result) => {
      if (err) return res.send(err);

      const count = result[0].count;
      if (count > 0) {
         return res.status(400).json({error: 'The book already exists in the database.'});
      }

      const insertQuery = 'INSERT INTO books(title, author, category, dateRelease, quantitySold, numberPage, image, descBook) VALUES (?)';
      db.query(insertQuery, [values], (err, data) => {
         if (err) return res.send(err);
         return res.json(data);
      });
   });
});

app.delete('/books/:id', (req, res) => {
   const bookId = req.params.id;
   const q = ' DELETE FROM books WHERE id = ? ';

   db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
   });
});

app.put('/books/:id', (req, res) => {
   const bookId = req.params.id;

   const q = 'UPDATE books SET `title`= ?, `author`= ?, `category`= ?, `dateRelease`= ? , `quantitySold`= ?, `numberPage`= ?, `image`= ? , `descBook`= ? WHERE id = ?';

   const values = [req.body.title, req.body.author, req.body.category, req.body.dateRelease, req.body.quantitySold, req.body.numberPage, req.body.image, req.body.descBook];

   db.query(q, [...values, bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
   });
});

//register
app.post('/users', (req, res) => {
   const email = req.body.email;

   const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
   db.query(checkQuery, [email], (checkErr, checkResult) => {
      if (checkErr) return res.send(checkErr);

      const count = checkResult[0].count;
      if (count > 0) {
         // Email đã tồn tại, trả về lỗi hoặc thông báo cho client
         return res.status(400).json({message: 'Email already exists'});
      } else {
         // Tiến hành chèn bản ghi mới vào cơ sở dữ liệu
         const insertQuery = 'INSERT INTO users(`name`, `email`, `password`, `phone`, `address`) VALUES (?)';

         const values = [req.body.name, email, req.body.password, req.body.phone, req.body.address];

         db.query(insertQuery, [values], (insertErr, insertResult) => {
            if (insertErr) return res.send(insertErr);

            return res.json(insertResult);
         });
      }
   });
});

//login
app.get('/users', (req, res) => {
   const q = 'SELECT * FROM users ';
   db.query(q, (err, data) => {
      if (err) {
         console.log(err);
         return res.json(err);
      }
      return res.json(data);
   });
});

// update infouser
app.put('/users/:id', (req, res) => {
   const userId = req.params.id;

   const q = 'UPDATE users SET   `name`= ?,`phone`= ? , `address`= ? WHERE id = ?';

   const values = [req.body.name, req.body.phone, req.body.address];

   db.query(q, [...values, userId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
   });
});
//feedback
app.post('/feedbacks', (req, res) => {
   const q = 'INSERT INTO feedbacks(`nameUser`, `idBook`, `starRate`,`comment`) VALUES (?)';

   const values = [req.body.nameUser, req.body.idBook, req.body.starRate, req.body.comment];

   db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
   });
});
app.get('/feedbacks/:idBook', (req, res) => {
   const idBook = req.params.idBook;
   const q = 'SELECT * FROM feedbacks WHERE idBook=?';
   db.query(q, [idBook], (err, data) => {
      if (err) {
         console.log(err);
         return res.json(err);
      }
      return res.json(data);
   });
});
//buy
app.post('/buys', (req, res) => {
   const q = 'INSERT INTO buys(`idUser`, `idP`,`title`, `author`,`category`,`quantity`,`status`) VALUES (?)';

   const values = [req.body.idUser, req.body.idP, req.body.title, req.body.author, req.body.category, req.body.quantity, req.body.status];

   db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
   });
});
//get all
app.get('/buys', (req, res) => {
   const UserId = req.params.idUser;
   const q = 'SELECT * FROM buys ';
   db.query(q, (err, data) => {
      if (err) {
         console.log(err);
         return res.json(err);
      }
      return res.json(data);
   });
});
// get by id
app.get('/buys/:idUser', (req, res) => {
   const UserId = req.params.idUser;
   const q = 'SELECT * FROM buys WHERE idUser=?';
   db.query(q, [UserId], (err, data) => {
      if (err) {
         console.log(err);
         return res.json(err);
      }
      return res.json(data);
   });
});
app.delete('/buys/:id', (req, res) => {
   const id = req.params.id;
   const q = 'DELETE  FROM buys WHERE id=?';
   db.query(q, [id], (err, data) => {
      if (err) {
         console.log(err);
         return res.json(err);
      }
      return res.json(data);
   });
});
//update
app.put('/buys/:id', (req, res) => {
   const id = req.params.id;

   const q = 'UPDATE buys SET   `status`= ? WHERE id = ?';

   const values = [req.body.status];

   db.query(q, [...values, id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
   });
});

app.listen(8888, () => {
   console.log('Connected to backend.');
});
