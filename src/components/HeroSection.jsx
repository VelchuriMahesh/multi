import React from 'react';
import { motion } from 'framer-motion';

const PremiumFramedHero = () => {
  return (
    <div className="relative w-full h-[100dvh] bg-[#080808] flex items-center justify-center overflow-hidden">
      
      {/* 1. THE ARCHITECTURAL FRAME */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[90%] h-[80%] md:w-[85%] md:h-[75%] z-20"
      >
        {/* Outer Glowing Border */}
        <div className="absolute -inset-[1px] bg-gradient-to-tr from-white/20 via-white/5 to-white/20 rounded-sm" />
        
        {/* The Video Container */}
        <div className="relative w-full h-full bg-black overflow-hidden rounded-[2px] shadow-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 scale-105"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Inner Frame Shading */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Corner Accents (The Frame Details) */}
          <div className="absolute top-0 left-0 w-20 h-[1px] bg-white/40" />
          <div className="absolute top-0 left-0 w-[1px] h-20 bg-white/40" />
          
          <div className="absolute bottom-0 right-0 w-20 h-[1px] bg-white/40" />
          <div className="absolute bottom-0 right-0 w-[1px] h-20 bg-white/40" />
        </div>

        {/* Floating Decorative Elements behind frame */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/10 blur-[100px] rounded-full" />
      </motion.div>

      {/* 2. THE PREMIUM SCROLL ANIMATION (The "Tracker") */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pb-10 flex flex-col items-center gap-4">
        
        {/* Vertical Track */}
        <div className="relative w-[2px] h-24 bg-white/5 overflow-hidden">
          {/* Moving Bead Animation */}
          <motion.div 
            animate={{ 
              y: [-100, 100],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "circIn" 
            }}
            className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent via-white/80 to-transparent"
          />
        </div>

        {/* Mechanical Mouse Icon */}
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
              opacity: [1, 0.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </div>

        {/* Micro Text Labels (Visible but non-intrusive) */}
        <div className="flex gap-10 mt-2">
            <span className="text-[7px] tracking-[0.4em] text-white/20 uppercase font-bold">Scroll</span>
            <span className="text-[7px] tracking-[0.4em] text-white/20 uppercase font-bold">Explore</span>
        </div>
      </div>

      {/* 3. LIGHTING REFLECTIONS (Glass Effect) */}
      <div className="absolute inset-0 pointer-events-none z-40 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[120px] rotate-45" />
      </div>

      {/* GLOBAL CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #080808; margin: 0; }
        /* Smooth zoom effect on the container itself */
        @keyframes subtle-breath {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}} />
    </div>
  );
};

export default PremiumFramedHero;