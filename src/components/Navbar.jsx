import React, { useState, useEffect } from 'react';
import { HiUser, HiMenuAlt3, HiOutlineX } from 'react-icons/hi';
import logo from '../logo.png'; 

const Navbar = ({ onAdminClick, onAboutClick, onHomeClick }) => { 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-500 ${
      isScrolled ? 'bg-[#0a1630] shadow-xl' : 'bg-transparent'
    }`}>
      
      <div onClick={onHomeClick} className="cursor-pointer">
        <img src={logo} alt="Logo" className={isScrolled ? 'h-10' : 'h-12'} />
      </div>
      
      <ul className="hidden md:flex space-x-10 font-bold uppercase text-[10px] tracking-[0.2em] text-white/80">
        <li onClick={onHomeClick} className="hover:text-blue-400 cursor-pointer">Home</li>
        <li onClick={() => { onHomeClick(); setTimeout(() => scrollToSection('projects'), 100); }} className="hover:text-blue-400 cursor-pointer">Projects</li>
        <li onClick={onAboutClick} className="hover:text-blue-400 cursor-pointer">About</li>
        <li onClick={() => { onHomeClick(); setTimeout(() => scrollToSection('contact'), 100); }} className="hover:text-blue-400 cursor-pointer">Contact</li>
      </ul>

      <div className="flex items-center space-x-4 md:space-x-6">
        <button 
          onClick={onAdminClick}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-blue-600 border border-white/20 rounded-full transition-all group"
        >
          <HiUser className="text-white text-lg" />
          <span className="hidden lg:block text-[10px] font-black uppercase text-white tracking-widest">Admin Login</span>
        </button>

        <button className="hidden md:block bg-blue-600 text-white px-7 py-2.5 rounded-full hover:bg-white hover:text-black transition uppercase text-[10px] font-black tracking-widest shadow-lg">
          Enquire Now
        </button>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white">
          {isMobileMenuOpen ? <HiOutlineX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      <div className={`fixed inset-0 bg-[#0a1630] flex flex-col items-center justify-center space-y-8 transition-all duration-500 z-[90] ${
        isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <li onClick={() => { onHomeClick(); setIsMobileMenuOpen(false); }} className="list-none text-2xl font-bold text-white uppercase cursor-pointer">Home</li>
        <li onClick={() => { onAboutClick(); setIsMobileMenuOpen(false); }} className="list-none text-2xl font-bold text-white uppercase cursor-pointer">About</li>
        <li onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }} className="list-none text-2xl font-bold text-blue-400 uppercase border-b-2 border-blue-400 cursor-pointer">Admin Login</li>
        <button onClick={() => setIsMobileMenuOpen(false)} className="mt-10 text-white/30 underline">Close Menu</button>
      </div>
    </nav>
  );
};

export default Navbar;