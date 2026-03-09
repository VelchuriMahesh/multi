import React, { useState } from 'react';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowLeft, HiShieldCheck } from 'react-icons/hi';

const Login = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        alert("Incorrect Email or Password. Please try again.");
      } else {
        alert("Login Error: " + err.message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1630] p-4 md:p-8 relative overflow-hidden">
      
      {/* Decorative Background Glows for Premium Look */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-900/40 rounded-full blur-[120px]" />

      {/* Back to Website Button - Adjusted for Mobile */}
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-white/40 hover:text-white transition-all font-bold text-[10px] tracking-widest uppercase z-20"
      >
        <HiOutlineArrowLeft size={16} /> 
        <span className="hidden sm:inline">Back to Website</span>
        <span className="sm:hidden">Back</span>
      </button>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-full max-w-md animate-in fade-in zoom-in duration-700 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-6">
                <HiShieldCheck size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">ADMIN PORTAL</h2>
            <p className="text-gray-400 mt-2 text-xs md:text-sm font-medium">Secure access for MVIPL Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">Gmail Address</label>
            <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="email" 
                    placeholder="admin@gmail.com" 
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest">Secret Password</label>
            <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    className="w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl ${
                  isLoggingIn 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#0a1630] text-white hover:bg-blue-600 active:scale-95 shadow-blue-900/10'
              }`}
            >
              {isLoggingIn ? "Verifying Access..." : "Secure Login"}
            </button>
          </div>

        </form>

        {/* Footer info */}
        <div className="mt-10 flex flex-col items-center gap-2">
            <p className="text-gray-300 text-[9px] uppercase font-black tracking-[0.2em]">
                Protected by MVIPL Security
            </p>
            <div className="h-1 w-12 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;