"use client";

import { useRef, useMemo } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InteractiveCore3D } from "@/components/ui/InteractiveCore3D";

// Define a local interface to match the data we need for the GSAP effect
interface ServiceStep {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const SERVICES: ServiceStep[] = [
  {
    number: "01",
    title: "Shopify Development",
    description:
      "We specialize in crafting intuitive, high-performance Shopify stores that drive conversions and elevate your brand. Our expert developers build custom solutions tailored to your unique requirements and business goals.",
    tags: [
      "Custom Shopify Themes",
      "UI/UX Template Development",
      "Shopify Plus Solutions",
      "App Integration",
      "Store Migration",
      "Performance Optimization",
    ],
  },
  {
    number: "02",
    title: "WordPress Development",
    description:
      "We build robust, scalable, and secure WordPress websites customized to your unique needs. Whether it's a simple blog or a complex enterprise solution, we've got you covered.",
    tags: [
      "Custom Themes",
      "Plugin Development",
      "WooCommerce Solutions",
      "Speed Optimization",
      "Website Security",
      "SEO Strategy",
    ],
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Design plays a crucial role in building trust and user retention. Flow is my priority. I create experiences users love and interactions that keep them coming back for more.",
    tags: [
      "User Interface Design",
      "UX Research",
      "Design Systems",
      "Prototyping",
      "Responsive Design",
      "Accessibility (WCAG)",
    ],
  },
  {
    number: "04",
    title: "E-Commerce Solutions",
    description:
      "We provide end-to-end e-commerce solutions that empower businesses to scale online seamlessly. From custom storefronts to optimizing the sales funnel, we ensure a smooth shopping experience.",
    tags: [
      "Full Store Setup",
      "Payment Integration",
      "Dropshipping",
      "Conversion Optimization",
      "Analytics Setup",
      "Multi-currency Support",
    ],
  },
  {
    number: "05",
    title: "Maintenance & Support",
    description:
      "We ensure that your digital products are running smoothly over the long run with regular monitoring, fast response times, and proactive vulnerability scanning.",
    tags: [
      "Performance Monitoring",
      "Security Updates",
      "Bug Fixes",
      "Content Updates",
      "Backup Management",
      "Vulnerability Scanning",
    ],
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Helper to split words for scrubbing
  const splitText = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block mr-[0.3em] scrub-word opacity-20">
        {word}
      </span>
    ));
  };

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const sections = gsap.utils.toArray(".service-section") as HTMLElement[];

      // 1. PIN THE TITLE (Desktop Only)
      if (window.innerWidth >= 768) {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".pinned-header",
          pinSpacing: false,
        });
      }

      sections.forEach((section, i) => {
        const number = section.querySelector(".step-number");
        const content = section.querySelector(".section-content");
        const words = section.querySelectorAll(".scrub-word");
        const tags = section.querySelectorAll(".scrub-tag");

        // Set explicit z-index for stacking
        gsap.set(section, { zIndex: i + 10 });

        // 2. PIN EACH SECTION (LAYERED PINNING)
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,
          pinSpacing: false,
          onToggle: (self) => {
            if (self.isActive) {
              const counter = document.querySelector(".current-service");
              const mobileCounter = document.querySelector(
                ".current-service-mobile",
              );
              const newNum = (i + 1).toString().padStart(2, "0");

              if (counter && counter.textContent !== newNum) {
                counter.textContent = newNum;
                gsap.fromTo(
                  counter,
                  { y: 5, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.3 },
                );
              }
              if (mobileCounter && mobileCounter.textContent !== newNum) {
                mobileCounter.textContent = newNum;
                gsap.fromTo(
                  mobileCounter,
                  { y: 5, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.3 },
                );
              }
            }
          },
        });

        // 3. BACKGROUND LENS EFFECT (Number)
        gsap.fromTo(
          number,
          { scale: 0.7, opacity: 0.1, rotate: -5, filter: "blur(20px)" },
          {
            scale: 1.1,
            opacity: 0.4,
            rotate: 5,
            filter: "blur(0px)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: isMobile ? 1.5 : 1,
            },
          },
        );

        // 4. CLIP-PATH REVEAL (Layer Entry)
        gsap.fromTo(
          content,
          { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
          {
            clipPath: "circle(150% at 50% 50%)",
            opacity: 1,
            pointerEvents: "auto",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: isMobile ? 1.2 : true,
            },
          },
        );

        // 5. WORD SCRUBBING
        gsap.fromTo(
          words,
          { opacity: 0.2, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 10%",
              end: "top -50%",
              scrub: isMobile ? 1.5 : 0.5,
            },
          },
        );

        // 6. STAGGERED TAGS
        gsap.fromTo(
          tags,
          { y: 20, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="bg-black pt-32 pb-32 overflow-x-hidden">
      <InteractiveCore3D />
      {/* HEADER SECTION (BEFORE PINNING) */}
      <div className="text-center min-h-[100dvh] flex flex-col justify-center items-center px-6">
        <SectionLabel>What I Offer</SectionLabel>
        <h2 className="font-headline text-6xl md:text-[12vw] font-black tracking-tighter uppercase mt-4 leading-[0.8]">
          The <br className="md:hidden" />{" "}
          <span className="text-white/20">Services</span>
        </h2>
        <div className="mt-20 animate-bounce opacity-20">
          <div className="w-px h-12 bg-vs-accent mx-auto"></div>
        </div>
      </div>

      <div ref={triggerRef} className="relative flex flex-col md:flex-row">
        {/* PINNED SIDE HEADER (DESKTOP) */}
        <div className="pinned-header hidden md:flex w-1/3 h-[100dvh] flex-col justify-center px-12 z-50 pointer-events-none">
          <div className="border-l-2 border-vs-accent pl-8 py-4">
            <h3 className="font-headline text-5xl font-black uppercase tracking-tight">
              What I
            </h3>
            <h3 className="font-headline text-8xl font-black uppercase tracking-tighter text-vs-accent">
              Offer
            </h3>
          </div>
          <p className="mt-8 font-label text-xs uppercase tracking-[0.4em] text-white/30 pl-8">
            <span className="current-service">01</span> / 05 Service
          </p>
        </div>

        {/* MOBILE STICKY PHASE INDICATOR */}
        <div className="md:hidden fixed top-24 right-6 z-50 mix-blend-difference pointer-events-none">
          <p className="font-label text-xs uppercase tracking-[0.4em] text-white/50">
            <span className="current-service-mobile">01</span> / 05
          </p>
        </div>

        {/* SCROLLING CONTENT STACK */}
        <div className="w-full md:w-2/3">
          {SERVICES.map((step) => (
            <div
              key={step.number}
              className="service-section min-h-[120dvh] md:min-h-[100dvh] flex flex-col justify-center items-center text-center px-8 md:px-24 bg-black overflow-hidden border-t border-white/5"
            >
              {/* Massive Background Number */}
              <div
                aria-hidden="true"
                className="step-number text-[220px] md:text-[420px] massive-stroke absolute inset-0 flex items-center justify-center z-0 select-none opacity-10 font-black font-headline tracking-tighter pointer-events-none will-change-transform"
              >
                {step.number}
              </div>

              <div className="section-content relative z-10 w-full flex flex-col items-center select-none opacity-0 pointer-events-none">
                <h3 className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10 text-white">
                  {step.title}
                </h3>

                <p className="font-body text-xl md:text-2xl text-white/80 mx-auto leading-relaxed mb-12 max-w-2xl font-light">
                  <span className="sr-only">{step.description}</span>
                  <span aria-hidden="true">{splitText(step.description)}</span>
                </p>

                {step.tags && (
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {step.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="scrub-tag text-[10px] sm:text-xs font-mono px-5 py-2.5 border border-white/10 text-white/50 uppercase tracking-[0.2em] rounded-full bg-white/[0.03] backdrop-blur-md hover:border-vs-accent/50 hover:text-vs-accent transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
