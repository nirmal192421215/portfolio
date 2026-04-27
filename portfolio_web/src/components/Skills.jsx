import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiReact, SiJavascript, SiHtml5, SiFramer, SiTailwindcss, SiThreedotjs, SiNodedotjs, SiExpress, SiMongodb, SiSocketdotio, SiPython, SiGit, SiVercel, SiRailway } from 'react-icons/si';
import { FaBrain } from 'react-icons/fa';
import { TbFaceId } from 'react-icons/tb';

const skills = [
  // Frontend
  { name: 'React',       icon: <SiReact />,        color: '#61DAFB', level: 88, category: 'Frontend' },
  { name: 'JavaScript',  icon: <SiJavascript />,   color: '#F7DF1E', level: 82, category: 'Frontend' },
  { name: 'HTML/CSS',    icon: <SiHtml5 />,        color: '#E44D26', level: 90, category: 'Frontend' },
  { name: 'Framer Motion',icon: <SiFramer />,       color: '#FF4D9D', level: 75, category: 'Frontend' },
  { name: 'TailwindCSS', icon: <SiTailwindcss />,  color: '#38BDF8', level: 80, category: 'Frontend' },
  { name: 'Three.js',    icon: <SiThreedotjs />,   color: '#000000', level: 70, category: 'Frontend' },
  // Backend
  { name: 'Node.js',     icon: <SiNodedotjs />,    color: '#83CD29', level: 80, category: 'Backend' },
  { name: 'Express',     icon: <SiExpress />,      color: '#FFFFFF', level: 78, category: 'Backend' },
  { name: 'MongoDB',     icon: <SiMongodb />,      color: '#4DB33D', level: 76, category: 'Backend' },
  { name: 'Socket.io',   icon: <SiSocketdotio />,  color: '#010101', level: 70, category: 'Backend' },
  // AI/ML
  { name: 'Python',      icon: <SiPython />,       color: '#3572A5', level: 78, category: 'AI/ML' },
  { name: 'face-api.js', icon: <TbFaceId />,       color: '#7C3AED', level: 72, category: 'AI/ML' },
  { name: 'MediaPipe',   icon: <FaBrain />,        color: '#00F5FF', level: 68, category: 'AI/ML' },
  // DevOps
  { name: 'Git',         icon: <SiGit />,          color: '#F05032', level: 85, category: 'DevOps' },
  { name: 'Vercel',      icon: <SiVercel />,       color: '#FFFFFF', level: 82, category: 'DevOps' },
  { name: 'Railway',     icon: <SiRailway />,      color: '#B45309', level: 70, category: 'DevOps' },
];

const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'DevOps'];

/* ── Circular Progress Ring ────────────────────────────── */
const Ring = ({ level, color, size = 52 }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (level / 100) * circ;

  return (
    <svg width={size} height={size} className="absolute top-0 left-0 rotate-[-90deg]">
      {/* Track */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
      {/* Progress */}
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ - dash }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
        style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
      />
    </svg>
  );
};

/* ── Skill Card ────────────────────────────────────────── */
const SkillCard = ({ skill, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.7 }}
    transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.08, y: -4 }}
    className="relative flex flex-col items-center gap-2 p-4 rounded-2xl cursor-default group"
    style={{
      background: 'rgba(10,10,26,0.7)',
      border: '1px solid rgba(255,255,255,0.07)',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${skill.color}50`;
      e.currentTarget.style.boxShadow = `0 0 24px ${skill.color}20, 0 8px 32px rgba(0,0,0,0.4)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {/* Ring + Icon */}
    <div className="relative w-[52px] h-[52px]">
      <Ring level={skill.level} color={skill.color} size={52} />
      <div className="absolute inset-0 flex items-center justify-center text-xl">
        {skill.icon}
      </div>
    </div>

    {/* Name */}
    <span className="text-xs font-semibold text-center text-white/80 leading-tight">
      {skill.name}
    </span>

    {/* Level tooltip on hover */}
    <motion.span
      className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ background: `${skill.color}22`, color: skill.color, border: `1px solid ${skill.color}30` }}
    >
      {skill.level}%
    </motion.span>
  </motion.div>
);

const Skills = () => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="py-20 lg:py-32 relative">
      <div className="section-container">
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="font-mono text-sm" style={{ color: '#00F5FF' }}>02.</span>
          <span className="font-mono text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>Skills</span>
        </motion.div>

        <motion.h2
          className="font-display font-black text-white mb-3"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Tech <span className="neon-text">Stack</span>
        </motion.h2>
        <motion.p
          className="mb-10 max-w-md"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Tools I use to build real-world AI-powered applications.
        </motion.p>

        {/* ── Category Filter ── */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={active === cat ? {
                background: 'linear-gradient(135deg, #00F5FF, #7C3AED)',
                color: '#fff',
                border: '1px solid transparent',
                boxShadow: '0 0 16px rgba(0,245,255,0.3)',
              } : {
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Skills Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
