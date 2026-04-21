"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASING } from "@/lib/animation-config";

if (typeof window !== "undefined") {
  // Safe registration, mostly handled by lib/gsap but good for useGSAP
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface MediaImage {
  type: "image";
  src: string;
  mobileSrc?: string;
}
interface MediaVideo {
  type: "video";
  webm?: string;
  mp4?: string;
  mobileSrc?: string;
}
type ProjectMedia = MediaImage | MediaVideo;

interface ProjectData {
  title: string;
  url: string;
  displayUrl: string;
  tags: string;
  categories: string[];
  media: ProjectMedia;
}

// ─── Data — corrected paths to /images/ ──────────────────────────────────────
const PROJECTS: ProjectData[] = [
  {
    title: "Transform Health",
    url: "https://transformhealthcoalition.org/",
    displayUrl: "www.transformhealthcoalition.org",
    tags: "Wordpress | UI/UX Design | GSAP | MySQL | Cloudflare",
    categories: ["WordPress", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/transformhealth.webm",
      mp4: "/images/transformhealth.mp4",
      mobileSrc: "/images/mobile-img/transformhealth.png",
    },
  },
  {
    title: "Nappa Dori",
    url: "https://www.nappadori.com/",
    displayUrl: "www.nappadori.com",
    tags: "UI/UX Design | Shopify | GSAP | React | Photoswipe",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: {
      type: "video",
      webm: "/images/nappadori.webm",
      mp4: "/images/nappadori.mp4",
      mobileSrc: "/images/mobile-img/nappadori.png",
    },
  },
  {
    title: "Shivan & Narresh",
    url: "https://www.shivanandnarresh.com/",
    displayUrl: "www.shivanandnarresh.com",
    tags: "Shopify | jQuery | AWS | Cloudflare | Klaviyo",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/shivanandnarresh.webm",
      mp4: "/images/shivanandnarresh.mp4",
      mobileSrc: "/images/mobile-img/shivanandnarresh.png",
    },
  },
  {
    title: "Chashma",
    url: "https://chashma.com/",
    displayUrl: "www.chashma.com",
    tags: "Shopify | Firebase | Swiper | jQuery | Font Awesome",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/chashma.webm",
      mp4: "/images/chashma.mp4",
      mobileSrc: "/images/mobile-img/chashma.png",
    },
  },
  {
    title: "Shaz & Kiks",
    url: "https://www.shazandkiks.com/",
    displayUrl: "www.shazandkiks.com",
    tags: "UI/UX Design | Shopify | Klaviyo | React | Styled-Components",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: {
      type: "video",
      webm: "/images/shazandkiks.webm",
      mp4: "/images/shazandkiks.mp4",
      mobileSrc: "/images/mobile-img/shazandkiks.png",
    },
  },
  {
    title: "Swiss Beauty",
    url: "https://swissbeauty.in/",
    displayUrl: "www.swissbeauty.in",
    tags: "Shopify | Tailwind CSS | PhotoSwipe | Keen-Slider | CustomFit",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/swissbeauty.webm",
      mp4: "/images/swissbeauty.mp4",
      mobileSrc: "/images/mobile-img/swissbeauty.png",
    },
  },
  {
    title: "Artisan Lab",
    url: "https://www.artisanlab.in/",
    displayUrl: "www.artisanlab.in",
    tags: "Shopify | UI/UX Design | PhotoSwipe | Svelte | Flickity",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: {
      type: "video",
      webm: "/images/artisanlab.webm",
      mp4: "/images/artisanlab.mp4",
      mobileSrc: "/images/mobile-img/artisanlab.png",
    },
  },
  {
    title: "Outhouse Jewellery",
    url: "https://outhouse-jewellery.com/",
    displayUrl: "www.outhouse-jewellery.com",
    tags: "Shopify | BugSnag | React | Google Ads | Preact | Swiper | Custom CMS",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/outhousejewellery.webm",
      mp4: "/images/outhousejewellery.mp4",
      mobileSrc: "/images/mobile-img/outhouse.png",
    },
  },
  {
    title: "Jan & April",
    url: "https://janandapril.com/",
    displayUrl: "www.janandapril.com",
    tags: "Shopify | jQuery | AWS | Cloudflare | Klaviyo",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/janandapril.webm",
      mp4: "/images/janandapril.mp4",
      mobileSrc: "/images/mobile-img/janandapril.png",
    },
  },
  {
    title: "Manan Design",
    url: "https://www.manandesign.com/",
    displayUrl: "www.manandesign.com",
    tags: "Shopify | UI/UX Design | GSAP | PhotoSwipe | Swiper | AWS | Google Ads",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: {
      type: "video",
      webm: "/images/manandesign.webm",
      mp4: "/images/manandesign.mp4",
      mobileSrc: "/images/mobile-img/manan.png",
    },
  },
  {
    title: "Perona",
    url: "https://www.perona.com/",
    displayUrl: "www.perona.com",
    tags: "Shopify | GSAP | Preact | jQuery UI | Swiper | Klaviyo",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/perona.webm",
      mp4: "/images/perona.mp4",
      mobileSrc: "/images/mobile-img/perona.png",
    },
  },
  {
    title: "Orange Tree",
    url: "https://www.orangetree.in/",
    displayUrl: "www.orangetree.in",
    tags: "Shopify | Bootstrap | Vue.js | GSAP | MobX | Google Ads",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/orangetree.webm",
      mp4: "/images/orangetree.mp4",
      mobileSrc: "/images/mobile-img/orangetree.png",
    },
  },
  {
    title: "OnCloud9",
    url: "https://oncloud9.com/",
    displayUrl: "www.oncloud9.com",
    tags: "Shopify | JSS | React | Google Analytics | Sentry | PostScript",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/oncloud9.webm",
      mp4: "/images/oncloud9.mp4",
      mobileSrc: "/images/mobile-img/cloud9.png",
    },
  },
  {
    title: "Idus",
    url: "https://idus.in/",
    displayUrl: "www.idus.in",
    tags: "Shopify | AWS | Scrollreveal | jQuery | Font Awesome",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/idus.webm",
      mp4: "/images/idus.mp4",
      mobileSrc: "/images/mobile-img/idus.png",
    },
  },
  {
    title: "Janavi",
    url: "https://www.janavi.com/",
    displayUrl: "www.Janavi.com",
    tags: "Shopify | BugSnag | Cloudflare | Babel | Custom CMS",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/janavi.webm",
      mp4: "/images/janavi.mp4",
      mobileSrc: "/images/mobile-img/janavi.png",
    },
  },
  {
    title: "Cord Studio",
    url: "https://www.cordstudio.in/",
    displayUrl: "www.cordstudio.in",
    tags: "Shopify | GSAP | Svelte | Preact | PhotoSwipe | AWS",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/cordstudio.webm",
      mp4: "/images/cordstudio.mp4",
      mobileSrc: "/images/mobile-img/cordstudio.png",
    },
  },
  {
    title: "Lily Ann Cabinets",
    url: "https://www.lilyanncabinets.com/",
    displayUrl: "www.lilyanncabinets.com",
    tags: "Magento | Custom Web Development | MySQL | Microsoft Ads | AWS",
    categories: ["E-Commerce", "UI/UX Design"],
    media: {
      type: "video",
      webm: "/images/lilyanncabinets.webm",
      mp4: "/images/lilyanncabinets.mp4",
      mobileSrc: "/images/mobile-img/lilyanncabinets.png",
    },
  },
  {
    title: "Ava Cabinetry",
    url: "https://www.avacabinetry.com/",
    displayUrl: "www.avacabinetry.com",
    tags: "Magento | Custom Web Development | PHP | Bootstrap | MySQL | AWS",
    categories: ["E-Commerce"],
    media: {
      type: "video",
      webm: "/images/ava.webm",
      mp4: "/images/ava.mp4",
      mobileSrc: "/images/mobile-img/avacabinetry.png",
    },
  },
];

