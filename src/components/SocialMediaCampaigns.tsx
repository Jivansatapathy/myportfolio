import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  InstagramLogo, 
  FacebookLogo, 
  LinkedinLogo, 
  TrendUp,
  ChartLineUp,
  Target,
  Users,
  Globe
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const SocialMediaCampaigns = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const campaignsRef = useRef<HTMLDivElement>(null);

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

    // Campaigns animation
    gsap.fromTo(campaignsRef.current?.children, 
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
          trigger: campaignsRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const campaigns = [
    {
      client: "Stories Per Pixel",
      businessType: "VFX Services",
      platforms: ["Instagram", "Facebook", "LinkedIn"],
      duration: "3 months",
      results: {
        followers: "+150%",
        sales: "+30%",
        reach: "Multi-platform",
        engagement: "High"
      },
      description: "Comprehensive multi-platform social media strategy for VFX services company",
      strategy: ["Content Strategy", "Community Building", "Brand Awareness", "Lead Generation"],
      instagramHandle: "@storiesper_pixel",
      instagramLink: "https://www.instagram.com/storiesper_pixel/",
      color: "from-purple-400 to-pink-400",
      icon: <Globe size={32} />
    },
    {
      client: "Hyderabad Travel Diaries",
      businessType: "Travel & Tourism",
      platforms: ["Instagram", "Facebook", "LinkedIn"],
      duration: "6 months",
      results: {
        followers: "+250%",
        sales: "+50%",
        reach: "Multi-platform",
        engagement: "High"
      },
      description: "Comprehensive social media strategy for travel and tourism business",
      strategy: ["Travel Content", "Destination Marketing", "Community Engagement", "Booking Conversion"],
      instagramHandle: "@hyderabad_traveldiaries",
      instagramLink: "https://www.instagram.com/hyderabad_traveldiaries/",
      color: "from-blue-400 to-cyan-400",
      icon: <Globe size={32} />
    },
    {
      client: "The Social Pot",
      businessType: "Food & Beverages",
      platforms: ["Instagram"],
      duration: "6 months",
      results: {
        followers: "+180%",
        sales: "+60%",
        reach: "Instagram-focused",
        engagement: "High"
      },
      description: "Instagram-focused social media strategy for food and beverages business",
      strategy: ["Food Content", "Community Building", "Brand Awareness", "Customer Engagement"],
      instagramHandle: "@thesocialpot",
      instagramLink: "http://instagram.com/thesocialpot/",
      color: "from-orange-400 to-red-400",
      icon: <InstagramLogo size={32} />
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram": return <InstagramLogo size={20} />;
      case "Facebook": return <FacebookLogo size={20} />;
      case "LinkedIn": return <LinkedinLogo size={20} />;
      default: return <Globe size={20} />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="social-media-campaigns" 
      className="py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">
            Social Media <span className="gradient-text">Campaigns</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real social media marketing campaigns that delivered measurable results for businesses
          </p>
        </div>

        <div 
          ref={campaignsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {campaigns.map((campaign, index) => (
            <div
              key={campaign.client}
              className="group relative cursor-pointer perspective-1000"
            >
              <div className="relative transform-gpu transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-105">
                <div className="glass rounded-2xl p-8 h-full hover:glow-blue transition-all duration-300">
                  {/* Campaign Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 glass rounded-full bg-gradient-to-r ${campaign.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {campaign.icon}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">{campaign.duration}</span>
                      <div className="text-xs text-neon-blue">{campaign.businessType}</div>
                    </div>
                  </div>

                  {/* Campaign Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {campaign.client}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {campaign.description}
                      </p>
                      
                      {/* Instagram Handle */}
                      <a 
                        href={campaign.instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-cyan transition-colors duration-300"
                      >
                        <InstagramLogo size={16} />
                        <span className="text-sm font-medium">{campaign.instagramHandle}</span>
                      </a>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-neon-green flex items-center gap-2">
                        <ChartLineUp size={20} />
                        Campaign Results
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(campaign.results).map(([key, value]) => (
                          <div key={key} className="text-center p-3 glass rounded-lg">
                            <div className="text-lg font-bold text-neon-green mb-1">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Platforms Used */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Users size={20} />
                        Platforms Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {campaign.platforms.map((platform, platformIndex) => (
                          <span 
                            key={platformIndex}
                            className="px-3 py-1 text-xs font-medium glass rounded-full border border-neon-blue/30 text-neon-blue flex items-center gap-1"
                          >
                            {getPlatformIcon(platform)}
                            {platform}
                          </span>
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
                        {campaign.strategy.map((strategy, strategyIndex) => (
                          <span 
                            key={strategyIndex}
                            className="px-2 py-1 text-xs font-medium glass rounded-full border border-neon-purple/30 text-neon-purple"
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
              Ready to Grow Your Business on Social Media?
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

export default SocialMediaCampaigns; 