import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Envelope, Phone, LinkedinLogo, InstagramLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    // Title animation
    gsap.fromTo(titleRef.current?.children, 
      { 
        opacity: 0, 
        y: 50,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );

    // Contact info animation
    gsap.fromTo(contactInfoRef.current?.children, 
      { 
        opacity: 0, 
        y: 50,
        filter: 'blur(5px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const contactInfo = [
    { 
      icon: <Envelope size={24} />, 
      label: 'Email', 
      value: 'satapathyjjivan@gmail.com',
      href: 'mailto:satapathyjjivan@gmail.com'
    },
    { 
      icon: <Phone size={24} />, 
      label: 'Phone', 
      value: '+91 8260548799',
      href: 'tel:+918260548799'
    }
  ];

  const socialLinks = [
    { icon: <LinkedinLogo size={24} />, href: 'https://www.linkedin.com/in/jivan-satapathy/', label: 'LinkedIn' },
    { icon: <InstagramLogo size={24} />, href: 'https://www.instagram.com/jivan__satapathy/', label: 'Instagram' },
    { icon: <InstagramLogo size={24} />, href: '#', label: 'TikTok' },
    { icon: <LinkedinLogo size={24} />, href: '#', label: 'Facebook' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life or grow your business? Let's discuss your next web project or social media strategy
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8 mb-16">
            {contactInfo.map((contact, index) => (
              <a
                key={contact.label}
                href={contact.href}
                className="group block"
          >
                <div className="glass p-8 rounded-2xl hover:glow-blue transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 glass rounded-full group-hover:bg-neon-blue/20 transition-colors duration-300">
                      <div className="text-neon-blue group-hover:text-neon-blue">
                        {contact.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {contact.label}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-neon-blue transition-colors duration-300">
                        {contact.value}
                      </p>
              </div>
              </div>
            </div>
              </a>
            ))}
            </div>

          {/* Social Links */}
          <div className="text-center">
            <p className="text-muted-foreground mb-8">Or connect with me on</p>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-4 glass rounded-full hover:glow-blue transition-all duration-300 group hover:scale-110"
                  aria-label={social.label}
                >
                  <div className="text-muted-foreground group-hover:text-neon-blue transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-neon-blue animate-float" />
        <div className="absolute top-40 right-32 w-1 h-1 rounded-full bg-neon-purple animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 rounded-full bg-neon-cyan animate-float" />
        <div className="absolute bottom-20 right-20 w-2 h-2 rounded-full bg-neon-pink animate-float-delayed" />
        <div className="absolute top-1/2 left-10 w-1 h-1 rounded-full bg-neon-green animate-float" />
      </div>
    </section>
  );
};

export default Contact;