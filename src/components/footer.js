function Footer() {
    return (
      <footer className="bg-black text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">True Iron</h2>
            <p className="text-sm">
              Premium gym equipment for commercial and home use. Trusted by fitness professionals across India.
            </p>
          </div>
  
          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>Commercial Gym Setup</li>
              <li>Home Gym Setup</li>
              <li>Massagers</li>
              <li>Accessories</li>
            </ul>
          </div>
  
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Service & Repair</li>
              <li>Certified Products</li>
              <li>Warranty Info</li>
              <li>Download Catalogue</li>
            </ul>
          </div>
  
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 +91 98765 43210</li>
              <li>📧 support@trueiron.com</li>
              <li>📍 Chennai, India</li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} True Iron. All rights reserved.
        </div>
      </footer>
    );
  }
  
  export default Footer;
  