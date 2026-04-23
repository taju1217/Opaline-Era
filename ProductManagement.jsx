import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter,
  FiPackage, FiHome, FiShoppingBag, FiUsers, FiBarChart2, FiSettings, FiLogOut
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Silk Evening Gown', category: 'Clothing', price: 299.99, stock: 15, status: 'active', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100' },
    { id: 2, name: 'Pearl Necklace', category: 'Jewelry', price: 189.99, stock: 5, status: 'low', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100' },
    { id: 3, name: 'Leather Tote', category: 'Accessories', price: 199.99, stock: 25, status: 'active', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100' },
    { id: 4, name: 'Cashmere Scarf', category: 'Accessories', price: 89.99, stock: 0, status: 'out', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=100' },
    { id: 5, name: 'Gold Bracelet', category: 'Jewelry', price: 249.99, stock: 8, status: 'low', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100' }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-700',
      low: 'bg-orange-100 text-orange-700',
      out: 'bg-red-100 text-red-700'
    };
    const labels = {
      active: 'In Stock',
      low: 'Low Stock',
      out: 'Out of Stock'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
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
          <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 bg-accent/20 text-darkaccent rounded-xl font-medium">
            <FiPackage size={20} />
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
            <h1 className="text-3xl font-serif font-bold text-textprimary">Products</h1>
            <p className="text-textsecondary">Manage your product inventory</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <FiPlus size={18} />
            Add New Product
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-softgray flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-textlight" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-cream/50 border border-softgray rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button className="btn-outline flex items-center gap-2">
            <FiFilter size={18} />
            Filter
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-softgray overflow-hidden">
          <table className="w-full">
            <thead className="bg-cream border-b border-softgray">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Product</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Category</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Price</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Stock</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-textsecondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-softgray hover:bg-cream/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium text-textprimary">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-textsecondary">{product.category}</td>
                  <td className="py-4 px-6 font-semibold text-darkaccent">${product.price}</td>
                  <td className="py-4 px-6 text-textsecondary">{product.stock}</td>
                  <td className="py-4 px-6">{getStatusBadge(product.status)}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-cream rounded-lg transition-colors text-textsecondary hover:text-blue-600">
                        <FiEdit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-cream rounded-lg transition-colors text-textsecondary hover:text-red-600">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-textsecondary">Showing 1-5 of {products.length} products</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-softgray rounded-lg text-textsecondary hover:bg-cream transition-colors">Previous</button>
            <button className="px-4 py-2 bg-darkaccent text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-softgray rounded-lg text-textsecondary hover:bg-cream transition-colors">2</button>
            <button className="px-4 py-2 border border-softgray rounded-lg text-textsecondary hover:bg-cream transition-colors">3</button>
            <button className="px-4 py-2 border border-softgray rounded-lg text-textsecondary hover:bg-cream transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;