import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Cleaned up imports - only using what is needed to stop the warnings
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
    { role: 'ai', content: "Welcome to MVIPL Architectural Intelligence. How can I help you explore our 5.5 Million Sq.Ft of ongoing excellence?", type: 'text' }
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

      // Trigger for Contact Details
      if (q.includes('contact') || q.includes('detail') || q.includes('phone') || q.includes('address') || q.includes('office') || q.includes('email')) {
        response = { 
          role: 'ai', 
          type: 'contact_card', 
          data: MVIPL_BRAIN.contact,
          content: "Here are our official contact and corporate office details:"
        };
      } 
      else if (q.includes('project') || q.includes('ongoing')) {
        response = { role: 'ai', type: 'project_list', data: MVIPL_BRAIN.projects.ongoing, content: "We are currently developing several landmarks:" };
      } 
      else {
        response.content = "I can provide our Corporate Office address, contact numbers, or details regarding our residential and commercial projects. What would you like to see?";
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
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="w-[400px] h-[680px] bg-[#020617] text-slate-200 rounded-[2.5rem] shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-blue-500/30 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-7 bg-gradient-to-b from-blue-900/40 to-transparent border-b border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                    <RiBuilding2Line size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">MVIPL Concierge</h2>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">System Online</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors text-white">
                  <RiCloseLine size={28} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[90%] space-y-3">
                    <div className={`p-4 rounded-2xl text-[13.5px] leading-relaxed shadow-lg ${
                      msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900/90 border border-blue-500/20 text-slate-100 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>

                    {msg.type === 'contact_card' && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/40 rounded-3xl p-6 space-y-5 shadow-2xl">
                        <div className="flex items-start gap-4">
                          <RiPhoneFill className="text-blue-400 mt-1" size={20} />
                          <div>
                            <p className="text-[10px] uppercase text-blue-400 font-black tracking-widest">Phone</p>
                            <p className="text-md text-white font-bold">{msg.data.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <RiMailFill className="text-blue-400 mt-1" size={20} />
                          <div className="w-full overflow-hidden">
                            <p className="text-[10px] uppercase text-blue-400 font-black tracking-widest">Email</p>
                            <p className="text-md text-white font-bold truncate">{msg.data.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 border-t border-white/10 pt-4">
                          <RiMapPin2Fill className="text-blue-400 mt-1" size={22} />
                          <div>
                            <p className="text-[10px] uppercase text-blue-400 font-black tracking-widest">Corporate HQ</p>
                            <p className="text-[13px] text-slate-200 leading-relaxed font-semibold mt-1">
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
                <div className="flex items-center gap-3 text-blue-400 animate-pulse ml-2">
                  <RiFocus2Line className="animate-spin" size={18} />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scanning MVIPL Database...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-xl border-t border-white/5">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ask for office details or projects..."
                  className="w-full bg-black/40 border border-white/10 px-6 py-4 rounded-2xl text-sm text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-500"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={() => handleSend()} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-colors">
                  <RiSendPlane2Fill size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LARGE PREMIUM TRIGGER BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-24 w-24 bg-[#020617] border-2 border-blue-500 rounded-full flex items-center justify-center relative shadow-[0_0_40px_rgba(37,99,235,0.4)] group overflow-hidden"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-transparent border-t-blue-400 rounded-full opacity-30"
        />

        <div className="flex flex-col items-center gap-1 z-10">
          {isOpen ? (
            <RiCloseLine size={36} className="text-white" />
          ) : (
            <>
              <RiBuilding2Line size={42} className="text-blue-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-[10px] font-black text-white tracking-[0.1em] uppercase">AI Build</span>
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default AskAIButton;