const express = require('express');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { username, deliveryDetails } = req.body;

    const cartItems = await Cart.find({ username });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderNumber = Math.floor(Math.random() * 1000000);

    const order = new Order({
      username,
      orderNumber,
      items: cartItems,
      total: total * 1.05,
      deliveryDetails,
      paymentMethod: 'COD',
      status: 'Pending Confirmation'
    });

    await order.save();
    res.json({ success: true, orderNumber, message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { username } = req.query;
    const orders = await Order.find({ username }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

