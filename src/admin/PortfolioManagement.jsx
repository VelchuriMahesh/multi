import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

import {
  HiOutlineX,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineCloudUpload
} from "react-icons/hi";

const API_KEY = "eb7f44e738dc1e9664d6349c85c8772d";

const PortfolioManagement = ({ projectId, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
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

          if (data.brochurePages && Array.isArray(data.brochurePages)) {
            setBrochurePages(
              data.brochurePages.map((url) => ({
                id: Math.random().toString(36).substr(2, 9),
                url: url,
                isNew: false
              }))
            );
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  const addDetailRow = () => setCustomDetails([...customDetails, { label: "", value: "" }]);
  
  const updateDetailRow = (index, field, val) => {
    const updated = [...customDetails];
    updated[index][field] = val;
    setCustomDetails(updated);
  };

  const removeDetailRow = (index) => setCustomDetails(customDetails.filter((_, i) => i !== index));

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPages = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file: file,
      isNew: true
    }));
    setBrochurePages((prev) => [...prev, ...newPages]);
    e.target.value = null;
  };

  const movePage = (index, direction) => {
    const pages = [...brochurePages];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= pages.length) return;
    [pages[index], pages[newIndex]] = [pages[newIndex], pages[index]];
    setBrochurePages(pages);
  };

  const uploadToImgBB = async (file) => {
    const body = new FormData();
    body.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, { method: "POST", body });
      const data = await res.json();
      return data.success ? data.data.display_url : null;
    } catch (err) { return null; }
  };

  const handleSavePortfolio = async () => {
    if (!formData.name) return alert("Project Name is required");
    setIsSaving(true);
    try {
      const finalUrls = [];
      for (const page of brochurePages) {
        if (page.isNew && page.file) {
          const uploadedUrl = await uploadToImgBB(page.file);
          if (uploadedUrl) finalUrls.push(uploadedUrl);
        } else { finalUrls.push(page.url); }
      }
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, {
        ...formData,
        customDetails,
        brochurePages: finalUrls,
        lastUpdated: serverTimestamp()
      });
      alert("Project updated!");
      onClose();
    } catch (error) { alert("Save failed."); } finally { setIsSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-[#0a1630]/90 backdrop-blur-md z-[150] overflow-y-auto">
      {/* Container: Full width on mobile, max-width on desktop */}
      <div className="min-h-screen md:p-6 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white md:rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          
          {/* STICKY HEADER FOR MOBILE */}
          <div className="sticky top-0 z-20 flex justify-between items-center p-5 md:p-8 border-b bg-white/80 backdrop-blur-md">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Edit Portfolio</h2>
              <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">ID: {projectId.slice(0,8)}...</p>
            </div>
            <button onClick={onClose} className="p-3 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all">
              <HiOutlineX size={24} />
            </button>
          </div>

          <div className="p-6 md:p-10 space-y-12">
            
            {/* SECTION 1: BASIC INFO */}
            <div className="space-y-6">
              <SectionTitle title="Core Specifications" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Project Name" name="name" value={formData.name} onChange={handleChange} />
                <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
                <Input label="Price Display" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. Starting ₹85L" />
                
                <div className="flex flex-col">
                  <label className="text-[10px] font-black mb-2 uppercase text-gray-400 tracking-widest ml-1">Current Status</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleChange}
                    className="border border-gray-100 p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2: DYNAMIC DETAILS (IMPROVED FOR MOBILE) */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <SectionTitle title="Technical Details" />
                <button onClick={addDetailRow} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100"><HiOutlinePlus size={20}/></button>
              </div>
              
              <div className="space-y-3">
                {customDetails.map((detail, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <input 
                      placeholder="Label (e.g. BHK)" 
                      value={detail.label}
                      onChange={(e) => updateDetailRow(index, 'label', e.target.value)}
                      className="w-full border-none bg-white p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                      placeholder="Value (e.g. 3 BHK)" 
                      value={detail.value}
                      onChange={(e) => updateDetailRow(index, 'value', e.target.value)}
                      className="w-full border-none bg-white p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={() => removeDetailRow(index)} className="flex items-center justify-center bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-100">
                      <HiOutlineTrash size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: DESCRIPTION */}
            <div className="space-y-6">
               <SectionTitle title="About Project" />
               <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-100 p-5 rounded-[2rem] bg-gray-50 h-40 outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                placeholder="Describe the luxury, amenities, and connectivity..."
              />
            </div>

            {/* SECTION 4: IMAGES */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <SectionTitle title="Brochure Gallery" />
                <label className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0a1630] text-white px-6 py-4 rounded-2xl cursor-pointer hover:bg-blue-600 transition-all shadow-lg text-sm font-bold">
                  <HiOutlineCloudUpload size={20} />
                  Upload Images
                  <input type="file" hidden multiple accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {brochurePages.map((page, index) => (
                  <div key={page.id} className="relative group bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    <img src={page.url} alt="preview" className="h-32 md:h-40 w-full object-cover rounded-xl" />
                    <div className="flex justify-between items-center mt-2 px-1">
                      <div className="flex gap-1">
                        <button onClick={() => movePage(index, "up")} disabled={index === 0} className="p-2 bg-white rounded-lg disabled:opacity-30"><HiOutlineChevronUp size={14}/></button>
                        <button onClick={() => movePage(index, "down")} disabled={index === brochurePages.length - 1} className="p-2 bg-white rounded-lg disabled:opacity-30"><HiOutlineChevronDown size={14}/></button>
                      </div>
                      <button onClick={() => setBrochurePages(brochurePages.filter((_, i) => i !== index))} className="p-2 bg-red-50 text-red-500 rounded-lg"><HiOutlineTrash size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="pt-10 border-t flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSavePortfolio}
                disabled={isSaving}
                className={`flex-1 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all shadow-xl ${
                  isSaving ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-200"
                }`}
              >
                {isSaving ? "Synchronizing Data..." : "Apply All Changes"}
              </button>
              <button onClick={onClose} className="sm:hidden py-4 text-gray-400 font-bold text-sm">Cancel</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 border-l-4 border-blue-600 pl-4">{title}</h3>
);

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-black mb-2 uppercase text-gray-400 tracking-widest ml-1">{label}</label>
    <input className="border border-gray-100 p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm" {...props} />
  </div>
);

export default PortfolioManagement;