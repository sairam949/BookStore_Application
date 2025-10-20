import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { orderAPI, cartAPI } from '../services/api';
import Navbar from './Navbar';

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const res = await cartAPI.get(user);
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartItems([]);
    } finally {
      setCartLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      alert('Please fill all fields');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      console.log('📝 Creating order with details:', form);
      
      const orderRes = await orderAPI.create({
        username: user,
        deliveryDetails: form
      });
      
      console.log('✅ Order created:', orderRes.data);
      
      await cartAPI.clear(user);
      console.log('🗑️ Cart cleared');
      
      navigate(`/order-confirmation?user=${user}`);
      
    } catch (err) {
      console.error('❌ Error placing order:', err);
      alert('Error placing order: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Page Header */}
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '800', 
            color: '#f1f5f9',
            margin: '0 0 10px 0',
            letterSpacing: '-0.5px'
          }}>
            Checkout
          </h1>
          <p style={{
            color: '#cbd5e1',
            fontSize: '16px',
            margin: '0 0 40px 0'
          }}>
            Complete your order and provide delivery details
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            {/* Left Side - Form */}
            <div>
              <form onSubmit={handleSubmit}>
                {/* Delivery Details Section */}
                <div style={{
                  background: '#1e293b',
                  padding: '28px',
                  borderRadius: '12px',
                  border: '2px solid #334155',
                  marginBottom: '24px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#f1f5f9',
                    margin: '0 0 24px 0'
                  }}>
                    Delivery Details
                  </h2>

                  {/* Full Name */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0f172a',
                        color: '#f1f5f9',
                        border: '2px solid #334155',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6366f1';
                        e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#334155';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0f172a',
                        color: '#f1f5f9',
                        border: '2px solid #334155',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6366f1';
                        e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#334155';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0f172a',
                        color: '#f1f5f9',
                        border: '2px solid #334155',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6366f1';
                        e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#334155';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Address */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Street Address
                    </label>
                    <textarea
                      name="address"
                      placeholder="Enter your street address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0f172a',
                        color: '#f1f5f9',
                        border: '2px solid #334155',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s',
                        fontFamily: 'inherit',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6366f1';
                        e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#334155';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* City & State */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                    <div>
                      <label style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#0f172a',
                          color: '#f1f5f9',
                          border: '2px solid #334155',
                          borderRadius: '8px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          transition: 'all 0.3s',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#6366f1';
                          e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#334155';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        color: '#f1f5f9',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#0f172a',
                          color: '#f1f5f9',
                          border: '2px solid #334155',
                          borderRadius: '8px',
                          fontSize: '14px',
                          boxSizing: 'border-box',
                          transition: 'all 0.3s',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#6366f1';
                          e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#334155';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#f1f5f9',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="560001"
                      value={form.pincode}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#0f172a',
                        color: '#f1f5f9',
                        border: '2px solid #334155',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6366f1';
                        e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#334155';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Payment Method Section */}
                <div style={{
                  background: '#1e293b',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid #334155',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    color: '#f1f5f9',
                    margin: '0 0 12px 0'
                  }}>
                    Payment Method
                  </h3>
                  <div style={{
                    background: '#0f172a',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '2px solid #10b981'
                  }}>
                    <p style={{
                      margin: '0',
                      color: '#10b981',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>
                      Cash on Delivery (COD)
                    </p>
                    <p style={{
                      margin: '8px 0 0 0',
                      color: '#cbd5e1',
                      fontSize: '13px'
                    }}>
                      Pay when your order arrives
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Side - Order Summary */}
            <div>
              <div style={{
                background: '#1e293b',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #334155',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                position: 'sticky',
                top: '100px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#f1f5f9',
                  margin: '0 0 20px 0'
                }}>
                  Order Summary
                </h3>

                {cartLoading ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#cbd5e1'
                  }}>
                    Loading cart...
                  </div>
                ) : cartItems.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#cbd5e1'
                  }}>
                    Your cart is empty
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div style={{
                      marginBottom: '20px',
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      {cartItems.map((item) => (
                        <div key={item._id} style={{
                          display: 'flex',
                          gap: '12px',
                          marginBottom: '12px',
                          padding: '12px',
                          background: '#0f172a',
                          borderRadius: '8px'
                        }}>
                          <img 
                            src={item.image} 
                            alt={item.title}
                            style={{
                              width: '50px',
                              height: '70px',
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              margin: '0 0 4px 0',
                              color: '#f1f5f9',
                              fontSize: '13px',
                              fontWeight: '600',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {item.title}
                            </p>
                            <p style={{
                              margin: '0',
                              color: '#cbd5e1',
                              fontSize: '12px'
                            }}>
                              Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                            </p>
                            <p style={{
                              margin: '4px 0 0 0',
                              color: '#14b8a6',
                              fontSize: '13px',
                              fontWeight: '600'
                            }}>
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div style={{
                      background: '#0f172a',
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid #334155',
                        fontSize: '14px'
                      }}>
                        <span style={{ color: '#cbd5e1' }}>Subtotal</span>
                        <span style={{ color: '#f1f5f9', fontWeight: '600' }}>
                          ₹{calculateSubtotal().toFixed(2)}
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid #334155',
                        fontSize: '14px'
                      }}>
                        <span style={{ color: '#cbd5e1' }}>Tax (5%)</span>
                        <span style={{ color: '#f39c12', fontWeight: '600' }}>
                          ₹{calculateTax().toFixed(2)}
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '18px',
                        fontWeight: '800'
                      }}>
                        <span style={{ color: '#f1f5f9' }}>Total</span>
                        <span style={{ color: '#14b8a6' }}>
                          ₹{calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                      padding: '12px',
                      borderRadius: '8px',
                      marginBottom: '20px',
                      textAlign: 'center'
                    }}>
                      <p style={{
                        margin: '0',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        Free Shipping Available
                      </p>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: loading ? '#475569' : 'linear-gradient(135deg, #6366f1, #ec4899)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: '700',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                        }
                      }}
                    >
                      {loading ? 'Processing Order...' : 'Place Order'}
                    </button>

                    <p style={{
                      margin: '16px 0 0 0',
                      fontSize: '12px',
                      color: '#64748b',
                      textAlign: 'center'
                    }}>
                      By placing an order, you agree to our Terms & Conditions
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder,
        textarea::placeholder {
          color: #64748b;
        }
      `}</style>
    </div>
  );
}