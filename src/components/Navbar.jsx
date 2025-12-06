import React, { useEffect, useState } from 'react';
import { FaCarSide, FaSearch, FaUser } from 'react-icons/fa';
import gsap from 'gsap';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-2 group">
                    <FaCarSide className="text-3xl text-red-500 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-2xl font-bold font-display uppercase tracking-widest text-white group-hover:text-red-500 transition-colors">Turbo<span className="text-red-500">Ex</span></span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {['Models', 'Technology', 'Experience', 'Dealers'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium uppercase tracking-wider text-gray-300 hover:text-white relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-red-500 after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300">
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-white hover:text-red-500 transition-colors"><FaSearch size={20} /></button>
                    <button className="text-white hover:text-red-500 transition-colors"><FaUser size={20} /></button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
