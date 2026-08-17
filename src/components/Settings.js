import React, { useState } from 'react';

const Settings = ({ showNotification }) => {
  const [storeSettings, setStoreSettings] = useState({
    name: 'Smart Bookstore',
    email: 'info@smartbookstore.com',
    phone: '(555) 123-4567',
    taxRate: '8.00',
    address: '123 Main Street, City, State 12345'
  });

  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    role: 'Staff',
    password: ''
  });

  const [systemSettings, setSystemSettings] = useState({
    currency: 'USD',
    lowStockThreshold: '10',
    backupFrequency: 'daily',
    theme: 'default'
  });

  const roles = ['Admin', 'Manager', 'Cashier', 'Staff'];
  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'INR', label: 'INR (₹)' }
  ];
  const backupFrequencies = ['daily', 'weekly', 'monthly'];
  const themes = ['default', 'dark', 'light'];

  const handleStoreChange = (e) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSystemChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveStoreSettings = () => {
    showNotification('Store settings saved successfully!', 'success');
  };

  const addUser = (e) => {
    e.preventDefault();
    // Simulate user creation
    setUserForm({
      username: '',
      email: '',
      role: 'Staff',
      password: ''
    });
    showNotification('User added successfully!', 'success');
  };

  const saveSystemSettings = () => {
    showNotification('System settings saved successfully!', 'success');
  };

  const resetToDefaults = () => {
    setSystemSettings({
      currency: 'USD',
      lowStockThreshold: '10',
      backupFrequency: 'daily',
      theme: 'default'
    });
    showNotification('Settings reset to defaults!', 'info');
  };

  const backupDatabase = () => {
    showNotification('Database backup completed successfully!', 'success');
  };

  const restoreDatabase = () => {
    showNotification('Database restored successfully!', 'success');
  };

  const exportData = () => {
    showNotification('Data exported successfully!', 'success');
  };

  const importData = () => {
    showNotification('Data imported successfully!', 'success');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>⚙️ System Settings</h2>
      
      {/* Store Information */}
      <h3>Store Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Store Name</label>
          <input
            type="text"
            name="name"
            value={storeSettings.name}
            onChange={handleStoreChange}
          />
        </div>
        <div className="form-group">
          <label>Store Email</label>
          <input
            type="email"
            name="email"
            value={storeSettings.email}
            onChange={handleStoreChange}
          />
        </div>
        <div className="form-group">
          <label>Store Phone</label>
          <input
            type="tel"
            name="phone"
            value={storeSettings.phone}
            onChange={handleStoreChange}
          />
        </div>
        <div className="form-group">
          <label>Tax Rate (%)</label>
          <input
            type="number"
            name="taxRate"
            step="0.01"
            value={storeSettings.taxRate}
            onChange={handleStoreChange}
          />
        </div>
        <div className="form-group full-width">
          <label>Store Address</label>
          <textarea
            name="address"
            value={storeSettings.address}
            onChange={handleStoreChange}
          />
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={saveStoreSettings}>
        Save Store Settings
      </button>

      {/* User Management */}
      <h3 style={{ marginTop: '40px' }}>User Management</h3>
      <form onSubmit={addUser}>
        <div className="form-grid">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={userForm.username}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userForm.email}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={userForm.role}
              onChange={handleUserChange}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleUserChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>

      {/* System Settings */}
      <h3 style={{ marginTop: '40px' }}>System Settings</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Currency</label>
          <select
            name="currency"
            value={systemSettings.currency}
            onChange={handleSystemChange}
          >
            {currencies.map(currency => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Low Stock Threshold</label>
          <input
            type="number"
            name="lowStockThreshold"
            value={systemSettings.lowStockThreshold}
            onChange={handleSystemChange}
          />
        </div>
        <div className="form-group">
          <label>Backup Frequency</label>
          <select
            name="backupFrequency"
            value={systemSettings.backupFrequency}
            onChange={handleSystemChange}
          >
            {backupFrequencies.map(freq => (
              <option key={freq} value={freq}>
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Theme</label>
          <select
            name="theme"
            value={systemSettings.theme}
            onChange={handleSystemChange}
          >
            {themes.map(theme => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="button" className="btn btn-success" onClick={saveSystemSettings}>
        Save System Settings
      </button>
      <button type="button" className="btn btn-warning" onClick={resetToDefaults}>
        Reset to Defaults
      </button>
      
      {/* Database Management */}
      <h3 style={{ marginTop: '40px' }}>Database Management</h3>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <button className="btn btn-info" onClick={backupDatabase}>
          Backup Database
        </button>
        <button className="btn btn-warning" onClick={restoreDatabase}>
          Restore Database
        </button>
        <button className="btn btn-primary" onClick={exportData}>
          Export Data
        </button>
        <button className="btn btn-success" onClick={importData}>
          Import Data
        </button>
      </div>
    </div>
  );
};

export default Settings;