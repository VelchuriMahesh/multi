import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobot2Line, RiSendPlane2Fill, RiCloseLine, RiBuilding2Line } from 'react-icons/ri';

const AskAIButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Welcome to MVIPL. How can I help you explore our 2.5 Million Sq.Ft of excellence today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const KNOWLEDGE_BASE = {
    office: "Villa no 12, Saicity villas, Whitefield, Bangalore.",
    contact: "+91 9945 196777",
    stats: "2.5M Sq.Ft Delivered | 5.5M Sq.Ft Ongoing"
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    if (!text) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = `For specific details on that, please contact our luxury consultants at ${KNOWLEDGE_BASE.contact}.`;
      const query = userMsg.toLowerCase();
      if (query.includes("project")) response = `MVIPL has delivered ${KNOWLEDGE_BASE.stats}. Every project is a masterpiece.`;
      if (query.includes("office")) response = `Our Corporate Suite is located at ${KNOWLEDGE_BASE.office}`;

      setMessages(prev => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-6 w-[380px] h-[600px] bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-white/20"
          >
            {/* Header */}
            <div className="bg-[#0a1630] p-6 text-white relative overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-2xl shadow-lg shadow-blue-500/30">
                    <RiBuilding2Line size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-widest uppercase">MVIPL Concierge</h4>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <p className="text-[10px] text-blue-200 uppercase font-medium tracking-tighter">Premium Service Active</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <RiCloseLine size={24} />
                </button>
              </motion.div>
              {/* Decorative background element */}
              <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-[13.5px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-[#0a1630] text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex gap-1 bg-gray-100 w-12 p-3 rounded-full justify-center"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                      className="w-1 h-1 bg-gray-400 rounded-full"
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Quick Actions - Sliding animation */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="px-6 pb-4 flex gap-2 overflow-x-auto no-scrollbar"
            >
              {['Ongoing Projects', 'Office Map', 'Schedule Call'].map((text) => (
                <button 
                  key={text}
                  onClick={() => handleSendMessage(text)}
                  className="whitespace-nowrap bg-white border border-gray-200 text-[11px] font-semibold px-4 py-2 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-sm"
                >
                  {text}
                </button>
              ))}
            </motion.div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-gray-50">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  placeholder="Inquire about property..."
                  className="w-full bg-gray-50 border border-gray-100 px-5 py-4 rounded-[1.2rem] text-sm outline-none focus:border-blue-500/50 focus:bg-white transition-all shadow-inner"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={() => handleSendMessage()}
                  className="absolute right-2 p-3 bg-[#0a1630] text-white rounded-xl hover:bg-blue-600 transition-all hover:shadow-lg shadow-blue-900/20"
                >
                  <RiSendPlane2Fill size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TOGGLE BUTTON --- */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0a1630] text-white h-16 px-8 rounded-full flex items-center gap-3 shadow-[0_10px_30px_rgba(10,22,48,0.3)] relative group overflow-hidden"
      >
        {/* Animated Background Shine */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2 skew-x-12"
        />
        
        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isOpen ? <RiCloseLine size={24} /> : <RiRobot2Line size={24} />}
          </motion.div>
          <span className="font-bold uppercase text-[11px] tracking-[0.2em]">
            {isOpen ? 'Close' : 'Explore with AI'}
          </span>
        </div>
      </motion.button>
    </div>
  );
};

export default AskAIButton;