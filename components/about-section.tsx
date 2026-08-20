"use client";

import { Users, Trophy, Clock, Layers } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import localFont from "next/font/local";

/* ========================================================================
   FONT
   ======================================================================== */

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
  fallback: ["monospace", "sans-serif"],
});

/* ========================================================================
   WIN9X BEVEL SYSTEM
   ======================================================================== */

const BEVEL_RAISED =
    "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.65)";

const BEVEL_INSET =
    "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.25)";

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

  const springConfig = {
    stiffness: 220,
    damping: 26,
    mass: 0.5,
  };

  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

  const shadowX = useTransform(mouseX, [-0.5, 0.5], [17, -17]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [17, -17]);

  const boxShadowValue = useTransform([shadowX, shadowY], (latest) => {
    const [sx, sy] = latest as [number, number];
    return `${sx}px ${sy}px 0px 0px ${dropShadowColor}, ${sx * 1.6}px ${
        sy * 1.6 + 14
    }px 32px -6px rgba(0,0,0,0.55)`;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch =
          window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0;

      setIsTouchDevice(isTouch);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }

    const rect = rectRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rawX = (clientX - rect.left) / rect.width - 0.5;
      const rawY = (clientY - rect.top) / rect.height - 0.5;

      const pctX = Math.min(0.5, Math.max(-0.5, rawX));
      const pctY = Math.min(0.5, Math.max(-0.5, rawY));

      x.set(pctX);
      y.set(pctY);
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
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
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className={`group relative bg-[#f4f4f6] border-2 border-[#1e1e2f] font-mono overflow-hidden select-none flex flex-col h-full will-change-transform ${className}`}
        >
          {/* Holographic Sheen */}
          {!isTouchDevice && (
              <motion.div
                  className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
                  style={{
                    background: useTransform([glareX, glareY], (latest) => {
                      const [gx, gy] = latest as [string, string];
                      return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.45), transparent 50%)`;
                    }),
                  }}
              />
          )}

          {children}
        </motion.div>
      </div>
  );
};

/* ========================================================================
   WINDOW CONTROLS
   ======================================================================== */

const WindowControls = ({ closeColor = "#ff2a85" }: { closeColor?: string }) => (
    <div className="flex items-center gap-1.5 flex-shrink-0">
    <span
        style={{ boxShadow: BEVEL_RAISED }}
        className="w-4 h-4 sm:w-5 sm:h-5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold"
    >
      _
    </span>
      <span
          style={{ boxShadow: BEVEL_RAISED }}
          className="w-4 h-4 sm:w-5 sm:h-5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold"
      >
      □
    </span>
      <span
          style={{
            boxShadow: BEVEL_RAISED,
            backgroundColor: closeColor,
          }}
          className="w-4 h-4 sm:w-5 sm:h-5 text-white flex items-center justify-center text-[10px] font-extrabold"
      >
      ×
    </span>
    </div>
);

/* ========================================================================
   ABOUT SECTION
   ======================================================================== */

export default function AboutSection() {
  const stats = [
    {
      icon: Users,
      title: "500+",
      text: "Participants",
      accentColor: "#ff2a85",
      exeName: "USERS_METRIC.EXE",
    },
    {
      icon: Trophy,
      title: "₹1,50,000",
      text: "Prize Pool",
      accentColor: "#00f0ff",
      exeName: "BOUNTY_POOL.EXE",
    },
    {
      icon: Clock,
      title: "48 HRS",
      text: "Coding Sprint",
      accentColor: "#00f0ff",
      exeName: "SPRINT_CLOCK.EXE",
    },
    {
      icon: Layers,
      title: "3 TRACKS",
      text: "Core Domains",
      accentColor: "#ff2a85",
      exeName: "DOMAIN_STACK.EXE",
    },
  ];

  return (
      <motion.section
          id="about"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative py-24 px-4 sm:px-6"
      >
        <div className="container relative mx-auto max-w-6xl">
          {/* HEADER */}
          <div className="mb-16 text-center">
            <div className="relative inline-block">
              <h2
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.15em] uppercase text-white ${Hacked_KerX.className}`}
              >
                ABOUT <span className="text-[#ff2a85]">HACK 6.0</span>
              </h2>
            </div>

            <div className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#00f0ff] shadow-[0_0_12px_#ff2a85]" />

            <p className="mx-auto mt-5 max-w-2xl font-mono text-xs sm:text-sm md:text-base font-semibold text-[#ffffff]">
              Explore the core specifications, architecture, and deployment
              details behind the national hackathon.
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT — ABOUT OVERVIEW WINDOW */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 flex flex-col"
            >
              <TiltCard dropShadowColor="#ff2a85" className="border-2 border-black">
                {/* TITLE BAR */}
                <div className="bg-gradient-to-r from-[#ff71ce] via-[#fbcfe8] to-[#f4f4f6] px-3 py-2 border-b-2 border-black flex items-center justify-between select-none shrink-0">
                  <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] text-[#1e1e2f] leading-none">
                    ■
                  </span>
                    <span className="font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                    SYSTEM_MANIFEST.EXE
                  </span>
                  </div>
                  <WindowControls closeColor="#ff2a85" />
                </div>

                {/* BODY */}
                <div
                    style={{ boxShadow: BEVEL_INSET }}
                    className="m-2 p-5 sm:p-7 flex-1 bg-[#f4f4f6] space-y-4 text-xs sm:text-sm leading-relaxed text-[#1e1e2f] font-mono"
                >
                  <div className="border-l-4 border-[#ff2a85] pl-3 py-1 bg-white/80 border border-[#1e1e2f]/20">
                    <p className="font-bold text-[#ff2a85] uppercase text-[11px] tracking-wider">
                      &gt; INITIATING BRIEFING SEQUENCE
                    </p>
                  </div>

                  <p>
                    <strong className="text-black font-black bg-[#00f0ff]/20 px-1 py-0.5 border border-[#00f0ff]">
                      HACK 6.0
                    </strong>{" "}
                    is the sixth edition of the premier national-level onsite hackathon
                    organized by the{" "}
                    <strong>Computer Science Engineers&apos; Community (CSEC)</strong>{" "}
                    of the Department of CSE, NIT Hamirpur.
                  </p>

                  <p>
                    Over <strong>48 continuous hours</strong>, builders, developers,
                    and designers gather to ideate, execute, and present solutions to
                    real-world problems, assisted by expert mentors and industry judges.
                  </p>

                  <p>
                    Whether you&apos;re an experienced hacker or writing your first
                    production pipeline, the platform is structured for all builders
                    ready to push the frontiers of software and innovation.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* RIGHT — 2x2 STAT WINDOWS */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
            >
              {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <TiltCard
                        key={item.exeName}
                        dropShadowColor={item.accentColor}
                        className="border-2 border-black"
                    >
                      {/* TITLE BAR */}
                      <div
                          style={{
                            background: `linear-gradient(to right, ${item.accentColor}, #fbcfe8 60%, #f4f4f6)`,
                          }}
                          className="px-2.5 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                      <span className="text-[9px] text-[#1e1e2f] leading-none">
                        ■
                      </span>
                          <span className="font-bold text-[11px] uppercase text-[#1e1e2f] tracking-wider truncate">
                        {item.exeName}
                      </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                      <span
                          style={{ boxShadow: BEVEL_RAISED }}
                          className="w-3.5 h-3.5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[8px] font-bold"
                      >
                        _
                      </span>
                          <span
                              style={{
                                boxShadow: BEVEL_RAISED,
                                backgroundColor:
                                    item.accentColor === "#ff2a85"
                                        ? "#ff2a85"
                                        : "#00c2cb",
                              }}
                              className="w-3.5 h-3.5 text-white flex items-center justify-center text-[8px] font-extrabold"
                          >
                        ×
                      </span>
                        </div>
                      </div>

                      {/* CARD BODY */}
                      <div
                          style={{ boxShadow: BEVEL_INSET }}
                          className="m-1.5 p-4 flex flex-col items-center justify-center text-center flex-1 bg-[#f4f4f6]"
                      >
                        {/* 3D ICON BADGE */}
                        <div
                            style={{
                              transform: "translateZ(35px)",
                              transformStyle: "preserve-3d",
                              boxShadow: `3px 3px 0px 0px ${item.accentColor}`,
                            }}
                            className="w-11 h-11 bg-[#f4f4f6] border-2 border-[#1e1e2f] flex items-center justify-center mb-3 shrink-0"
                        >
                          <Icon
                              className="w-5 h-5"
                              style={{ color: item.accentColor }}
                          />
                        </div>

                        <h3
                            className="font-black text-xl md:text-2xl tracking-tight"
                            style={{ color: item.accentColor }}
                        >
                          {item.title}
                        </h3>

                        <p className="font-mono text-xs font-bold text-[#1e1e2f] uppercase tracking-wider mt-1">
                          {item.text}
                        </p>
                      </div>
                    </TiltCard>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>
  );
}