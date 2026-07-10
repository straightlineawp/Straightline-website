import { motion } from 'framer-motion';

const Facility = () => {
  return (
    <div className="min-h-screen bg-brand-950 pt-32 pb-32 text-white">
      <div className="max-w-7xl mx-auto px-4 mb-20 md:flex md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow text-brand-400 mb-4 block">Infrastructure</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            State of the Art <br />Operations.
          </motion.h1>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-brand-300 max-w-md font-light leading-relaxed"
        >
          Take a look inside our warehouse and storage facility where every Honway lift is inspected, prepared, and dispatched for deployment across India.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto px-4 mb-24"
      >
        <div className="relative rounded-xl overflow-hidden shadow-xl border border-brand-800 bg-black flex justify-center">
          <video 
            controls 
            preload="metadata"
            className="w-full max-h-[80vh] object-contain"
          >
            <source src="/assets/warehouse.mp4#t=1" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Facility Features */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Massive Ready Stock",
            desc: "Our facility maintains a huge inventory of CBU (Completely Built-Up) Honway lifts. This means zero manufacturing wait times and immediate availability for your most urgent project requirements."
          },
          {
            title: "Pre-Delivery Inspection (PDI)",
            desc: "Every single machine undergoes a rigorous multi-point PDI process by our factory-trained engineers before it leaves the warehouse, ensuring flawless operation the moment it hits your site."
          },
          {
            title: "Nationwide Dispatch",
            desc: "Strategically located and operationally optimized, our logistics team coordinates rapid and secure transportation of these heavy machines to any corner of India."
          }
        ].map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="bg-brand-900 border border-brand-800 p-10 rounded-xl hover:bg-brand-800 transition-colors shadow-lg"
          >
            <div className="w-12 h-12 bg-brand-800 text-brand-accent rounded-md flex items-center justify-center font-bold text-xl mb-6 border border-brand-700">
              {idx + 1}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-brand-300 font-medium leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Facility;
