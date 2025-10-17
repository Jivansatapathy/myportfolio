import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Globe, 
  DeviceMobile, 
  Rocket, 
  TrendUp,
  Users,
  ChartBar,
  Megaphone
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

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

    // Services animation
    gsap.fromTo(servicesRef.current?.children, 
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
          trigger: servicesRef.current,
          start: "top 80%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: <Code size={32} />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
      features: ["Responsive Design", "Modern Frameworks", "Performance Optimization", "SEO Integration"],
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Globe size={32} />,
      title: "E-commerce Solutions",
      description: "Complete online store development with payment integration, inventory management, and customer analytics.",
      features: ["Payment Gateways", "Inventory Management", "Order Processing", "Customer Analytics"],
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <DeviceMobile size={32} />,
      title: "Mobile-First Design",
      description: "Websites optimized for mobile devices with touch-friendly interfaces and fast loading times.",
      features: ["Mobile Optimization", "Touch Interfaces", "Fast Loading", "Cross-Platform"],
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <TrendUp size={32} />,
      title: "Social Media Strategy",
      description: "Comprehensive social media marketing strategies to increase brand awareness and drive business growth.",
      features: ["Platform Strategy", "Content Planning", "Audience Analysis", "Growth Tactics"],
      color: "from-pink-400 to-purple-400"
    },
    {
      icon: <Megaphone size={32} />,
      title: "Content Creation",
      description: "Engaging content creation for all social media platforms including videos, graphics, and copywriting.",
      features: ["Video Content", "Graphic Design", "Copywriting", "Trend Integration"],
      color: "from-orange-400 to-red-400"
    },
    {
      icon: <ChartBar size={32} />,
      title: "Analytics & Reporting",
      description: "Data-driven insights and performance tracking to optimize your digital marketing efforts.",
      features: ["Performance Tracking", "ROI Analysis", "A/B Testing", "Monthly Reports"],
      color: "from-indigo-400 to-blue-400"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">
            My <span className="gradient-text">Services</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive web development and social media marketing solutions to help your business thrive online
          </p>
        </div>

        <div 
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative cursor-pointer perspective-1000"
            >
              <div className="relative transform-gpu transition-all duration-700 group-hover:rotate-y-6 group-hover:scale-105">
                <div className="glass rounded-2xl p-8 h-full hover:glow-blue transition-all duration-300">
                  {/* Service Icon */}
                  <div className="mb-6">
                    <div className={`p-4 glass rounded-full bg-gradient-to-r ${service.color} w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-neon-blue" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-neon-purple/5 to-neon-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          ))}
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

export default Services; 