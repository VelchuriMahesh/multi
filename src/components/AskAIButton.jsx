import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiSendPlane2Fill, 
  RiCloseLine, 
  RiBuilding2Line, 
  RiFocus2Line, 
  RiPhoneFill, 
  RiMailFill, 
  RiMapPin2Fill 
} from 'react-icons/ri';

const MVIPL_BRAIN = {
  stats: { delivered: "2.5M Sq.Ft", ongoing: "5.5M Sq.Ft", projects: "20+" },
  projects: {
    ongoing: [
      { name: "Sai City Villas", loc: "Whitefield, Bangalore" },
      { name: "Vennela Elite", loc: "Nellore, AP" },
      { name: "Dharani Residency", loc: "Nellore, AP" }
    ]
  },
  contact: {
    phone: "+91 9945 196777",
    email: "multiversalinfra@gmail.com",
    address: "Villa no 12, Saicity villas, K.Dommasandra, Kodigehalli main road, Behind kidzee school, Belathur road, Whitefield, Bangalore"
  }
};

const AskAIButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Welcome to MVIPL Architectural Intelligence. How can I help you?", type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isScanning]);

  const processQuery = (query) => {
    const q = query.toLowerCase();
    setIsScanning(true);

    setTimeout(() => {
      let response = { role: 'ai', type: 'text' };

      if (q.includes('contact') || q.includes('detail') || q.includes('phone') || q.includes('address') || q.includes('office') || q.includes('email')) {
        response = { 
          role: 'ai', 
          type: 'contact_card', 
          data: MVIPL_BRAIN.contact,
          content: "Here are our official contact details:"
        };
      } 
      else if (q.includes('project') || q.includes('ongoing')) {
        response = { role: 'ai', type: 'project_list', data: MVIPL_BRAIN.projects.ongoing, content: "Current active landmarks:" };
      } 
      else {
        response.content = "I can provide Office addresses, contact numbers, or project details. What would you like to see?";
      }

      setMessages(prev => [...prev, response]);
      setIsScanning(false);
    }, 1000);
  };

  const handleSend = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: msg, type: 'text' }]);
    setInput('');
    processQuery(msg);
  };

  return (
    /* Moved up by 1mm (approx 4px): bottom-6 (24px) -> bottom-[28px] */
    <div className="fixed bottom-[28px] right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] md:w-[400px] h-[600px] bg-[#020617] text-slate-200 rounded-[2rem] shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-blue-500/30 overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-b from-blue-900/40 to-transparent border-b border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                    <RiBuilding2Line size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-tight">MVIPL Concierge</h2>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[8px] uppercase tracking-widest text-blue-400 font-bold">Live</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors text-white">
                  <RiCloseLine size={24} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[90%] space-y-2">
                    <div className={`p-3 rounded-xl text-[12.5px] leading-relaxed shadow-lg ${
                      msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900/90 border border-blue-500/20 text-slate-100 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>

                    {msg.type === 'contact_card' && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/40 rounded-2xl p-4 space-y-4 shadow-xl text-[12px]">
                        <div className="flex items-start gap-3">
                          <RiPhoneFill className="text-blue-400 mt-1" size={16} />
                          <div>
                            <p className="text-[8px] uppercase text-blue-400 font-black tracking-widest">Phone</p>
                            <p className="text-white font-bold">{msg.data.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <RiMailFill className="text-blue-400 mt-1" size={16} />
                          <div className="w-full overflow-hidden">
                            <p className="text-[8px] uppercase text-blue-400 font-black tracking-widest">Email</p>
                            <p className="text-white font-bold truncate">{msg.data.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 border-t border-white/10 pt-3">
                          <RiMapPin2Fill className="text-blue-400 mt-1" size={18} />
                          <div>
                            <p className="text-[8px] uppercase text-blue-400 font-black tracking-widest">HQ</p>
                            <p className="text-[11px] text-slate-200 leading-relaxed font-semibold mt-0.5">
                              {msg.data.address}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
              {isScanning && (
                <div className="flex items-center gap-2 text-blue-400 animate-pulse ml-1">
                  <RiFocus2Line className="animate-spin" size={14} />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Scanning...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-900/50 backdrop-blur-xl border-t border-white/5">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ask anything..."
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-xs text-white outline-none focus:border-blue-500/50 transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={() => handleSend()} className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                  <RiSendPlane2Fill size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SMALLER COMPACT TRIGGER BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        /* Reduced size from h-24 w-24 to h-16 w-16 */
        className="h-16 w-16 bg-[#020617] border-2 border-blue-500/50 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(37,99,235,0.3)] group overflow-hidden"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-transparent border-t-blue-400 rounded-full opacity-40"
        />

        <div className="flex flex-col items-center z-10">
          {isOpen ? (
            <RiCloseLine size={28} className="text-white" />
          ) : (
            <>
              <RiBuilding2Line size={24} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-[7px] font-black text-white tracking-widest uppercase mt-0.5">AI</span>
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default AskAIButton;