"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { EASING, DURATION } from "@/lib/animation-config";
import type { ProjectData } from "@/lib/constants";

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Parallax scroll effect on the video
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Hairline top border with fade */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Large background index number – editorial brutalist detail */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 select-none pointer-events-none 
          font-headline font-black text-[20vw] leading-none text-white/[0.02] z-0
          ${isEven ? "-right-8" : "-left-8"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className={`relative z-10 max-w-[1400px] mx-auto flex flex-col gap-10 
          ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} 
          lg:items-center lg:gap-20`}
      >
        {/* ── VIDEO PANEL ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: DURATION.entrance, ease: EASING.expoOut }}
          className="w-full lg:w-[58%] relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Aspect ratio wrapper */}
          <div className="relative aspect-[16/10] overflow-hidden bg-vs-surface">
            {/* Parallaxing video */}
            <motion.div
              style={{ y: videoY }}
              className="absolute inset-[-8%] w-[116%] h-[116%]"
            >
              {project.media.gif ? (
                <>
                  {/* Desktop: High-quality cinematic video */}
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hidden md:block w-full h-full object-cover"
                  >
                    {project.media.webm && (
                      <source src={project.media.webm} type="video/webm" />
                    )}
                    {project.media.mp4 && (
                      <source src={project.media.mp4} type="video/mp4" />
                    )}
                  </video>

                  {/* Mobile: Optimized GIF for faster loading and compatibility */}
                  <img
                    src={project.media.gif}
                    alt={`${project.title} showcase`}
                    className="block md:hidden w-full h-full object-cover"
                    loading="lazy"
                  />
                </>
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  {project.media.webm && (
                    <source src={project.media.webm} type="video/webm" />
                  )}
                  {project.media.mp4 && (
                    <source src={project.media.mp4} type="video/mp4" />
                  )}
                </video>
              )}
            </motion.div>

            {/* Hover reveal overlay */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"
            />

            {/* "View Project" pill — reveals on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
              transition={{ duration: 0.35, ease: EASING.expoOut }}
              className="absolute bottom-6 left-6 z-20"
            >
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-vs-accent text-black font-headline font-bold uppercase tracking-widest text-xs px-5 py-3"
              >
                <span>View Live</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 11L11 1M11 1H4M11 1V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Corner brackets — architectural detail */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/30 z-20" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-white/30 z-20" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-white/30 z-20" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/30 z-20" />
          </div>

          {/* Display URL below video */}
          <div className="mt-3 flex items-center gap-2 opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-vs-accent" />
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-white">
              {project.displayUrl}
            </span>
          </div>
        </motion.div>

        {/* ── META PANEL ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: DURATION.entrance,
            ease: EASING.expoOut,
            delay: 0.2,
          }}
          className="w-full lg:w-[42%] flex flex-col gap-7"
        >
          {/* Index + category row */}
          <div className="flex items-center gap-4">
            <span className="font-headline text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-white/10 max-w-[40px]" />
            <span className="font-label text-[10px] uppercase tracking-[0.35em] text-vs-accent">
              {project.categories.slice(0, 2).join(" · ")}
            </span>
          </div>

          {/* Project Title */}
          <h3
            className="font-headline font-black text-white tracking-tight leading-none"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          {project.description && (
            <p className="text-vs-text-secondary text-base leading-relaxed font-body max-w-md">
              {project.description}
            </p>
          )}

          {/* Metrics pill */}
          {project.metrics && (
            <div className="inline-flex items-center gap-3 self-start">
              <div className="w-6 h-px bg-vs-accent" />
              <span className="font-label uppercase tracking-[0.2em] text-[11px] text-vs-accent">
                {project.metrics}
              </span>
            </div>
          )}

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags
              .split(" | ")
              .slice(0, 4)
              .map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border border-white/10 text-white/40 font-label text-[10px] uppercase tracking-[0.15em]"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* CTA — minimal, editorial */}
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-4 mt-2 w-fit"
          >
            <span className="font-headline uppercase tracking-[0.15em] text-sm text-white font-bold group-hover/btn:text-vs-accent transition-colors duration-300">
              View Project
            </span>
            <motion.span
              animate={{ width: isHovered ? "3.5rem" : "2rem" }}
              className="block h-px bg-white group-hover/btn:bg-vs-accent transition-colors duration-300 w-8"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
