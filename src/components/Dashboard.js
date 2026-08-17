import React from 'react';

const Dashboard = ({ stats, sales, setActiveTab }) => {
  const recentActivity = [
    {
      time: "10:30 AM",
      activity: "Book Added",
      details: "\"The Great Gatsby\" by F. Scott Fitzgerald",
      user: "Admin",
      badgeClass: "badge-success"
    },
    {
      time: "10:15 AM",
      activity: "Sale Completed",
      details: "Order #1001 - $45.99",
      user: "Cashier1",
      badgeClass: "badge-info"
    },
    {
      time: "09:45 AM",
      activity: "Stock Updated",
      details: "\"1984\" by George Orwell - 8 units remaining",
      user: "Manager",
      badgeClass: "badge-warning"
    }
  ];

  const topCategories = [
    { name: "Fiction", percentage: 65 },
    { name: "Non-Fiction", percentage: 45 },
    { name: "Technology", percentage: 30 },
    { name: "History", percentage: 20 }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Dashboard Overview</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {setActiveTab && (
            <>
              <button 
                className="btn btn-primary" 
                onClick={() => setActiveTab('inventory')}
                style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              >
                + Manage Inventory
              </button>
              <button 
                className="btn btn-success" 
                onClick={() => setActiveTab('sales')}
                style={{ fontSize: '0.85rem', padding: '8px 14px' }}
              >
                💳 New Sale
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalBooks.toLocaleString()}</div>
          <div className="stat-label">Total Books</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${stats.totalSales.toLocaleString()}</div>
          <div className="stat-label">Monthly Sales</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalCustomers}</div>
          <div className="stat-label">Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.lowStock}</div>
          <div className="stat-label">Low Stock Items</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* Recent Activity Table */}
        <div className="table-container">
          <h3 style={{ padding: '16px 20px', margin: 0, background: 'var(--primary-gradient)', color: 'white' }}>
            Recent Activity Log
          </h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Activity</th>
                <th>Details</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 500, fontSize: '0.9rem' }}>{activity.time}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem', 
                      fontWeight: 600,
                      backgroundColor: activity.badgeClass === 'badge-success' ? '#e8f5e9' : activity.badgeClass === 'badge-info' ? '#e3f2fd' : '#fff3e0',
                      color: activity.badgeClass === 'badge-success' ? '#2e7d32' : activity.badgeClass === 'badge-info' ? '#1565c0' : '#e65100'
                    }}>
                      {activity.activity}
                    </span>
                  </td>
                  <td>{activity.details}</td>
                  <td>{activity.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Categories Widget */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid #eee' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', color: '#333' }}>Top Selling Categories</h3>
          {topCategories.map((cat, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px', fontWeight: 500 }}>
                <span>{cat.name}</span>
                <span>{cat.percentage}%</span>
              </div>
              <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${cat.percentage}%`, height: '100%', background: 'var(--primary-gradient)', borderRadius: '4px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;