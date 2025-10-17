import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Code } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef([]);

  const careerData = [
    {
      id: 1,
      icon: <GraduationCap size={32} />,
      title: "Government College of Engineering Kalahandi",
      role: "CSE Graduate",
      period: "2020 - 2024",
      details: "CGPA: 8.12",
      description: "Completed Bachelor's degree in Computer Science and Engineering with excellent academic performance.",
      type: "education"
    },
    {
      id: 2,
      icon: <Briefcase size={32} />,
      title: "Hirekarma",
      role: "Frontend Developer",
      period: "Dec 2024 - Mar 2025",
      details: "3 months",
      description: "Developed responsive web applications using modern frontend technologies and frameworks.",
      type: "experience"
    },
    {
      id: 3,
      icon: <Code size={32} />,
      title: "Shranya Infoe Service",
      role: "Software Developer",
      period: "Mar 2025 - Present",
      details: "Current",
      description: "Working on full-stack development projects, implementing innovative solutions and maintaining high code quality.",
      type: "experience"
    },
    {
      id: 4,
      icon: <Briefcase size={32} />,
      title: "Freelance Social Media Expert",
      role: "Social Media Strategist",
      period: "2023 - Present",
      details: "Ongoing",
      description: "Helping businesses grow through strategic social media marketing, content creation, and trend analysis across multiple platforms.",
      type: "experience"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const pointer = pointerRef.current;

    // Title animation
    gsap.fromTo(titleRef.current?.children, 
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" }
      }
    );

    // Timeline line animation
    const timelineLine = timeline?.querySelector('.timeline-line');
    if (timelineLine) {
      gsap.fromTo(timelineLine, { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: timeline, start: "top 80%" }
        }
      );
    }

    // Timeline dots animation
    const timelineDots = timeline?.querySelectorAll('.timeline-dot');
    if (timelineDots) {
      gsap.fromTo(timelineDots, { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.4, ease: "back.out(1.7)",
          scrollTrigger: { trigger: timeline, start: "top 80%" }
        }
      );
    }

    // Set initial pointer position
    if (pointer) {
      gsap.set(pointer, { y: 0 });
    }

    // Move pointer with scroll
    if (pointer && timeline) {
      const timelineHeight = timeline.offsetHeight;
      gsap.to(pointer, {
        y: timelineHeight - 24, // 24 = pointer height/2 for centering
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      });

      // Reveal cards only when pointer reaches each stop (dot)
      careerData.forEach((item, idx) => {
        const card = timeline.querySelector(`[data-career-id='${item.id}']`);
        const dot = dotRefs.current[idx];
        if (card && dot) {
          gsap.fromTo(card,
            { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: dot,
                start: "center center",
                end: "center center",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }

    return () => { ScrollTrigger.getAll().forEach(trigger => trigger.kill()); };
  }, []);

  return (
    <section ref={sectionRef} id="career" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">My <span className="gradient-text">Journey</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From education to professional experience in web development and social media marketing, here's my career progression
          </p>
        </div>
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line">
            <div className="w-full h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-cyan rounded-full" />
            {/* Scrolling Pointer */}
            <div ref={pointerRef} className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-pink rounded-full shadow-lg glow-pink z-20"
              style={{ boxShadow: '0 0 20px hsl(var(--neon-pink) / 0.8)' }} />
          </div>
          {/* Timeline Items */}
          <div className="space-y-16">
            {careerData.map((item, index) => (
              <div key={item.id} data-career-id={item.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div ref={el => dotRefs.current[index] = el} className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="timeline-dot w-6 h-6 bg-background border-4 border-neon-blue rounded-full shadow-lg glow-blue" />
                </div>
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div className="glass p-8 rounded-2xl hover:glow-blue transition-all duration-300 group hover:scale-105">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 glass rounded-full ${item.type === 'education' ? 'bg-neon-cyan/20' : 'bg-neon-purple/20'} group-hover:scale-110 transition-transform duration-300`}>
                        <div className={`${item.type === 'education' ? 'text-neon-cyan' : 'text-neon-purple'}`}>{item.icon}</div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                          <p className="text-neon-blue font-semibold">{item.role}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="px-3 py-1 glass rounded-full">{item.period}</span>
                          <span className="px-3 py-1 glass rounded-full">{item.details}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Background Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-neon-blue/20 to-transparent blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-neon-purple/20 to-transparent blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-neon-cyan/20 to-transparent blur-2xl animate-float" />
      </div>
    </section>
  );
};

export default Career; 