import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RESUME } from '../constants';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Stable, deterministic skill values — no re-render flicker
const SKILL_VALUES: Record<string, number> = {
  Python: 96, C: 82, 'C++': 80, Java: 78, JavaScript: 88, SQL: 85,
  'React.js': 90, 'Node.js': 85, 'Express.js': 82, TypeScript: 84, 'Tailwind CSS': 92, 'HTML/CSS': 93,
  TensorFlow: 88, PyTorch: 86, 'Scikit-learn': 92, Pandas: 94, NumPy: 93, OpenCV: 78, 'Deep Learning': 87, 'LLMs (RAG)': 85,
  Firebase: 80, Git: 90, MLflow: 78, LangChain: 82, LLaMaIndex: 78, ROS: 70,
};

const getSkillValue = (name: string, idx: number): number => {
  if (SKILL_VALUES[name] !== undefined) return SKILL_VALUES[name];
  const seed = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), idx * 7);
  return 75 + (seed % 23);
};

const CATEGORY_COLORS = ['#10b981', '#06b6d4', '#8b5cf6', '#f43f5e'];

interface SkillBarProps {
  name: string;
  value: number;
  color: string;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, value, color, delay }) => (
  <div className="mb-3.5">
    <div className="flex justify-between text-xs mb-1.5 font-mono">
      <span className="text-gray-300">{name}</span>
      <span className="font-bold" style={{ color }}>{value}%</span>
    </div>
    <div className="w-full bg-cyber-slate/60 h-1.5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut', delay }}
        className="h-full rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}
      />
    </div>
  </div>
);

const attributeData = [
  { subject: 'Coding', A: 95, fullMark: 100 },
  { subject: 'AI / ML', A: 98, fullMark: 100 },
  { subject: 'Leadership', A: 90, fullMark: 100 },
  { subject: 'Sales', A: 85, fullMark: 100 },
  { subject: 'Strategy', A: 85, fullMark: 100 },
  { subject: 'Communication', A: 92, fullMark: 100 },
];

export const Stats: React.FC = () => {
  const skillsWithValues = useMemo(() =>
    RESUME.skills.map((cat, cidx) => ({
      ...cat,
      color: CATEGORY_COLORS[cidx % CATEGORY_COLORS.length],
      items: cat.items.map((name, sidx) => ({
        name,
        value: getSkillValue(name, cidx * 10 + sidx),
      })),
    })), []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-cyber-primary rounded-full shadow-[0_0_8px_#10b981]" />
          <h2 className="text-3xl font-pixel text-cyber-primary tracking-wide">SKILL_TREE</h2>
        </div>
        <div className="h-px bg-gradient-to-r from-cyber-primary/40 to-transparent flex-grow" />
        <span className="text-[10px] text-gray-600 tracking-widest font-mono">ATTRIBUTES</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Radar chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-1 bg-cyber-dark/80 border border-cyber-primary/30 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px] shadow-[0_0_24px_rgba(16,185,129,0.08)]"
        >
          <div className="absolute top-0 left-0 bg-cyber-primary text-black text-[10px] font-bold font-mono px-3 py-1 rounded-br-xl z-10 tracking-widest">
            STATS.HEX
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />

          <div className="w-full h-[300px] relative z-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={attributeData}>
                <PolarGrid stroke="#334155" strokeWidth={1} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#10b981', fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Stats"
                  dataKey="A"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="#10b981"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skill bars */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsWithValues.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-cyber-dark border border-cyber-slate p-5 rounded-xl relative group hover:border-opacity-60 transition-colors"
            >
              <div
                className="absolute -top-3 left-4 bg-cyber-black px-2 text-xs font-mono font-bold border rounded"
                style={{ color: category.color, borderColor: `${category.color}50` }}
              >
                [{category.category.toUpperCase()}]
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                style={{ background: `radial-gradient(ellipse at 0% 0%, ${category.color}06, transparent 60%)` }}
              />

              <div className="mt-4">
                {category.items.map((skill, sIdx) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    value={skill.value}
                    color={category.color}
                    delay={sIdx * 0.05 + idx * 0.08}
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
