"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Linkedin, Twitter, ShieldCheck } from "lucide-react";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
});

interface Judge {
  id: string;
  name: string;
  role: string;
  company: string;
  imgSrc: string;
  tag: string;
  bio: string;
  skills: string[];
  linkedin?: string;
  twitter?: string;
  shadowColor: string;
}

const judgesData: Judge[] = [
  {
    id: "01",
    name: "Dr. Elena Rostova",
    role: "VP of Artificial Intelligence",
    company: "OpenAI",
    imgSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    tag: "CHIEF JUDGE",
    bio: "Pioneering frontier LLM alignment architectures and large-scale neural systems.",
    skills: ["Generative AI", "LLMs", "Deep Learning"],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    shadowColor: "#8a2be2",
  },
  {
    id: "02",
    name: "Marcus Vance",
    role: "Principal Cloud Architect",
    company: "AWS",
    imgSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    tag: "INFRA LEAD",
    bio: "Architecting high-availability distributed systems processing multi-billion daily requests.",
    skills: ["Distributed Systems", "Kubernetes", "Serverless"],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    shadowColor: "#00ffff",
  },
  {
    id: "03",
    name: "Dr. Sophia Chen",
    role: "Head of Quantum Computing",
    company: "IBM Research",
    imgSrc:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    tag: "KEYNOTE JUDGE",
    bio: "Developing fault-tolerant quantum algorithms and hybrid classical-quantum acceleration.",
    skills: ["Quantum Algo", "Physics", "Supercomputing"],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    shadowColor: "#ff1493",
  },
  {
    id: "04",
    name: "David K. Miller",
    role: "General Partner",
    company: "Sequoia Capital",
    imgSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    tag: "VC INVESTOR",
    bio: "Backing visionaries building foundational technology platforms and next-gen tools.",
    skills: ["Venture Capital", "Product Strategy", "Growth"],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    shadowColor: "#00ff66",
  },
  {
    id: "05",
    name: "Priya Sharma",
    role: "Lead Web3 Strategist",
    company: "Polygon",
    imgSrc:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600",
    tag: "BLOCKCHAIN LEAD",
    bio: "Designing zero-knowledge scaling solutions and decentralized application protocols.",
    skills: ["Smart Contracts", "ZK-Proofs", "DeFi"],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    shadowColor: "#ff9900",
  },
  {
    id: "06",
    name: "Alex Rivera",
    role: "Staff UX & Systems Designer",
    company: "Google",
    imgSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    tag: "DESIGN LEAD",
    bio: "Creating human-centered design guidelines and multimodal generative interaction models.",
    skills: ["Design Systems", "HCI", "Accessibility"],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    shadowColor: "#ff4fd8",
  },
  {
    id: "07",
    name: "Sarah Jenkins",
    role: "Director of Cybersecurity",
    company: "CrowdStrike",
    imgSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    tag: "SEC DIRECTOR",
    bio: "Specializing in zero-trust architecture, automated threat hunting, and ethical defense systems.",
    skills: ["Zero-Trust", "SecOps", "Ethical Hacking"],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    shadowColor: "#00bfff",
  },
  {
    id: "08",
    name: "Vikramaditya Rao",
    role: "Chief Technology Officer",
    company: "Microsoft India",
    imgSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    tag: "PANEL CHAIR",
    bio: "Steering enterprise AI implementations, cloud infrastructure, and developer community growth.",
    skills: ["Enterprise AI", "Cloud Infra", "Leadership"],
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    shadowColor: "#9932cc",
  },
];

// Hex to RGBA conversion for holographic glare effect
const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  if (isNaN(bigint)) return `rgba(138, 43, 226, ${alpha})`;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Prize Section 3D Tilt Card wrapper
interface JudgeTiltCardProps {
  children: React.ReactNode;
  dropShadowColor?: string;
  className?: string;
}

