import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Factory, Wrench, FileCheck, 
  MapPin, Settings, Download, ZoomIn, Building2, HardHat, Warehouse, 
  Plane, Train, Droplet, Sun, Briefcase, Zap, Shield, Globe, Award, MessageCircle, Maximize2, X
} from 'lucide-react';

const Honway = () => {
  const [isCertOpen, setIsCertOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
        {/* Subtle geometric/blueprint background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#0F4AA1 1px, transparent 1px), linear-gradient(90deg, #0F4AA1 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block py-1 px-3 rounded bg-blue-50 text-[#0F4AA1] text-sm font-bold tracking-widest uppercase mb-6 border border-blue-100">
                Official Honway Partnership
              </span>
              <h1 className="text-5xl lg:text-[64px] font-[900] text-[#1E293B] leading-[1.1] mb-6 tracking-tight">
                India's Official Authorized Honway Dealer
              </h1>
              <p className="text-lg lg:text-xl text-[#64748B] leading-relaxed mb-8 max-w-[650px]">
                StraightLine India is the exclusive authorized distributor of Honway Aerial Work Platforms in India, delivering world-class lifting equipment backed by genuine manufacturer support, factory-trained service engineers, nationwide spare parts availability, and industry-leading after-sales support.
              </p>
              
              <ul className="space-y-3 mb-10">
                {[
                  "Official Honway Dealer",
                  "Genuine CBU Imported Machines",
                  "Factory Authorized Warranty",
                  "PAN India Sales & Service",
                  "Genuine Spare Parts"
                ].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.1) }} className="flex items-center gap-3 text-[#334155] font-semibold">
                    <CheckCircle2 className="text-[#0F4AA1]" size={20} /> {item}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#certificate" className="bg-[#F97316] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#EA580C] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                  View Authorization Certificate
                </a>
                <Link to="/category/scissor-lifts" className="bg-white text-[#0F4AA1] border-2 border-[#0F4AA1] px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center gap-2">
                  Explore Products <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Right Side: Partnership Visual */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-[32px] border border-gray-100 shadow-2xl"></div>
              
              <div className="relative z-10 w-full px-12 flex flex-col items-center justify-center gap-12">
                <img src="/assets/straightline-logo-new.png" alt="StraightLine" className="h-16 md:h-24 object-contain filter drop-shadow-md" />
                
                {/* Connecting Element */}
                <div className="w-full flex items-center justify-center relative">
                  <div className="w-[2px] h-16 bg-gradient-to-b from-[#0F4AA1] to-[#22C55E]"></div>
                  <div className="absolute bg-white border-2 border-gray-100 px-4 py-2 rounded-full shadow-md text-sm font-bold text-[#64748B] tracking-wider uppercase">
                    Official Partnership Since 2026
                  </div>
                </div>

                <img src="/assets/honway-logo-new.png" alt="Honway" className="h-16 md:h-24 object-contain filter drop-shadow-md" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TRUST METRICS SECTION ================= */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-gray-100">
            {[
              { num: "25+", text: "Machine Models" },
              { num: "100%", text: "Genuine CBU Imports" },
              { num: "PAN", text: "India Support" },
              { num: "Factory", text: "Authorized Dealer" }
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center px-4 group">
                <h3 className="text-4xl md:text-5xl font-[900] text-[#0F4AA1] mb-2 group-hover:scale-110 transition-transform duration-300">{stat.num}</h3>
                <p className="text-[#64748B] font-bold uppercase tracking-wider text-sm md:text-base">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY STRAIGHTLINE SECTION ================= */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-[48px] font-[900] text-[#1E293B] mb-6 tracking-tight">Why Choose StraightLine?</h2>
            <p className="text-xl text-[#64748B] leading-relaxed">As the official Honway India Distributor, we ensure you receive factory-grade equipment with uncompromising local support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Award size={32} />, title: "Official Manufacturer Authorization", desc: "StraightLine India is officially appointed by Honway Intelligent Manufacturing Technology Co., Ltd. as the exclusive distributor for India." },
              { icon: <ShieldCheck size={32} />, title: "Genuine CBU Imports", desc: "Every machine is imported as a Completely Built Unit (CBU), ensuring factory-level quality, reliability, and safety." },
              { icon: <FileCheck size={32} />, title: "Manufacturer Warranty", desc: "All equipment includes official manufacturer-backed warranty coverage and genuine support." },
              { icon: <Settings size={32} />, title: "Genuine Spare Parts", desc: "Fast availability of original Honway spare parts helps reduce downtime and maximize equipment productivity." },
              { icon: <Wrench size={32} />, title: "Factory Trained Engineers", desc: "Our technical team receives manufacturer training for diagnostics, commissioning, preventive maintenance, and repairs." },
              { icon: <MapPin size={32} />, title: "Nationwide Support", desc: "Sales, installation, training, spare parts, and after-sales support available across India." }
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-blue-50 text-[#0F4AA1] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0F4AA1] group-hover:text-white transition-colors duration-300">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1E293B] mb-4">{card.title}</h3>
                <p className="text-[#64748B] text-lg leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OFFICIAL CERTIFICATE SECTION ================= */}
      <section id="certificate" className="py-24 bg-[#0F172A] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0F4AA1] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F97316] rounded-full blur-[120px] opacity-10 translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-[48px] font-[900] text-white mb-6 tracking-tight">Official Honway Authorization Certificate</h2>
            <p className="text-xl text-blue-200 leading-relaxed">
              StraightLine India is officially authorized by Honway Intelligent Manufacturing Technology Co., Ltd. to distribute and sell Honway Aerial Work Platforms across India.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center">
            {/* Certificate Preview */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="xl:col-span-7">
              <div 
                className="relative bg-white/5 backdrop-blur-md p-4 md:p-8 rounded-[32px] border border-white/10 shadow-2xl cursor-zoom-in group"
                onClick={() => setIsCertOpen(true)}
              >
                <div className="relative rounded-[20px] overflow-hidden bg-white">
                  <img src="/assets/certificate-new.jpg" alt="Official Honway Authorization Certificate" loading="lazy" className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white text-[#0F4AA1] p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn size={32} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Points & Actions */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="xl:col-span-5 flex flex-col justify-center">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[24px] border border-white/10">
                <ul className="space-y-6 mb-10">
                  {[
                    "Official Manufacturer Authorization",
                    "Valid from June 1, 2026",
                    "Authorized for Sales & Distribution Across India",
                    "Issued by Honway Intelligent Manufacturing Technology Co., Ltd."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <ShieldCheck className="text-[#F97316] shrink-0 mt-1" size={24} />
                      <span className="text-lg text-white font-medium leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button onClick={() => setIsCertOpen(true)} className="flex-1 bg-[#F97316] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#EA580C] transition-colors flex items-center justify-center gap-2">
                    <ZoomIn size={20} /> View Full Certificate
                  </button>
                  <a href="/assets/certificate-new.jpg" download className="flex-1 bg-white/10 text-white border border-white/20 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                    <Download size={20} /> Download
                  </a>
                </div>

                <p className="text-sm text-blue-200/60 leading-relaxed border-t border-white/10 pt-6">
                  Manufacturer authorization independently verifies StraightLine India's official dealership status for Honway products in India.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= WHY HONWAY SECTION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="/assets/Honway%20Center.png" alt="Honway Equipment" className="rounded-[32px] shadow-2xl object-cover h-[500px] w-full" />
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-[48px] font-[900] text-[#1E293B] mb-6 tracking-tight">Why Honway?</h2>
              <p className="text-lg md:text-xl text-[#64748B] leading-relaxed mb-10">
                Honway is recognized globally for manufacturing reliable aerial work platforms that combine advanced engineering, operator safety, and long-term durability. Their equipment is trusted across construction, infrastructure, warehousing, industrial maintenance, airports, logistics, manufacturing, and energy projects worldwide.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Shield size={24}/>, text: "Advanced Safety Systems" },
                  { icon: <Building2 size={24}/>, text: "High Structural Stability" },
                  { icon: <Zap size={24}/>, text: "Energy Efficient Electric Models" },
                  { icon: <Factory size={24}/>, text: "Powerful Diesel Models" },
                  { icon: <Settings size={24}/>, text: "Low Maintenance" },
                  { icon: <Globe size={24}/>, text: "International Manufacturing Standards" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0F4AA1] flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-[#1E293B] font-bold">{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES WE SERVE ================= */}
      <section className="py-24 bg-[#F8FAFC] border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-[48px] font-[900] text-[#1E293B] mb-6 tracking-tight">Industries We Serve</h2>
            <p className="text-xl text-[#64748B] leading-relaxed">Delivering reliable elevated access solutions across major sectors in India.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { icon: <HardHat size={24} />, name: "Construction" },
              { icon: <Train size={24} />, name: "Infrastructure" },
              { icon: <Factory size={24} />, name: "Manufacturing" },
              { icon: <Warehouse size={24} />, name: "Warehousing" },
              { icon: <Wrench size={24} />, name: "Industrial Maintenance" },
              { icon: <Plane size={24} />, name: "Airports" },
              { icon: <Train size={24} />, name: "Metro Rail" },
              { icon: <Droplet size={24} />, name: "Oil & Gas" },
              { icon: <Sun size={24} />, name: "Renewable Energy" },
              { icon: <Building2 size={24} />, name: "Commercial Buildings" }
            ].map((industry, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-sm flex items-center gap-3 hover:border-[#0F4AA1] hover:shadow-md transition-all cursor-default">
                <span className="text-[#0F4AA1]">{industry.icon}</span>
                <span className="font-bold text-[#334155]">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CUSTOMERS TRUST US ================= */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-[42px] font-[900] text-[#1E293B] mb-12 tracking-tight text-center">Why Customers Trust Us</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Official Manufacturer Partnership", "Genuine Imported Equipment", 
              "Reliable After Sales Support", "Expert Technical Assistance", 
              "PAN India Delivery", "Competitive Pricing", 
              "Fast Spare Parts Supply", "Factory Warranty"
            ].map((trust, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#F8FAFC] border border-gray-200 rounded-full px-6 py-3 flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-[#0F4AA1] transition-colors">
                <CheckCircle2 size={18} className="text-[#F97316]" />
                <span className="font-bold text-[#475569]">{trust}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0F4AA1]">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#1E3A8A] to-transparent"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-[900] text-white mb-6 tracking-tight max-w-3xl mx-auto">
            Looking for Reliable Aerial Work Platforms?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our specialists help businesses select the right Scissor Lift, Articulated Boom Lift, or Telescopic Boom Lift backed by genuine manufacturer support.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/products" className="bg-white text-[#0F4AA1] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              View Products
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Contact Our Team
            </Link>
            <a href="https://wa.me/919811803530" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1DA851] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
              <MessageCircle size={24} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox for Certificate */}
      {isCertOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setIsCertOpen(false)}>
          <button className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[110]" onClick={() => setIsCertOpen(false)}>
            <X size={36} />
          </button>
          <img 
            src="/assets/certificate-new.jpg" 
            alt="Official Honway Certificate Full View" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
};

export default Honway;
