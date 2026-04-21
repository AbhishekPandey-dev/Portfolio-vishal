"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInViewport } from "@/hooks/use-in-viewport";
import { useCounter } from "@/hooks/use-counter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { STATS } from "@/lib/constants";
import { EASING, DURATION, STAGGER } from "@/lib/animation-config";

function StatItem({
  value,
  suffix,
  label,
  index,
  isInView,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  isInView: boolean;
}) {
  const displayValue = useCounter({
    target: value,
    duration: 1500,
    trigger: isInView,
    decimals: value % 1 !== 0 ? 1 : 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: DURATION.normal,
        ease: EASING.expoOut,
        delay: index * STAGGER.slow,
      }}
      className="text-center md:text-left"
    >
      <div className="flex items-baseline gap-1 justify-center md:justify-start">
        <span className="text-5xl md:text-6xl lg:text-7xl font-headline font-black text-white tabular-nums">
          {displayValue}
        </span>
        <span className="text-3xl md:text-4xl font-headline font-bold text-vs-accent">
          {suffix}
        </span>
      </div>
      <p className="mt-2 font-label uppercase tracking-[0.2em] text-[11px] text-white/40">
        {label}
      </p>
    </motion.div>
  );
}

export function ByTheNumbers() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.02,
    once: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,217,255,0.05)_0%,_transparent_60%)]" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left: Stats */}
          <div className="w-full lg:w-1/2">
            <SectionLabel>BY THE NUMBERS</SectionLabel>
            <div className="grid grid-cols-2 gap-10 mt-8">
              {STATS.map((stat, index) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  index={index}
                  isInView={hasBeenInView}
                />
              ))}
            </div>
          </div>

          {/* Right: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={
              hasBeenInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 60 }
            }
            transition={{
              duration: DURATION.normal,
              ease: EASING.expoOut,
              delay: 0,
            }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-display-md font-headline font-bold text-white tracking-tight mb-6">
              Years of crafting digital excellence
            </h2>
            <p className="text-vs-text-secondary text-base md:text-lg leading-relaxed font-body mb-4">
              I approach every project as a partnership. Whether it&apos;s a global
              e-commerce brand or an ambitious startup, I bring the same
              obsessive attention to detail, performance-first mindset, and
              design sensibility.
            </p>
            <p className="text-vs-text-secondary text-base md:text-lg leading-relaxed font-body mb-8">
              The result? Digital products that are fast, beautiful, and built
              to scale—turning ideas into experiences people remember.
            </p>

            <Link
              href="/about"
              className="group/btn inline-flex items-center gap-3"
            >
              <span className="font-headline uppercase tracking-[0.15em] text-sm text-white font-medium group-hover/btn:text-vs-accent transition-colors duration-300">
                Know More About Me
              </span>
              <span className="w-8 h-px bg-white group-hover/btn:w-12 group-hover/btn:bg-vs-accent transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
