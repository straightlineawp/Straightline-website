import { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import { ReactNode } from "react";
const FadeIn = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => {
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

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<{title: string, src: string} | null>(null);

  const videos = [
    { title: "StraightLine Warehouse & Inventory", src: "/assets/warehouse.mp4", colSpan: "col-span-1 md:col-span-2 lg:col-span-3 aspect-video" },
    { title: "Articulated Diesel Boom Lift", src: "/assets/articulated-diesel/articulating-boom-lift.mp4", colSpan: "col-span-1 aspect-[4/3]" },
    { title: "Articulated Electric Boom Lift", src: "/assets/articulated-electric/articulated-electric-boom-lift.mp4", colSpan: "col-span-1 aspect-[4/3]" },
    { title: "Telescopic Diesel Boom Lift", src: "/assets/telescopic-diesel/telescopic-boom-lift-diesel.mp4", colSpan: "col-span-1 aspect-[4/3]" },
    { title: "Telescopic Electric Boom Lift", src: "/assets/telescopic-electric/telescopic-electric.mp4", colSpan: "col-span-1 aspect-[4/3]" },
    { title: "Crawler Scissor Lift", src: "/assets/crawler-scissor-lift/crawler-scissor-lift-.mp4", colSpan: "col-span-1 aspect-[4/3]" },
    { title: "Mini Electric Scissor Lift", src: "/assets/mini-electric-scissor-lift/mini-electric-scissor-lift.mp4", colSpan: "col-span-1 aspect-[4/3]" },
    { title: "Rough Terrain Scissor Lift", src: "/assets/rough-terrain-scissor-lift/rough-terrain-scissor-lift.mp4", colSpan: "col-span-1 aspect-[4/3]" },
    { title: "Self-Propelled Scissor Lift", src: "/assets/self-propelled-scissor-lift/self-propelled-scissor-lift.mp4", colSpan: "col-span-1 aspect-[4/3]" },
  ];

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedVideo]);

  return (
    <div className="min-h-screen bg-brand-50 pt-24 pb-32">
      <Helmet>
        <title>Video Gallery | Straightline Aerial Work Platforms</title>
        <meta name="description" content="Watch Straightline's aerial work platforms in action. View high-quality videos demonstrating our articulated boom lifts, telescopic boom lifts, and scissor lifts." />
        <link rel="canonical" href="https://straightline.in/gallery" />
        <meta property="og:title" content="Video Gallery | Straightline Aerial Work Platforms" />
        <meta property="og:description" content="Watch Straightline's aerial work platforms in action. View high-quality videos demonstrating our articulated boom lifts, telescopic boom lifts, and scissor lifts." />
        <meta property="og:url" content="https://straightline.in/gallery" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn className="mb-20 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow text-brand-500 mb-4 block">Visual Assets</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-brand-900 mb-6">
              Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-400">Gallery</span>
            </h1>
          </div>
          <p className="text-xl text-brand-600 max-w-md mt-6 md:mt-0 font-light leading-relaxed">
            Watch our state-of-the-art Honway machinery in action. Explore the precise engineering and robust capabilities of our entire aerial work platform fleet.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className={vid.colSpan}>
              <div 
                onClick={() => setSelectedVideo(vid)}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col group cursor-pointer"
              >
                <div className="relative w-full h-full flex-grow bg-brand-950 overflow-hidden">
                  <video 
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                  >
                    <source src={`${vid.src}#t=1`} type="video/mp4" />
                  </video>
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 bg-brand-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform group-hover:scale-110 shadow-xl transition-transform duration-300">
                      <Play fill="currentColor" size={24} className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-6 bg-white border-t border-brand-50 shrink-0">
                  <h3 className="text-xl font-bold text-brand-900 group-hover:text-brand-accent transition-colors">{vid.title}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-950/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-[110]">
              <button 
                onClick={() => setSelectedVideo(null)}
                className="p-3 bg-white/10 hover:bg-brand-accent rounded-full text-white transition-colors"
              >
                <X size={28} />
              </button>
            </div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()} // prevent click from closing when clicking video
            >
              <video 
                src={selectedVideo.src}
                controls 
                autoPlay
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
