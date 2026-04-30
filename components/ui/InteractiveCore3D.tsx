"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const CUBE_SIZE = 90; // half-size in px

const CUBE_FACES = [
  { name: "front",  transform: `translateZ(${CUBE_SIZE}px)` },
  { name: "back",   transform: `rotateY(180deg) translateZ(${CUBE_SIZE}px)` },
  { name: "right",  transform: `rotateY(90deg) translateZ(${CUBE_SIZE}px)` },
  { name: "left",   transform: `rotateY(-90deg) translateZ(${CUBE_SIZE}px)` },
  { name: "top",    transform: `rotateX(90deg) translateZ(${CUBE_SIZE}px)` },
  { name: "bottom", transform: `rotateX(-90deg) translateZ(${CUBE_SIZE}px)` },
];

const INNER_SIZE = 32;
const INNER_FACES = [
  { name: "front",  transform: `translateZ(${INNER_SIZE}px)` },
  { name: "back",   transform: `rotateY(180deg) translateZ(${INNER_SIZE}px)` },
  { name: "right",  transform: `rotateY(90deg) translateZ(${INNER_SIZE}px)` },
  { name: "left",   transform: `rotateY(-90deg) translateZ(${INNER_SIZE}px)` },
  { name: "top",    transform: `rotateX(90deg) translateZ(${INNER_SIZE}px)` },
  { name: "bottom", transform: `rotateX(-90deg) translateZ(${INNER_SIZE}px)` },
];

