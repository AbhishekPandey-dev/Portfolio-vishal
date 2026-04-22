"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInViewport } from "@/hooks/use-in-viewport";
import { NAV_LINKS } from "@/lib/constants";
import { EASING, DURATION } from "@/lib/animation-config";

export function Footer() {
  const { ref, hasBeenInView } = useInViewport<HTMLElement>({
    threshold: 0.1,
    once: true,
  });

  const [time, setTime] = useState<string>("12:00 PM IST");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative w-full h-[100dvh] bg-black flex flex-col justify-between overflow-hidden p-6 md:p-10 font-label text-white/50 uppercase tracking-[0.1em]"
    >
      {/* Background Vertical Grid Lines (Brutalist Structure) */}
      <div className="absolute inset-x-4 md:inset-x-12 inset-y-0 pointer-events-none flex justify-between z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-full w-[1px] bg-white/[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.04) 50%)",
              backgroundSize: "1px 8px",
            }}
          />
        ))}
      </div>

      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: DURATION.normal, ease: EASING.expoOut }}
        className="relative z-10 w-full flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-start text-xs md:text-sm font-headline font-bold uppercase tracking-[0.2em]"
      >
        <div className="flex gap-4 items-center">
          <Link 
            href="/" 
            className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            VISHAL SINGH
          </Link>
        </div>

        <nav>
          <ul className="flex flex-wrap gap-4 md:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Massive Center Text - Split Brutalist Glitch Effect */}
      <div className="relative z-10 flex-grow flex items-center justify-center w-full group cursor-pointer mt-8 md:mt-0">
        <Link
          href="/contact"
          className="relative w-full flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={
              hasBeenInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }
            }
            transition={{
              duration: DURATION.slow,
              ease: EASING.expoOut,
              delay: 0.1,
            }}
            className="relative font-headline font-black text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] xl:text-[11vw] whitespace-nowrap leading-[1] tracking-tighter text-white lowercase text-center select-none"
          >
            {/* Top Half */}
            <div
              className="absolute inset-0 text-white transition-all duration-700 group-hover:-translate-x-4 group-hover:-translate-y-2 pointer-events-none overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            >
              Get in touch
            </div>

            {/* Bottom Half */}
            <div
              className="absolute inset-0 text-white transition-all duration-700 group-hover:translate-x-4 group-hover:translate-y-2 group-hover:text-vs-accent pointer-events-none overflow-hidden"
              style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
            >
              Get in touch
            </div>

            {/* Invisible Base Text for layout sizing */}
            <span className="opacity-0">Get in touch</span>

            {/* Floating 'LET'S TALK' small button that follows hover implicitly in the design */}
            <div className="absolute right-[5%] bottom-[10%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white bg-black text-white text-[10px] uppercase tracking-widest px-4 py-2 pointer-events-none delay-100 translate-y-4 group-hover:translate-y-0">
              Let&apos;s Talk
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: DURATION.normal, ease: EASING.expoOut, delay: 0.2 }}
        className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end text-[10px] md:text-11px tracking-[0.2em] gap-6 md:gap-4"
      >
        <div className="flex flex-col gap-2 md:gap-1 text-left">
          <span className="text-white/40">DESIGNED BY ABHISHEK PANDEY</span>
          <span className="text-white/40">DEVELOPED BY ABHISHEK PANDEY & VSHAL SINGH WITH &lt;/LOVE &lt;</span>
        </div>

        <div className="text-left md:text-right">
          <span className="text-white/30">
            ©{new Date().getFullYear()}_VISHALSINGH_ALL RIGHTS RESERVED
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
