import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    // Title animation
    gsap.fromTo(titleRef.current?.children, 
      { 
        opacity: 0, 
        y: 50,
        filter: 'blur(10px)',
        willChange: 'transform, opacity',
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
        force3D: true,
        willChange: 'transform, opacity',
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );

    // Projects animation with 3D effect
    gsap.fromTo(projectsRef.current?.children, 
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotationY: 15,
        rotationX: 10,
        willChange: 'transform, opacity',
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.7)",
        force3D: true,
        willChange: 'transform, opacity',
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        }
      }
    );

    // Floating particles animation
    gsap.to('.floating-particle', {
      y: -20,
      x: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5,
      force3D: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "Stories Per Pixel",
      description: "Photography and videography ad agency specializing in cinematic storytelling",
      image: "/lovable-uploads/Storiesperpixel.png",
      tech: ["React", "GSAP", "Three.js", "Framer Motion"],
      live: "https://codexior.com/storiesperpixel/",
      category: "Creative Agency",
      status: "Live"
    },
    {
      title: "Venus Global Tech",
      description: "IT industry solutions provider with comprehensive technology services",
      image: "/lovable-uploads/Venusglobaltech.png",
      tech: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
      live: "https://www.venusglobaltech.com/",
      category: "IT Services",
      status: "Live"
    },
    {
      title: "Dahibara Express – A Food Chain Startup",
      description: "Food delivery platform with ordering system and real-time tracking",
      image: "/lovable-uploads/69d1645d-8e2f-4f73-a587-bf9e9a172c3f.png",
      tech: ["React", "Express", "PostgreSQL", "WebRTC"],
      live: "https://dahibaraexpress.com/",
      category: "E-commerce",
      status: "Live"
    },
    {
      title: "Venus Hiring",
      description: "Recruitment agency in Canada specializing in talent acquisition and placement",
      image: "/lovable-uploads/Venushiring.png",
      tech: ["React", "Express", "PostgreSQL", "Stripe"],
      live: "https://www.venushiring.com/",
      category: "Recruitment",
      status: "Live"
    },
    {
      title: "Examys - Education Platform",
      description: "Educational platform with interactive courses and progress tracking",
      image: "/lovable-uploads/acf840ca-62a6-4e66-8a85-89cc758651c4.png",
      tech: ["Vue.js", "Laravel", "MySQL", "Socket.io"],
      live: "https://www.examys.com/",
      category: "Education",
      status: "Live"
    },
    {
      title: "Music Platform",
      description: "Streaming platform for independent artists with social features",
      image: "/lovable-uploads/59aba599-4433-422d-81f3-8db04a48b3fe.png",
      tech: ["Angular", "Node.js", "MongoDB", "WebSocket"],
      live: "https://8ray.group/",
      category: "Entertainment",
      status: "Live"
    },
    {
      title: "Portfolio Website",
      description: "Creative filmmaker portfolio with stunning animations and 3D elements",
      image: "/lovable-uploads/8e979101-3f07-4f74-be03-c7047daaca2c.png",
      tech: ["React", "GSAP", "Three.js"],
      live: "https://hetansaworks.com/",
      category: "Creative",
      status: "Live"
    },
    {
      title: "Arka Dental Care",
      description: "Premium dental care brand offering comprehensive oral health solutions",
      image: "/lovable-uploads/arkadental.png",
      tech: ["WordPress", "PHP", "MySQL", "WooCommerce"],
      live: "https://arkadentalcare.com/",
      category: "Healthcare",
      status: "Live"
    },
    {
      title: "Code Lemon Tech",
      description: "IT industry leader providing innovative technology solutions and digital transformation",
      image: "/lovable-uploads/codelemontech.png",
      tech: ["React", "Node.js", "MongoDB", "AWS"],
      live: "https://codelemontech.com/",
      category: "IT Solutions",
      status: "Live"
    },
    {
      title: "Oddeka Inksters",
      description: "Professional tattoo shop with modern booking system and portfolio showcase",
      image: "/lovable-uploads/oddeka.png",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      live: "https://odekka-inksters.vercel.app/",
      category: "Creative Services",
      status: "Prototype"
    },
    {
      title: "Strivox - Recruitment Platform",
      description: "Made using WordPress",
      image: "/lovable-uploads/2647a65b-38bf-4ba2-8020-d3f0263c3986.png",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      live: "http://thestrivox.com/",
      category: "Full Stack",
      status: "Live"
    },
    {
      title: "Bsquare Global - Online HR Platform",
      description: "Made with WordPress",
      image: "/lovable-uploads/c9c58811-3233-4a6b-baca-f81418240048.png",
      tech: ["Next.js", "TypeScript", "D3.js", "OpenAI"],
      live: "https://bsquareglobalfze.com/",
      category: "AI/ML",
      status: "Live"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring cutting-edge web technologies and strategic social media campaigns that drive business growth
          </p>
        </div>

        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative cursor-pointer perspective-1000 will-change-transform"
            >
              {/* 3D Card Container */}
              <div className="relative transform-gpu transition-all duration-700 group-hover:rotate-y-12 group-hover:rotate-x-6 group-hover:scale-105 will-change-transform">
                {/* Main Card */}
                <div className="glass rounded-2xl p-6 overflow-hidden relative">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-neon-purple/5 to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-xl mb-6 group-hover:scale-105 transition-transform duration-500 will-change-transform">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover will-change-transform"
                      loading="lazy"
                    />
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium bg-neon-green/20 text-neon-green rounded-full border border-neon-green/30">
                        {project.status}
                      </span>
                    </div>
                    {/* Floating Action Button (Live) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <a 
                        href={project.live}
                        className="px-4 py-2 glass rounded-full hover:glow-blue transition-all duration-300 transform hover:scale-110 flex items-center gap-2 text-white font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe size={20} />
                        <span>Live Link</span>
                      </a>
                    </div>
                  </div>
                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-2 gradient-text">{project.title}</h3>
                  <p className="text-base text-muted-foreground mb-4">{project.description}</p>
                  

                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs rounded bg-background/60 border border-white/10 text-foreground/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="floating-particle absolute top-1/4 left-1/4 w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
        <div className="floating-particle absolute top-1/3 right-1/4 w-1 h-1 bg-neon-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="floating-particle absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="floating-particle absolute bottom-1/4 right-1/3 w-1 h-1 bg-neon-pink rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Large Background Blobs */}
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-neon-blue/10 to-transparent blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-neon-purple/10 to-transparent blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-r from-neon-cyan/5 to-transparent blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
    </section>
  );
};

export default Projects;