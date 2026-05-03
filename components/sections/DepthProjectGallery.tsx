"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import * as THREE from "three";
import dynamic from "next/dynamic";

const ShaderGradientWithNoSSR = dynamic(
  () =>
    import("@shadergradient/react").then((mod) => {
      const { ShaderGradientCanvas, ShaderGradient } = mod;
      function GradientBg({ urlString }: { urlString: string }) {
        return (
          <ShaderGradientCanvas
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
            pixelDensity={1}
            fov={45}
          >
            <ShaderGradient control="query" urlString={urlString} />
          </ShaderGradientCanvas>
        );
      }
      return GradientBg;
    }),
  { ssr: false }
);

type MediaMode = "desktop" | "compact";

interface ProjectMood {
  background: string;
  blob1: string;
  blob2: string;
  accent: string;
  text: "light" | "dark";
}

interface ProjectData {
  title: string;
  url: string;
  displayUrl: string;
  tags: string[];
  categories: string[];
  media: {
    webm: string;
    mp4: string;
    image: string;
  };
  position: { x: number; y: number };
  mood: ProjectMood;
}

const PROJECTS: ProjectData[] = [
  {
    title: "Transform Health",
    url: "https://transformhealthcoalition.org/",
    displayUrl: "transformhealthcoalition.org",
    tags: ["WordPress", "UI/UX", "GSAP", "MySQL"],
    categories: ["Health", "Advocacy"],
    media: {
      webm: "/images/transformhealth.webm",
      mp4: "/images/transformhealth.mp4",
      image: "/images/mobile-img/transformhealth.png",
    },
    position: { x: -0.92, y: 0.05 },
    mood: {
      background: "#f6fbff",
      blob1: "#00d9ff",
      blob2: "#88d6a6",
      accent: "#00d9ff",
      text: "dark",
    },
  },
  {
    title: "Nappa Dori",
    url: "https://www.nappadori.com/",
    displayUrl: "nappadori.com",
    tags: ["Shopify", "React", "GSAP", "Photoswipe"],
    categories: ["Luxury", "Commerce"],
    media: {
      webm: "/images/nappadori.webm",
      mp4: "/images/nappadori.mp4",
      image: "/images/mobile-img/nappadori.png",
    },
    position: { x: 0.86, y: -0.02 },
    mood: {
      background: "#f7efe2",
      blob1: "#bd7d47",
      blob2: "#2e4b4d",
      accent: "#bd7d47",
      text: "dark",
    },
  },
  {
    title: "Shivan & Narresh",
    url: "https://www.shivanandnarresh.com/",
    displayUrl: "shivanandnarresh.com",
    tags: ["Shopify", "jQuery", "AWS", "Klaviyo"],
    categories: ["Fashion", "Commerce"],
    media: {
      webm: "/images/shivanandnarresh.webm",
      mp4: "/images/shivanandnarresh.mp4",
      image: "/images/mobile-img/shivanandnarresh.png",
    },
    position: { x: -0.76, y: -0.04 },
    mood: {
      background: "#2f3b3d",
      blob1: "#e7794b",
      blob2: "#f2c14e",
      accent: "#f2c14e",
      text: "light",
    },
  },
  {
    title: "Chashma",
    url: "https://chashma.com/",
    displayUrl: "chashma.com",
    tags: ["Shopify", "Firebase", "Swiper", "jQuery"],
    categories: ["Eyewear", "Commerce"],
    media: {
      webm: "/images/chashma.webm",
      mp4: "/images/chashma.mp4",
      image: "/images/mobile-img/chashma.png",
    },
    position: { x: 1, y: 0.03 },
    mood: {
      background: "#fff8ea",
      blob1: "#ef476f",
      blob2: "#118ab2",
      accent: "#ef476f",
      text: "dark",
    },
  },
  {
    title: "Shaz & Kiks",
    url: "https://www.shazandkiks.com/",
    displayUrl: "shazandkiks.com",
    tags: ["Shopify", "React", "Styled Components", "Klaviyo"],
    categories: ["Beauty", "Commerce"],
    media: {
      webm: "/images/shazandkiks.webm",
      mp4: "/images/shazandkiks.mp4",
      image: "/images/mobile-img/shazandkiks.png",
    },
    position: { x: -0.84, y: 0 },
    mood: {
      background: "#fdf4ef",
      blob1: "#ff8fab",
      blob2: "#77bfa3",
      accent: "#ff8fab",
      text: "dark",
    },
  },
  {
    title: "Swiss Beauty",
    url: "https://swissbeauty.in/",
    displayUrl: "swissbeauty.in",
    tags: ["Shopify", "Tailwind", "Keen Slider", "CustomFit"],
    categories: ["Beauty", "Commerce"],
    media: {
      webm: "/images/swissbeauty.webm",
      mp4: "/images/swissbeauty.mp4",
      image: "/images/mobile-img/swissbeauty.png",
    },
    position: { x: 0.78, y: -0.05 },
    mood: {
      background: "#311b2f",
      blob1: "#ff4d8d",
      blob2: "#ffd166",
      accent: "#ff4d8d",
      text: "light",
    },
  },
  {
    title: "Artisan Lab",
    url: "https://www.artisanlab.in/",
    displayUrl: "artisanlab.in",
    tags: ["Shopify", "Svelte", "Flickity", "Photoswipe"],
    categories: ["Home", "Commerce"],
    media: {
      webm: "/images/artisanlab.webm",
      mp4: "/images/artisanlab.mp4",
      image: "/images/mobile-img/artisanlab.png",
    },
    position: { x: -0.72, y: 0.04 },
    mood: {
      background: "#edf6f1",
      blob1: "#6a994e",
      blob2: "#bc6c25",
      accent: "#6a994e",
      text: "dark",
    },
  },
  {
    title: "Outhouse Jewellery",
    url: "https://outhouse-jewellery.com/",
    displayUrl: "outhouse-jewellery.com",
    tags: ["Shopify", "React", "Preact", "Custom CMS"],
    categories: ["Jewellery", "Commerce"],
    media: {
      webm: "/images/outhousejewellery.webm",
      mp4: "/images/outhousejewellery.mp4",
      image: "/images/mobile-img/outhouse.png",
    },
    position: { x: 0.95, y: 0 },
    mood: {
      background: "#14120f",
      blob1: "#d4af37",
      blob2: "#b7b7a4",
      accent: "#d4af37",
      text: "light",
    },
  },
  {
    title: "Jan & April",
    url: "https://janandapril.com/",
    displayUrl: "janandapril.com",
    tags: ["Shopify", "jQuery", "AWS", "Cloudflare"],
    categories: ["Fashion", "Commerce"],
    media: {
      webm: "/images/janandapril.webm",
      mp4: "/images/janandapril.mp4",
      image: "/images/mobile-img/janandapril.png",
    },
    position: { x: -0.88, y: -0.03 },
    mood: {
      background: "#fff2e6",
      blob1: "#f4a261",
      blob2: "#2a9d8f",
      accent: "#f4a261",
      text: "dark",
    },
  },
  {
    title: "Manan Design",
    url: "https://www.manandesign.com/",
    displayUrl: "manandesign.com",
    tags: ["Shopify", "GSAP", "Swiper", "AWS"],
    categories: ["Fashion", "Commerce"],
    media: {
      webm: "/images/manandesign.webm",
      mp4: "/images/manandesign.mp4",
      image: "/images/mobile-img/manan.png",
    },
    position: { x: 0.72, y: 0.04 },
    mood: {
      background: "#202124",
      blob1: "#cdb4db",
      blob2: "#ffc8dd",
      accent: "#cdb4db",
      text: "light",
    },
  },
  {
    title: "Perona",
    url: "https://www.perona.com/",
    displayUrl: "perona.com",
    tags: ["Shopify", "GSAP", "Preact", "Klaviyo"],
    categories: ["Fashion", "Commerce"],
    media: {
      webm: "/images/perona.webm",
      mp4: "/images/perona.mp4",
      image: "/images/mobile-img/perona.png",
    },
    position: { x: -1, y: 0 },
    mood: {
      background: "#f4f0e8",
      blob1: "#8d99ae",
      blob2: "#ef8354",
      accent: "#ef8354",
      text: "dark",
    },
  },
  {
    title: "Orange Tree",
    url: "https://www.orangetree.in/",
    displayUrl: "orangetree.in",
    tags: ["Shopify", "Vue", "GSAP", "MobX"],
    categories: ["Furniture", "Commerce"],
    media: {
      webm: "/images/orangetree.webm",
      mp4: "/images/orangetree.mp4",
      image: "/images/mobile-img/orangetree.png",
    },
    position: { x: 0.9, y: -0.04 },
    mood: {
      background: "#fff4df",
      blob1: "#fb8500",
      blob2: "#219ebc",
      accent: "#fb8500",
      text: "dark",
    },
  },
  {
    title: "OnCloud9",
    url: "https://oncloud9.com/",
    displayUrl: "oncloud9.com",
    tags: ["Shopify", "React", "Sentry", "Analytics"],
    categories: ["Lifestyle", "Commerce"],
    media: {
      webm: "/images/oncloud9.webm",
      mp4: "/images/oncloud9.mp4",
      image: "/images/mobile-img/cloud9.png",
    },
    position: { x: -0.72, y: 0.03 },
    mood: {
      background: "#eaf4ff",
      blob1: "#90dbf4",
      blob2: "#a3c4f3",
      accent: "#3a86ff",
      text: "dark",
    },
  },
  {
    title: "Idus",
    url: "https://idus.in/",
    displayUrl: "idus.in",
    tags: ["Shopify", "AWS", "ScrollReveal", "jQuery"],
    categories: ["Interiors", "Commerce"],
    media: {
      webm: "/images/idus.webm",
      mp4: "/images/idus.mp4",
      image: "/images/mobile-img/idus.png",
    },
    position: { x: 0.78, y: 0.02 },
    mood: {
      background: "#101820",
      blob1: "#f2aa4c",
      blob2: "#7bdff2",
      accent: "#f2aa4c",
      text: "light",
    },
  },
  {
    title: "Janavi",
    url: "https://www.janavi.com/",
    displayUrl: "janavi.com",
    tags: ["Shopify", "Bugsnag", "Cloudflare", "Custom CMS"],
    categories: ["Fashion", "Commerce"],
    media: {
      webm: "/images/janavi.webm",
      mp4: "/images/janavi.mp4",
      image: "/images/mobile-img/janavi.png",
    },
    position: { x: -0.94, y: -0.02 },
    mood: {
      background: "#f6f1ff",
      blob1: "#9d4edd",
      blob2: "#2ec4b6",
      accent: "#9d4edd",
      text: "dark",
    },
  },
  {
    title: "Cord Studio",
    url: "https://www.cordstudio.in/",
    displayUrl: "cordstudio.in",
    tags: ["Shopify", "GSAP", "Svelte", "Preact"],
    categories: ["Fashion", "Commerce"],
    media: {
      webm: "/images/cordstudio.webm",
      mp4: "/images/cordstudio.mp4",
      image: "/images/mobile-img/cordstudio.png",
    },
    position: { x: 0.98, y: 0.05 },
    mood: {
      background: "#ece4da",
      blob1: "#8a817c",
      blob2: "#463f3a",
      accent: "#8a817c",
      text: "dark",
    },
  },
  {
    title: "Lily Ann Cabinets",
    url: "https://www.lilyanncabinets.com/",
    displayUrl: "lilyanncabinets.com",
    tags: ["Magento", "PHP", "MySQL", "AWS"],
    categories: ["Home", "Commerce"],
    media: {
      webm: "/images/lilyanncabinets.webm",
      mp4: "/images/lilyanncabinets.mp4",
      image: "/images/mobile-img/lilyanncabinets.png",
    },
    position: { x: -0.82, y: 0 },
    mood: {
      background: "#f1f5f2",
      blob1: "#386641",
      blob2: "#a7c957",
      accent: "#386641",
      text: "dark",
    },
  },
  {
    title: "Ava Cabinetry",
    url: "https://www.avacabinetry.com/",
    displayUrl: "avacabinetry.com",
    tags: ["Magento", "PHP", "Bootstrap", "MySQL"],
    categories: ["Home", "Commerce"],
    media: {
      webm: "/images/ava.webm",
      mp4: "/images/ava.mp4",
      image: "/images/mobile-img/avacabinetry.png",
    },
    position: { x: 0.74, y: -0.03 },
    mood: {
      background: "#161a1d",
      blob1: "#d3d3d3",
      blob2: "#ba181b",
      accent: "#ba181b",
      text: "light",
    },
  },
];

