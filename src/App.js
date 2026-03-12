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
import ContactAdvanced from './components/ContactAdvanced';

import AskAIButton from './components/AskAIButton';
import AboutPage from './components/AboutPage';
import SalesPage from './components/SalesPage';


// --- NEW FRESH PAGE ---


// --- ADMIN COMPONENTS ---
import AdminDashboard from './admin/AdminDashboard';
import Login from './admin/Login';

import './App.css';

const App = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAboutView, setIsAboutView] = useState(false); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Force scroll to top when switching pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isAboutView, isAdminView]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a1630]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (isAdminView) {
    return user ? (
      <AdminDashboard setIsAdmin={setIsAdminView} />
    ) : (
      <Login onBack={() => setIsAdminView(false)} />
    );
  }

  return (
    <div className="relative w-full bg-white selection:bg-blue-100 selection:text-blue-900">
      
      <Navbar 
        onAdminClick={() => setIsAdminView(true)} 
        onAboutClick={() => setIsAboutView(true)}
        onHomeClick={() => setIsAboutView(false)}
      />

      {isAboutView ? (
        <AboutPage />
      ) : (
        <>
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

          <SalesPage/>
          <ContactAdvanced/>

          <section id="contact">
            <Footer />
          </section>
        </>
      )}

      
      <AskAIButton />

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