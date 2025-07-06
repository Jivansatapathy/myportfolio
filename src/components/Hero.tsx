import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'phosphor-react';
import SplineCharacter from './SplineCharacter';

gsap.registerPlugin(ScrollTrigger);

const typewriterPhrases = [
  'Web Developer',
  'Social Media Expert',
];

const TYPING_SPEED = 80; // ms per character
const DELETING_SPEED = 40; // ms per character
const PAUSE_AFTER_TYPING = 1200; // ms
const PAUSE_AFTER_DELETING = 400; // ms

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Typewriter animation state
  const [typeIndex, setTypeIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = typewriterPhrases[typeIndex];

    if (!isDeleting && displayed.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentPhrase.slice(0, displayed.length + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting && displayed.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentPhrase.slice(0, displayed.length - 1));
      }, DELETING_SPEED);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTypeIndex((prev) => (prev + 1) % typewriterPhrases.length);
      }, PAUSE_AFTER_DELETING);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, typeIndex]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    gsap.set([headlineRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");
    gsap.to('.floating-orb', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });
    gsap.to(ctaRef.current, {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline Character as background, full hero */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SplineCharacter />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 w-full h-full bg-black/50 z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 
            ref={headlineRef}
            className="text-6xl md:text-8xl font-bold leading-tight"
          >
            Hi, I'm{' '}
            <span className="gradient-text">Jivan</span>
            <br />
            <span className="text-4xl md:text-6xl text-muted-foreground min-h-[2.5em] inline-block">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Crafting immersive digital experiences and driving business growth through 
            cutting-edge web development and strategic social media marketing
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              ref={ctaRef}
              className="btn-neon inline-flex items-center space-x-2 text-lg group"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Hire Me</span>
              <ArrowRight 
                size={20} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </button>
            
            <button 
              className="btn-secondary inline-flex items-center space-x-2 text-lg group"
              onClick={() => window.open('https://drive.google.com/file/d/1nF1zwgveBmrE9dmidO1x1hPJwh2fxd-O/view?usp=sharing', '_blank')}
            >
              <span>Resume</span>
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-neon-blue/30 to-transparent blur-3xl" />
        <div className="floating-orb absolute bottom-32 right-32 w-40 h-40 rounded-full bg-gradient-to-r from-neon-purple/30 to-transparent blur-3xl" />
        <div className="floating-orb absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-neon-cyan/30 to-transparent blur-2xl" />
        <div className="floating-orb absolute bottom-1/4 left-3/4 w-36 h-36 rounded-full bg-gradient-to-r from-neon-pink/30 to-transparent blur-3xl" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-neon-blue to-transparent rounded-full" />
      </div>
    </section>
  );
};

export default Hero;