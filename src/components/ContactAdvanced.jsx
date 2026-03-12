import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Calendar, ArrowRight } from 'lucide-react';

const MobileContactDock = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[999] bg-white/80 dark:bg-zinc-950/90 backdrop-blur-2xl border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-4 pb-safe-area pt-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        
        {/* Phone Action */}
        <motion.a
          href="tel:+919945196777"
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center justify-center flex-1 py-1 group"
        >
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 group-active:bg-blue-500/10 transition-colors">
            <Phone size={20} className="text-zinc-600 dark:text-zinc-400 group-active:text-blue-500" />
          </div>
          <span className="text-[10px] font-bold mt-1 text-zinc-500 uppercase tracking-tighter">Call</span>
        </motion.a>

        {/* Center Primary Action: WhatsApp */}
        <motion.a
          href="https://wa.me/919945196777"
          target="_blank"
          whileTap={{ y: -4 }}
          className="relative flex-[1.5] flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-2xl shadow-[0_8px_20px_rgba(37,211,102,0.3)]"
        >
          <MessageCircle size={18} fill="currentColor" />
          <span className="text-[12px] font-black uppercase tracking-wide">WhatsApp</span>
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-[#25D366]"></span>
          </span>
        </motion.a>

        {/* Schedule Action */}
        <motion.button
          onClick={() => window.location.href = 'mailto:multiversalinfra@gmail.com'}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center justify-center flex-1 py-1 group"
        >
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 group-active:bg-amber-500/10 transition-colors">
            <Calendar size={20} className="text-zinc-600 dark:text-zinc-400 group-active:text-amber-500" />
          </div>
          <span className="text-[10px] font-bold mt-1 text-zinc-500 uppercase tracking-tighter">Visit</span>
        </motion.button>

      </div>

      {/* Modern Home Indicator Spacer (for iPhones) */}
      <div className="h-4 w-full" />
    </div>
  );
};

export default MobileContactDock;