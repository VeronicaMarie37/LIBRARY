const Book = require('../models/book');

module.exports = {
  new: newBook,
  index,
  create,
  delete: deleteBook,
  update,
  edit,
  show
};

function newBook(req, res) {
  res.render('books/new', { errorMsg: '' });
}

async function index(req, res) {
  try {
    const allBooks = await Book.find({});
    res.render('books/index', {
      books: allBooks
    });
  } catch (err) {
    console.error(err);
    res.render('books', { errorMsg: err.message });
  }
}

async function create(req, res) {
  try {
    await Book.create(req.body);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.render('books/new', { errorMsg: err.message });
  }
}

async function deleteBook(req, res) {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.render('books', { errorMsg: err.message });
  }
}

async function update(req, res) {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/books`);
  } catch (err) {
    console.error(err);
    res.render(`books/${req.params.id}/edit`, { errorMsg: err.message });
  }
}

async function edit(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    res.render('books/edit', { book });
  } catch (err) {
    console.error(err);
    res.render('books', { errorMsg: err.message });
  }
}

async function show(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    res.render('books/show', { book });
  } catch (err) {
    console.error(err);
    res.render('books', { errorMsg: err.message });
  }
}
