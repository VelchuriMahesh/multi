import React, { useState } from 'react';
import { auth } from '../firebase'; // Ensure path points to your firebase.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowLeft } from 'react-icons/hi';

const Login = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true); // Start loading

    try {
      // Authenticates with Firebase using the email from your screenshot
      await signInWithEmailAndPassword(auth, email, password);
      // Success! App.js will detect the user and show the Dashboard automatically.
    } catch (err) {
      console.error(err);
      // Show user-friendly error messages
      if (err.code === 'auth/invalid-credential') {
        alert("Incorrect Email or Password. Please try again.");
      } else {
        alert("Login Error: " + err.message);
      }
    } finally {
      setIsLoggingIn(false); // Stop loading
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0a1630] p-6 relative">
      
      {/* Back to Website Button */}
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-white/50 hover:text-white transition-all font-bold text-sm"
      >
        <HiOutlineArrowLeft size={18} /> BACK TO WEBSITE
      </button>

      <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="text-center mb-10">
            <div className="bg-blue-600 w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-4">
                <HiOutlineLockClosed size={30} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">ADMIN PORTAL</h2>
            <p className="text-gray-400 mt-2 text-sm">Enter credentials to access dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Gmail Address</label>
            <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="email" 
                    placeholder="admin@gmail.com" 
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-50 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Secret Password</label>
            <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-50 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoggingIn}
            className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl ${
                isLoggingIn 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-black active:scale-95 shadow-blue-200'
            }`}
          >
            {isLoggingIn ? "Verifying Access..." : "Secure Login"}
          </button>

        </form>

        {/* Footer info */}
        <p className="text-center text-gray-300 text-[10px] mt-8 uppercase font-bold tracking-widest">
            Protected by MVIPL Firebase Security
        </p>
      </div>
    </div>
  );
};

export default Login;