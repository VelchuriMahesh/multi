import React from 'react';

const BlogManager = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold">Manage Blogs</h3>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition">
        + Create New Blog
      </button>
    </div>
    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-20 text-center text-gray-400">
      No blogs created yet. Start by adding your first insight.
    </div>
  </div>
);

export default BlogManager;