import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5; // Slightly faster load
      });
    }, 40); 

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#020202] flex flex-col items-center justify-center z-[100] cursor-none">
      <AnimatePresence>
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative flex flex-col items-center justify-center w-full h-full"
        >
          {/* Reactor Core Animation */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer Ring 1 */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cyber-slate/30 border-t-cyber-primary border-b-cyber-primary opacity-80"
            />
            
            {/* Outer Ring 2 (Reverse) */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-cyber-slate/30 border-l-cyber-secondary border-r-cyber-secondary opacity-80"
            />

            {/* Inner Ring (Fast) */}
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity }
              }}
              className="absolute inset-16 rounded-full border-2 border-dashed border-cyber-accent opacity-80"
            />

            {/* Core Glow */}
            <div className="absolute inset-0 bg-cyber-primary/10 blur-3xl rounded-full animate-pulse" />
            
            {/* Central Logo Construction */}
            <div className="relative z-10 flex flex-col items-center">
               <motion.div
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="relative"
               >
                 <h1 className="text-7xl font-black tracking-tighter text-white font-mono z-10 relative">
                   SSM
                 </h1>
                 
                 {/* Glitch overlays */}
                 <motion.div 
                    animate={{ x: [-2, 3, -2], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-0 text-7xl font-black tracking-tighter text-cyber-primary font-mono mix-blend-screen opacity-50"
                 >
                   SSM
                 </motion.div>
                 <motion.div 
                    animate={{ x: [2, -3, 2], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2.5 }}
                    className="absolute inset-0 text-7xl font-black tracking-tighter text-cyber-secondary font-mono mix-blend-screen opacity-50"
                 >
                   SSM
                 </motion.div>
               </motion.div>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="mt-16 w-64 space-y-2">
            <div className="h-1 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary shadow-[0_0_15px_#10b981]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-cyber-primary">
              <span className="animate-pulse">SHREEYA METHUKU</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};