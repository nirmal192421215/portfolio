import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ScrollProgress, BackToTop } from './components/ScrollUtils';

import Background from './components/Background';
import CustomCursor from './components/CustomCursor';


function App() {
  const [loaded, setLoaded] = useState(false);

  // Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && (
        <div className="min-h-screen relative">
          <CustomCursor />
          <Background />
          <div className="bg-grid" />
          <div className="bg-grain" />
          

          <ScrollProgress />
          <BackToTop />
          <Navbar />
          {/* Phase 6: flowing top glow */}
          <div className="page-top-glow" />
          <main className="relative z-10">
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <Certifications />
            <div className="section-divider" />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
