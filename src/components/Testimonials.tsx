import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    quote: "Jivan's 3-month social media campaign for Stories Per Pixel was a game-changer! Our followers grew by 150% and sales increased by 30% across Instagram, Facebook, and LinkedIn. His creative content and multi-platform strategy brought us new clients and industry recognition.",
    name: "Stories Per Pixel",
    role: "VFX Services Company"
  },
  {
    quote: "Jivan's 6-month campaign for Hyderabad Travel Diaries was phenomenal! We saw a 250% increase in followers and a 50% boost in sales. His travel content and destination marketing brought us incredible exposure and bookings. Highly recommend!",
    name: "Hyderabad Travel Diaries",
    role: "Travel & Tourism Business"
  },
  {
    quote: "The Social Pot's Instagram presence exploded thanks to Jivan! In 6 months, our followers grew by 180% and sales by 60%. His food content and community engagement strategy brought us loyal customers and a vibrant online community.",
    name: "The Social Pot",
    role: "Food & Beverages Business"
  },
  {
    quote: "Jivan designed a visually stunning portfolio site for me and was always available for updates. He stayed within my budget and was patient with every tweak. I’m really happy with the outcome and would definitely work with him again!",
    name: "Hetansa Rajkotia",
    role: "Owner"
  },
  {
    quote: "Working with Jivan on our company website, Bsquareglobalfze.com, was a great experience. He understood our needs clearly and delivered the site well within our budget range. Every service we requested was implemented without delays, and he made changes promptly whenever needed. His support throughout the process made everything smooth and stress-free. I highly recommend him for professional and reliable web development.",
    name: "Mihan Babu",
    role: "Bsquareglobal"
  },
  {
    quote: "Jivan did an excellent job developing our website, Dahibraaexpress.com. He understood the look and feel we wanted for our food brand and built it within our budget and timeframe. His quick turnaround on requested changes and continuous support made the process really easy. The site turned out exactly how we wanted, and we’ve already received positive feedback from our customers. Highly recommended!",
    name: "Owner",
    role: "Dadhibara Express"
  }
];

const getInitials = (name) => {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
};

const getIndices = (center, length) => {
  // Returns [left, center, right] indices, looping
  const left = (center - 1 + length) % length;
  const right = (center + 1) % length;
  return [left, center, right];
};

const CARD_WIDTH = 480; // px, adjust as needed for your design

const Testimonials = () => {
  const [centerIdx, setCenterIdx] = useState(1); // Start with 2nd testimonial in center
  const cardRefs = useRef([]);
  const animating = useRef(false);
  const prevCenterIdx = useRef(centerIdx);

  // Animate cards on centerIdx change (slide effect)
  useEffect(() => {
    if (!cardRefs.current[0] || !cardRefs.current[1] || !cardRefs.current[2]) return;
    const direction = (centerIdx > prevCenterIdx.current || (centerIdx === 0 && prevCenterIdx.current === testimonials.length - 1)) ? 1 : -1;
    // Slide all cards
    gsap.to(cardRefs.current, {
      x: (i) => {
        if (i === 0) return -CARD_WIDTH * direction;
        if (i === 1) return 0;
        if (i === 2) return CARD_WIDTH * direction;
        return 0;
      },
      opacity: (i) => (i === 1 ? 1 : 0.5),
      filter: (i) => (i === 1 ? 'blur(0px)' : 'blur(8px)'),
      scale: (i) => (i === 1 ? 1.1 : 0.9),
      zIndex: (i) => (i === 1 ? 3 : 1),
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: () => {
        // Reset x after animation for next cycle
        cardRefs.current.forEach((el, i) => {
          gsap.set(el, { x: 0 });
        });
      }
    });
    prevCenterIdx.current = centerIdx;
  }, [centerIdx]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating.current) {
        animating.current = true;
        setCenterIdx((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => { animating.current = false; }, 800);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const [leftIdx, midIdx, rightIdx] = getIndices(centerIdx, testimonials.length);
  const visible = [leftIdx, midIdx, rightIdx];

  return (
    <section id="testimonials" className="py-32 relative bg-gradient-to-b from-background to-background/80 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-bold">
            What <span className="gradient-text">Clients Say</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real feedback from people I've worked with
          </p>
        </div>
        <div className="relative flex items-center justify-center min-h-[340px]">
          <div className="flex items-center justify-center w-full max-w-5xl mx-auto relative">
            {visible.map((idx, pos) => (
              <div
                key={testimonials[idx].name + testimonials[idx].role}
                ref={el => cardRefs.current[pos] = el}
                className={`transition-all duration-700 ease-in-out
                  w-[90vw] max-w-2xl md:w-[600px] min-h-[260px] max-h-[420px] flex flex-col items-center text-center
                  glass rounded-2xl shadow-xl cursor-pointer px-6 py-8
                  ${pos === 0 ? '-ml-24 md:-ml-32 z-10' : ''}
                  ${pos === 1 ? 'z-30 mx-[-80px]' : ''}
                  ${pos === 2 ? '-mr-24 md:-mr-32 z-10' : ''}
                `}
                style={{
                  pointerEvents: pos === 1 ? 'auto' : 'none',
                  boxShadow: pos === 1 ? '0 0 32px 0 hsl(var(--neon-blue) / 0.15)' : undefined,
                  opacity: pos === 1 ? 1 : 0.5,
                  filter: pos === 1 ? 'blur(0px)' : 'blur(8px)',
                  transform: pos === 1 ? 'scale(1.1)' : 'scale(0.9)',
                  zIndex: pos === 1 ? 3 : 1,
                  overflow: 'visible',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-line',
                }}
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg">
                  {getInitials(testimonials[idx].name)}
                </div>
                {/* Quote */}
                <p className="text-lg text-foreground/90 mb-6 italic relative z-10 px-2 break-words max-w-full">
                  <span className="text-3xl text-neon-blue font-bold mr-2">“</span>
                  {testimonials[idx].quote}
                  <span className="text-3xl text-neon-blue font-bold ml-2">”</span>
                </p>
                {/* Name & Role */}
                <div className="mt-auto">
                  <div className="font-semibold text-neon-blue text-lg">{testimonials[idx].name}</div>
                  <div className="text-muted-foreground text-sm">{testimonials[idx].role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Background floating elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-neon-blue/20 to-transparent blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-neon-purple/20 to-transparent blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-neon-cyan/20 to-transparent blur-2xl animate-float" />
    </section>
  );
};

export default Testimonials; 