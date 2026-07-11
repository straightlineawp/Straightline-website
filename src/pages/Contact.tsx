import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `New Enquiry from Website:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Requirement: ${formData.message}`;
    window.open(`https://wa.me/919811803530?text=${encodeURIComponent(text)}`, '_blank');
  };
  return (
    <div className="min-h-screen bg-brand-50 pb-32">
      
      {/* Visual Header */}
      <div className="relative w-full h-[450px] mb-16 flex flex-col justify-end pb-16">
        <div className="absolute inset-0">
          <img src="/assets/premium-hero.jpg" alt="Contact Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-brand-900/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-50 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow text-brand-300 mb-4 block">Sales & Support</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Get in Touch.</h1>
            <p className="text-xl text-brand-200 max-w-2xl font-light leading-relaxed">
              Whether you need to buy or rent, our team is ready to provide the best aerial work platform solutions for your business.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-50 border border-brand-200 rounded-md flex items-center justify-center text-brand-500 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-900">Phone & WhatsApp</h4>
                <a href="tel:+919811803530" className="text-brand-600 hover:text-brand-accent block mt-1">+91 98118 03530</a>
                <a href="https://wa.me/919811803530" className="text-[#25D366] font-medium hover:underline block mt-1">Chat on WhatsApp</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-50 border border-brand-200 rounded-md flex items-center justify-center text-brand-500 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-900">Email Address</h4>
                <a href="mailto:straightlineawp@gmail.com" className="text-brand-600 hover:text-brand-accent block mt-1">straightlineawp@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-50 border border-brand-200 rounded-md flex items-center justify-center text-brand-500 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-900">Office Location</h4>
                <p className="text-brand-600 mt-1">JHK Cosmic Pvt. Ltd.<br/>New Delhi, India</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-8 md:p-12 border border-brand-200 shadow-xl shadow-brand-900/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <h3 className="text-2xl font-bold text-brand-900 mb-8 relative z-10">Send an Enquiry</h3>
          <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all" placeholder="John Doe" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all" placeholder="john@company.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Phone Number</label>
              <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all" placeholder="+91 xxxxx xxxxx" />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Message / Requirement</label>
              <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-md border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all resize-none" placeholder="I am looking for a 16m articulating boom lift..."></textarea>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-md font-bold hover:bg-[#1DA851] transition-colors shadow-md">
              <MessageCircle size={20} /> WhatsApp Us
            </button>
            <p className="text-xs text-center text-brand-400 mt-4">We will get back to you within 24 hours.</p>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
