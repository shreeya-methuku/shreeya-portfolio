import React from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export const QuestLog: React.FC = () => {
  return (
    <div className="w-full font-mono">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-pixel text-cyber-accent">
            QUEST_LOG
        </h2>
        <div className="h-px bg-cyber-slate flex-grow"></div>
      </div>

      <div className="space-y-12 relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-6 top-4 bottom-0 w-0.5 bg-cyber-slate z-0"></div>

        {RESUME.experience.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="relative pl-12 md:pl-20 z-10"
          >
            {/* Node Icon */}
            <div className={`absolute left-0 md:left-2 w-8 h-8 md:w-9 md:h-9 rounded-full border-4 border-cyber-black flex items-center justify-center z-10 ${
                exp.type === 'Leadership' ? 'bg-cyber-secondary' : 'bg-cyber-primary'
            }`}>
                <Briefcase size={14} className="text-white" />
            </div>

            <div className="bg-cyber-dark/80 border border-cyber-slate p-6 md:p-8 rounded-lg hover:border-cyber-primary transition-colors group backdrop-blur-sm shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyber-primary transition-colors">
                        {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 bg-cyber-black/50 px-3 py-1 rounded border border-cyber-slate mt-2 md:mt-0 w-fit">
                        <Calendar size={14} /> {exp.period}
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-cyber-accent mb-6">
                    <span className="font-bold tracking-wide text-lg">{exp.company}</span>
                    <span className="hidden md:block text-gray-600">•</span>
                    <span className="flex items-center gap-1 text-gray-500">
                        <MapPin size={12} /> {exp.location}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 border border-gray-600 rounded text-gray-400 uppercase w-fit">
                        {exp.type}
                    </span>
                </div>

                <ul className="space-y-3">
                    {exp.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-sm md:text-base text-gray-300 leading-relaxed">
                            <span className="text-cyber-primary mt-1.5 text-xs">▹</span>
                            <span dangerouslySetInnerHTML={{ 
                                __html: point.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>') 
                            }} />
                        </li>
                    ))}
                </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};