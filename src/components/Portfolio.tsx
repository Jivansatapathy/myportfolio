import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocomotiveScroll } from '../hooks/useLocomotiveScroll';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Career from './Career';
import Services from './Services';
import SocialMediaProjects from './SocialMediaProjects';
import SocialMediaCampaigns from './SocialMediaCampaigns';
import Testimonials from './Testimonials';
import SkillsCloud from './SkillsCloud';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import { WhatsappLogo, LinkedinLogo, InstagramLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollRef = useLocomotiveScroll();

  useEffect(() => {
    // Disable scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Animate main content in
    gsap.fromTo(mainRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );
  };

  if (isLoading) {
    return <Preloader onComplete={handleLoadingComplete} />;
  }

  return (
    <div ref={scrollRef} data-scroll-container>
      <CustomCursor />
      <div ref={mainRef} className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Career />
          <Services />
          <SocialMediaCampaigns />
          <SkillsCloud />
          <Projects />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
      {/* Floating Social Buttons */}
      <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a
          href="https://wa.me/918260548799"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="p-4 glass rounded-full shadow-lg hover:glow-green transition-all duration-300 flex items-center justify-center group animate-float-social"
        >
          <WhatsappLogo size={28} className="text-neon-green group-hover:text-white transition-colors" />
        </a>
        <a
          href="https://www.linkedin.com/in/jivan-satapathy/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="p-4 glass rounded-full shadow-lg hover:glow-blue transition-all duration-300 flex items-center justify-center group animate-float-social"
        >
          <LinkedinLogo size={28} className="text-neon-blue group-hover:text-white transition-colors" />
        </a>
        <a
          href="https://www.instagram.com/jivan__satapathy/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          title="Instagram"
          className="p-4 glass rounded-full shadow-lg hover:glow-pink transition-all duration-300 flex items-center justify-center group animate-float-social"
        >
          <InstagramLogo size={28} className="text-neon-pink group-hover:text-white transition-colors" />
        </a>
      </div>
    </div>
  );
};

export default Portfolio;