const JudgeTiltCard = ({
  children,
  dropShadowColor = "#8a2be2",
  className = "",
}: JudgeTiltCardProps) => {
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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    stiffness: 220,
    damping: 26,
    mass: 0.5,
  };

  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

  const shadowX = useTransform(mouseX, [-0.5, 0.5], [14, -14]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [14, -14]);

  const boxShadowValue = useTransform([shadowX, shadowY], (latest) => {
    const [sx, sy] = latest as [number, number];
    return `${sx}px ${sy}px 0px 0px ${dropShadowColor}, ${-sx * 0.4}px ${-sy * 0.4}px 0px 0px #ff1493, ${sx * 1.5}px ${sy * 1.5 + 12}px 24px -4px rgba(0,0,0,0.5)`;
  });

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

  const handleMouseLeaveEvent = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rectRef.current = null;
    x.set(0);
    y.set(0);
    setIsPressed(false);
  };

  const handleMouseEnterEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
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
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          boxShadow: isTouchDevice
            ? `5px 5px 0px 0px ${dropShadowColor}, -3px -3px 0px 0px #ff1493`
            : boxShadowValue,
        }}
        animate={{
          scale: isPressed ? 0.98 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
        className={`group relative overflow-hidden select-none flex flex-col justify-between h-full will-change-transform transition-colors duration-300 ${className}`}
      >
        {/* Holographic Sheen Glare from Prize Section */}
        {!isTouchDevice && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            style={{
              background: useTransform([glareX, glareY], (latest) => {
                const [gx, gy] = latest as [string, string];
                return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.45), ${hexToRgba(
                  dropShadowColor,
                  0.15
                )} 20%, transparent 55%)`;
              }),
            }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
};

// Retro Win95 Window Controls
function WindowControls() {
  return (
    <div className="flex gap-[3px]">
      <div className="flex h-[16px] w-[16px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[8px] leading-none text-[#222]">
        _
      </div>
      <div className="flex h-[16px] w-[16px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[7px] leading-none text-[#222]">
        □
      </div>
      <div className="flex h-[16px] w-[16px] items-center justify-center border border-[#555] bg-[#ff8ed8] text-[8px] font-bold leading-none text-black">
        ×
      </div>
    </div>
  );
}

// Judge Card matching Organizers Card Style with Prize Section Hover Animation
function JudgeCard({ judge, index }: { judge: Judge; index: number }) {
  const [glitching, setGlitching] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseEnter = () => {
    setGlitching(true);
    setTimeout(() => {
      setGlitching(false);
    }, 450);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group/card relative w-full h-full"
      onMouseEnter={handleMouseEnter}
    >
      {/* Cyan offset layer matching Organizers Card */}
      <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#00ffff]" />

      {/* Pink offset layer matching Organizers Card */}
      <div className="pointer-events-none absolute -top-1.5 right-1.5 -bottom-1 left-[-4px] border-2 border-[#ff1493]" />

      {/* 3D Tilt Card wrapper from Prize Section */}
      <JudgeTiltCard dropShadowColor={judge.shadowColor || "#8a2be2"}>
        {/* Main Light Retro Window Container from Organizers Page */}
        <div className="relative border-2 border-[#292929] bg-[#eeeeee] flex flex-col justify-between h-full">
          {/* Classic Win95 Title Bar */}
          <div className="flex h-9 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee] px-2.5">
            <div className="flex items-center gap-1.5">
              <div className="relative h-4 w-4 border border-[#555] bg-[#ff9edc] shadow-[1px_1px_0_#00ffff]">
                <div className="ml-[2px] mt-[2px] h-[5px] w-[7px] bg-[#8a2be2]" />
              </div>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222] truncate max-w-[130px] sm:max-w-[160px]">
                JUDGE_{String(index + 1).padStart(2, "0")}.EXE
              </span>
            </div>

            <WindowControls />
          </div>

          {/* Judge Photo Container */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e0e0e0] border-b-2 border-[#292929]">
            <img
              src={imgError ? "/placeholder.svg" : judge.imgSrc}
              alt={judge.name}
              onError={() => setImgError(true)}
              className={`h-full w-full object-cover transition-all duration-300 group-hover/card:scale-105 ${
                glitching
                  ? "brightness-110 saturate-150"
                  : "brightness-[0.97] saturate-[0.95]"
              }`}
            />

            {/* Cyber glitch RGB ghosts on hover enter */}
            <motion.img
              src={imgError ? "/placeholder.svg" : judge.imgSrc}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover mix-blend-screen"
              style={{
                filter: "sepia(1) saturate(8) hue-rotate(135deg)",
              }}
              initial={{ opacity: 0 }}
              animate={
                glitching
                  ? {
                      opacity: [0, 0.65, 0, 0.4, 0],
                      x: [0, -5, 4, -2, 0],
                      clipPath: [
                        "inset(0 0 100% 0)",
                        "inset(12% 0 62% 0)",
                        "inset(48% 0 35% 0)",
                        "inset(73% 0 10% 0)",
                        "inset(0 0 100% 0)",
                      ],
                    }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.45, ease: "linear" }}
            />

            {/* Subtle vaporwave wash & scanlines overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.6) 3px)",
              }}
            />

            {/* Top Right Designation Tag */}
            <div className="absolute top-2.5 right-2.5 z-20">
              <span className="border-2 border-[#292929] bg-white px-2 py-0.5 font-mono text-[9px] font-bold text-[#222] shadow-[2px_2px_0_#00ffff]">
                {judge.tag}
              </span>
            </div>

            {/* Top Left Company Tag */}
            <div className="absolute top-2.5 left-2.5 z-20">
              <span className="border-2 border-[#292929] bg-[#8a2be2] text-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase shadow-[2px_2px_0_#ff1493]">
                {judge.company}
              </span>
            </div>
          </div>

          {/* Info Details Panel */}
          <div className="bg-white p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="h-2.5 w-2.5 border border-[#333] bg-[#ff1493]" />
                <h3 className="font-mono text-base sm:text-lg font-bold text-[#222] truncate">
                  {judge.name}
                </h3>
              </div>

              <p className="font-mono text-xs font-semibold text-[#8a2be2] mb-2 truncate">
                {judge.role}
              </p>

              <p className="font-mono text-[11px] text-[#555] line-clamp-2 leading-relaxed mb-3">
                {judge.bio}
              </p>

              {/* Skills / Expertise tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {judge.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-block border border-[#ccc] bg-[#f8f8f8] px-1.5 py-0.5 font-mono text-[9px] font-medium text-[#444]"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links & Judge ID */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#eee]">
              <a
                href={judge.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center border border-[#292929] bg-[#f2f2f2] text-[#222] shadow-[2px_2px_0_#00ffff] hover:bg-[#ff1493] hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin size={13} />
              </a>
              <a
                href={judge.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center border border-[#292929] bg-[#f2f2f2] text-[#222] shadow-[2px_2px_0_#ff1493] hover:bg-[#00ffff] hover:text-black transition-colors"
                title="Twitter / X Profile"
              >
                <Twitter size={13} />
              </a>
              <span className="ml-auto font-mono text-[9px] font-bold text-[#888]">
                ID://J{judge.id}
              </span>
            </div>
          </div>

          {/* Retro Status Bar */}
          <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-2.5 font-mono text-[8px] uppercase tracking-wider text-[#444]">
            <span className="flex items-center gap-1 font-bold text-[#8a2be2]">
              <span className="h-1.5 w-1.5 bg-[#00bfff] animate-pulse" />
              VERIFIED JUDGE
            </span>
            <span>HACK 5.0</span>
          </div>
        </div>
      </JudgeTiltCard>
    </motion.div>
  );
}

export default function JudgesSection() {
  return (
    <section id="judges" className="relative py-24 md:py-32 overflow-hidden z-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center">
          {/* Retro Pill Badge */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 border-2 border-[#333] bg-white px-5 py-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#333] shadow-[5px_5px_0_#ff1493]">
            <span className="h-3 w-3 border border-[#333] bg-[#8a2be2]" />
            SYSTEM_DIRECTORY://JUDGES_PANEL
          </div>

          <h2
            className={`mb-4 text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-[4px_4px_0_#8a2be2] ${Hacked_KerX.className}`}
          >
            JUDGES <span className="text-[#ff1493]">PANEL</span>
          </h2>

          <div className="mx-auto mt-4 h-[3px] w-28 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-[#ff1493]" />

          <p className="mx-auto mt-5 max-w-2xl font-mono text-xs sm:text-sm md:text-base text-gray-300 font-semibold leading-relaxed">
            Meet our distinguished panel of tech founders, AI researchers, principal engineers, and venture capital partners evaluating HACK 5.0 projects.
          </p>
        </div>

        {/* 8 Dummy Judge Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {judgesData.map((judge, idx) => (
            <JudgeCard key={judge.id} judge={judge} index={idx} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 border-2 border-[#292929] bg-[#eeeeee] px-6 py-3 font-mono text-xs font-bold text-[#222] shadow-[5px_5px_0_#00ffff]">
            <ShieldCheck size={16} className="text-[#8a2be2]" />
            <span>ALL JUDGING EVALUATIONS ARE ANONYMIZED & TRANSPARENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
