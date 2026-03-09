import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import PortfolioManagement from "./PortfolioManagement"; 
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlinePlus, HiLocationMarker, HiTag } from "react-icons/hi";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [formData, setFormData] = useState({ 
    name: '', 
    location: '', 
    price: '',
    status: 'Ongoing',
    description: '' 
  });

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("lastUpdated", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Please enter a project name");

    try {
      await addDoc(collection(db, "projects"), {
        ...formData,
        brochurePages: [], 
        customDetails: [],  
        lastUpdated: serverTimestamp()
      });
      
      alert("Project Created! Now click 'Manage' to add images.");
      setFormData({ name: '', location: '', price: '', status: 'Ongoing', description: '' });
    } catch (e) {
      alert("Error saving: " + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
      } catch (e) {
        alert("Error deleting: " + e.message);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* --- ADD NEW PROJECT FORM --- */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-200">
              <HiOutlinePlus size={20}/>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800">Add Project</h3>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Project Name</label>
            <input 
              type="text" 
              placeholder="e.g. Green Valley" 
              className="p-4 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50/50"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Bangalore" 
              className="p-4 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50/50"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Starting Price</label>
            <input 
              type="text" 
              placeholder="e.g. ₹85 Lakhs" 
              className="p-4 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all bg-gray-50/50"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
            <select 
              className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:ring-4 focus:ring-blue-50 transition-all"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Upcoming</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
            <input 
              type="text"
              placeholder="Brief overview..."
              className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:ring-4 focus:ring-blue-50 transition-all"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex items-end">
            <button type="submit" className="w-full bg-[#0a1630] text-white p-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10 active:scale-95">
              Create Project
            </button>
          </div>
        </form>
      </div>

      {/* --- PROJECT LIST --- */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
            <h3 className="text-xl font-bold text-slate-800">Existing Projects</h3>
        </div>

        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="p-6">Project Details</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    <p className="font-bold text-slate-700">{proj.name}</p>
                    <p className="text-xs text-gray-400">{proj.location}</p>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      proj.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => { setSelectedProjectId(proj.id); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl transition-all font-bold text-xs"
                      >
                        <HiOutlinePencilAlt size={16}/> Manage
                      </button>
                      <button 
                        onClick={() => handleDelete(proj.id)}
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <HiOutlineTrash size={20}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View - Hidden on Desktop */}
        <div className="md:hidden divide-y divide-gray-50">
          {projects.map((proj) => (
            <div key={proj.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{proj.name}</h4>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <HiLocationMarker /> <span>{proj.location}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                  proj.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {proj.status}
                </span>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => { setSelectedProjectId(proj.id); setIsModalOpen(true); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold text-sm"
                >
                  <HiOutlinePencilAlt /> Manage
                </button>
                <button 
                  onClick={() => handleDelete(proj.id)}
                  className="bg-red-50 text-red-500 p-3 rounded-xl"
                >
                  <HiOutlineTrash size={20}/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-gray-400 font-medium">No projects found. Create your first project above.</p>
          </div>
        )}
      </div>

      {/* --- THE MODAL --- */}
      {isModalOpen && (
        <PortfolioManagement 
          projectId={selectedProjectId} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

    </div>
  );
};

export default ProjectManager;