import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { Calendar, MapPin, Briefcase, Star } from 'lucide-react';

const TYPE_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
  Internship: { color: '#10b981', bg: '#10b98120', label: 'INTERNSHIP' },
  Leadership: { color: '#8b5cf6', bg: '#8b5cf620', label: 'LEADERSHIP' },
  Work: { color: '#06b6d4', bg: '#06b6d420', label: 'WORK' },
};

const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: x * -5, y: y * 5 });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });
  return { ref, tilt, onMouseMove, onMouseLeave };
};

export const QuestLog: React.FC = () => {
  return (
    <div className="w-full font-mono">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-cyber-accent rounded-full shadow-[0_0_8px_#06b6d4]" />
          <h2 className="text-3xl font-pixel text-cyber-accent tracking-wide">EXPERIENCE</h2>
        </div>
        <div className="h-px bg-gradient-to-r from-cyber-accent/40 to-transparent flex-grow" />
        <span className="text-[10px] text-gray-600 tracking-widest">QUEST_LOG</span>
      </div>

      <div className="space-y-10 relative">
        {/* Animated timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ originY: 0 } as React.CSSProperties}
          className="absolute left-4 md:left-6 top-4 bottom-0 w-px bg-gradient-to-b from-cyber-accent/60 via-cyber-secondary/40 to-transparent z-0"
        />

        {RESUME.experience.map((exp, idx) => {
          const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();
          const cfg = TYPE_CONFIG[exp.type] ?? TYPE_CONFIG.Work;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
              className="relative pl-14 md:pl-20 z-10"
            >
              {/* Timeline node */}
              <div className="absolute left-0 md:left-2 z-20">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.2 }}
                  className="relative w-9 h-9 md:w-10 md:h-10"
                >
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-25"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <span
                    className="absolute inset-0 rounded-full flex items-center justify-center border-2 border-cyber-black"
                    style={{ backgroundColor: cfg.color }}
                  >
                    <Briefcase size={14} className="text-white" />
                  </span>
                </motion.div>
              </div>

              {/* Card with 3D tilt */}
              <div
                ref={ref}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="bg-cyber-dark/85 border border-cyber-slate p-6 md:p-8 rounded-2xl hover:border-cyber-primary/40 transition-colors group backdrop-blur-sm shadow-lg relative overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 0% 0%, ${cfg.color}08, transparent 60%)` }}
                />

                <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyber-primary transition-colors leading-tight">
                    {exp.role}
                  </h3>
                  <div
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border w-fit flex-shrink-0 font-bold"
                    style={{ color: cfg.color, backgroundColor: cfg.bg, borderColor: `${cfg.color}40` }}
                  >
                    <Calendar size={11} /> {exp.period}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-5">
                  <span className="font-bold tracking-wide text-base" style={{ color: cfg.color }}>
                    {exp.company}
                  </span>
                  <span className="text-gray-700 hidden md:inline">•</span>
                  <span className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin size={11} /> {exp.location}
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                    style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}30` }}
                  >
                    {cfg.label}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm md:text-base text-gray-300 leading-relaxed">
                      <Star size={10} className="mt-2 flex-shrink-0" style={{ color: cfg.color }} />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: point.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>'),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
