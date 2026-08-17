import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authAPI.register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '16px 20px',
    marginBottom: '24px',
    border: focusedField === fieldName 
      ? '2px solid #6366f1' 
      : error && (fieldName === 'password' || fieldName === 'confirmPassword')
      ? '2px solid #ef4444'
      : '2px solid #334155',
    borderRadius: '12px',
    boxSizing: 'border-box',
    fontSize: '15px',
    background: focusedField === fieldName ? '#1e293b' : '#0f172a',
    color: '#f1f5f9',
    transition: 'all 0.3s ease',
    outline: 'none',
    fontWeight: '500',
    boxShadow: focusedField === fieldName 
      ? '0 0 0 4px rgba(99, 102, 241, 0.1), 0 4px 12px rgba(99, 102, 241, 0.2)' 
      : 'none'
  });

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#0f172a',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        pointerEvents: 'none'
      }} />

      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        padding: '50px 45px', 
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px', 
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 1px rgba(99, 102, 241, 0.3)',
        position: 'relative',
        zIndex: 1,
        border: '1px solid rgba(99, 102, 241, 0.2)',
        animation: 'slideUp 0.6s ease-out'
      }}>
        {/* Glow Effect */}
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '120px',
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent)',
          filter: 'blur(30px)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            position: 'relative',
            display: 'inline-block',
            marginBottom: '24px'
          }}>
            <div style={{
              position: 'absolute',
              inset: '-8px',
              background: 'linear-gradient(135deg, #6366f1, #ec4899, #14b8a6)',
              borderRadius: '20px',
              filter: 'blur(16px)',
              opacity: 0.6,
              animation: 'pulse 3s ease-in-out infinite'
            }} />
            <div style={{
              position: 'relative',
              padding: '18px',
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '18px',
              border: '2px solid rgba(99, 102, 241, 0.3)'
            }}>
              <span style={{ fontSize: '48px', display: 'block' }}>📚</span>
            </div>
          </div>
          
          <h2 style={{ 
            margin: '0 0 12px 0',
            fontSize: '36px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-1px',
            lineHeight: '1.2'
          }}>
            Create Account
          </h2>
          <p style={{
            margin: '0',
            color: '#94a3b8',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Start your reading journey with BookStore
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ 
            padding: '16px 20px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))',
            border: '2px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '12px',
            marginBottom: '28px',
            animation: 'shake 0.5s, fadeIn 0.3s',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
          }}>
            <p style={{ 
              color: '#fca5a5', 
              margin: '0',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '18px' }}>⚠️</span>
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              color: '#e2e8f0',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a unique username"
              value={form.username}
              onChange={handleChange}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
              required
              style={inputStyle('username')}
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              color: '#e2e8f0',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              style={inputStyle('email')}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              color: '#e2e8f0',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              required
              style={inputStyle('password')}
            />
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              color: '#e2e8f0',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              required
              style={inputStyle('confirmPassword')}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
            style={{ 
              width: '100%', 
              padding: '18px',
              background: loading 
                ? '#475569' 
                : 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #14b8a6 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '17px', 
              fontWeight: '800',
              marginTop: '16px',
              boxShadow: loading 
                ? 'none' 
                : hoveredButton
                ? '0 16px 40px rgba(99, 102, 241, 0.5), 0 0 0 4px rgba(99, 102, 241, 0.1)'
                : '0 10px 25px rgba(99, 102, 241, 0.35)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              transform: hoveredButton && !loading ? 'translateY(-3px)' : 'translateY(0)',
              backgroundSize: '200% 200%',
              animation: loading ? 'none' : 'gradient 4s ease infinite'
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite'
                }} />
                Creating...
              </span>
            ) : (
              '✨ Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          margin: '35px 0 30px 0'
        }}>
          <div style={{ 
            flex: 1, 
            height: '2px', 
            background: 'linear-gradient(90deg, transparent, #334155, transparent)' 
          }} />
          <span style={{ 
            color: '#64748b', 
            fontSize: '13px', 
            fontWeight: '700',
            letterSpacing: '1px'
          }}>
            OR
          </span>
          <div style={{ 
            flex: 1, 
            height: '2px', 
            background: 'linear-gradient(90deg, transparent, #334155, transparent)' 
          }} />
        </div>

        {/* Login Link */}
        <p style={{ 
          textAlign: 'center', 
          margin: '0 0 32px 0',
          color: '#94a3b8',
          fontSize: '15px',
          fontWeight: '500'
        }}>
          Already have an account?{' '}
          <a 
            href="/login" 
            style={{ 
              color: '#6366f1',
              textDecoration: 'none',
              fontWeight: '700',
              transition: 'all 0.3s',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#818cf8';
              e.target.style.borderBottom = '2px solid #818cf8';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#6366f1';
              e.target.style.borderBottom = '2px solid transparent';
            }}
          >
            Sign In →
          </a>
        </p>

        {/* Features Box */}
        <div style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(236, 72, 153, 0.05))',
          borderRadius: '16px',
          border: '1px solid rgba(99, 102, 241, 0.15)',
          boxShadow: 'inset 0 2px 8px rgba(99, 102, 241, 0.1)'
        }}>
          <p style={{
            margin: '0 0 16px 0',
            color: '#cbd5e1',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            ✨ Membership Benefits
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {[
              { icon: '📚', text: 'Unlimited Browsing' },
              { icon: '🎯', text: 'Smart Recommendations' },
              { icon: '⚡', text: 'Quick Checkout' },
              { icon: '📦', text: 'Order Tracking' }
            ].map((item, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '10px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{
                  color: '#94a3b8',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        input::placeholder {
          color: #475569;
          opacity: 1;
        }
        input:hover:not(:focus) {
          border-color: #475569 !important;
        }
      `}</style>
    </div>
  );
}