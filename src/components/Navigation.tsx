import { useState, useEffect } from 'react';
import { List, X } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu', 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

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
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass' : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">
              Jivan
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.enabled ? (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground hover:text-neon-blue transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 group-hover:w-full" />
                  </button>
                ) : (
                  <span
                    key={item.label}
                    className="text-muted-foreground/60 cursor-not-allowed relative group px-2"
                    title="Not Added"
                  >
                    {item.label}
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs bg-background/90 px-2 py-1 rounded shadow border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Not Added
                    </span>
                  </span>
                )
              ))}
              <button className="btn-neon">
                Hire Me
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground hover:text-neon-blue transition-colors"
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu fixed inset-0 z-50 md:hidden">
          <div className="glass min-h-screen flex flex-col items-center justify-center space-y-8">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-foreground hover:text-neon-blue transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-3xl font-bold gradient-text mb-8">
              Jivan
            </div>
            
            {navItems.map((item, index) => (
              item.enabled ? (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-2xl text-foreground hover:text-neon-blue transition-colors duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  key={item.label}
                  className="text-2xl text-muted-foreground/60 cursor-not-allowed relative group px-2"
                  title="Not Added"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs bg-background/90 px-2 py-1 rounded shadow border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Not Added
                  </span>
                </span>
              )
            ))}
            
            <button className="btn-neon mt-8">
              Hire Me
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;