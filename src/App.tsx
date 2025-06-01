import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Components
import Navbar from './components/Navbar';
import FloatingIcons from './components/FloatingIcons';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Notify backend about visit (once per session)
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
      try {
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/notify`);
      } catch (error) {
        console.error('Failed to notify about visit:', error);
      }
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 bg-tech-pattern text-white">
        <Navbar />
        <FloatingIcons />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;