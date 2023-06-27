const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true },
  genre: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  numberOfPages: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);