const TOTAL = PROJECTS.length;
const PLANE_GAP = 4.7;
const CAMERA_START_Z = 5;
const LAST_PROJECT_HOLD_VH = 0.85;
const NAV_SAFE_TOP_DESKTOP = 132;
const NAV_SAFE_TOP_MOBILE = 92;
// Desktop: 16:9, Mobile: 1:1
const DESKTOP_MEDIA_ASPECT = 16 / 9;
const COMPACT_MEDIA_ASPECT = 1 / 1;

// Shader gradient URLs per project mood – dark flowing gradients
const PROJECT_GRADIENTS: string[] = PROJECTS.map(
  (p) =>
    `https://www.shadergradient.co/customize?animate=on&cDistance=28&cPolarAngle=120&color1=${encodeURIComponent(p.mood.blob1)}&color2=${encodeURIComponent(p.mood.background)}&color3=${encodeURIComponent(p.mood.blob2)}&lightType=3d&shader=defaults&type=waterPlane&uFrequency=5&uSpeed=0.2&uStrength=1.2&grain=on&grainBlending=0.4`
);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function colorToCss(color: THREE.Color) {
  return `#${color.getHexString()}`;
}

function setTextureCover(
  texture: THREE.Texture,
  planeAspect: number,
  sourceAspect: number
) {
  texture.offset.set(0, 0);
  texture.repeat.set(1, 1);

  if (!Number.isFinite(sourceAspect) || sourceAspect <= 0) {
    texture.needsUpdate = true;
    return;
  }

  if (sourceAspect > planeAspect) {
    const repeatX = planeAspect / sourceAspect;
    texture.repeat.x = repeatX;
    texture.offset.x = (1 - repeatX) / 2;
  } else {
    const repeatY = sourceAspect / planeAspect;
    texture.repeat.y = repeatY;
    texture.offset.y = (1 - repeatY) / 2;
  }

  texture.needsUpdate = true;
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function createVideoTexture(project: ProjectData) {
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.crossOrigin = "anonymous";
  video.poster = project.media.image;

  const webm = document.createElement("source");
  webm.src = project.media.webm;
  webm.type = "video/webm";
  video.append(webm);

  const mp4 = document.createElement("source");
  mp4.src = project.media.mp4;
  mp4.type = "video/mp4";
  video.append(mp4);

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return { texture, video };
}

export function DepthProjectGallery() {
  const rootRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollToProjectRef = useRef<(index: number) => void>(() => {});
  const activeIndexRef = useRef(0);
  const debouncedIndexTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mediaMode, setMediaMode] = useState<MediaMode>("compact");

  const activeProject = PROJECTS[activeIndex];
  const toneClass =
    activeProject.mood.text === "dark" ? "text-black" : "text-white";
  const mutedToneClass =
    activeProject.mood.text === "dark" ? "text-black/85" : "text-white/85";
  const borderToneClass =
    activeProject.mood.text === "dark" ? "border-black/25" : "border-white/25";

  const selectProject = useCallback((index: number) => {
    scrollToProjectRef.current(index);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateMediaMode = () => {
      setMediaMode(mediaQuery.matches ? "compact" : "desktop");
    };

    queueMicrotask(updateMediaMode);
    mediaQuery.addEventListener("change", updateMediaMode);
    return () => mediaQuery.removeEventListener("change", updateMediaMode);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!root || !sticky || !canvas) return;

    const webglAvailable = supportsWebGL();
    if (!webglAvailable) {
      queueMicrotask(() => setHasWebGL(false));
      return;
    }

    queueMicrotask(() => setIsReady(false));

    let disposed = false;
    let animationFrame = 0;
    let settledMedia = 0;
    let targetDepth = 0;
    let currentDepth = 0;
    let previousDepth = 0;
    let velocity = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120);
    camera.position.set(0, 0, CAMERA_START_Z);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const loader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(1, 1);
    const videos: HTMLVideoElement[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const textures: THREE.Texture[] = [];

    const markMediaSettled = () => {
      settledMedia += 1;
      if (settledMedia >= TOTAL && !disposed) {
        setIsReady(true);
      }
    };

    const planes = PROJECTS.map((project, index) => {
      let texture: THREE.Texture;

      if (mediaMode === "desktop") {
        const videoMedia = createVideoTexture(project);
        texture = videoMedia.texture;
        videos.push(videoMedia.video);
        videoMedia.video.addEventListener(
          "loadedmetadata",
          () => {
            setTextureCover(
              texture,
              DESKTOP_MEDIA_ASPECT,
              videoMedia.video.videoWidth / videoMedia.video.videoHeight
            );
            markMediaSettled();
          },
          { once: true }
        );
        videoMedia.video.addEventListener("error", markMediaSettled, { once: true });
        videoMedia.video.load();
      } else {
        texture = loader.load(
          project.media.image,
          (loadedTexture) => {
            loadedTexture.colorSpace = THREE.SRGBColorSpace;
            loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            setTextureCover(
              loadedTexture,
              COMPACT_MEDIA_ASPECT,
              loadedTexture.image.width / loadedTexture.image.height
            );
            markMediaSettled();
          },
          undefined,
          markMediaSettled
        );
      }

      textures.push(texture);

      const material = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        map: texture,
        transparent: true,
        depthWrite: false,
        opacity: index === 0 ? 1 : 0,
        side: THREE.DoubleSide,
      });
      materials.push(material);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(project.position.x, project.position.y, -index * PLANE_GAP);
      mesh.renderOrder = TOTAL - index;
      scene.add(mesh);
      return mesh;
    });

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);
    const bgColor = new THREE.Color(PROJECTS[0].mood.background);
    const blob1Color = new THREE.Color(PROJECTS[0].mood.blob1);
    const blob2Color = new THREE.Color(PROJECTS[0].mood.blob2);
    const nextBgColor = new THREE.Color();
    const nextBlob1Color = new THREE.Color();
    const nextBlob2Color = new THREE.Color();

    const getScrollMetrics = () => {
      const viewportHeight = Math.max(window.innerHeight, 1);
      const rect = root.getBoundingClientRect();
      const totalScrollable = Math.max(root.offsetHeight - viewportHeight, 1);
      const projectScrollable = Math.max(
        totalScrollable - viewportHeight * LAST_PROJECT_HOLD_VH,
        1
      );
      const localScroll = clamp(-rect.top, 0, totalScrollable);
      const sceneProgress = clamp(localScroll / projectScrollable, 0, 1);
      const sectionProgress = clamp(localScroll / totalScrollable, 0, 1);

      return {
        viewportHeight,
        sceneProgress,
        sectionProgress,
      };
    };

    const applyMood = (currentIndex: number, nextIndex: number, blend: number) => {
      const currentMood = PROJECTS[currentIndex].mood;
      const nextMood = PROJECTS[nextIndex].mood;
      bgColor
        .set(currentMood.background)
        .lerp(nextBgColor.set(nextMood.background), blend);
      blob1Color.set(currentMood.blob1).lerp(nextBlob1Color.set(nextMood.blob1), blend);
      blob2Color.set(currentMood.blob2).lerp(nextBlob2Color.set(nextMood.blob2), blend);
      sticky.style.setProperty("--depth-bg", colorToCss(bgColor));
      sticky.style.setProperty("--depth-blob-1", colorToCss(blob1Color));
      sticky.style.setProperty("--depth-blob-2", colorToCss(blob2Color));
    };

    const updatePlayback = (nearestIndex: number) => {
      if (mediaMode !== "desktop") return;

      videos.forEach((video, index) => {
        const shouldPlay = Math.abs(index - nearestIndex) <= 1;
        if (shouldPlay) {
          const play = video.play();
          if (play !== undefined) play.catch(() => {});
        } else {
          video.pause();
        }
      });
    };

    const resize = () => {
      const width = Math.max(sticky.clientWidth, 1);
      const height = Math.max(sticky.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const scrollToProject = (index: number) => {
      const safeIndex = clamp(index, 0, TOTAL - 1);
      const { viewportHeight } = getScrollMetrics();
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const totalScrollable = Math.max(root.offsetHeight - viewportHeight, 1);
      const projectScrollable = Math.max(
        totalScrollable - viewportHeight * LAST_PROJECT_HOLD_VH,
        1
      );
      const projectProgress = safeIndex / Math.max(TOTAL - 1, 1);

      window.scrollTo({
        top: rootTop + projectScrollable * projectProgress,
        behavior: "smooth",
      });
    };

    scrollToProjectRef.current = scrollToProject;

    const onPointerMove = (event: PointerEvent) => {
      const rect = sticky.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1;
      pointerTarget.set(x, -y);
    };

    const onPointerLeave = () => {
      pointerTarget.set(0, 0);
    };

    const update = () => {
      const { sceneProgress, sectionProgress } = getScrollMetrics();
      targetDepth = sceneProgress * (TOTAL - 1);
      currentDepth = lerp(currentDepth, targetDepth, 0.12);
      velocity = lerp(velocity, currentDepth - previousDepth, 0.16);
      previousDepth = currentDepth;

      const currentPlaneIndex = clamp(Math.floor(currentDepth), 0, TOTAL - 1);
      const nextPlaneIndex = Math.min(currentPlaneIndex + 1, TOTAL - 1);
      const blend = clamp(currentDepth - currentPlaneIndex, 0, 1);
      const nearestIndex = blend >= 0.5 ? nextPlaneIndex : currentPlaneIndex;
      const velocityIntensity = clamp(Math.abs(velocity) / 0.18, 0, 1);
      const compact = mediaMode === "compact";
      const mediaAspect = compact ? COMPACT_MEDIA_ASPECT : DESKTOP_MEDIA_ASPECT;
      const xSpread = compact ? 0.28 : 0.34;
      const planeHeight = compact ? 3.05 : 3.28;
      const drift = clamp(velocity / 0.18, -1, 1) * 0.13;

      camera.position.z = CAMERA_START_Z - currentDepth * PLANE_GAP;
      pointerCurrent.lerp(pointerTarget, 0.08);

      planes.forEach((plane, index) => {
        const material = materials[index];
        const distance = Math.abs(currentDepth - index);
        const targetOpacity = clamp(1 - distance, 0, 1);
        material.opacity = lerp(material.opacity, targetOpacity, 0.16);
        material.needsUpdate = true;

        const project = PROJECTS[index];
        const opacity = material.opacity;
        const breath = velocityIntensity * opacity;
        plane.position.x =
          project.position.x * xSpread + pointerCurrent.x * 0.2 * opacity;
        plane.position.y =
          project.position.y + pointerCurrent.y * 0.1 * opacity + drift;
        plane.position.z = -index * PLANE_GAP;
        plane.rotation.x = -pointerCurrent.y * 0.08 * breath;
        plane.rotation.y = pointerCurrent.x * 0.08 * breath;
        const pulse = 1 + 0.045 * breath;
        plane.scale.set(planeHeight * mediaAspect * pulse, planeHeight * pulse, 1);
      });

      applyMood(currentPlaneIndex, nextPlaneIndex, blend);
      updatePlayback(nearestIndex);
      sticky.style.setProperty("--depth-progress", `${sectionProgress}`);
      sticky.style.setProperty("--depth-velocity", `${velocityIntensity}`);

      if (nearestIndex !== activeIndexRef.current) {
        activeIndexRef.current = nearestIndex;
        // Debounce the UI switch — user must dwell for 450ms before the info panel updates
        if (debouncedIndexTimerRef.current) {
          clearTimeout(debouncedIndexTimerRef.current);
        }
        debouncedIndexTimerRef.current = setTimeout(() => {
          setActiveIndex(nearestIndex);
        }, 450);
      }

      renderer.clear();
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(update);
    };

    resize();
    window.addEventListener("resize", resize);
    sticky.addEventListener("pointermove", onPointerMove, { passive: true });
    sticky.addEventListener("pointerleave", onPointerLeave, { passive: true });
    animationFrame = requestAnimationFrame(update);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      sticky.removeEventListener("pointermove", onPointerMove);
      sticky.removeEventListener("pointerleave", onPointerLeave);
      videos.forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.querySelectorAll("source").forEach((source) => source.remove());
        video.load();
      });
      if (debouncedIndexTimerRef.current) {
        clearTimeout(debouncedIndexTimerRef.current);
      }
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      geometry.dispose();
      renderer.dispose();
    };
  }, [mediaMode]);

  const navProjects = useMemo(
    () =>
      PROJECTS.map((project, index) => ({
        title: project.title,
        index,
      })),
    []
  );

  return (
    <section
      ref={rootRef}
      aria-label="Depth project gallery"
      className="relative w-full"
      style={{ height: `${(TOTAL + 1) * 100}svh` }}
    >
      <div
        ref={stickyRef}
        className="depth-gallery sticky top-0 h-[100svh] w-full overflow-hidden outline-none"
        style={
          {
            "--depth-bg": PROJECTS[0].mood.background,
            "--depth-blob-1": PROJECTS[0].mood.blob1,
            "--depth-blob-2": PROJECTS[0].mood.blob2,
            "--depth-progress": 0,
            "--depth-velocity": 0,
            "--work-nav-safe-top-desktop": `${NAV_SAFE_TOP_DESKTOP}px`,
            "--work-nav-safe-top-mobile": `${NAV_SAFE_TOP_MOBILE}px`,
          } as React.CSSProperties
        }
      >
        {/* ── SHADER GRADIENT BACKGROUND ──────────────────────────── */}
        <div className="absolute inset-0 z-0 transition-opacity duration-700">
          <ShaderGradientWithNoSSR urlString={PROJECT_GRADIENTS[activeIndex]} />
        </div>

        {/* Dark vignette overlay to keep content legible */}
        <div className="absolute inset-0 z-[1] bg-black/30 pointer-events-none" />

        {/* THREE.js canvas sits on top of gradient */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 h-full w-full"
          aria-hidden="true"
        />

        {!hasWebGL && (
          <div className="absolute inset-0 z-10 grid place-items-center px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeProject.media.image}
              alt={activeProject.title}
              className="h-[min(62vh,560px)] w-auto max-w-[78vw] object-contain shadow-2xl"
            />
          </div>
        )}

        {/* ── HUD LAYER ──────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col px-5 pb-5 pt-[var(--work-nav-safe-top-mobile)] sm:px-8 sm:pb-8 lg:px-12 lg:pb-10 lg:pt-[var(--work-nav-safe-top-desktop)]">

          {/* Top bar */}
          <header className={`flex items-start justify-between gap-5 ${toneClass}`}>
            <div className="max-w-[15rem]">
              <p className={`font-label text-[10px] uppercase tracking-[0.35em] ${mutedToneClass}`}>
                Work Index
              </p>
              <h1 className="mt-1.5 font-headline text-2xl font-black uppercase leading-none tracking-normal sm:text-3xl">
                Selected Builds
              </h1>
            </div>
            <div className={`text-right font-label text-[10px] uppercase tracking-[0.22em] ${mutedToneClass}`}>
              <span className="tabular-nums text-xl font-black leading-none {toneClass}">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-1">/</span>
              {String(TOTAL).padStart(2, "0")}
            </div>
          </header>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom area: nav left + info right */}
          <div className="flex items-end justify-between gap-7">

            {/* ── PROJECT NAV (desktop only) */}
            <nav
              aria-label="Project selector"
              className="pointer-events-auto hidden max-h-[calc(100svh-var(--work-nav-safe-top-desktop)-3rem)] overflow-y-auto pr-2 lg:block"
            >
              <div className={`grid gap-0.5 border-l pl-4 ${borderToneClass}`}>
                {navProjects.map((project) => {
                  const isActive = project.index === activeIndex;
                  return (
                    <button
                      key={project.title}
                      type="button"
                      onClick={() => selectProject(project.index)}
                      className={`group grid grid-cols-[2rem_1fr] items-center gap-2 py-1 text-left font-label text-[9px] uppercase tracking-[0.14em] transition-colors ${
                        isActive ? toneClass : mutedToneClass
                      }`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="tabular-nums">{String(project.index + 1).padStart(2, "0")}</span>
                      <span className="truncate">{project.title}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* ── PROJECT INFO PANEL (redesigned) */}
            <article
              className={`pointer-events-auto depth-gallery__info-panel`}
              aria-label={`Project: ${activeProject.title}`}
            >
              {/* Glass card */}
              <div
                className="relative overflow-hidden rounded-2xl p-5 sm:p-6"
                style={{
                  background:
                    activeProject.mood.text === "dark"
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(24px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                  border: `1px solid ${
                    activeProject.mood.text === "dark"
                      ? "rgba(0,0,0,0.15)"
                      : "rgba(255,255,255,0.2)"
                  }`,
                  boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
                }}
              >
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 h-0.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${activeProject.mood.accent}, transparent)`,
                  }}
                />

                {/* Category + index row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.categories.map((cat) => (
                      <span
                        key={cat}
                        className={`px-2 py-0.5 rounded-full font-label text-[8px] uppercase tracking-[0.25em] ${mutedToneClass}`}
                        style={{
                          background:
                            activeProject.mood.text === "dark"
                              ? "rgba(0,0,0,0.12)"
                              : "rgba(255,255,255,0.12)",
                          border: `1px solid ${
                            activeProject.mood.text === "dark"
                              ? "rgba(0,0,0,0.18)"
                              : "rgba(255,255,255,0.18)"
                          }`,
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <span className={`font-headline font-black text-2xl leading-none ${mutedToneClass}`}>
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className={`font-headline font-black uppercase leading-[0.9] tracking-tight ${toneClass}`}
                  style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}
                >
                  {activeProject.title}
                </h2>

                {/* URL row */}
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 inline-flex items-center gap-1.5 font-label text-[9px] uppercase tracking-[0.22em] transition-opacity hover:opacity-70 ${mutedToneClass}`}
                >
                  <span
                    className="inline-block w-1 h-1 rounded-full"
                    style={{ background: activeProject.mood.accent }}
                  />
                  {activeProject.displayUrl}
                  <ArrowUpRight size={11} strokeWidth={2} aria-hidden="true" />
                </a>

                {/* Divider */}
                <div
                  className="my-4 h-px w-full"
                  style={{
                    background:
                      activeProject.mood.text === "dark"
                        ? "rgba(0,0,0,0.1)"
                        : "rgba(255,255,255,0.1)",
                  }}
                />

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 font-label text-[8px] uppercase tracking-[0.15em] ${mutedToneClass}`}
                      style={{
                        background:
                          activeProject.mood.text === "dark"
                            ? "rgba(0,0,0,0.06)"
                            : "rgba(255,255,255,0.06)",
                        border: `1px solid ${
                          activeProject.mood.text === "dark"
                            ? "rgba(0,0,0,0.1)"
                            : "rgba(255,255,255,0.1)"
                        }`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-label text-[9px] uppercase tracking-[0.2em] font-bold transition-all hover:scale-[1.03]"
                  style={{
                    background: activeProject.mood.accent,
                    color:
                      activeProject.mood.text === "light" ? "#fff" : "#000",
                    boxShadow: `0 0 20px ${activeProject.mood.accent}55`,
                  }}
                >
                  View Live
                  <ExternalLink size={11} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
        </div>

        {/* Progress bar */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-px bg-white/10">
          <div className="depth-gallery__progress h-full origin-left bg-white/80" />
        </div>

        {!isReady && hasWebGL && (
          <div className="absolute inset-0 z-40 grid place-items-center bg-black text-white">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-white/50">
              Loading projects
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
