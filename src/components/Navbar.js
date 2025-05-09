import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClose = () => {
        setMenuOpen(false);  // Close the menu when a link is clicked
    };

    return (
        <div className="font-roboto sticky top-0 z-50 bg-white shadow-md">
            {/* Top Bar - Only for md and up */}
            <div style={{ backgroundColor: '#353535' }} className="py-2 px-3 text-center md:flex justify-between">
                <a href="tel:+919876543210" className="text-white pl-5">
                    📞 Call Us: +91 9025416751
                </a>
                <div className="flex gap-3 text-white">
                    <Link to={'/location'} className='hidden md:block'>Store Locater</Link>
                    <Link to={'/contact'} className='hidden md:block'>Contact Us</Link>
                </div>
            </div>

            {/* Main Nav */}
            <div className='flex items-center justify-between px-4 md:px-[5%] py-2'>
                {/* Logo */}
                <div>
                    <Link to={'/'}><img src={logo} className='h-10 md:h-13' alt="Logo" /></Link>
                </div>

                {/* Search Bar - Hidden on small screens */}
                <div className="hidden lg:flex items-center border border-gray-300 rounded px-2 py-1">
                    <FiSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="outline-none bg-transparent "
                    />
                    <button className='border border-black px-2 p-1 rounded-md'>Submit</button>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex gap-4 pr-4'>
                    <Link to={'/homegym'}>Home Gym</Link>
                    <Link to={'/Commercial'}>Commercial</Link>
                    <Link to={'/support'}>Support</Link>
                    <Link to={'/contact'}>Contact Us</Link>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden pr-2">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-100 px-4 py-2 space-y-2">
                    <Link to={'/homegym'} className="block" onClick={handleMenuClose}>Home Gym</Link>
                    <Link to={'/Commercial'} className="block" onClick={handleMenuClose}>Commercial</Link>
                    <Link to={'/support'} className="block" onClick={handleMenuClose}>Support</Link>
                    <Link to={'/contact'} className="block" onClick={handleMenuClose}>Contact Us</Link>
                    <Link to={'/location'} className="block" onClick={handleMenuClose}>Store Locater</Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
