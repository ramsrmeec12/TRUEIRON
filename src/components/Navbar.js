import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { products } from '../data';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/Commercial?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const filteredSuggestions = products
    .filter(p => {
      const combined = `${p.name} ${p.category} ${p.subcategory}`.toLowerCase();
      return p.type === 'Commercial' && combined.includes(searchTerm.toLowerCase());
    })
    .slice(0, 5);

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm('');
    navigate(`/Commercial?search=${encodeURIComponent(suggestion.name)}`);
    setShowSuggestions(false);
  };

  const handleMenuClose = () => setMenuOpen(false);

  const navLinks = [
    { label: 'Commercial', to: '/commercial' },
    { label: 'Support', to: '/support' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Store Locater', to: '/location' },
  ];

  return (
    <div className="font-roboto sticky top-0 z-50 bg-white shadow-md transition-all duration-300">
      {/* Top Bar */}
      <div style={{ backgroundColor: '#353535' }} className="py-2 px-3 text-center md:flex justify-between">
        <a href="tel:+916385706756" className="text-white pl-5 hover:underline transition">📞 Call Us: +91 63857 06756</a>
        <div className="flex gap-3 text-white">
          <Link to="/location" className="hidden md:block hover:underline transition">Store Locater</Link>
          <Link to="/contact" className="hidden md:block hover:underline transition">Contact Us</Link>
        </div>
      </div>

      {/* Main Nav */}
      <div className='relative flex items-center justify-between px-4 md:px-[5%] py-2'>
        {/* Logo */}
        <Link to="/" className="transform transition-transform hover:scale-105">
          <img src={logo} className='h-10 md:h-13' alt="Logo" />
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-col relative">
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white shadow-sm transition">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="outline-none bg-transparent w-52"
            />
            <button type="submit" className='border border-black px-2 p-1 rounded-md ml-2 hover:bg-black hover:text-white transition'>
              Submit
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && searchTerm && filteredSuggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded shadow z-50 animate-fadeIn slide-in-down">
              {filteredSuggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(s)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {s.name} – <span className="text-sm text-gray-500">{s.subcategory}</span>
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Desktop Nav */}
        <div className='hidden md:flex gap-4 pr-4 items-center'>
          {navLinks.slice(0, 3).map(({ label, to }, i) => (
            <Link
              key={i}
              to={to}
              className="hover:text-red-600 transition"
            >
              {label}
            </Link>
          ))}

          {/* Cart Icon */}
          <Link to="/cart" className="relative flex items-center hover:text-red-600 transition">
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Cart + Menu Toggle */}
        <div className="md:hidden flex items-center gap-4 pr-2">
          <Link to="/cart" className="relative">
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="transition">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 px-4 py-2 space-y-2 animate-fadeIn slide-in-down transition-all duration-300 ease-in-out">
          {navLinks.map(({ label, to }, i) => (
            <Link key={i} to={to} className="block hover:text-red-600 transition" onClick={handleMenuClose}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
