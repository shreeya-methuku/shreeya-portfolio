import React from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { Award, Book, Trophy } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <div className="w-full font-mono">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-pixel text-white">
            EDUCATION
        </h2>
        <div className="h-px bg-cyber-slate flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {RESUME.education.map((edu, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-cyber-dark/90 backdrop-blur border-l-4 border-cyber-primary border-y border-r border-y-cyber-slate border-r-cyber-slate p-6 rounded-r-xl hover:bg-cyber-slate/20 transition-colors relative group"
            >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Book size={64} />
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start mb-4 relative z-10 gap-4">
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-cyber-primary transition-colors">{edu.school}</h4>
                        <div className="text-cyber-accent text-lg font-bold">{edu.degree}</div>
                    </div>
                    
                    {/* Highlighted Score Badge - Updated for high visibility */}
                    <div className="flex items-center gap-3 bg-cyber-primary/20 border border-cyber-primary/50 px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md transform transition-transform hover:scale-105 min-w-[140px] justify-center">
                        <Trophy size={28} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                        <span className="text-white font-bold font-mono text-4xl tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                            {edu.score.replace(/CGPA:?\s*/i, '')}
                        </span>
                    </div>
                </div>

                <div className="text-gray-500 text-xs mb-4 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    {edu.period}
                </div>
                
                {edu.details && (
                    <p className="text-sm text-gray-300 border-t border-gray-800 pt-3 leading-relaxed">
                        {edu.details}
                    </p>
                )}
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export const Awards: React.FC = () => {
    return (
      <div className="w-full font-mono">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-pixel text-yellow-500">
              AWARDS
          </h2>
          <div className="h-px bg-cyber-slate flex-grow"></div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESUME.awards.map((award, idx) => (
              <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-gradient-to-br from-cyber-dark to-black p-8 border border-yellow-500/30 rounded-xl relative overflow-hidden group hover:border-yellow-500/60 transition-colors"
              >
                  <div className="absolute -bottom-4 -right-4 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-yellow-500">
                      <Award size={100} />
                  </div>
                  
                  <h4 className="text-xl font-bold text-yellow-500 mb-2 relative z-10">{award.title}</h4>
                  <div className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest relative z-10">{award.organization}</div>
                  <p className="text-sm text-gray-300 relative z-10 leading-relaxed border-l-2 border-yellow-500/50 pl-4">
                      {award.description}
                  </p>
              </motion.div>
          ))}
        </div>
      </div>
    );
  };