import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      setProduct({
        id: id,
        name: "Sample Product",
        description: "Beautiful product description goes here",
        price: 99.99,
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"],
        category: "clothing",
        stock: 10,
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Black", code: "#000" }, { name: "White", code: "#FFF" }],
        rating: 4.5,
        numReviews: 24
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleWishlist = () => {
    addToWishlist(product);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-serif">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud py-12">
      <div className="container-custom">
        <div className="bg-white rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <img src={product.images[0]} alt={product.name} className="w-full rounded-xl" />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
              <p className="text-3xl text-darkaccent font-bold mb-4">${product.price}</p>
              <p className="text-textsecondary mb-6">{product.description}</p>
              
              <div className="space-y-4 mb-6">
                {product.sizes && (
                  <div>
                    <label className="block font-medium mb-2">Size</label>
                    <div className="flex gap-2">
                      {product.sizes.map(size => (
                        <button key={size} onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg ${selectedSize === size ? 'bg-darkaccent text-white' : ''}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.colors && (
                  <div>
                    <label className="block font-medium mb-2">Color</label>
                    <div className="flex gap-2">
                      {product.colors.map(color => (
                        <button key={color.name} onClick={() => setSelectedColor(color.name)}
                          className={`px-4 py-2 border rounded-lg ${selectedColor === color.name ? 'bg-darkaccent text-white' : ''}`}>
                          {color.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block font-medium mb-2">Quantity</label>
                  <div className="flex items-center border rounded-lg w-32">
                    <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="px-3 py-2">-</button>
                    <span className="flex-1 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2">+</button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 btn-primary">Add to Cart</button>
                <button onClick={handleWishlist} className="btn-outline">
                  <FiHeart className={isInWishlist(product.id) ? 'text-red-500' : ''} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;