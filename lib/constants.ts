// All homepage content data — keeps components clean

export interface ProjectMedia {
  type: "image" | "video";
  src?: string;
  webm?: string;
  mp4?: string;
  mobileSrc: string;
}

export interface ProjectData {
  title: string;
  url: string;
  displayUrl: string;
  tags: string;
  categories: string[];
  media: ProjectMedia;
  // For the Selected Work section (homepage showcase)
  description?: string;
  metrics?: string;
}

// 4 flagship projects for the homepage — VIDEO ONLY for maximum cinematic impact
export const SELECTED_PROJECTS: ProjectData[] = [
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
    description:
      "High-performance beauty e-commerce with immersive product showcases, custom animations, and a seamless mobile shopping experience trusted by 500K+ monthly users.",
    metrics: "500K+ monthly users · 35% conversion lift",
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
    description:
      "A luxurious digital flagship for India's premier resort wear brand. Editorial layouts, fluid storytelling, and a bespoke checkout journey that mirrors haute couture.",
    metrics: "Luxury Segment · 2x AOV increase",
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
    description:
      "Redefined online jewellery retail with a bespoke Shopify storefront, custom CMS, and cinematic product presentations for one of India's most coveted accessories brands.",
    metrics: "Premium Retail · 60% mobile revenue",
  },
  {
    title: "Cord Studio",
    url: "https://www.cordstudio.in/",
    displayUrl: "www.cordstudio.in",
    tags: "Shopify | GSAP | Svelte | Preact | PhotoSwipe",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: {
      type: "video",
      webm: "/images/cordstudio.webm",
      mp4: "/images/cordstudio.mp4",
      mobileSrc: "/images/mobile-img/cordstudio.png",
    },
    description:
      "A contemporary Shopify store for a modern lifestyle brand — GSAP-powered transitions, PhotoSwipe galleries, and performance-first architecture for a silky-smooth UX.",
    metrics: "Core Web Vitals A+ · 50% load time reduction",
  },
];

