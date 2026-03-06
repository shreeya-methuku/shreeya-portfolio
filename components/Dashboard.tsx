import React, { useEffect, useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { RESUME } from '../constants';
import { Github, Linkedin, MapPin, Zap, Trophy, Layers } from 'lucide-react';
import { PixelCharacter } from './PixelCharacter';

interface DashboardProps {
  onIntroComplete?: () => void;
}

const ROLES = [
  "Machine Learning Enthusiast",
  "Full Stack Developer",
  "Technomancer",
];

const STAT_BADGES = [
  { icon: Zap,    label: 'LVL',      value: '21',   color: '#10b981' },
  { icon: Trophy, label: 'CGPA',     value: '8.76', color: '#facc15' },
  { icon: Layers, label: 'PROJECTS', value: '8+',   color: '#8b5cf6' },
  { icon: MapPin, label: 'BASE',     value: 'BLR',  color: '#06b6d4' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onIntroComplete }) => {
  const name     = "Shreeya Methuku";
  const greeting = "Hi, I'm";

  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [displayedName, setDisplayedName]         = useState("");
  const [isTypingName, setIsTypingName]           = useState(false);
  const [showCursor, setShowCursor]               = useState(true);
  const [roleIdx, setRoleIdx]                     = useState(0);

  // Typing effect
  useEffect(() => {
    if (displayedGreeting.length < greeting.length) {
      const t = setTimeout(() => setDisplayedGreeting(greeting.slice(0, displayedGreeting.length + 1)), 48);
      return () => clearTimeout(t);
    }
    if (!isTypingName) {
      const t = setTimeout(() => setIsTypingName(true), 280);
      return () => clearTimeout(t);
    }
    if (isTypingName && displayedName.length < name.length) {
      const t = setTimeout(() => setDisplayedName(name.slice(0, displayedName.length + 1)), 65);
      return () => clearTimeout(t);
    }
    if (isTypingName && displayedName.length === name.length && onIntroComplete) {
      const t = setTimeout(() => onIntroComplete(), 450);
      return () => clearTimeout(t);
    }
  }, [displayedGreeting, displayedName, isTypingName, onIntroComplete]);

  // Cursor blink
  useEffect(() => {
    const iv = setInterval(() => setShowCursor(p => !p), 500);
    return () => clearInterval(iv);
  }, []);

  // Role cycling
  useEffect(() => {
    const iv = setInterval(() => setRoleIdx(p => (p + 1) % ROLES.length), 2600);
    return () => clearInterval(iv);
  }, []);

  const isTypingComplete = displayedName.length === name.length;

  const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 24 },
    visible: (d: number) => ({ opacity: 1, y: 0, transition: { delay: d, duration: 0.7, ease: 'easeOut' } }),
  };

  return (
    <div className="flex items-start justify-center w-full min-h-[calc(100vh-100px)] relative z-20 pt-16 md:pt-20">
      <div className="relative z-20 flex flex-col lg:flex-row items-start gap-8 lg:gap-16 w-full max-w-6xl px-4 md:px-8">

        {/* ── Left: text ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0">

          <div className="mb-2 h-10 md:h-14">
            <h2 className="text-3xl md:text-5xl text-cyber-primary font-bold font-mono tracking-wider">
              {displayedGreeting}
            </h2>
          </div>

          <div className="mb-8 min-h-[4rem] md:min-h-[6rem] flex items-center w-full justify-center lg:justify-start">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-white tracking-tight leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
              {displayedName}
            </h1>
            <motion.div
              animate={{ opacity: showCursor ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              className="w-2 md:w-3 h-10 md:h-16 bg-cyber-primary ml-2 inline-block shadow-[0_0_12px_#10b981] flex-shrink-0"
            />
          </div>

          {isTypingComplete && (
            <>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
                className="mb-6 h-10 flex items-center justify-center lg:justify-start"
              >
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={roleIdx}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                    exit={  { opacity: 0, y: -12, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4 }}
                    className="text-xl md:text-2xl font-mono font-bold tracking-widest"
                    style={{ color: '#06b6d4' }}
                  >
                    &gt; {ROLES[roleIdx]}
                  </motion.h3>
                </AnimatePresence>
              </motion.div>


              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                className="space-y-3 mb-10 max-w-xl"
              >
                <p className="text-gray-100 text-xl md:text-2xl font-light leading-relaxed">
                  I love building stuff that makes a difference.
                </p>
                <p className="text-gray-400 text-base md:text-lg font-mono leading-relaxed italic">
                  From AI models that think to apps that work —{' '}
                  I'm all about turning ideas into reality.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.75}
                className="relative z-[80] flex flex-wrap justify-center lg:justify-start gap-4 font-mono"
              >
                <motion.a href={`https://${RESUME.profile.linkedin}`} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-2 overflow-hidden bg-cyber-secondary/10 text-cyber-secondary px-7 py-3 rounded border border-cyber-secondary/50 hover:bg-cyber-secondary/20 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all text-sm tracking-wider"
                >
                  <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyber-secondary/10 to-transparent" />
                  <Linkedin size={16} /> LINKEDIN
                </motion.a>
                <motion.a href="https://github.com/shreeya-methuku" target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-2 overflow-hidden bg-gray-800/80 text-white px-7 py-3 rounded border border-gray-600 hover:bg-gray-700 hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] transition-all text-sm tracking-wider"
                >
                  <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  <Github size={16} /> GITHUB
                </motion.a>
                <motion.a href="https://mail.google.com/mail/?view=cm&to=ft.shreeyyymethuku@gmail.com" target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-2 overflow-hidden bg-cyber-primary/10 text-cyber-primary px-7 py-3 rounded border border-cyber-primary/50 hover:bg-cyber-primary/20 hover:shadow-[0_0_24px_rgba(16,185,129,0.4)] transition-all text-sm tracking-wider"
                >
                  <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyber-primary/10 to-transparent" />
                  ✉ CONTACT
                </motion.a>
              </motion.div>

            </>
          )}
        </div>

        {/* ── Right: character ── */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex-shrink-0 flex items-center justify-center"
          style={{ filter: 'drop-shadow(0 0 40px rgba(34,197,94,0.25))', overflow: 'visible' }}
        >
          <div style={{ transform: 'scale(0.72)', transformOrigin: 'center center' }}
               className="hidden lg:block">
            <PixelCharacter />
          </div>
          <div style={{ transform: 'scale(0.55)', transformOrigin: 'center center' }}
               className="block lg:hidden">
            <PixelCharacter />
          </div>
        </motion.div>

      </div>
    </div>
  );
};
