"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Magnetic } from "@/components/ui/Magnetic";
import { gsap } from "@/lib/gsap";

const CAREER_TIMELINE = [
  { 
    company: "Pixelforge", 
    role: "Full Stack Developer", 
    period: "2023 — Present",
    description: "Leading architectural decisions and building high-impact digital products for the next generation of the web."
  },
  { 
    company: "Digitaltek", 
    role: "Software Engineer", 
    period: "2022 — 2023",
    description: "Focused on scalable backend systems and modern frontend performance optimization at scale."
  },
  { 
    company: "The Loom", 
    role: "Full Stack Developer", 
    period: "2021 — 2022",
    description: "Crafting editorial digital experiences for premium brands with a focus on motion and interaction."
  },
  { 
    company: "Commerce Pundit", 
    role: "Web Developer", 
    period: "2020 — 2021",
    description: "Specialized in high-conversion e-commerce solutions and enterprise-grade web applications."
  },
  { 
    company: "Digital Impression", 
    role: "Junior Web Developer", 
    period: "2019 — 2020",
    description: "Started the journey focusing on interactive web designs and frontend fundamentals."
  },
];

const TECH_CATEGORIES = [
  {
    category: "Frontend",
    id: "FRONT-01",
    items: [
      { name: "JavaScript", icon: "JAVASCRIPT.png" },
      { name: "TypeScript", icon: "TYPESCRIPT.png" },
      { name: "React", icon: "REACT.png" },
      { name: "Tailwind CSS", icon: "TAILWIND.png" },
      { name: "HTML5", icon: "HTML5.png" },
    ]
  },
  {
    category: "Backend",
    id: "BACK-02",
    items: [
      { name: "Node.js", icon: "NODE JS.png" },
      { name: "PHP", icon: "PHP.png" },
      { name: "Python", icon: "PYTHON.png" },
    ]
  },
  {
    category: "Database",
    id: "DATA-03",
    items: [
      { name: "MongoDB", icon: "MONGO DB.png" },
      { name: "Redis", icon: "REDIS.png" },
      { name: "Firebase", icon: "FIREBASE.png" },
    ]
  },
  {
    category: "Tools",
    id: "TOOL-04",
    items: [
      { name: "Git", icon: "GIT.png" },
      { name: "GitHub", icon: "GITHUB.png" },
      { name: "NPM", icon: "NPM.png" },
      { name: "WordPress", icon: "WORDPRESS.png" },
      { name: "Shopify", icon: "SHOPIFY.png" },
    ]
  }
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Liquid Smooth Scroll Skew Effect
      const items = containerRef.current?.querySelectorAll(".group");
      if (!items || items.length === 0) return;

      let proxy = { skew: 0 };
      let skewSetter = gsap.quickSetter(items, "skewY", "deg");
      let clamp = gsap.utils.clamp(-2, 2);

      gsap.registerPlugin(gsap.utils.toArray("ScrollTrigger") ? [] : []); // Ensure ScrollTrigger is ready if used

      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        
        let mm = gsap.matchMedia();
        
        mm.add("(min-width: 1024px)", () => {
          ScrollTrigger.create({
            onUpdate: (self) => {
              let skew = clamp(self.getVelocity() / -500);
              if (Math.abs(skew) > Math.abs(proxy.skew)) {
                proxy.skew = skew;
                gsap.to(proxy, {
                  skew: 0,
                  duration: 0.8,
                  ease: "power3",
                  overwrite: true,
                  onUpdate: () => skewSetter(proxy.skew)
                });
              }
            }
          });
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-vs-background text-vs-foreground min-h-screen relative selection:bg-vs-accent selection:text-black">
      
      {/* Page Transition Curtain */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-vs-accent z-[1000] pointer-events-none origin-bottom"
      />

      {/* Subtle Bottom Curtain for Exit or Layering */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed inset-0 bg-vs-foreground z-[999] pointer-events-none origin-top"
      />
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero / Manifesto Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="max-w-[100rem] mx-auto w-full pt-32 pb-20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-12 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "40px" }}
              className="h-px bg-vs-accent"
            />
            <SectionLabel className="m-0 text-vs-accent tracking-[0.4em]">MANIFESTO_v2.5</SectionLabel>
          </div>
          
          <div className="relative">
            <RevealText className="mb-[-2vw]">
              <h1 className="font-display text-[15vw] md:text-[13vw] font-black leading-[0.85] tracking-[0.04em] uppercase flex flex-col">
                <span className="block">Architecting</span>
              </h1>
            </RevealText>
            <RevealText delay={0.1}>
              <h1 className="font-display text-[15vw] md:text-[13vw] font-black leading-[0.85] tracking-[0.04em] uppercase text-vs-background text-stroke italic pl-[5vw]">
                Digital Reality
              </h1>
            </RevealText>
          </div>

          <div className="mt-20 md:mt-32 max-w-3xl ml-auto">
            <RevealText delay={0.3}>
              <p className="font-headline text-2xl md:text-4xl lg:text-5xl font-light leading-[1.2] text-vs-text-secondary">
                I am a full stack developer & UI/UX designer. I build experiences that exist at the <span className="text-vs-foreground italic">collision point</span> of raw performance and editorial design.
              </p>
            </RevealText>
          </div>
        </motion.div>

        {/* Floating background elements */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-vs-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-vs-accent/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* Brutalist Career Chronicle */}
      <section className="py-32 w-full border-t border-vs-outline/20">
        <div className="px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto mb-20 flex items-end justify-between">
          <SectionLabel>EXPERIENCE_CHRONICLE</SectionLabel>
          <div className="hidden md:block font-mono text-[10px] opacity-30 tracking-[0.3em] uppercase">
            SCROLL_TO_EXPLORE_HISTORY
          </div>
        </div>
        
        <div className="flex flex-col w-full border-t border-vs-outline/20">
          {CAREER_TIMELINE.map((item, idx) => (
              <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="group relative border-b border-vs-outline/20 flex flex-col lg:flex-row lg:items-center justify-between py-20 px-6 md:px-12 lg:px-24 hover:bg-vs-foreground hover:text-vs-background transition-colors duration-500 cursor-none"
            >
              <div className="flex-1 text-xs md:text-sm font-headline tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity mb-4 lg:mb-0">
                {item.period}
              </div>
              
              <motion.div 
                style={{ skewY: useTransform(scrollYProgress, [0, 1], [0, 2]) }}
                className="flex-[2] font-display text-7xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-[0.02em] mb-8 lg:mb-0 leading-[0.85]"
              >
                {item.company}
              </motion.div>
              
              <div className="flex-1 flex flex-col gap-4 lg:text-right">
                <span className="font-headline text-xl md:text-3xl uppercase tracking-tighter font-bold text-vs-accent group-hover:text-vs-background transition-colors">{item.role}</span>
                <p className="text-sm md:text-base opacity-40 group-hover:opacity-80 transition-opacity lg:ml-auto max-w-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover custom cursor effect placeholder or detail */}
              <div className="absolute right-12 bottom-12 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-widest hidden lg:block underline">
                VIEW_DETAILS
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Arsenal Categorized List */}
      <section className="py-32 w-full border-t border-vs-outline/20 bg-vs-surface/30">
        <div className="px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto mb-20">
          <SectionLabel className="text-vs-accent">STACK_INVENTORY</SectionLabel>
        </div>
        
        <div className="flex flex-col w-full">
          {TECH_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="group border-t border-vs-outline/20 flex flex-col lg:flex-row gap-12 lg:gap-40 py-20 lg:py-32 px-6 md:px-12 lg:px-24 lg:hover:bg-vs-foreground/[0.01] transition-colors duration-1000"
            >
              <div className="lg:w-[40%] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] text-vs-accent mb-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    {category.id}
                  </div>
                  <h3 className="font-display text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[9rem] xl:text-[11rem] font-black text-vs-foreground lg:text-vs-outline/20 uppercase tracking-[0.02em] break-words lg:group-hover:text-vs-foreground transition-all duration-700 leading-[0.85] lg:group-hover:scale-[1.02] origin-left">
                    {category.category}
                  </h3>
                </div>
                <div className="hidden lg:block h-px w-0 group-hover:w-full bg-vs-outline/20 transition-all duration-1000 mt-12" />
              </div>
              
              <div className="lg:w-[60%] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 sm:gap-x-10 md:gap-x-12 xl:gap-x-14 gap-y-10 sm:gap-y-14 md:gap-y-16 xl:gap-y-20 items-center content-center w-full">
                {category.items.map((item, i) => (
                  <Magnetic key={item.name}>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="flex flex-col items-center gap-4 sm:gap-6 cursor-pointer transition-all duration-500 group/icon lg:hover:scale-110"
                    >
                      <div className="relative">
                        <img 
                          src={`/assets/tech-icons/${item.icon}`} 
                          alt={item.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain grayscale-0 lg:grayscale lg:opacity-40 lg:group-hover/icon:grayscale-0 lg:group-hover/icon:opacity-100 transition-all duration-500" 
                        />
                        <div className="absolute -inset-4 bg-vs-accent/10 rounded-full blur-2xl hidden lg:block opacity-0 group-hover/icon:opacity-100 transition-opacity -z-10" />
                      </div>
                      <span className="font-headline text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-vs-accent lg:text-vs-text-secondary lg:group-hover/icon:text-vs-accent transition-colors text-center text-balance w-full">
                        {item.name}
                      </span>
                    </motion.div>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-vs-outline/20 w-full" />
        </div>
      </section>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-vs-outline/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-[20%] w-px h-full bg-vs-outline/5 pointer-events-none hidden lg:block" />

    </div>
  );
}
