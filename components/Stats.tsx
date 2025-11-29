import React from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface SkillBarProps {
  name: string;
  value: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs mb-1 font-mono">
      <span className="text-gray-300">{name}</span>
      <span style={{ color }}>{value}%</span>
    </div>
    <div className="w-full bg-cyber-slate h-2 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full relative"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
      </motion.div>
    </div>
  </div>
);

export const Stats: React.FC = () => {
  const getColor = (idx: number) => {
    const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f43f5e'];
    return colors[idx % colors.length];
  };

  // Updated attributes with Sales
  const attributeData = [
    { subject: 'Coding', A: 95, fullMark: 100 },
    { subject: 'AI / ML', A: 98, fullMark: 100 },
    { subject: 'Leadership', A: 90, fullMark: 100 },
    { subject: 'Sales', A: 85, fullMark: 100 },
    { subject: 'Strategy', A: 85, fullMark: 100 },
    { subject: 'Communication', A: 92, fullMark: 100 },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-pixel text-cyber-primary">
            SKILL_TREE
        </h2>
        <div className="h-px bg-cyber-slate flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Attribute Diagram (Radar Chart) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-cyber-dark/80 border border-cyber-primary/30 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px] shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        >
            <div className="absolute top-0 left-0 bg-cyber-primary text-black text-xs font-bold font-mono px-3 py-1 rounded-br-lg z-10">
                STATS.HEX
            </div>
            
            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

            <div className="w-full h-[300px] relative z-0">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={attributeData}>
                        <PolarGrid stroke="#334155" strokeWidth={1} />
                        <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: '#10b981', fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }} 
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Stats"
                            dataKey="A"
                            stroke="#10b981"
                            strokeWidth={3}
                            fill="#10b981"
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>

        {/* Skill Bars */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESUME.skills.map((category, idx) => (
            <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-cyber-dark border border-cyber-slate p-6 rounded-lg relative hover:border-cyber-primary/50 transition-colors"
            >
                <div className="absolute -top-3 left-4 bg-cyber-black px-2 text-sm text-gray-400 font-mono border border-cyber-slate">
                [{category.category.toUpperCase()}]
                </div>
                
                <div className="mt-4">
                    {category.items.map((skill, sIdx) => (
                        <SkillBar 
                            key={skill} 
                            name={skill} 
                            value={Math.floor(Math.random() * (98 - 75) + 75)} 
                            color={getColor(idx)} 
                        />
                    ))}
                </div>
            </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};