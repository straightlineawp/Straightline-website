import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Gauge, BadgeCheck, HeadphonesIcon, MessageCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full lg:h-[100dvh] flex flex-col justify-start lg:justify-center bg-white pb-[265px] lg:pb-0">
      
      {/* Mobile Image + Overlay Text Section */}
      <div className="relative w-full lg:absolute lg:inset-0 lg:z-0 bg-[#f8f9fa] lg:bg-transparent flex flex-col">
        {/* Background Image */}
        {/* Desktop Background Image */}
        <img 
          src="/assets/Background.png" 
          alt="Straightline Aerial Work Platforms - Desktop" 
          className="hidden lg:block w-full h-[135%] object-fill object-center contrast-[1.05] translate-y-[calc(-15%+20px)] [clip-path:inset(0_0_40px_0)]"
        />
        
        {/* Mobile Background Image */}
        <img 
          src="/assets/backgroung%20mobile.png" 
          alt="Straightline aerial work platforms in action" 
          className="block lg:hidden w-full h-auto object-contain object-top contrast-[1.05] translate-y-0 [clip-path:none]"
        />
        
        {/* Mobile Dark Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-t from-[#0f1b2e]/95 via-[#0f1b2e]/50 to-transparent lg:hidden pointer-events-none z-10"></div>
        
        {/* Mobile Text Overlay (Absolute) */}
        <div className="absolute inset-0 z-20 w-full px-[5vw] flex flex-col justify-end pb-[16px] lg:hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-[2px] bg-[#60A5FA]"></span>
              <p className="text-[9px] tracking-[2px] font-medium text-white/90 uppercase m-0 leading-none">
                India's Reliable Partner In
              </p>
            </div>
            <div aria-hidden="true" className="font-barlow font-semibold uppercase text-[28px] sm:text-[34px] leading-[1.1] tracking-[0.4px] text-left m-0">
              <span className="block text-white">BETTER REACH.</span>
              <span className="block text-[#60A5FA]">BUILT TO TRUST.</span>
            </div>
            <p className="mt-[10px] text-[11.5px] font-[400] text-white/85 leading-[1.6] max-w-[420px]">
              Straightline delivers advanced aerial work platforms that combine safety, performance, and reliability to help you work smarter and reach higher.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mobile Buttons Section (Immediately below image) */}
      <div className="w-full px-[5vw] pt-4 pb-4 lg:hidden z-10 flex flex-col sm:flex-row gap-[12px]">
        <Link 
          to="/products" 
          className="group flex items-center justify-center gap-2 bg-[#0B5ED7] hover:bg-[#094bb0] text-white h-[44px] w-full sm:w-[160px] rounded-[2px] text-[13px] font-bold transition-all duration-250 shadow-[0_4px_10px_rgba(11,94,215,0.2)]"
        >
          EXPLORE PRODUCTS <ArrowRight className="w-[14px] h-[14px] transition-transform group-hover:translate-x-1" />
        </Link>
        <a 
          href="https://wa.me/919811803530" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 bg-white hover:bg-[#0B5ED7] text-[#0B5ED7] hover:text-white border-[2px] border-[#0B5ED7] h-[44px] w-full sm:w-[160px] rounded-[2px] text-[13px] font-bold transition-all duration-250"
        >
          <MessageCircle className="w-[14px] h-[14px] text-[#0B5ED7] group-hover:text-white transition-colors" /> TALK TO EXPERT
        </a>
      </div>

      {/* Desktop Main Content Container */}
      <div className="hidden lg:flex relative z-10 w-full max-w-[1600px] mx-auto px-[5vw] pb-[180px] h-full flex-col justify-center pointer-events-none">
        <div className="w-[45%] xl:w-[38%] flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-[190px]"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-6 h-[2px] bg-[#0B5ED7]"></span>
              <p className="text-[11px] tracking-[2px] font-medium text-[#4B5563] uppercase m-0 leading-none">
                India's Reliable Partner In
              </p>
            </div>
            <h1 className="font-barlow font-semibold uppercase text-[56px] leading-none tracking-[0.4px] text-left m-0">
              <span className="block text-[#1D2433]">BETTER REACH.</span>
              <span className="block text-[#0B5ED7]">BUILT TO TRUST.</span>
            </h1>
            <p className="mt-[24px] text-[14px] font-[400] text-[#4B5563] leading-[1.7] max-w-[480px]">
              Straightline delivers advanced aerial work platforms that combine safety, performance, and reliability to help you work smarter and reach higher.
            </p>
            <div className="mt-[32px] flex flex-row gap-[16px]">
              <Link 
                to="/products" 
                className="group flex items-center justify-center gap-2 bg-[#0B5ED7] hover:bg-[#094bb0] text-white h-[48px] w-[190px] rounded-[2px] text-[14px] font-bold transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(11,94,215,0.3)]"
              >
                EXPLORE PRODUCTS <ArrowRight className="w-[16px] h-[16px] transition-transform group-hover:translate-x-1" />
              </Link>
              <a 
                href="https://wa.me/919811803530" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 bg-white hover:bg-[#0B5ED7] text-[#0B5ED7] hover:text-white border-[2px] border-[#0B5ED7] h-[48px] w-[190px] rounded-[2px] text-[14px] font-bold transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(11,94,215,0.2)]"
              >
                <MessageCircle className="w-[16px] h-[16px] text-[#0B5ED7] group-hover:text-white transition-colors" /> TALK TO EXPERT
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Feature Bar */}
      <div className="absolute bottom-[80px] lg:-bottom-[19px] left-0 w-full flex justify-center z-20 px-[3%] translate-y-[50%] lg:translate-y-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="w-[94%] max-w-[1600px] min-h-0 lg:min-h-[130px] bg-[#13263F] rounded-[12px] lg:rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-[16px] lg:p-[24px] flex items-center"
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 lg:gap-y-0 divide-y md:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Feature 1 */}
            <div className="group flex gap-[12px] lg:gap-[16px] px-[12px] lg:px-[24px] pt-4 lg:pt-0 first:pt-0 first:pl-0 last:pr-0">
              <ShieldCheck className="text-[#0B5ED7] shrink-0 w-[28px] h-[28px] lg:w-[36px] lg:h-[36px] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <div>
                <h4 className="text-white text-[13px] lg:text-[16px] font-bold mb-[4px] lg:mb-[6px] leading-none">SAFETY FIRST</h4>
                <p className="text-[rgba(255,255,255,0.82)] text-[11px] lg:text-[13px] leading-[1.5] lg:leading-[1.6]">Advanced safety features to protect people and workplaces.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group flex gap-[12px] lg:gap-[16px] px-[12px] lg:px-[24px] pt-4 lg:pt-0 first:pt-0 first:pl-0 last:pr-0">
              <Gauge className="text-[#0B5ED7] shrink-0 w-[28px] h-[28px] lg:w-[36px] lg:h-[36px] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <div>
                <h4 className="text-white text-[13px] lg:text-[16px] font-bold mb-[4px] lg:mb-[6px] leading-none">HIGH PERFORMANCE</h4>
                <p className="text-[rgba(255,255,255,0.82)] text-[11px] lg:text-[13px] leading-[1.5] lg:leading-[1.6]">Powerful machines built for maximum efficiency and productivity.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group flex gap-[12px] lg:gap-[16px] px-[12px] lg:px-[24px] pt-4 lg:pt-0 first:pt-0 first:pl-0 last:pr-0">
              <BadgeCheck className="text-[#0B5ED7] shrink-0 w-[28px] h-[28px] lg:w-[36px] lg:h-[36px] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <div>
                <h4 className="text-white text-[13px] lg:text-[16px] font-bold mb-[4px] lg:mb-[6px] leading-none">BUILT TO LAST</h4>
                <p className="text-[rgba(255,255,255,0.82)] text-[11px] lg:text-[13px] leading-[1.5] lg:leading-[1.6]">Durable components and robust design for long life in tough conditions.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group flex gap-[12px] lg:gap-[16px] px-[12px] lg:px-[24px] pt-4 lg:pt-0 first:pt-0 first:pl-0 last:pr-0">
              <HeadphonesIcon className="text-[#0B5ED7] shrink-0 w-[28px] h-[28px] lg:w-[36px] lg:h-[36px] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              <div>
                <h4 className="text-white text-[13px] lg:text-[16px] font-bold mb-[4px] lg:mb-[6px] leading-none">RELIABLE SUPPORT</h4>
                <p className="text-[rgba(255,255,255,0.82)] text-[11px] lg:text-[13px] leading-[1.5] lg:leading-[1.6]">Expert support and genuine service whenever and wherever you need it.</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
