import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, User, BookOpen, Briefcase, Box, Award } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'dashboard', icon: Terminal, label: 'Home' },
  { id: 'education', icon: BookOpen, label: 'Edu' },
  { id: 'experience', icon: Briefcase, label: 'Exp' },
  { id: 'skills', icon: User, label: 'Skills' },
  { id: 'projects', icon: Box, label: 'Projects' },
  { id: 'awards', icon: Award, label: 'Awards' },
];

const NavItem = ({
  id,
  icon: Icon,
  label,
  activeSection,
  index,
}: {
  id: string;
  icon: any;
  label: string;
  activeSection: string;
  index: number;
}) => {
  const isActive = activeSection === id;
  const [hovered, setHovered] = useState(false);

  const scrollToSection = () => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4, ease: 'easeOut' }}
      onClick={scrollToSection}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'perspective(400px) translateZ(6px) translateY(-2px)' : 'perspective(400px) translateZ(0px)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className={`relative flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${
        isActive
          ? 'text-cyber-primary bg-cyber-primary/10 border border-cyber-primary/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      <Icon size={15} />
      <span className="font-mono text-xs uppercase tracking-wider hidden lg:block">{label}</span>
      {/* Active underline glow */}
      {isActive && (
        <motion.div
          layoutId="nav-active"
          className="absolute -bottom-px left-2 right-2 h-px bg-cyber-primary shadow-[0_0_6px_#10b981]"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
    </motion.button>
  );
};

export const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Scroll progress bar — very top */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-900 z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-secondary"
          style={{ width: `${scrollProgress}%` }}
          transition={{ ease: 'linear', duration: 0.05 }}
        />
      </div>

      {/* Main nav bar */}
      <div className="h-16 bg-cyber-black/85 backdrop-blur-lg border-b border-cyber-slate/60 px-4 md:px-8 flex items-center justify-between">
        {/* Logo / Name */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="relative border border-cyber-primary/50 px-4 py-1.5 rounded bg-cyber-dark/60 shadow-[0_0_14px_rgba(16,185,129,0.2)] overflow-hidden group">
            {/* Shine sweep on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyber-primary/10 to-transparent" />
            <span className="font-mono text-sm font-bold text-cyber-primary tracking-widest relative z-10">
              SHREEYA METHUKU
            </span>
          </div>
        </motion.div>

        {/* Nav items */}
        <div className="flex items-center gap-0.5 md:gap-1 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item, i) => (
            <NavItem key={item.id} {...item} activeSection={activeSection} index={i} />
          ))}
        </div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden md:flex items-center gap-2 text-[10px] font-mono text-cyber-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-primary opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-primary" />
          </span>
          ONLINE
        </motion.div>
      </div>
    </nav>
  );
};
