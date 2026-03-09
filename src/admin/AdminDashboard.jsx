import React, { useState } from 'react';
import EnquiryManager from './EnquiryManager';
import ProjectManager from './ProjectManager';
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineMail, 
  HiOutlineLogout, 
  HiOutlineViewGrid,
  HiMenuAlt2,
  HiX
} from 'react-icons/hi';

const AdminDashboard = ({ setIsAdmin }) => {
  const [activeTab, setActiveTab] = useState('Projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setIsAdmin(false);
    }
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false); // Close sidebar on mobile after clicking
      }} 
      className={`w-full flex items-center p-4 rounded-2xl transition-all duration-300 group ${
          activeTab === id 
          ? 'bg-blue-600 shadow-lg shadow-blue-900/50 text-white' 
          : 'hover:bg-white/5 text-gray-400'
      }`}
    >
      <Icon className={`mr-4 text-xl ${activeTab === id ? 'text-white' : 'group-hover:text-white'}`} /> 
      <span className="font-bold tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      
      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-72 bg-[#0a1630] text-white flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Control Panel</span>
                <h1 className="text-2xl font-black tracking-tighter">MVIPL ADMIN</h1>
            </div>
            {/* Close button for mobile */}
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400">
                <HiX size={24} />
            </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 p-6 space-y-3 mt-4">
          <NavItem id="Projects" label="Projects" icon={HiOutlineOfficeBuilding} />
          <NavItem id="Enquiries" label="Enquiries" icon={HiOutlineMail} />
        </nav>

        {/* User Info & Logout */}
        <div className="p-6 border-t border-white/10 bg-[#081126]">
            <div className="flex items-center gap-3 mb-6 px-2">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-black shadow-lg shadow-blue-500/20">
                    A
                </div>
                <div>
                    <p className="text-sm font-bold">Admin User</p>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Superuser</p>
                </div>
            </div>
            <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-center gap-2 p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest"
            >
                <HiOutlineLogout size={18} /> Logout
            </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-10 shrink-0">
            <div className="flex items-center gap-4">
                {/* Hamburger Menu */}
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 md:hidden text-slate-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <HiMenuAlt2 size={26} />
                </button>
                
                <div className="flex items-center gap-2">
                    <HiOutlineViewGrid className="text-gray-300 hidden sm:block" />
                    <span className="text-gray-300 hidden sm:block">/</span>
                    <span className="font-black text-slate-800 uppercase tracking-widest text-xs md:text-sm">
                        {activeTab}
                    </span>
                </div>
            </div>

            <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">
                <span className="hidden sm:inline">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="sm:hidden">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
            </div>
        </header>

        {/* Dynamic Content Scroll Area */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
            <div className="p-4 md:p-10 max-w-7xl mx-auto">
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