import React from 'react';

const Dashboard = ({ stats, sales }) => {
  const recentActivity = [
    {
      time: "10:30 AM",
      activity: "Book Added",
      details: "\"The Great Gatsby\" by F. Scott Fitzgerald",
      user: "Admin"
    },
    {
      time: "10:15 AM",
      activity: "Sale Completed",
      details: "Order #1001 - $45.99",
      user: "Cashier1"
    },
    {
      time: "09:45 AM",
      activity: "Stock Updated",
      details: "\"Harry Potter Series\" - 50 units added",
      user: "Manager"
    }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>Dashboard Overview</h2>
      
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

      {/* Recent Activity Table */}
      <div className="table-container">
        <h3 style={{ padding: '20px', margin: 0, background: 'var(--primary-gradient)', color: 'white' }}>
          Recent Activity
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
                <td>{activity.time}</td>
                <td>{activity.activity}</td>
                <td>{activity.details}</td>
                <td>{activity.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;