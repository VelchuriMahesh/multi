import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  HiOutlineX,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineCloudUpload,
  HiOutlineSave,
  HiOutlineViewGrid,
  HiOutlineDocumentText,
  HiOutlinePhotograph
} from "react-icons/hi";

const API_KEY = "eb7f44e738dc1e9664d6349c85c8772d";

const PortfolioManagement = ({ projectId, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("specs"); // specs, about, media
  const [brochurePages, setBrochurePages] = useState([]);
  const [customDetails, setCustomDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    status: "Ongoing",
    description: ""
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      try {
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || "",
            location: data.location || "",
            price: data.price || "",
            status: data.status || "Ongoing",
            description: data.description || ""
          });
          if (data.customDetails) setCustomDetails(data.customDetails);
          if (data.brochurePages) {
            setBrochurePages(data.brochurePages.map((url) => ({
              id: Math.random().toString(36).substr(2, 9),
              url,
              isNew: false
            })));
          }
        }
      } catch (error) { console.error(error); }
    };
    fetchProject();
  }, [projectId]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
      isNew: true
    }));
    setBrochurePages([...brochurePages, ...newPages]);
  };

  const uploadToImgBB = async (file) => {
    const body = new FormData();
    body.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, { method: "POST", body });
    const data = await res.json();
    return data.success ? data.data.display_url : null;
  };

  const handleSavePortfolio = async () => {
    setIsSaving(true);
    try {
      const finalUrls = [];
      for (const page of brochurePages) {
        if (page.isNew) {
          const url = await uploadToImgBB(page.file);
          if (url) finalUrls.push(url);
        } else { finalUrls.push(page.url); }
      }
      await updateDoc(doc(db, "projects", projectId), {
        ...formData,
        customDetails,
        brochurePages: finalUrls,
        lastUpdated: serverTimestamp()
      });
      onClose();
    } catch (err) { alert("Save Failed"); } finally { setIsSaving(false); }
  };

  const tabs = [
    { id: "specs", label: "Specs", icon: <HiOutlineViewGrid /> },
    { id: "about", label: "About", icon: <HiOutlineDocumentText /> },
    { id: "media", label: "Media", icon: <HiOutlinePhotograph /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#020617]/95 backdrop-blur-xl z-[200] overflow-hidden flex items-center justify-center p-0 md:p-6"
    >
      <motion.div 
        initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }}
        className="w-full max-w-5xl h-full md:h-[90vh] bg-white md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header - Glassmorphic */}
        <div className="p-6 md:p-8 border-b flex justify-between items-center bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <HiOutlineSave size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Project Architect</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Ref: {projectId.slice(0,8)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><HiOutlineX size={24}/></button>
        </div>

        {/* Tab Navigation */}
        <div className="flex px-6 border-b overflow-x-auto no-scrollbar gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 border-b-2 transition-all text-sm font-bold uppercase tracking-widest ${
                activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === "specs" && (
              <motion.div 
                key="specs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <ModernInput label="Project Name" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <ModernInput label="Location" name="location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                  <ModernInput label="Price Display" name="price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="bg-slate-50 border-none p-4 rounded-2xl text-sm font-bold text-slate-700 outline-none ring-2 ring-slate-100 focus:ring-blue-500 transition-all">
                      <option>Ongoing</option><option>Completed</option><option>Upcoming</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Technical Attributes</h4>
                    <button onClick={() => setCustomDetails([...customDetails, {label: '', value: ''}])} className="text-blue-600 bg-blue-50 p-2 rounded-xl"><HiOutlinePlus/></button>
                  </div>
                  {customDetails.map((detail, idx) => (
                    <motion.div layout key={idx} className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                      <input className="flex-1 bg-white p-3 rounded-xl text-xs outline-none focus:ring-1 focus:ring-blue-500" placeholder="Label" value={detail.label} onChange={(e) => {const d = [...customDetails]; d[idx].label = e.target.value; setCustomDetails(d);}} />
                      <input className="flex-1 bg-white p-3 rounded-xl text-xs outline-none focus:ring-1 focus:ring-blue-500" placeholder="Value" value={detail.value} onChange={(e) => {const d = [...customDetails]; d[idx].value = e.target.value; setCustomDetails(d);}} />
                      <button onClick={() => setCustomDetails(customDetails.filter((_, i) => i !== idx))} className="p-3 text-red-500"><HiOutlineTrash/></button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "about" && (
              <motion.div 
                key="about" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 ml-2">Marketing Narrative</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="flex-1 min-h-[300px] bg-slate-50 border-none p-8 rounded-[2.5rem] text-slate-700 leading-relaxed outline-none ring-2 ring-slate-100 focus:ring-blue-500 transition-all"
                  placeholder="Tell the story of this property..."
                />
              </motion.div>
            )}

            {activeTab === "media" && (
              <motion.div 
                key="media" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8 p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 bg-slate-50/50">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm text-blue-600"><HiOutlineCloudUpload size={32}/></div>
                  <div className="text-center">
                    <p className="font-black text-slate-900 tracking-tight">Add Visual Assets</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                  </div>
                  <label className="cursor-pointer bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest mt-2 hover:bg-blue-600 transition-colors">
                    Browse Files
                    <input type="file" hidden multiple onChange={handleFileUpload} />
                  </label>
                </div>

                <Reorder.Group axis="y" values={brochurePages} onReorder={setBrochurePages} className="space-y-3">
                  {brochurePages.map((page, idx) => (
                    <Reorder.Item key={page.id} value={page} className="cursor-grab active:cursor-grabbing">
                      <div className="flex items-center gap-4 bg-white p-3 rounded-[2rem] border border-slate-100 shadow-sm">
                        <img src={page.url} className="w-20 h-20 object-cover rounded-2xl" alt="" />
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Page {idx + 1}</p>
                          <p className="text-xs font-bold text-slate-900 italic opacity-50">{page.isNew ? "New Upload" : "Stored Cloud Asset"}</p>
                        </div>
                        <button onClick={() => setBrochurePages(brochurePages.filter(p => p.id !== page.id))} className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-colors"><HiOutlineTrash size={20}/></button>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Static Bottom */}
        <div className="p-6 md:p-8 bg-slate-50 border-t flex flex-col sm:flex-row gap-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSavePortfolio}
            disabled={isSaving}
            className="flex-[2] bg-blue-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-blue-200 flex items-center justify-center gap-3 disabled:bg-slate-300"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                Updating Records...
              </span>
            ) : "Confirm & Deploy Changes"}
          </motion.button>
          <button onClick={onClose} className="flex-1 bg-white text-slate-400 py-5 rounded-[2rem] font-bold text-[10px] uppercase tracking-widest border border-slate-200">Discard</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ModernInput = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">{label}</label>
    <motion.input 
      whileFocus={{ scale: 1.01 }}
      className="bg-slate-50 border-none p-4 rounded-2xl text-sm font-bold text-slate-700 outline-none ring-2 ring-slate-100 focus:ring-blue-500 transition-all"
      {...props} 
    />
  </div>
);

export default PortfolioManagement;