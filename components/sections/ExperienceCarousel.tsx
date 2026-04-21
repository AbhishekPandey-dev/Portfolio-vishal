"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, type PanInfo, type MotionValue } from "framer-motion";
import Image from "next/image";
import { CLIENT_BRANDS, BRAND_IMAGE_MAP } from "@/lib/constants";

export function ExperienceCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalItems = CLIENT_BRANDS.length;
  
  // Progress goes from 0 to (totalItems - 1)
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, {
    damping: 30,
    stiffness: 120,
    mass: 0.8,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = springProgress.on("change", (v) => {
      setActiveIndex(Math.round(v));
    });
    return () => unsubscribe();
  }, [springProgress]);

  // Handle Wheel
  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * 0.005;
    const current = progress.get();
    let next = current + delta;
    
    // Clamp
    next = Math.max(0, Math.min(totalItems - 1, next));
    progress.set(next);
  };

  // Handle Drag
  const onDrag = (_event: any, info: PanInfo) => {
    const delta = info.delta.x * -0.01;
    const current = progress.get();
    let next = current + delta;
    next = Math.max(0, Math.min(totalItems - 1, next));
    progress.set(next);
  };

  return (
    <div 
      ref={containerRef}
      onWheel={handleWheel}
      className="relative w-full h-[650px] md:h-[750px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: "1500px" }}
    >
      {/* Invisible drag area */}
      <motion.div 
        drag="x"
        onDrag={onDrag}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        className="absolute inset-0 z-50"
      />

      <div className="relative w-full h-full flex items-center justify-center preserve-3d">
        {CLIENT_BRANDS.map((brand, index) => (
          <ExperienceCard 
            key={brand}
            brand={brand}
            index={index}
            springProgress={springProgress}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {CLIENT_BRANDS.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: activeIndex === i ? 24 : 6,
              opacity: activeIndex === i ? 1 : 0.3,
              backgroundColor: activeIndex === i ? "var(--vs-accent, #00d9ff)" : "#ffffff"
            }}
            className="h-1.5 rounded-full bg-white/30 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ brand, index, springProgress }: { 
  brand: string; 
  index: number; 
  springProgress: MotionValue<number>;
}) {
  const active = useTransform(springProgress, (p) => index - p);

  // Math inspired by CodePen but adjusted for React/Framer Motion
  // We use translateX, translateY and rotateY for the curved effect
  const x = useTransform(active, (a) => `${a * 110}%`); // Spacing
  const y = useTransform(active, (a) => `${Math.abs(a) * 45}px`); // Dip
  const rotateY = useTransform(active, (a) => `${a * -35}deg`); // Rotation
  const translateZ = useTransform(active, (a) => `${Math.abs(a) * -150}px`); // Push back
  const opacity = useTransform(active, (a) => {
    const absA = Math.abs(a);
    if (absA > 3) return 0;
    return 1 - (absA * 0.25);
  });
  const scale = useTransform(active, (a) => 1 - Math.abs(a) * 0.05);

  return (
    <motion.div
      style={{
        x,
        y,
        rotateY,
        z: translateZ,
        opacity,
        scale,
        position: "absolute",
        zIndex: Math.round(100 - Math.abs(index - springProgress.get()) * 10),
      }}
      className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] bg-vs-surface-light group will-change-transform"
    >
      <div className="relative w-full h-full">
        <Image 
          src={BRAND_IMAGE_MAP[brand] || "/images/placeholder.png"}
          alt={brand}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-1">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-[1px] bg-vs-accent" />
            <span className="text-[10px] font-label tracking-[0.2em] text-vs-accent uppercase">Brand Partner</span>
          </motion.div>
          <h3 className="text-xl md:text-2xl font-headline font-black text-white uppercase tracking-tight leading-none mt-2">
            {brand}
          </h3>
        </div>

        {/* Gloss Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}
