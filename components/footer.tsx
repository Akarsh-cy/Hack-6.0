"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Twitter,
  Linkedin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { scrollToSection } from "@/lib/scroll-utils";
import localFont from "next/font/local";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  const [isTouchDevice] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

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
    return `${sx}px ${sy}px 0px 0px ${dropShadowColor}, ${
        sx * 1.6
    }px ${sy * 1.6 + 14}px 32px -6px rgba(0,0,0,0.55)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(Math.max(-0.5, Math.min(0.5, px)));
    y.set(Math.max(-0.5, Math.min(0.5, py)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsPressed(false);
  };

  return (
      <div className="perspective-[1000px] w-full h-full">
        <motion.div
            onMouseMove={handleMouseMove}
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
              textRendering: "optimizeLegibility",
              boxShadow: isTouchDevice
                  ? `6px 6px 0px 0px ${dropShadowColor}`
                  : boxShadowValue,
            }}
            animate={{
              scale: isPressed ? 0.985 : 1,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className={`group relative h-full w-full overflow-hidden border-2 border-[#1e1e2f] bg-[#f4f4f6] select-none will-change-transform flex flex-col ${className}`}
        >
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

function WindowControls({ closeColor = "#ff2a85" }: { closeColor?: string }) {
  return (
      <div className="flex items-center gap-1.5 shrink-0">
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
}

/* ========================================================================
   FOOTER
   ======================================================================== */

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleLinkClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.substring(1);
      scrollToSection(sectionId);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1000);
  };

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Timeline", href: "#timeline" },
    { label: "Prizes", href: "#prizes" },
    { label: "Judges", href: "#judges" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "#contact" },
  ];

  const resourceLinks = [
    {
      label: "Venue Guide",
      href: "https://dot-puma-97f.notion.site/Hack-6-0-Venue-19f095b2daf9809e86e5f0a3fcb7d3df",
      isExternal: true,
    },
    {
      label: "Hacker's Guide",
      href: "https://dot-puma-97f.notion.site/Hack-6-0-Hacker-s-Guide-19f095b2daf980058a2de1c0691aef59?pvs=74",
      isExternal: true,
    },
    {
      label: "Code of Conduct",
      href: "/coc",
      isExternal: false,
    },
    {
      label: "Discord Server",
      href: "https://discord.com/invite/kneqCFxKHY",
      isExternal: true,
    },
    {
      label: "FAQ Matrix",
      href: "#faq",
      isExternal: false,
    },
  ];

  return (
      <footer className="relative px-4 py-20 sm:px-6 lg:px-8 font-mono">
        <div className="container relative mx-auto max-w-7xl">
          {/* ================================================================
            HEADER
        ================================================================ */}
          <div className="mb-12 flex items-center justify-center gap-4">
            <div className="h-[2px] flex-1 bg-[#ff2a85]" />

            <div
                style={{
                  boxShadow: "4px 4px 0 #00f0ff",
                }}
                className="border-2 border-[#1e1e2f] bg-[#f4f4f6] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1e1e2f]"
            >
              ROOT_INDEX://TERMINAL_FOOTER
            </div>

            <div className="h-[2px] flex-1 bg-[#ff2a85]" />
          </div>

          {/* ================================================================
            FOUR PANEL GRID
        ================================================================ */}
          <div className="mb-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-12">
            {/* PANEL 1 — CSEC IDENTITY */}
            <div className="flex lg:col-span-4">
              <TiltCard dropShadowColor="#ff2a85">
                <div className="flex h-full flex-col">
                  <div className="bg-gradient-to-r from-[#ff71ce] via-[#fbcfe8] to-[#f4f4f6] px-3 py-2 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                      <span className="font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                      CSEC_IDENTITY.EXE
                    </span>
                    </div>
                    <WindowControls closeColor="#ff2a85" />
                  </div>

                  <div
                      style={{ boxShadow: BEVEL_INSET }}
                      className="m-2 p-5 sm:p-6 flex-1 bg-[#f4f4f6] flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-5 flex items-center gap-3">
                        <Link
                            href="https://csec.nith.ac.in/"
                            target="_blank"
                            className="group/logo relative h-12 w-12 shrink-0 border-2 border-[#1e1e2f] bg-white p-1 shadow-[3px_3px_0_#ff2a85] transition-transform hover:scale-105"
                        >
                          <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/csec-RitzmBrgdmOMfzaijUqHFSmOVA4LzO.png"
                              alt="CSEC Logo"
                              width={40}
                              height={40}
                              className="h-full w-full object-contain"
                          />
                        </Link>

                        <div>
                        <span
                            className={`text-2xl font-bold tracking-wider text-[#1e1e2f] ${Hacked_KerX.className}`}
                        >
                          CSEC
                        </span>
                          <p className="text-[10px] font-bold tracking-wide text-[#ff2a85]">
                            DEPT. OF CSE // NIT HAMIRPUR
                          </p>
                        </div>
                      </div>

                      <p className="text-xs leading-relaxed text-[#64748b]">
                        Empowering innovation through code, creativity, and
                        collaboration across the next generation of technologists.
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="flex flex-wrap gap-2">
                        <a
                            href="https://discord.com/invite/kneqCFxKHY"
                            target="_blank"
                            rel="noreferrer"
                            title="Discord"
                            className="flex h-9 w-9 items-center justify-center border-2 border-[#1e1e2f] bg-white text-[#1e1e2f] shadow-[2px_2px_0_#ff2a85] transition-all hover:-translate-y-0.5 hover:bg-[#8a2be2] hover:text-white"
                        >
                          <FaDiscord className="h-4 w-4" />
                        </a>

                        <a
                            href="https://www.instagram.com/hacknith?igsh=N3VtczNwa3pjNjNo"
                            target="_blank"
                            rel="noreferrer"
                            title="Instagram"
                            className="flex h-9 w-9 items-center justify-center border-2 border-[#1e1e2f] bg-white text-[#1e1e2f] shadow-[2px_2px_0_#ff2a85] transition-all hover:-translate-y-0.5 hover:bg-[#ff2a85] hover:text-white"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>

                        <a
                            href="https://x.com/csec_nith?t=Ubyv6_7SLUkdaxtBS8MUew&s=09"
                            target="_blank"
                            rel="noreferrer"
                            title="Twitter / X"
                            className="flex h-9 w-9 items-center justify-center border-2 border-[#1e1e2f] bg-white text-[#1e1e2f] shadow-[2px_2px_0_#ff2a85] transition-all hover:-translate-y-0.5 hover:bg-[#00f0ff] hover:text-black"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>

                        <a
                            href="https://www.linkedin.com/company/nith-csec/"
                            target="_blank"
                            rel="noreferrer"
                            title="LinkedIn"
                            className="flex h-9 w-9 items-center justify-center border-2 border-[#1e1e2f] bg-white text-[#1e1e2f] shadow-[2px_2px_0_#ff2a85] transition-all hover:-translate-y-0.5 hover:bg-[#0077b5] hover:text-white"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* PANEL 2 — NAVIGATOR */}
            <div className="flex lg:col-span-3">
              <TiltCard dropShadowColor="#00f0ff">
                <div className="flex h-full flex-col">
                  <div
                      style={{
                        background:
                            "linear-gradient(to right, #00f0ff, #fbcfe8 60%, #f4f4f6)",
                      }}
                      className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                      <span className="font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                      NAVIGATOR.EXE
                    </span>
                    </div>
                    <WindowControls closeColor="#00f0ff" />
                  </div>

                  <div
                      style={{ boxShadow: BEVEL_INSET }}
                      className="m-1.5 p-4 sm:p-5 flex-1 bg-[#f4f4f6]"
                  >
                    <ul className="space-y-2 text-xs">
                      {quickLinks.map((link) => (
                          <li key={link.label}>
                            <a
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="group/item flex items-center justify-between border-2 border-[#1e1e2f] bg-white px-2.5 py-1.5 font-bold text-[#1e1e2f] transition-all hover:border-[#ff2a85] hover:shadow-[2px_2px_0_#00f0ff]"
                            >
                          <span className="flex items-center gap-1.5">
                            <span className="text-[#ff2a85] font-black transition-transform group-hover/item:translate-x-0.5">
                              &gt;
                            </span>
                            {link.label}
                          </span>
                            </a>
                          </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* PANEL 3 — GUIDES */}
            <div className="flex lg:col-span-2">
              <TiltCard dropShadowColor="#00f0ff">
                <div className="flex h-full flex-col">
                  <div
                      style={{
                        background:
                            "linear-gradient(to right, #00f0ff, #fbcfe8 60%, #f4f4f6)",
                      }}
                      className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                      <span className="font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                      GUIDES.TXT
                    </span>
                    </div>
                    <WindowControls closeColor="#00f0ff" />
                  </div>

                  <div
                      style={{ boxShadow: BEVEL_INSET }}
                      className="m-1.5 p-4 sm:p-5 flex-1 bg-[#f4f4f6]"
                  >
                    <ul className="space-y-2 text-xs">
                      {resourceLinks.map((item) => (
                          <li key={item.label}>
                            <a
                                href={item.href}
                                target={item.isExternal ? "_blank" : undefined}
                                rel={item.isExternal ? "noopener noreferrer" : undefined}
                                onClick={(e) => {
                                  if (!item.isExternal && item.href.startsWith("#")) {
                                    handleLinkClick(e, item.href);
                                  }
                                }}
                                className="group/item flex items-center justify-between gap-2 border-2 border-[#1e1e2f] bg-white px-2.5 py-1.5 font-bold text-[#1e1e2f] transition-all hover:border-[#00f0ff] hover:shadow-[2px_2px_0_#ff2a85]"
                            >
                              <span className="truncate">{item.label}</span>
                            </a>
                          </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* PANEL 4 — NEWSLETTER */}
            <div className="flex lg:col-span-3">
              <TiltCard dropShadowColor="#ff2a85">
                <div className="flex h-full flex-col">
                  <div className="bg-gradient-to-r from-[#ff71ce] via-[#fbcfe8] to-[#f4f4f6] px-3 py-2 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                      <span className="font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                      DISPATCH_FEED.EXE
                    </span>
                    </div>
                    <WindowControls closeColor="#ff2a85" />
                  </div>

                  <div
                      style={{ boxShadow: BEVEL_INSET }}
                      className="m-2 p-4 sm:p-5 flex flex-1 flex-col justify-between bg-[#f4f4f6]"
                  >
                    <div>
                      <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-[#1e1e2f]">
                        Stay In Sync
                      </h4>
                      <p className="mb-4 text-[11px] leading-relaxed text-[#64748b]">
                        Subscribe for real-time announcements, track drops & alerts.
                      </p>

                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <input
                            type="email"
                            required
                            placeholder="you@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-[#1e1e2f] bg-white px-3 py-2 text-xs text-[#111] placeholder-[#888] outline-none transition-all focus:border-[#ff2a85] focus:shadow-[3px_3px_0_#00f0ff]"
                        />

                        {isSubscribed && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-1.5 border-2 border-[#1e1e2f] bg-[#e2e8f0] p-2 text-[10px] font-bold text-[#166534] shadow-[2px_2px_0_#00f0ff]"
                            >
                              <CheckCircle2 size={13} className="shrink-0 text-[#166534]" />
                              <span>SUBSCRIBED</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full cursor-pointer items-center justify-center gap-1.5 border-2 border-[#1e1e2f] bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#7928ca] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#00f0ff] transition-all hover:brightness-110 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-60"
                        >
                          {isSubmitting ? (
                              <>
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                <span>SYNCING...</span>
                              </>
                          ) : (
                              <>
                                <Send size={13} />
                                <span>SUBSCRIBE</span>
                              </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* ================================================================
            BOTTOM COPYRIGHT
        ================================================================ */}
          <div
              className="border-2 border-[#1e1e2f] bg-[#f4f4f6] p-4 text-xs text-[#1e1e2f]"
              style={{
                boxShadow: "4px 4px 0 #ff2a85",
              }}
          >
            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <span className="font-bold">
              HACK 6.0 <span className="font-normal text-[#64748b]">// NIT HAMIRPUR</span>
            </span>
              <p className="text-[#64748b]">
                Organized by <span className="font-bold text-[#ff2a85]">CSEC</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
}