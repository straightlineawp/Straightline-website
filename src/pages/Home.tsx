import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Activity, TrendingUp, Maximize, Target, Battery, Settings, BatteryCharging, Wrench, Shield, CheckCircle2, Package, Truck, Headset, ShieldCheck, Award, X } from 'lucide-react';
import Hero from '../components/Hero';
import { getCategories } from '../data/api';
import specsJson from '../../straightline_honway_specs.json';

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const categories = getCategories();
  const location = useLocation();
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCertModalOpen(false);
    };
    if (isCertModalOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isCertModalOpen]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  
  const categoryImages = {
    'articulated-boom-lifts': '/assets/articulated-diesel/articulated-diesel-3.webp',
    'telescopic-boom-lifts': '/assets/telescopic-diesel/telescopic-diesel-1.webp',
    'scissor-lifts': '/assets/self-propelled-scissor-lift/scissor-lift-1.webp'
  };

  // Calculate stats from specs data
  const numCategories = specsJson.categories.length;
  let maxConfirmedHeight = 0;
  let maxLoadCapacity = 0;

  specsJson.categories.forEach((cat: any) => {
    cat.subcategories.forEach((sub: any) => {
      sub.models.forEach((model: any) => {
        const heightVal = typeof model.maxWorkingHeightM === 'number' 
          ? model.maxWorkingHeightM 
          : parseFloat(String(model.maxWorkingHeightM).split('-').pop() || '0');
        
        // Cap at 28.8m for estimated models
        if (model.matchType !== 'estimated' || heightVal <= 28.8) {
          if (heightVal > maxConfirmedHeight) maxConfirmedHeight = heightVal;
        }

        const capStr = String(model.safeWorkingLoadKg || model.maxLoadCapacityKg || '0');
        const capMatch = capStr.match(/\d+/g);
        if (capMatch) {
          const maxCap = Math.max(...capMatch.map(Number));
          if (maxCap > maxLoadCapacity) maxLoadCapacity = maxCap;
        }
      });
    });
  });

  return (
    <div className="w-full">
      <Hero />
      

      {/* Categories */}
      <section id="categories" className="py-16 lg:py-24 md:py-32 bg-[#F8F9FA] mt-[90px]">
        <div className="max-w-[1400px] mx-auto lg:px-8 xl:px-12">
          
          <FadeIn className="px-4 lg:px-0">
            <div className="w-full h-[2px] lg:h-[3px] bg-[#0B5ED7] mb-8 lg:mb-12"></div>
            <div className="mb-6 lg:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-[12px] lg:gap-6">
              <div className="max-w-2xl">
                <span className="flex items-center gap-2 text-[#0B5ED7] font-bold tracking-[2px] uppercase text-[12px] mb-3 lg:mb-4">
                  Our Fleet
                </span>
                <h2 className="font-barlow font-bold uppercase text-4xl md:text-[56px] leading-[1.05] tracking-[0.5px] text-[#1D2433]">
                  Equipment Fleet
                </h2>
              </div>
              <p className="text-[#4B5563] text-[14px] lg:text-[15px] lg:text-right font-[400] leading-[1.7]">
                Explore our comprehensive range of high-performance aerial work platforms <br className="hidden sm:block" />
                designed for safety, reach, and efficiency.
              </p>
            </div>
          </FadeIn>

          {/* Stats Bar (Responsive) */}
          <FadeIn className="flex items-center gap-6 lg:gap-12 py-4 lg:py-6 border-y border-gray-200 mb-8 lg:mb-12 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pl-4 lg:pl-0 pr-4 lg:pr-0">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-2xl lg:text-3xl font-barlow font-bold text-[#1D2433]">{numCategories}</span>
              <span className="text-[11px] lg:text-[13px] font-bold text-gray-500 uppercase tracking-wide">Equipment<br/>Categories</span>
            </div>
            <div className="w-px h-8 lg:h-10 bg-gray-200 shrink-0"></div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-2xl lg:text-3xl font-barlow font-bold text-[#1D2433]">{maxConfirmedHeight}m</span>
              <span className="text-[11px] lg:text-[13px] font-bold text-gray-500 uppercase tracking-wide">Max Working<br/>Height</span>
            </div>
            <div className="w-px h-8 lg:h-10 bg-gray-200 shrink-0"></div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-2xl lg:text-3xl font-barlow font-bold text-[#1D2433]">{maxLoadCapacity}kg</span>
              <span className="text-[11px] lg:text-[13px] font-bold text-gray-500 uppercase tracking-wide">Max Load<br/>Capacity</span>
            </div>
          </FadeIn>

          {/* Unified Grid/Scroll Layout */}
          <div className="flex lg:grid lg:grid-cols-3 gap-[12px] lg:gap-6 px-4 lg:px-0 pb-2 lg:pb-0 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
            {categories.map((cat, i) => {
              const isScissor = cat.slug === 'scissor-lifts';
              const badgeText = isScissor ? "Diesel and Electric" : "Diesel and electric";
              const badgeColors = isScissor ? "bg-green-100 text-green-800 border-green-200" : "bg-blue-100 text-blue-800 border-blue-200";
              
              let desc = "";
              let spec1 = "";
              let spec2 = "";
              let spec3 = "";
              
              if (cat.slug === 'articulated-boom-lifts') {
                desc = "Versatile lifts with up-and-over capability, perfect for complex infrastructure and maintenance tasks. Available in both diesel and electric drivetrains.";
                spec1 = "18m - 28.8m";
                spec2 = "Up to 300kg";
                spec3 = "±80°/±90°";
              } else if (cat.slug === 'telescopic-boom-lifts') {
                desc = "Engineered for maximum horizontal reach and heavy-duty construction applications. Available in high-performance diesel or zero-emission electric variants.";
                spec1 = "18m - 28.8m";
                spec2 = "Up to 300kg";
                spec3 = "±80°/±90°";
              } else {
                desc = "Highly stable vertical lifting platforms ideal for indoor facility management, warehousing, and smooth surface operations. Powered by clean, quiet electric motors.";
                spec1 = "5m - 22m";
                spec2 = "Up to 500kg";
                spec3 = "Battery/electric";
              }

              return (
                <FadeIn key={cat.slug} delay={i * 0.1} className="w-[78%] shrink-0 lg:w-auto snap-start lg:snap-align-none">
                  <Link to={`/category/${cat.slug}`} className="group h-full flex flex-col bg-white border-[0.5px] border-gray-200 rounded-[12px] overflow-hidden transition-all duration-150 ease-out lg:hover:-translate-y-[2px] lg:hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] active:scale-[0.98] lg:active:scale-100 block">
                    <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img 
                        src={categoryImages[cat.slug as keyof typeof categoryImages]} 
                        alt={cat.category} 
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-3 left-3 lg:top-4 lg:left-4 px-3 py-1 rounded-full text-[10px] lg:text-[11px] font-bold tracking-wide uppercase border ${badgeColors}`}>
                        {badgeText}
                      </div>
                    </div>
                    
                    <div className="px-[14px] py-[12px] lg:p-6 flex flex-col flex-grow">
                      <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1D2433] mb-2 lg:mb-3">{cat.category}</h3>
                      <p className="text-[13px] lg:text-[13.5px] text-gray-500 leading-[1.5] lg:leading-[1.6] mb-4 lg:mb-6 line-clamp-2">
                        {desc}
                      </p>
                      
                      <div className="flex gap-2 mb-4 lg:mb-8 mt-auto flex-wrap">
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 lg:px-2.5 lg:py-1.5 rounded-[4px] border border-gray-100">
                          <Maximize size={12} className="text-gray-400 lg:w-[14px] lg:h-[14px]" />
                          <span className="text-[10px] lg:text-[11px] font-bold text-gray-600 uppercase">{spec1}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 lg:px-2.5 lg:py-1.5 rounded-[4px] border border-gray-100">
                          <Target size={12} className="text-gray-400 lg:w-[14px] lg:h-[14px]" />
                          <span className="text-[10px] lg:text-[11px] font-bold text-gray-600 uppercase">{spec2}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 lg:px-2.5 lg:py-1.5 rounded-[4px] border border-gray-100">
                          {isScissor ? <BatteryCharging size={12} className="text-gray-400 lg:w-[14px] lg:h-[14px]" /> : <Settings size={12} className="text-gray-400 lg:w-[14px] lg:h-[14px]" />}
                          <span className="text-[10px] lg:text-[11px] font-bold text-gray-600 uppercase">{spec3}</span>
                        </div>
                      </div>
                      
                      <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#0B5ED7] lg:group-hover:text-[#0a48a0] transition-colors mt-auto min-h-[44px] lg:min-h-0 py-2 lg:py-0 -ml-2 pl-2">
                        View details <ArrowRight size={16} className="transition-transform lg:group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          <div className="flex justify-center mt-6 lg:mt-12 px-4 lg:px-0 mb-4 lg:mb-0">
            <Link to="/products" className="bg-white border-2 border-gray-200 text-[#1D2433] hover:border-[#0B5ED7] hover:text-[#0B5ED7] w-full lg:w-auto h-[44px] lg:h-auto flex items-center justify-center px-8 py-3 rounded-[4px] text-[13px] font-bold tracking-wide transition-all duration-300">
              VIEW ALL EQUIPMENT
            </Link>
          </div>
          
          <FadeIn className="mt-12 lg:mt-16 px-4 lg:px-0 text-center max-w-4xl mx-auto">
            <p className="text-[#4B5563] text-[14px] md:text-[15px] leading-[1.8]">
              STRAIGHTLINE offers a complete range of Boom Lifts, Scissor Lifts, and Aerial Work Platforms (AWPs) designed for safe, efficient, and reliable work at height. From Articulated Boom Lifts and Telescopic Boom Lifts to Electric, Mini, Rough Terrain, and Crawler Scissor Lifts, our equipment is built to meet the demands of construction, industrial maintenance, warehousing, infrastructure, and commercial projects across India.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">
          
          <div className="w-full h-[2px] lg:h-[3px] bg-[#0B3D91] mb-8 lg:mb-12"></div>
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            {/* Left Column (40%) */}
            <FadeIn className="w-full lg:w-[40%] lg:sticky lg:top-32">
              <span className="flex items-center gap-2 text-[#0B3D91] font-bold tracking-[2px] uppercase text-[12px] mb-4">
                Why StraightLine
              </span>
              <h2 className="font-barlow font-bold uppercase text-[36px] md:text-[48px] leading-[1.1] tracking-[0.5px] text-[#1D2433] mb-6">
                Why Businesses Choose <br className="hidden lg:block"/> <span className="text-[#0B3D91]">StraightLine India</span>
              </h2>
              <p className="text-[14px] md:text-[15px] text-gray-600 mb-8 font-[400] leading-[1.8]">
                At StraightLine India, we are committed to delivering world-class <strong className="font-bold text-[#1D2433]">Aerial Work Platforms (AWPs)</strong> that combine advanced engineering, superior safety, and exceptional performance. Our extensive product portfolio includes <strong className="font-bold text-[#1D2433]">Scissor Lifts, Articulated Boom Lifts, Telescopic Boom Lifts</strong>, and specialized access equipment, providing reliable solutions for construction, infrastructure, warehousing, manufacturing, logistics, airports, facility management, and industrial maintenance projects throughout India. Every machine is carefully selected and thoroughly inspected to ensure consistent quality, durability, and operational efficiency in demanding work environments. With a robust inventory of ready-to-deploy Completely Built-Up (CBU) units, fast nationwide delivery, genuine spare parts, responsive technical assistance, and comprehensive after-sales support, we help businesses reduce downtime, increase productivity, and operate with complete confidence. By combining premium equipment with customer-focused service, StraightLine India has become a trusted partner for organizations seeking reliable, high-performance aerial access solutions across the country.
              </p>
              <Link 
                to="/products" 
                className="group inline-flex items-center justify-center gap-3 bg-[#0B3D91] hover:bg-[#082a66] text-white px-8 py-4 rounded-[4px] text-[13px] font-bold tracking-wide transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_20px_rgba(11,61,145,0.2)] w-full sm:w-auto"
              >
                EXPLORE OUR SOLUTIONS <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>

            {/* Right Column (60%) */}
            <div className="w-full lg:w-[60%] grid grid-cols-2 gap-3 sm:gap-6">
              {[
                {
                  icon: Package,
                  title: "Ready CBU Inventory",
                  desc: "Immediate equipment availability."
                },
                {
                  icon: Truck,
                  title: "Nationwide Delivery",
                  desc: "Fast delivery across India."
                },
                {
                  icon: Wrench,
                  title: "Genuine Spare Parts",
                  desc: "Original components for maximum uptime."
                },
                {
                  icon: Headset,
                  title: "Expert Technical Support",
                  desc: "Skilled engineers and responsive assistance."
                },
                {
                  icon: ShieldCheck,
                  title: "Quality Tested Equipment",
                  desc: "Every machine undergoes rigorous inspection."
                },
                {
                  icon: Award,
                  title: "Trusted Industry Partner",
                  desc: "Reliable aerial work platform solutions for every industry."
                }
              ].map((feature, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="bg-white border border-gray-100 p-4 sm:p-8 rounded-[12px] sm:rounded-[16px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] h-full flex flex-col items-start relative overflow-hidden group">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0B3D91]/10 to-transparent flex items-center justify-center mb-3 sm:mb-6 border border-[#0B3D91]/5 group-hover:from-[#0B3D91]/20 transition-colors duration-300">
                      <feature.icon className="text-[#0B3D91] w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]" />
                    </div>
                    <h3 className="text-[13px] sm:text-[18px] leading-tight sm:leading-normal font-bold text-[#1D2433] mb-2 sm:mb-3">{feature.title}</h3>
                    <p className="text-[11px] sm:text-[14px] text-gray-500 leading-[1.4] sm:leading-[1.6]">
                      {feature.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Warehouse Video Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12">
          <div className="w-full h-[2px] lg:h-[3px] bg-[#0B5ED7] mb-8 lg:mb-12"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-bold tracking-[2.5px] text-[#4B5563] uppercase">
                  Infrastructure
                </span>
              </div>
              <h2 className="font-barlow font-bold uppercase text-[42px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-[0.5px] text-[#1D2433] mb-8">
                READY TO <br className="hidden md:block" />
                <span className="text-[#0B5ED7]">DEPLOY.</span>
              </h2>
              <div className="text-[14px] md:text-[15px] text-[#4B5563] mb-10 font-[400] leading-[1.8] max-w-[540px] space-y-5">
                <p>
                  Our state-of-the-art facility maintains a large inventory of <strong className="font-bold text-[#1D2433]">Completely Built-Up (CBU) Aerial Work Platforms</strong>, ensuring immediate availability for businesses across India. Our ready-to-deploy fleet includes <strong className="font-bold text-[#1D2433]">scissor lifts, telescopic boom lifts, articulated boom lifts, and other access equipment</strong>, enabling contractors, infrastructure companies, industrial facilities, warehouses, airports, and construction projects to minimize downtime and maximize productivity.
                </p>
                <p>
                  With strategically stocked CBU units, we provide <strong className="font-bold text-[#1D2433]">fast delivery, rapid deployment, and dependable equipment availability</strong> for time-sensitive projects nationwide. Every machine is thoroughly inspected to meet high standards of quality, safety, and performance before dispatch, ensuring reliable operation from the moment it reaches your site.
                </p>
                <p>
                  Whether you need aerial work platforms for <strong className="font-bold text-[#1D2433]">construction, maintenance, industrial installations, warehousing, facility management, or infrastructure development</strong>, our extensive inventory allows us to respond quickly and efficiently. Our commitment to ready stock, nationwide supply, and prompt customer support makes us a trusted partner for businesses seeking premium aerial access solutions in India.
                </p>
              </div>
              <Link 
                to="/facility" 
                className="group inline-flex items-center justify-center gap-3 bg-[#1D2433] hover:bg-[#0B5ED7] text-white px-8 py-[18px] rounded-[2px] text-[13px] font-bold tracking-wide transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_20px_rgba(11,94,215,0.2)]"
              >
                EXPLORE OUR FACILITY <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
              <div className="relative shadow-[0_30px_60px_rgba(0,0,0,0.15)] bg-white p-2 md:p-3 rounded-[2px] border border-gray-100">
                <div className="bg-[#1D2433] rounded-[2px] overflow-hidden">
                  <video 
                    controls 
                    preload="metadata"
                    className="w-full aspect-video object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  >
                    <source src="/assets/warehouse.mp4#t=1" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-[4px] h-[4px] bg-[#0B5ED7] rounded-full"></div>
                    <p className="text-[12px] md:text-[13px] font-bold tracking-[1.5px] text-[#1D2433] uppercase m-0">
                      Central Distribution & Deployment Center
                    </p>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-[#4B5563] leading-[1.8] pl-4 border-l-[2px] border-[#0B5ED7]/20">
                    Our flagship facility is engineered specifically to handle the maintenance, inspection, and immediate deployment of heavy-duty aerial work platforms. Equipped with cutting-edge diagnostic bays and a dedicated 24/7 technical team, we ensure every machine is rigorously tested and 100% field-ready before it leaves our gates. This robust infrastructure allows us to guarantee rapid response times and unparalleled reliability for your most demanding projects across the nation.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-[4px] h-[4px] bg-[#0B5ED7] rounded-full"></div>
                    <p className="text-[12px] md:text-[13px] font-bold tracking-[1.5px] text-[#1D2433] uppercase m-0">
                      Comprehensive Spare Parts Inventory
                    </p>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-[#4B5563] leading-[1.8] pl-4 border-l-[2px] border-[#0B5ED7]/20">
                    We maintain a comprehensive stock of genuine spare parts for our complete range of aerial work platforms, including scissor lifts, articulated boom lifts, and telescopic boom lifts. Our ready inventory enables faster repairs, reduced downtime, and long-term equipment reliability, helping customers keep their operations running smoothly.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Honway Dealership Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle background gradient tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B75BB]/[0.02] to-transparent pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12 relative z-10">
          <div className="w-full h-[2px] lg:h-[3px] bg-[#1B75BB] mb-12 lg:mb-16"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
            {/* Left Column: Certificate Card */}
            <FadeIn className="order-2 lg:order-1" delay={0.1}>
              <div 
                className="group relative bg-white rounded-xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-pointer"
                onClick={() => setIsCertModalOpen(true)}
              >
                {/* Image Section */}
                <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-100 mb-5 aspect-[4/3] flex items-center justify-center">
                  <img 
                    src="/assets/honway-distributorship-certificate-thumb.jpg" 
                    alt="Honway Distributorship Certificate authorizing JHK Cosmic Pvt. Ltd. (Straightline) as the official dealer for Honway Aerial Work Platforms in India, issued 1 June 2026"
                    className="w-full h-full object-contain p-2 md:p-4"
                    loading="lazy"
                    width="900"
                    height="636"
                  />
                  {/* Verified Badge */}
                  <div className="absolute top-4 right-4 bg-white pl-1.5 pr-3 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#1B75BB] flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-white" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-700 tracking-wide uppercase">Verified</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1B75BB]/0 group-hover:bg-[#1B75BB]/5 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm text-[#1B75BB] px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2">
                      <Maximize size={16} /> View Full Certificate
                    </div>
                  </div>
                </div>

                {/* Info Panel */}
                <div className="space-y-3 px-2">
                  <div className="grid grid-cols-[130px_1fr] gap-4 items-start border-b border-gray-50 pb-3">
                    <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Document Type</span>
                    <span className="text-[14px] font-medium text-[#1C1C1C]">Distributorship Certificate</span>
                  </div>
                  <div className="grid grid-cols-[130px_1fr] gap-4 items-start border-b border-gray-50 pb-3">
                    <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Certified Entity</span>
                    <span className="text-[14px] font-medium text-[#1C1C1C]">JHK Cosmic Pvt. Ltd.</span>
                  </div>
                  <div className="grid grid-cols-[130px_1fr] gap-4 items-start border-b border-gray-50 pb-3">
                    <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Issuing Authority</span>
                    <span className="text-[14px] font-medium text-[#1C1C1C]">Honway Intelligent Manufacturing Technology Co., Ltd.</span>
                  </div>
                  <div className="grid grid-cols-[130px_1fr] gap-4 items-start">
                    <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Date Issued</span>
                    <span className="text-[14px] font-medium text-[#1C1C1C]">01 June 2026</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          
            {/* Right Column: Typography & Layout */}
            <FadeIn delay={0.2} className="order-1 lg:order-2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-4 h-0.5 bg-[#F97316]"></div>
                <span className="text-[11px] md:text-[12px] font-bold tracking-[2px] text-gray-500 uppercase">Strategic Partnership</span>
              </div>
              
              <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-tight mb-8 leading-[1.05] text-[#1C1C1C]">
                Exclusive <span className="text-[#1B75BB]">Honway</span> Dealership in India
              </h2>
              
              <div className="text-[15px] md:text-[16px] text-[#4B5563] mb-10 font-[400] leading-[1.7] max-w-[65ch] space-y-6">
                <p>
                  Straightline is proud to be the official authorized dealer for Honway Aerial Work Platforms across India. We bring world-class lifting solutions directly to your projects.
                </p>
                <p>
                  Every machine we supply is imported as completely built-up (CBU) units, ensuring absolute adherence to global manufacturing standards, unmatched reliability, and uncompromising safety.
                </p>
              </div>
              
              <ul className="space-y-0 mb-10">
                {[
                  "Direct Manufacturer Partnership",
                  "Genuine Spare Parts Availability",
                  "Factory-Trained Technical Support"
                ].map((item, i) => (
                  <FadeIn key={i} delay={0.3 + (i * 0.1)}>
                    <li className="flex items-center gap-4 text-[#1C1C1C] font-bold text-[15px] md:text-[16px] py-4 border-t border-gray-100 last:border-b">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={20} className="text-[#1B75BB]" />
                      </div>
                      {item}
                    </li>
                  </FadeIn>
                ))}
              </ul>
              
              <div>
                <Link 
                  to="/honway" 
                  className="group inline-flex items-center gap-2 font-bold text-[#F97316] hover:text-[#C2410C] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"
                >
                  <span className="relative">
                    Discover our Honway Partnership
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#F97316] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {isCertModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setIsCertModalOpen(false)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
                <div className="font-bold text-[#1C1C1C]">Distributorship Certificate</div>
                <button 
                  onClick={() => setIsCertModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B75BB]"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-gray-50 flex items-center justify-center">
                <img 
                  src="/assets/honway-distributorship-certificate-full.jpg" 
                  alt="Honway Distributorship Certificate authorizing JHK Cosmic Pvt. Ltd. (Straightline) as the official dealer for Honway Aerial Work Platforms in India, issued 1 June 2026"
                  className="max-w-full h-auto object-contain max-h-[75vh]"
                  loading="lazy"
                  width="2200"
                  height="1556"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



      {/* CTA */}
      <section className="py-32 bg-blue-950 text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/telescopic-diesel/telescopic-diesel-1.webp" alt="Lift in action" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-900/80" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <FadeIn>
            <span className="eyebrow text-brand-400 mb-6 block">Sales & Support</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-balance">Need the Right Lift for Your Project?</h2>
          </FadeIn>
          <FadeIn delay={0.2} className="lg:flex lg:flex-col lg:items-end">
            <p className="text-xl text-blue-200 mb-8 max-w-md font-light lg:text-right leading-relaxed">
              Our experts are ready to recommend the perfect Honway model for your specific requirements.
            </p>
            <a 
              href="https://wa.me/919811803530" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-accent text-white px-10 py-4 rounded-md text-xl font-bold hover:bg-brand-accentLight transition-all active:scale-95 shadow-sm"
            >
              Connect on WhatsApp <ArrowRight size={24} />
            </a>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};

export default Home;
