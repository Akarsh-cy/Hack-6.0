"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  Gift,
  Lightbulb,
  Hexagon,
  Gem,
  GraduationCap,
  Layers,
  Award,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

// Convert a hex color like "#ff2a85" into an rgba() string with a given alpha
const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Win9x-style raised/inset bevel, used on titlebar buttons and inset panels
// so the "desktop OS" chrome reads correctly instead of flat modern buttons.
const BEVEL_RAISED =
  "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.65)";
const BEVEL_INSET =
  "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.25)";
// Add above PrizeSection, alongside your other variants
const crtBootVariants = {
  hidden: {
    scaleY: 0.02,
    opacity: 0,
    filter: "brightness(3) blur(2px)",
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    filter: "brightness(1) blur(0px)",
    transition: {
      scaleY: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, // snap open
      opacity: { duration: 0.15 },
      filter: { duration: 0.5, delay: 0.15 },
    },
  },
};

// Flicker keyframes fired once, right after the boot-open finishes
const flickerKeyframes = {
  opacity: [0, 1, 0.4, 1, 0.6, 1],
  transition: {
    duration: 0.4,
    delay: 0.35,
    times: [0, 0.2, 0.35, 0.5, 0.7, 1],
  },
};
// 3D Tilt Wrapper Component for Terminal Cards
const TiltCard = ({
  children,
  className,
  dropShadowColor = "#ff2a85",
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  className?: string;
  dropShadowColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const rafRef = useRef<number | null>(null);
  // Cache the rect once per hover session, measured while the card is
  // still flat. Re-measuring on every mousemove reads the rect of the
  // element AFTER its own rotateX/rotateY transform has been applied,
  // which returns a foreshortened/skewed box — worst right at the
  // corners where rotation is maximal — causing a feedback loop where
  // the tilt jumps or "fails" near the edges.
  const rectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Slightly softer, more critically-damped spring for a tighter, less
  // bouncy/laggy tilt response.
  const springConfig = { stiffness: 220, damping: 26, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Reduced tilt range (was 12deg) to cut down on subpixel text blur at
  // extreme angles while still reading clearly as a 3D tilt.
  // Bumped back up from 7deg — the text-blur fix now comes from removing
  // translateZ off text + backface-visibility, so we have headroom for a
  // more visible tilt without the earlier blur problem returning.
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

  // Directional shadow: offsets AWAY from the cursor (opposite corner),
  // as if the cursor is the light source and the shadow falls on the far
  // side — e.g. hovering the top-left should push the shadow toward the
  // bottom-right, not tuck it behind the same corner as the cursor.
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [17, -17]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [17, -17]);
  const boxShadowValue = useTransform([shadowX, shadowY], (latest) => {
    const [sx, sy] = latest as [number, number];
    return `${sx}px ${sy}px 0px 0px ${dropShadowColor}, ${sx * 1.6}px ${
      sy * 1.6 + 14
    }px 32px -6px rgba(0,0,0,0.55)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;

    // Fallback in case mouseenter didn't fire first for some reason
    // (e.g. the card was already under the cursor on mount).
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      // Clamp defensively — keeps the gradient/rotation math well-behaved
      // even if the cursor briefly reads a hair outside the cached rect
      // (fast mouse movement, sub-pixel rounding, etc).
      const rawX = (clientX - rect.left) / rect.width - 0.5;
      const rawY = (clientY - rect.top) / rect.height - 0.5;
      const pctX = Math.min(0.5, Math.max(-0.5, rawX));
      const pctY = Math.min(0.5, Math.max(-0.5, rawY));
      x.set(pctX);
      y.set(pctY);
    });
  };

  const handleMouseLeaveEvent = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rectRef.current = null;
    x.set(0);
    y.set(0);
    setIsPressed(false);
    if (onMouseLeave) onMouseLeave();
  };

  const handleMouseEnterEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    // Measure once here, while the card is still at rest (no rotation
    // applied yet), so every subsequent mousemove in this hover session
    // uses a stable, untransformed rect.
    rectRef.current = e.currentTarget.getBoundingClientRect();
    if (onMouseEnter) onMouseEnter();
  };

  return (
    <div className="perspective-[1000px] w-full h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => handleMouseEnterEvent(e)}
        onMouseLeave={handleMouseLeaveEvent}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          textRendering: "optimizeLegibility",
          boxShadow: isTouchDevice
            ? `6px 6px 0px 0px ${dropShadowColor}`
            : boxShadowValue,
        }}
        animate={{
          scale: isPressed ? 0.98 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={cn(
          // NOTE: transition-colors (not transition-all) so CSS transitions
          // don't fight the per-frame spring-driven `transform`/`boxShadow`
          // values from Framer Motion — that conflict was the main cause of
          // the laggy/rubber-banding tilt.
          "group relative bg-[#f4f4f6] border-3 border-[#1e1e2f] font-body overflow-hidden select-none flex flex-col justify-between h-full will-change-transform transition-colors duration-300",
          className,
        )}
      >
        {/* Holographic Sheen Overlay — now tinted with the card's own accent color instead of flat white */}
        {!isTouchDevice && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            style={{
              background: useTransform([glareX, glareY], (latest) => {
                const [gx, gy] = latest as [string, string];
                return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.5), ${hexToRgba(
                  dropShadowColor,
                  0.02,
                )} 15%, transparent 48%)`;
              }),
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
};

// Win9x-style titlebar window controls with a real raised bevel instead of
// flat squares — this is the single strongest "desktop OS" tell, so it's
// worth getting the bevel right rather than leaving it flat.
const WindowControls = () => (
  <div className="flex items-center gap-1.5 flex-shrink-0 font-subheading">
    <span
      style={{ boxShadow: BEVEL_RAISED }}
      className="w-5 h-5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold"
    >
      _
    </span>
    <span
      style={{ boxShadow: BEVEL_RAISED }}
      className="w-5 h-5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold"
    >
      □
    </span>
    <span
      style={{ boxShadow: BEVEL_RAISED }}
      className="w-5 h-5 bg-[#ff2a85] text-white flex items-center justify-center text-[10px] font-extrabold"
    >
      ×
    </span>
  </div>
);

// Thin CRT scanline overlay — ties the "desktop OS" chrome and the
// "synthwave" background together, since scan lines read as both a period
// CRT monitor artifact and an 80s broadcast/VHS artifact.
const ScanlineOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none -z-10 opacity-[0.06]"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 3px)",
    }}
  />
);

