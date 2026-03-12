import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineX, 
  HiOutlineLocationMarker, 
  HiOutlineChevronRight, 
  HiOutlineExternalLink,
  HiOutlineSparkles 
} from "react-icons/hi";

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

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Syncing Excellence</p>
    </div>
  );

  return (
    <section className="relative py-24 px-6 bg-[#FAFBFF] overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4"
          >
            <HiOutlineSparkles /> Premium Collections
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter"
          >
            LATEST <span className="text-blue-600">WORKS.</span>
          </motion.h2>
        </header>

        {/* Project Grid */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVars}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-4 transition-all hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.15)]"
            >
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5]">
                {project.brochurePages?.[0] ? (
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={project.brochurePages[0]}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 italic">No Media</div>
                )}
                
                <div className="absolute top-4 left-4 z-10">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-tighter text-slate-900">
                            {project.status || "Live"}
                        </span>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <p className="text-white text-sm font-medium flex items-center gap-2">
                        View Details <HiOutlineExternalLink />
                    </p>
                </div>
              </div>

              <div className="mt-6 px-2 pb-2">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {project.name}
                </h3>
                <p className="flex items-center gap-1 text-slate-400 text-xs mt-2 font-medium">
                  <HiOutlineLocationMarker className="text-blue-500"/> {project.location}
                </p>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                    <span className="text-lg font-black tracking-tight text-slate-900">
                      {project.price}
                    </span>
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <HiOutlineChevronRight size={20} />
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- IMMERSIVE MODAL --- */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" 
              />

              <motion.div 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-white w-full max-w-6xl h-[90vh] md:h-[85vh] overflow-y-auto rounded-t-[3rem] md:rounded-[3rem] shadow-2xl z-10"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="sticky top-6 float-right mr-6 z-[110] p-4 bg-slate-900 text-white rounded-full shadow-2xl active:scale-90 transition-transform"
                >
                  <HiOutlineX size={20} />
                </button>

                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Visual Gallery */}
                  <div className="p-4 md:p-12 bg-slate-50">
                    <div className="sticky top-12 space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Architecture Gallery</h4>
                            <span className="text-slate-400 text-xs font-bold">{selectedProject.brochurePages?.length || 0} Images</span>
                        </div>
                        <div className="space-y-6">
                        {selectedProject.brochurePages?.map((img, idx) => (
                            <motion.img 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                key={idx} 
                                src={img} 
                                className="w-full rounded-[2.5rem] shadow-2xl shadow-slate-200"
                            />
                        ))}
                        </div>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-8 md:p-16">
                    <div className="max-w-md">
                        <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                        {selectedProject.status}
                        </span>
                        <h2 className="text-5xl font-black text-slate-900 mt-6 leading-[0.9] tracking-tighter">
                            {selectedProject.name}
                        </h2>
                        <p className="flex items-center gap-2 text-slate-400 mt-6 text-lg font-medium">
                        <HiOutlineLocationMarker className="text-blue-500"/> {selectedProject.location}
                        </p>

                        <div className="my-10 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white">
                            <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">Valuation</p>
                            <p className="text-3xl font-black">{selectedProject.price}</p>
                        </div>

                        <div className="space-y-4 mb-12">
                            <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">The Vision</h4>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                            {selectedProject.description || "Project details are being curated by our architectural team."}
                            </p>
                        </div>

                        {selectedProject.customDetails && (
                            <div className="grid grid-cols-2 gap-8 mb-12">
                                {selectedProject.customDetails.map((detail, i) => (
                                    <div key={i} className="border-l-2 border-blue-500 pl-4">
                                        <p className="text-[10px] text-slate-400 uppercase font-black">{detail.label}</p>
                                        <p className="text-slate-900 font-black text-lg">{detail.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)]"
                            onClick={() => {
                                window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
                                setSelectedProject(null);
                            }}
                        >
                            Contact Sales Office
                        </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedProjects;