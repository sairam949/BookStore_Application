import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getBooks } from '../services/booksAPI';
import { cartAPI } from '../services/api';
import Navbar from './Navbar';

const CATEGORIES = [
  { id: 'fiction', name: 'Fiction', icon: '📖' },
  { id: 'scifi', name: 'Sci-Fi', icon: '🚀' },
  { id: 'romance', name: 'Romance', icon: '💕' },
  { id: 'mystery', name: 'Mystery', icon: '🔍' },
  { id: 'fantasy', name: 'Fantasy', icon: '🐉' },
  { id: 'biography', name: 'Biography', icon: '👤' },
  { id: 'history', name: 'History', icon: '📜' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'technology', name: 'Technology', icon: '💻' }
];

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const user = searchParams.get('user');
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(false);

  if (!user) navigate('/login');

  // Fetch featured books from API
  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        console.log('📚 Loading featured books from API...');
        const books = await getBooks('fiction');
        console.log('✅ Books loaded:', books.length);
        // Take first 5 books for slider
        setFeaturedBooks(books.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error('❌ Error loading books:', err);
        setLoading(false);
      }
    };

    loadFeaturedBooks();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (featuredBooks.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredBooks.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
  };

  // Add featured book to cart
  const addFeaturedBookToCart = async () => {
    if (!currentBook) return;

    setAddingToCart(true);
    try {
      console.log('📚 Adding to cart from slider:', currentBook.title);
      
      const response = await cartAPI.add({
        username: user,
        bookId: currentBook.id,
        bookName: currentBook.title,
        author: currentBook.author,
        price: parseFloat(currentBook.price),
        cover: currentBook.cover
      });

      console.log('✅ Backend Response:', response.data);
      
      // Show success message
      setCartMessage({
        type: 'success',
        book: currentBook.title,
        timestamp: Date.now()
      });

      // Auto-hide message after 3 seconds
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
      setAddingToCart(false);
    }
  };

  const currentBook = featuredBooks[currentSlide];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #14b8a6 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        
        <h1 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '40px', 
          fontWeight: '800',
          letterSpacing: '-0.5px'
        }}>
          Welcome to BookStore
        </h1>
        <p style={{ 
          margin: '0', 
          fontSize: '16px', 
          opacity: 0.95,
          fontWeight: '500'
        }}>
          Discover thousands of books across all genres
        </p>
      </div>

      {/* Books Slider Section */}
      <div style={{
        background: '#1e293b',
        padding: '40px 20px',
        borderBottom: '2px solid rgba(99, 102, 241, 0.2)'
      }}>
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

        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#f1f5f9',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Featured Books
          </h2>

          {/* Slider Container */}
          <div style={{
            position: 'relative',
            background: '#0f172a',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {loading ? (
              <p style={{ color: '#cbd5e1', fontSize: '18px' }}>Loading featured books...</p>
            ) : featuredBooks.length === 0 ? (
              <p style={{ color: '#cbd5e1', fontSize: '18px' }}>No books available</p>
            ) : (
              <>
                {/* Left Arrow */}
                <button
                  onClick={handlePrevSlide}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    border: 'none',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                    e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(-50%)';
                    e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
                  }}
                >
                  ←
                </button>

                {/* Slide Content */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '40px',
                  width: '100%',
                  padding: '40px 100px',
                  animation: 'fadeIn 0.5s ease'
                }}>
                  {/* Book Image */}
                  <div style={{
                    flex: '1',
                    textAlign: 'center',
                    minWidth: '250px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative'
                  }}
                  onMouseEnter={() => setHoveredBook(true)}
                  onMouseLeave={() => setHoveredBook(false)}
                  >
                    <img
                      src={currentBook?.cover}
                      alt={currentBook?.title}
                      style={{
                        maxWidth: '280px',
                        height: '350px',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        transform: hoveredBook ? 'scale(1.05)' : 'scale(1)',
                        filter: hoveredBook ? 'brightness(0.7)' : 'brightness(1)'
                      }}
                    />
                    {/* Click Area */}
                    {hoveredBook && (
                      <div
                        onClick={addFeaturedBookToCart}
                        style={{
                          position: 'absolute',
                          top: '0',
                          left: '0',
                          width: '100%',
                          height: '100%',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          zIndex: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      />
                    )}
                  </div>

                  {/* Book Info */}
                  <div style={{
                    flex: '1',
                    color: 'white',
                    textAlign: 'left',
                    minWidth: '300px'
                  }}>
                    <h3 style={{
                      fontSize: '28px',
                      fontWeight: '800',
                      marginBottom: '12px',
                      color: '#f1f5f9'
                    }}>
                      {currentBook?.title}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#cbd5e1',
                      marginBottom: '10px'
                    }}>
                      by {currentBook?.author}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#a78bfa',
                      marginBottom: '10px'
                    }}>
                      Year: {currentBook?.year}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#94e2d5',
                      marginBottom: '20px'
                    }}>
                      ⭐ {currentBook?.rating} • {currentBook?.ratingsCount} reviews
                    </p>
                    <p style={{
                      fontSize: '32px',
                      fontWeight: '800',
                      color: '#14b8a6',
                      marginBottom: '30px'
                    }}>
                      ₹{currentBook?.price}
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: '#cbd5e1',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                      maxHeight: '80px',
                      overflow: 'hidden'
                    }}>
                      {currentBook?.description}
                    </p>
                    <button
                      onClick={addFeaturedBookToCart}
                      disabled={addingToCart}
                      style={{
                        padding: '12px 30px',
                        background: addingToCart ? '#95a5a6' : 'linear-gradient(135deg, #6366f1, #ec4899)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: addingToCart ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        if (!addingToCart) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!addingToCart) {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                        }
                      }}
                    >
                      {addingToCart ? '⏳ Adding...' : '🛒 Add to Cart'}
                    </button>
                  </div>
                </div>

                {/* Right Arrow */}
                <button
                  onClick={handleNextSlide}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    border: 'none',
                    color: 'white',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                    e.target.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(-50%)';
                    e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
                  }}
                >
                  →
                </button>

                {/* Slider Dots */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  {featuredBooks.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      style={{
                        width: currentSlide === idx ? '28px' : '10px',
                        height: '10px',
                        borderRadius: '50%',
                        border: 'none',
                        background: currentSlide === idx 
                          ? '#6366f1' 
                          : '#475569',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: currentSlide === idx 
                          ? '0 4px 12px rgba(99, 102, 241, 0.4)' 
                          : 'none'
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        padding: '50px 20px', 
        background: '#0f172a', 
        minHeight: 'calc(100vh - 180px)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Section Title */}
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: '40px',
            fontSize: '28px',
            fontWeight: '800',
            color: '#f1f5f9',
            letterSpacing: '-0.5px'
          }}>
            Browse by Category
          </h2>

          {/* Categories Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
            gap: '20px',
            maxWidth: '1400px', 
            margin: '0 auto' 
          }}>
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                onClick={() => navigate(`/books/${cat.id}?user=${user}`)}
                style={{
                  padding: '32px 24px',
                  background: '#1e293b',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  border: '2px solid #334155',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.25)';
                  e.currentTarget.style.borderColor = '#6366f1';
                  e.currentTarget.style.background = '#334155';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = '#334155';
                  e.currentTarget.style.background = '#1e293b';
                }}
              >
                <div style={{ 
                  fontSize: '56px', 
                  marginBottom: '16px',
                  animation: 'bounce 2s infinite'
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ 
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#f1f5f9'
                }}>
                  {cat.name}
                </h3>
                <p style={{ 
                  margin: '0',
                  fontSize: '13px',
                  color: '#cbd5e1'
                }}>
                  Browse {cat.name.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div style={{
        background: '#1e293b',
        padding: '50px 20px',
        borderTop: '2px solid rgba(99, 102, 241, 0.2)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              { icon: '📦', title: 'Fast Delivery', desc: 'Get your books in 3-5 business days' },
              { icon: '💳', title: 'Secure Payment', desc: 'Cash on Delivery or Online Payment' },
              { icon: '⭐', title: 'Best Prices', desc: 'Affordable prices with regular discounts' }
            ].map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#0f172a',
                  padding: '28px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.1)',
                  border: '1px solid #334155',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6366f1';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#334155';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.1)';
                }}
              >
                <div style={{ fontSize: '44px', marginBottom: '12px' }}>{item.icon}</div>
                <h3 style={{ 
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#f1f5f9'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  margin: '0',
                  color: '#cbd5e1',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderTop: '2px solid rgba(99, 102, 241, 0.3)',
        color: '#cbd5e1',
        padding: '60px 20px 30px 20px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Footer Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            {/* About Section */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#f1f5f9',
                marginBottom: '15px'
              }}>
                About BookStore
              </h3>
              <p style={{
                margin: '0',
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#cbd5e1'
              }}>
                Your ultimate destination for books across all genres. We provide authentic, affordable books with fast delivery and secure payment options.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#f1f5f9',
                marginBottom: '15px'
              }}>
                Quick Links
              </h3>
              <ul style={{
                margin: '0',
                padding: '0',
                listStyle: 'none'
              }}>
                <li style={{ marginBottom: '10px' }}>
                  <a href="#home" style={{ color: '#14b8a6', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#2dd4bf'} onMouseLeave={(e) => e.target.style.color = '#14b8a6'}>
                    Home
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="#books" style={{ color: '#14b8a6', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#2dd4bf'} onMouseLeave={(e) => e.target.style.color = '#14b8a6'}>
                    Books
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="#about" style={{ color: '#14b8a6', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#2dd4bf'} onMouseLeave={(e) => e.target.style.color = '#14b8a6'}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#faq" style={{ color: '#14b8a6', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#2dd4bf'} onMouseLeave={(e) => e.target.style.color = '#14b8a6'}>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#f1f5f9',
                marginBottom: '15px'
              }}>
                Contact Us
              </h3>
              <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                <p style={{ margin: '0 0 12px 0', color: '#cbd5e1' }}>
                  <strong style={{ color: '#f1f5f9' }}>Email:</strong> support@bookstore.com
                </p>
                <p style={{ margin: '0 0 12px 0', color: '#cbd5e1' }}>
                  <strong style={{ color: '#f1f5f9' }}>Phone:</strong> +91 8800 123 456
                </p>
                <p style={{ margin: '0 0 12px 0', color: '#cbd5e1' }}>
                  <strong style={{ color: '#f1f5f9' }}>Address:</strong> 123 Book Lane, Bangalore, India 560001
                </p>
                <p style={{ margin: '0', color: '#cbd5e1' }}>
                  <strong style={{ color: '#f1f5f9' }}>Hours:</strong> Mon-Sun 9:00 AM - 9:00 PM IST
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#f1f5f9',
                marginBottom: '15px'
              }}>
                Follow Us
              </h3>
              <div style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap'
              }}>
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    style={{
                      display: 'inline-block',
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                      color: 'white',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '40px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: '700',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.15)';
                      e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                    title={social}
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            borderTop: '1px solid rgba(99, 102, 241, 0.2)',
            paddingTop: '30px'
          }}>
            {/* Copyright & Legal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <p style={{
                margin: '0',
                fontSize: '14px',
                color: '#64748b'
              }}>
                &copy; 2025 BookStore. All rights reserved. | Designed & Developed with <span style={{ color: '#ec4899' }}>❤</span> by Our Team
              </p>
              <div style={{
                display: 'flex',
                gap: '20px',
                fontSize: '13px'
              }}>
                <a href="#privacy" style={{ color: '#14b8a6', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#2dd4bf'} onMouseLeave={(e) => e.target.style.color = '#14b8a6'}>
                  Privacy Policy
                </a>
                <a href="#terms" style={{ color: '#14b8a6', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#2dd4bf'} onMouseLeave={(e) => e.target.style.color = '#14b8a6'}>
                  Terms & Conditions
                </a>
                <a href="#refund" style={{ color: '#14b8a6', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#2dd4bf'} onMouseLeave={(e) => e.target.style.color = '#14b8a6'}>
                  Refund Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
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
        @keyframes slideDown {
          from {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}