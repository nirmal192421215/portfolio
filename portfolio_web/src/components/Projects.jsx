import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const projects = [
  {
    id: 1,
    title: 'Krythion',
    subtitle: 'Gamified AI Learning Platform',
    description: 'An intelligent learning platform combining AI tutoring, real-time focus tracking via face detection, and gamification to keep learners engaged and productive. Features live WebSocket sessions and adaptive quiz engine.',
    tech: ['React', 'Node.js', 'Socket.io', 'face-api.js', 'MongoDB', 'Express'],
    highlights: [
      { icon: '🤖', text: 'AI-powered tutor engine' },
      { icon: '👁️', text: 'Live face detection focus tracking' },
      { icon: '⚡', text: 'Real-time WebSocket system' },
      { icon: '🎮', text: 'Gamification & reward system' },
    ],
    live:   'https://krythion-frontend-production.up.railway.app/focus',
    github: 'https://github.com/nirmal192421215/NK-krythion-app',
    image:  '/projects/krythion_official_square.jpg',
    accent: '#00F5FF',
    badge:  'FEATURED',
    status: 'Live',
  },
  {
    id: 2,
    title: 'MindMeter',
    subtitle: 'Cognitive Wellness OS',
    description: 'Full-stack cognitive wellness system monitoring developer health in real time — blink rate, OS activity, fatigue patterns. Prevents burnout before it happens using AI scoring and intelligent alerts.',
    tech: ['React', 'Python', 'MediaPipe', 'Node.js', 'MongoDB', 'ThreeJS'],
    highlights: [
      { icon: '📊', text: 'Real-time activity dashboard' },
      { icon: '👁️', text: 'Blink detection via MediaPipe' },
      { icon: '🔔', text: 'Intelligent fatigue alerts' },
      { icon: '🧠', text: 'AI burnout scoring engine' },
    ],
    live:   'https://mind-meter-neon.vercel.app/',
    github: 'https://github.com/nirmal192421215/MindMeter',
    image:  '/projects/mindmeter_logo.png',
    accent: '#7C3AED',
    badge:  'FEATURED',
    status: 'Live',
  },
  {
    id: 3,
    title: 'Next Project',
    subtitle: 'In Development',
    description: "Something new is brewing. Always building — the next project is in the pipeline, pushing AI and full-stack development further into unexplored territory.",
    tech: ['React', 'AI/ML', 'Node.js', 'TBD'],
    highlights: [
      { icon: '🔬', text: 'Actively researching' },
      { icon: '⚙️', text: 'In early development' },
      { icon: '🚀', text: 'Launching soon' },
      { icon: '💡', text: 'Ideas in progress' },
    ],
    live:   null,
    github: 'https://github.com/nirmal192421215?tab=repositories',
    image:  null,
    accent: '#FF2D6B',
    badge:  'IN PROGRESS',
    status: null,
    comingSoon: true,
  },
];

