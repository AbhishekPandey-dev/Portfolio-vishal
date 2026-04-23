"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SELECTED_PROJECTS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EASING, DURATION } from "@/lib/animation-config";

export function SelectedWork() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <div className="relative">
      {/* ── EDITORIAL SECTION HEADER ─────────────────────────────── */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-6 md:px-16 lg:px-24 pt-28 pb-4"
      >
        <div>
          <SectionLabel>SELECTED WORK</SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: DURATION.entrance,
              ease: EASING.expoOut,
              delay: 0.1,
            }}
            className="font-headline font-black text-white leading-none tracking-tighter"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            WORK
            <br />
            <span className="text-stroke">THAT SPEAKS</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: DURATION.entrance,
            ease: EASING.expoOut,
            delay: 0.3,
          }}
          className="flex flex-col gap-4 max-w-xs"
        >
          <p className="text-vs-text-secondary text-sm leading-relaxed font-body">
            A showcase of projects designed not just to function, but to truly
            resonate.
          </p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 w-fit border border-white/15 px-5 py-3 hover:border-vs-accent transition-colors duration-300"
          >
            <span className="font-label uppercase tracking-[0.25em] text-[11px] text-white/70 group-hover:text-vs-accent transition-colors duration-300">
              View All Work
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              className="text-white/40 group-hover:text-vs-accent transition-colors duration-300"
            >
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* ── PROJECT CARDS ─────────────────────────────────────────── */}
      {SELECTED_PROJECTS.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <div className="flex justify-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DURATION.normal, ease: EASING.expoOut }}
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-4 font-headline font-bold uppercase tracking-[0.2em] text-sm text-white hover:text-vs-accent transition-colors duration-300"
          >
            <span className="w-10 h-px bg-white/30 group-hover:w-16 group-hover:bg-vs-accent transition-all duration-500" />
            See All {SELECTED_PROJECTS.length > 4 ? "Projects" : "18 Projects"}
            <span className="w-10 h-px bg-white/30 group-hover:w-16 group-hover:bg-vs-accent transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
