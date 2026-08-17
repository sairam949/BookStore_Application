import { useSearchParams } from 'react-router-dom';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Payment</h1>
      <form>
        <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input type="email" placeholder="Email" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input type="tel" placeholder="Phone" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input type="text" placeholder="Address" required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white' }}>
          Place Order
        </button>
      </form>
    </div>
  );
}
