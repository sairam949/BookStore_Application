const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  username: String,
  bookId: String,
  bookName: String,
  author: String,
  price: Number,
  cover: String,
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
