import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="font-roboto sticky top-0 z-50 bg-white shadow-md">
            {/* Top Bar - Only for md and up */}
            <div style={{ backgroundColor: '#353535' }} className="py-2 px-3 hidden md:flex justify-between">
                <a href="tel:+919876543210" className="text-white pl-5">
                    📞 Call Us: +91 98765 43210
                </a>
                <div className="flex gap-3 text-white">
                    <Link>Store Locater</Link>
                    <Link>Contact Us</Link>
                </div>
            </div>

            {/* Main Nav */}
            <div className='flex items-center justify-between px-4 md:px-[5%] py-2'>
                {/* Logo */}
                <div>
                    <Link><img src={logo} className='h-16' alt="Logo" /></Link>
                </div>

                {/* Search Bar - Hidden on small screens */}
                <div className="hidden md:flex items-center border border-gray-300 rounded px-2 py-1">
                    <FiSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="outline-none bg-transparent"
                    />
                    <button className='border border-black px-2 p-1 rounded-md'>Submit</button>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex gap-4 pr-4'>
                    <Link>Home Gym</Link>
                    <Link>Commercial</Link>
                    <Link>Support</Link>
                    <Link>Contact Us</Link>
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
                    <Link className="block">Home Gym</Link>
                    <Link className="block">Commercial</Link>
                    <Link className="block">Support</Link>
                    <Link className="block">Contact Us</Link>
                    <Link className="block">Store Locater</Link>
                    <a href="tel:+919876543210" className="block">📞 +91 98765 43210</a>
                </div>
            )}
        </div>
    );
}

export default Navbar;
