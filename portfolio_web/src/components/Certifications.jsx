import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const certs = [
  { 
    title: 'Java Basic',             
    issuer: 'HackerRank',   
    icon: '☕', 
    color: '#FF2D6B', 
    year: '2024',
    url: '/certs/java_basic.pdf' 
  },
  { 
    title: 'Python',                 
    issuer: 'Kaggle',       
    icon: '🐍', 
    color: '#3B82F6', 
    year: '2024',
    url: '/certs/python_kaggle.jpg'
  },
  { 
    title: 'AWS Fundamentals',       
    issuer: 'Intellipaat',  
    icon: '☁️', 
    color: '#F59E0B', 
    year: '2024',
    url: '/certs/aws_fundamentals.pdf'
  },
  { 
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco',        
    icon: '⚡', 
    color: '#00F5FF', 
    year: '2024',
    url: '/certs/js_essentials_1.pdf'
  },
  { 
    title: 'JavaScript Essentials 2',
    issuer: 'Cisco',        
    icon: '⚡', 
    color: '#7C3AED', 
    year: '2024',
    url: '/certs/js_essentials_2.pdf'
  },
];

const achievements = [
  {
    icon: '🏆',
    title: 'Hackathon Participant',
    description: 'Competed in 2+ major hackathons in 2026, building AI-powered solutions.',
    color: '#F59E0B',
  },
  {
    icon: '🤖',
    title: 'AI Application Builder',
    description: 'Shipped production-grade AI systems: MindMeter (wellness AI) and Krythion (focus AI).',
    color: '#00F5FF',
  },
  {
    icon: '🌐',
    title: 'Full Stack Engineer',
    description: 'End-to-end development from DB schema to polished, animated user interfaces.',
    color: '#7C3AED',
  },
];

/* ── 3D Cert Card ────────────────────────────────────────── */
const CertCard = ({ cert, index }) => {
  const cardRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(cy * -15);
    ry.set(cx * 15);
  };

  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`cert-card relative group ${cert.url ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={cert.url ? { scale: 1.05 } : {}}
      onClick={() => cert.url && window.open(cert.url, '_blank', 'noopener,noreferrer')}
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
        style={{ background: cert.color }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${cert.color}18`,
            border: `1px solid ${cert.color}40`,
            boxShadow: `0 0 20px ${cert.color}20`,
          }}
        >
          {cert.icon}
        </div>

        {/* Info */}
        <p className="font-semibold text-white text-sm mb-1 group-hover:text-white transition-colors">
          {cert.title}
        </p>
        <p className="font-mono text-[10px] mb-4 tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {cert.issuer.toUpperCase()} · {cert.year}
        </p>

        {/* Verified badge */}
        <div
          className="inline-flex items-center gap-1.5 font-mono text-[9px] px-3 py-1 rounded-full uppercase tracking-widest transition-all duration-300"
          style={{ 
            background: cert.url ? `${cert.color}20` : 'rgba(255,255,255,0.05)', 
            color: cert.url ? cert.color : 'rgba(255,255,255,0.2)', 
            border: `1px solid ${cert.url ? `${cert.color}40` : 'rgba(255,255,255,0.1)'}`,
            boxShadow: cert.url ? `0 0 10px ${cert.color}20` : 'none'
          }}
        >
          {cert.url ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cert.color }} />
              Verified Credential
            </>
          ) : (
            'Pending Review'
          )}
        </div>
      </div>
    </motion.div>
  );
};

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute right-[-10%] top-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00F5FF, transparent)' }} />
      <div className="absolute left-[-10%] bottom-1/4 w-[400px] h-[400px] rounded-full opacity-[0.02] blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF2D6B, transparent)' }} />

      <div className="section-container">
        {/* Label */}
        <motion.div className="flex items-center gap-3 mb-4"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span className="font-mono text-sm" style={{ color: '#00F5FF' }}>04.</span>
          <span className="font-mono text-sm uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>Certifications</span>
        </motion.div>

        <motion.h2
          className="font-display font-black text-white mb-3"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Academic &amp; <span className="neon-text">Technical Credentials</span>
        </motion.h2>
        <motion.p className="mb-16 max-w-md" style={{ color: 'rgba(255,255,255,0.45)' }}
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          A collection of verified skills and accomplishments earned through dedicated learning and project building.
        </motion.p>

        {/* ── Cert Ribbon ── */}
        <div className="cert-ribbon-container mb-24">
          <div className="cert-ribbon pb-8">
            {certs.map((cert, i) => (
              <CertCard key={cert.title} cert={cert} index={i} />
            ))}
          </div>
        </div>

        {/* ── Achievements grid ── */}
        <motion.div 
          className="flex items-center gap-4 mb-10"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Key Milestones
          </p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              className="glass-card group relative overflow-hidden rounded-2xl p-8"
              variants={fadeUp} custom={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${a.color}, transparent)` }}
              />
              
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform duration-500 group-hover:rotate-[10deg]"
                style={{
                  background: `${a.color}12`,
                  border: `1px solid ${a.color}30`,
                  boxShadow: `0 0 30px ${a.color}15`,
                }}
              >
                {a.icon}
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-3">{a.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{a.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
