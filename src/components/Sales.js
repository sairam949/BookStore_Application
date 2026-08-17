import React, { useState } from 'react';

const Sales = ({ books, setBooks, customers, sales, setSales, showLoading, hideLoading, showNotification }) => {
  const [saleForm, setSaleForm] = useState({
    customerSelect: '',
    saleDate: new Date().toISOString().split('T')[0],
    paymentMethod: ''
  });

  const [saleItems, setSaleItems] = useState([
    {
      id: 1,
      bookId: '',
      quantity: 1,
      price: 0,
      subtotal: 0
    }
  ]);

  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Mobile Payment'];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSaleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (id, field, value) => {
    setSaleItems(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'bookId') {
          const book = books.find(b => b.id === parseInt(value));
          updatedItem.price = book ? book.price : 0;
        }
        
        if (field === 'quantity' || field === 'bookId') {
          updatedItem.subtotal = updatedItem.quantity * updatedItem.price;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const addSaleItem = () => {
    const newId = Math.max(...saleItems.map(item => item.id), 0) + 1;
    setSaleItems(prev => [...prev, {
      id: newId,
      bookId: '',
      quantity: 1,
      price: 0,
      subtotal: 0
    }]);
  };

  const removeSaleItem = (id) => {
    if (saleItems.length > 1) {
      setSaleItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const calculateTotals = () => {
    const subtotal = saleItems.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validItems = saleItems.filter(item => item.bookId && item.quantity > 0);
    
    if (validItems.length === 0) {
      showNotification('Please add at least one item to the sale', 'warning');
      return;
    }

    showLoading();

    setTimeout(() => {
      // Create new sale
      const newSale = {
        id: Math.max(...sales.map(s => s.id), 0) + 1,
        date: saleForm.saleDate,
        customerId: saleForm.customerSelect || null,
        customerName: saleForm.customerSelect ? 
          customers.find(c => c.id === parseInt(saleForm.customerSelect))?.name || 'Walk-in Customer' : 
          'Walk-in Customer',
        items: validItems.map(item => {
          const book = books.find(b => b.id === parseInt(item.bookId));
          return {
            bookId: item.bookId,
            bookTitle: book?.title || 'Unknown',
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal
          };
        }),
        subtotal,
        tax,
        total,
        paymentMethod: saleForm.paymentMethod
      };

      // Update sales
      setSales(prev => [...prev, newSale]);

      // Update book stock
      validItems.forEach(item => {
        setBooks(prev => prev.map(book => {
          if (book.id === parseInt(item.bookId)) {
            return { ...book, stock: Math.max(0, book.stock - item.quantity) };
          }
          return book;
        }));
      });

      // Clear form
      clearSaleForm();
      hideLoading();
      showNotification('Sale processed successfully!', 'success');
    }, 1500);
  };

  const clearSaleForm = () => {
    setSaleForm({
      customerSelect: '',
      saleDate: new Date().toISOString().split('T')[0],
      paymentMethod: ''
    });
    setSaleItems([{
      id: 1,
      bookId: '',
      quantity: 1,
      price: 0,
      subtotal: 0
    }]);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>💰 Sales Management</h2>
      
      {/* New Sale Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Customer</label>
            <select
              name="customerSelect"
              value={saleForm.customerSelect}
              onChange={handleFormChange}
            >
              <option value="">Walk-in Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Sale Date</label>
            <input
              type="date"
              name="saleDate"
              value={saleForm.saleDate}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <select
              name="paymentMethod"
              value={saleForm.paymentMethod}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Method</option>
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sale Items */}
        <h3 style={{ margin: '25px 0 15px 0' }}>Sale Items</h3>
        {saleItems.map(item => (
          <div key={item.id} className="sale-item">
            <div className="form-grid">
              <div className="form-group">
                <label>Book</label>
                <select
                  value={item.bookId}
                  onChange={(e) => handleItemChange(item.id, 'bookId', e.target.value)}
                  required
                >
                  <option value="">Select Book</option>
                  {books.filter(book => book.stock > 0).map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} - ${book.price} (Stock: {book.stock})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={item.bookId ? books.find(b => b.id === parseInt(item.bookId))?.stock || 1 : 1}
                  value={item.quantity}
                  onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Unit Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={item.price.toFixed(2)}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Subtotal</label>
                <input
                  type="number"
                  step="0.01"
                  value={item.subtotal.toFixed(2)}
                  readOnly
                />
              </div>
            </div>
            {saleItems.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => removeSaleItem(item.id)}
                style={{ marginTop: '10px' }}
              >
                Remove Item
              </button>
            )}
          </div>
        ))}

        <button type="button" className="btn btn-info" onClick={addSaleItem}>
          Add Item
        </button>
        
        {/* Sale Summary */}
        <div className="sale-summary">
          <h3>Sale Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <strong>Tax (8%): ${tax.toFixed(2)}</strong>
            </div>
            <div>
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success">Process Sale</button>
        <button type="button" className="btn btn-warning" onClick={clearSaleForm}>Clear Sale</button>
      </form>

      {/* Sales History Table */}
      <div className="table-container">
        <h3 style={{ padding: '20px', margin: 0, background: 'var(--primary-gradient)', color: 'white' }}>
          Recent Sales
        </h3>
        <table>
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? sales.map(sale => (
              <tr key={sale.id}>
                <td>#{String(sale.id).padStart(3, '0')}</td>
                <td>{sale.date}</td>
                <td>{sale.customerName}</td>
                <td>{sale.items?.length || 0}</td>
                <td>${sale.total.toFixed(2)}</td>
                <td>{sale.paymentMethod}</td>
                <td className="table-actions">
                  <button className="btn btn-sm btn-info">View</button>
                  <button className="btn btn-sm btn-warning">Print</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  No sales recorded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;