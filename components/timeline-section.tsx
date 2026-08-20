"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import localFont from "next/font/local";
import {
  Zap,
  Hourglass,
  Search,
  Rocket,
  Code2,
  PackageCheck,
  Trophy,
} from "lucide-react";

/* ========================================================================
   FONT & CONSTANTS
   ======================================================================== */

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
  fallback: ["monospace", "sans-serif"],
});

const BEVEL_RAISED =
    "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.65)";
const BEVEL_INSET =
    "inset 1px 1px 0 rgba(0,0,0,0.1), inset -1px -1px 0 rgba(255,255,255,0.9)";

/* ========================================================================
   3D TILT CARD COMPONENT
   ======================================================================== */

const TiltCard = ({
                    children,
                    className = "",
                    dropShadowColor = "#ff2a85",
                  }: {
  children: React.ReactNode;
  className?: string;
  dropShadowColor?: string;
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const rafRef = useRef<number | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch =
          window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

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

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rectRef.current = null;
    x.set(0);
    y.set(0);
    setIsPressed(false);
  };

  return (
      <div className="perspective-[1000px] w-full h-full">
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
            className={`group relative bg-[#eeeeee] border-2 border-[#1e1e2f] font-mono overflow-hidden select-none flex flex-col justify-between h-full will-change-transform ${className}`}
        >
          {!isTouchDevice && (
              <motion.div
                  className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
                  style={{
                    background: useTransform([glareX, glareY], (latest) => {
                      const [gx, gy] = latest as [string, string];
                      return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.4), transparent 50%)`;
                    }),
                  }}
              />
          )}
          {children}
        </motion.div>
      </div>
  );
};

const WindowControls = ({ closeColor = "#ff2a85" }: { closeColor?: string }) => (
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
          style={{
            boxShadow: BEVEL_RAISED,
            backgroundColor: closeColor,
          }}
          className="w-4 h-4 text-white flex items-center justify-center text-[9px] font-bold"
      >
      ×
    </span>
    </div>
);

/* ========================================================================
   MAGICAL ORB & SPARKLE FOUNTAIN HEAD
   ======================================================================== */

const SparkleEmitter = () => {
  const particles = useMemo(
      () => [
        { id: 1, x: -16, y: -18, scale: 0.9, duration: 1.1, delay: 0.0, color: "#00f0ff" },
        { id: 2, x: 18, y: -20, scale: 1.1, duration: 1.3, delay: 0.2, color: "#ff2a85" },
        { id: 3, x: -24, y: 8, scale: 0.7, duration: 1.0, delay: 0.4, color: "#ffffff" },
        { id: 4, x: 22, y: 12, scale: 0.8, duration: 1.2, delay: 0.1, color: "#00f0ff" },
        { id: 5, x: -10, y: -30, scale: 1.2, duration: 1.4, delay: 0.3, color: "#b967ff" },
        { id: 6, x: 12, y: -28, scale: 0.6, duration: 0.9, delay: 0.5, color: "#ffd319" },
        { id: 7, x: -20, y: -8, scale: 0.8, duration: 1.15, delay: 0.15, color: "#ff2a85" },
        { id: 8, x: 16, y: -10, scale: 1.0, duration: 1.25, delay: 0.35, color: "#00f0ff" },
      ],
      []
  );

  return (
      <div className="relative w-8 h-8 flex items-center justify-center pointer-events-none">
        {/* Outer Multi-layered Aurora Aura */}
        <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#00f0ff] blur-md"
        />

        {/* Pulsing Core Plasma Orb */}
        <motion.div
            animate={{
              boxShadow: [
                "0 0 12px #00f0ff, 0 0 24px #ff2a85",
                "0 0 20px #ff2a85, 0 0 35px #00f0ff",
                "0 0 12px #00f0ff, 0 0 24px #ff2a85",
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-4 h-4 rounded-full bg-white border-2 border-[#1e1e2f] flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
        </motion.div>

        {/* Floating Sparkle Particles Emitted in Real-time */}
        {particles.map((p) => (
            <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, p.scale, p.scale * 0.5, 0],
                  x: [0, p.x * 0.5, p.x],
                  y: [0, p.y * 0.5, p.y],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeOut",
                }}
                style={{
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}, 0 0 14px ${p.color}`,
                }}
                className="absolute w-2 h-2 rotate-45 pointer-events-none"
            />
        ))}
      </div>
  );
};

/* ========================================================================
   TIMELINE SECTION
   ======================================================================== */

