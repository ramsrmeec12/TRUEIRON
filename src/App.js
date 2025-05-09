import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";  // Import Helmet
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* SEO Meta Tags */}
        <Helmet>
          <title>True Iron | Premium Gym Equipment</title>
          <meta name="description" content="True Iron offers top-quality gym equipment for home and commercial use across India." />
          <link rel="icon" href="/favicon.ico" />
          {/* Additional Meta Tags */}
          <meta name="robots" content="index, follow" />
          <meta name="keywords" content="gym equipment, commercial gym, home gym, fitness products" />
          <meta property="og:title" content="True Iron | Premium Gym Equipment" />
          <meta property="og:description" content="Premium gym equipment for commercial and home use. Trusted by fitness professionals across India." />
          <meta property="og:image" content="/logo.png" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
