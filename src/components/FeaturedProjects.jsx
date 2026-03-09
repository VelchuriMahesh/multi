import React, { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { HiOutlineX, HiOutlineLocationMarker, HiOutlineChevronRight } from "react-icons/hi";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("lastUpdated", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center py-20 animate-pulse text-gray-400">Loading Excellence...</div>;

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-500 max-w-2xl mx-auto italic">Explore our premium properties designed with modern aesthetics and comfort.</p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 p-3"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-[32px] aspect-[4/3] bg-gray-100 shadow-inner">
                {project.brochurePages && project.brochurePages.length > 0 ? (
                  <img
                    src={project.brochurePages[0]}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs italic">No Image Available</div>
                )}
                
                {/* Status Overlay */}
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-blue-700">
                  {project.status || "Ongoing"}
                </div>
              </div>

              {/* Basic Info */}
              <div className="mt-6 p-3 space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.name}
                        </h3>
                        <p className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                            <HiOutlineLocationMarker className="text-blue-500"/> {project.location}
                        </p>
                    </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                    {/* Price Logic */}
                    <span className={`font-black tracking-tight ${
                        project.price === 'Price on Request' 
                        ? 'text-blue-600 text-xs uppercase' 
                        : 'text-gray-900 text-lg'
                    }`}>
                      {project.price}
                    </span>
                    <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <HiOutlineChevronRight />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- PROJECT DETAILS MODAL --- */}
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProject(null)}></div>

            <div className="relative bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[40px] shadow-2xl">
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="fixed top-8 right-8 z-[110] p-4 bg-white text-black rounded-full shadow-xl hover:bg-red-500 hover:text-white transition-all"
              >
                <HiOutlineX size={24} />
              </button>

              <div className="grid lg:grid-cols-2 gap-0">
                
                {/* Image Gallery Side */}
                <div className="p-4 md:p-8 space-y-6 bg-gray-50 border-r border-gray-100">
                  <h4 className="font-black text-gray-400 uppercase text-[10px] tracking-widest px-2">Visual Gallery</h4>
                  <div className="flex flex-col gap-6">
                    {selectedProject.brochurePages?.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt="detail view" 
                        className="w-full rounded-[30px] shadow-lg shadow-black/5"
                      />
                    ))}
                    {(!selectedProject.brochurePages || selectedProject.brochurePages.length === 0) && (
                        <div className="h-60 bg-gray-200 rounded-[30px] flex items-center justify-center text-gray-400 italic">Images coming soon...</div>
                    )}
                  </div>
                </div>

                {/* Text Content Side */}
                <div className="p-8 md:p-16 space-y-10">
                  <header>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-4">
                      {selectedProject.status}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{selectedProject.name}</h2>
                    <p className="flex items-center gap-2 text-gray-400 mt-4 text-xl">
                      <HiOutlineLocationMarker className="text-blue-500"/> {selectedProject.location}
                    </p>
                  </header>

                  {/* Highlight Price Box */}
                  <div className="bg-gray-900 p-8 rounded-[35px] text-white flex justify-between items-center shadow-2xl shadow-blue-900/20">
                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Premium Offering</span>
                    <span className={`font-black ${
                        selectedProject.price === 'Price on Request' 
                        ? 'text-lg text-blue-400 uppercase' 
                        : 'text-3xl'
                    }`}>
                        {selectedProject.price || "Contact Us"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest">The Project Overview</h4>
                    <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-line font-medium">
                      {selectedProject.description || "Detailed project description is currently being updated. Contact our sales office for more information."}
                    </p>
                  </div>

                  {/* Custom Specifications */}
                  {selectedProject.customDetails && selectedProject.customDetails.length > 0 && (
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                      <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest">Key Specifications</h4>
                      <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                        {selectedProject.customDetails.map((detail, i) => (
                          <div key={i} className="flex flex-col">
                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{detail.label}</p>
                            <p className="text-gray-900 font-bold text-lg">{detail.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-blue-100 hover:shadow-none"
                    onClick={() => {
                        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
                        setSelectedProject(null);
                    }}
                  >
                    Send Inquiry Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;