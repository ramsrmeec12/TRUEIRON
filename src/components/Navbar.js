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
  const { cartItems } = useCart(); // ✅ Get cart items from context
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/Commercial?search=${encodeURIComponent(searchTerm.trim())}`);
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
    setSearchTerm(suggestion.name);
    navigate(`/Commercial?search=${encodeURIComponent(suggestion.name)}`);
    setShowSuggestions(false);
  };

  const handleMenuClose = () => setMenuOpen(false);

  return (
    <div className="font-roboto sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div style={{ backgroundColor: '#353535' }} className="py-2 px-3 text-center md:flex justify-between">
        <a href="tel:+919840856756" className="text-white pl-5">
          📞 Call Us: +91 98408 56756
        </a>
        <div className="flex gap-3 text-white">
          <Link to="/location" className="hidden md:block">Store Locater</Link>
          <Link to="/contact" className="hidden md:block">Contact Us</Link>
        </div>
      </div>

      {/* Main Nav */}
      <div className='relative flex items-center justify-between px-4 md:px-[5%] py-2'>
        {/* Logo */}
        <Link to="/"><img src={logo} className='h-10 md:h-13' alt="Logo" /></Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-col relative">
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 bg-white">
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
              className="outline-none bg-transparent"
            />
            <button type="submit" className='border border-black px-2 p-1 rounded-md ml-2'>Submit</button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && searchTerm && filteredSuggestions.length > 0 && (
            <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded shadow z-50">
              {filteredSuggestions.map((s, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(s)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {s.name} – <span className="text-sm text-gray-500">{s.subcategory}</span>
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Desktop Nav */}
        <div className='hidden md:flex gap-4 pr-4 items-center'>
          <Link to="/Commercial">Commercial</Link>
          <Link to="/support">Support</Link>
          <Link to="/contact">Contact Us</Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative flex items-center">
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Cart + Menu Toggle */}
<div className="md:hidden flex items-center gap-4 pr-2">
  {/* Cart Icon */}
  <Link to="/cart" className="relative">
    <FiShoppingCart size={22} />
    {cartItems.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {cartItems.length}
      </span>
    )}
  </Link>

  {/* Menu Button */}
  <button onClick={() => setMenuOpen(!menuOpen)}>
    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
  </button>
</div>

      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 px-4 py-2 space-y-2">
          <Link to="/Commercial" className="block" onClick={handleMenuClose}>Commercial</Link>
          <Link to="/support" className="block" onClick={handleMenuClose}>Support</Link>
          <Link to="/contact" className="block" onClick={handleMenuClose}>Contact Us</Link>
          <Link to="/location" className="block" onClick={handleMenuClose}>Store Locater</Link>

          {/* Mobile Cart */}
          <Link to="/cart" className="block flex items-center gap-2" onClick={handleMenuClose}>
            <FiShoppingCart />
            Cart
            {cartItems.length > 0 && (
              <span className="ml-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
