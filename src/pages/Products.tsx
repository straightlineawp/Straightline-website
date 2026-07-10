import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize, Target, BatteryCharging, Settings } from 'lucide-react';
import { getCategories } from '../data/api';

const FadeIn = ({ children, delay = 0, className = "" }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Products = () => {
  const categories = getCategories();
  
  const categoryImages = {
    'articulated-boom-lifts': '/assets/articulated-diesel/articulated-diesel-3.webp',
    'telescopic-boom-lifts': '/assets/telescopic-diesel/telescopic-diesel-1.webp',
    'scissor-lifts': '/assets/self-propelled-scissor-lift/scissor-lift-1.webp'
  };

  return (
    <div className="bg-white min-h-screen pt-[72px] lg:pt-[120px]">
      {/* Hero Banner */}
      <section className="relative h-[35vh] min-h-[300px] flex items-center justify-center bg-[#1D2433] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('/assets/articulated-diesel/articulated-diesel-3.webp')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D2433] via-transparent to-transparent opacity-80"></div>
        
        <div className="relative z-10 text-center px-4 max-w-[800px] mx-auto mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0B5ED7]/20 border border-[#0B5ED7]/30 text-white font-bold tracking-[2px] uppercase text-[12px] mb-6 backdrop-blur-sm">
              Equipment Portfolio
            </span>
            <h1 className="font-barlow font-bold uppercase text-[42px] md:text-[56px] leading-[1.05] tracking-[0.5px] text-white mb-6">
              Our <span className="text-[#0B5ED7]">Products</span>
            </h1>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-[1.6]">
              Explore our comprehensive range of high-performance aerial work platforms designed for safety, reach, and efficiency across all industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid (Identical to Home) */}
      <section className="py-16 lg:py-24 md:py-32 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto lg:px-8 xl:px-12">
          
          <FadeIn className="px-4 lg:px-0">
            <div className="w-full h-[2px] lg:h-[3px] bg-[#0B5ED7] mb-8 lg:mb-12"></div>
            <div className="mb-6 lg:mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-[12px] lg:gap-6">
              <div className="max-w-2xl">
                <span className="flex items-center gap-2 text-[#0B5ED7] font-bold tracking-[2px] uppercase text-[12px] mb-3 lg:mb-4">
                  Equipment Fleet
                </span>
                <h2 className="font-barlow font-bold uppercase text-4xl md:text-[56px] leading-[1.05] tracking-[0.5px] text-[#1D2433]">
                  Select Category
                </h2>
              </div>
            </div>
          </FadeIn>

          {/* Unified Grid/Scroll Layout */}
          <div className="flex lg:grid lg:grid-cols-3 gap-[12px] lg:gap-6 px-4 lg:px-0 pb-2 lg:pb-0 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
            {categories.map((cat, i) => {
              const isScissor = cat.slug === 'scissor-lifts';
              const badgeText = isScissor ? "Electric only" : "Diesel and electric";
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
        </div>
      </section>
      
      {/* SEO Content Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 xl:px-12">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-[#4B5563] text-[15px] leading-[1.8] space-y-5 lg:text-center">
              <p>
                STRAIGHTLINE offers a complete range of Aerial Work Platforms (AWPs) designed to provide safe, efficient, and reliable working-at-height solutions across a wide range of industries. Our portfolio includes Articulated Boom Lifts, Telescopic Boom Lifts, Electric Boom Lifts, Diesel Boom Lifts, Electric Scissor Lifts, Mini Scissor Lifts, Crawler Scissor Lifts, and Rough Terrain Scissor Lifts, suitable for both indoor and outdoor applications.
              </p>
              <p>
                Built for construction sites, warehouses, factories, airports, commercial buildings, infrastructure projects, and industrial maintenance, our machines deliver outstanding performance, operator safety, and long-term reliability. Whether you need compact access equipment for confined spaces or heavy-duty lifting solutions for demanding job sites, STRAIGHTLINE has the right machine for every project.
              </p>
              <p>
                Browse our complete range of Boom Lifts, Scissor Lifts, Elevated Work Platforms (EWPs), and Access Equipment to find the ideal solution for your operational requirements. With durable engineering, advanced safety features, and dependable after-sales support, STRAIGHTLINE helps businesses across India work safer, smarter, and more efficiently at height.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 xl:px-12 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-4xl font-barlow font-bold text-[#1D2433] mb-6 uppercase">Need Help Choosing?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-[15px] leading-relaxed">
              Our technical experts can help you select the exact aerial work platform for your specific industry requirements.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 bg-[#0B5ED7] hover:bg-[#0a48a0] text-white px-8 py-4 rounded-[4px] text-[13px] font-bold tracking-wide transition-colors"
            >
              CONTACT SALES TEAM <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Products;
