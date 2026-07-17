import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Droplet } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getCategoryBySlug } from '../data/api';
import { getAssetsForSku } from '../data/assetsMap';

const ProductCard = ({ sku, height }: { sku: string, height?: number }) => {
    
  return (
  <Link 
    to={`/product/${sku}`}
    className="group bg-white border border-brand-200 rounded-xl p-6 hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    <div className="w-full h-32 bg-brand-50 rounded-md border border-brand-100 mb-6 flex items-center justify-center p-4">
      <h4 className="text-3xl font-bold text-brand-900 opacity-20">{sku}</h4>
    </div>
    <h4 className="text-2xl font-bold text-brand-900 mb-2">{sku}</h4>
    {height && (
      <p className="text-brand-600 font-medium mb-6">{height}m Working Height</p>
    )}
    <div className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-accent group-hover:gap-3 transition-all">
      View Details <ArrowRight size={16} />
    </div>
  </Link>
  );
};

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, [slug]);

  if (!category) {
    return <div className="h-screen flex items-center justify-center text-2xl font-bold">Category Not Found</div>;
  }

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    setTimeout(() => {
      const element = document.getElementById('products-grid');
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const isScissor = slug === 'scissor-lifts';
  
  return (
    <div className="min-h-screen bg-brand-50 pb-32">
      <Helmet>
        <title>{category.category} in India | Buy or Rent | Straightline AWP</title>
        <meta name="description" content={`Explore our complete range of ${category.category}. Authorized Honway dealer offering high-quality lifting solutions across India.`} />
        <link rel="canonical" href={`https://straightlineindia.com/category/${category.slug}`} />
        <meta property="og:title" content={`${category.category} in India | Buy or Rent | Straightline AWP`} />
        <meta property="og:description" content={`Explore our complete range of ${category.category}. Authorized Honway dealer offering high-quality lifting solutions across India.`} />
        <meta property="og:url" content={`https://straightlineindia.com/category/${category.slug}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="relative w-full mb-20 bg-blue-950 pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/telescopic-diesel/telescopic-diesel-3.webp" alt="Category Header" className="w-full h-full object-cover mix-blend-luminosity opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto md:flex md:items-end md:justify-between text-white">
          <div className="max-w-2xl">
            <span className="eyebrow text-brand-300 mb-4 block">Fleet Categories</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{category.category}</h1>
          </div>
          <p className="text-lg text-blue-200 max-w-md mt-6 md:mt-0 font-light leading-relaxed">
            Explore our range of premium {category.category.toLowerCase()} designed for maximum safety and efficiency.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Filters */}
        {isScissor ? (
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-16 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
            {category.subcategories.map((sub, idx) => {
              // Map data based on sub.type
              let badge = "⚡ ELECTRIC";
              let shortTitle = "Electric Self-Propelled";
              let desc = "Ideal for warehouses, factories and indoor maintenance.";
              let features = ["⚡ Electric", "📏 8–16 m", "🏢 Indoor"];
              
              if (sub.type.toLowerCase().includes('crawler')) {
                badge = "🛞 CRAWLER";
                shortTitle = "Crawler Scissor Lift";
                desc = "Designed for slopes, rough access and challenging terrain.";
                features = ["🛞 Tracks", "⛰ All-Terrain", "⚡ Electric"];
              } else if (sub.type.toLowerCase().includes('rough')) {
                badge = "🏗 ROUGH TERRAIN";
                shortTitle = "Rough Terrain Scissor Lift";
                desc = "Heavy-duty outdoor lifting for construction projects.";
                features = ["🏗 Construction", "4WD", "🌤 Outdoor"];
              } else if (sub.type.toLowerCase().includes('mini')) {
                badge = "🏢 COMPACT INDOOR";
                shortTitle = "Mini Electric Scissor Lift";
                desc = "Compact solution for narrow aisles and indoor work.";
                features = ["🚪 Compact", "⚡ Electric", "🏢 Indoor"];
              }

              return (
                <button
                  key={sub.type}
                  onClick={() => handleTabClick(idx)}
                  className={`w-[78%] shrink-0 sm:w-auto snap-start sm:snap-align-none group relative flex flex-col text-left bg-white rounded-[20px] shadow-sm border ${
                    activeTab === idx 
                      ? 'border-[#0F4AA1] shadow-xl sm:transform sm:-translate-y-2' 
                      : 'border-[#E5E7EB]'
                  } sm:hover:border-[#0F4AA1] transition-all duration-300 sm:hover:-translate-y-2 sm:hover:shadow-xl overflow-hidden h-full`}
                >
                  {/* Image Section */}
                  <div className="relative w-full h-[260px] lg:h-[300px] overflow-hidden bg-gray-50 shrink-0">
                    <img 
                      src={getAssetsForSku(sub.models[0]?.sku).images.length > 0 ? `/assets/${getAssetsForSku(sub.models[0]?.sku).folder}/${getAssetsForSku(sub.models[0]?.sku).images[0]}` : '/assets/straight-line-logo.webp'} 
                      alt={sub.type} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay for bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-[#0F4AA1] text-white px-3 py-1.5 rounded text-[11px] font-bold tracking-wider shadow-md">
                      {badge}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-[24px] lg:text-[26px] font-[800] text-[#1E293B] leading-tight mb-2">
                      {shortTitle}
                    </h3>
                    <p className="text-[#64748B] text-[14px] lg:text-[15px] leading-snug mb-5">
                      {desc}
                    </p>
                    
                    {/* Feature Chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {features.map((feat, i) => (
                        <span key={i} className="bg-gray-100 text-[#1E293B] rounded-full px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap">
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <div className="w-full bg-[#0F4AA1] text-white rounded-lg py-3 flex items-center justify-center font-bold text-[14px] transition-all duration-300 group-hover:bg-[#0a3885] group-hover:-translate-y-[2px]">
                        VIEW MODELS <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-sm mx-auto">
            {category.subcategories.map((sub, idx) => (
              <button
                key={sub.type}
                onClick={() => handleTabClick(idx)}
                className={`relative px-6 py-4 rounded-md font-bold text-sm md:text-base transition-colors flex-1 ${
                  activeTab === idx 
                    ? 'bg-brand-900 text-white shadow-xl' 
                    : 'bg-white text-brand-700 hover:bg-brand-100 hover:text-brand-900 border border-brand-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  {sub.powerType.toLowerCase().includes('electric') ? <Zap size={18} className={activeTab === idx ? 'text-yellow-400' : 'text-brand-400'} /> : null}
                  {sub.powerType.toLowerCase().includes('diesel') ? <Droplet size={18} className={activeTab === idx ? 'text-blue-400' : 'text-brand-400'} /> : null}
                </div>
                {sub.type}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div id="products-grid" className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {category.subcategories[activeTab]?.models.map((model) => (
                <ProductCard key={model.sku} sku={model.sku} height={model.workingHeightM} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {slug === 'telescopic-boom-lifts' && (
          <div className="max-w-5xl mx-auto mt-24 pt-16 border-t border-brand-200 text-[#4B5563] text-[15px] leading-[1.8] space-y-5">
            <p>
              StraightLine India supplies high-performance Telescopic Boom Lifts designed to provide exceptional working height, maximum horizontal outreach, and safe access to elevated work areas. Engineered for demanding industrial applications, our telescopic boom lifts are ideal for projects that require long, straight-line reach with minimal machine repositioning, helping improve productivity while reducing downtime.
            </p>
            <p>
              Our telescopic boom lifts are widely used across construction sites, infrastructure projects, bridge construction, airports, warehouses, manufacturing plants, power plants, oil & gas facilities, telecom installations, shipyards, commercial buildings, and industrial maintenance. Available in both diesel and electric variants, these machines offer reliable performance, advanced safety features, smooth operation, and excellent stability on a variety of job sites.
            </p>
            <p>
              At StraightLine India, we maintain ready CBU (Completely Built Unit) inventory for faster delivery across India. Every machine is supported by genuine spare parts, expert technical assistance, preventive maintenance, and dependable after-sales service to ensure maximum uptime and long-term reliability.
            </p>
            <p>
              Whether you're a contractor, equipment rental company, or industrial business, StraightLine India's telescopic boom lifts provide the reach, safety, and performance needed to complete work at height efficiently. Contact us today to find the right telescopic boom lift solution for your project.
            </p>
          </div>
        )}

        {slug === 'articulated-boom-lifts' && (
          <div className="max-w-5xl mx-auto mt-24 pt-16 border-t border-brand-200 text-[#4B5563] text-[15px] leading-[1.8] space-y-5">
            <p>
              StraightLine India supplies premium <strong className="font-bold text-[#1D2433]">Articulated Boom Lifts</strong> designed to provide safe and flexible access to elevated work areas with exceptional up-and-over reach. Featuring multiple boom sections and articulated joints, these machines easily maneuver around obstacles, making them ideal for complex jobs where direct vertical access is not possible.
            </p>
            <p>
              Our articulated boom lifts are widely used across <strong className="font-bold text-[#1D2433]">construction sites, industrial plants, warehouses, power plants, oil &amp; gas facilities, airports, infrastructure projects, telecom installations, facility maintenance, commercial buildings, and manufacturing units</strong>. Available in both <strong className="font-bold text-[#1D2433]">diesel and electric variants</strong>, they deliver outstanding maneuverability, reliable performance, advanced safety features, and excellent stability for indoor and outdoor applications.
            </p>
            <p>
              At StraightLine India, we maintain ready <strong className="font-bold text-[#1D2433]">CBU (Completely Built Unit) inventory</strong> for fast nationwide delivery. Every machine is backed by genuine spare parts, expert technical support, preventive maintenance, and dependable after-sales service to maximize uptime and ensure long-term reliability.
            </p>
            <p>
              Whether you're a contractor, rental company, or industrial business, StraightLine India's articulated boom lifts offer the flexibility, safety, and performance needed to complete work at height efficiently. Contact us today to find the right articulated boom lift solution for your project.
            </p>
          </div>
        )}

        {slug === 'scissor-lifts' && (
          <div className="max-w-5xl mx-auto mt-24 pt-16 border-t border-brand-200 text-[#4B5563] text-[15px] leading-[1.8] space-y-5">
            <p>
              StraightLine India supplies premium Scissor Lifts designed to provide safe, stable, and efficient vertical access for a wide range of indoor and outdoor applications. Built for productivity and operator safety, our scissor lifts offer spacious platforms, high load capacities, and smooth lifting performance, making them ideal for tasks that require multiple workers, tools, and materials at height.
            </p>
            <p>
              Our range includes Electric Self-Propelled Scissor Lifts, Rough Terrain Scissor Lifts, Crawler Scissor Lifts, and Mini Electric Scissor Lifts to suit diverse working environments. These machines are widely used in warehouses, manufacturing facilities, construction sites, airports, shopping malls, commercial buildings, industrial maintenance, logistics centers, infrastructure projects, and facility management.
            </p>
            <p>
              At StraightLine India, we maintain ready CBU (Completely Built Unit) inventory for fast delivery across India. Every machine is supported by genuine spare parts, expert technical assistance, preventive maintenance, and dependable after-sales service to ensure maximum uptime and long-term reliability.
            </p>
            <p>
              Whether you need a compact lift for indoor maintenance or a rugged machine for demanding job sites, StraightLine India's scissor lifts deliver the safety, stability, and performance needed to complete work at height efficiently. Contact us today to find the right scissor lift solution for your project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
