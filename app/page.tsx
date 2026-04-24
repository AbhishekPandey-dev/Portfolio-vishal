import {
  FloatingIconsHero,
  type IconProps,
} from "@/components/ui/floating-icons-hero-section";
import ShinyText from "@/components/ui/ShinyText";
import { SignatureQuote } from "@/components/sections/SignatureQuote";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { ByTheNumbers } from "@/components/sections/ByTheNumbers";
import { ExperienceShowcase } from "@/components/sections/ExperienceShowcase";

const demoIcons: IconProps[] = [
  // Top Outer Ring - Essential (Always Visible)
  {
    id: 1,
    imageUrl: "REACT.png",
    alt: "", // Decorative: hidden from screen readers to prevent noise
    className: "top-[10%] left-[5%] md:top-[18%] md:left-[5%]",
  },
  {
    id: 2,
    imageUrl: "NODE JS.png",
    alt: "",
    className: "top-[10%] right-[5%] md:top-[18%] md:right-[5%]",
  },
  {
    id: 3,
    imageUrl: "TYPESCRIPT.png",
    alt: "",
    className: "hidden md:block top-[12%] left-[33%]", // Hidden on mobile to avoid title overlap
  },
  {
    id: 4,
    imageUrl: "MONGO DB.png",
    alt: "",
    className: "hidden md:block top-[12%] right-[33%]",
  },

  // Side Rails
  {
    id: 5,
    imageUrl: "JAVASCRIPT.png",
    alt: "",
    className: "top-[40%] left-[2%] md:top-[30%] md:left-[2%]",
  },
  {
    id: 6,
    imageUrl: "HTML5.png",
    alt: "",
    className: "top-[40%] right-[2%] md:top-[30%] md:right-[2%]",
  },
  {
    id: 7,
    imageUrl: "TAILWIND.png",
    alt: "",
    className: "hidden sm:block top-[60%] left-[2%]", // Hidden on extra small screens
  },
  {
    id: 8,
    imageUrl: "BOOTSTRAP.png",
    alt: "",
    className: "hidden sm:block top-[60%] right-[2%]",
  },

  // Bottom Outer Ring - Essential
  {
    id: 9,
    imageUrl: "GITHUB.png",
    alt: "",
    className: "bottom-[15%] left-[5%] md:bottom-[5%] md:left-[5%]",
  },
  {
    id: 10,
    imageUrl: "GIT.png",
    alt: "",
    className: "bottom-[15%] right-[5%] md:bottom-[5%] md:right-[5%]",
  },
  {
    id: 11,
    imageUrl: "PYTHON.png",
    alt: "",
    className: "hidden md:block bottom-[5%] left-[30%]",
  },
  {
    id: 12,
    imageUrl: "PHP.png",
    alt: "",
    className: "hidden md:block bottom-[5%] right-[30%]",
  },

  // Floating Accents (Extreme edges - Desktop Only)
  {
    id: 13,
    imageUrl: "SHOPIFY.png",
    alt: "",
    className: "hidden lg:block top-[25%] left-[12%]",
  },
  {
    id: 14,
    imageUrl: "WORDPRESS.png",
    alt: "",
    className: "hidden lg:block top-[25%] right-[12%]",
  },
  {
    id: 15,
    imageUrl: "JAVA.png",
    alt: "",
    className: "hidden lg:block bottom-[20%] left-[12%]",
  },
  {
    id: 16,
    imageUrl: "REDIS.png",
    alt: "",
    className: "hidden lg:block bottom-[20%] right-[12%]",
  },
];

export default function Home() {
  const subtitleText = "Full Stack Web Developer | UI/UX Designer | 8+ Years Experience";

  return (
    <>
      {/* Accessibility: Skip to main content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:rounded-md transition-all shadow-lg"
      >
        Skip to main content
      </a>

      <main id="main-content" className="flex min-h-screen flex-col w-full bg-background">
        {/* Section 1: Hero — Antigravity Entry */}
        <section aria-label="Hero Section" className="relative w-full">
          <FloatingIconsHero
            title="Vishal Singh"
            subtitle={
              <div
                className="mx-auto max-w-[95%] text-balance md:max-w-none"
                aria-label={subtitleText}
              >
                {/* Visual shiny text, hidden from screen readers to prevent fragmented reading */}
                <div aria-hidden="true">
                  <ShinyText
                    text={subtitleText}
                    disabled={false}
                    speed={3}
                    delay={2}
                    spread={45}
                    className="text-base sm:text-lg md:text-2xl font-black tracking-normal md:tracking-tighter font-headline transition-opacity block"
                    color="#a1a1a1"
                  />
                </div>
              </div>
            }
            icons={demoIcons}
            className="bg-black"
          />
        </section>

        {/* Section 2: Signature Quote */}
        <SignatureQuote />

        {/* Section 3: Selected Work (3 projects, ~300vh) */}
        <SelectedWork />

        {/* Section 4: What I Do — Services */}
        <WhatIDo />

        {/* Section 5: By The Numbers — Social Proof */}
        <ByTheNumbers />

        {/* Section 6: Experience & Clients */}
        <ExperienceShowcase />
      </main>
    </>
  );
}
