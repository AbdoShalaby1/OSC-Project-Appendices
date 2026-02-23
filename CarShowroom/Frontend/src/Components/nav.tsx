import { useState } from "react";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
// @ts-expect-error - suppresses error
import logo from "../Images/logo2.jpg";
import './nav.css';
import { Link } from "react-router-dom";

export default function Navbar() {
    // State to toggle mobile menu
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#171216] text-white sticky top-0 z-50">
            <div>
                <div className="flex justify-between">
                    {/* --- Logo Section --- */}
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="h-[8vh] md:h-[12vh] w-auto object-contain" />
                        </Link>
                        <div className="hidden lg:flex gap-x-8">
                            <Link to="/all-cars" className="hover:text-yellow-400 font-medium transition-colors">
                                All Cars
                            </Link>
                            <Link to="/new-cars" className="hover:text-yellow-400 font-medium transition-colors">
                                New Cars
                            </Link>
                            <Link to="/used-cars" className="hover:text-yellow-400 font-medium transition-colors">
                                Used Cars
                            </Link>
                            <Link to="/makes" className="hover:text-yellow-400 font-medium transition-colors">
                                Browse By Brand
                            </Link>
                        </div>
                    </div>

                    {/* --- Desktop Menu (Hidden on Mobile) --- */}

                    {/* --- Desktop Right Buttons (Hidden on Mobile) --- */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link to="/add-listing" className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-full font-bold hover:shadow-yellow-400/20 transform hover:-translate-y-0.5 transition-all duration-200">
                            + Sell My Car
                        </Link>

                        <button className="cursor-pointer flex items-center text-white font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 mr-2">
                            <FiUser className="mr-2" size={18} />
                            <span>Login</span>
                        </button>
                    </div>

                    {/* --- Mobile Hamburger Button --- */}
                    <div className="lg:hidden flex items-center mr-4">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="cursor-pointer text-white hover:text-yellow-400 focus:outline-none text-[28px] md:text-[40px]"
                        >
                            {isOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- Mobile Menu Dropdown --- */}
            {isOpen && (
                <div className="lg:hidden bg-[#171216] animate-fade-in-down">
                    <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                        <Link to="/makes" className="block text-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-yellow-400">
                            All Brands
                        </Link>
                        <Link to="/used-cars" className="block text-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-yellow-400">
                            Used Cars
                        </Link>
                        <Link to="/new-cars" className="block text-center  px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-yellow-400">
                            New Cars
                        </Link>
                        
                        <div className="pt-4 flex flex-col gap-3">
                            <Link to="/add-listing" className="w-full text-center bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300">
                                + Sell My Car
                            </Link>
                            
                            <button className="cursor-pointer flex items-center justify-center w-full text-white font-medium px-4 py-3 rounded-full hover:bg-white/10 border border-gray-700">
                                <FiUser className="mr-2" size={18} />
                                <span>Login</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}