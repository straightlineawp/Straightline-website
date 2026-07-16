import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-brand-900">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            "name": "Straightline (JHK Cosmic Pvt. Ltd.)",
            "url": "https://straightline.in",
            "logo": "https://straightline.in/assets/straight-line-logo.webp",
            "telephone": "+91-9811803530",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Moti Nagar",
              "addressLocality": "New Delhi",
              "addressRegion": "Delhi",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://www.facebook.com/StraightLineAWP",
              "https://www.instagram.com/straightlineawp"
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
