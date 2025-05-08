import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import { FiSearch } from 'react-icons/fi'; // Feather Icons

function Navbar() {

    return (
        <div className="font-roboto sticky top-0 bottom-0 z-50">
            <div style={{ backgroundColor: '#353535' }} className="py-2 flex justify-between px-3">
                <a href="tel:+919876543210" style={{ color: 'white', textDecoration: 'none' }} className="pl-5">
                    📞 Call Us: +91 98765 43210
                </a>
                <div className="flex gap-3 text-white">
                    <Link>Store Locater</Link>
                    <Link>Contact Us</Link>
                </div>

            </div>
            <div className='flex items-center justify-between lg:px-[5%]'>
                <div>
                    <Link><img src={logo} className='h-16' /></Link>
                </div>
                <div className="hidden md:flex items-center border border-gray-300 rounded px-2 py-1">
                    <FiSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="outline-none bg-transparent"
                    />
                    <button className='border border-black px-2 p-1 rounded-md'>Submit</button>
                </div>

                <div className='flex gap-4 pr-4'>
                    <Link>Home Gym</Link>
                    <Link>Commercial</Link>
                    <Link>Support</Link>
                    <Link>Contact Us</Link>
                </div>
            </div>

        </div>
    );
}


export default Navbar