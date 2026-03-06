import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { Code, ExternalLink, Cpu } from 'lucide-react';

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1576091160550-2187d80a18f7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (ny - 0.5) * -12, y: (nx - 0.5) * 12 });
    setShine({ x: nx * 100, y: ny * 100, opacity: 0.12 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShine(s => ({ ...s, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`relative ${className}`}
    >
      {/* Shine highlight */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
};

export const Inventory: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-cyber-secondary rounded-full shadow-[0_0_8px_#8b5cf6]" />
          <h2 className="text-3xl font-pixel text-cyber-secondary tracking-wide">PROJECTS</h2>
        </div>
        <div className="h-px bg-gradient-to-r from-cyber-secondary/40 to-transparent flex-grow" />
        <span className="text-[10px] font-mono text-gray-500 tracking-widest">
          TOTAL: {RESUME.projects.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {RESUME.projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.55, ease: 'easeOut' }}
          >
            <TiltCard
              className={`group overflow-hidden rounded-xl border flex flex-col h-[400px] ${
                project.featured
                  ? 'border-cyber-primary/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                  : 'border-cyber-slate'
              }`}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${PROJECT_IMAGES[idx % PROJECT_IMAGES.length]})`,
                  opacity: 0.45,
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-dark/92 to-transparent" />

              {/* Featured ribbon */}
              {project.featured && (
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-cyber-primary text-black text-[10px] font-bold px-3 py-1 font-mono shadow-[0_0_12px_rgba(16,185,129,0.6)] flex items-center gap-1">
                    <Cpu size={10} /> FEATURED
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="mt-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2 rounded-lg backdrop-blur-md border border-white/10 ${
                        project.featured
                          ? 'bg-cyber-primary/20 text-cyber-primary'
                          : 'bg-white/5 text-white'
                      }`}
                    >
                      <Code size={18} />
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-cyber-accent transition-colors font-mono leading-tight drop-shadow-md">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-300 mb-5 font-mono leading-relaxed drop-shadow-md line-clamp-3">
                    {project.description}
                  </p>

                  <div className="space-y-3">
                    <div className="text-xs text-cyber-secondary font-mono">
                      <span className="opacity-60">STACK:</span>{' '}
                      <span className="font-bold">[{project.stack}]</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-xs text-gray-500 font-mono bg-black/50 px-2 py-1 rounded border border-white/5">
                        {project.period}
                      </span>
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs bg-cyber-primary/90 hover:bg-white hover:text-black text-black px-4 py-2 rounded transition-all font-mono font-bold shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                          onClick={e => e.stopPropagation()}
                        >
                          VIEW <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-600 font-mono italic">private</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
