import React, { useState, useEffect } from 'react';

const Header = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div>
        <h1>📚 Smart Bookstore Management</h1>
        <p className="subtitle">Complete Integrated Management System</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ textAlign: 'right', fontSize: '0.85rem', opacity: 0.9 }}>
          <div style={{ fontWeight: 'bold' }}>{time}</div>
          <div>{date}</div>
        </div>
        <span className="phase-indicator" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50', display: 'inline-block' }}></span>
          System Online
        </span>
      </div>
    </header>
  );
};

export default Header;