// All projects for the work page / experience showcase
export const ALL_PROJECTS: ProjectData[] = [
  {
    title: "Transform Health",
    url: "https://transformhealthcoalition.org/",
    displayUrl: "www.transformhealthcoalition.org",
    tags: "Wordpress | UI/UX Design | GSAP | MySQL | Cloudflare",
    categories: ["WordPress", "UI/UX Design"],
    media: { type: "image", src: "/images/transformhealth.png", mobileSrc: "/images/mobile-img/transformhealth.png" },
  },
  {
    title: "Nappa Dori",
    url: "https://www.nappadori.com/",
    displayUrl: "www.nappadori.com",
    tags: "UI/UX Design | Shopify | GSAP | React | Photoswipe",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: { type: "image", src: "/images/nappadori.png", mobileSrc: "/images/mobile-img/nappadori.png" },
  },
  {
    title: "Shivan & Narresh",
    url: "https://www.shivanandnarresh.com/",
    displayUrl: "www.shivanandnarresh.com",
    tags: "Shopify | jQuery | AWS | Cloudflare | Klaviyo",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/shivanandnarresh.webm", mp4: "/images/shivanandnarresh.mp4", mobileSrc: "/images/mobile-img/shivanandnarresh.png" },
  },
  {
    title: "Chashma",
    url: "https://chashma.com/",
    displayUrl: "www.chashma.com",
    tags: "Shopify | Firebase | Swiper | jQuery | Font Awesome",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/chashma.webm", mp4: "/images/chashma.mp4", mobileSrc: "/images/mobile-img/chashma.png" },
  },
  {
    title: "Shaz & Kiks",
    url: "https://www.shazandkiks.com/",
    displayUrl: "www.shazandkiks.com",
    tags: "UI/UX Design | Shopify | Klaviyo | React | Styled-Components",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: { type: "video", webm: "/images/shazsiks.webm", mp4: "/images/shazsiks.mp4", mobileSrc: "/images/mobile-img/shazkiks.png" },
  },
  {
    title: "Swiss Beauty",
    url: "https://swissbeauty.in/",
    displayUrl: "www.swissbeauty.in",
    tags: "Shopify | Tailwind CSS | PhotoSwipe | Keen-Slider | CustomFit",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/swissbeauty.webm", mp4: "/images/swissbeauty.mp4", mobileSrc: "/images/mobile-img/swissbeauty.png" },
  },
  {
    title: "Artisan Lab",
    url: "https://www.artisanlab.in/",
    displayUrl: "www.artisanlab.in",
    tags: "Shopify | UI/UX Design | PhotoSwipe | Svelte | Flickity",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: { type: "image", src: "/images/artisanlab.jpg", mobileSrc: "/images/mobile-img/artisanlab.png" },
  },
  {
    title: "Outhouse Jewellery",
    url: "https://outhouse-jewellery.com/",
    displayUrl: "www.outhouse-jewellery.com",
    tags: "Shopify | BugSnag | React | Google Ads | Preact | Swiper | Custom CMS",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/outhousejewellery.webm", mp4: "/images/outhousejewellery.mp4", mobileSrc: "/images/mobile-img/outhouse.png" },
  },
  {
    title: "Jan & April",
    url: "https://janandapril.com/",
    displayUrl: "www.janandapril.com",
    tags: "Shopify | jQuery | AWS | Cloudflare | Klaviyo",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/janandapril.webm", mp4: "/images/janandapril.mp4", mobileSrc: "/images/mobile-img/janandapril.png" },
  },
  {
    title: "Manan Design",
    url: "https://www.manandesign.com/",
    displayUrl: "www.manandesign.com",
    tags: "Shopify | UI/UX Design | GSAP | PhotoSwipe | Swiper | Custom CMS",
    categories: ["Shopify", "UI/UX Design", "E-Commerce"],
    media: { type: "video", webm: "/images/manandesign.webm", mp4: "/images/manandesign.mp4", mobileSrc: "/images/mobile-img/manan.png" },
  },
  {
    title: "Perona",
    url: "https://www.perona.com/",
    displayUrl: "www.perona.com",
    tags: "Shopify | GSAP | Preact | jQuery UI | Swiper | Klaviyo",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/perona.webm", mp4: "/images/perona.mp4", mobileSrc: "/images/mobile-img/perona.png" },
  },
  {
    title: "Orange Tree",
    url: "https://www.orangetree.in/",
    displayUrl: "www.orangetree.in",
    tags: "Shopify | Bootstrap | Vue.js | GSAP | MobX | Google Ads",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/orangetree.webm", mp4: "/images/orangetree.mp4", mobileSrc: "/images/mobile-img/orangetree.png" },
  },
  {
    title: "OnCloud9",
    url: "https://oncloud9.com/",
    displayUrl: "www.oncloud9.com",
    tags: "Shopify | React | Google Analytics | Sentry",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/oncloud9.webm", mp4: "/images/oncloud9.mp4", mobileSrc: "/images/mobile-img/cloud9.png" },
  },
  {
    title: "Idus",
    url: "https://idus.in/",
    displayUrl: "www.idus.in",
    tags: "Shopify | AWS | Scrollreveal | jQuery",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/idus.webm", mp4: "/images/idus.mp4", mobileSrc: "/images/mobile-img/idus.png" },
  },
  {
    title: "Janavi",
    url: "https://www.janavi.com/",
    displayUrl: "www.janavi.com",
    tags: "Shopify | BugSnag | Cloudflare | Babel | Custom CMS",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "image", src: "/images/janvi.webp", mobileSrc: "/images/mobile-img/janavi.png" },
  },
  {
    title: "Cord Studio",
    url: "https://www.cordstudio.in/",
    displayUrl: "www.cordstudio.in",
    tags: "Shopify | GSAP | Svelte | Preact | PhotoSwipe",
    categories: ["Shopify", "E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/cordstudio.webm", mp4: "/images/cordstudio.mp4", mobileSrc: "/images/mobile-img/cordstudio.png" },
  },
  {
    title: "Lily Ann Cabinets",
    url: "https://www.lilyanncabinets.com/",
    displayUrl: "www.lilyanncabinets.com",
    tags: "Magento | Custom Web Development | MySQL | AWS",
    categories: ["E-Commerce", "UI/UX Design"],
    media: { type: "video", webm: "/images/lilyanncabinets.webm", mp4: "/images/lilyanncabinets.mp4", mobileSrc: "/images/mobile-img/lilyanncabinets.png" },
  },
  {
    title: "Ava Cabinetry",
    url: "https://www.avacabinetry.com/",
    displayUrl: "www.avacabinetry.com",
    tags: "Magento | Custom Web Development | PHP | Bootstrap | MySQL",
    categories: ["E-Commerce"],
    media: { type: "image", src: "/images/ava.png", mobileSrc: "/images/mobile-img/avacabinetry.png" },
  },
];

