import React from 'react';

const EnquiryManager = () => {
  const enquiries = [
    { id: 1, date: '12 Feb 2026', name: 'Rahul Sharma', contact: '+91 9876543210', interest: '3BHK Apartment', status: 'New' },
    { id: 2, date: '10 Feb 2026', name: 'Anita Rao', contact: '+91 8877665544', interest: 'Luxury Villa', status: 'Contacted' },
  ];

  if (enquiries.length === 0) return <p className="text-center py-10 text-gray-400">No enquiries received yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-400 text-sm uppercase tracking-wider">
            <th className="pb-4 font-semibold">Date</th>
            <th className="pb-4 font-semibold">Name</th>
            <th className="pb-4 font-semibold">Contact</th>
            <th className="pb-4 font-semibold">Interest</th>
            <th className="pb-4 font-semibold">Status</th>
            <th className="pb-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {enquiries.map((enq) => (
            <tr key={enq.id} className="border-b last:border-0 hover:bg-gray-50 transition">
              <td className="py-4 text-sm">{enq.date}</td>
              <td className="py-4 font-medium">{enq.name}</td>
              <td className="py-4 text-sm">{enq.contact}</td>
              <td className="py-4 text-sm">{enq.interest}</td>
              <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  enq.status === 'New' ? 'bg-blue-100 text-blue-600' : 
                  enq.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {enq.status}
                </span>
              </td>
              <td className="py-4">
                <button className="text-red-500 text-xs font-bold hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiryManager;