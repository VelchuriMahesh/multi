import React from 'react';
import { HiOutlineDocumentText, HiOutlinePlus, HiOutlineSparkles } from 'react-icons/hi';

const BlogManager = () => {
  return (
    <div className="p-4 md:p-0 space-y-8 max-w-5xl mx-auto">
      
      {/* HEADER SECTION - Stacked on Mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">
            Blog Insights
          </h3>
          <p className="text-[10px] text-blue-600 font-bold tracking-[0.2em] uppercase">
            Manage your corporate news
          </p>
        </div>
        
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0a1630] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10 active:scale-95">
          <HiOutlinePlus size={20} />
          <span>New Blog Post</span>
        </button>
      </div>

      {/* EMPTY STATE - Optimized Padding for Mobile */}
      <div className="relative group">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-blue-50/50 rounded-[2.5rem] transform group-hover:scale-[1.01] transition-transform duration-500" />
        
        <div className="relative border-2 border-dashed border-gray-200 rounded-[2.5rem] py-16 px-6 md:py-28 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-gray-300 mb-2">
            <HiOutlineDocumentText size={40} />
          </div>
          
          <div className="max-w-xs space-y-2">
            <h4 className="text-slate-800 font-bold text-lg">No stories yet.</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Start by sharing your first corporate insight, project milestone, or luxury living tip.
            </p>
          </div>

          <div className="pt-4">
            <button className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest hover:text-blue-700 transition-colors">
              <HiOutlineSparkles size={16} />
              Need inspiration?
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BlogManager;