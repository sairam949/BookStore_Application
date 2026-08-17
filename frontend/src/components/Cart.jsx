import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { cartAPI } from '../services/api';
import Navbar from './Navbar';

export default function Cart() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, [user]);

  const loadCart = async () => {
    try {
      console.log('📥 Loading cart for user:', user);
      const res = await cartAPI.get(user);
      console.log('📦 Cart items:', res.data.items);
      setItems(res.data.items);
    } catch (err) {
      console.error('Error loading cart', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      console.log('🗑️ Removing item:', id);
      await cartAPI.remove(id);
      loadCart();
      alert('Item removed from cart');
    } catch (err) {
      console.error('Error removing item', err);
    }
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeItem(id);
    } else {
      console.log('📊 Updating quantity for item:', id, 'to:', newQty);
      setItems(items.map(item => item._id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) return <div><Navbar /><p style={{ textAlign: 'center', padding: '40px' }}>Loading cart...</p></div>;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ padding: '30px', background: '#0f172a', minHeight: 'calc(100vh - 70px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ color: '#f1f5f9', marginBottom: '30px', fontSize: '32px', fontWeight: '800' }}>
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div style={{ background: '#1e293b', padding: '60px', textAlign: 'center', borderRadius: '12px', border: '2px solid #334155' }}>
              <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '20px' }}>Your cart is empty</p>
              <button
                onClick={() => navigate(`/dashboard?user=${user}`)}
                style={{ 
                  padding: '12px 30px', 
                  background: 'linear-gradient(135deg, #6366f1, #ec4899)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
              {/* Left Side - Cart Items Table */}
              <div>
                <div style={{ background: '#1e293b', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white' }}>
                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700' }}>Book</th>
                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700' }}>Author</th>
                        <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700' }}>Price</th>
                        <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700' }}>Qty</th>
                        <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700' }}>Total</th>
                        <th style={{ padding: '16px', textAlign: 'center', fontWeight: '700' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item._id} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '16px', color: '#f1f5f9' }}>{item.bookName}</td>
                          <td style={{ padding: '16px', color: '#cbd5e1' }}>{item.author}</td>
                          <td style={{ padding: '16px', textAlign: 'center', color: '#14b8a6', fontWeight: '600' }}>₹{item.price}</td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity - 1)} 
                                style={{ 
                                  padding: '6px 10px', 
                                  cursor: 'pointer',
                                  background: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontWeight: 'bold',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#dc2626'}
                                onMouseLeave={(e) => e.target.style.background = '#ef4444'}
                              >
                                −
                              </button>
                              <span style={{ minWidth: '20px', textAlign: 'center', color: '#f1f5f9', fontWeight: '600' }}>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity + 1)} 
                                style={{ 
                                  padding: '6px 10px', 
                                  cursor: 'pointer',
                                  background: '#10b981',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontWeight: 'bold',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#059669'}
                                onMouseLeave={(e) => e.target.style.background = '#10b981'}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center', fontWeight: 'bold', color: '#14b8a6' }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            <button
                              onClick={() => removeItem(item._id)}
                              style={{ 
                                padding: '8px 12px', 
                                background: '#ef4444', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '6px', 
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#dc2626';
                                e.target.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = '#ef4444';
                                e.target.style.transform = 'scale(1)';
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Continue Shopping Button */}
                <button
                  onClick={() => navigate(`/dashboard?user=${user}`)}
                  style={{ 
                    marginTop: '20px',
                    padding: '12px 24px', 
                    background: '#475569', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#64748b';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#475569';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  ← Continue Shopping
                </button>
              </div>

              {/* Right Side - Order Summary */}
              <div>
                <div style={{ 
                  background: '#1e293b', 
                  padding: '24px', 
                  borderRadius: '12px', 
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  border: '2px solid #334155',
                  position: 'sticky',
                  top: '100px'
                }}>
                  <h3 style={{ 
                    margin: '0 0 24px 0',
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#f1f5f9'
                  }}>
                    Order Summary
                  </h3>

                  <div style={{ 
                    background: '#0f172a', 
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                      fontSize: '14px'
                    }}>
                      <span style={{ color: '#cbd5e1' }}>Subtotal:</span>
                      <span style={{ color: '#f1f5f9', fontWeight: '600' }}>₹{total.toFixed(2)}</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      fontSize: '14px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #334155'
                    }}>
                      <span style={{ color: '#cbd5e1' }}>Tax (5%):</span>
                      <span style={{ color: '#f39c12', fontWeight: '600' }}>₹{(total * 0.05).toFixed(2)}</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: '18px',
                      fontWeight: '800'
                    }}>
                      <span style={{ color: '#f1f5f9' }}>Total:</span>
                      <span style={{ color: '#14b8a6' }}>₹{(total * 1.05).toFixed(2)}</span>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    <p style={{ margin: '0', color: 'white', fontSize: '13px', fontWeight: '600' }}>
                      Items: {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/checkout?user=${user}`)}
                    style={{ 
                      width: '100%',
                      padding: '14px', 
                      background: 'linear-gradient(135deg, #6366f1, #ec4899)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                    }}
                  >
                    Proceed to Checkout →
                  </button>

                  <p style={{ 
                    margin: '16px 0 0 0',
                    fontSize: '12px',
                    color: '#64748b',
                    textAlign: 'center'
                  }}>
                    Free shipping on orders over ₹500
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}