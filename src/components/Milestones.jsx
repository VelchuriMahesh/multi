import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion';
import { HiOutlineHomeModern, HiOutlineBuildingOffice2, HiOutlineCheckBadge } from 'react-icons/hi2';

// --- SUB-COMPONENT: ANIMATED COUNTER ---
const Counter = ({ value, duration = 2 }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      const controls = animate(0, value, {
        duration: duration,
        onUpdate(value) {
          node.textContent = value.toFixed(value % 1 === 0 ? 0 : 1);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={nodeRef}>0</span>;
};

// --- SUB-COMPONENT: 3D TILT CARD ---
const MilestoneCard = ({ icon: Icon, value, label, sublabel, color, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)]" />
      
      {/* Glow Effect */}
      <div className={`absolute -inset-px rounded-[2.5rem] bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div style={{ transform: "translateZ(50px)" }} className="relative p-10 flex flex-col items-center text-center">
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/20`}>
          <Icon size={36} />
        </div>

        <div className="flex items-baseline gap-1 mb-2">
          <h3 className="text-6xl font-black text-slate-900 tracking-tighter">
            <Counter value={value} />
          </h3>
          <span className="text-2xl font-black text-blue-600 tracking-tighter">{sublabel}</span>
        </div>

        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-tight max-w-[120px]">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

const Milestones = () => {
  return (
    <section className="relative py-32 bg-[#F0F2F5] overflow-hidden">
      
      {/* Background Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-blue-400/10 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 -right-[10%] w-[600px] h-[600px] bg-indigo-400/10 blur-[100px] rounded-full" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block"
          >
            The Metrics of Mastery
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]"
          >
            LEGACY IN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">NUMBERS.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 perspective-[1000px]">
          <MilestoneCard 
            icon={HiOutlineHomeModern} 
            value={2.5} 
            sublabel="M"
            label="Million Sq.Ft Delivered" 
            color="from-blue-600 to-cyan-400"
            delay={0.1}
          />
          <MilestoneCard 
            icon={HiOutlineBuildingOffice2} 
            value={5.5} 
            sublabel="M"
            label="Million Sq.Ft Ongoing" 
            color="from-indigo-600 to-blue-500"
            delay={0.2}
          />
          <MilestoneCard 
            icon={HiOutlineCheckBadge} 
            value={20} 
            sublabel="+"
            label="Completed Projects" 
            color="from-slate-900 to-slate-700"
            delay={0.3}
          />
        </div>

        {/* Dynamic SVG Connection (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full -z-10 opacity-20 h-px">
          <svg width="100%" height="200" viewBox="0 0 1200 200" fill="none">
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M0 100C300 100 300 20 600 20C900 20 900 180 1200 180"
              stroke="url(#gradient-line)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient-line" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Milestones;