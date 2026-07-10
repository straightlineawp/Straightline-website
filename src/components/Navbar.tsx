import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/honway' },
    { name: 'PRODUCTS', path: '/products', hasDropdown: true },
    { name: 'INFRASTRUCTURE', path: '/facility' },
    { name: 'VIDEO GALLERY', path: '/gallery', hasDropdown: true },
    { name: 'CONTACT US', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-white shadow-md' : 'py-3 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/assets/straight-line-logo.webp" alt="Straightline Logo" className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-300" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-[13px] tracking-wide">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`flex items-center gap-1 transition-colors relative pb-1 ${
                  isActive 
                    ? 'text-[#0a48a0]' 
                    : 'text-[#1e293b] hover:text-[#0a48a0]'
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} strokeWidth={3} className="opacity-50" />}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0a48a0]"></span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Contact Actions */}
        <div className="hidden lg:flex items-center">
          <a 
            href="https://wa.me/919811803530"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-7 py-3 rounded-md text-[13px] font-bold tracking-wider hover:bg-[#1DA851] transition-all"
          >
            <MessageCircle size={16} /> WHATSAPP US <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-[#1e293b]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-brand-100 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`flex items-center justify-between text-base font-bold tracking-wide ${location.pathname === link.path ? 'text-[#0f4eb3]' : 'text-[#1e293b]'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown size={16} />}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100">
            <a 
              href="https://wa.me/919811803530"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-md text-sm font-bold tracking-wide hover:bg-[#1DA851] transition-colors"
            >
              <MessageCircle size={16} /> WHATSAPP US <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
