"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Custom interface assuming typical project structure based on previous usage
interface Project {
  title: string;
  url: string;
  displayUrl?: string;
  categories: string[];
  tags: string[];
  media: { image: string };
  mood: {
    text: "dark" | "light";
    background: string;
    blob1: string;
    blob2: string;
    accent: string;
  };
}

export function MobileImageStackGrid({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    const items = itemsRef.current.filter(Boolean) as HTMLElement[];
    if (items.length === 0) return;

    let ctx = gsap.context(() => {
      // Step 1: Hide everything initially to prevent FOUC
      gsap.set(items, { opacity: 0 });
      
      // Step 2: Ensure layout calculates correctly before starting animations
      requestAnimationFrame(() => {
        setIsReady(true);
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const scrollY = window.scrollY || window.pageYOffset;
        
        const tl = gsap.timeline({ 
          delay: 0.1,
          defaults: { ease: "power4.out" } 
        });

        // Step 3: Position the first 5 items tightly in the center of the viewport
        const stackItems = items.slice(0, 5);
        
        stackItems.forEach((item, i) => {
          const rect = item.getBoundingClientRect();
          const itemCx = rect.left + rect.width / 2;
          const itemCy = rect.top + scrollY + rect.height / 2;
          
          const dx = cx - itemCx;
          const dy = (cy + scrollY) - itemCy;

          gsap.set(item, {
            x: dx,
            y: dy,
            rotation: i === 0 ? 0 : (Math.random() * 16 - 8),
            scale: 1 - (i * 0.05), // slightly smaller as they go back
            opacity: 1,
            zIndex: 100 - i,
            transformOrigin: "center center"
          });
          
          // Hide info cards initially
          const info = item.querySelector(".project-info");
          if (info) gsap.set(info, { opacity: 0, y: 30 });
        });

        // Set remaining items to their normal flow positions, but hidden
        const remainingItems = items.slice(5);
        if (remainingItems.length > 0) {
          gsap.set(remainingItems, { opacity: 0, y: 100, scale: 0.95 });
        }

        // Step 4: The Burst Animation
        // "Deal" the cards out to their actual layout positions
        tl.to(stackItems, {
          duration: 1.2,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          ease: "expo.inOut",
          stagger: 0.05,
          clearProps: "zIndex,transformOrigin" // Keep transforms clean after intro
        }, 0.2);

        // Reveal the remaining items as they scroll into view (or immediately if visible)
        if (remainingItems.length > 0) {
          tl.to(remainingItems, {
            duration: 1,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power3.out",
            stagger: 0.1
          }, 0.8);
        }

        // Fade in the info cards with a slight bounce
        tl.to(".project-info", {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "back.out(1.2)",
          stagger: 0.08
        }, 1.0);

        // Step 5: Setup ScrollTrigger Parallax & Reveal Effects
        items.forEach((item) => {
          const img = item.querySelector("img");
          const info = item.querySelector(".project-info");
          
          if (img) {
            // Smooth parallax on the image with high inertia (scrub: 1.8)
            gsap.fromTo(img,
              { yPercent: -15, scale: 1.15 },
              {
                yPercent: 15,
                scale: 1.05,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.8,
                  fastScrollEnd: true
                }
              }
            );
          }

          // Liquid 3D tilt effect with deep delay (scrub: 2.2)
          gsap.fromTo(item,
            { 
              rotationX: 10, 
              rotationY: 2, 
              z: -60, 
              opacity: 0.8,
              skewY: 2 
            },
            {
              rotationX: 0, 
              rotationY: 0, 
              z: 0, 
              opacity: 1,
              skewY: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=10%",
                end: "center center+=20%",
                scrub: 2.2,
                fastScrollEnd: true
              }
            }
          );

          // Secondary Parallax for Info Card (Depth Layering)
          if (info) {
            gsap.to(info, {
              y: -50,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
              }
            });
          }
        });

        // Step 6: Global Velocity-based Skew (The "Delayed Scroll" secret)
        let proxy = { skew: 0 };
        let setSkew = gsap.quickSetter(items, "skewY", "deg");
        let clamp = gsap.utils.clamp(-3, 3);

        ScrollTrigger.create({
          onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -400);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: "power3",
                overwrite: true,
                onUpdate: () => setSkew(proxy.skew)
              });
            }
          }
        });
      });
    }, containerRef); // Scope everything to containerRef!

    return () => ctx.revert(); // Flawless cleanup
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0a0a0a] text-white pt-[120px] pb-32 overflow-hidden z-50">
      {/* Header Section */}
      <div className="px-6 mb-16 text-center relative z-10">
        <p className="font-label text-[10px] uppercase tracking-[0.35em] text-white/50 mb-3">
          Work Index
        </p>
        <h1 className="font-headline text-[2.75rem] font-black uppercase leading-[0.9] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Selected Builds
        </h1>
      </div>

      {/* Projects Grid */}
      <div 
        className="flex flex-col gap-16 px-5 relative z-10" 
        style={{ perspective: "1200px" }}
      >
        {projects.map((project, index) => {
          const isDark = project.mood.text === "dark";
          const toneClass = isDark ? "text-black" : "text-white";
          const mutedClass = isDark ? "text-black/70" : "text-white/70";
          const borderColor = isDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)";
          
          return (
            <article
              key={project.title}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group relative w-full aspect-[4/5] max-h-[650px] rounded-[2.5rem] overflow-hidden will-change-transform shadow-2xl"
              style={{ 
                backgroundColor: project.mood.background,
                // Make opacity 0 initially to avoid FOUC
                opacity: isReady ? 1 : 0, 
                visibility: isReady ? "visible" : "hidden"
              }}
            >
              {/* Animated Background Mesh */}
              <div 
                className="absolute inset-0 opacity-60 mix-blend-overlay z-0 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${project.mood.blob1}, ${project.mood.blob2})`}}
              />
              
              {/* Parallax Image */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
                <img
                  src={project.media.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform-gpu"
                />
              </div>
              
              {/* Beautiful Scrim / Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

              {/* Floating Glassmorphic Info Card */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div 
                  className="project-info rounded-[1.8rem] p-6 shadow-2xl transition-all duration-300 active:scale-[0.98] active:brightness-95"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.9)" : "rgba(15,15,15,0.9)",
                    backdropFilter: "blur(32px) saturate(1.8)",
                    WebkitBackdropFilter: "blur(32px) saturate(1.8)",
                    border: `1px solid ${borderColor}`,
                    boxShadow: `0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px 0 ${project.mood.accent}20`
                  }}
                >
                  {/* Glowing Top Border */}
                  <div 
                    className="absolute top-0 left-0 w-full h-[3px] rounded-t-[1.8rem] overflow-hidden" 
                    style={{ background: `linear-gradient(90deg, ${project.mood.accent}, transparent, ${project.mood.accent})` }} 
                  />

                  {/* Meta Details */}
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex flex-wrap gap-2">
                      {project.categories.slice(0, 2).map((cat: string) => (
                        <span key={cat} className={`px-3 py-1 rounded-full font-label text-[9px] uppercase tracking-[0.25em] ${mutedClass} border ${borderColor} backdrop-blur-sm`}>
                          {cat}
                        </span>
                      ))}
                    </div>
                    <span className={`font-headline font-black text-2xl ${mutedClass} opacity-40 tabular-nums`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className={`font-headline text-[2.25rem] font-black uppercase leading-[0.85] tracking-tight mb-5 ${toneClass}`}>
                    {project.title}
                  </h2>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.tags.slice(0, 4).map((tag: string) => (
                      <span key={tag} className={`px-2.5 py-1 font-label text-[8px] uppercase tracking-[0.15em] ${mutedClass} bg-black/5 dark:bg-white/5 rounded-lg border ${borderColor}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center gap-3 rounded-2xl px-6 py-5 font-label text-[11px] uppercase tracking-[0.25em] font-black transition-all hover:brightness-110 active:scale-[0.96] overflow-hidden group/btn"
                    style={{
                      background: project.mood.accent,
                      color: project.mood.text === "light" ? "#fff" : "#000",
                      boxShadow: `0 12px 28px ${project.mood.accent}40`
                    }}
                  >
                    View Project
                    <ArrowUpRight size={16} strokeWidth={3} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
