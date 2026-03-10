import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Building2, 
  Map, 
  Trees, 
  Handshake, 
  ArrowUpRight 
} from 'lucide-react';

const SalesOnlyPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const salesCategories = [
    {
      title: "Residential Homes",
      desc: "Architectural excellence in modern living.",
      icon: <Home className="w-8 h-8 text-blue-600" />,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      span: "md:col-span-2"
    },
    {
      title: "Commercial",
      desc: "Strategic business hubs.",
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
      span: "md:col-span-1"
    },
    {
      title: "Land Development",
      desc: "Prime investment plots.",
      icon: <Map className="w-8 h-8 text-blue-600" />,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
      span: "md:col-span-1"
    },
    {
      title: "Luxury Villas",
      desc: "Exclusive gated communities.",
      icon: <Trees className="w-8 h-8 text-blue-600" />,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
      span: "md:col-span-2"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Navigation / Brand */}
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-black tracking-tighter uppercase">
          Multiversal <span className="text-blue-600">Infra</span>
        </h1>
        <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:text-white transition-colors">
          <ArrowUpRight size={20} />
        </div>
      </nav>

      {/* Hero Headline */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-4xl"
        >
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6">
            REAL ESTATE <br />
            <span className="text-blue-600">COLLECTIONS.</span>
          </h2>
          <p className="text-xl text-slate-500 font-light max-w-xl">
            Explore our diverse portfolio of residential, commercial, and land development projects across Bangalore.
          </p>
        </motion.div>
      </section>

      {/* Main Sales Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {salesCategories.map((item, index) => (
          <motion.div 
            key={index}
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
            className={`${item.span} group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-slate-100`}
          >
            {/* Image Layer */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            
            {/* Content Layer */}
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
              <div>
                <div className="bg-white/90 backdrop-blur p-3 rounded-2xl w-fit mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-1">{item.title}</h3>
                <p className="text-slate-600 font-medium">{item.desc}</p>
              </div>
              <button className="bg-white p-4 rounded-full shadow-lg group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:rotate-45">
                <ArrowUpRight size={24} />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Development Opportunity Card */}
        <motion.div 
          {...fadeInUp}
          className="md:col-span-3 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-blue-400 font-bold tracking-widest uppercase text-xs mb-4">
              <Handshake size={18} /> Partnership
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Looking for Development?</h3>
            <p className="text-slate-400 text-lg max-w-xl">
              Partner with Multiversal Infra for Joint Ventures. We turn your land into landmark residential and commercial destinations.
            </p>
          </div>
          <button className="relative z-10 bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold transition-all hover:px-12">
            Connect Now
          </button>
          {/* Subtle design element */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-600 opacity-10 blur-[100px] rounded-full"></div>
        </motion.div>
      </section>

      {/* Simple Space-filler / Bottom Margin */}
      <div className="h-20"></div>

    </div>
  );
};

export default SalesOnlyPage;