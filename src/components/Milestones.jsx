import React from 'react';
import { HiOutlineHomeModern, HiOutlineBuildingOffice2, HiOutlineCheckBadge } from 'react-icons/hi2';

const Milestones = () => {
  return (
    <section className="py-20 bg-[#f8f8f8]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16 uppercase tracking-wider">
          Milestones that Define Our Legacy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineHomeModern size={28} />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-2">2.5</h3>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-tighter">Million Sq.Ft Delivered</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineBuildingOffice2 size={28} />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-2">5.5</h3>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-tighter">Million Sq.Ft Ongoing</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineCheckBadge size={28} />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-2">20+</h3>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-tighter">Completed Projects</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;