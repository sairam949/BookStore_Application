import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  const navigate = useNavigate();

  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px', background: '#ecf0f1', minHeight: 'calc(100vh - 70px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>✓</div>
          <h1 style={{ color: '#27ae60', marginBottom: '10px' }}>Order Confirmed!</h1>
          <p style={{ fontSize: '16px', color: '#7f8c8d', marginBottom: '20px' }}>Thank you for your purchase</p>
          
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '4px', marginBottom: '20px', textAlign: 'left' }}>
            <p style={{ margin: '0 0 10px 0' }}><strong>Order Number:</strong> #{orderNumber}</p>
            <p style={{ margin: '0 0 10px 0' }}><strong>Customer:</strong> {user}</p>
            <p style={{ margin: '0 0 10px 0' }}><strong>Status:</strong> Pending Confirmation</p>
            <p style={{ margin: '0' }}><strong>Expected Delivery:</strong> 3-5 Business Days</p>
          </div>

          <div style={{ background: '#e8f5e9', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
            <p style={{ margin: '0', color: '#27ae60' }}>Payment Method: Cash on Delivery</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => navigate(`/dashboard?user=${user}`)}
              style={{ padding: '12px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate(`/cart?user=${user}`)}
              style={{ padding: '12px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
