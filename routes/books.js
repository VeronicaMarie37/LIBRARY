const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Index route - Display all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('index', { books });
  } catch (err) {
    console.error(err);
    res.redirect('/books');
  }
});

// New route - Display form to create a new book
router.get('/new', (req, res) => {
  res.render('new');
});

// Create route - Add a new book to the database
router.post('/', async (req, res) => {
  try {
    const { title, author, date, genre, numberOfPages } = req.body;
    const book = new Book({
      title,
      author,
      date,
      genre,
      numberOfPages,
    });
    await book.save();
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.redirect('/books/new');
  }
});

// Show route - Display details of a specific book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('show', { book });
  } catch (err) {
    console.error(err);
    res.redirect('/books');
  }
});

// Edit route - Display form to edit a specific book
router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('edit', { book });
  } catch (err) {
    console.error(err);
    res.redirect('/books');
  }
});

// Update route - Update a specific book in the database
router.put('/:id', async (req, res) => {
  try {
    const { title, author, date, genre, numberOfPages } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
      title,
      author,
      date,
      genre,
      numberOfPages,
    }, { new: true });

    if (!updatedBook) {
      // Book with the given ID was not found
      return res.redirect('/books');
    }

    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/books');
  }
});

// Delete route - Delete a specific book from the database
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.redirect('/books');
  }
});

// Define the root route
router.get('/', (req, res) => {
  res.redirect('/books');
});

module.exports = router;
