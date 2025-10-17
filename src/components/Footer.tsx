import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    
    gsap.fromTo(footer?.children, 
      { 
        opacity: 0, 
        y: 60,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
        }
      }
    );

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.8
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', enabled: true },
    { label: 'About', href: '#about', enabled: true },
    { label: 'Projects', href: '#projects', enabled: true },
    { label: 'Experience', href: '#career', enabled: true },
    { label: 'Testimonials', href: '#testimonials', enabled: true },
    { label: 'Contact', href: '#contact', enabled: true }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 border-t border-border/30 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="text-3xl font-bold gradient-text">
            Jivan
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-neon-blue transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>© 2024 Jivan. Crafted with</span>
            <Heart size={16} className="text-neon-pink animate-pulse" />
            <span>and lots of coffee</span>
          </div>
          
          {/* Version */}
          <div className="text-xs text-muted-foreground/60">
            v2.0.24 • Powered by React & GSAP
          </div>
        </div>
      </div>

      {/* Background Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="footer-particle absolute top-8 left-1/4 w-1 h-1 rounded-full bg-neon-blue/60" />
        <div className="footer-particle absolute top-12 right-1/3 w-1.5 h-1.5 rounded-full bg-neon-purple/60" />
        <div className="footer-particle absolute bottom-8 left-1/3 w-1 h-1 rounded-full bg-neon-cyan/60" />
        <div className="footer-particle absolute bottom-12 right-1/4 w-2 h-2 rounded-full bg-neon-pink/60" />
        <div className="footer-particle absolute top-1/2 left-1/6 w-1 h-1 rounded-full bg-neon-green/60" />
        <div className="footer-particle absolute top-1/2 right-1/6 w-1.5 h-1.5 rounded-full bg-neon-blue/60" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </footer>
  );
};

export default Footer;