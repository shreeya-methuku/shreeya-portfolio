import React from 'react';
import { Terminal, User, BookOpen, Briefcase, Box, Award } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const NavItem = ({ 
  id, 
  icon: Icon, 
  label,
  activeSection
}: { 
  id: string; 
  icon: any; 
  label: string;
  activeSection: string;
}) => {
  const isActive = activeSection === id;
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <button
      onClick={() => scrollToSection(id)}
      className={`flex items-center gap-2 px-3 py-2 rounded transition-all duration-300 ${
        isActive 
          ? 'text-cyber-primary bg-cyber-primary/10 border border-cyber-primary/30' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={16} />
      <span className="font-mono text-xs uppercase tracking-wider hidden lg:block">{label}</span>
    </button>
  );
};

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-cyber-black/80 backdrop-blur-md border-b border-cyber-slate z-50 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="border border-cyber-primary/50 px-4 py-1.5 rounded bg-cyber-dark/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          <span className="font-mono text-sm font-bold text-cyber-primary tracking-widest">SHREEYA METHUKU</span>
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
        <NavItem id="dashboard" icon={Terminal} label="Home" activeSection={activeSection} />
        <NavItem id="education" icon={BookOpen} label="Edu" activeSection={activeSection} />
        <NavItem id="experience" icon={Briefcase} label="Exp" activeSection={activeSection} />
        <NavItem id="skills" icon={User} label="Skills" activeSection={activeSection} />
        <NavItem id="projects" icon={Box} label="Projects" activeSection={activeSection} />
        <NavItem id="awards" icon={Award} label="Awards" activeSection={activeSection} />
      </div>

      <div className="hidden md:block">
        <div className="flex items-center gap-2 text-[10px] font-mono text-cyber-primary">
          <span className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></span>
          ONLINE
        </div>
      </div>
    </nav>
  );
};