// Optimized Confetti component for mobile performance
const Confetti = () => {
  const confettiPieces = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 6 + 4;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 1 + 0.5;
    const animationDelay = Math.random() * 0.2;

    const colors = ["#ff2a85", "#00f0ff", "#b967ff", "#ffd319"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
      <motion.div
        key={i}
        initial={{
          top: "-5%",
          left: `${left}%`,
          opacity: 0,
        }}
        animate={{
          top: "105%",
          left: `${left}%`,
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: animationDuration,
          delay: animationDelay,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: "50%",
          boxShadow: `0 0 8px ${color}`,
          zIndex: 10,
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confettiPieces}
    </div>
  );
};

export default function PrizeSection() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px 0px",
  });

  const [forcedVisible, setForcedVisible] = useState(false);
  const [showGrandPrizeConfetti, setShowGrandPrizeConfetti] = useState(false);
  const [hasTriggeredInitialConfetti, setHasTriggeredInitialConfetti] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForcedVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ((sectionInView || forcedVisible) && !hasTriggeredInitialConfetti) {
      setShowGrandPrizeConfetti(true);
      setHasTriggeredInitialConfetti(true);

      const hideTimer = setTimeout(() => {
        setShowGrandPrizeConfetti(false);
      }, 3000);

      return () => clearTimeout(hideTimer);
    }
  }, [sectionInView, forcedVisible, hasTriggeredInitialConfetti]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // "path" replaces the old cyberpunk-terminal "port" strings
  // (PORT://443, NODE://GIRLS, etc.) with genuine Windows-9x file paths so
  // the flavor text matches the .EXE/.DLL titlebar chrome instead of
  // competing with it.
  const trackPrizes = [
    {
      id: "track-aiml",
      icon: Lightbulb,
      title: "AI/ML Track",
      amount: "₹30,000",
      color: "#00f0ff",
      filename: "TRACK_AIML.EXE",
      tag: "AI_ML",
      description:
        "Outstanding performance and creative solutions in AI & Machine Learning",
      distribution: [
        { position: "1st Prize", amount: "₹15,000" },
        { position: "2nd Prize", amount: "₹10,000" },
        { position: "3rd Prize", amount: "₹5,000" },
      ],
      path: "C:\\HACK6\\TRACKS\\AIML.EXE",
      status: " ONLINE",
    },
    {
      id: "track-blockchain",
      icon: Hexagon,
      title: "Blockchain Track",
      amount: "₹30,000",
      color: "#ff2a85",
      filename: "TRACK_BLOCKCHAIN.EXE",
      tag: "WEB3",
      description: "Exceptional decentralized applications and Web3 solutions",
      distribution: [
        { position: "1st Prize", amount: "₹15,000" },
        { position: "2nd Prize", amount: "₹10,000" },
        { position: "3rd Prize", amount: "₹5,000" },
      ],
      path: "C:\\HACK6\\TRACKS\\BLOCKCHAIN.EXE",
      status: " ACTIVE",
    },
    {
      id: "track-open",
      icon: Gem,
      title: "Open Innovation Track",
      amount: "₹30,000",
      color: "#00f0ff",
      filename: "TRACK_OPEN.EXE",
      tag: "INNOVATION",
      description:
        "Breakthrough ideas and creative hacks outside specialized tracks",
      distribution: [
        { position: "1st Prize", amount: "₹15,000" },
        { position: "2nd Prize", amount: "₹10,000" },
        { position: "3rd Prize", amount: "₹5,000" },
      ],
      path: "C:\\HACK6\\TRACKS\\OPEN.EXE",
      status: " READY",
    },
  ];

  const specialCategories = [
    {
      id: "special-girls",
      icon: Gift,
      title: "All Girls Team",
      amount: "₹10,000",
      color: "#ff2a85",
      filename: "CATEGORY_GIRLS.DLL",
      tag: "WOMEN_TECH",
      description: "Best hack developed by an all-female team",
      distribution: "Entirely female team members.",
      path: "C:\\HACK6\\CATEGORY\\GIRLS.DLL",
      status: "■ ONLINE",
    },
    {
      id: "special-beginners",
      icon: GraduationCap,
      title: "Beginners Team",
      amount: "₹10,000",
      color: "#00f0ff",
      filename: "CATEGORY_BEGINNERS.DLL",
      tag: "BEGINNER_DEVS",
      description: "Best hack by a first-time beginner team",
      distribution: "First-year student team members.",
      path: "C:\\HACK6\\CATEGORY\\BEGINNERS.DLL",
      status: "■ ACTIVE",
    },
  ];

  return (
    <section
      id="prizes"
      className="py-16 md:py-24 bg-gradient-to-b from-[#18112d] via-[#241344] to-[#45185d] relative overflow-hidden text-white font-body select-none"
    >
      {/* Ambient Lighting & Scanline Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#ff2a85]/15 filter blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[#00f0ff]/15 filter blur-[150px]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 42, 133, 0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <ScanlineOverlay />
      </div>

      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          variants={crtBootVariants}
          initial="hidden"
          animate={sectionInView || forcedVisible ? "visible" : "hidden"}
          style={{ transformOrigin: "center" }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="relative inline-block">
            {/* RGB ghost layers — converge from offset to 0 as the heading boots in */}
            <motion.h2
              aria-hidden
              initial={{ x: -6, opacity: 0.6 }}
              animate={
                sectionInView || forcedVisible
                  ? {
                      x: 0,
                      opacity: 0,
                      transition: { duration: 0.5, delay: 0.2 },
                    }
                  : { x: -6, opacity: 0.6 }
              }
              className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-[0.15em] uppercase text-[#00f0ff] pointer-events-none select-none"
            >
              PRIZE POOL
            </motion.h2>
            <motion.h2
              aria-hidden
              initial={{ x: 6, opacity: 0.6 }}
              animate={
                sectionInView || forcedVisible
                  ? {
                      x: 0,
                      opacity: 0,
                      transition: { duration: 0.5, delay: 0.2 },
                    }
                  : { x: 6, opacity: 0.6 }
              }
              className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-[0.15em] uppercase text-[#ff2a85] pointer-events-none select-none"
            >
              PRIZE POOL
            </motion.h2>

            {/* Real heading, with the flicker fired on top of the boot-in */}
            <motion.h2
              animate={
                sectionInView || forcedVisible
                  ? flickerKeyframes
                  : { opacity: 0 }
              }
              className="relative text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-[0.15em] uppercase mb-3 text-white"
            >
              PRIZE{" "}
              <span className="bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,42,133,0.8)]">
                POOL
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={
              sectionInView || forcedVisible
                ? {
                    scaleX: 1,
                    transition: { duration: 0.4, delay: 0.5, ease: "easeOut" },
                  }
                : { scaleX: 0 }
            }
            className="w-32 h-1 bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#00f0ff] mx-auto mb-4 shadow-[0_0_12px_#ff2a85]"
          />
          <div className="relative group inline-block text-center cursor-default">
            <p className="text-sm sm:text-base font-serif text-gray-200 tracking-wider transition-opacity duration-500 group-hover:opacity-0">
              君のことをいつまでも忘れない。
            </p>
            <p className="absolute inset-0 flex items-center justify-center font-serif text-xl text-gray-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
              I’ll never forget you.
            </p>
          </div>
        </motion.div>

        {/* 2-Column Responsive Layout Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView || forcedVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* LEFT SIDE (7 Cols): Main Terminal Window "GRAND_PRIZE.EXE" */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <TiltCard
              dropShadowColor="#ff2a85"
              onMouseEnter={() => setShowGrandPrizeConfetti(true)}
              onMouseLeave={() => setShowGrandPrizeConfetti(false)}
              className="border-2 border-black"
            >
              {/* OS Titlebar — flat (no translateZ) since it's mostly small text */}
              <div className="bg-gradient-to-r from-[#ff71ce] via-[#fbcfe8] to-[#f4f4f6] px-3 py-2 border-b-2 border-black flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] text-[#1e1e2f] leading-none">
                    ■
                  </span>
                  <span className="font-subheading font-serif font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                    GRAND_PRIZE.EXE // MAIN_CHAMPIONSHIP
                  </span>
                </div>

                {/* Retro OS Window Buttons (_ □ ×) with a real raised bevel */}
                <WindowControls />
              </div>

              {/* Sub-Header Status Strip — flat */}
              <div className="px-3 py-1.5 bg-[#e2e8f0] border-b-2 border-black flex items-center justify-between text-[11px] font-subheading text-[#475569] select-none shrink-0">
                <span className="tracking-wider">
                  ■ PROTOCOL: MAIN_CHAMPIONSHIP
                </span>
                <span className="text-[#00c2cb] font-bold tracking-wider">
                  ■ DISPATCH_NODE: ONLINE
                </span>
              </div>

              {/* Main Content Area — inset "dialog box" bevel around the
                  padding block, so the window reads as a real Win9x panel
                  rather than a flat card. */}
              <div
                style={{ boxShadow: BEVEL_INSET }}
                className="m-2 p-6 sm:p-8 flex-1 flex flex-col justify-between items-center text-center relative z-10 bg-[#f4f4f6]"
              >
                <div>
                  {/* Trophy Icon Box — keep translateZ, it's a decorative graphic, not small text */}
                  <div
                    style={{
                      transform: "translateZ(45px)",
                      transformStyle: "preserve-3d",
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-[#4B0082] border-none border-[#00f0ff] shadow-[4px_4px_0px_0px_#ff2a85] flex items-center justify-center mx-auto mb-4 transition-transform duration-300"
                  >
                    <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#00f0ff] drop-shadow-[0_0_10px_#00f0ff]" />
                  </div>

                  {/* Text elements: no translateZ, so they stay on the same
                      composited plane as the card and don't pick up extra
                      per-frame rasterization/blur while tilting. */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black mb-2 text-[#1e1e2f] tracking-[0.2em] uppercase">
                    GRAND CHAMPION
                  </h2>

                  <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-black bg-gradient-to-r from-[#ff2a85] via-[#7928ca] to-[#00f0ff] bg-clip-text text-transparent mb-4 drop-shadow-[0_0_15px_rgba(255,42,133,0.4)]">
                    ₹40,000
                  </div>

                  <p className="text-[#475569] font-body text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
                    Grand prize awarded for overall exceptional achievement,
                    technical execution, and innovation across all hackathon
                    tracks.
                  </p>
                </div>

                {/* Summary Track Pool Breakdown Grid inside Terminal */}
                <div className="w-full grid grid-cols-3 gap-2 py-3 px-3 bg-[#e2e8f0] border-2 border-[#1e1e2f] mb-6 text-center font-subheading">
                  <div className="border-r border-[#cbd5e1] pr-1">
                    <span className="block text-[10px] text-[#64748b] font-serif uppercase">
                      AI/ML
                    </span>
                    <span className="text-xs sm:text-sm font-bold  text-[#ff2a85]">
                      ₹30,000
                    </span>
                  </div>
                  <div className="border-r border-[#cbd5e1] pr-1">
                    <span className="block text-[10px] text-[#64748b] font-serif uppercase">
                      WEB3
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#00c2cb]">
                      ₹30,000
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#64748b] font-serif uppercase">
                      OPEN
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#7928ca]">
                      ₹30,000
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="w-full bg-gradient-to-r from-[#ff2a85] to-[#7928ca] text-white font-subheading font-extrabold text-xs sm:text-sm tracking-[0.15em] uppercase py-3 px-6 border-2 border-[#1e1e2f] shadow-[4px_4px_0px_0px_#00f0ff] hover:brightness-110 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer select-none">
                  <Trophy className="w-4 h-4 text-white" />
                  <span>GRAND CHAMPIONSHIP POOL</span>
                </div>
              </div>

              {showGrandPrizeConfetti && <Confetti />}

              {/* Bottom Footer Strip — flat */}
              <div className="px-3 py-2 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center justify-between text-[11px] font-subheading text-[#475569] select-none shrink-0">
                <span className="text-[#00c2cb] font-bold font-serif tracking-wider">
                  ■ SYSTEM ONLINE
                </span>
                <span className="tracking-wider font-serif text-[#64748b]">
                  HACK 6.0 // GRAND POOL
                </span>
              </div>
            </TiltCard>
          </motion.div>

          {/* RIGHT SIDE (5 Cols): Stack of 3 OS Info Widgets for Tracks */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col gap-5 justify-between"
          >
            {trackPrizes.map((prize) => (
              <TiltCard
                key={prize.id}
                dropShadowColor={prize.color}
                className="border-2 border-black"
              >
                {/* Titlebar — flat */}
                <div
                  style={{
                    background: `linear-gradient(to right, ${prize.color}, #fbcfe8 60%, #f4f4f6)`,
                  }}
                  className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] text-[#1e1e2f] leading-none">
                      ■
                    </span>
                    <span className="font-subheading font-bold font-serif text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                      {prize.filename}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-subheading font-bold text-[#1e1e2f] bg-white/60 px-1.5 py-0.5">
                      {prize.tag}
                    </span>
                    <span
                      style={{ boxShadow: BEVEL_RAISED }}
                      className="w-4 h-4 text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold"
                    >
                      ×
                    </span>
                  </div>
                </div>

                {/* Card Body — inset bevel panel */}
                <div
                  style={{ boxShadow: BEVEL_INSET }}
                  className="m-1.5 p-4 flex items-start gap-4 flex-1 bg-[#f4f4f6]"
                >
                  {/* Icon Box — keep translateZ, decorative graphic */}
                  <div
                    style={{
                      transform: "translateZ(45px)",
                      transformStyle: "preserve-3d",
                      boxShadow: `3px 3px 0px 0px ${prize.color}`,
                    }}
                    className="w-10 h-10 bg-[#f4f4f6] border-2 border-[#1e1e2f] flex items-center justify-center font-bold shrink-0 transition-transform duration-300"
                  >
                    <prize.icon
                      className="w-5 h-5"
                      style={{ color: prize.color }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-heading font-extrabold text-sm text-[#1e1e2f] uppercase tracking-wide">
                        {prize.title}
                      </h3>
                      <span
                        style={{ color: prize.color }}
                        className="font-heading font-extrabold text-lg"
                      >
                        {prize.amount}
                      </span>
                    </div>

                    <p className="font-body text-xs text-[#64748b] mt-0.5 leading-tight">
                      {prize.description}
                    </p>

                    {/* Breakdown pills */}
                    <div className="mt-2.5 flex items-center gap-2 font-subheading text-[10px]">
                      {prize.distribution.map((dist, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white/90 text-[#1e1e2f] font-semibold rounded-sm"
                        >
                          {dist.position}:{" "}
                          <strong style={{ color: prize.color }}>
                            {dist.amount}
                          </strong>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Metadata — flat, now a real file path instead of
                    a cyberpunk PORT:// string */}
                <div className="px-3 py-1.5 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center font-serif justify-between text-[10px]  text-[#475569] select-none shrink-0">
                  <span className="tracking-wider truncate">{prize.path}</span>
                  <span
                    className="font-bold tracking-wider shrink-0 pl-2"
                    style={{ color: prize.color }}
                  >
                    {prize.status}
                  </span>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </motion.div>

        {/* Special Categories Sub-Section */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 text-[#ff2a85] font-subheading text-xs font-bold uppercase tracking-widest">
              SPECIAL CATEGORY WIDGETS
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 max-w-4xl mx-auto">
            {specialCategories.map((prize) => (
              <TiltCard
                key={prize.id}
                dropShadowColor={prize.color}
                className="border-2 border-black"
              >
                <div
                  style={{
                    background: `linear-gradient(to right, ${prize.color}, #fbcfe8 60%, #f4f4f6)`,
                  }}
                  className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] text-[#1e1e2f] leading-none">
                      ■
                    </span>
                    <span className="font-subheading font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                      {prize.filename}
                    </span>
                  </div>
                  <span className="text-[10px] font-subheading font-bold text-[#1e1e2f] bg-white/70 px-2 py-0.5 rounded">
                    {prize.tag}
                  </span>
                </div>

                <div
                  style={{ boxShadow: BEVEL_INSET }}
                  className="m-1.5 p-4 flex items-center gap-4 flex-1 bg-[#f4f4f6]"
                >
                  <div
                    style={{
                      transform: "translateZ(45px)",
                      transformStyle: "preserve-3d",
                      boxShadow: `3px 3px 0px 0px ${prize.color}`,
                    }}
                    className="w-10 h-10 bg-[#f4f4f6] border-2 border-[#1e1e2f] flex items-center justify-center font-bold shrink-0 transition-transform duration-300"
                  >
                    <prize.icon
                      className="w-5 h-5"
                      style={{ color: prize.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-heading font-extrabold text-sm text-[#1e1e2f] uppercase tracking-wide">
                        {prize.title}
                      </h3>
                      <span
                        style={{ color: prize.color }}
                        className="font-heading font-extrabold text-lg"
                      >
                        {prize.amount}
                      </span>
                    </div>
                    <p className="font-body text-xs text-[#64748b] mt-0.5">
                      {prize.description}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1.5 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center justify-between text-[10px] font-subheading text-[#475569] select-none shrink-0">
                  <span className="tracking-wider truncate">{prize.path}</span>
                  <span
                    className="font-bold tracking-wider shrink-0 pl-2"
                    style={{ color: prize.color }}
                  >
                    {prize.status}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