export function InteractiveCore3D() {
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const tesseractRef  = useRef<HTMLDivElement>(null);
  const outerFacesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerCubeRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tesseractRef.current || !wrapperRef.current || !innerCubeRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    /* ─── Idle rotations ─────────────────────────────── */
    const idleAnim = gsap.to(tesseractRef.current, {
      rotateX: 360,
      rotateY: 720,
      rotateZ: 180,
      duration: 28,
      repeat: -1,
      ease: "none",
    });

    const innerAnim = gsap.to(innerCubeRef.current, {
      rotateX: -360,
      rotateY: -360,
      duration: 14,
      repeat: -1,
      ease: "none",
    });

    /* ─── Scroll: gently recede as user scrolls ──────── */
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "25% top",
      scrub: 2,
      animation: gsap.to(wrapperRef.current, {
        y: -50,
        opacity: 0.3,
        scale: 0.8,
        ease: "power1.out",
      }),
    });

    /* ─── Subtle mouse parallax ──────────────────────── */
    const handleMouseMove = (e: MouseEvent) => {
      const xPos = (e.clientX / window.innerWidth  - 0.5) * 25;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 25;
      gsap.to(wrapperRef.current, {
        rotateY: xPos,
        rotateX: -yPos,
        duration: 2.2,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      st.kill();
      idleAnim.kill();
      innerAnim.kill();
    };
  }, []);

  /* ─── Hover ──────────────────────────────────────────── */
  const handleMouseEnter = () => {
    outerFacesRef.current.forEach((face, i) => {
      if (!face) return;
      const expanded = CUBE_FACES[i].transform.replace(`${CUBE_SIZE}px`, `${CUBE_SIZE + 28}px`);
      gsap.to(face, {
        transform: expanded,
        backgroundColor: "rgba(0,217,255,0.05)",
        borderColor: "rgba(0,217,255,0.65)",
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    });
    gsap.to(innerCubeRef.current, { scale: 1.45, duration: 0.5, ease: "back.out(1.7)" });
    gsap.to(wrapperRef.current,   { opacity: 1,   duration: 0.35 });
  };

  const handleMouseLeave = () => {
    outerFacesRef.current.forEach((face, i) => {
      if (!face) return;
      gsap.to(face, {
        transform: CUBE_FACES[i].transform,
        backgroundColor: "rgba(255,255,255,0.012)",
        borderColor: "rgba(255,255,255,0.18)",
        duration: 0.75,
        ease: "power3.out",
      });
    });
    gsap.to(innerCubeRef.current, { scale: 1, duration: 0.75, ease: "power3.out" });
  };

  /* ─── Click shatter ──────────────────────────────────── */
  const handleClick = () => {
    const tl = gsap.timeline();

    outerFacesRef.current.forEach((face, i) => {
      if (!face) return;
      const shatter = CUBE_FACES[i].transform.replace(`${CUBE_SIZE}px`, "340px");
      tl.to(face, { transform: shatter, opacity: 0, duration: 0.5, ease: "expo.out" }, 0);
    });

    tl.to(innerCubeRef.current, {
      scale: 3,
      rotateX: "+=720",
      rotateY: "+=720",
      filter: "brightness(4)",
      duration: 0.5,
      ease: "power4.inOut",
    }, 0);

    outerFacesRef.current.forEach((face, i) => {
      if (!face) return;
      tl.to(face, {
        transform: CUBE_FACES[i].transform,
        opacity: 1,
        duration: 1.1,
        ease: "elastic.out(1, 0.3)",
      }, 0.6);
    });

    tl.to(innerCubeRef.current, {
      scale: 1,
      filter: "brightness(1)",
      duration: 1.1,
      ease: "elastic.out(1, 0.3)",
    }, 0.6);
  };

  return (
    /**
     * Outer shell: fixed to viewport, covers the right half.
     * pointer-events-none so it doesn't block page text/scroll.
     * The cube itself re-enables pointer-events for interactivity.
     */
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "45vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        perspective: "900px",
        overflow: "hidden",
      }}
    >
      {/* Soft ambient glow blob */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          right: "5%",
          width: "320px",
          height: "320px",
          background: "radial-gradient(circle, rgba(0,217,255,0.10) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Interactive tesseract wrapper ── */}
      <div
        ref={wrapperRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "absolute",
          /* Center of the hero viewport — nicely above the fold */
          top: "32%",
          right: "12%",
          width: "180px",
          height: "180px",
          transformStyle: "preserve-3d",
          opacity: 0.82,
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        {/* Tesseract pivot — all children rotate from here */}
        <div
          ref={tesseractRef}
          style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}
        >
          {/* Centre ambient orb */}
          <div
            style={{
              position: "absolute",
              inset: "25%",
              background: "rgba(0,217,255,0.15)",
              borderRadius: "50%",
              filter: "blur(20px)",
            }}
          />

          {/* ── Outer frosted glass cube ── */}
          {CUBE_FACES.map((face, i) => (
            <div
              key={`outer-${face.name}`}
              ref={(el) => { outerFacesRef.current[i] = el; }}
              style={{
                position: "absolute",
                inset: 0,
                transform: face.transform,
                transformStyle: "preserve-3d",
                border: "1px solid rgba(255,255,255,0.18)",
                backgroundColor: "rgba(255,255,255,0.012)",
                backdropFilter: "blur(6px)",
                boxShadow: "inset 0 0 24px rgba(0,217,255,0.04)",
              }}
            >
              {/* Corner tech marks */}
              <span style={{ position:"absolute", top:0,    left:0,  width:9, height:9, borderTop:"1.5px solid rgba(0,217,255,0.85)", borderLeft:"1.5px solid rgba(0,217,255,0.85)" }} />
              <span style={{ position:"absolute", top:0,    right:0, width:9, height:9, borderTop:"1.5px solid rgba(0,217,255,0.85)", borderRight:"1.5px solid rgba(0,217,255,0.85)" }} />
              <span style={{ position:"absolute", bottom:0, left:0,  width:9, height:9, borderBottom:"1.5px solid rgba(0,217,255,0.85)", borderLeft:"1.5px solid rgba(0,217,255,0.85)" }} />
              <span style={{ position:"absolute", bottom:0, right:0, width:9, height:9, borderBottom:"1.5px solid rgba(0,217,255,0.85)", borderRight:"1.5px solid rgba(0,217,255,0.85)" }} />
            </div>
          ))}

          {/* ── Inner glowing energy cube ── */}
          <div
            ref={innerCubeRef}
            style={{
              position: "absolute",
              top: "30%", left: "30%",
              width: "40%", height: "40%",
              transformStyle: "preserve-3d",
            }}
          >
            {INNER_FACES.map((face) => (
              <div
                key={`inner-${face.name}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: face.transform,
                  border: "1px solid rgba(0,217,255,0.9)",
                  backgroundColor: "rgba(0,217,255,0.18)",
                  boxShadow: "0 0 20px rgba(0,217,255,0.55), inset 0 0 12px rgba(0,217,255,0.75)",
                  backdropFilter: "blur(2px)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
