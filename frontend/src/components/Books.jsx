import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getBooks } from '../services/booksAPI';
import { cartAPI } from '../services/api';
import Navbar from './Navbar';

export default function Books() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);

  useEffect(() => {
    loadBooks();
  }, [category]);

  const loadBooks = async () => {
    setLoading(true);
    const data = await getBooks(category);
    setBooks(data);
    setLoading(false);
  };

  const addToCart = async (book) => {
    setAddingToCart(book.id);
    try {
      console.log('📚 Adding to cart:', book.title);
      
      const response = await cartAPI.add({
        username: user,
        bookId: book.id,
        bookName: book.title,
        author: book.author,
        price: parseFloat(book.price),
        cover: book.cover
      });

      console.log('✅ Backend Response:', response.data);
      
      setCartMessage({
        type: 'success',
        book: book.title,
        timestamp: Date.now()
      });

      setTimeout(() => setCartMessage(null), 3000);
      
    } catch (err) {
      console.error('❌ Error adding to cart:', err.response?.data?.message || err.message);
      
      setCartMessage({
        type: 'error',
        message: err.response?.data?.message || 'Failed to add to cart',
        timestamp: Date.now()
      });

      setTimeout(() => setCartMessage(null), 3000);
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />
      <p style={{ textAlign: 'center', padding: '40px', color: '#cbd5e1' }}>Loading books...</p>
    </div>
  );

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />

      {/* Toast Notification */}
      {cartMessage && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          padding: '15px 20px',
          background: cartMessage.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          maxWidth: '300px',
          animation: 'slideIn 0.3s ease-in'
        }}>
          {cartMessage.type === 'success' ? (
            <div>
              <strong>✅ Added to cart!</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>{cartMessage.book}</p>
            </div>
          ) : (
            <div>
              <strong>❌ Error</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>{cartMessage.message}</p>
            </div>
          )}
        </div>
      )}

      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              textAlign: 'center', 
              textTransform: 'capitalize',
              fontSize: '36px',
              fontWeight: '800',
              color: '#f1f5f9',
              margin: '0 0 10px 0',
              letterSpacing: '-0.5px'
            }}>
              {category}
            </h1>
            <p style={{ 
              textAlign: 'center', 
              color: '#cbd5e1', 
              fontSize: '16px',
              margin: '0'
            }}>
              Found {books.length} books
            </p>
          </div>

          {/* Books Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px',
            maxWidth: '1400px', 
            margin: '0 auto' 
          }}>
            {books.map(book => (
              <div 
                key={book.id} 
                style={{ 
                  background: '#1e293b', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  border: '2px solid #334155',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.25)';
                  e.currentTarget.style.borderColor = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = '#334155';
                }}
              >
                {/* Book Cover */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    style={{ 
                      width: '100%', 
                      height: '280px', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  
                  {/* Rating Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}>
                    ⭐ {book.rating}
                  </div>
                </div>

                {/* Book Details */}
                <div style={{ 
                  padding: '16px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  flex: '1'
                }}>
                  <h3 style={{ 
                    margin: '0 0 8px 0', 
                    fontSize: '16px', 
                    fontWeight: '700',
                    color: '#f1f5f9',
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap'
                  }}>
                    {book.title}
                  </h3>
                  
                  <p style={{ 
                    margin: '0 0 8px 0', 
                    color: '#cbd5e1', 
                    fontSize: '13px'
                  }}>
                    by {book.author}
                  </p>

                  <p style={{ 
                    margin: '0 0 12px 0', 
                    color: '#a78bfa', 
                    fontSize: '12px'
                  }}>
                    {book.year}
                  </p>

                  {/* Price */}
                  <p style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: '20px', 
                    fontWeight: '800', 
                    color: '#14b8a6',
                    flex: '1'
                  }}>
                    ₹{book.price}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(book)}
                    disabled={addingToCart === book.id}
                    style={{ 
                      width: '100%', 
                      padding: '12px', 
                      background: addingToCart === book.id 
                        ? '#475569' 
                        : 'linear-gradient(135deg, #6366f1, #ec4899)',
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: addingToCart === book.id ? 'not-allowed' : 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      transition: 'all 0.3s',
                      boxShadow: addingToCart === book.id 
                        ? 'none' 
                        : '0 4px 12px rgba(99, 102, 241, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      if (addingToCart !== book.id) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (addingToCart !== book.id) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.2)';
                      }
                    }}
                  >
                    {addingToCart === book.id ? '⏳ Adding...' : '🛒 Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}