// Services for "What I Do" section
export interface ServiceItem {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    icon: "Network",
    title: "High-Performance Architecture",
    description:
      "I construct resilient, sub-second architectures that scale with human intention. Zero bloated code, just pure React & Next.js performance.",
  },
  {
    icon: "Activity",
    title: "Conversion-Driven Commerce",
    description:
      "Transforming passive traffic into active buyers. I deliver tailored Shopify ecosystems engineered for maximum behavioral conversion.",
  },
  {
    icon: "Cpu",
    title: "Core Web Optimization",
    description:
      "Speed is digital currency. I execute surgical Core Web Vitals tuning so your infrastructure performs with ruthless efficiency.",
  },
  {
    icon: "Layers",
    title: "Awwwards-Level Interfaces",
    description:
      "I shape digital spaces combining cinematic motion with psychological design principles. It doesn't just look stunning—it converts.",
  },
];

// Stats for "By The Numbers" section
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: StatItem[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 25, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Years of Expertise" },
  { value: 99.9, suffix: "%", label: "Client Satisfaction" },
];

// Client brands for the experience showcase
export const CLIENT_BRANDS = [
  "Idus",
  "Perona",
  "Janavi",
  "Chashma",
  "OnCloud9",
  "Nappa Dori",
  "Orange Tree",
  "Artisan Lab",
  "Manan Design",
  "Cord Studio",
  "Jan & April",
  "Swiss Beauty",
  "Ava Cabinetry",
  "Shaz & Kiks",
  "Outhouse Jewellery",
  "Transform Health",
  "Shivan & Narresh",
  "Lily Ann Cabinets"
];

export const BRAND_IMAGE_MAP: Record<string, string> = {
  "Nappa Dori": "/images/mobile-img/nappadori.png",
  "Swiss Beauty": "/images/mobile-img/swissbeauty.png",
  "Shivan & Narresh": "/images/mobile-img/shivanandnarresh.png",
  "Outhouse Jewellery": "/images/mobile-img/outhouse.png",
  "Orange Tree": "/images/mobile-img/orangetree.png",
  "Perona": "/images/mobile-img/perona.png",
  "Manan Design": "/images/mobile-img/manan.png",
  "Jan & April": "/images/mobile-img/janandapril.png",
  "Cord Studio": "/images/mobile-img/cordstudio.png",
  "Artisan Lab": "/images/mobile-img/artisanlab.png",
  "Janavi": "/images/mobile-img/janavi.png",
  "Chashma": "/images/mobile-img/chashma.png",
  "OnCloud9": "/images/mobile-img/cloud9.png",
  "Lily Ann Cabinets": "/images/mobile-img/lilyanncabinets.png",
  "Transform Health": "/images/mobile-img/transformhealth.png",
  "Shaz & Kiks": "/images/mobile-img/shazandkiks.png",
  "Ava Cabinetry": "/images/mobile-img/avacabinetry.png",
  "Idus": "/images/mobile-img/idus.png",
};

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
