import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-brand-900"
        >
          Elevating <br />Industry Standards.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-brand-600 mb-16 leading-relaxed"
        >
          Straightline is a premier brand of JHK Cosmic Pvt. Ltd., headquartered in New Delhi, India. 
          We are dedicated to providing the Indian market with top-tier aerial work platforms, prioritizing safety, reliability, and unparalleled reach.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-brand-50 rounded-3xl p-12 aspect-square flex flex-col justify-center"
        >
          <h3 className="text-3xl font-bold mb-4 text-brand-900">Our Mission</h3>
          <p className="text-brand-700 text-lg">
            To empower Indian industries with world-class access equipment, ensuring every high-reach job is executed safely, efficiently, and with total confidence.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-900 rounded-3xl p-12 aspect-square flex flex-col justify-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-accent/10 pointer-events-none" />
          <h3 className="text-3xl font-bold mb-4">Why Straightline?</h3>
          <ul className="space-y-4 text-brand-200 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-brand-accent font-bold">✓</span> Exclusive Honway partner
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-accent font-bold">✓</span> Pan-India sales and support
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-accent font-bold">✓</span> Uncompromising quality standards
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-accent font-bold">✓</span> Expert technical consultation
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
