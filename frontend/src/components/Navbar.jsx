// frontend/src/components/Navbar.jsx (UPDATED)
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/books/${search}?user=${user}`);
      setSearch('');
    }
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#2c3e50',
      padding: '15px 20px',
      color: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      flexWrap: 'wrap',
      gap: '10px'
    }}>
      {/* Logo */}
      <div 
        onClick={() => navigate(`/dashboard?user=${user}`)} 
        style={{ cursor: 'pointer', fontSize: '24px', fontWeight: 'bold', whiteSpace: 'nowrap' }}
      >
        📚 BookStore
      </div>

      {/* Search Bar */}
      <form 
        onSubmit={handleSearch} 
        style={{ display: 'flex', gap: '10px', flex: 1, minWidth: '250px', maxWidth: '400px' }}
      >
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', borderRadius: '4px', border: 'none' }}
        />
        <button 
          type="submit" 
          style={{ padding: '8px 15px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Search
        </button>
      </form>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>👤 {user}</span>

        {/* My Products Button */}
        <button
          onClick={() => navigate(`/my-products?user=${user}`)}
          style={{ 
            padding: '8px 15px', 
            background: '#9b59b6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}
        >
          📦 My Products
        </button>

        {/* Cart Button */}
        <button
          onClick={() => navigate(`/cart?user=${user}`)}
          style={{ 
            padding: '8px 15px', 
            background: '#27ae60', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}
        >
          🛒 Cart
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{ 
            padding: '8px 15px', 
            background: '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}