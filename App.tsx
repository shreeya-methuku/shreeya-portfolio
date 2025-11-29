import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { BootSequence } from './components/BootSequence';
import { Dashboard } from './components/Dashboard';
import { Stats } from './components/Stats';
import { QuestLog } from './components/QuestLog';
import { Inventory } from './components/Inventory';
import { Education, Awards } from './components/Archives';
import { Background3D } from './components/Background3D';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [introFinished, setIntroFinished] = useState(false); // Controls when main page reveals
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  const handleIntroComplete = () => {
    setIntroFinished(true);
  };

  // Scroll spy to update active navigation
  useEffect(() => {
    if (!introFinished) return;

    const handleScroll = () => {
      const sections = ['dashboard', 'education', 'experience', 'skills', 'projects', 'awards'];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [introFinished]);

  return (
    <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-primary selection:text-black font-sans relative overflow-x-hidden">
      
      {/* 3D Background */}
      <Background3D />

      {/* CRT Overlay Effect */}
      <div className="fixed inset-0 crt-overlay z-[60] pointer-events-none mix-blend-overlay opacity-30"></div>
      
      {/* Scanline Animation */}
      <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.03] bg-gradient-to-b from-transparent via-white to-transparent h-1 w-full animate-scanline"></div>

      <AnimatePresence>
        {!bootComplete && (
          <BootSequence onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {bootComplete && (
        <>
          {/* Navigation - Fades in only after intro is finished */}
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : -20 }}
             transition={{ duration: 1 }}
             className="relative z-50"
          >
             <Navigation activeSection={activeSection} />
          </motion.div>
          
          <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-16 md:gap-24 pb-20 relative z-10">
            
            {/* Dashboard is always rendered once boot is done, but controls its own reveal */}
            <section id="dashboard" className="min-h-[85vh] flex flex-col justify-center">
              <Dashboard onIntroComplete={handleIntroComplete} />
            </section>
            
            {/* Other sections fade in after dashboard intro */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: introFinished ? 1 : 0 }}
               transition={{ duration: 1.5, delay: 0.2 }}
               className="flex flex-col gap-24"
            >
              <section id="education" className="scroll-mt-24">
                <Education />
              </section>

              <section id="experience" className="scroll-mt-24">
                <QuestLog />
              </section>
              
              <section id="skills" className="scroll-mt-24">
                <Stats />
              </section>
              
              <section id="projects" className="scroll-mt-24">
                <Inventory />
              </section>
              
              <section id="awards" className="scroll-mt-24">
                <Awards />
              </section>

              <footer className="text-center text-gray-600 font-mono text-xs py-8 border-t border-cyber-slate/30 mt-8">
                <p>SYSTEM ARCHITECT: SHREEYA S METHUKU // V2.0.25</p>
              </footer>
            </motion.div>
          </main>
        </>
      )}
    </div>
  );
};

export default App;