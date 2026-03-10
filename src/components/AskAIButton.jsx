import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiSendPlane2Fill, RiCloseLine, RiBuilding2Line, 
  RiFocus2Line, RiMapPinRangeLine, RiTeamLine,
  RiHammerLine, RiLeafLine, RiPhoneFill, RiMailFill, RiMapPin2Fill
} from 'react-icons/ri';

const MVIPL_BRAIN = {
  stats: { delivered: "2.5M Sq.Ft", ongoing: "5.5M Sq.Ft", projects: "20+" },
  directors: [
    { name: "M Satish Kumar", role: "Director" },
    { name: "Prasadreddy", role: "Director" },
    { name: "Muralikrishna", role: "Director" }
  ],
  projects: {
    ongoing: [
      { name: "Sai City Villas", loc: "Whitefield, Bangalore", details: "Luxury gated community." },
      { name: "Vennela Elite", loc: "Nellore, AP", details: "Premium residential development." },
      { name: "Dharani Residency", loc: "Nellore, AP", details: "Modern living at A.V.K Estates." }
    ]
  },
  contact: {
    phone: "+91 9945 196777",
    email: "multiversalinfra@gmail.com",
    address: "Villa no 12, Saicity villas, K.Dommasandra, Kodigehalli main road, Behind kidzee school, Belathur road, Whitefield, Bangalore"
  }
};

const MVIPLBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Systems initialized. I am your MVIPL Concierge. How can I assist you with our 5.5M Sq.Ft development portfolio?", type: 'text' }
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

      // LOGIC FOR CONTACT DETAILS
      if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('office') || q.includes('call')) {
        response = { 
          role: 'ai', 
          type: 'contact_card', 
          data: MVIPL_BRAIN.contact,
          content: "You can reach our Corporate Office through the following channels:"
        };
      } 
      else if (q.includes('project') || q.includes('ongoing')) {
        response = { role: 'ai', type: 'project_list', data: MVIPL_BRAIN.projects.ongoing, content: "Our current ongoing developments include:" };
      } 
      else if (q.includes('director') || q.includes('team')) {
        response = { role: 'ai', type: 'team', data: MVIPL_BRAIN.directors, content: "Our leadership team consists of visionaries committed to quality." };
      } 
      else {
        response.content = "I can provide contact details, property locations, or information on our ongoing luxury projects. What do you need?";
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
            className="w-[400px] h-[680px] bg-[#020617] text-slate-200 rounded-[2rem] shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-blue-500/30 overflow-hidden flex flex-col"
          >
            {/* --- HEADER --- */}
            <div className="p-6 bg-gradient-to-b from-blue-900/40 to-transparent border-b border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2.5 rounded-xl shadow-[0_0_15px_#2563eb]">
                    <RiBuilding2Line size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white leading-tight">MVIPL AI</h2>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-blue-400 font-bold">Concierge Service</span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <RiCloseLine size={24} />
                </button>
              </div>
            </div>

            {/* --- MESSAGES --- */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[90%] space-y-3">
                    <div className={`p-4 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-900/80 border border-blue-500/20 text-slate-100 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>

                    {/* CONTACT CARD - UPDATED UI */}
                    {msg.type === 'contact_card' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/30 rounded-2xl p-5 space-y-4">
                        <div className="flex items-start gap-3">
                          <RiPhoneFill className="text-blue-400 mt-1" />
                          <div>
                            <p className="text-[10px] uppercase text-blue-400 font-bold">Phone</p>
                            <p className="text-sm text-white font-medium">{msg.data.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <RiMailFill className="text-blue-400 mt-1" />
                          <div className="overflow-hidden">
                            <p className="text-[10px] uppercase text-blue-400 font-bold">Email</p>
                            <p className="text-sm text-white font-medium truncate">{msg.data.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 border-t border-white/5 pt-3">
                          <RiMapPin2Fill className="text-blue-400 mt-1" />
                          <div>
                            <p className="text-[10px] uppercase text-blue-400 font-bold">Corporate Office</p>
                            <p className="text-[12px] text-slate-300 leading-relaxed font-medium">
                              {msg.data.address}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* PROJECT LIST */}
                    {msg.type === 'project_list' && (
                      <div className="grid gap-2">
                        {msg.data.map(p => (
                          <div key={p.name} className="bg-white/5 border border-white/10 p-3 rounded-xl">
                            <h4 className="text-xs font-bold text-blue-400">{p.name}</h4>
                            <p className="text-[10px] text-slate-400">{p.loc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isScanning && (
                <div className="flex items-center gap-2 text-blue-400 animate-pulse">
                  <RiFocus2Line className="animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest">Scanning MVIPL Database...</span>
                </div>
              )}
            </div>

            {/* --- INPUT --- */}
            <div className="p-6 bg-slate-900 border-t border-white/5">
              <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
                {['Contact Details', 'Ongoing Projects', 'Office Location'].map(l => (
                  <button key={l} onClick={() => handleSend(l)} className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-blue-500/20 hover:border-blue-500 transition-all">
                    {l}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ask for details..."
                  className="w-full bg-black/40 border border-white/10 px-5 py-4 rounded-xl text-sm outline-none focus:border-blue-500 transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={() => handleSend()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 rounded-lg">
                  <RiSendPlane2Fill size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- RE-DESIGNED LARGE TRIGGER BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-24 w-24 bg-[#020617] border-2 border-blue-500 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(37,99,235,0.4)] group overflow-hidden"
      >
        {/* Animated Background Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-t-2 border-r-2 border-transparent border-t-blue-400 border-r-blue-400 rounded-full opacity-40"
        />

        <div className="flex flex-col items-center gap-1 z-10">
          {isOpen ? (
            <RiCloseLine size={32} className="text-white" />
          ) : (
            <>
              {/* BRAND LOGO ICON (Large Building Shield) */}
              <div className="relative">
                <RiBuilding2Line size={38} className="text-blue-500 group-hover:text-white transition-colors" />
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full blur-[2px]" 
                />
              </div>
              <span className="text-[9px] font-bold text-white tracking-widest uppercase">Explore</span>
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default MVIPLBot;