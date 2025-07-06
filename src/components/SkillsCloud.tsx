import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'database' | 'social-media' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

const skills: Skill[] = [
  { name: 'React', category: 'frontend', level: 'advanced' },
  { name: 'TypeScript', category: 'frontend', level: 'intermediate' },
  { name: 'JavaScript', category: 'frontend', level: 'advanced' },
  { name: 'HTML5', category: 'frontend', level: 'expert' },
  { name: 'CSS3', category: 'frontend', level: 'advanced' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'advanced' },
  { name: 'Next.js', category: 'frontend', level: 'intermediate' },
  { name: 'Vue.js', category: 'frontend', level: 'intermediate' },
  { name: 'Sass', category: 'frontend', level: 'intermediate' },
  { name: 'GSAP', category: 'frontend', level: 'intermediate' },
  { name: 'Node.js', category: 'backend', level: 'intermediate' },
  { name: 'Express.js', category: 'backend', level: 'intermediate' },
  { name: 'Python', category: 'backend', level: 'beginner' },
  { name: 'PHP', category: 'backend', level: 'intermediate' },
  { name: 'REST APIs', category: 'backend', level: 'intermediate' },
  { name: 'MongoDB', category: 'database', level: 'intermediate' },
  { name: 'MySQL', category: 'database', level: 'intermediate' },
  { name: 'PostgreSQL', category: 'database', level: 'beginner' },
  { name: 'Git', category: 'tools', level: 'advanced' },
  { name: 'GitHub', category: 'tools', level: 'advanced' },
  { name: 'VS Code', category: 'tools', level: 'advanced' },
  { name: 'Figma', category: 'tools', level: 'intermediate' },
  { name: 'Adobe XD', category: 'tools', level: 'intermediate' },
  { name: 'Postman', category: 'tools', level: 'intermediate' },
  { name: 'Vite', category: 'tools', level: 'intermediate' },
  { name: 'Webpack', category: 'tools', level: 'intermediate' },
  { name: 'WordPress', category: 'tools', level: 'intermediate' },
  { name: 'Instagram Marketing', category: 'social-media', level: 'advanced' },
  { name: 'Facebook Ads', category: 'social-media', level: 'advanced' },
  { name: 'Meta Ads', category: 'social-media', level: 'advanced' },
  { name: 'LinkedIn Marketing', category: 'social-media', level: 'intermediate' },
  { name: 'Content Creation', category: 'social-media', level: 'advanced' },
  { name: 'Social Media Analytics', category: 'social-media', level: 'intermediate' },
  { name: 'Trend Analysis', category: 'social-media', level: 'advanced' },
  { name: 'Community Management', category: 'social-media', level: 'intermediate' },
  { name: 'Responsive Design', category: 'other', level: 'advanced' },
  { name: 'UI/UX Design', category: 'other', level: 'intermediate' },
  { name: 'Agile', category: 'other', level: 'intermediate' },
  { name: 'SEO', category: 'other', level: 'intermediate' },
  { name: 'Performance', category: 'other', level: 'intermediate' },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'frontend': return 'from-blue-400 to-cyan-400';
    case 'backend': return 'from-green-400 to-emerald-400';
    case 'database': return 'from-purple-400 to-pink-400';
    case 'tools': return 'from-orange-400 to-red-400';
    case 'social-media': return 'from-pink-400 to-purple-400';
    case 'other': return 'from-indigo-400 to-blue-400';
    default: return 'from-gray-400 to-gray-600';
  }
};

const getLevelSize = (level: string) => {
  switch (level) {
    case 'expert': return 'text-lg px-4 py-2';
    case 'advanced': return 'text-base px-3 py-1.5';
    case 'intermediate': return 'text-sm px-2.5 py-1';
    case 'beginner': return 'text-xs px-2 py-0.5';
    default: return 'text-sm px-2.5 py-1';
  }
};

const getRandomPosition = (w: number, h: number) => {
  // Padding to avoid edges
  const pad = 60;
  return {
    x: Math.random() * (w - pad * 2) + pad,
    y: Math.random() * (h - pad * 2) + pad,
  };
};

