import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ShieldCheck, Leaf, Clock, ShoppingCart, Target,MapPin, Building2, ChevronRight,
  Quote, Phone, Mail, Globe
} from 'lucide-react';

const AboutPage = () => {
  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const directors = [
    { name: "M Satish Kumar", role: "Director", initials: "SK" },
    { name: "Prasadreddy", role: "Director", initials: "PR" },
    { name: "Muralikrishna", role: "Director", initials: "MK" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left" style={{ scaleX }} />

      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=90" 
            alt="Real Estate" 
            className="w-full h-full object-cover opacity-40 scale-110 transition-transform duration-[10s] hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-transparent to-[#0a0f1a]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
              ESTABLISHED 2021
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase">
              Multiversal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Infra</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              We don't just build structures; we architect 
              <span className="text-white font-medium"> High-Quality Living Experiences </span> 
              driven by integrity.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-sm font-bold tracking-[0.3em] text-blue-500 uppercase mb-4">The MVIPL DNA</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Crafting Excellence Through Two Non-Negotiable Pillars.
            </h3>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Clock className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">On-Time Delivery</h4>
                  <p className="text-slate-400 leading-relaxed">Our commitment to timelines is sacred. We utilize advanced project management to ensure every key is handed over as promised.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <ShieldCheck className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Unmatched Quality</h4>
                  <p className="text-slate-400 leading-relaxed">Premium construction standards aren't just a goal; they are our baseline. We build for generations.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="relative p-2 bg-gradient-to-br from-blue-500/20 to-transparent rounded-[2.5rem]"
          >
            <div className="rounded-[2rem] overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                alt="Office Interior" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Overlay Statistics Card */}
            <div className="absolute -bottom-10 -left-10 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-2xl hidden md:block">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Target className="text-white w-5 h-5" />
                 </div>
                 <span className="text-white font-bold">100% Transparency</span>
               </div>
               <p className="text-sm text-slate-400 max-w-[200px]">Building as simple and transparent as buying products online.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section - Advanced Typography (No Photos) */}
      <section className="py-32 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">Executive Leadership</h2>
            <p className="text-slate-500">The visionaries steering Multiversal Infra toward a new horizon.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {directors.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/40 border border-slate-800 p-12 rounded-[2rem] text-center transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]"
              >
                <div className="w-24 h-24 mx-auto mb-8 relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                   <div className="absolute inset-0 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl font-black text-white border border-slate-700">
                      {member.initials}
                   </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-500 font-medium tracking-widest uppercase text-xs mb-6">{member.role}</p>
                <div className="flex justify-center gap-3">
                   <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                      <ChevronRight className="w-4 h-4" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision - Grid Layout */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
           <motion.div {...fadeInUp} className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 rounded-[2.5rem] text-white">
              <Quote className="w-12 h-12 mb-6 opacity-30" />
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-xl font-light leading-relaxed opacity-90">
                "Achieve our vision by maintaining the highest standards of <span className="font-bold underline">Excellence in Design</span> and Innovation, supported by unwavering Integrity and Dedication."
              </p>
           </motion.div>
           
           <div className="grid gap-8">
              <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 flex gap-6">
                 <Leaf className="text-emerald-500 shrink-0 w-8 h-8" />
                 <div>
                    <h4 className="text-xl font-bold text-white mb-2">Eco-Conscious Development</h4>
                    <p className="text-slate-400">Pioneering cost-effective, eco-friendly, and secure living environments.</p>
                 </div>
              </div>
              <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 flex gap-6">
                 <ShoppingCart className="text-blue-500 shrink-0 w-8 h-8" />
                 <div>
                    <h4 className="text-xl font-bold text-white mb-2">Digital Efficiency</h4>
                    <p className="text-slate-400">Making the complex journey of construction as simple as an online purchase.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Advanced Footer */}
      <footer className="bg-black pt-32 pb-12 relative overflow-hidden">
        {/* Subtle Background Text */}
        <div className="absolute top-0 left-0 text-[15rem] font-black text-white/[0.02] -translate-y-1/2 select-none pointer-events-none">
          MVIPL
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tighter">MULTIVERSAL INFRA</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                Transforming the real estate landscape of Bangalore through modern engineering and client-focused design.
              </p>
              <div className="flex gap-4">
                {[Globe, Phone, Mail].map((Icon, i) => (
                  <div key={i} className="w-10 h-10 border border-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all cursor-pointer">
                    <Icon className="w-4 h-4 text-slate-400 hover:text-white" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Head of Office</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-400 group">
                  <MapPin className="text-blue-500 shrink-0 w-5 h-5 group-hover:scale-110 transition-transform" />
                  <div className="text-sm leading-relaxed">
                    Villa no 12, Saicity villas<br />
                    K.Dommasandra, Kodigehalli main road<br />
                    Behind kidzee school,<br />
                    Belathur road, Whitefield<br />
                    Bangalore
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Navigation</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-blue-500 cursor-pointer flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" /> Portfolio
                </li>
                <li className="hover:text-blue-500 cursor-pointer flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" /> Sustainability
                </li>
                <li className="hover:text-blue-500 cursor-pointer flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" /> Career
                </li>
                <li className="hover:text-blue-500 cursor-pointer flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" /> Compliance
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-[0.2em] text-slate-600">
            <p>© 2021 MULTIVERSAL INFRA PRIVATE LIMITED. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8 uppercase">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;