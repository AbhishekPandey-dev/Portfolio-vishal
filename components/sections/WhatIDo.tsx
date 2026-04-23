"use client";

import { useRef } from "react";
import { Network, Activity, Cpu, Layers } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON_MAP: Record<string, any> = {
  Network,
  Activity,
  Cpu,
  Layers,
};

const PREMIUM_SERVICES = [
  {
    icon: "Network",
    title: "Full-Stack Development",
    description:
      "Custom websites and web applications built for performance, scalability, and real-world use.",
  },
  {
    icon: "Activity",
    title: "UI/UX Design",
    description:
      "Clean, user-focused interfaces designed to improve engagement and usability.",
  },
  {
    icon: "Cpu",
    title: "Shopify Development",
    description:
      "Custom Shopify stores and storefront experiences built to support growth.",
  },
  {
    icon: "Layers",
    title: "WordPress Development",
    description:
      "Flexible, easy-to-manage WordPress websites tailored to your brand.",
  },
  {
    icon: "Network",
    title: "Backend Management",
    description:
      "APIs, databases, integrations, and maintenance to keep your platform running smoothly.",
  },
] as const;

export function WhatIDo() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".service-card");
    
    cards.forEach((card: any) => {
      // Enter from below
      gsap.fromTo(
        card,
        { 
          opacity: 0.1, 
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            end: "center center+=100",
            scrub: 1,
          }
        }
      );
      
      // Fade out dynamically as it scrolls up past center
      gsap.to(card, {
        opacity: 0.3,
        scale: 0.95,
        scrollTrigger: {
          trigger: card,
          start: "center top+=200",
          end: "bottom top",
          scrub: 1,
        }
      });
    });
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="relative w-full bg-vs-background text-white select-none"
    >
      {/* Background AI grid/radial effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,_rgba(0,217,255,0.04)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-0">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* LEFT: Native Sticky Anchor */}
          <div className="w-full md:w-5/12 flex flex-col justify-center md:h-screen md:sticky md:top-0 z-10 pt-16 md:pt-0">
            <SectionLabel>WHAT I DO</SectionLabel>
            <h2 className="text-[clamp(3rem,6vw,6rem)] leading-[1.05] font-headline font-bold tracking-tight mt-6 mb-8 uppercase text-white">
              Services <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vs-accent to-white/70">
                that deliver
              </span><br />
              <span className="opacity-90">results.</span>
            </h2>
            <p className="text-vs-text-secondary text-lg md:text-xl leading-relaxed max-w-md font-body">
              I deliver end-to-end digital solutions, from custom websites and web applications to Shopify stores, WordPress platforms, UI/UX design, and dependable backend support.
            </p>
          </div>

          {/* RIGHT: Scrolling Content */}
          <div className="w-full md:w-7/12 flex flex-col gap-8 md:gap-16 pb-[15vh] md:pb-[30vh]">
            {/* Filler space at top so the first item aligns well on large screens */}
            <div className="hidden md:block h-[20vh]"></div>
            
            {PREMIUM_SERVICES.map((service, index) => {
              const Icon = ICON_MAP[service.icon] || Network;
              return (
                <div 
                  key={index} 
                  className="service-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0A]/50 backdrop-blur-xl p-8 md:p-12 transition-all duration-700 hover:border-vs-accent/40"
                >
                  {/* Cybernetic overlay / Laser scan */}
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-vs-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Number Indicator */}
                  <div className="text-vs-accent/60 font-mono text-sm tracking-widest mb-10">
                    // 0{index + 1}
                  </div>
                  
                  {/* Icon Wrapper */}
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.08] shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:bg-vs-accent/10 group-hover:border-vs-accent/30 transition-all duration-500">
                    <Icon className="w-7 h-7 text-white group-hover:text-vs-accent group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl md:text-4xl font-headline font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-vs-accent transition-all duration-500">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-vs-text-secondary text-base lg:text-lg leading-relaxed font-body group-hover:text-white/80 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Corner accents (Tech/AI aesthetic) */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <span className="w-1 h-1 bg-vs-accent absolute top-2 right-2 rounded-full" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <span className="w-1 h-1 bg-vs-accent absolute bottom-2 left-2 rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
