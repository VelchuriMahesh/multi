import React from 'react';
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlineSave } from 'react-icons/hi';

const SettingsPage = () => (
  <div className="p-4 md:p-8 flex justify-center">
    {/* Card Container */}
    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Header Section */}
      <div className="p-6 md:p-8 border-b border-gray-50 bg-gray-50/50">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">General Settings</h2>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Update your corporate contact information across the platform.</p>
      </div>

      {/* Form Section */}
      <form className="p-6 md:p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
        
        <div className="space-y-6">
          {/* Email Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
              <HiOutlineMail className="text-blue-500" size={16} />
              Company Email
            </label>
            <input 
              type="email" 
              defaultValue="multiversalinfra@gmail.com" 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm md:text-base text-slate-700 font-medium" 
            />
          </div>

          {/* Address Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
              <HiOutlineLocationMarker className="text-blue-500" size={16} />
              Office Address
            </label>
            <textarea 
              rows="4"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm md:text-base text-slate-700 font-medium resize-none"
              defaultValue="Villa no 12, Saicity villas, K.Dommasandra, Kodigehalli main road, Behind kidzee school, Belathur road, Whitefield, Bangalore"
            />
          </div>
        </div>

        {/* Action Button - Responsive width */}
        <div className="pt-4">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#0a1630] text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10 active:scale-95">
            <HiOutlineSave size={20} />
            <span>Update Settings</span>
          </button>
        </div>

      </form>
    </div>
  </div>
);

export default SettingsPage;