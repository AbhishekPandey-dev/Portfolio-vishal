"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export function InteractiveCore3D() {
  const coreRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!coreRef.current) return;
    
    // Register scrolltrigger if not already
    gsap.registerPlugin(ScrollTrigger);

    // Rotate and shift on scroll
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      animation: gsap.to(coreRef.current, {
        rotateZ: 720,
        y: 200,
        ease: "none"
      })
    });

    // Mouse tracking for parallax 3D tilt
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 60;
      const yPos = (clientY / window.innerHeight - 0.5) * 60;

      gsap.to(coreRef.current, {
        rotateY: xPos,
        rotateX: -yPos + 50, // Base 50deg perspective tilt
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      st.kill();
    };
  }, []);

  const handleClick = () => {
    if (!ringsRef.current.length || !coreRef.current) return;

    // Interactive shatter burst on click
    gsap.fromTo(ringsRef.current, 
      { scale: 1, opacity: 0.8 },
      { 
        scale: 2.5, 
        opacity: 0, 
        duration: 1, 
        stagger: 0.05, 
        ease: "power3.out",
        onComplete: () => {
          gsap.set(ringsRef.current, { clearProps: "all" });
        }
      }
    );
    
    // Core snap spin
    gsap.to(coreRef.current, {
      rotateZ: "+=180",
      scale: 0.8,
      yoyo: true,
      repeat: 1,
      duration: 0.5,
      ease: "back.out(2)"
    });
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center lg:justify-end lg:pr-32 overflow-hidden mix-blend-screen"
      style={{ perspective: "1200px" }}
    >
      <div 
        ref={coreRef}
        className="relative w-64 h-64 md:w-[400px] md:h-[400px] pointer-events-auto cursor-crosshair group"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(50deg) rotateZ(45deg)" }}
        onClick={handleClick}
      >
        {/* Central Glow */}
        <div className="absolute inset-0 m-auto w-32 h-32 bg-vs-accent rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
        
        {/* 3D Wireframe Rings */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { ringsRef.current[i] = el; }}
            className="absolute inset-0 border border-vs-accent/20 rounded-full"
            style={{ 
              transform: `translateZ(${i * 30 - 105}px) scale(${1 - Math.abs(i - 3.5) * 0.1})`,
              transformStyle: "preserve-3d",
              boxShadow: i === 3 || i === 4 ? "inset 0 0 20px rgba(255,255,255,0.05)" : "none"
            }}
          />
        ))}

        {/* Center Solid Orb */}
        <div 
          className="absolute inset-0 m-auto w-12 h-12 border border-vs-accent/40 bg-black/50 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:border-vs-accent transition-colors duration-500"
          style={{ transform: "translateZ(0px)" }}
        />
      </div>
    </div>
  );
}
