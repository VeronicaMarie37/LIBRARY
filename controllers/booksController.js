const Book = require('../models/bookModel');

module.exports = {
  // Render the form for creating a new book
  createForm: (req, res) => {
    res.render('create');
  },

  // Create a new book
  create: async (req, res) => {
    try {
      const { title, author, date, genre, numberOfPages } = req.body;
      const book = await Book.create({
        title,
        author,
        date,
        genre,
        numberOfPages,
      });
      res.redirect('/books');
    } catch (err) {
      console.error(err);
      res.redirect('/books');
    }
  },

  // Read all books
  index: async (req, res) => {
    try {
      const books = await Book.find();
      res.render('index', { books });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  },

  // Read a specific book
  show: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.render('show', { book });
    } catch (err) {
      console.error(err);
      res.redirect('/books');
    }
  },

  // Render the form for editing a book
  editForm: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.render('edit', { book });
    } catch (err) {
      console.error(err);
      res.redirect('/books');
    }
  },

  // Update a book
  update: async (req, res) => {
    try {
      const { title, author, date, genre, numberOfPages } = req.body;
      await Book.findByIdAndUpdate(req.params.id, {
        title,
        author,
        date,
        genre,
        numberOfPages,
      });
      res.redirect('/books/' + req.params.id);
    } catch (err) {
      console.error(err);
      res.redirect('/books');
    }
  },

  // Delete a book
  destroy: async (req, res) => {
    try {
      await Book.findByIdAndRemove(req.params.id);
      res.redirect('/books');
    } catch (err) {
      console.error(err);
      res.redirect('/books');
    }
  },
};
