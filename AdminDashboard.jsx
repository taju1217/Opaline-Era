import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiPackage, FiShoppingBag, FiDollarSign, FiAlertCircle, 
  FiTrendingUp, FiUsers, FiLogOut, FiGrid, FiList,
  FiPlus, FiEdit2, FiTrash2, FiEye, FiClock, FiCheckCircle,
  FiTruck, FiXCircle, FiHome, FiBarChart2, FiSettings
} from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 48,
    totalOrders: 156,
    totalRevenue: 12580,
    lowStock: 3,
    totalCustomers: 89,
    monthlyGrowth: 23.5
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, orderNumber: 'ORD-2024-001', customer: 'John Doe', total: 299.99, status: 'pending', date: '2024-01-15' },
    { id: 2, orderNumber: 'ORD-2024-002', customer: 'Jane Smith', total: 149.99, status: 'processing', date: '2024-01-14' },
    { id: 3, orderNumber: 'ORD-2024-003', customer: 'Mike Johnson', total: 499.99, status: 'shipped', date: '2024-01-13' },
    { id: 4, orderNumber: 'ORD-2024-004', customer: 'Sarah Williams', total: 89.99, status: 'delivered', date: '2024-01-12' },
    { id: 5, orderNumber: 'ORD-2024-005', customer: 'Tom Brown', total: 199.99, status: 'pending', date: '2024-01-11' }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FiClock />,
      processing: <FiPackage />,
      shipped: <FiTruck />,
      delivered: <FiCheckCircle />,
      cancelled: <FiXCircle />
    };
    return icons[status] || <FiClock />;
  };

  const statCards = [
    { 
      title: 'Total Products', 
      value: stats.totalProducts, 
      icon: FiPackage, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/products'
    },
    { 
      title: 'Total Orders', 
      value: stats.totalOrders, 
      icon: FiShoppingBag, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      link: '/admin/orders'
    },
    { 
      title: 'Revenue', 
      value: `$${stats.totalRevenue.toLocaleString()}`, 
      icon: FiDollarSign, 
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      link: '/admin/orders'
    },
    { 
      title: 'Low Stock Alert', 
      value: stats.lowStock, 
      icon: FiAlertCircle, 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      link: '/admin/products'
    }
  ];

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
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-accent/20 text-darkaccent rounded-xl font-medium">
            <FiHome size={20} />
            Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 text-textsecondary hover:bg-cream rounded-xl transition-colors">
            <FiGrid size={20} />
            Products
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-textsecondary hover:bg-cream rounded-xl transition-colors">
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-textprimary">Dashboard</h1>
            <p className="text-textsecondary">Welcome back, Taju! Here's what's happening today.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/products" className="btn-primary flex items-center gap-2">
              <FiPlus size={18} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.link}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-softgray group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    {stat.title === 'Revenue' && (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <FiTrendingUp size={14} />
                        +{stats.monthlyGrowth}%
                      </span>
                    )}
                  </div>
                  <p className="text-textsecondary text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-textprimary">{stat.value}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-softgray">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-semibold text-textprimary">Recent Orders</h2>
            <Link to="/admin/orders" className="text-darkaccent hover:underline text-sm flex items-center gap-1">
              View All <FiEye size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-softgray">
                  <th className="text-left py-3 px-4 text-sm font-medium text-textsecondary">Order #</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-textsecondary">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-textsecondary">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-textsecondary">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-textsecondary">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-textsecondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-softgray hover:bg-cream/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-textprimary">{order.orderNumber}</td>
                    <td className="py-3 px-4 text-textsecondary">{order.customer}</td>
                    <td className="py-3 px-4 text-textsecondary">{order.date}</td>
                    <td className="py-3 px-4 font-semibold text-darkaccent">${order.total}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-cream rounded-lg transition-colors text-textsecondary hover:text-darkaccent">
                          <FiEye size={16} />
                        </button>
                        <button className="p-2 hover:bg-cream rounded-lg transition-colors text-textsecondary hover:text-blue-600">
                          <FiEdit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-darkaccent to-accent rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-white/80 text-sm mb-4">Manage your store efficiently</p>
            <div className="flex gap-2">
              <Link to="/admin/products" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
                Add Product
              </Link>
              <Link to="/admin/orders" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
                View Orders
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-softgray">
            <h3 className="text-lg font-semibold text-textprimary mb-2">Stock Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-textsecondary">In Stock</span>
                <span className="font-medium text-green-600">45 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textsecondary">Low Stock</span>
                <span className="font-medium text-orange-600">3 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textsecondary">Out of Stock</span>
                <span className="font-medium text-red-600">0 items</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-softgray">
            <h3 className="text-lg font-semibold text-textprimary mb-2">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-textsecondary">New order #ORD-2024-006</span>
                <span className="text-textlight text-xs ml-auto">5m ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-textsecondary">Product updated: Silk Dress</span>
                <span className="text-textlight text-xs ml-auto">1h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-textsecondary">Low stock alert: Pearl Necklace</span>
                <span className="text-textlight text-xs ml-auto">3h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;