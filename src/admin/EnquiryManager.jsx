import React from 'react';
import { 
  HiOutlinePhone, 
  HiOutlineTrash, 
  HiOutlineCalendar, 
  HiOutlineUser, 
  HiOutlineChatAlt2,
  HiOutlineMail
} from 'react-icons/hi';

const EnquiryManager = () => {
  const enquiries = [
    { id: 1, date: '12 Feb 2026', name: 'Rahul Sharma', contact: '+91 9876543210', interest: '3BHK Apartment', status: 'New', email: 'rahul@example.com' },
    { id: 2, date: '10 Feb 2026', name: 'Anita Rao', contact: '+91 8877665544', interest: 'Luxury Villa', status: 'Contacted', email: 'anita@example.com' },
  ];

  if (enquiries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <HiOutlineMail size={48} className="mb-4 opacity-20" />
        <p className="font-medium tracking-wide uppercase text-xs">No enquiries received yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Recent Enquiries</h3>
          <p className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">{enquiries.length} Total Leads</p>
        </div>
      </div>

      {/* --- DESKTOP TABLE VIEW (Hidden on Mobile) --- */}
      <div className="hidden md:block bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-100">
              <th className="p-6">Lead Info</th>
              <th className="p-6">Interest</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {enquiries.map((enq) => (
              <tr key={enq.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {enq.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-700">{enq.name}</p>
                      <p className="text-xs text-gray-400">{enq.contact} • {enq.date}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-sm font-medium text-slate-600">{enq.interest}</td>
                <td className="p-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    enq.status === 'New' ? 'bg-blue-100 text-blue-600' : 
                    enq.status === 'Contacted' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {enq.status}
                  </span>
                </td>
                <td className="p-6 text-right space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><HiOutlinePhone size={20}/></button>
                  <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><HiOutlineTrash size={20}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARD VIEW (Hidden on Desktop) --- */}
      <div className="md:hidden space-y-4">
        {enquiries.map((enq) => (
          <div key={enq.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            
            {/* Card Top: Name & Status */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-100">
                  {enq.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 text-base">{enq.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                    <HiOutlineCalendar /> {enq.date}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                enq.status === 'New' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {enq.status}
              </span>
            </div>

            {/* Interest Detail */}
            <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Interested In</p>
                <p className="text-sm font-bold text-slate-700">{enq.interest}</p>
            </div>

            {/* Quick Mobile Actions */}
            <div className="grid grid-cols-3 gap-3">
              <a 
                href={`tel:${enq.contact}`} 
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-2xl transition-all"
              >
                <HiOutlinePhone size={20} />
                <span className="text-[8px] font-black uppercase mt-1">Call</span>
              </a>
              <a 
                href={`https://wa.me/${enq.contact.replace(/\s+/g, '')}`} 
                target="_blank" rel="noreferrer"
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-green-50 hover:text-green-600 p-3 rounded-2xl transition-all"
              >
                <HiOutlineChatAlt2 size={20} />
                <span className="text-[8px] font-black uppercase mt-1">WA</span>
              </a>
              <button 
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-red-50 hover:text-red-600 p-3 rounded-2xl transition-all"
              >
                <HiOutlineTrash size={20} />
                <span className="text-[8px] font-black uppercase mt-1">Delete</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default EnquiryManager;