import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import Categories from '../components/Home/Categories';
import { motion } from 'framer-motion';

const HomePage = () => {
  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On orders over $100"
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure transactions"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Dedicated customer service"
    }
  ];

  return (
    <div>
      <Hero />
      <FeaturedProducts />
      
      {/* Features Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-serif font-semibold text-textprimary mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-textsecondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Categories />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-darkaccent to-accent">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Join the Opaline Era Community
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Sign up for exclusive offers, early access to new collections, and style inspiration
            </p>
            <form className="max-w-md mx-auto flex gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-full bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-darkaccent px-8 py-3 rounded-full font-medium hover:bg-cream transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;