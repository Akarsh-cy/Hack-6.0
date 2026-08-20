"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Trophy,
  Gift,
  Lightbulb,
  Hexagon,
  Gem,
  GraduationCap,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
  fallback: ["monospace", "sans-serif"],
});

const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const BEVEL_RAISED =
    "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.65)";
const BEVEL_INSET =
    "inset 1px 1px 0 rgba(0,0,0,0.1), inset -1px -1px 0 rgba(255,255,255,0.9)";

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
      scaleY: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: {
        duration: 0.15,
      },
      filter: {
        duration: 0.5,
        delay: 0.15,
      },
    },
  },
};

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

  const springConfig = { stiffness: 220, damping: 26, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

  const shadowX = useTransform(mouseX, [-0.5, 0.5], [14, -14]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [14, -14]);

  const boxShadowValue = useTransform([shadowX, shadowY], (latest) => {
    const [sx, sy] = latest as [number, number];
    return `${sx}px ${sy}px 0px 0px ${dropShadowColor}, ${sx * 1.4}px ${
        sy * 1.4 + 10
    }px 24px -4px rgba(0,0,0,0.45)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    if (!rectRef.current) rectRef.current = e.currentTarget.getBoundingClientRect();
    const rect = rectRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rawX = (clientX - rect.left) / rect.width - 0.5;
      const rawY = (clientY - rect.top) / rect.height - 0.5;
      x.set(Math.min(0.5, Math.max(-0.5, rawX)));
      y.set(Math.min(0.5, Math.max(-0.5, rawY)));
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
    rectRef.current = e.currentTarget.getBoundingClientRect();
    if (onMouseEnter) onMouseEnter();
  };

  return (
      <div className="perspective-[1000px] w-full h-full">
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnterEvent}
            onMouseLeave={handleMouseLeaveEvent}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              rotateX: isTouchDevice ? 0 : rotateX,
              rotateY: isTouchDevice ? 0 : rotateY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
              boxShadow: isTouchDevice
                  ? `6px 6px 0px 0px ${dropShadowColor}`
                  : boxShadowValue,
            }}
            animate={{ scale: isPressed ? 0.98 : 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
                "group relative bg-[#eeeeee] border-2 border-[#1e1e2f] font-body overflow-hidden select-none flex flex-col justify-between h-full will-change-transform",
                className
            )}
        >
          {!isTouchDevice && (
              <motion.div
                  className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
                  style={{
                    background: useTransform([glareX, glareY], (latest) => {
                      const [gx, gy] = latest as [string, string];
                      return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.4), ${hexToRgba(
                          dropShadowColor,
                          0.02
                      )} 15%, transparent 50%)`;
                    }),
                  }}
              />
          )}
          {children}
        </motion.div>
      </div>
  );
};

