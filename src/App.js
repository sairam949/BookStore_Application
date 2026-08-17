import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import Customers from './components/Customers';
import Suppliers from './components/Suppliers';
import Reports from './components/Reports';
import Settings from './components/Settings';
import LoadingSpinner from './components/LoadingSpinner';
import Notification from './components/Notification';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [modal, setModal] = useState({ show: false, title: '', message: '', callback: null });

  // Global state for data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0-7432-7356-5",
      category: "Fiction",
      price: 12.99,
      stock: 25,
      location: "A1-B2",
      supplier: "Penguin Books",
      description: "A classic American novel"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0-06-112008-4",
      category: "Fiction",
      price: 15.99,
      stock: 30,
      location: "A2-C1",
      supplier: "HarperCollins",
      description: "A gripping tale of racial injustice"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0-452-28423-4",
      category: "Fiction",
      price: 18.99,
      stock: 8,
      location: "B1-A3",
      supplier: "Random House",
      description: "A dystopian social science fiction novel"
    }
  ]);

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John",
      email: "[EMAIL_ADDRESS]",
      phone: "(555) 123-4567",
      type: "Premium",
      totalPurchases: 234.50,
      lastVisit: "2025-09-18",
      address: "123 Main St, City"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 987-6543",
      type: "Student",
      totalPurchases: 89.30,
      lastVisit: "2025-09-15",
      address: "456 College Ave, University"
    }
  ]);

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      company: "Penguin Books",
      contact: "Alice Brown",
      email: "alice@penguin.com",
      phone: "(555) 111-2222",
      rating: 5,
      terms: "Net 30",
      address: "Publisher District, NY",
      notes: "Reliable publisher with excellent service"
    }
  ]);

  const [sales, setSales] = useState([]);

  // Utility functions
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const showModal = (title, message, callback = null) => {
    setModal({ show: true, title, message, callback });
  };

  const hideModal = () => {
    setModal({ show: false, title: '', message: '', callback: null });
  };

  const confirmModalAction = () => {
    if (modal.callback) {
      modal.callback();
    }
    hideModal();
  };

  // Calculate dashboard stats
  const dashboardStats = {
    totalBooks: books.length,
    totalSales: sales.reduce((sum, sale) => sum + sale.total, 0) || 12890,
    totalCustomers: customers.length,
    lowStock: books.filter(book => book.stock < 10).length
  };

  const renderTabContent = () => {
    const commonProps = {
      showLoading,
      hideLoading,
      showNotification,
      showModal,
      books,
      setBooks,
      customers,
      setCustomers,
      suppliers,
      setSuppliers,
      sales,
      setSales
    };

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={dashboardStats} setActiveTab={setActiveTab} {...commonProps} />;
      case 'inventory':
        return <Inventory {...commonProps} />;
      case 'sales':
        return <Sales {...commonProps} />;
      case 'customers':
        return <Customers {...commonProps} />;
      case 'suppliers':
        return <Suppliers {...commonProps} />;
      case 'reports':
        return <Reports {...commonProps} />;
      case 'settings':
        return <Settings {...commonProps} />;
      default:
        return <Dashboard stats={dashboardStats} setActiveTab={setActiveTab} {...commonProps} />;
    }
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          {renderTabContent()}
        </main>
      </div>

      {loading && <LoadingSpinner />}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
      {modal.show && (
        <Modal
          title={modal.title}
          message={modal.message}
          onConfirm={confirmModalAction}
          onCancel={hideModal}
        />
      )}
    </div>
  );
};

export default App;