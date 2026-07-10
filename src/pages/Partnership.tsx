import { motion } from 'framer-motion';

const Partnership = () => {
  return (
    <div className="min-h-screen bg-brand-50 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-4">Official Partnership</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-brand-900 leading-tight">
            Authorized Honway Distributorship.
          </h1>
          <p className="text-lg text-brand-600 mb-8 leading-relaxed">
            Straightline is proud to be the officially authorized dealer for Honway Aerial Work Platforms in India. This exclusive partnership allows us to bring China's leading lifting technology directly to the Indian market, ensuring our clients receive genuine equipment, original parts, and factory-backed support.
          </p>
          <div className="bg-white border border-brand-200 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-brand-900 mb-2">What this means for you:</h4>
            <ul className="space-y-2 text-brand-700 text-sm">
              <li>• Direct import of CBU units ensuring zero compromise on factory quality.</li>
              <li>• Priority access to genuine Honway spare parts.</li>
              <li>• Validated warranty and long-term technical support.</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-3xl shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-transparent -m-4 rounded-[2.5rem] -z-10" />
          <div className="w-full aspect-[3/4] bg-brand-100 rounded-2xl flex items-center justify-center overflow-hidden border border-brand-100 relative">
             <div className="absolute inset-0 bg-brand-900/5 z-10" />
             {/* Note: In a real app we might use pdf.js to render, or just a screenshot of the cert. We will use an object tag or an iframe as a fallback */}
             <object data="/assets/certificate-honway.pdf" type="application/pdf" className="w-full h-full">
                <p>Distributorship Certificate PDF</p>
             </object>
          </div>
          <p className="text-center text-sm font-medium text-brand-400 mt-4">Official Certificate of Distributorship</p>
        </motion.div>

      </div>
    </div>
  );
};

export default Partnership;
