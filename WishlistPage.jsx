import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Your wishlist is empty</h2>
          <Link to="/products" className="btn-primary">Explore Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud py-12">
      <div className="container-custom">
        <h1 className="section-title mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <motion.div key={product.id} className="card p-4">
              <img src={product.images?.[0]} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="font-medium mb-2">{product.name}</h3>
              <p className="text-darkaccent font-semibold mb-4">${product.price}</p>
              <div className="flex gap-2">
                <button onClick={() => addToCart(product)} className="flex-1 btn-primary text-sm">Add to Cart</button>
                <button onClick={() => removeFromWishlist(product.id)} className="btn-outline">
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;