import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cloud">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-serif font-semibold mb-4">Your cart is empty</h2>
          <p className="text-textsecondary mb-8">Add some items to your cart to continue shopping</p>
          <Link to="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud py-12">
      <div className="container-custom">
        <h1 className="section-title mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl border border-softgray overflow-hidden">
              <div className="p-6 border-b border-softgray">
                <h2 className="font-serif text-xl font-semibold">Items ({cart.length})</h2>
              </div>

              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.cartItemId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 border-b border-softgray last:border-0"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.images?.[0] || 'https://via.placeholder.com/100'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-darkaccent transition-colors">
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-textlight hover:text-red-500 transition-colors"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>

                        {item.size && (
                          <p className="text-sm text-textsecondary mb-1">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-sm text-textsecondary mb-2">Color: {item.color}</p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-softgray rounded-full">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="p-2 hover:text-darkaccent transition-colors"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="p-2 hover:text-darkaccent transition-colors"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          <p className="font-semibold text-darkaccent">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl border border-softgray p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-textsecondary">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textsecondary">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textsecondary">Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-softgray pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-darkaccent">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <FiArrowRight size={18} />
              </Link>

              <p className="text-xs text-textsecondary text-center mt-4">
                Free shipping on orders over $100
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;