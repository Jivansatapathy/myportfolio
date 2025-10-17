import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  interface Window {
    LocomotiveScroll: any;
  }
}

export const useLocomotiveScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locomotiveScroll: any;

    const initLocomotiveScroll = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        if (scrollRef.current) {
          locomotiveScroll = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            multiplier: 1,
            class: 'is-revealed',
            smartphone: {
              smooth: true
            },
            tablet: {
              smooth: true
            }
          });

          // Update ScrollTrigger when locomotive scroll updates
          locomotiveScroll.on('scroll', () => {
            ScrollTrigger.update();
          });
        }
      } catch (error) {
        console.warn('Locomotive Scroll not available, falling back to native scroll');
      }
    };

    // Initialize after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initLocomotiveScroll();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return scrollRef;
};