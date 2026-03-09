import React from 'react';

const SettingsPage = () => (
  <form className="space-y-6 max-w-2xl">
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2">Company Email</label>
        <input type="email" defaultValue="multiversalinfra@gmail.com" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-600 mb-2">Office Address</label>
        <textarea className="w-full p-3 border rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500">Villa no 12, Saicity villas, Whitefield, Bangalore</textarea>
      </div>
    </div>
    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
      Update Settings
    </button>
  </form>
);

export default SettingsPage;