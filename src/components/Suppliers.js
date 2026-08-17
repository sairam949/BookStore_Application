import React, { useState } from 'react';

const Suppliers = ({ suppliers, setSuppliers, showLoading, hideLoading, showNotification, showModal }) => {
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [supplierForm, setSupplierForm] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    rating: '5',
    terms: 'Net 30',
    address: '',
    notes: ''
  });

  const paymentTerms = ['Net 30', 'Net 60', 'COD', 'Prepaid'];
  const ratings = [
    { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
    { value: '4', label: '⭐⭐⭐⭐ Good' },
    { value: '3', label: '⭐⭐⭐ Average' },
    { value: '2', label: '⭐⭐ Poor' },
    { value: '1', label: '⭐ Very Poor' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading();

    setTimeout(() => {
      if (editingSupplier) {
        // Update existing supplier
        setSuppliers(prev => prev.map(supplier =>
          supplier.id === editingSupplier.id
            ? { ...supplier, ...supplierForm, rating: parseInt(supplierForm.rating) }
            : supplier
        ));
        showNotification('Supplier updated successfully!', 'success');
        setEditingSupplier(null);
      } else {
        // Add new supplier
        const newSupplier = {
          id: Math.max(...suppliers.map(s => s.id), 0) + 1,
          ...supplierForm,
          rating: parseInt(supplierForm.rating)
        };
        setSuppliers(prev => [...prev, newSupplier]);
        showNotification('Supplier added successfully!', 'success');
      }

      clearForm();
      hideLoading();
    }, 1000);
  };

  const clearForm = () => {
    setSupplierForm({
      company: '',
      contact: '',
      email: '',
      phone: '',
      rating: '5',
      terms: 'Net 30',
      address: '',
      notes: ''
    });
    setEditingSupplier(null);
  };

  const editSupplier = (supplier) => {
    setSupplierForm({
      company: supplier.company,
      contact: supplier.contact,
      email: supplier.email,
      phone: supplier.phone,
      rating: supplier.rating.toString(),
      terms: supplier.terms,
      address: supplier.address || '',
      notes: supplier.notes || ''
    });
    setEditingSupplier(supplier);
    showNotification('Supplier loaded for editing', 'info');
  };

  const deleteSupplier = (id) => {
    showModal('Delete Supplier', 'Are you sure you want to delete this supplier?', () => {
      setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
      showNotification('Supplier deleted successfully!', 'success');
    });
  };

  const viewSupplier = (supplier) => {
    showModal('Supplier Details', 
      `Company: ${supplier.company}\nContact: ${supplier.contact}\nEmail: ${supplier.email}\nPhone: ${supplier.phone}\nRating: ${'⭐'.repeat(supplier.rating)}\nTerms: ${supplier.terms}`
    );
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>🏢 Suppliers Management</h2>
      
      {/* Add/Edit Supplier Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              name="company"
              value={supplierForm.company}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact Person</label>
            <input
              type="text"
              name="contact"
              value={supplierForm.contact}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={supplierForm.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={supplierForm.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <select
              name="rating"
              value={supplierForm.rating}
              onChange={handleInputChange}
            >
              {ratings.map(rating => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Payment Terms</label>
            <select
              name="terms"
              value={supplierForm.terms}
              onChange={handleInputChange}
            >
              {paymentTerms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>
          <div className="form-group full-width">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Supplier address..."
              value={supplierForm.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group full-width">
            <label>Notes</label>
            <textarea
              name="notes"
              placeholder="Additional notes about supplier..."
              value={supplierForm.notes}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
        </button>
        <button type="button" className="btn btn-warning" onClick={clearForm}>
          Clear Form
        </button>
      </form>

      {/* Suppliers Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Rating</th>
              <th>Terms</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id}>
                <td>#{String(supplier.id).padStart(3, '0')}</td>
                <td>{supplier.company}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{renderStars(supplier.rating)}</td>
                <td>{supplier.terms}</td>
                <td className="table-actions">
                  <button className="btn btn-sm btn-info" onClick={() => viewSupplier(supplier)}>
                    View
                  </button>
                  <button className="btn btn-sm btn-warning" onClick={() => editSupplier(supplier)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-success">
                    Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;