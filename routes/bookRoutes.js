const express = require('express');
const router = express.Router();
const books = require('../models/book');

// Adicionar Livro
router.post('/books', (req, res) => { 
  const { title, author, year, isbn } = req.body;  // parametros para cadastrar o livro
  const book = { title, author, year, isbn }; // cada livro vai ter titulo, author, ano, isbn
  books.push(book);
  res.status(201).send(book);
});

// Remover Livro
router.delete('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  books = books.filter(book => book.isbn !== isbn);
  res.status(200).send({ message: 'Livro removido' });
});

// Listar Livros
router.get('/books', (req, res) => {
  res.status(200).send(books);
});

// Buscar Livro por Título
router.get('/books/search', (req, res) => {
  const { title } = req.query;
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  res.status(200).send(filteredBooks);
});

module.exports = router; // exporta a rota da api

// get http://localhost:3000/api/books

// post http://localhost:3000/api/books
// {"title": "Senai", "author": "Daniel", "year": 2024, "isbn": "6030"}