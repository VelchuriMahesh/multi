import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react';

const AdvancedAboutSection = () => {
  // Parallax effect for the whole container
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.2], [-5, 0]);

  const floatingIcons = [
    { icon: <ShieldCheck />, color: "bg-emerald-500", top: "10%", left: "10%" },
    { icon: <Zap />, color: "bg-yellow-400", top: "20%", right: "15%" },
    { icon: <Globe />, color: "bg-blue-500", bottom: "15%", left: "20%" },
  ];

  return (
    <section className="relative z-30 -mt-24 px-4 pb-20 overflow-visible">
      
      {/* 1. THE BRIGHTNESS ENGINE (Animated Gradient Mesh Background) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-r from-blue-400/40 to-cyan-300/40 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-r from-purple-400/30 to-blue-500/30 blur-[100px] rounded-full"
        />
      </div>

      {/* 2. THE FLOATING GLASSCARD */}
      <motion.div 
        style={{ scale, rotate }}
        className="relative max-w-xl mx-auto"
      >
        {/* Animated Border Beam Effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-[50px] opacity-50 animate-[pan_3s_linear_infinite]" />
        
        <div className="relative bg-white/80 backdrop-blur-3xl rounded-[50px] p-8 pt-14 pb-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white">
          
          {/* Floating Micro-Badges inside card */}
          {floatingIcons.map((item, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity }}
              className={`absolute p-3 rounded-2xl shadow-lg text-white ${item.color} hidden md:block`}
              style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
            >
              {React.cloneElement(item.icon, { size: 20 })}
            </motion.div>
          ))}

          {/* Header Section */}
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 mb-8"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Est. 2015 — Excellence</span>
            </motion.div>

            <h2 className="text-4xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-8">
              WE ARE NOT JUST <br />
              <span className="relative inline-block">
                BUILDING.
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  className="absolute bottom-1 left-0 h-3 bg-blue-500/20 -z-10" 
                />
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                WE ARE EVOLVING.
              </span>
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-10 px-4">
              Multiversal Infra is a synthesis of <span className="text-slate-900 font-bold">Computational Architecture</span> and sustainable human-centric design. We don't just sell plots; we architect legacies.
            </p>

            {/* High-Effect Statistics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="p-4 bg-slate-50 rounded-[2rem] border border-white shadow-inner">
                <p className="text-3xl font-black text-blue-600 tracking-tighter">950+</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Units</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-[2rem] border border-white shadow-inner">
                <p className="text-3xl font-black text-slate-900 tracking-tighter">10k</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Acres Managed</p>
              </div>
            </div>

            {/* Interactive Action Button */}
            <div className="flex flex-col gap-4 px-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-slate-900 text-white py-5 rounded-[2rem] font-bold text-sm overflow-hidden flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">EXPLORE PORTFOLIO</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              
              <button className="py-4 rounded-[2rem] font-bold text-sm text-slate-400 hover:text-blue-600 transition-colors">
                DOWNLOAD BROCHURE
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. SCROLL PROGRESS DECORATION */}
      <div className="absolute left-1/2 -translate-x-1/2 mt-20 flex flex-col items-center gap-4 opacity-20">
        <div className="w-1 h-20 bg-gradient-to-b from-blue-600 to-transparent rounded-full" />
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] vertical-text">SCROLL</p>
      </div>

      <style jsx>{`
        @keyframes pan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
};

export default AdvancedAboutSection;