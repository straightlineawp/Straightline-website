import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <img src="/assets/straightline-logo.png" alt="Straightline" className="h-12 w-auto mb-6 brightness-0 invert" 
                 onError={(e) => { e.currentTarget.src = '/assets/straight-line-logo.webp'; }} />
            <p className="text-brand-300 mb-6 text-sm leading-relaxed">
              Straightline is a brand of JHK Cosmic Pvt. Ltd., New Delhi, India. 
              We are the official authorized dealer for Honway aerial work platforms, offering premium articulated, telescopic, and scissor lifts.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/StraightLineAWP" target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/straightlineawp/" target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Equipment</h4>
            <ul className="flex flex-col gap-3 text-brand-300 text-sm">
              <li><Link to="/category/articulated-boom-lifts" className="hover:text-brand-accent transition-colors">Articulated Boom Lifts</Link></li>
              <li><Link to="/category/telescopic-boom-lifts" className="hover:text-brand-accent transition-colors">Telescopic Boom Lifts</Link></li>
              <li><Link to="/category/scissor-lifts" className="hover:text-brand-accent transition-colors">Scissor Lifts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-3 text-brand-300 text-sm">
              <li><Link to="/honway" className="hover:text-brand-accent transition-colors">About Straightline</Link></li>
              <li><Link to="/honway" className="hover:text-brand-accent transition-colors">Honway Partnership</Link></li>
              <li><Link to="/facility" className="hover:text-brand-accent transition-colors">Our Facility</Link></li>
              <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="flex flex-col gap-4 text-brand-300 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-brand-400 shrink-0" />
                <div>
                  <a href="tel:+919811803530" className="hover:text-white transition-colors block">+91 98118 03530</a>
                  <a href="https://wa.me/919811803530" className="hover:text-brand-accent transition-colors block mt-1">WhatsApp Us</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-400 shrink-0" />
                <a href="mailto:straightlineawp@gmail.com" className="hover:text-white transition-colors">straightlineawp@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-brand-400 shrink-0" />
                <span>JHK Cosmic Pvt. Ltd.<br/>New Delhi, India</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-brand-800 text-center text-brand-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Straightline AWP. All rights reserved.</p>
          <p>Made By Ekam Singh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