const WindowControls = () => (
    <div className="flex items-center gap-1 shrink-0">
    <span
        style={{ boxShadow: BEVEL_RAISED }}
        className="w-4 h-4 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[9px] font-bold"
    >
      _
    </span>
      <span
          style={{ boxShadow: BEVEL_RAISED }}
          className="w-4 h-4 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[8px] font-bold"
      >
      □
    </span>
      <span
          style={{ boxShadow: BEVEL_RAISED }}
          className="w-4 h-4 bg-[#ff2a85] text-white flex items-center justify-center text-[9px] font-bold"
      >
      ×
    </span>
    </div>
);

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
            initial={{ top: "-5%", left: `${left}%`, opacity: 0 }}
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
  const [hasTriggeredInitialConfetti, setHasTriggeredInitialConfetti] = useState(false);

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const trackPrizes = [
    {
      id: "track-aiml",
      icon: Lightbulb,
      title: "AI/ML Track",
      amount: "₹30,000",
      color: "#00f0ff",
      filename: "TRACK_AIML.EXE",
      description: "Outstanding performance and creative solutions in AI & Machine Learning",
      distribution: [
        { position: "1st", amount: "₹15,000" },
        { position: "2nd", amount: "₹10,000" },
        { position: "3rd", amount: "₹5,000" },
      ],
    },
    {
      id: "track-blockchain",
      icon: Hexagon,
      title: "Blockchain Track",
      amount: "₹30,000",
      color: "#ff2a85",
      filename: "TRACK_BLOCKCHAIN.EXE",
      description: "Exceptional decentralized applications and Web3 solutions",
      distribution: [
        { position: "1st", amount: "₹15,000" },
        { position: "2nd", amount: "₹10,000" },
        { position: "3rd", amount: "₹5,000" },
      ],
    },
    {
      id: "track-open",
      icon: Gem,
      title: "Open Innovation Track",
      amount: "₹30,000",
      color: "#00f0ff",
      filename: "TRACK_OPEN.EXE",
      description: "Breakthrough ideas and creative hacks outside specialized tracks",
      distribution: [
        { position: "1st", amount: "₹15,000" },
        { position: "2nd", amount: "₹10,000" },
        { position: "3rd", amount: "₹5,000" },
      ],
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
      description: "Best hack developed by an all-female team.",
    },
    {
      id: "special-beginners",
      icon: GraduationCap,
      title: "Beginners Team",
      amount: "₹10,000",
      color: "#00f0ff",
      filename: "CATEGORY_BEGINNERS.DLL",
      description: "Best hack by a first-year beginner team.",
    },
  ];

  return (
      <section
          id="prizes"
          className="py-16 md:py-24 relative overflow-hidden text-white font-mono select-none"
      >
        <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
              variants={crtBootVariants}
              initial="hidden"
              animate={sectionInView || forcedVisible ? "visible" : "hidden"}
              className="text-center mb-12 md:mb-16 flex flex-col items-center"
          >
            {/* Retro Directory Tag Header */}
            <div className="relative mb-3 inline-block">
              <div className="absolute inset-0 bg-[#ff2a85] translate-x-1 translate-y-1"></div>
              <div className="relative bg-white text-black px-4 py-1 text-xs md:text-sm font-bold tracking-widest border-2 border-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#9333ea] inline-block"></span>
                DIRECTORY_03 // PRIZES
              </div>
            </div>

            <h2
                className={`text-4xl md:text-6xl tracking-wider uppercase font-black ${Hacked_KerX.className}`}
            >
              <span className="text-white drop-shadow-[2px_2px_0px_#00f0ff]">PRIZE </span>
              <span className="text-[#ff2a85] drop-shadow-[2px_2px_0px_#00f0ff]">POOL</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm mt-3 tracking-widest uppercase">
              Compete, innovate, and claim your share of the bounty
            </p>
          </motion.div>

          {/* Main Layout */}
          <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={sectionInView || forcedVisible ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* GRAND PRIZE */}
            <motion.div
                variants={itemVariants}
                className="lg:col-span-6 flex flex-col h-full"
            >
              <TiltCard
                  dropShadowColor="#ff2a85"
                  onMouseEnter={() => setShowGrandPrizeConfetti(true)}
                  onMouseLeave={() => setShowGrandPrizeConfetti(false)}
              >
                <div className="bg-gradient-to-r from-[#ff71ce] via-[#fbcfe8] to-[#eeeeee] px-3 py-2 border-b-2 border-[#1e1e2f] flex items-center justify-between">
                <span className="font-mono font-bold text-xs uppercase text-[#1e1e2f] tracking-wider">
                  GRAND_PRIZE.EXE
                </span>
                  <WindowControls />
                </div>

                <div
                    style={{ boxShadow: BEVEL_INSET }}
                    className="m-2.5 p-6 sm:p-8 flex-1 flex flex-col justify-between items-center text-center bg-[#f7f7f9] border border-[#d0d0d8]"
                >
                  <div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#2b0845] border-2 border-[#ff2a85] shadow-[4px_4px_0px_0px_#00f0ff] flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#00f0ff] drop-shadow-[0_0_8px_#00f0ff]" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-mono font-black mb-1 text-[#1e1e2f] tracking-wider uppercase">
                      GRAND CHAMPION
                    </h2>

                    <div className="text-4xl sm:text-5xl font-mono font-black bg-gradient-to-r from-[#ff2a85] via-[#7928ca] to-[#00f0ff] bg-clip-text text-transparent mb-3">
                      ₹40,000
                    </div>

                    <p className="text-[#475569] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed mb-6 font-mono">
                      Awarded for overall highest score, technical excellence, and impact across all domains.
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#e2e8f0] border-2 border-[#1e1e2f] text-center font-mono">
                    <div className="border-r border-[#cbd5e1] pr-1">
                      <span className="block text-[9px] text-[#64748b] font-bold">AI/ML</span>
                      <span className="text-xs sm:text-sm font-bold text-[#ff2a85]">₹30,000</span>
                    </div>
                    <div className="border-r border-[#cbd5e1] pr-1">
                      <span className="block text-[9px] text-[#64748b] font-bold">WEB3</span>
                      <span className="text-xs sm:text-sm font-bold text-[#00c2cb]">₹30,000</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-[#64748b] font-bold">OPEN</span>
                      <span className="text-xs sm:text-sm font-bold text-[#7928ca]">₹30,000</span>
                    </div>
                  </div>
                </div>

                {showGrandPrizeConfetti && <Confetti />}
              </TiltCard>
            </motion.div>

            {/* TRACK PRIZES */}
            <motion.div
                variants={itemVariants}
                className="lg:col-span-6 flex flex-col gap-4 justify-between"
            >
              {trackPrizes.map((prize) => (
                  <TiltCard
                      key={prize.id}
                      dropShadowColor={prize.color}
                  >
                    <div
                        style={{
                          background: `linear-gradient(to right, ${prize.color}, #fbcfe8 60%, #eeeeee)`,
                        }}
                        className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between"
                    >
                  <span className="font-mono font-bold text-xs uppercase text-[#1e1e2f] tracking-wider">
                    {prize.filename}
                  </span>
                      <WindowControls />
                    </div>

                    <div
                        style={{ boxShadow: BEVEL_INSET }}
                        className="m-2 p-3 sm:p-4 flex items-start gap-3.5 flex-1 bg-[#f7f7f9] border border-[#d0d0d8]"
                    >
                      <div
                          style={{ boxShadow: `3px 3px 0px 0px ${prize.color}` }}
                          className="w-10 h-10 bg-[#1e1e2f] border border-[#1e1e2f] flex items-center justify-center shrink-0"
                      >
                        <prize.icon className="w-5 h-5" style={{ color: prize.color }} />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="font-mono font-black text-sm text-[#1e1e2f] uppercase tracking-wide">
                            {prize.title}
                          </h3>
                          <span
                              style={{ color: prize.color }}
                              className="font-mono font-black text-base"
                          >
                        {prize.amount}
                      </span>
                        </div>

                        <p className="font-mono text-[11px] text-[#64748b] leading-tight mb-2">
                          {prize.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px]">
                          {prize.distribution.map((dist, i) => (
                              <span
                                  key={i}
                                  className="px-2 py-0.5 bg-[#e2e8f0] text-[#1e1e2f] font-bold border border-[#cbd5e1]"
                              >
                          {dist.position}: <span style={{ color: prize.color }}>{dist.amount}</span>
                        </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
              ))}
            </motion.div>
          </motion.div>

          {/* SPECIAL CATEGORIES */}
          <div className="mt-12">
            <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-[#1e1e2f] border border-[#ff2a85] text-[#ff2a85] font-mono text-xs font-bold uppercase tracking-wider">
              SPECIAL CATEGORIES
            </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {specialCategories.map((prize) => (
                  <TiltCard
                      key={prize.id}
                      dropShadowColor={prize.color}
                  >
                    <div
                        style={{
                          background: `linear-gradient(to right, ${prize.color}, #fbcfe8 60%, #eeeeee)`,
                        }}
                        className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between"
                    >
                  <span className="font-mono font-bold text-xs uppercase text-[#1e1e2f] tracking-wider">
                    {prize.filename}
                  </span>
                      <WindowControls />
                    </div>

                    <div
                        style={{ boxShadow: BEVEL_INSET }}
                        className="m-2 p-3 sm:p-4 flex items-center gap-3.5 flex-1 bg-[#f7f7f9] border border-[#d0d0d8]"
                    >
                      <div
                          style={{ boxShadow: `3px 3px 0px 0px ${prize.color}` }}
                          className="w-10 h-10 bg-[#1e1e2f] border border-[#1e1e2f] flex items-center justify-center shrink-0"
                      >
                        <prize.icon className="w-5 h-5" style={{ color: prize.color }} />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="font-mono font-black text-sm text-[#1e1e2f] uppercase tracking-wide">
                            {prize.title}
                          </h3>
                          <span
                              style={{ color: prize.color }}
                              className="font-mono font-black text-base"
                          >
                        {prize.amount}
                      </span>
                        </div>

                        <p className="font-mono text-[11px] text-[#64748b] leading-tight">
                          {prize.description}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}