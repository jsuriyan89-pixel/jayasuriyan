import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import TerminalView from './components/TerminalView';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const { isDark, toggleTheme, accent, setAccent } = useTheme();
  const [toast, setToast] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const showToast = (message) => {
    setToast({ message });
  };

  const toggleTerminal = () => {
    setIsTerminalOpen(prev => !prev);
    const element = document.getElementById('terminal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative bg-[#08090d] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      {/* Toast Feedback Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main Navbar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        accent={accent}
        setAccent={setAccent}
        showToast={showToast}
        toggleTerminal={toggleTerminal}
        isTerminalOpen={isTerminalOpen}
      />

      {/* Main Body Content */}
      <main>
        <Hero showToast={showToast} toggleTerminal={toggleTerminal} />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Education />
        <Stats />
        <Testimonials />
        <TerminalView
          isOpen={true}
          onClose={() => setIsTerminalOpen(false)}
          setAccent={setAccent}
          showToast={showToast}
        />
        <Contact showToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
