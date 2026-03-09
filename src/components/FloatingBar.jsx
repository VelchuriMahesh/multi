import React from 'react';
import { FaPhoneAlt, FaWhatsapp, FaRegCalendarAlt } from 'react-icons/fa';

const FloatingBar = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-max animate-in fade-in slide-in-from-bottom-10 duration-1000">
      
      {/* 
        Darker Glassmorphism Container 
        - bg-[#0a1630]/80 creates contrast so white icons are visible.
        - backdrop-blur-xl creates the frosted glass effect.
      */}
      <div className="bg-[#0a1630]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-full flex items-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-white/20 transition-all duration-500">
        
        {/* Main Schedule Button */}
        <button 
          onClick={() => window.location.href = 'mailto:multiversalinfra@gmail.com'}
          className="bg-white text-[#0a1630] px-7 py-3.5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-3 shadow-lg"
        >
          <FaRegCalendarAlt className="text-sm" />
          Schedule Visit
        </button>

        {/* Vertical Divider */}
        <div className="w-[1px] h-8 bg-white/20 mx-4"></div>

        {/* Icons Section */}
        <div className="flex items-center gap-2 pr-4">
          
          {/* Phone Link */}
          <a 
            href="tel:+919945196777" 
            className="text-white p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
            title="Call Support"
          >
            <FaPhoneAlt size={16} />
          </a>

          {/* WhatsApp Link - Explicit Green Color for visibility */}
          <a 
            href="https://wa.me/919945196777" 
            target="_blank" 
            rel="noreferrer"
            className="text-[#25D366] p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110 flex items-center justify-center"
            title="WhatsApp Chat"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default FloatingBar;