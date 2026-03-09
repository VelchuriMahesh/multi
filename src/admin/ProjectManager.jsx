import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import PortfolioManagement from "./PortfolioManagement"; // Import the editor we made
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";

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

  // 1. Fetch Projects in Real-time
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("lastUpdated", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 2. Save New Project
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Please enter a project name");

    try {
      await addDoc(collection(db, "projects"), {
        ...formData,
        brochurePages: [], // Initialize empty
        customDetails: [],  // Initialize empty
        lastUpdated: serverTimestamp()
      });
      
      alert("Project Created! Now click 'Manage' to add images.");
      setFormData({ name: '', location: '', price: '', status: 'Ongoing', description: '' });
    } catch (e) {
      alert("Error saving: " + e.message);
    }
  };

  // 3. Delete Project
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
    }
  };

  return (
    <div className="p-6 space-y-10">
      
      {/* ADD NEW PROJECT FORM */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg text-white"><HiOutlinePlus size={20}/></div>
            <h3 className="text-2xl font-bold text-slate-800">Add New Project</h3>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Project Name</label>
            <input 
              type="text" 
              placeholder="e.g. Green Valley Residency" 
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Location</label>
            <input 
              type="text" 
              placeholder="e.g. New York, USA" 
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Starting Price</label>
            <input 
              type="text" 
              placeholder="e.g. $250,000" 
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Status</label>
            <select 
              className="p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Upcoming</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Short Description</label>
            <input 
              type="text"
              placeholder="Brief overview of the project..."
              className="p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex items-end">
            <button type="submit" className="w-full bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Create Project
            </button>
          </div>
        </form>
      </div>

      {/* PROJECT LIST TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-slate-800">Existing Projects</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
              <tr>
                <th className="p-4">Project Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700">{proj.name}</td>
                  <td className="p-4 text-gray-500">{proj.location}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      proj.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => {
                          setSelectedProjectId(proj.id);
                          setIsModalOpen(true);
                        }}
                        className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition font-medium"
                      >
                        <HiOutlinePencilAlt/> Manage
                      </button>
                      <button 
                        onClick={() => handleDelete(proj.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <HiOutlineTrash size={20}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && <p className="p-10 text-center text-gray-400">No projects added yet.</p>}
        </div>
      </div>

      {/* THE MODAL (PortfolioManagement) */}
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