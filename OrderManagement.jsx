import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiPackage, FiHome, FiShoppingBag, FiUsers, FiBarChart2, FiSettings, FiLogOut,
  FiSearch, FiFilter, FiEye, FiCheckCircle, FiTruck, FiClock, FiXCircle
} from 'react-icons/fi';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    { id: 1, orderNumber: 'ORD-2024-001', customer: 'John Doe', email: 'john@email.com', date: '2024-01-15', total: 299.99, status: 'pending', items: 3 },
    { id: 2, orderNumber: 'ORD-2024-002', customer: 'Jane Smith', email: 'jane@email.com', date: '2024-01-14', total: 149.99, status: 'processing', items: 2 },
    { id: 3, orderNumber: 'ORD-2024-003', customer: 'Mike Johnson', email: 'mike@email.com', date: '2024-01-13', total: 499.99, status: 'shipped', items: 5 },
    { id: 4, orderNumber: 'ORD-2024-004', customer: 'Sarah Williams', email: 'sarah@email.com', date: '2024-01-12', total: 89.99, status: 'delivered', items: 1 },
    { id: 5, orderNumber: 'ORD-2024-005', customer: 'Tom Brown', email: 'tom@email.com', date: '2024-01-11', total: 199.99, status: 'cancelled', items: 2 }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: <FiClock size={14} /> },
      processing: { color: 'bg-blue-100 text-blue-700', icon: <FiPackage size={14} /> },
      shipped: { color: 'bg-purple-100 text-purple-700', icon: <FiTruck size={14} /> },
      delivered: { color: 'bg-green-100 text-green-700', icon: <FiCheckCircle size={14} /> },
      cancelled: { color: 'bg-red-100 text-red-700', icon: <FiXCircle size={14} /> }
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.icon}
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cloud to-cream">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-softgray p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-textprimary">
            Opaline<span className="text-darkaccent">Era</span>
          </h2>
          <p className="text-xs text-textsecondary mt-1">Admin Dashboard</p>
        </div>

        <nav className="space-y-1">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-textsecondary hover:bg-cream rounded-xl transition-colors">
            <FiHome size={20} />
            Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 text-textsecondary hover:bg-cream rounded-xl transition-colors">
            <FiPackage size={20} />
            Products
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 bg-accent/20 text-darkaccent rounded-xl font-medium">
            <FiShoppingBag size={20} />
            Orders
          </Link>
          <Link to="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-textsecondary hover:bg-cream rounded-xl transition-colors">
            <FiUsers size={20} />
            Customers
          </Link>
          <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-3 text-textsecondary hover:bg-cream rounded-xl transition-colors">
            <FiBarChart2 size={20} />
            Analytics
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-textsecondary hover:bg-cream rounded-xl transition-colors">
            <FiSettings size={20} />
            Settings
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-textprimary">Orders</h1>
          <p className="text-textsecondary">Manage and track customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-softgray">
            <p className="text-textsecondary text-sm">All Orders</p>
            <p className="text-2xl font-bold text-textprimary">{orders.length}</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <p className="text-yellow-700 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-700">{orders.filter(o => o.status === 'pending').length}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-blue-700 text-sm">Processing</p>
            <p className="text-2xl font-bold text-blue-700">{orders.filter(o => o.status === 'processing').length}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <p className="text-purple-700 text-sm">Shipped</p>
            <p className="text-2xl font-bold text-purple-700">{orders.filter(o => o.status === 'shipped').length}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="text-green-700 text-sm">Delivered</p>
            <p className="text-2xl font-bold text-green-700">{orders.filter(o => o.status === 'delivered').length}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-softgray flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-textlight" />
            <input
              type="text"
              placeholder="Search orders by number or customer..."
              className="w-full pl-12 pr-4 py-3 bg-cream/50 border border-softgray rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button className="btn-outline flex items-center gap-2">
            <FiFilter size={18} />
            Filter
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-softgray overflow-hidden">
          <table className="w-full">
            <thead className="bg-cream border-b border-softgray">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Order #</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Items</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Total</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-softgray hover:bg-cream/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-textprimary">{order.orderNumber}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-textprimary">{order.customer}</p>
                      <p className="text-sm text-textsecondary">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-textsecondary">{order.date}</td>
                  <td className="py-4 px-6 text-textsecondary">{order.items} items</td>
                  <td className="py-4 px-6 font-semibold text-darkaccent">${order.total}</td>
                  <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-cream rounded-lg transition-colors text-textsecondary hover:text-darkaccent">
                      <FiEye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;