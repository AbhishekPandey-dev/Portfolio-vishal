"use client";

import { motion } from "framer-motion";
import { useInViewport } from "@/hooks/use-in-viewport";
import { EASING, DURATION } from "@/lib/animation-config";

export function SignatureQuote() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.3,
    once: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background depth — radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,217,255,0.04)_0%,_transparent_70%)]" />

      {/* Decorative quotation marks */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          hasBeenInView
            ? { opacity: 0.06, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 1.2, ease: EASING.expoOut }}
        className="absolute top-[15%] left-[8%] text-[20vw] font-display font-black text-vs-accent select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </motion.span>

      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          hasBeenInView
            ? { opacity: 0.06, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{
          duration: 1.2,
          ease: EASING.expoOut,
          delay: 0.2,
        }}
        className="absolute bottom-[15%] right-[8%] text-[20vw] font-display font-black text-vs-accent select-none pointer-events-none leading-none rotate-180"
        aria-hidden="true"
      >
        &ldquo;
      </motion.span>

      {/* Quote content */}
      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={
            hasBeenInView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: 20 }
          }
          transition={{
            duration: DURATION.slow,
            ease: EASING.expoOut,
            delay: 0.1,
          }}
        >
          <p className="text-quote font-headline font-bold text-white leading-[1.3] tracking-tight">
            I design and build digital experiences that perform beautifully—
            <span className="text-vs-accent">clean code</span>,{" "}
            <span className="text-vs-accent">thoughtful design</span>, results
            that grow your business.
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{
            duration: DURATION.normal,
            ease: EASING.expoOut,
            delay: 0.4,
          }}
          className="mt-8 text-vs-text-secondary text-sm md:text-base font-body tracking-wide"
        >
          From concept to code to launch, built with precision and purpose.
        </motion.p>
      </div>
    </section>
  );
}
