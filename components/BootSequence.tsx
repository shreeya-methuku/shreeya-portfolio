import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_MESSAGES = [
  "INITIALIZING NEURAL INTERFACE...",
  "LOADING PORTFOLIO ASSETS...",
  "SYNCING SKILL DATABASE...",
  "ESTABLISHING SECURE CONNECTION...",
  "COMPILING EXPERIENCE MATRIX...",
  "CALIBRATING REALITY SHARDS...",
  "MOUNTING ACHIEVEMENT NODES...",
  "SYSTEM READY.",
];

const MILESTONES = [25, 50, 75, 100];

type Phase = 'logo' | 'loading' | 'ready' | 'exiting';

export const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>('logo');
  const [progress, setProgress] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [hitMilestones, setHitMilestones] = useState<number[]>([]);
  const progressRef = useRef(0);

  // Phase 1 → Phase 2
  useEffect(() => {
    const t = setTimeout(() => setPhase('loading'), 900);
    return () => clearTimeout(t);
  }, []);

  // Progress + messages
  useEffect(() => {
    if (phase !== 'loading') return;

    const interval = setInterval(() => {
      const current = progressRef.current;
      const nearMilestone = MILESTONES.some(m => current >= m - 2 && current < m && !hitMilestones.includes(m));
      const speed = nearMilestone ? 0.3 : current < 40 ? 2.5 : current < 70 ? 1.8 : current < 90 ? 1.2 : 3;
      const next = Math.min(100, current + speed);
      progressRef.current = next;
      setProgress(next);

      MILESTONES.forEach(m => {
        if (current < m && next >= m) {
          setHitMilestones(prev => [...prev, m]);
        }
      });

      if (next >= 100) clearInterval(interval);
    }, 30);

    const msgInterval = setInterval(() => {
      setMessageIdx(prev => Math.min(prev + 1, BOOT_MESSAGES.length - 1));
    }, 400);

    return () => { clearInterval(interval); clearInterval(msgInterval); };
  }, [phase]);

  // Progress 100 → go straight to exit
  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => setPhase('exiting'), 300);
    return () => clearTimeout(t);
  }, [progress]);

  // Called when the exit animation (opacity→0) completes — THEN show main page
  const handleAnimationComplete = () => {
    if (phase === 'exiting') onComplete();
  };

  const corners = [
    'top-6 left-6 border-t-2 border-l-2',
    'top-6 right-6 border-t-2 border-r-2',
    'bottom-6 left-6 border-b-2 border-l-2',
    'bottom-6 right-6 border-b-2 border-r-2',
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-[#020202] flex flex-col items-center justify-center z-[100] overflow-hidden"
      animate={
        phase === 'exiting'
          ? { opacity: 0, scale: 1.06, filter: 'blur(16px)' }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.65, ease: 'easeInOut' }}
      onAnimationComplete={handleAnimationComplete}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      {/* Corner HUD decorations */}
      {corners.map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
          className={`absolute ${cls} w-10 h-10 border-cyber-primary/50`}
        />
      ))}

      {/* Ruled lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        className="absolute top-6 left-20 right-20 h-px bg-cyber-primary/20 origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        className="absolute bottom-6 left-20 right-20 h-px bg-cyber-primary/20 origin-right"
      />

      {/* Logo ring assembly */}
      <div className="relative w-52 h-52 flex items-center justify-center mb-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-cyber-primary/15"
          style={{ borderTopColor: '#10b981', borderBottomColor: '#10b981' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-5 rounded-full border border-cyber-secondary/20"
          style={{ borderLeftColor: '#8b5cf6', borderRightColor: '#8b5cf6' }}
        />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.06, 1] }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute inset-12 rounded-full border-2 border-dashed border-cyber-accent/40"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-cyber-primary/8 blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.5, delay: 0.1 }}
          className="relative z-10 select-none"
        >
          <h1 className="text-6xl font-black tracking-tighter text-white font-mono relative">SSM</h1>
          <motion.span
            animate={{ x: [-3, 4, -3], opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 2.2 }}
            className="absolute inset-0 text-6xl font-black tracking-tighter text-cyber-primary font-mono mix-blend-screen pointer-events-none"
          >SSM</motion.span>
          <motion.span
            animate={{ x: [3, -4, 3], opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 3.1 }}
            className="absolute inset-0 text-6xl font-black tracking-tighter text-cyber-secondary font-mono mix-blend-screen pointer-events-none"
          >SSM</motion.span>
        </motion.div>
      </div>

      {/* Loading bar section */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="w-80 space-y-4"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIdx}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                className="text-[11px] font-mono text-cyber-primary/80 text-center tracking-widest min-h-[1rem]"
              >
                {BOOT_MESSAGES[messageIdx]}
              </motion.p>
            </AnimatePresence>

            <div className="relative">
              <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800/80">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-secondary rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {MILESTONES.slice(0, -1).map(m => (
                <div key={m} className="absolute top-0 bottom-0 w-px" style={{ left: `${m}%` }}>
                  <motion.div
                    animate={{ opacity: hitMilestones.includes(m) ? 1 : 0.2 }}
                    className="w-px h-full bg-cyber-accent"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-cyber-primary tracking-widest">SHREEYA METHUKU</span>
              <span className="text-gray-500">{Math.floor(progress)}%</span>
            </div>

            <div className="flex justify-around text-[9px] font-mono">
              {['INIT', 'LOAD', 'SYNC', 'GO'].map((label, i) => (
                <motion.span
                  key={label}
                  animate={{ color: hitMilestones.includes(MILESTONES[i]) ? '#10b981' : '#374151' }}
                  transition={{ duration: 0.3 }}
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Version tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-[9px] font-mono text-gray-600 tracking-widest"
      >
        SSM_PORTFOLIO // v2.0.26
      </motion.div>
    </motion.div>
  );
};
