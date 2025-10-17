import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  InstagramLogo, 
  FacebookLogo, 
  LinkedinLogo, 
  YoutubeLogo,
  TrendUp,
  Users,
  ChartLineUp,
  Target
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const SocialMediaProjects = () => {
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

    // Projects animation
    gsap.fromTo(projectsRef.current?.children, 
      { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotationY: 15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const socialMediaProjects = [
    {
      platform: "Multi-Platform",
      icon: <InstagramLogo size={32} />,
      title: "Stories Per Pixel - VFX Services",
      description: "3-month multi-platform social media strategy for VFX services company",
      duration: "3 months",
      results: {
        followers: "+150%",
        sales: "+30%",
        platforms: "3",
        engagement: "High"
      },
      strategy: ["Instagram Marketing", "Facebook Marketing", "LinkedIn Marketing", "Content Strategy"],
      color: "from-pink-400 to-purple-400"
    },
    {
      platform: "Multi-Platform",
      icon: <FacebookLogo size={32} />,
      title: "Hyderabad Travel Diaries - Tourism",
      description: "6-month comprehensive social media strategy for travel and tourism business",
      duration: "6 months",
      results: {
        followers: "+250%",
        sales: "+50%",
        platforms: "3",
        engagement: "High"
      },
      strategy: ["Instagram Marketing", "Facebook Marketing", "LinkedIn Marketing", "Travel Content"],
      color: "from-blue-600 to-blue-800"
    },
    {
      platform: "Instagram",
      icon: <InstagramLogo size={32} />,
      title: "The Social Pot - Food & Beverages",
      description: "6-month Instagram-focused social media strategy for food and beverages business",
      duration: "6 months",
      results: {
        followers: "+180%",
        sales: "+60%",
        platform: "Instagram",
        engagement: "High"
      },
      strategy: ["Instagram Marketing", "Food Content", "Community Building", "Brand Awareness"],
      color: "from-orange-400 to-red-400"
    },
    {
      platform: "Multi-Platform",
      icon: <TrendUp size={32} />,
      title: "Fitness App Launch Campaign",
      description: "Cross-platform launch strategy across Instagram, Facebook, and YouTube",
      duration: "2 months",
      results: {
        users: "10K+",
        views: "2M+",
        retention: "85%",
        downloads: "15K+"
      },
      strategy: ["Multi-Platform Strategy", "Meta Ads", "User Acquisition", "Community Building"],
      color: "from-green-400 to-emerald-400"
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram": return <InstagramLogo size={24} />;
      case "Meta Ads": return <FacebookLogo size={24} />;
      case "LinkedIn": return <LinkedinLogo size={24} />;
      case "Multi-Platform": return <TrendUp size={24} />;
      default: return <Users size={24} />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="social-media-projects" 
      className="py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">
            Social Media <span className="gradient-text">Success Stories</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from strategic social media campaigns that drove business growth and engagement
          </p>
        </div>

        <div 
          ref={projectsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {socialMediaProjects.map((project, index) => (
            <div
              key={project.title}
              className="group relative cursor-pointer perspective-1000"
            >
              <div className="relative transform-gpu transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-105">
                <div className="glass rounded-2xl p-8 h-full hover:glow-blue transition-all duration-300">
                  {/* Platform Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 glass rounded-full bg-gradient-to-r ${project.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {project.icon}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">{project.platform}</span>
                      <div className="text-xs text-neon-blue">{project.duration}</div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-neon-green flex items-center gap-2">
                        <ChartLineUp size={20} />
                        Campaign Results
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(project.results).map(([key, value]) => (
                          <div key={key} className="text-center p-3 glass rounded-lg">
                            <div className="text-2xl font-bold text-neon-green mb-1">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strategy Section */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Target size={20} />
                        Strategy Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.strategy.map((strategy, strategyIndex) => (
                          <span 
                            key={strategyIndex}
                            className="px-3 py-1 text-xs font-medium glass rounded-full border border-neon-blue/30 text-neon-blue"
                          >
                            {strategy}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-neon-purple/5 to-neon-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Grow Your Social Media Presence?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's create a custom social media strategy that drives real results for your business
            </p>
            <button 
              className="btn-neon inline-flex items-center space-x-2 text-lg group"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Start Your Campaign</span>
              <TrendUp size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-neon-purple/10 to-transparent blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-neon-cyan/10 to-transparent blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-neon-pink/10 to-transparent blur-2xl animate-float" />
      </div>
    </section>
  );
};

export default SocialMediaProjects; 