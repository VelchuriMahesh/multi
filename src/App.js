import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

// --- PUBLIC WEBSITE COMPONENTS ---
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Milestones from './components/Milestones';
import FeaturedProjects from './components/FeaturedProjects';
import Footer from './components/Footer';
import FloatingBar from './components/FloatingBar';
import AskAIButton from './components/AskAIButton';

// --- ADMIN COMPONENTS ---
import AdminDashboard from './admin/AdminDashboard';
import Login from './admin/Login';

// --- STYLES ---
import './App.css';

const App = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Listen for Firebase Authentication changes (Tracks if Admin is logged in)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // If logged in, 'user' becomes the admin object
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Loading screen to prevent flicker
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a1630]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // --- 3. ADMIN GATEKEEPER LOGIC ---
  if (isAdminView) {
    /* 
       When you click the Admin button in the Navbar, this part activates.
       If NOT logged in (user is null) -> Show Login.jsx
       If LOGGED in (user is active) -> Show AdminDashboard.jsx
    */
    return user ? (
      <AdminDashboard setIsAdmin={setIsAdminView} />
    ) : (
      <Login onBack={() => setIsAdminView(false)} />
    );
  }

  // --- 4. PUBLIC WEBSITE VIEW ---
  return (
    <div className="relative w-full bg-white selection:bg-blue-100 selection:text-blue-900">
      
      {/* Passing 'onAdminClick' switches isAdminView to true */}
      <Navbar onAdminClick={() => setIsAdminView(true)} />

      {/* IDs allow the Navbar buttons to scroll to these exact locations */}
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
        <Milestones />
      </section>

      <section id="projects">
        <FeaturedProjects />
      </section>

      <section id="contact">
        <Footer />
      </section>

      {/* Floating UI Elements */}
      <FloatingBar />
      <AskAIButton />

      {/* Secret Admin Button at bottom-left for quick testing */}
      <button 
        onClick={() => setIsAdminView(true)}
        className="fixed bottom-4 left-4 z-[50] opacity-0 hover:opacity-100 bg-black/20 text-[10px] p-1 text-white rounded transition-all"
      >
        Admin Access
      </button>

    </div>
  );
};

export default App;