import React from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { Code, ExternalLink } from 'lucide-react';

const getProjectImage = (index: number) => {
    // Highly relevant images for each project
    const images = [
        "https://images.unsplash.com/photo-1576091160550-2187d80a18f7?q=80&w=1000&auto=format&fit=crop", // Sleep Staging -> EEG Signals / Monitor
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop", // Urban Crime -> City Night Map
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000&auto=format&fit=crop", // Medicine/Genetics -> DNA Structure
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop", // Zoho Chat/AI -> Robot/AI Interface
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop", // ModelForge -> Coding/Monitor
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop", // MOODIFY -> Vinyl/Music
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", // POS Simulator -> Business/Finance/Charts
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop", // Grab and Go -> Food/Burger
    ];
    return images[index % images.length];
};

export const Inventory: React.FC = () => {
  return (
    <div className="w-full">
       <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-pixel text-cyber-secondary">
            PROJECTS
        </h2>
        <div className="h-px bg-cyber-slate flex-grow"></div>
        <span className="text-xs font-mono text-gray-500">TOTAL_ITEMS: {RESUME.projects.length}</span>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {RESUME.projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`group relative overflow-hidden rounded-xl border flex flex-col h-[400px] transition-all hover:scale-[1.02] duration-300 ${
                project.featured ? 'border-cyber-primary/50' : 'border-cyber-slate'
            }`}
          >
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-30"
                style={{ backgroundImage: `url(${getProjectImage(idx)})` }}
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-dark/90 to-transparent" />

            {/* Featured Ribbon */}
            {project.featured && (
                <div className="absolute top-0 right-0 bg-cyber-primary text-black text-[10px] font-bold px-3 py-1 font-mono z-20 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                    FEATURED
                </div>
            )}

            <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4 mt-auto">
                    <div className={`p-2 rounded-lg backdrop-blur-md border border-white/10 ${project.featured ? 'bg-cyber-primary/20 text-cyber-primary' : 'bg-white/5 text-white'}`}>
                        <Code size={20} />
                    </div>
                    <h3 className="font-bold text-xl text-white group-hover:text-cyber-accent transition-colors font-mono leading-tight shadow-black drop-shadow-md">
                        {project.name}
                    </h3>
                </div>

                <p className="text-sm text-gray-300 mb-6 font-mono leading-relaxed drop-shadow-md line-clamp-3">
                    {project.description}
                </p>

                <div className="space-y-4">
                    <div className="text-xs text-cyber-secondary font-mono">
                        <span className="opacity-70">STACK:</span> <span className="font-bold">[{project.stack}]</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="text-xs text-gray-400 font-mono bg-black/50 px-2 py-1 rounded border border-white/5">{project.period}</span>
                        {project.link && (
                            <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center gap-2 text-xs bg-cyber-primary/90 hover:bg-white hover:text-black text-black px-4 py-2 rounded transition-all font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            >
                                VIEW <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};