const TOTAL = PROJECTS.length;

// ─── Background media renderer ────────────────────────────────────────────────
function BackgroundMedia({ project }: { project: ProjectData }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    const play = v.play();
    if (play !== undefined) play.catch(() => {});
    return () => {
      v.pause();
    };
  }, [project]);

  const { media } = project;

  if (media.type === "video") {
    return (
      <video
        ref={videoRef}
        key={media.mp4 ?? media.webm}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={media.mobileSrc}
        preload="auto"
      >
        {media.webm && <source src={media.webm} type="video/webm" />}
        {media.mp4 && <source src={media.mp4} type="video/mp4" />}
      </video>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={media.src}
      alt={project.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

// ─── Single project card in the left list ─────────────────────────────────────
function ProjectCard({
  project,
  index,
  isActive,
  onClick,
  cardRef,
}: {
  project: ProjectData;
  index: number;
  isActive: boolean;
  onClick: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      data-index={index}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Select ${project.title}`}
      aria-pressed={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className={`relative cursor-pointer focus:outline-none transition-all duration-300 flex flex-col gap-3 p-5 border-b border-white/5 ${
        isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
      }`}
    >
      {/* Active left-bar */}
      <motion.span
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        animate={{ background: isActive ? "#00D9FF" : "transparent" }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex gap-4 items-center">
        {/* Thumbnail Image */}
        <div
          className={`relative w-28 h-18 md:w-36 md:h-24 shrink-0 rounded-md overflow-hidden border transition-colors duration-300 ${
            isActive ? "border-[#00D9FF]" : "border-white/10"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.media.mobileSrc}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isActive ? "scale-105 opacity-100" : "scale-100 opacity-50"
            }`}
          />
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0">
          <span className="font-label text-[9px] uppercase tracking-[0.35em] text-white/30 tabular-nums block mb-1">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(TOTAL).padStart(2, "0")}
          </span>
          <h3
            className="font-headline font-black uppercase leading-none truncate transition-colors duration-400"
            style={{
              fontSize: "clamp(0.85rem, 1vw, 1rem)",
              letterSpacing: "-0.02em",
              color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.45)",
            }}
          >
            {project.title}
          </h3>
          <p
            className="mt-1 font-label text-[8px] uppercase tracking-[0.2em] truncate transition-colors duration-300"
            style={{
              color: isActive ? "rgba(0,217,255,0.6)" : "rgba(255,255,255,0.2)",
            }}
          >
            {project.categories.join(" / ")}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function FeaturedWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null); // outer tall scroll wrapper
  const stickyRef = useRef<HTMLDivElement>(null); // the sticky 100vh panel
  const listRef = useRef<HTMLDivElement>(null); // scrollable card list
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── GSAP ScrollTrigger for High-Performance Synchronization ──────────────────
  useGSAP(() => {
    // Refresh ScrollTrigger to ensure accurate positioning after layout
    ScrollTrigger.refresh();

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      ScrollTrigger.create({
        trigger: card,
        // Trigger slightly earlier (60% from top) to solve the "highlight later on" issue
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
        // Optional: onUpdate for even more granular tracking if needed
      });
    });
  }, { scope: wrapperRef, dependencies: [] });

  // ── Click: jump page natively to the chosen card ────────────────────────
  const handleCardClick = useCallback((idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;

    // Calculate the target scroll position placing the card at the 'focusY' (40% down)
    const focusY = window.innerHeight * 0.4;
    const cardTop = card.getBoundingClientRect().top + window.scrollY;
    const cardCenterTarget = cardTop - focusY + card.offsetHeight / 2;

    window.scrollTo({ top: cardCenterTarget, behavior: "smooth" });
  }, []);

  const active = PROJECTS[activeIndex];
  const allTags = active.tags.split("|").map((t) => t.trim());
  const counterStr = `${String(activeIndex + 1).padStart(2, "0")} / ${String(TOTAL).padStart(2, "0")}`;
  const progressPct = ((activeIndex + 1) / TOTAL) * 100;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full bg-black flex flex-col md:flex-row items-start"
      aria-label="Featured Work"
    >
      {/* ══════════════════════════════════════
          LEFT SIDE: LIST PANEL (Natively Scrollable)
      ══════════════════════════════════════ */}
      <div
        className="flex flex-col relative z-20 shrink-0 bg-[#080808] border-r border-white/5"
        style={{ width: "clamp(300px, 30vw, 420px)" }}
      >
        {/* Sticky Section header */}
        <div className="px-7 pt-8 pb-5 sticky top-0 bg-[#080808] z-30 shrink-0 border-b border-white/5">
          <h2
            className="font-headline font-black uppercase text-[#00d7fc] leading-none"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
              letterSpacing: "-0.03em",
              paddingTop: "30px",
            }}
          >
            FEATURED
            <br />
            WORK
          </h2>
          <p className="mt-3 font-body text-[0.73rem] leading-relaxed text-white/30 max-w-[220px]">
            {TOTAL} projects — e-commerce, brand platforms &amp; custom web
            experiences.
          </p>
        </div>

        {/* Natural Cards List */}
        <div className="flex-1 pb-[50vh] pt-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.url}
              project={project}
              index={i}
              isActive={i === activeIndex}
              onClick={() => handleCardClick(i)}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT SIDE: MAIN PREVIEW (Sticky)
      ══════════════════════════════════════ */}
      <div className="flex-1 sticky top-0 h-screen bg-black overflow-hidden flex flex-col justify-between group">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${activeIndex}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: EASING.expoOut }}
            >
              <BackgroundMedia project={active} />

              {/* Multi-point gradient overlays for maximum text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-transparent to-transparent flex md:hidden" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-transparent hidden md:flex" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Invisible Overlay for Custom Cursor Link */}
        <a
          href={active.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-text="View"
          aria-label={`Visit ${active.title}`}
          className="absolute inset-0 z-20 cursor-none"
        />

        {/* ── RIGHT: project info overlay ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-between p-8 md:p-14 pointer-events-none transition-opacity duration-300 delay-300 group-hover:opacity-40 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
          {/* Top-right counter */}
          <div className="flex justify-end">
            <AnimatePresence mode="wait">
              <motion.span
                key={`ctr-${activeIndex}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3 }}
                className="font-label text-[10px] uppercase tracking-[0.4em] text-white/50 tabular-nums"
              >
                {counterStr}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bottom-right: large title + meta */}
          <div className="self-end text-right max-w-[640px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${activeIndex}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASING.expoOut }}
              >
                {/* Category badges */}
                <div className="flex flex-wrap gap-2 justify-end mb-4">
                  {active.categories.map((cat) => (
                    <span
                      key={cat}
                      className="font-label text-[9px] uppercase tracking-[0.2em] px-2.5 py-0.5
                                   border border-[#00D9FF]/30 text-[#00D9FF]/70"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
                  className="font-headline font-black uppercase text-white leading-none"
                  style={{
                    fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {active.title}
                </h3>

                {/* URL */}
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-2 mt-3
                               font-label text-[10px] uppercase tracking-[0.3em] text-white/35
                               hover:text-[#00D9FF] transition-colors duration-300 group"
                >
                  {active.displayUrl}
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path d="M2 8L8 2M8 2H3.5M8 2V6.5" />
                  </svg>
                </a>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 justify-end mt-4">
                  {allTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-label text-[8px] uppercase tracking-[0.15em] px-2.5 py-1
                                   border border-white/12 text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mt-7">
              <div className="relative w-full h-px bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#00D9FF]"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: EASING.expoOut }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-label text-[8px] uppercase tracking-[0.3em] text-white/40">
                  SCROLL TO NAVIGATE
                </span>
                <span className="font-label text-[8px] uppercase tracking-[0.3em] text-white/40 tabular-nums">
                  {activeIndex + 1} / {TOTAL}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hint arrow — fades out after first project */}
      <AnimatePresence>
        {activeIndex === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-label text-[8px] uppercase tracking-[0.4em] text-white/25">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
                className="w-px h-6 bg-white/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
