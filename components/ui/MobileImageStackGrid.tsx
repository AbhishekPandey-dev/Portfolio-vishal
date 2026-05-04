"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function MobileImageStackGrid({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const items = itemsRef.current.filter(Boolean);
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const tl = gsap.timeline({ delay: 0.2 });

    // Initial positioning: stack them in the center of the viewport
    setTimeout(() => {
      items.forEach((item, i) => {
        if (!item) return;
        const imgWrapper = item.querySelector(".img-wrapper");
        const info = item.querySelector(".project-info");
        if (!imgWrapper || !info) return;

        if (i <= 5) {
          const rect = imgWrapper.getBoundingClientRect();
          const scrollY = window.scrollY || window.pageYOffset;
          const dx = cx - (rect.left + rect.width / 2);
          const dy = (cy + scrollY) - (rect.top + scrollY + rect.height / 2);

          gsap.set(imgWrapper, {
            x: dx,
            y: dy,
            rotation: i === 0 ? 0 : Math.random() * 20 - 10,
            scale: i === 0 ? 1.05 : 0.9,
            opacity: 1,
            zIndex: 100 - i
          });
        } else {
          gsap.set(imgWrapper, { opacity: 1, scale: 1 });
        }
        gsap.set(info, { opacity: 0, y: 20 });
      });

      const stackItems = items.slice(0, 6);
      const otherItems = stackItems.slice(1);
      const firstItem = stackItems[0];
      const firstImg = firstItem?.querySelector(".img-wrapper");

      const otherImgs = otherItems.map(item => item?.querySelector(".img-wrapper")).filter(Boolean);
      
      // Intro animation timeline: Burst effect
      tl.to(otherImgs, {
        duration: 0.6,
        ease: "power3.inOut",
        x: () => `+=${Math.random() * 120 - 60}`,
        y: () => `+=${Math.random() * 120 - 60}`,
        rotation: () => Math.random() * 40 - 20,
      }, 0.1)
      .to(otherImgs, {
        duration: 1.0,
        ease: "power4.inOut",
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        clearProps: "zIndex,transform"
      }, 0.7)
      .to(firstImg, {
        duration: 1.0,
        ease: "power4.inOut",
        x: 0,
        y: 0,
        scale: 1,
        clearProps: "zIndex,transform"
      }, 0.7)
      .to(items.map(item => item?.querySelector(".project-info")), {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power2.out"
      }, 1.2);
    }, 100);

    // Scroll Animations
    items.forEach((item) => {
      if (!item) return;
      const img = item.querySelector("img");
      const wrapper = item.querySelector(".img-wrapper");
      if (!img || !wrapper) return;
      
      gsap.fromTo(
        img,
        { scale: 1.25, yPercent: -15 },
        {
          scale: 1.05,
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      
      gsap.fromTo(
        wrapper,
        { rotationX: 10, rotationY: 5, z: -50 },
        {
          rotationX: 0, rotationY: 0, z: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=10%",
            end: "center center",
            scrub: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0a0a0a] text-white pt-[120px] pb-24 overflow-hidden z-50">
      <div className="px-6 mb-20 text-center relative z-10">
        <p className="font-label text-[10px] uppercase tracking-[0.35em] text-white/60 mb-3">
          Work Index
        </p>
        <h1 className="font-headline text-5xl font-black uppercase leading-[0.9] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          Selected Builds
        </h1>
      </div>

      <div className="flex flex-col gap-32 px-6 relative z-10" style={{ perspective: "1000px" }}>
        {projects.map((project, index) => {
          const isDark = project.mood.text === "dark";
          const toneClass = isDark ? "text-black" : "text-white";
          const mutedClass = isDark ? "text-black/70" : "text-white/70";
          
          return (
            <article
              key={project.title}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="relative flex flex-col gap-6"
            >
              <div 
                className="img-wrapper relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl origin-center will-change-transform border border-white/10"
                style={{ 
                  backgroundColor: project.mood.background,
                  boxShadow: `0 20px 60px -15px ${project.mood.background}40, 0 0 20px 0 ${project.mood.accent}20`
                }}
              >
                <div 
                  className="absolute inset-0 opacity-50 mix-blend-overlay z-10 pointer-events-none"
                  style={{ background: `linear-gradient(45deg, ${project.mood.blob1}, ${project.mood.blob2})`}}
                />
                <img
                  src={project.media.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10 pointer-events-none" />
              </div>

              <div 
                className="project-info relative rounded-3xl p-7 -mt-24 mx-4 z-20 shadow-xl will-change-transform"
                style={{
                  background: isDark ? "rgba(255,255,255,0.85)" : "rgba(20,20,20,0.85)",
                  backdropFilter: "blur(20px) saturate(1.5)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                  border: `1px solid ${isDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)"}`
                }}
              >
                <div 
                  className="absolute top-0 left-0 w-full h-[2px] rounded-t-3xl overflow-hidden" 
                  style={{ background: `linear-gradient(90deg, ${project.mood.accent}, transparent)` }} 
                />

                <div className="flex justify-between items-center mb-5">
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((cat: string) => (
                      <span key={cat} className={`px-2.5 py-1 rounded-full font-label text-[9px] uppercase tracking-[0.25em] ${mutedClass} border ${isDark ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  <span className={`font-headline font-black text-2xl ${mutedClass} opacity-50`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className={`font-headline text-4xl font-black uppercase leading-[0.9] tracking-tight mb-5 ${toneClass}`}>
                  {project.title}
                </h2>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className={`px-2 py-0.5 font-label text-[9px] uppercase tracking-[0.15em] ${mutedClass} bg-black/5 dark:bg-white/5 rounded-md`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl px-5 py-3.5 font-label text-[11px] uppercase tracking-[0.2em] font-bold transition-all active:scale-[0.98]"
                    style={{
                      background: project.mood.accent,
                      color: project.mood.text === "light" ? "#fff" : "#000",
                      boxShadow: `0 4px 14px ${project.mood.accent}40`
                    }}
                  >
                    View Project
                    <ArrowUpRight size={14} strokeWidth={2.5} />
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