const SkillsCloud = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [area, setArea] = useState({ width: 0, height: 0 });
  const positions = useRef<{ x: number; y: number }[]>([]);

  // Set random positions for each skill within the section
  const setRandomPositions = () => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    positions.current = skills.map(() => getRandomPosition(rect.width, rect.height));
    setArea({ width: rect.width, height: rect.height });
  };

  useEffect(() => {
    setTimeout(setRandomPositions, 100); // Wait for layout
    window.addEventListener('resize', setRandomPositions);
    return () => window.removeEventListener('resize', setRandomPositions);
  }, []);

  // Animate skills to their random positions
  useEffect(() => {
    skillRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        x: positions.current[i]?.x || 0,
        y: positions.current[i]?.y || 0,
        rotation: Math.random() * 360,
      });
      // Floating animation
      gsap.to(el, {
        x: "+=" + ((Math.random() - 0.5) * 40),
        y: "+=" + ((Math.random() - 0.5) * 40),
        rotation: "+=" + ((Math.random() - 0.5) * 20),
        duration: 3 + Math.random() * 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 2,
      });
    });
  }, [area]);

  // Mouse play effect (within section)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      if (mouseX < 0 || mouseY < 0 || mouseX > rect.width || mouseY > rect.height) return;
      skillRefs.current.forEach((el, i) => {
        if (!el || hoveredSkill === skills[i].name) return;
        const elRect = el.getBoundingClientRect();
        const skillCenterX = elRect.left - rect.left + elRect.width / 2;
        const skillCenterY = elRect.top - rect.top + elRect.height / 2;
        const dx = mouseX - skillCenterX;
        const dy = mouseY - skillCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          // Push away from cursor
          const angle = Math.atan2(dy, dx);
          const force = (180 - dist) / 180;
          gsap.to(el, {
            x: "+=" + Math.cos(angle) * force * 18,
            y: "+=" + Math.sin(angle) * force * 18,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      });
    };
    const section = sectionRef.current;
    if (section) section.addEventListener('mousemove', handleMouseMove);
    return () => section && section.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredSkill]);

  const handleSkillHover = (skillName: string, isEntering: boolean) => {
    setHoveredSkill(isEntering ? skillName : null);
    const skillIndex = skills.findIndex(skill => skill.name === skillName);
    const skillEl = skillRefs.current[skillIndex];
    if (!skillEl) return;
    if (isEntering) {
      gsap.to(skillEl, {
        scale: 1.2,
        zIndex: 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(skillEl, {
        scale: 1,
        zIndex: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section id="skills" className="relative py-32 bg-gradient-to-b from-background to-background/80 overflow-hidden min-h-[600px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>
        <div
          ref={sectionRef}
          className="relative w-full h-[600px] max-w-6xl mx-auto rounded-3xl bg-background/60 shadow-xl overflow-visible"
        >
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={el => (skillRefs.current[index] = el)}
              className={`absolute cursor-pointer transition-all duration-300 pointer-events-auto
                ${getLevelSize(skill.level)}
                bg-gradient-to-r ${getCategoryColor(skill.category)}
                text-white font-medium rounded-full shadow-lg
                hover:shadow-2xl hover:shadow-current/50
                backdrop-blur-sm border border-white/20
                transform-gpu
              `}
              onMouseEnter={() => handleSkillHover(skill.name, true)}
              onMouseLeave={() => handleSkillHover(skill.name, false)}
              style={{
                zIndex: hoveredSkill === skill.name ? 10 : 1,
                userSelect: 'none',
              }}
            >
              {skill.name}
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
              <span className="text-muted-foreground">Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" />
              <span className="text-muted-foreground">Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
              <span className="text-muted-foreground">Database</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full" />
              <span className="text-muted-foreground">Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full" />
              <span className="text-muted-foreground">Other</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Size indicates proficiency level • Hover to interact
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsCloud; 