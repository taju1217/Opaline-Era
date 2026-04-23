import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';

const OrderConfirmation = () => {
  const { orderNumber } = useParams();

  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center py-12">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-12 max-w-2xl text-center">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="text-3xl font-serif font-bold mb-4">Order Confirmed!</h1>
        <p className="text-textsecondary mb-6">Thank you for your purchase</p>
        <div className="bg-cream rounded-lg p-6 mb-6">
          <p className="text-sm mb-2">Order Number</p>
          <p className="text-2xl font-bold text-darkaccent">{orderNumber || 'ORD-2024-001'}</p>
        </div>
        <Link to="/" className="btn-primary inline-block">Continue Shopping</Link>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;