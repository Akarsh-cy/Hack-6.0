"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  ShieldCheck,
  Cpu,
  Terminal,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

// Convert a hex color into an rgba() string with a given alpha
const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Win9x-style raised/inset bevels matching prize-section
const BEVEL_RAISED =
  "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.65)";
const BEVEL_INSET =
  "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.25)";

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
      scaleY: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.15 },
      filter: { duration: 0.5, delay: 0.15 },
    },
  },
};

const flickerKeyframes = {
  opacity: [0, 1, 0.4, 1, 0.6, 1],
  transition: {
    duration: 0.4,
    delay: 0.35,
    times: [0, 0.2, 0.35, 0.5, 0.7, 1],
  },
};

// 3D Tilt Wrapper Component identical to prize-section
const TiltCard = ({
  children,
  className,
  dropShadowColor = "#ff2a85",
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  dropShadowColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
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
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
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
        onClick={onClick}
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
          "group relative bg-[#f4f4f6] border-3 border-[#1e1e2f] font-body overflow-hidden select-none flex flex-col justify-between h-full will-change-transform transition-colors duration-300 cursor-pointer",
          className
        )}
      >
        {!isTouchDevice && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            style={{
              background: useTransform([glareX, glareY], (latest) => {
                const [gx, gy] = latest as [string, string];
                return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.5), ${hexToRgba(
                  dropShadowColor,
                  0.02
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

const WindowControls = ({ onClose }: { onClose?: () => void }) => (
  <div className="flex items-center gap-1.5 flex-shrink-0 font-subheading">
    <span
      style={{ boxShadow: BEVEL_RAISED }}
      className="w-5 h-5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold select-none cursor-default"
    >
      _
    </span>
    <span
      style={{ boxShadow: BEVEL_RAISED }}
      className="w-5 h-5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold select-none cursor-default"
    >
      □
    </span>
    <button
      type="button"
      onClick={(e) => {
        if (onClose) {
          e.stopPropagation();
          onClose();
        }
      }}
      style={{ boxShadow: BEVEL_RAISED }}
      className="w-5 h-5 bg-[#ff2a85] text-white flex items-center justify-center text-[10px] font-extrabold hover:brightness-110 transition-all cursor-pointer"
    >
      ×
    </button>
  </div>
);

const ScanlineOverlay = () => (
  <div
    className="absolute inset-0 pointer-events-none -z-10 opacity-[0.06]"
    style={{
      backgroundImage:
        "repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 3px)",
    }}
  />
);

export interface Judge {
  id: string;
  name: string;
  title: string;
  company: string;
  category: "AI / ML" | "Web3" | "Cyber Security" | "Cloud & Infra" | "UI / UX" | "Open Innovation";
  color: string;
  filename: string;
  tag: string;
  path: string;
  status: string;
  image: string;
  bio: string;
  evaluationCriteria: string;
  specialties: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// Exactly 8 Judge panels with name "No Name" and Lorem Ipsum descriptions
const judgesData: Judge[] = [
  {
    id: "judge-1",
    name: "No Name",
    title: "Judge Panel #01",
    company: "Organization",
    category: "AI / ML",
    color: "#00f0ff",
    filename: "JUDGE_01.EXE",
    tag: "PANEL_01",
    path: "C:\\HACK6\\JUDGES\\JUDGE_01.EXE",
    status: "■ VERIFIED",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    evaluationCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    specialties: ["LOREM", "IPSUM", "DOLOR"],
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "judge-2",
    name: "No Name",
    title: "Judge Panel #02",
    company: "Organization",
    category: "Web3",
    color: "#ff2a85",
    filename: "JUDGE_02.DLL",
    tag: "PANEL_02",
    path: "C:\\HACK6\\JUDGES\\JUDGE_02.DLL",
    status: "■ ACTIVE",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    evaluationCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    specialties: ["CONSECTETUR", "ADIPISCING", "ELIT"],
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "judge-3",
    name: "No Name",
    title: "Judge Panel #03",
    company: "Organization",
    category: "Cyber Security",
    color: "#ffd319",
    filename: "JUDGE_03.SYS",
    tag: "PANEL_03",
    path: "C:\\HACK6\\JUDGES\\JUDGE_03.SYS",
    status: "■ ONLINE",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    evaluationCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    specialties: ["SED", "EIUSMOD", "TEMPOR"],
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "judge-4",
    name: "No Name",
    title: "Judge Panel #04",
    company: "Organization",
    category: "Cloud & Infra",
    color: "#b967ff",
    filename: "JUDGE_04.EXE",
    tag: "PANEL_04",
    path: "C:\\HACK6\\JUDGES\\JUDGE_04.EXE",
    status: "■ READY",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    evaluationCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    specialties: ["INCIDIDUNT", "LABORE", "DOLORE"],
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "judge-5",
    name: "No Name",
    title: "Judge Panel #05",
    company: "Organization",
    category: "UI / UX",
    color: "#ff2a85",
    filename: "JUDGE_05.DLL",
    tag: "PANEL_05",
    path: "C:\\HACK6\\JUDGES\\JUDGE_05.DLL",
    status: "■ VERIFIED",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    evaluationCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    specialties: ["MAGNA", "ALIQUA", "VENIAM"],
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "judge-6",
    name: "No Name",
    title: "Judge Panel #06",
    company: "Organization",
    category: "Open Innovation",
    color: "#00f0ff",
    filename: "JUDGE_06.EXE",
    tag: "PANEL_06",
    path: "C:\\HACK6\\JUDGES\\JUDGE_06.EXE",
    status: "■ ACTIVE",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    evaluationCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    specialties: ["NOSTRUD", "EXERCITATION", "ULLAMCO"],
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "judge-7",
    name: "No Name",
    title: "Judge Panel #07",
    company: "Organization",
    category: "Open Innovation",
    color: "#ffd319",
    filename: "JUDGE_07.SYS",
    tag: "PANEL_07",
    path: "C:\\HACK6\\JUDGES\\JUDGE_07.SYS",
    status: "■ ONLINE",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    evaluationCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    specialties: ["LABORIS", "ALIQUIP", "COMMODO"],
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: "judge-8",
    name: "No Name",
    title: "Judge Panel #08",
    company: "Organization",
    category: "Open Innovation",
    color: "#b967ff",
    filename: "JUDGE_08.EXE",
    tag: "PANEL_08",
    path: "C:\\HACK6\\JUDGES\\JUDGE_08.EXE",
    status: "■ VERIFIED",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    evaluationCriteria: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    specialties: ["CONSEQUAT", "DUIS", "AUTE"],
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
];

export default function JudgesSection() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px 0px",
  });

  const [forcedVisible, setForcedVisible] = useState(false);
  const [activeModalJudge, setActiveModalJudge] = useState<Judge | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setForcedVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="judges"
      className="py-16 md:py-24 bg-gradient-to-b from-[#18112d] via-[#241344] to-[#45185d] relative overflow-hidden text-white font-body select-none min-h-screen flex flex-col justify-center"
    >
      {/* Ambient Lighting & Scanline Backdrop matching prize-section */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#ff2a85]/15 filter blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#00f0ff]/15 filter blur-[150px]" />
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

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Section Header matching prize-section */}
        <motion.div
          variants={crtBootVariants}
          initial="hidden"
          animate={sectionInView || forcedVisible ? "visible" : "hidden"}
          style={{ transformOrigin: "center" }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="relative inline-block">
            {/* RGB Ghosting layers matching prize-section */}
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
              JUDGES PANEL
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
              JUDGES PANEL
            </motion.h2>

            <motion.h2
              animate={
                sectionInView || forcedVisible
                  ? flickerKeyframes
                  : { opacity: 0 }
              }
              className="relative text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-[0.15em] uppercase mb-3 text-white"
            >
              JUDGES{" "}
              <span className="bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,42,133,0.8)]">
                PANEL
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

          <p className="text-xs sm:text-sm font-subheading text-gray-200 tracking-wider max-w-xl mx-auto uppercase">
            // HACK_6.0.SYS :: EVALUATING INNOVATION & CODE EXECUTION
          </p>
        </motion.div>

        {/* 8 Panel Cards Grid matching prize-section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView || forcedVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {judgesData.map((judge) => (
            <motion.div key={judge.id} variants={itemVariants} className="h-full">
              <TiltCard
                dropShadowColor={judge.color}
                onClick={() => setActiveModalJudge(judge)}
                className="border-2 border-black h-full flex flex-col justify-between"
              >
                {/* Win9x Titlebar Header matching prize-section */}
                <div
                  style={{
                    background: `linear-gradient(to right, ${judge.color}, #fbcfe8 60%, #f4f4f6)`,
                  }}
                  className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0"
                >
                  <div className="flex items-center gap-2 truncate pr-1">
                    <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                    <span className="font-subheading font-bold font-serif text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                      {judge.filename}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-subheading font-bold text-[#1e1e2f] bg-white/60 px-1.5 py-0.5 uppercase tracking-wider">
                      {judge.tag}
                    </span>
                    <WindowControls />
                  </div>
                </div>

                {/* Sub-Header Status Strip matching prize-section */}
                <div className="px-3 py-1.5 bg-[#e2e8f0] border-b-2 border-black flex items-center justify-between text-[11px] font-subheading text-[#475569] select-none shrink-0">
                  <span className="tracking-wider text-[10px]">
                    CAT: <strong style={{ color: judge.color }}>{judge.category}</strong>
                  </span>
                  <span
                    className="font-bold tracking-wider text-[10px]"
                    style={{ color: judge.color }}
                  >
                    {judge.status}
                  </span>
                </div>

                {/* Main Card Content Body - inset bevel matching prize-section */}
                <div
                  style={{ boxShadow: BEVEL_INSET }}
                  className="m-1.5 p-4 flex-1 flex flex-col justify-between bg-[#f4f4f6] text-[#1e1e2f]"
                >
                  <div>
                    {/* Judge Avatar Frame with offset drop-shadow */}
                    <div className="relative mb-3 flex items-center justify-center">
                      <div
                        style={{
                          transform: "translateZ(45px)",
                          transformStyle: "preserve-3d",
                          boxShadow: `3px 3px 0px 0px ${judge.color}`,
                        }}
                        className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#f4f4f6] border-2 border-[#1e1e2f] overflow-hidden transition-transform duration-300"
                      >
                        <img
                          src={judge.image}
                          alt={judge.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Judge Meta Info */}
                    <div className="text-center">
                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#1e1e2f] uppercase tracking-wide line-clamp-1">
                        {judge.name}
                      </h3>
                      <p
                        className="font-subheading text-xs font-bold uppercase tracking-wide line-clamp-1 mt-0.5"
                        style={{ color: judge.color }}
                      >
                        {judge.title}
                      </p>
                      <p className="font-subheading text-[11px] font-semibold text-[#64748b] tracking-wider mb-2">
                        @ {judge.company}
                      </p>

                      {/* Lorem Ipsum Bio */}
                      <p className="font-body text-xs text-[#64748b] leading-tight line-clamp-2 mb-3">
                        {judge.bio}
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Specialty Pills */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                      {judge.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white/90 text-[#1e1e2f] font-semibold rounded-sm text-[10px] font-subheading"
                        >
                          #{spec}
                        </span>
                      ))}
                    </div>

                    {/* Action Button styled like Prize Section CTAs */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalJudge(judge);
                      }}
                      className="w-full bg-gradient-to-r from-[#ff2a85] to-[#7928ca] text-white font-subheading font-extrabold text-[11px] tracking-[0.15em] uppercase py-2 px-3 border-2 border-[#1e1e2f] shadow-[3px_3px_0px_0px_#00f0ff] hover:brightness-110 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none"
                    >
                      <Terminal className="w-3.5 h-3.5 text-white" />
                      <span>INSPECT_PROFILE.EXE</span>
                    </div>
                  </div>
                </div>

                {/* Footer File Path matching prize-section */}
                <div className="px-3 py-1.5 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center font-serif justify-between text-[10px] text-[#475569] select-none shrink-0">
                  <span className="tracking-wider truncate">{judge.path}</span>
                  <div className="flex items-center gap-2 shrink-0 ml-1">
                    {judge.socials.linkedin && (
                      <a
                        href={judge.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#475569] hover:text-[#00f0ff] transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {judge.socials.twitter && (
                      <a
                        href={judge.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#475569] hover:text-[#ff2a85] transition-colors"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {judge.socials.github && (
                      <a
                        href={judge.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#475569] hover:text-[#b967ff] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Win95 OS Window Profile Inspector Modal strictly using prize-section light theme tokens */}
      <AnimatePresence>
        {activeModalJudge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#f4f4f6] border-2 border-black shadow-[8px_8px_0px_0px_#ff2a85] overflow-hidden text-[#1e1e2f] font-subheading"
            >
              {/* Titlebar */}
              <div
                style={{
                  background: `linear-gradient(to right, ${activeModalJudge.color}, #fbcfe8 60%, #f4f4f6)`,
                }}
                className="px-3 py-2 border-b-2 border-black flex items-center justify-between select-none"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-xs text-[#1e1e2f] font-bold">■</span>
                  <span className="font-subheading font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                    {activeModalJudge.filename} // INSPECT_WINDOW
                  </span>
                </div>
                <WindowControls onClose={() => setActiveModalJudge(null)} />
              </div>

              {/* Sub-Header Status Strip */}
              <div className="px-3 py-1.5 bg-[#e2e8f0] border-b-2 border-black flex items-center justify-between text-[11px] font-subheading text-[#475569] select-none">
                <span className="tracking-wider">
                  ■ FILE_PATH: {activeModalJudge.path}
                </span>
                <span
                  className="font-bold tracking-wider"
                  style={{ color: activeModalJudge.color }}
                >
                  {activeModalJudge.status}
                </span>
              </div>

              {/* Modal Body Container with inset bevel */}
              <div
                style={{ boxShadow: BEVEL_INSET }}
                className="m-2 p-6 bg-[#f4f4f6] space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 border-b-2 border-[#cbd5e1] pb-4">
                  <div
                    style={{ boxShadow: `3px 3px 0px 0px ${activeModalJudge.color}` }}
                    className="w-24 h-24 border-2 border-black overflow-hidden shrink-0 bg-[#e2e8f0]"
                  >
                    <img
                      src={activeModalJudge.image}
                      alt={activeModalJudge.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <h3 className="text-xl font-heading font-black tracking-wide uppercase text-[#1e1e2f]">
                      {activeModalJudge.name}
                    </h3>
                    <p
                      className="text-xs font-extrabold uppercase tracking-wide"
                      style={{ color: activeModalJudge.color }}
                    >
                      {activeModalJudge.title}
                    </p>
                    <p className="text-xs font-semibold text-[#64748b]">
                      @ {activeModalJudge.company}
                    </p>
                    <div className="inline-block px-2 py-0.5 bg-[#e2e8f0] border border-[#cbd5e1] text-[10px] font-bold text-[#1e1e2f] tracking-widest uppercase mt-1">
                      CATEGORY: {activeModalJudge.category}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="text-[#1e1e2f] font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#ff2a85]" /> BIOGRAPHY
                    </h4>
                    <p className="text-[#475569] leading-relaxed bg-[#e2e8f0] p-3 border border-[#cbd5e1] font-body text-xs">
                      {activeModalJudge.bio}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[#1e1e2f] font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" /> EVALUATION CRITERIA
                    </h4>
                    <p className="text-[#475569] leading-relaxed bg-[#e2e8f0] p-3 border border-[#cbd5e1] font-body text-xs">
                      {activeModalJudge.evaluationCriteria}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[#1e1e2f] font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#b967ff]" /> SPECIALTY TAGS
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeModalJudge.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white text-[#1e1e2f] border border-[#cbd5e1] font-bold uppercase text-[10px] tracking-wider"
                        >
                          #{spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-3 flex items-center justify-between border-t-2 border-[#cbd5e1]">
                  <div className="flex items-center gap-3">
                    {activeModalJudge.socials.linkedin && (
                      <a
                        href={activeModalJudge.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#475569] hover:text-[#00f0ff] transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {activeModalJudge.socials.twitter && (
                      <a
                        href={activeModalJudge.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#475569] hover:text-[#ff2a85] transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {activeModalJudge.socials.github && (
                      <a
                        href={activeModalJudge.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#475569] hover:text-[#b967ff] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveModalJudge(null)}
                    style={{ boxShadow: BEVEL_RAISED }}
                    className="px-4 py-1.5 bg-[#ff2a85] text-white font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer"
                  >
                    CLOSE [×]
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
