"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [time, setTime] = useState<string>("");

  // Detect Footer to hide Nav
  useEffect(() => {
    // Reset state on route change to ensure nav is visible and menu is closed
    setIsAtFooter(false);
    setIsOpen(false);

    const footer = document.querySelector("#footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtFooter(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: true,
          hourCycle: "h12",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Permanent Header Bar */}
      <AnimatePresence mode="wait">
        {!isAtFooter && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className={cn(
              "fixed top-0 w-full z-[60] flex justify-between items-center px-6 py-4 md:py-8 md:px-12 pointer-events-none transition-all duration-500",
              !isOpen && "bg-[#050505]/40 backdrop-blur-md border-b border-white/[0.05] md:bg-transparent md:backdrop-blur-none md:border-none md:mix-blend-difference"
            )}
          >
            <div className="pointer-events-auto">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg md:text-xl font-bold font-headline text-white uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                VISHAL SINGH
              </Link>
            </div>
            <div className="pointer-events-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white text-base font-headline font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                {isOpen ? "CLOSE" : "MENU"}
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[50] bg-[#050505] text-white px-6 py-6 md:px-12 flex flex-col overflow-hidden"
          >
            {/* Background Vertical Grid Lines (Matched to Footer + Animated Scanline) */}
            <div className="absolute inset-x-4 md:inset-x-12 inset-y-0 pointer-events-none flex justify-between z-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-full w-[1px] bg-white/[0.04] relative overflow-hidden"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.04) 50%)",
                    backgroundSize: "1px 8px",
                  }}
                >
                  {/* Subtle Scanline Animation */}
                  <motion.div
                    animate={{
                      y: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5,
                    }}
                    className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-vs-accent/10 to-transparent"
                  />
                </div>
              ))}
            </div>

            {/* Glowing Vignette */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />


            {/* Middle Section: Menu Links */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-4">
              <div className="flex flex-col items-center space-y-3 md:space-y-6">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.2 + i * 0.1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="relative group overflow-hidden cursor-pointer w-full text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {/* Main Link Wrapper - Double Text Hover Animation */}
                      <Link
                        href={link.href}
                        className="block relative overflow-hidden"
                      >
                        <div
                          className={`font-headline font-black text-[11vw] md:text-[7vw] uppercase tracking-tighter leading-[0.85] transition-transform duration-600 ease-[0.16,1,0.3,1] group-hover:-translate-y-full ${
                            isActive ? "text-vs-accent" : "text-white"
                          }`}
                        >
                          {link.label}
                        </div>
                        <div
                          className={`absolute top-0 left-0 w-full font-headline font-black text-[11vw] md:text-[7vw] uppercase tracking-tighter leading-[0.85] translate-y-full transition-transform duration-600 ease-[0.16,1,0.3,1] group-hover:translate-y-0 text-center ${
                            isActive ? "text-white" : "text-vs-accent"
                          }`}
                        >
                          {link.label}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Bar: Ported from Footer for consistency */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end text-[10px] tracking-[0.2em] gap-6 md:gap-4 pb-4 md:pb-8 font-label text-white/40 uppercase"
            >
              <div className="flex flex-col gap-1 text-left">
                <span>[ DESIGNED BY ABHISHEK PANDEY ]</span>
                <span>[ DEVELOPED BY ABHISHEK & VISHAL ]</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span>©{new Date().getFullYear()} VISHAL SINGH</span>
                <span className="text-vs-accent leading-none h-3 inline-block">{time}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
