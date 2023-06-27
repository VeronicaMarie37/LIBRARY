const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController');

// GET /books - Display all books
router.get('/', bookController.index);

// GET /books/new - Display form to create a new book
router.get('/new', bookController.new);

// POST /books - Add a new book to the database
router.post('/', bookController.create);

// GET /books/:id - Display details of a specific book
router.get('/:id', bookController.show);

// GET /books/:id/edit - Display form to edit a specific book
router.get('/:id/edit', bookController.edit);

// PUT /books/:id - Update a specific book in the database
router.put('/:id', bookController.update);

// DELETE /books/:id - Delete a specific book from the database
router.delete('/:id', bookController.delete);

module.exports = router;
