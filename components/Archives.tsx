import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { Award, Book, Trophy, Star } from 'lucide-react';

// 3D tilt hook
const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt({ x: x * -8, y: y * 8 });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return { ref, tilt, onMouseMove, onMouseLeave };
};

const EDU_COLORS = ['#10b981', '#06b6d4', '#8b5cf6'];

export const Education: React.FC = () => {
  return (
    <div className="w-full font-mono">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-cyber-primary rounded-full shadow-[0_0_8px_#10b981]" />
          <h2 className="text-3xl font-pixel text-white tracking-wide">EDUCATION</h2>
        </div>
        <div className="h-px bg-gradient-to-r from-cyber-primary/40 to-transparent flex-grow" />
        <span className="text-[10px] text-gray-600 tracking-widest">ACADEMIC_LOG</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {RESUME.education.map((edu, idx) => {
          const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();
          const accentColor = EDU_COLORS[idx % EDU_COLORS.length];
          const rawScore = edu.score.replace(/CGPA:?\s*/i, '');

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
              ref={ref}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
                borderLeftColor: accentColor,
              }}
              className="bg-cyber-dark/90 backdrop-blur border-l-4 border-y border-r border-y-cyber-slate border-r-cyber-slate p-6 md:p-8 rounded-r-2xl relative group overflow-hidden cursor-default"
            >
              {/* Gradient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 0% 50%, ${accentColor}08, transparent 70%)` }}
              />

              {/* Watermark icon */}
              <div className="absolute top-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                <Book size={80} />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start mb-4 relative z-10 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                    <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">
                      {edu.school}
                    </h4>
                  </div>
                  <div className="font-bold text-base pl-4" style={{ color: accentColor }}>
                    {edu.degree}
                  </div>
                </div>

                {/* Score badge */}
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl backdrop-blur-md min-w-[130px] justify-center relative overflow-hidden"
                  style={{
                    background: `${accentColor}12`,
                    border: `1px solid ${accentColor}40`,
                    boxShadow: `0 0 20px ${accentColor}18`,
                  }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                  <Trophy size={22} className="text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" />
                  <span
                    className="font-bold font-mono text-3xl tracking-tight"
                    style={{ color: '#fff', textShadow: `0 0 16px ${accentColor}80` }}
                  >
                    {rawScore}
                  </span>
                </motion.div>
              </div>

              {/* Period */}
              <div className="text-gray-500 text-xs mb-4 uppercase tracking-widest flex items-center gap-2 pl-4">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                {edu.period}
              </div>

              {edu.details && (
                <p className="text-sm text-gray-300 border-t border-gray-800/60 pt-3 leading-relaxed pl-4">
                  {edu.details}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const Awards: React.FC = () => {
  return (
    <div className="w-full font-mono">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-yellow-500 rounded-full shadow-[0_0_8px_#eab308]" />
          <h2 className="text-3xl font-pixel text-yellow-400 tracking-wide">AWARDS</h2>
        </div>
        <div className="h-px bg-gradient-to-r from-yellow-500/40 to-transparent flex-grow" />
        <span className="text-[10px] text-gray-600 tracking-widest">ACHIEVEMENTS_LOG</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESUME.awards.map((award, idx) => {
          const { ref, tilt, onMouseMove, onMouseLeave } = useTilt();

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
              ref={ref}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="bg-gradient-to-br from-cyber-dark to-black p-8 border border-yellow-500/25 rounded-2xl relative overflow-hidden group hover:border-yellow-500/50 transition-colors cursor-default"
            >
              {/* Corner glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(234,179,8,0.06),transparent_60%)]" />

              {/* Watermark */}
              <div className="absolute -bottom-3 -right-3 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity text-yellow-500">
                <Award size={110} />
              </div>

              {/* Star badge */}
              <div className="flex items-start gap-3 mb-4 relative z-10">
                <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 mt-0.5 flex-shrink-0">
                  <Star size={16} className="text-yellow-400" />
                </div>
                <h4 className="text-lg font-bold text-yellow-400 leading-tight">{award.title}</h4>
              </div>

              <div className="text-[10px] text-gray-500 mb-4 font-bold uppercase tracking-widest relative z-10 pl-11">
                {award.organization}
              </div>

              <p className="text-sm text-gray-300 relative z-10 leading-relaxed border-l-2 border-yellow-500/40 pl-4 ml-2">
                {award.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
