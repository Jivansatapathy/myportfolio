import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Rocket, 
  Lightning, 
  BracketsAngle,
  Database,
  Gear,
  Globe
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    // Image animation
    gsap.fromTo(imageRef.current, 
      { 
        opacity: 0, 
        x: -100, 
        rotateY: -15,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
        }
      }
    );

    // Content animation
    gsap.fromTo(contentRef.current?.children, 
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
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
        }
      }
    );

    // Skills animation
    gsap.fromTo(skillsRef.current?.children, 
      { 
        opacity: 0, 
        scale: 0.8,
        rotateY: 90
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          end: "bottom 20%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { icon: <BracketsAngle size={24} />, name: 'HTML5', color: 'text-orange-400' },
    { icon: <Palette size={24} />, name: 'CSS3', color: 'text-blue-400' },
    { icon: <Code size={24} />, name: 'JavaScript', color: 'text-yellow-400' },
    { icon: <Rocket size={24} />, name: 'React', color: 'text-cyan-400' },
    { icon: <Lightning size={24} />, name: 'GSAP', color: 'text-green-400' },
    { icon: <Database size={24} />, name: 'Node.js', color: 'text-emerald-400' },
    { icon: <Gear size={24} />, name: 'TypeScript', color: 'text-blue-600' },
    { icon: <Globe size={24} />, name: 'Next.js', color: 'text-white' },
    { icon: <Globe size={24} />, name: 'WordPress', color: 'text-blue-500' },
    { icon: <Globe size={24} />, name: 'Social Media Strategy', color: 'text-pink-400' },
    { icon: <Globe size={24} />, name: 'Content Marketing', color: 'text-purple-400' },
    { icon: <Globe size={24} />, name: 'Trend Analysis', color: 'text-indigo-400' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative max-w-md mx-auto">
              <div className="glass rounded-full p-4 glow-blue">
                <div className="w-80 h-80 rounded-full overflow-hidden relative">
                  <img 
                    src="/lovable-uploads/profile.jpg"
                    alt="Jivan - Web Developer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 rounded-full" />
                </div>
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-neon-cyan animate-float" />
              <div className="absolute -bottom-6 -left-6 w-6 h-6 rounded-full bg-neon-pink animate-float-delayed" />
              <div className="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-neon-green animate-float" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate web developer and social media expert with a love for creating immersive 
                digital experiences and driving business growth. My journey in tech started with curiosity 
                and has evolved into a mission to push the boundaries of what's possible both on the web 
                and across social media platforms.
              </p>
              <p>
                Specializing in modern frontend technologies and strategic social media marketing, I craft 
                responsive, performant websites and develop comprehensive social media strategies that not 
                only look great but deliver exceptional user experiences and measurable business results.
              </p>
              <p>
                As a social media expert, I help businesses leverage trending strategies, create engaging 
                content, and build meaningful connections with their audience across all major platforms. 
                When I'm not coding or strategizing, you'll find me exploring the latest web technologies, 
                analyzing social media trends, or sharing knowledge with the digital community.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Skills & Technologies</h3>
              <div 
                ref={skillsRef}
                className="grid grid-cols-4 gap-4"
              >
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="card-glass text-center p-4 hover:glow-blue group cursor-pointer"
                  >
                    <div className={`${skill.color} mb-2 flex justify-center transition-transform duration-300 group-hover:scale-110`}>
                      {skill.icon}
                    </div>
                    <div className="text-sm font-medium">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-neon-purple/10 to-transparent blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-neon-cyan/10 to-transparent blur-3xl animate-float-delayed" />
    </section>
  );
};

export default About;