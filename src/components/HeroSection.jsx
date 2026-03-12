import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Maximize2, 
  Cpu, 
  Compass, 
  ArrowUpRight, 
  ShieldCheck 
} from 'lucide-react';

const UltraAdvancedHero = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isLive, setIsLive] = useState(true);

  // Simulate dynamic coordinate tracking for HUD feel
  useEffect(() => {
    const timer = setInterval(() => {
      setCoords({
        x: (Math.random() * 100).toFixed(4),
        y: (Math.random() * 100).toFixed(4)
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden font-mono selection:bg-blue-500">
      
      {/* 1. LAYER: CINEMATIC ENGINE */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110 blur-[1px] opacity-60"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Cinematic Film Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Dynamic Scanning Line */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
      </div>

      {/* 2. LAYER: HUD TECH OVERLAY (The "Advanced" look) */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none text-white/40 text-[10px]">
        
        {/* Top HUD */}
        <div className="flex justify-between items-start pt-10">
          <div className="space-y-1">
            <p className="flex items-center gap-2 text-white/80 tracking-[0.2em]">
              <Target size={12} className="text-blue-500" /> SYSTEM_ACTIVE
            </p>
            <p>LOC: 12.9716° N, 77.5946° E</p>
            <p>REF: M-INFRA_HUD_v4.0</p>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center justify-end gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-white/80">REC • LIVE FEED</p>
            </div>
            <p>DATA_STREAM: 48.2 GB/S</p>
          </div>
        </div>

        {/* Middle Viewfinder Brackets */}
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-64 h-64 border border-white/5 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500" />
           </div>
        </div>

        {/* Coordinates HUD (Bottom) */}
        <div className="flex justify-between items-end pb-32">
          <div className="space-y-1">
            <p>X-AXIS: {coords.x}</p>
            <p>Y-AXIS: {coords.y}</p>
          </div>
          <Compass size={24} className="animate-spin-slow opacity-20" />
        </div>
      </div>

      {/* 3. LAYER: INTERACTIVE COMMAND CENTER */}
      <div className="absolute inset-x-0 bottom-0 z-30 p-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 pb-8"
        >
          {/* Main Content Area */}
          <div className="flex justify-between items-start mb-8">
            <div className="max-w-[70%]">
              <motion.div 
                initial={{ x: -20 }} 
                animate={{ x: 0 }}
                className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md w-fit mb-3"
              >
                <ShieldCheck size={12} />
                <span className="text-[9px] font-black uppercase tracking-widest">Verified Assets</span>
              </motion.div>
              <h1 className="text-3xl font-bold text-white tracking-tighter leading-none uppercase italic">
                Multiversal <br /> 
                <span className="text-blue-500 not-italic">Infrastructure</span>
              </h1>
            </div>
            
            {/* Circular Shutter Button */}
            <motion.button 
              whileTap={{ scale: 0.9, rotate: 90 }}
              className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.5)] border-4 border-white/10"
            >
              <div className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
              <ArrowUpRight size={32} className="text-white" />
            </motion.button>
          </div>

          {/* Bottom Control Strip */}
          <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-white/40">
                <Maximize2 size={10} />
                <span className="text-[8px] font-bold uppercase">Land</span>
              </div>
              <p className="text-xs text-white font-bold">4.2k Acres</p>
            </div>
            <div className="flex flex-col gap-1 border-x border-white/10 px-2 text-center">
              <div className="flex items-center justify-center gap-2 text-white/40">
                <Cpu size={10} />
                <span className="text-[8px] font-bold uppercase">AI Valuation</span>
              </div>
              <p className="text-xs text-blue-400 font-bold">Top 1%</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <div className="flex items-center gap-2 text-white/40">
                <Zap size={10} />
                <span className="text-[8px] font-bold uppercase">Yield</span>
              </div>
              <p className="text-xs text-white font-bold">18.4% APY</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS For Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UltraAdvancedHero;