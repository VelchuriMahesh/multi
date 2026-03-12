import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Building2, 
  Map, 
  Trees, 
  Handshake, 
  ArrowUpRight,
  Zap,
  ChevronRight
} from 'lucide-react';

const AdvancedMobileSales = () => {
  const categories = [
    {
      title: "Residences",
      desc: "Modern Living",
      icon: <Home size={20} />,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      size: "col-span-2 row-span-2"
    },
    {
      title: "Plots",
      desc: "Strategic",
      icon: <Map size={20} />,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
      size: "col-span-1 row-span-1"
    },
    {
      title: "Business",
      desc: "Hubs",
      icon: <Building2 size={20} />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
      size: "col-span-1 row-span-1"
    },
    {
      title: "Villas",
      desc: "Ultra Luxury",
      icon: <Trees size={20} />,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
      size: "col-span-2 row-span-1"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans pb-10 selection:bg-blue-500 selection:text-white">
      
      {/* 1. Ultra-Compact Sticky Header */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <h1 className="text-lg font-black tracking-tighter uppercase">
          M-INFRA<span className="text-blue-600">.</span>
        </h1>
        <div className="flex gap-2">
          <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 active:scale-95 transition-transform">
            CONTACT <Zap size={14} fill="currentColor" />
          </button>
        </div>
      </nav>

      {/* 2. Micro-Hero Section */}
      <header className="px-5 pt-8 pb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-3">
            Bangalore Edition
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight leading-none mb-3">
            Premium <br /> Real Estate<span className="text-blue-600">.</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium max-w-[280px]">
            Curated collections of architectural excellence and strategic land.
          </p>
        </motion.div>
      </header>

      {/* 3. Advanced Bento Grid (Mobile Optimized) */}
      <section className="px-4 grid grid-cols-2 grid-rows-4 gap-3 h-[600px]">
        {categories.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileTap={{ scale: 0.97 }}
            className={`${item.size} relative rounded-[2rem] overflow-hidden group`}
          >
            {/* Background Image */}
            <img 
              src={item.image} 
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover" 
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content Container */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 w-10 h-10 rounded-2xl flex items-center justify-center text-white">
                {item.icon}
              </div>
              
              <div className="flex justify-between items-end">
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{item.desc}</p>
                  <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                </div>
                <div className="bg-white rounded-full p-2 text-slate-900 group-active:rotate-45 transition-transform">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 4. Compressed JV Banner (The "Small Space" version) */}
      <section className="px-4 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-blue-600 rounded-[2.5rem] p-6 text-white relative overflow-hidden"
        >
          {/* Decorative Circles */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-2 opacity-90">
              <Handshake size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Partnership</span>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-1">Joint Venture?</h3>
              <p className="text-blue-100 text-xs leading-relaxed opacity-90">
                Let's transform your land into a high-value landmark project together.
              </p>
            </div>

            <button className="bg-white text-blue-600 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:bg-blue-50 transition-colors">
              Request Proposal <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 5. Minimal Quick Stats */}
      <div className="flex justify-between px-8 mt-10 opacity-40 grayscale">
        <div className="text-center">
          <p className="text-xl font-bold">12+</p>
          <p className="text-[10px] font-bold uppercase tracking-tighter">Projects</p>
        </div>
        <div className="text-center border-x border-slate-300 px-8">
          <p className="text-xl font-bold">500+</p>
          <p className="text-[10px] font-bold uppercase tracking-tighter">Units</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">08</p>
          <p className="text-[10px] font-bold uppercase tracking-tighter">Awards</p>
        </div>
      </div>

    </div>
  );
};

export default AdvancedMobileSales;