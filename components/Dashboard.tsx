import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { RESUME } from '../constants';
import { Github, Linkedin } from 'lucide-react';

interface DashboardProps {
  onIntroComplete?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onIntroComplete }) => {
  const name = "Shreeya Srinivas Methuku";
  const greeting = "Hi, I'm";
  
  const [displayedGreeting, setDisplayedGreeting] = useState("");
  const [displayedName, setDisplayedName] = useState("");
  const [isTypingName, setIsTypingName] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Typing effect logic
  useEffect(() => {
    // 1. Type Greeting
    if (displayedGreeting.length < greeting.length) {
      const timeout = setTimeout(() => {
        setDisplayedGreeting(greeting.slice(0, displayedGreeting.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } 
    
    // 2. Start Typing Name after greeting
    if (!isTypingName) {
      const timeout = setTimeout(() => setIsTypingName(true), 300);
      return () => clearTimeout(timeout);
    }

    // 3. Type Name
    if (isTypingName && displayedName.length < name.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(name.slice(0, displayedName.length + 1));
      }, 70); // Slightly slower for the name for emphasis
      return () => clearTimeout(timeout);
    }

    // 4. Complete
    if (isTypingName && displayedName.length === name.length) {
       // Trigger parent callback to reveal the rest of the site
       if (onIntroComplete) {
         const timeout = setTimeout(() => onIntroComplete(), 500);
         return () => clearTimeout(timeout);
       }
    }
  }, [displayedGreeting, displayedName, isTypingName, onIntroComplete]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Fade up animation for blocks that appear AFTER typing
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: customDelay, duration: 0.8, ease: "easeOut" }
    })
  };

  const isTypingComplete = displayedName.length === name.length;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-100px)] text-center relative z-20">
      
      {/* Content Wrapper: Centered in screen, text aligned center inside */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-5xl px-4 md:px-8">
            {/* Greeting */}
            <div className="mb-2 h-10 md:h-14">
               <h2 className="text-3xl md:text-5xl text-cyber-primary font-bold font-mono">
                {displayedGreeting}
               </h2>
            </div>
            
            {/* Name with Cursor */}
            <div className="mb-10 min-h-[4rem] md:min-h-[6rem] flex items-center justify-center w-full">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-white tracking-normal leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {displayedName}
                </h1>
                <motion.div 
                  animate={{ opacity: showCursor ? 1 : 0 }}
                  transition={{ duration: 0.1 }}
                  className="w-2 md:w-4 h-10 md:h-20 bg-cyber-primary ml-2 inline-block shadow-[0_0_10px_#10b981]"
                />
            </div>

            {/* Elements that fade in AFTER typing is complete */}
            {isTypingComplete && (
              <>
                {/* Role */}
                <motion.h3
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.2} 
                  className="text-2xl md:text-3xl text-cyber-accent font-bold tracking-wide mb-8 font-mono"
                >
                    Machine Learning Enthusiast & Full Stack Developer
                </motion.h3>
                    
                {/* Description */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.5} 
                  className="space-y-4 mb-12 font-sans max-w-2xl"
                >
                  <p className="text-gray-100 text-2xl md:text-3xl font-light">
                    I love building stuff that makes a difference.
                  </p>
                  <p className="text-gray-400 text-xl italic font-mono">
                    From AI models that think to apps that work — I'm all about turning ideas into reality.
                  </p>
                </motion.div>

                {/* Social Actions */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.8} 
                  className="relative z-[80] mb-16" // High z-index to sit above overlays
                >
                    <div className="flex flex-wrap justify-center gap-6 font-mono">
                        <a 
                            href={`https://${RESUME.profile.linkedin}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="relative flex items-center gap-2 bg-transparent text-cyber-secondary px-8 py-4 rounded border border-cyber-secondary hover:bg-cyber-secondary/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all transform hover:-translate-y-1"
                        >
                            <Linkedin size={20} /> LINKEDIN
                        </a>
                        <a 
                            href="https://github.com/shreeya-methuku" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="relative flex items-center gap-2 bg-gray-800 text-white px-8 py-4 rounded border border-gray-600 hover:bg-gray-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-1"
                        >
                            <Github size={20} /> GITHUB
                        </a>
                    </div>
                </motion.div>
              </>
            )}
      </div>
    </div>
  );
};