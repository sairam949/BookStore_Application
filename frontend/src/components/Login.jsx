import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login({ username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', username);
      navigate(`/dashboard?user=${username}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ width: '100%', maxWidth: '440px', padding: '40px', background: 'white', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📚</div>
          <h2 style={{ margin: '0', fontSize: '28px', fontWeight: '700', color: '#2d3748' }}>BookStore</h2>
          <p style={{ margin: '8px 0 0 0', color: '#718096', fontSize: '14px' }}>Sign in to your account</p>
        </div>

        {error && (
          <div style={{ padding: '12px', marginBottom: '20px', background: '#fed7d7', border: '1px solid #fc8181', borderRadius: '8px', color: '#c53030', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2d3748', fontSize: '14px', fontWeight: '600' }}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box', fontSize: '15px', transition: 'border-color 0.3s' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2d3748', fontSize: '14px', fontWeight: '600' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box', fontSize: '15px', transition: 'border-color 0.3s' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '14px', background: loading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: '700', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)', transition: 'all 0.3s' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>
            Don't have an account?{' '}
            <a href="/register" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}