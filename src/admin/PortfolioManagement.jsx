import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

import {
  HiOutlineX,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineTrash,
  HiOutlinePlus
} from "react-icons/hi";

const API_KEY = "eb7f44e738dc1e9664d6349c85c8772d";

const PortfolioManagement = ({ projectId, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [brochurePages, setBrochurePages] = useState([]);
  
  // New state for dynamic details (e.g., Area: 1200sqft, BHK: 3)
  const [customDetails, setCustomDetails] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    status: "Ongoing",
    description: ""
  });

  /* ---------------- FETCH PROJECT FROM FIREBASE ---------------- */
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

          // Load custom details if they exist
          if (data.customDetails) {
            setCustomDetails(data.customDetails);
          }

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

  /* ---------------- DYNAMIC DETAILS HANDLERS ---------------- */
  const addDetailRow = () => {
    setCustomDetails([...customDetails, { label: "", value: "" }]);
  };

  const updateDetailRow = (index, field, val) => {
    const updated = [...customDetails];
    updated[index][field] = val;
    setCustomDetails(updated);
  };

  const removeDetailRow = (index) => {
    setCustomDetails(customDetails.filter((_, i) => i !== index));
  };

  /* ---------------- HANDLE INPUT CHANGES ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearPrice = () => setFormData({ ...formData, price: "" });

  /* ---------------- FILE UPLOAD PREVIEW ---------------- */
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

  /* ---------------- UPLOAD TO IMGBB ---------------- */
  const uploadToImgBB = async (file) => {
    const body = new FormData();
    body.append("image", file);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body
      });
      const data = await res.json();
      return data.success ? data.data.display_url : null;
    } catch (err) {
      return null;
    }
  };

  /* ---------------- SAVE TO FIREBASE ---------------- */
  const handleSavePortfolio = async () => {
    if (!formData.name) return alert("Project Name is required");
    setIsSaving(true);

    try {
      const finalUrls = [];
      for (const page of brochurePages) {
        if (page.isNew && page.file) {
          const uploadedUrl = await uploadToImgBB(page.file);
          if (uploadedUrl) finalUrls.push(uploadedUrl);
        } else {
          finalUrls.push(page.url);
        }
      }

      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, {
        ...formData,
        customDetails: customDetails, // Saving the new list of details
        brochurePages: finalUrls,
        lastUpdated: serverTimestamp()
      });

      alert("Project details updated!");
      onClose();
    } catch (error) {
      alert("Save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto p-4 md:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Project Portfolio</h2>
            <p className="text-sm text-gray-500">Project ID: {projectId}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
            <HiOutlineX size={24} />
          </button>
        </div>

        <div className="p-8 space-y-10">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-l-4 border-blue-600 pl-3">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Project Name" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
              
              <div className="relative">
                <Input label="Price Range" name="price" value={formData.price} onChange={handleChange} />
                {formData.price && (
                  <button 
                    onClick={clearPrice}
                    className="absolute right-3 top-9 text-xs text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold mb-2 uppercase text-gray-500">Current Status</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                  className="border p-3 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Dynamic Project Details (THE NEW PART) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold border-l-4 border-blue-600 pl-3">Specifications / Details</h3>
              <button 
                onClick={addDetailRow}
                className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <HiOutlinePlus /> Add Detail
              </button>
            </div>
            
            <div className="space-y-3">
              {customDetails.map((detail, index) => (
                <div key={index} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl animate-in fade-in duration-300">
                  <input 
                    placeholder="Label (e.g. Area)" 
                    value={detail.label}
                    onChange={(e) => updateDetailRow(index, 'label', e.target.value)}
                    className="flex-1 border p-2 rounded-lg outline-none focus:bg-white"
                  />
                  <input 
                    placeholder="Value (e.g. 1500 Sqft)" 
                    value={detail.value}
                    onChange={(e) => updateDetailRow(index, 'value', e.target.value)}
                    className="flex-1 border p-2 rounded-lg outline-none focus:bg-white"
                  />
                  <button onClick={() => removeDetailRow(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                    <HiOutlineTrash size={20} />
                  </button>
                </div>
              ))}
              {customDetails.length === 0 && <p className="text-sm text-gray-400 italic">No custom details added yet.</p>}
            </div>
          </div>

          {/* Section 3: Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold uppercase text-gray-500">Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-4 rounded-xl h-32 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write about the project amenities, distance from city, etc..."
            />
          </div>

          {/* Section 4: Images */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-lg font-bold border-l-4 border-blue-600 pl-3">Brochure & Gallery</h3>
              <label className="bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl cursor-pointer transition-all shadow-lg">
                Upload Images
                <input type="file" hidden multiple accept="image/*" onChange={handleFileUpload} />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200">
              {brochurePages.map((page, index) => (
                <div key={page.id} className="relative group bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                  <img src={page.url} alt="preview" className="h-32 w-full object-cover rounded-lg" />
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-1">
                      <button onClick={() => movePage(index, "up")} disabled={index === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-10"><HiOutlineChevronUp/></button>
                      <button onClick={() => movePage(index, "down")} disabled={index === brochurePages.length - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-10"><HiOutlineChevronDown/></button>
                    </div>
                    <button onClick={() => setBrochurePages(brochurePages.filter((_, i) => i !== index))} className="text-red-500 p-1 hover:bg-red-50 rounded"><HiOutlineTrash/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Save */}
          <div className="flex justify-end pt-6 border-t">
            <button
              onClick={handleSavePortfolio}
              disabled={isSaving}
              className={`px-12 py-4 rounded-2xl font-bold text-white transition-all shadow-xl ${
                isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
            >
              {isSaving ? "Uploading Data..." : "Save Project Portfolio"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold mb-2 uppercase text-gray-500">{label}</label>
    <input className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" {...props} />
  </div>
);

export default PortfolioManagement;