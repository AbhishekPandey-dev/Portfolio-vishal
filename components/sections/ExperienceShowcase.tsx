"use client";

import { motion } from "framer-motion";
import { useInViewport } from "@/hooks/use-in-viewport";
import { EASING, DURATION } from "@/lib/animation-config";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExperienceCarousel } from "./ExperienceCarousel";

export function ExperienceShowcase() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.1,
    once: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 overflow-hidden bg-vs-surface"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,217,255,0.03)_0%,_transparent_60%)] pointer-events-none" />
      
      {/* Editorial Header */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: DURATION.normal, ease: EASING.expoOut }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <SectionLabel className="mb-6">EXPERIENCE INDEX</SectionLabel>
            <h2 className="text-display-md md:text-display-lg font-headline font-black text-white leading-none tracking-tighter">
              BEYOND <br /> <span className="text-vs-accent">BOUNDARIES</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-vs-text-secondary text-sm md:text-base font-body opacity-60">
            Partnering with visionary brands to redefine digital structural honesty and cinematic experiences.
          </p>
        </motion.div>
      </div>

      {/* 3D Experience Carousel */}
      <div className="relative z-10 w-full">
        <ExperienceCarousel />
      </div>

      {/* Instructional Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-vs-text-secondary/40 text-[10px] font-label tracking-[0.2em] uppercase pointer-events-none"
      >
        <span>Drag or Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
