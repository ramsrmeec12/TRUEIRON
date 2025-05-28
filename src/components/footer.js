import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">True Iron</h2>
          <p className="text-sm">
            Premium gym equipment for commercial and home use. Trusted by fitness{" "}
            <Link to={'/professionals'}>{isLoggedIn ? 'professionals' : 'professionals'}</Link> across India.
          </p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Follow us</h4>
            <div className="flex space-x-4 text-white text-xl">
              <a href="https://www.instagram.com/true_iron_equipment/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Products */}
        <nav aria-label="Products">
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/commercial'}>Commercial Gym Setup</Link></li>
            <li><Link to={'/contact'}>Custom Products</Link></li>
          </ul>
        </nav>

        {/* Support */}
        <nav aria-label="Support">
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/support'}>Service & Repair</Link></li>
            <li><Link to={'/certifiedproducts'}>Certified Products</Link></li>
            <li><Link to={'/certifiedproducts'}>Warranty Info</Link></li>
            <li>
              <a href="/catalogue.pdf" download="True_Iron_Catalogue">
                Download Catalogue
              </a>
            </li>
            <li><Link to={'/terms'}>Terms and Conditions</Link></li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 <a href="tel:+916385706756">+91 63857 06756</a></li>
            <li>📧 <a href="mailto:support@trueiron.com">support@trueiron.com</a></li>
            <li>📍 Chennai, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} True Iron. All rights reserved.
      </div>
      <p className="border-gray-700 mt-2 text-center text-xs text-gray-400">Powered by Peace Media Company</p>
    </footer>
  );
}

export default Footer;
