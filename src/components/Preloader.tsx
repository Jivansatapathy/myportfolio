import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([textRef.current, progressBarRef.current], {
      opacity: 0,
      y: 30
    });

    // Animation sequence
    tl.to([textRef.current, progressBarRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(progressBarRef.current?.querySelector('.progress-fill'), {
      width: "100%",
      duration: 2.5,
      ease: "power2.out"
    })
    .to([textRef.current, progressBarRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.6,
      stagger: 0.1
    })
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center space-y-8">
        <div ref={textRef} className="space-y-2">
          <h1 className="text-6xl font-bold gradient-text">
            Welcome to My Space
          </h1>
          <p className="text-xl text-muted-foreground">
            Please Hang on...
          </p>
        </div>
        
        <div ref={progressBarRef} className="w-80 mx-auto">
          <div className="glass rounded-full h-2 overflow-hidden">
            <div 
              className="progress-fill h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-purple w-0"
              style={{
                boxShadow: '0 0 20px hsl(var(--neon-blue) / 0.5)'
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-neon-blue/20 to-transparent blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-neon-purple/20 to-transparent blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-neon-cyan/20 to-transparent blur-2xl animate-float" />
      </div>
    </div>
  );
};

export default Preloader;