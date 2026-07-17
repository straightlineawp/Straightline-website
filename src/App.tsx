import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const Product = lazy(() => import('./pages/Product'));
const Facility = lazy(() => import('./pages/Facility'));
const Contact = lazy(() => import('./pages/Contact'));
const Honway = lazy(() => import('./pages/Honway'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Products = lazy(() => import('./pages/Products'));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#F8FAFC]">
    <div className="w-12 h-12 border-4 border-[#0F4AA1]/20 border-t-[#0F4AA1] rounded-full animate-spin"></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Send GA page_view event on route change
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view', {
        page_path: pathname + search
      });
    }
  }, [pathname, search]);
  return null;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="category/:slug" element={<Category />} />
            <Route path="product/:sku" element={<Product />} />
            <Route path="honway" element={<Honway />} />
            <Route path="facility" element={<Facility />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
    </HelmetProvider>
  );
}

export default App;
