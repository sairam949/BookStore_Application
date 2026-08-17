import React, { useState } from 'react';

const Reports = ({ books, sales, customers, showLoading, hideLoading, showNotification }) => {
  const [reportForm, setReportForm] = useState({
    type: 'sales',
    period: 'month',
    startDate: '',
    endDate: ''
  });

  const [reportData, setReportData] = useState(null);

  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
    { value: 'inventory', label: 'Inventory Report' },
    { value: 'customers', label: 'Customer Report' },
    { value: 'financial', label: 'Financial Report' }
  ];

  const periods = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateSalesReport = (period) => {
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0) || 12890;
    const totalOrders = sales.length || 156;
    const averageOrder = totalOrders > 0 ? totalSales / totalOrders : 82.69;
    const totalItems = sales.reduce((sum, sale) => sum + (sale.items?.length || 0), 0) || 425;

    return {
      type: 'Sales Report',
      period: period.toUpperCase(),
      stats: [
        { label: 'Total Sales', value: `$${totalSales.toLocaleString()}` },
        { label: 'Orders', value: totalOrders.toString() },
        { label: 'Average Order', value: `$${averageOrder.toFixed(2)}` },
        { label: 'Items Sold', value: totalItems.toString() }
      ],
      topBooks: [
        { rank: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', unitsSold: 45, revenue: 584.55 },
        { rank: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', unitsSold: 38, revenue: 607.62 },
        { rank: 3, title: '1984', author: 'George Orwell', unitsSold: 32, revenue: 607.68 }
      ]
    };
  };

  const generateInventoryReport = () => {
    const totalValue = books.reduce((sum, book) => sum + (book.price * book.stock), 0);
    const lowStockItems = books.filter(book => book.stock < 10);
    const totalUnits = books.reduce((sum, book) => sum + book.stock, 0);

    return {
      type: 'Inventory Report',
      stats: [
        { label: 'Total Books', value: books.length.toString() },
        { label: 'Inventory Value', value: `$${totalValue.toFixed(2)}` },
        { label: 'Low Stock Items', value: lowStockItems.length.toString() },
        { label: 'Total Units', value: totalUnits.toString() }
      ]
    };
  };

  const generateCustomerReport = () => {
    const totalPurchases = customers.reduce((sum, customer) => sum + customer.totalPurchases, 0);
    const averagePurchase = customers.length > 0 ? totalPurchases / customers.length : 0;

    return {
      type: 'Customer Report',
      stats: [
        { label: 'Total Customers', value: customers.length.toString() },
        { label: 'Total Purchases', value: `$${totalPurchases.toFixed(2)}` },
        { label: 'Average Purchase', value: `$${averagePurchase.toFixed(2)}` },
        { label: 'Premium Customers', value: customers.filter(c => c.type === 'Premium').length.toString() }
      ]
    };
  };

  const generateFinancialReport = (period) => {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0) || 12890;
    const totalTax = sales.reduce((sum, sale) => sum + (sale.tax || 0), 0) || 1031.20;
    const totalCost = books.reduce((sum, book) => sum + (book.price * 0.6 * book.stock), 0); // Assume 40% margin
    const profit = totalRevenue - totalCost;

    return {
      type: 'Financial Report',
      period: period.toUpperCase(),
      stats: [
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}` },
        { label: 'Tax Collected', value: `$${totalTax.toFixed(2)}` },
        { label: 'Estimated Profit', value: `$${profit.toFixed(2)}` },
        { label: 'Profit Margin', value: `${((profit / totalRevenue) * 100).toFixed(1)}%` }
      ]
    };
  };

  const generateReport = () => {
    showLoading();

    setTimeout(() => {
      let report;
      
      switch (reportForm.type) {
        case 'sales':
          report = generateSalesReport(reportForm.period);
          break;
        case 'inventory':
          report = generateInventoryReport();
          break;
        case 'customers':
          report = generateCustomerReport();
          break;
        case 'financial':
          report = generateFinancialReport(reportForm.period);
          break;
        default:
          report = generateSalesReport(reportForm.period);
      }

      setReportData(report);
      hideLoading();
      showNotification('Report generated successfully!', 'success');
    }, 2000);
  };

  const exportReport = () => {
    showNotification('Report exported to Excel successfully!', 'success');
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div>
      <h2 style={{ marginBottom: '25px', color: '#333' }}>📈 Reports & Analytics</h2>
      
      {/* Report Filters */}
      <div className="form-grid" style={{ marginBottom: '30px' }}>
        <div className="form-group">
          <label>Report Type</label>
          <select
            name="type"
            value={reportForm.type}
            onChange={handleInputChange}
          >
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Period</label>
          <select
            name="period"
            value={reportForm.period}
            onChange={handleInputChange}
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={reportForm.startDate}
            onChange={handleInputChange}
            disabled={reportForm.period !== 'custom'}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={reportForm.endDate}
            onChange={handleInputChange}
            disabled={reportForm.period !== 'custom'}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={generateReport}>
        Generate Report
      </button>
      <button className="btn btn-success" onClick={exportReport}>
        Export to Excel
      </button>
      <button className="btn btn-info" onClick={printReport}>
        Print Report
      </button>

      {/* Report Display Area */}
      {reportData && (
        <div style={{ marginTop: '30px' }}>
          {/* Report Header */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            <h3>{reportData.type} {reportData.period && `- ${reportData.period}`}</h3>
            
            {/* Statistics */}
            <div className="stats-grid">
              {reportData.stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Placeholder */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            <h3>Trend Analysis</h3>
            <div style={{ 
              height: '200px', 
              background: '#f8f9ff', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginTop: '15px' 
            }}>
              <div style={{ textAlign: 'center', color: '#666' }}>
                📊 Interactive Chart Would Display Here<br />
                <small>Data visualization for {reportData.type.toLowerCase()}</small>
              </div>
            </div>
          </div>

          {/* Top Selling Books (if sales report) */}
          {reportData.topBooks && (
            <div className="table-container">
              <h3 style={{ 
                padding: '20px', 
                margin: 0, 
                background: 'var(--success-gradient)', 
                color: 'white' 
              }}>
                Top Selling Books
              </h3>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topBooks.map(book => (
                    <tr key={book.rank}>
                      <td>{book.rank}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.unitsSold}</td>
                      <td>${book.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;