const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  username: String,
  orderNumber: Number,
  items: Array,
  total: Number,
  deliveryDetails: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  paymentMethod: { type: String, default: 'COD' },
  status: { type: String, default: 'Pending Confirmation' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
