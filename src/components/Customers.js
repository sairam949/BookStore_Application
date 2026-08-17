import React, { useState } from 'react';

const Customers = ({ customers, setCustomers, showLoading, hideLoading, showNotification, showModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Regular',
    address: ''
  });

  const customerTypes = ['Regular', 'Premium', 'Student', 'Senior'];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading();

    setTimeout(() => {
      if (editingCustomer) {
        // Update existing customer
        setCustomers(prev => prev.map(customer =>
          customer.id === editingCustomer.id
            ? { ...customer, ...customerForm }
            : customer
        ));
        showNotification('Customer updated successfully!', 'success');
        setEditingCustomer(null);
      } else {
        // Add new customer
        const newCustomer = {
          id: Math.max(...customers.map(c => c.id), 0) + 1,
          ...customerForm,
          totalPurchases: 0,
          lastVisit: new Date().toISOString().split('T')[0]
        };
        setCustomers(prev => [...prev, newCustomer]);
        showNotification('Customer added successfully!', 'success');
      }

      clearForm();
      hideLoading();
    }, 800);
  };

  const clearForm = () => {
    setCustomerForm({
      name: '',
      email: '',
      phone: '',
      type: 'Regular',
      address: ''
    });
    setEditingCustomer(null);
  };

  const editCustomer = (customer) => {
    setCustomerForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      type: customer.type,
      address: customer.address || ''
    });
    setEditingCustomer(customer);
    showNotification('Customer loaded for editing', 'info');
  };

  const deleteCustomer = (id) => {
    showModal('Delete Customer', 'Are you sure you want to delete this customer record?', () => {
      setCustomers(prev => prev.filter(customer => customer.id !== id));
      showNotification('Customer deleted successfully!', 'success');
    });
  };

  const viewCustomer = (customer) => {
    showModal('Customer Details', 
      `Name: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nType: ${customer.type}\nTotal Purchases: $${customer.totalPurchases ? customer.totalPurchases.toFixed(2) : '0.00'}\nLast Visit: ${customer.lastVisit || 'N/A'}`
    );
  };

  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'Premium': return { bg: '#fff3e0', color: '#e65100' };
      case 'Student': return { bg: '#e3f2fd', color: '#1565c0' };
      case 'Senior': return { bg: '#f3e5f5', color: '#7b1fa2' };
      default: return { bg: '#e8f5e9', color: '#2e7d32' };
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>👥 Customer Management</h2>

      {/* Customer Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: 'var(--shadow-sm)', border: '1px solid #eee' }}>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>Total Customers</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{customers.length}</div>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: 'var(--shadow-sm)', border: '1px solid #eee' }}>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>Premium Members</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#e65100' }}>
            {customers.filter(c => c.type === 'Premium').length}
          </div>
        </div>
        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: 'var(--shadow-sm)', border: '1px solid #eee' }}>
          <div style={{ fontSize: '0.85rem', color: '#666' }}>Student Tier</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1565c0' }}>
            {customers.filter(c => c.type === 'Student').length}
          </div>
        </div>
      </div>

      {/* Add/Edit Customer Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '1.1rem', color: '#444' }}>
          {editingCustomer ? '✏️ Edit Customer Profile' : '➕ Add New Customer'}
        </h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={customerForm.name}
              onChange={handleInputChange}
              required
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={customerForm.email}
              onChange={handleInputChange}
              placeholder="e.g. jane@example.com"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={customerForm.phone}
              onChange={handleInputChange}
              placeholder="(555) 000-0000"
            />
          </div>
          <div className="form-group">
            <label>Customer Membership Type</label>
            <select
              name="type"
              value={customerForm.type}
              onChange={handleInputChange}
            >
              {customerTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group full-width">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Full mailing address..."
              value={customerForm.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary">
            {editingCustomer ? 'Update Customer' : 'Add Customer'}
          </button>
          <button type="button" className="btn btn-warning" onClick={clearForm}>
            Clear Form
          </button>
        </div>
      </form>

      {/* Customer Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search customers by name, email, or phone number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Customers Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Total Purchases</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => {
              const badgeStyle = getTypeBadgeStyle(customer.type);
              return (
                <tr key={customer.id}>
                  <td>#{String(customer.id).padStart(3, '0')}</td>
                  <td style={{ fontWeight: 600 }}>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: badgeStyle.bg,
                      color: badgeStyle.color
                    }}>
                      {customer.type}
                    </span>
                  </td>
                  <td>${customer.totalPurchases ? customer.totalPurchases.toFixed(2) : '0.00'}</td>
                  <td>{customer.lastVisit || 'N/A'}</td>
                  <td className="table-actions">
                    <button className="btn btn-sm btn-info" onClick={() => viewCustomer(customer)}>
                      View
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={() => editCustomer(customer)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteCustomer(customer.id)}>
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

export default Customers;