export default function TimelineSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 18,
    restDelta: 0.001,
  });

  const timelineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const cometTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const timelineEvents = [
    {
      file: "PHASE_01.EXE",
      date: "February 21, 2025",
      title: "Registration Opens",
      description: "Sign up and secure your spot for HACK 5.0",
      accentColor: "#00f0ff",
      icon: Zap,
    },
    {
      file: "PHASE_02.EXE",
      date: "March 21, 2025",
      title: "Registration Closes",
      description: "Last day to register for the hackathon",
      accentColor: "#ff2a85",
      icon: Hourglass,
    },
    {
      file: "PHASE_03.EXE",
      date: "March 22, 2025",
      title: "Screening Round",
      description: "Screening round for shortlisted teams",
      accentColor: "#00f0ff",
      icon: Search,
    },
    {
      file: "PHASE_04.EXE",
      date: "April 4, 2025",
      title: "Hackathon Kickoff",
      description: "Opening ceremony and hacking begins onsite",
      accentColor: "#ff2a85",
      icon: Rocket,
    },
    {
      file: "PHASE_05.EXE",
      date: "April 4-5, 2025",
      title: "Hacking Period",
      description: "48 continuous hours of coding, building, and innovation",
      accentColor: "#00f0ff",
      icon: Code2,
    },
    {
      file: "PHASE_06.EXE",
      date: "April 5, 2025",
      title: "Project Submission",
      description: "Final commits and project repository submission",
      accentColor: "#ff2a85",
      icon: PackageCheck,
    },
    {
      file: "PHASE_07.EXE",
      date: "April 6, 2025",
      title: "Judging & Results",
      description: "Live project evaluation and winner announcements",
      accentColor: "#00f0ff",
      icon: Trophy,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
      <section id="timeline" className="py-20 relative font-mono select-none text-white">
        <motion.div
            ref={ref}
            className="container mx-auto px-4 max-w-6xl"
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariant} className="text-center mb-16 flex flex-col items-center">
            <div className="relative mb-3 inline-block">
              <div className="absolute inset-0 bg-[#ff2a85] translate-x-1 translate-y-1"></div>
              <div className="relative bg-white text-black px-4 py-1 text-xs md:text-sm font-bold tracking-widest border-2 border-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#9333ea] inline-block"></span>
                DIRECTORY_02 // TIMELINE
              </div>
            </div>

            <h2
                className={`text-4xl md:text-6xl tracking-wider uppercase font-black ${Hacked_KerX.className}`}
            >
              <span className="text-white drop-shadow-[2px_2px_0px_#00f0ff]">EVENT </span>
              <span className="text-[#ff2a85] drop-shadow-[2px_2px_0px_#00f0ff]">TIMELINE</span>
            </h2>
            <p className="text-gray-300 text-xs md:text-sm mt-3 tracking-widest uppercase">
              Execute schedule according to project timeline
            </p>
          </motion.div>

          {/* Timeline Track Container */}
          <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
            {/* Ambient Track Backing with Neon Hue */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff2a85]/30 via-[#b967ff]/20 to-[#00f0ff]/30 transform md:-translate-x-1/2" />

            {/* Magical Aurora Progress Line */}
            <motion.div
                className="absolute left-6 md:left-1/2 top-0 w-[3px] bg-gradient-to-b from-[#ff2a85] via-[#b967ff] to-[#00f0ff] origin-top z-10 transform md:-translate-x-1/2 shadow-[0_0_15px_#00f0ff,0_0_25px_#ff2a85]"
                style={{ height: timelineHeight }}
            />

            {/* Magical Particle Sparkle Fountain Head */}
            <motion.div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                style={{ top: cometTop }}
            >
              <SparkleEmitter />
            </motion.div>

            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;

              return (
                  <div key={index} className="relative mb-14 md:mb-20 last:mb-0">
                    {/* Node Milestone Diamond */}
                    <div
                        style={{
                          boxShadow: `0 0 10px ${event.accentColor}`,
                          borderColor: event.accentColor,
                        }}
                        className="absolute left-6 md:left-1/2 top-6 w-4 h-4 bg-[#1e1e2f] border-2 transform -translate-x-1/2 rotate-45 z-20 flex items-center justify-center transition-all duration-300"
                    >
                      <div
                          style={{ backgroundColor: event.accentColor }}
                          className="w-1.5 h-1.5"
                      />
                    </div>

                    {/* Alternating Grid Layout */}
                    <div
                        className={`flex flex-col md:flex-row items-stretch ${
                            isLeft ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                    >
                      <div className="hidden md:block md:w-1/2" />
                      <div
                          className={`pl-14 md:pl-0 md:w-1/2 ${
                              isLeft ? "md:pl-10" : "md:pr-10"
                          }`}
                      >
                        <motion.div
                            variants={itemVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                        >
                          <TiltCard dropShadowColor={event.accentColor}>
                            {/* Title Bar */}
                            <div
                                style={{
                                  background: `linear-gradient(to right, ${event.accentColor}, #fbcfe8 60%, #eeeeee)`,
                                }}
                                className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0"
                            >
                              <div className="flex items-center gap-2 truncate">
                            <span className="text-[10px] text-[#1e1e2f] leading-none">
                              ■
                            </span>
                                <span className="font-mono font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                              {event.file}
                            </span>
                              </div>

                              <WindowControls closeColor={event.accentColor} />
                            </div>

                            {/* Card Body */}
                            <div
                                style={{ boxShadow: BEVEL_INSET }}
                                className="m-2 p-4 sm:p-5 flex items-start gap-4 flex-1 bg-[#f7f7f9] border border-[#d0d0d8]"
                            >
                              {/* 3D Icon Badge */}
                              <div
                                  style={{
                                    transform: "translateZ(35px)",
                                    transformStyle: "preserve-3d",
                                    boxShadow: `3px 3px 0px 0px ${event.accentColor}`,
                                  }}
                                  className="w-11 h-11 bg-[#1e1e2f] border border-[#1e1e2f] flex items-center justify-center shrink-0"
                              >
                                <Icon
                                    className="w-5 h-5"
                                    style={{ color: event.accentColor }}
                                />
                              </div>

                              {/* Content Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                                  <h3 className="font-mono font-black text-sm sm:text-base text-[#1e1e2f] uppercase tracking-tight truncate">
                                    {event.title}
                                  </h3>
                                  <span
                                      style={{ color: event.accentColor }}
                                      className="font-mono font-black text-xs sm:text-sm tracking-wider whitespace-nowrap"
                                  >
                                {event.date}
                              </span>
                                </div>

                                <p className="font-mono text-xs sm:text-[13px] text-[#64748b] leading-relaxed">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </TiltCard>
                        </motion.div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </motion.div>
      </section>
  );
}