// import React, { useState } from 'react';

// const Customers = ({ customers, setCustomers, showLoading, hideLoading, showNotification, showModal }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [customerForm, setCustomerForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     type: 'Regular',
//     address: ''
//   });

//   const customerTypes = ['Regular', 'Premium', 'Student', 'Senior'];

//   const filteredCustomers = customers.filter(customer =>
//     customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.phone.includes(searchTerm)
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     showLoading();

//     setTimeout(() => {
//       if (editingCustomer) {
//         // Update existing customer
//         setCustomers(prev => prev.map(customer =>
//           customer.id === editingCustomer.id
//             ? { ...customer, ...customerForm }
//             : customer
//         ));
//         showNotification('Customer updated successfully!', 'success');
//         setEditingCustomer(null);
//       } else {
//         // Add new customer
//         const newCustomer = {
//           id: Math.max(...customers.map(c => c.id), 0) + 1,
//           ...customerForm,
//           totalPurchases: 0,
//           lastVisit: new Date().toISOString().split('T')[0]
//         };
//         setCustomers(prev => [...prev, newCustomer]);
//         showNotification('Customer added successfully!', 'success');
//       }

//       clearForm();
//       hideLoading();
//     }, 1000);
//   };

//   const clearForm = () => {
//     setCustomerForm({
//       name: '',
//       email: '',
//       phone: '',
//       type: 'Regular',
//       address: ''
//     });
//     setEditingCustomer(null);
//   };

//   const editCustomer = (customer) => {
//     setCustomerForm({
//       name: customer.name,
//       email: customer.email,
//       phone: customer.phone,
//       type: customer.type,
//       address: customer.address || ''
//     });
//     setEditingCustomer(customer);
//     showNotification('Customer loaded for editing', 'info');
//   };

//   const deleteCustomer = (id) => {
//     showModal('Delete Customer', 'Are you sure you want to delete this customer?', () => {
//       setCustomers(prev => prev.filter(customer => customer.id !== id));
//       showNotification('Customer deleted successfully!', 'success');
//     });
//   };

//   const viewCustomer = (customer) => {
//     showModal('Customer Details',
//       `Name: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nType: ${customer.type}\nTotal Purchases: $${customer.totalPurchases.toFixed(2)}\nLast Visit: ${customer.lastVisit}`
//     );
//   };

//   const getTypeClass = (type) => {
//     switch (type) {
//       case 'Premium': return 'high';
//       case 'Student': return 'medium';
//       case 'Senior': return 'info';
//       default: return 'low';
//     }
//   };

//   return (
//     <div>
//       <h2 style={{ marginBottom: '25px', color: '#333' }}>👥 Customer Management</h2>

//       {/* Add/Edit Customer Form */}
//       <form onSubmit={handleSubmit}>
//         <div className="form-grid">
//           <div className="form-group">
//             <label>Full Name *</label>
//             <input
//               type="text"
//               name="name"
//               value={customerForm.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={customerForm.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={customerForm.phone}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Customer Type</label>
//             <select
//               name="type"
//               value={customerForm.type}
//               onChange={handleInputChange}
//             >
//               {customerTypes.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group full-width">
//             <label>Address</label>
//             <textarea
//               name="address"
//               placeholder="Customer address..."
//               value={customerForm.address}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {editingCustomer ? 'Update Customer' : 'Add Customer'}
//         </button>
//         <button type="button" className="btn btn-warning" onClick={clearForm}>
//           Clear Form
//         </button>
//       </form>

//       {/* Customer Search */}
//       <div className="search-container">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search customers by name, email, or phone..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <span className="search-icon">🔍</span>
//       </div>

//       {/* Customers Table */}
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Type</th>
//               <th>Total Purchases</th>
//               <th>Last Visit</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCustomers.map(customer => (
//               <tr key={customer.id}>
//                 <td>#{String(customer.id).padStart(3, '0')}</td>
//                 <td>{customer.name}</td>
//                 <td>{customer.email}</td>
//                 <td>{customer.phone}</td>
//                 <td>
//                   <span className={`stock-badge stock-${getTypeClass(customer.type)}`}>
//                     {customer.type}
//                   </span>
//                 </td>
//                 <td>${customer.totalPurchases.toFixed(2)}</td>
//                 <td>{customer.lastVisit}</td>
//                 <td className="table-actions">
//                   <button className="btn btn-sm btn-info" onClick={() => viewCustomer(customer)}>
//                     View
//                   </button>
//                   <button className="btn btn-sm btn-warning" onClick={() => editCustomer(customer)}>
//                     Edit
//                   </button>
//                   <button className="btn btn-sm btn-danger" onClick={() => deleteCustomer(customer.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Customers;
