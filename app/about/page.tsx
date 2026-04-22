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

const TECH_CATEGORIES = [
  {
    category: "Frontend",
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
    items: [
      { name: "Node.js", icon: "NODE JS.png" },
      { name: "PHP", icon: "PHP.png" },
      { name: "Python", icon: "PYTHON.png" },
    ]
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: "MONGO DB.png" },
      { name: "Redis", icon: "REDIS.png" },
      { name: "Firebase", icon: "FIREBASE.png" },
    ]
  },
  {
    category: "Tools",
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

      {/* Tech Arsenal Categorized List */}
      <section className="py-32 w-full border-t border-white/10">
        <div className="px-8 max-w-7xl mx-auto mb-20">
          <SectionLabel>Tech Arsenal</SectionLabel>
        </div>
        
        <div className="flex flex-col w-full">
          {TECH_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group border-t border-white/10 flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-32 py-16 px-8 hover:bg-white/[0.02] transition-colors duration-500"
            >
              <div className="md:w-1/3">
                <h3 className="font-headline text-6xl md:text-7xl lg:text-8xl font-black text-white/20 uppercase tracking-tighter break-all md:break-normal group-hover:text-white/40 transition-colors duration-500">
                  {category.category}
                </h3>
              </div>
              
              <div className="md:w-2/3 flex flex-wrap gap-x-8 gap-y-10 items-center">
                {category.items.map(item => (
                  <Magnetic key={item.name}>
                    <div className="flex items-center gap-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300">
                      <img 
                        src={`/assets/tech-icons/${item.icon}`} 
                        alt={item.name}
                        className="w-10 h-10 md:w-12 md:h-12 object-contain" 
                      />
                      <span className="font-headline text-xs md:text-sm font-bold tracking-[0.15em] uppercase">
                        {item.name}
                      </span>
                    </div>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10 w-full" />
        </div>
      </section>


    </div>
  );
}
