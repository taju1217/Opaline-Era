import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/Products/ProductCard';
import ProductFilters from '../components/Products/ProductFilters';
import QuickView from '../components/Products/QuickView';
import { productAPI } from '../services/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback data
      const fallbackProducts = [
        { id: 1, name: "Silk Blouse", price: 89.99, category: "clothing", stock: 15, rating: 4.5, images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"] },
        { id: 2, name: "Wool Trousers", price: 129.99, category: "clothing", stock: 8, rating: 4.0, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"] },
        { id: 3, name: "Leather Belt", price: 49.99, category: "accessories", stock: 25, rating: 4.8, images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400"] },
        { id: 4, name: "Gold Necklace", price: 199.99, category: "jewelry", stock: 5, rating: 4.9, images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400"] },
        { id: 5, name: "Ceramic Vase", price: 79.99, category: "home", stock: 12, rating: 4.3, images: ["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400"] },
        { id: 6, name: "Silk Scarf", price: 39.99, category: "accessories", stock: 30, rating: 4.6, images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400"] }
      ];
      setProducts(fallbackProducts);
      setFilteredProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    // Sorting
    switch (filters.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-cloud py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">Our Collection</h1>
          <p className="text-textsecondary">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="loader"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-textsecondary text-lg">No products found</p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;