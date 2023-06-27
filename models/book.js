const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: Date,
  genre: String,
  numberOfPages: Number,
});

module.exports = mongoose.model('Book', bookSchema);



