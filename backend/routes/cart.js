const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { username, bookId, bookName, author, price, cover } = req.body;

    // Validate required fields
    if (!username || !bookId || !bookName || !author || !price) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    let item = await Cart.findOne({ username, bookId });

    if (item) {
      item.quantity = (item.quantity || 1) + 1;
      await item.save();
    } else {
      item = new Cart({
        username,
        bookId,
        bookName,
        author,
        price,
        cover,
        quantity: 1
      });
      await item.save();
    }

    res.status(200).json({ success: true, message: 'Added to cart', item });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get cart items by username
router.get('/', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    const items = await Cart.find({ username });
    res.status(200).json({ success: true, items });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Clear cart for a user
router.delete('/clear/:username', async (req, res) => {
  try {
    const result = await Cart.deleteMany({ username: req.params.username });
    res.status(200).json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
