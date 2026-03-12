import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaRegEnvelope, 
  FaUserAlt,
  FaWhatsapp,
  FaArrowRight
} from 'react-icons/fa';
import logo from '../logo.png'; 

const Footer = () => {
  const whatsappNumber = "919945196777";
  const message = "Hello Multiversal Infra, I would like to inquire about your projects.";

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <footer className="relative bg-[#02040a] text-white py-10 px-6 md:px-16 overflow-hidden border-t border-white/10 font-sans">
      
      {/* 1. BRIGHTNESS ENGINE (High-Intensity Blue Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* 2. ADVANCED HUD SCANNER (Laser Line) */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden opacity-50">
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* TOP ROW: COMPACT DASHBOARD */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 border-b border-white/5 pb-10">
          
          {/* Brand Signature */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <motion.img 
              whileHover={{ scale: 1.05, rotate: -1 }}
              src={logo} alt="MVIPL" className="h-9 w-auto brightness-125" 
            />
            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-blue-500/60">
              Architecting Bangalore • Est. 2015
            </p>
          </div>

          {/* Technical Contact HUD */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-14">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Secure Line</span>
              <a href="tel:+919945196777" className="text-lg font-black tracking-tighter text-white hover:text-blue-400 transition-colors">
                +91 99451 96777
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-2">
                <FaRegEnvelope size={10} className="text-blue-500" /> Digital Hub
              </span>
              <a href="mailto:multiversalinfra@gmail.com" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">
                multiversalinfra@gmail.com
              </a>
            </div>

            <div className="hidden sm:flex flex-col gap-1 border-l border-white/10 pl-8">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Global HQ</span>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">
                Whitefield, Bangalore
              </p>
            </div>
          </div>

          {/* Action: WhatsApp Inquiry */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsApp}
            className="group relative bg-white text-black px-8 py-4 rounded-2xl flex items-center gap-4 transition-all overflow-hidden shadow-[0_15px_35px_rgba(59,130,246,0.2)]"
          >
            {/* Animated Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex items-center gap-3">
              <FaWhatsapp size={20} className="text-green-600 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">
                Start Project Inquiry
              </span>
            </div>
            <FaArrowRight className="relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all" size={12} />
          </motion.button>
        </div>

        {/* BOTTOM STRIP: SOCIALS & LEGAL */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-6">
          <div className="flex gap-4">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaInstagram />} />
          </div>

          <p className="text-[8px] font-bold uppercase tracking-[0.6em] text-gray-700">
            © 2015-2025 Multiversal Infra Pvt Ltd
          </p>

          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest items-center">
            {/* Fixed Unused Warning for FaUserAlt */}
            <span className="flex items-center gap-2 text-blue-500 hover:text-white cursor-pointer transition-colors group">
              <FaUserAlt size={10} /> Employee Portal
            </span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-blue-500 cursor-pointer transition-colors">Legal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

// Sub-Component for High-End Social Icons
const SocialIcon = ({ icon }) => (
  <motion.div 
    whileHover={{ y: -3, backgroundColor: 'rgba(59, 130, 246, 0.15)', borderColor: 'rgba(59, 130, 246, 0.3)' }}
    className="w-9 h-9 rounded-xl border border-white/5 flex items-center justify-center text-gray-500 hover:text-blue-400 transition-all cursor-pointer backdrop-blur-md bg-white/5"
  >
    {React.cloneElement(icon, { size: 14 })}
  </motion.div>
);

export default Footer;