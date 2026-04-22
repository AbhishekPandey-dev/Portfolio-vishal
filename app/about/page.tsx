"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Magnetic } from "@/components/ui/Magnetic";

const CAREER_TIMELINE = [
  { 
    company: "Pixelforge", 
    role: "Full Stack Developer", 
    period: "2023 — Present",
    description: "Leading architectural decisions and building high-impact digital products."
  },
  { 
    company: "Digitaltek", 
    role: "Software Engineer", 
    period: "2022 — 2023",
    description: "Focused on scalable backend systems and modern frontend performance."
  },
  { 
    company: "The Loom", 
    role: "Full Stack Developer", 
    period: "2021 — 2022",
    description: "Crafting editorial digital experiences for premium brands."
  },
  { 
    company: "Commerce Pundit", 
    role: "Web Developer", 
    period: "2020 — 2021",
    description: "Specialized in high-conversion e-commerce solutions."
  },
  { 
    company: "Digital Impression", 
    role: "Junior Web Developer", 
    period: "2019 — 2020",
    description: "Started the journey focusing on interactive web designs."
  },
];

const TECH_ICONS = [
  "JAVASCRIPT.png", "TYPESCRIPT.png", "REACT.png", "NODE JS.png", 
  "MONGO DB.png", "TAILWIND.png", "GIT.png", "GITHUB.png",
  "HTML5.png", "PHP.png", "PYTHON.png", "WORDPRESS.png", "SHOPIFY.png"
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] text-white min-h-screen selection:bg-white selection:text-[#0A0A0A]">
      
      {/* Hero / Manifesto Section */}
      <section className="pt-48 pb-32 px-8 flex flex-col justify-center max-w-7xl mx-auto">
        <SectionLabel>The Manifesto</SectionLabel>
        
        <div className="mt-12 flex flex-col gap-6">
          <RevealText>
            <h1 className="font-headline text-5xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter uppercase">
              Architecting
            </h1>
          </RevealText>
          <RevealText>
            <h1 className="font-headline text-5xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter uppercase text-white/20 italic">
              Digital Reality
            </h1>
          </RevealText>
        </div>

        <div className="mt-24 md:mt-32 max-w-3xl ml-auto">
          <RevealText>
            <p className="font-headline text-2xl md:text-4xl font-light leading-tight text-white/80">
              I am a full stack developer & UI/UX designer. I build experiences that exist at the collision point of raw, uncompromising performance and high-end editorial design.
            </p>
          </RevealText>
        </div>
      </section>

      {/* Brutalist Career Chronicle */}
      <section className="py-32 w-full border-t border-white/10">
        <div className="px-8 max-w-7xl mx-auto mb-20">
          <SectionLabel>Experience</SectionLabel>
        </div>
        
        <div className="flex flex-col w-full border-t border-white/10">
          {CAREER_TIMELINE.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between py-16 px-8 hover:bg-white hover:text-[#0A0A0A] transition-colors duration-500 cursor-default"
            >
              <div className="flex-1 text-sm md:text-xl font-headline tracking-widest uppercase opacity-40 group-hover:opacity-80 transition-opacity mb-4 lg:mb-0">
                {item.period}
              </div>
              
              <div className="flex-[2] font-headline text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 lg:mb-0">
                {item.company}
              </div>
              
              <div className="flex-1 flex flex-col gap-2 lg:text-right">
                <span className="font-headline text-xl md:text-2xl uppercase tracking-widest">{item.role}</span>
                <p className="text-sm md:text-base opacity-40 group-hover:opacity-100 transition-opacity lg:ml-auto max-w-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Arsenal Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <SectionLabel>Tech Arsenal</SectionLabel>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {TECH_ICONS.map((icon, idx) => {
            const name = icon.replace(".png", "").replace("-", " ");
            return (
              <motion.div 
                key={icon}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="aspect-square bg-[#0A0A0A] flex flex-col items-center justify-center p-8 group relative overflow-hidden"
              >
                <Magnetic>
                  <img 
                    src={`/assets/tech-icons/${icon}`} 
                    alt={name}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out" 
                  />
                </Magnetic>
                <span className="absolute bottom-4 font-headline text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>


    </div>
  );
}
