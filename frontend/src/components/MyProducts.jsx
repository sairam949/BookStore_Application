import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import Navbar from './Navbar';

export default function MyProducts() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!user) navigate('/login');
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      console.log('📦 Loading orders for user:', user);
      const res = await orderAPI.getOrders(user);
      console.log('✅ Orders loaded:', res.data.orders);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error('❌ Error loading orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate order status and progress
  const getOrderStatus = (createdAt) => {
    const orderDate = new Date(createdAt);
    const currentDate = new Date();
    const daysPassed = Math.floor((currentDate - orderDate) / (1000 * 60 * 60 * 24));

    if (daysPassed === 0) return { status: 'Order Placed', progress: 25, color: '#3498db' };
    if (daysPassed === 1) return { status: 'Processing', progress: 50, color: '#f39c12' };
    if (daysPassed === 2) return { status: 'Shipped', progress: 75, color: '#9b59b6' };
    if (daysPassed >= 3) return { status: 'Delivered', progress: 100, color: '#27ae60' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px', background: '#ecf0f1', minHeight: 'calc(100vh - 70px)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>📦 Track Your Orders</h1>
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>
          Total Orders: {orders.length}
        </p>

        {orders.length === 0 ? (
          <div style={{ background: 'white', padding: '40px', textAlign: 'center', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '18px', color: '#7f8c8d', marginBottom: '20px' }}>No orders yet</p>
            <button
              onClick={() => navigate(`/dashboard?user=${user}`)}
              style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {orders.map((order, index) => {
              const statusInfo = getOrderStatus(order.createdAt);
              const isExpanded = expandedOrder === order._id;

              return (
                <div
                  key={order._id}
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    marginBottom: '20px',
                    overflow: 'hidden'
                  }}
                >
                  {/* Order Header */}
                  <div
                    onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                    style={{
                      padding: '20px',
                      background: '#f9f9f9',
                      cursor: 'pointer',
                      borderBottom: isExpanded ? '2px solid #3498db' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h3 style={{ margin: '0 0 5px 0' }}>Order #{order.orderNumber}</h3>
                      <p style={{ margin: '0', color: '#7f8c8d', fontSize: '14px' }}>
                        Ordered: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: '0 0 5px 0', fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
                        ₹{order.total?.toFixed(2) || 0}
                      </p>
                      <span style={{
                        padding: '5px 10px',
                        background: statusInfo.color,
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {statusInfo.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ padding: '20px', background: '#f9f9f9', borderBottom: '1px solid #ecf0f1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px', color: '#7f8c8d' }}>
                      <span>Order Placed</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#ecf0f1', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${statusInfo.progress}%`,
                        height: '100%',
                        background: statusInfo.color,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div style={{ padding: '20px', borderTop: '1px solid #ecf0f1' }}>
                      {/* Items Section */}
                      <h4 style={{ marginTop: '0', marginBottom: '15px' }}>Purchased Items ({order.items?.length || 0})</h4>
                      <div style={{ background: '#f9f9f9', borderRadius: '4px', padding: '15px', marginBottom: '20px' }}>
                        {order.items && order.items.length > 0 ? (
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                              <tr style={{ borderBottom: '2px solid #ddd' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Book</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Author</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Price</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
                                <th style={{ padding: '10px', textAlign: 'right' }}>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                  <td style={{ padding: '10px' }}>{item.bookName || 'N/A'}</td>
                                  <td style={{ padding: '10px' }}>{item.author || 'N/A'}</td>
                                  <td style={{ padding: '10px', textAlign: 'center' }}>₹{item.price || 0}</td>
                                  <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity || 1}</td>
                                  <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                                    ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p>No items found</p>
                        )}
                      </div>

                      {/* Delivery Details */}
                      <h4 style={{ marginBottom: '15px' }}>Delivery Details</h4>
                      <div style={{ background: '#f9f9f9', borderRadius: '4px', padding: '15px', marginBottom: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                          <div>
                            <p style={{ margin: '0 0 5px 0', color: '#7f8c8d', fontSize: '12px' }}>Name</p>
                            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold' }}>{order.deliveryDetails?.fullName}</p>
                          </div>
                          <div>
                            <p style={{ margin: '0 0 5px 0', color: '#7f8c8d', fontSize: '12px' }}>Email</p>
                            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold' }}>{order.deliveryDetails?.email}</p>
                          </div>
                          <div>
                            <p style={{ margin: '0 0 5px 0', color: '#7f8c8d', fontSize: '12px' }}>Phone</p>
                            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold' }}>{order.deliveryDetails?.phone}</p>
                          </div>
                          <div>
                            <p style={{ margin: '0 0 5px 0', color: '#7f8c8d', fontSize: '12px' }}>Payment Method</p>
                            <p style={{ margin: '0 0 15px 0', fontWeight: 'bold' }}>{order.paymentMethod}</p>
                          </div>
                        </div>
                        <div>
                          <p style={{ margin: '0 0 5px 0', color: '#7f8c8d', fontSize: '12px' }}>Address</p>
                          <p style={{ margin: '0', fontWeight: 'bold' }}>
                            {order.deliveryDetails?.address}, {order.deliveryDetails?.city}, {order.deliveryDetails?.state} - {order.deliveryDetails?.pincode}
                          </p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ background: '#e8f5e9', borderRadius: '4px', padding: '15px' }}>
                          <p style={{ margin: '0 0 10px 0', color: '#27ae60', fontSize: '12px', fontWeight: 'bold' }}>Subtotal</p>
                          <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
                            ₹{((order.total / 1.05) || 0).toFixed(2)}
                          </p>
                        </div>
                        <div style={{ background: '#fff3cd', borderRadius: '4px', padding: '15px' }}>
                          <p style={{ margin: '0 0 10px 0', color: '#856404', fontSize: '12px', fontWeight: 'bold' }}>Tax & Total</p>
                          <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#856404' }}>
                            ₹{order.total?.toFixed(2) || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ padding: '15px', background: '#f9f9f9', textAlign: 'right', borderTop: '1px solid #ecf0f1' }}>
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                      style={{
                        padding: '8px 15px',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      {isExpanded ? 'Collapse' : 'View Details'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Back to Shopping Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={() => navigate(`/dashboard?user=${user}`)}
            style={{
              padding: '12px 30px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}