/* ── Browser Frame mock ──────────────────────────────── */
const BrowserFrame = ({ accent, status, title, image }) => (
  <div className="browser-frame mx-6 mt-6 mb-0 overflow-hidden group relative bg-[#050510]">
    <div className="browser-bar relative z-20">
      <div className="browser-dot" style={{ background: '#FF5F57' }} />
      <div className="browser-dot" style={{ background: '#FFBD2E' }} />
      <div className="browser-dot" style={{ background: '#28CA41' }} />
      <div
        className="flex-1 mx-3 px-3 py-1 rounded-md text-xs font-mono truncate"
        style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' }}
      >
        {title.toLowerCase().replace(' ', '-')}.dev
      </div>
      {status && (
        <span className="live-badge">
          <span className="live-dot" />
          {status}
        </span>
      )}
    </div>
    
    {/* Page content: Premium full-space view */}
    <div className="relative aspect-video flex items-center justify-center overflow-hidden">
      {image ? (
        <>
          {/* Blurred background filling the whole space */}
          <motion.img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
          />
          
          {/* Main logo nicely contained and centered */}
          <motion.img
            src={image}
            alt={title}
            className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          />
        </>
      ) : (
        <div className="px-4 py-3 space-y-2 w-full h-full flex flex-col justify-center relative z-10">
          {[70, 50, 85, 40, 60].map((w, i) => (
            <div
              key={i}
              className="h-2 rounded-full shimmer"
              style={{
                width: `${w}%`,
                background: i === 0
                  ? `linear-gradient(90deg, ${accent}40, ${accent}20)`
                  : 'rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-30 pointer-events-none" />
    </div>
  </div>
);

/* ── Project card ────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(cy * -10);
    ry.set(cx * 10);
  };
  const onMouseLeave = () => { rx.set(0); ry.set(0); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      className={`relative glass-card rounded-3xl overflow-hidden flex flex-col ${project.comingSoon ? 'opacity-75' : ''}`}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: 800 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -8, scale: 1.01 }}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.accent}, rgba(124,58,237,0.6))` }} />

      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accent}12, transparent 65%)` }}
      />

      {/* Shimmer sweep on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ x: '-100%', skewX: '-15deg', opacity: 0.5 }}
          animate={{ x: '200%', opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            width: '50%',
          }}
        />
      )}

      {/* Browser frame mockup */}
      <BrowserFrame accent={project.accent} status={project.status} title={project.title} image={project.image} />

      {/* Card body */}
      <div className="p-7 flex flex-col flex-1">
        {/* Badge + title */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded mb-2 inline-block"
              style={{ background: `${project.accent}18`, color: project.accent }}
            >
              {project.badge}
            </span>
            <h3 className="font-display font-black text-white text-xl mt-1">{project.title}</h3>
            <p className="text-sm font-medium mt-0.5" style={{ color: project.accent }}>{project.subtitle}</p>
          </div>
        </div>

        {/* Description with hover reveal */}
        <div className="relative mb-5 overflow-hidden rounded-xl">
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
            {project.description}
          </p>
        </div>

        {/* Highlights 2×2 */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {project.highlights.map((h) => (
            <div
              key={h.text}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
              style={{
                background: `${project.accent}0c`,
                border: `1px solid ${project.accent}1e`,
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              <span>{h.icon}</span>
              <span>{h.text}</span>
            </div>
          ))}
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.45)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          {project.live ? (
            <motion.a
              href={project.live}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary flex-1 py-2.5 rounded-xl text-white text-sm font-semibold text-center flex items-center justify-center gap-2 relative z-10 overflow-hidden"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2"><ExternalIcon /> Live Demo</span>
            </motion.a>
          ) : (
            <div
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
            >
              🚧 Coming Soon
            </div>
          )}
          <motion.a
            href={project.github}
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost flex-1 py-2.5 rounded-xl text-white/70 text-sm font-semibold text-center flex items-center justify-center gap-2"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          >
            <GithubIcon /> GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Projects section ────────────────────────────────── */
const Projects = () => (
  <section id="projects" className="py-20 lg:py-32 relative">
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.04), transparent)' }} />

    <div className="section-container">
      <motion.div className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="font-mono text-sm" style={{ color: '#00F5FF' }}>03.</span>
        <span className="font-mono text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>Projects</span>
      </motion.div>

      <motion.h2
        className="font-display font-black text-white mb-3"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Things I've <span className="neon-text">Built</span>
      </motion.h2>
      <motion.p
        className="mb-14 max-w-lg"
        style={{ color: 'rgba(255,255,255,0.45)' }}
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Real-world applications powered by AI, real-time tech, and a love for clean UX.
      </motion.p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <a
          href="https://github.com/nirmal192421215?tab=repositories"
          target="_blank" rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2 px-8 py-3 rounded-full text-white/70 text-sm font-medium"
        >
          <GithubIcon /> See all on GitHub
        </a>
      </motion.div>
    </div>
  </section>
);

export default Projects;
