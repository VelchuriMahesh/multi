import React, { useState } from 'react';
import EnquiryManager from './EnquiryManager';
import ProjectManager from './ProjectManager'; // The new component that handles Add + List
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineMail, 
  HiOutlineLogout, 
  HiOutlineViewGrid 
} from 'react-icons/hi';

const AdminDashboard = ({ setIsAdmin }) => {
  const [activeTab, setActiveTab] = useState('Projects'); // Default to Projects to see your new work

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsAdmin(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <div className="w-72 bg-[#0a1630] text-white flex flex-col h-full shadow-2xl">
        <div className="p-8 border-b border-white/10 flex flex-col gap-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Control Panel</span>
            <h1 className="text-2xl font-black tracking-tight">MVIPL ADMIN</h1>
        </div>

        <nav className="flex-1 p-6 space-y-3 mt-4">
          <button 
            onClick={() => setActiveTab('Projects')} 
            className={`w-full flex items-center p-4 rounded-2xl transition-all duration-200 group ${
                activeTab === 'Projects' 
                ? 'bg-blue-600 shadow-lg shadow-blue-900/50 text-white' 
                : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            <HiOutlineOfficeBuilding className={`mr-4 text-xl ${activeTab === 'Projects' ? 'text-white' : 'group-hover:text-white'}`} /> 
            <span className="font-bold">Project Manager</span>
          </button>

          <button 
            onClick={() => setActiveTab('Enquiries')} 
            className={`w-full flex items-center p-4 rounded-2xl transition-all duration-200 group ${
                activeTab === 'Enquiries' 
                ? 'bg-blue-600 shadow-lg shadow-blue-900/50 text-white' 
                : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            <HiOutlineMail className={`mr-4 text-xl ${activeTab === 'Enquiries' ? 'text-white' : 'group-hover:text-white'}`} /> 
            <span className="font-bold">Enquiry Inbox</span>
          </button>
        </nav>

        {/* User Info & Logout */}
        <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3 mb-6 px-2">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">A</div>
                <div>
                    <p className="text-sm font-bold">Admin User</p>
                    <p className="text-[10px] text-gray-400 uppercase">Super Admin Access</p>
                </div>
            </div>
            <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300 font-bold text-sm"
            >
                <HiOutlineLogout className="text-lg" /> Logout Session
            </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10">
            <div className="flex items-center gap-2">
                <HiOutlineViewGrid className="text-gray-400 text-xl" />
                <span className="text-gray-400">/</span>
                <span className="font-bold text-gray-800">{activeTab}</span>
            </div>
            <div className="text-sm text-gray-500 font-medium">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </header>

        {/* Dynamic Component Area */}
        <main className="flex-1 p-10 overflow-y-auto bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                {activeTab === 'Enquiries' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <EnquiryManager />
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ProjectManager />
                    </div>
                )}
            </div>
        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;