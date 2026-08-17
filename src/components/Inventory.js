import React, { useState } from 'react';

const Inventory = ({ books, setBooks, showLoading, hideLoading, showNotification, showModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Fiction',
    price: '',
    stock: '',
    location: '',
    supplier: 'Penguin Books',
    description: ''
  });

  const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Biography', 'Children', 'Educational'];
  const suppliers = ['Penguin Books', 'HarperCollins', 'Random House', 'Macmillan', 'Local Supplier'];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading();

    setTimeout(() => {
      if (editingBook) {
        // Update existing book
        setBooks(prev => prev.map(book =>
          book.id === editingBook.id
            ? { ...book, ...bookForm, price: parseFloat(bookForm.price), stock: parseInt(bookForm.stock) }
            : book
        ));
        showNotification('Book updated successfully!', 'success');
        setEditingBook(null);
      } else {
        // Add new book
        const newBook = {
          id: Math.max(...books.map(b => b.id), 0) + 1,
          ...bookForm,
          price: parseFloat(bookForm.price),
          stock: parseInt(bookForm.stock)
        };
        setBooks(prev => [...prev, newBook]);
        showNotification('Book added successfully!', 'success');
      }

      clearForm();
      hideLoading();
    }, 1000);
  };

  const clearForm = () => {
    setBookForm({
      title: '',
      author: '',
      isbn: '',
      category: 'Fiction',
      price: '',
      stock: '',
      location: '',
      supplier: 'Penguin Books',
      description: ''
    });
    setEditingBook(null);
  };

  const editBook = (book) => {
    setBookForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      price: book.price.toString(),
      stock: book.stock.toString(),
      location: book.location,
      supplier: book.supplier,
      description: book.description || ''
    });
    setEditingBook(book);
    showNotification('Book loaded for editing', 'info');
  };

  const deleteBook = (id) => {
    showModal('Delete Book', 'Are you sure you want to delete this book?', () => {
      setBooks(prev => prev.filter(book => book.id !== id));
      showNotification('Book deleted successfully!', 'success');
    });
  };

  const viewBook = (book) => {
    showModal('Book Details', 
      `Title: ${book.title}\nAuthor: ${book.author}\nISBN: ${book.isbn}\nPrice: $${book.price}\nStock: ${book.stock}\nLocation: ${book.location}`
    );
  };

  const getStockStatus = (stock) => {
    if (stock > 20) return { class: 'high', text: 'In Stock' };
    if (stock > 5) return { class: 'medium', text: 'Low Stock' };
    return { class: 'low', text: 'Very Low' };
  };

  return (
    <div>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>📖 Inventory Management</h2>
      
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search books by title, author, or ISBN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Add/Edit Book Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Book Title *</label>
            <input
              type="text"
              name="title"
              value={bookForm.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              value={bookForm.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>ISBN</label>
            <input
              type="text"
              name="isbn"
              value={bookForm.isbn}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={bookForm.category}
              onChange={handleInputChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={bookForm.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              min="0"
              value={bookForm.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Supplier</label>
            <select
              name="supplier"
              value={bookForm.supplier}
              onChange={handleInputChange}
            >
              {suppliers.map(supplier => (
                <option key={supplier} value={supplier}>{supplier}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Shelf Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g., A1-B2"
              value={bookForm.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Book description..."
              value={bookForm.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Update Book' : 'Add Book to Inventory'}
        </button>
        <button type="button" className="btn btn-warning" onClick={clearForm}>
          Clear Form
        </button>
      </form>

      {/* Books Grid Display */}
      <div className="card-grid">
        {filteredBooks.map(book => {
          const stockStatus = getStockStatus(book.stock);
          return (
            <div key={book.id} className="book-card">
              <div className="book-title">{book.title}</div>
              <div className="book-author">by {book.author}</div>
              <div className="book-price">${book.price}</div>
              <div style={{ margin: '10px 0' }}>
                <span className={`stock-badge stock-${stockStatus.class}`}>
                  {stockStatus.text} ({book.stock})
                </span>
              </div>
              <div className="table-actions" style={{ marginTop: '15px' }}>
                <button className="btn btn-sm btn-info" onClick={() => viewBook(book)}>
                  View
                </button>
                <button className="btn btn-sm btn-warning" onClick={() => editBook(book)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inventory Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => {
              const stockStatus = getStockStatus(book.stock);
              return (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.category}</td>
                  <td>${book.price}</td>
                  <td>{book.stock}</td>
                  <td>
                    <span className={`stock-badge stock-${stockStatus.class}`}>
                      {stockStatus.text}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button className="btn btn-sm btn-info" onClick={() => viewBook(book)}>
                      View
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={() => editBook(book)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteBook(book.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;