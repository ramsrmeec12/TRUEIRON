import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Commercial from "./pages/Commercial";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Location from "./pages/Location";
import Footer from "./components/footer";
import Contact from "./pages/Contact";
import SupportComplaint from "./pages/Support";
import CertifiedProducts from "./pages/Certifiedproducts";
import ProductDetail from './pages/ProductDetail';
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableContextMenu);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  return (
    <CartProvider>
      <HelmetProvider> 
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            {/* SEO Meta Tags */}
            <Helmet>
              <title>True Iron | Premium Gym Equipment</title>
              <meta name="description" content="True Iron offers top-quality gym equipment for home and commercial use across India." />
              <link rel="icon" href="/favicon.ico" />
              <meta name="robots" content="index, follow" />
              <meta name="keywords" content="gym equipment, commercial gym, home gym, fitness products" />
              <meta property="og:title" content="True Iron | Premium Gym Equipment" />
              <meta property="og:description" content="Premium gym equipment for commercial and home use. Trusted by fitness professionals across India." />
              <meta property="og:image" content="https://trueiron.shop/favicon.ico" />
              <meta property="og:url" content="https://trueiron.shop" />
              <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <Navbar />

            {/* Main content grows to fill space */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Commercial" element={<Commercial />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/location" element={<Location />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/support" element={<SupportComplaint />} />
                <Route path="/certifiedproducts" element={<CertifiedProducts />} />
                <Route path="/product/:id" element={<ProductDetail />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </CartProvider>
  );
}

export default App;
