import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);
  const tailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const sparkle = sparkleRef.current;
    const tails = tailRefs.current;

    if (!cursor || !sparkle) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let tailX = 0;
    let tailY = 0;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Animation loop
    const animateCursor = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      // Update cursor position
      gsap.set(cursor, {
        x: cursorX - 8,
        y: cursorY - 8
      });

      // Update sparkle position with slight delay
      gsap.set(sparkle, {
        x: cursorX - 12,
        y: cursorY - 12
      });

      // Update tail positions
      tails.forEach((tail, index) => {
        if (tail) {
          const delay = (index + 1) * 0.05;
          tailX += (cursorX - tailX) * (0.1 - delay * 0.02);
          tailY += (cursorY - tailY) * (0.1 - delay * 0.02);
          
          gsap.set(tail, {
            x: tailX - 4,
            y: tailY - 4,
            scale: 1 - index * 0.2,
            opacity: 1 - index * 0.3
          });
        }
      });

      requestAnimationFrame(animateCursor);
    };

    // Sparkle animation
    const sparkleAnimation = () => {
      gsap.to(sparkle, {
        rotation: "+=360",
        duration: 2,
        ease: "none",
        repeat: -1
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Start animations
    animateCursor();
    sparkleAnimation();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-neon-pink rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          boxShadow: '0 0 20px hsl(var(--neon-pink) / 0.8), 0 0 40px hsl(var(--neon-pink) / 0.4)'
        }}
      />

      {/* Sparkle Effect */}
      <div
        ref={sparkleRef}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9998]"
      >
        <div className="w-full h-full relative">
          {/* Sparkle rays */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-1 h-3 bg-neon-pink rounded-full transform -translate-y-1/2" 
                 style={{ boxShadow: '0 0 8px hsl(var(--neon-pink))' }} />
            <div className="absolute top-1/2 right-0 w-1 h-3 bg-neon-pink rounded-full transform -translate-y-1/2" 
                 style={{ boxShadow: '0 0 8px hsl(var(--neon-pink))' }} />
            <div className="absolute left-1/2 top-0 w-3 h-1 bg-neon-pink rounded-full transform -translate-x-1/2" 
                 style={{ boxShadow: '0 0 8px hsl(var(--neon-pink))' }} />
            <div className="absolute left-1/2 bottom-0 w-3 h-1 bg-neon-pink rounded-full transform -translate-x-1/2" 
                 style={{ boxShadow: '0 0 8px hsl(var(--neon-pink))' }} />
          </div>
          
          {/* Diagonal rays */}
          <div className="absolute inset-0 rotate-45">
            <div className="absolute top-1/2 left-0 w-1 h-2 bg-neon-pink rounded-full transform -translate-y-1/2" 
                 style={{ boxShadow: '0 0 6px hsl(var(--neon-pink))' }} />
            <div className="absolute top-1/2 right-0 w-1 h-2 bg-neon-pink rounded-full transform -translate-y-1/2" 
                 style={{ boxShadow: '0 0 6px hsl(var(--neon-pink))' }} />
            <div className="absolute left-1/2 top-0 w-2 h-1 bg-neon-pink rounded-full transform -translate-x-1/2" 
                 style={{ boxShadow: '0 0 6px hsl(var(--neon-pink))' }} />
            <div className="absolute left-1/2 bottom-0 w-2 h-1 bg-neon-pink rounded-full transform -translate-x-1/2" 
                 style={{ boxShadow: '0 0 6px hsl(var(--neon-pink))' }} />
          </div>
        </div>
      </div>

      {/* Tail Effect */}
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          ref={(el) => (tailRefs.current[index] = el)}
          className="fixed top-0 left-0 w-2 h-2 bg-neon-pink rounded-full pointer-events-none z-[9997]"
          style={{
            boxShadow: `0 0 ${8 - index * 1}px hsl(var(--neon-pink) / ${0.8 - index * 0.1})`
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor; 