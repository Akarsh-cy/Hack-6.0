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
import { motion } from "framer-motion";
import {
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

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
    "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.7)";

const BEVEL_INSET =
    "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.25)";

/* ========================================================================
   3D TILT CARD
   ======================================================================== */

const TiltCard = ({
                    children,
                    className = "",
                    dropShadowColor = "#ff1493",
                  }: {
  children: React.ReactNode;
  className?: string;
  dropShadowColor?: string;
}) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
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

  const rotateX = useTransform(
      mouseY,
      [-0.5, 0.5],
      ["5deg", "-5deg"]
  );

  const rotateY = useTransform(
      mouseX,
      [-0.5, 0.5],
      ["-5deg", "5deg"]
  );

  const handleMouseMove = (
      e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (isTouchDevice) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const px =
        (e.clientX - rect.left) / rect.width - 0.5;

    const py =
        (e.clientY - rect.top) / rect.height - 0.5;

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
              boxShadow: `6px 6px 0 ${dropShadowColor}`,
            }}
            animate={{
              scale: isPressed ? 0.985 : 1,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
            className={`group relative h-full w-full overflow-hidden border-2 border-[#292929] bg-[#eeeeee] select-none will-change-transform ${className}`}
        >
          {children}
        </motion.div>
      </div>
  );
};

/* ========================================================================
   WINDOW CONTROLS
   ======================================================================== */

function WindowControls() {
  return (
      <div className="flex items-center gap-1">

        <div
            style={{
              boxShadow: BEVEL_RAISED,
            }}
            className="flex h-[17px] w-[17px] items-center justify-center bg-[#c9c9d4] text-[9px] font-bold leading-none text-[#222]"
        >
          _
        </div>

        <div
            style={{
              boxShadow: BEVEL_RAISED,
            }}
            className="flex h-[17px] w-[17px] items-center justify-center bg-[#c9c9d4] text-[9px] font-bold leading-none text-[#222]"
        >
          □
        </div>

        <div
            style={{
              boxShadow: BEVEL_RAISED,
            }}
            className="flex h-[17px] w-[17px] items-center justify-center bg-[#ff1493] text-[9px] font-bold leading-none text-black"
        >
          ×
        </div>

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

  /* ----------------------------------------------------------------------
     INTERNAL SCROLL
     ---------------------------------------------------------------------- */

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

  /* ----------------------------------------------------------------------
     NEWSLETTER
     ---------------------------------------------------------------------- */

  const handleSubscribe = (
      e: React.FormEvent
  ) => {
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

  /* ----------------------------------------------------------------------
     LINKS
     ---------------------------------------------------------------------- */

  const quickLinks = [
    { label: "Home", href: "#home", tag: "01" },
    { label: "About", href: "#about", tag: "02" },
    { label: "Timeline", href: "#timeline", tag: "03" },
    { label: "Prizes", href: "#prizes", tag: "04" },
    { label: "Judges", href: "#judges", tag: "05" },
    { label: "Sponsors", href: "#sponsors", tag: "06" },
    { label: "Team", href: "/team", tag: "07" },
    { label: "Contact", href: "#contact", tag: "08" },
  ];

  const resourceLinks = [
    {
      label: "Venue Guide",
      href: "https://dot-puma-97f.notion.site/Hack-6-0-Venue-19f095b2daf9809e86e5f0a3fcb7d3df",
      isExternal: true,
      badge: "LOC",
    },
    {
      label: "Hacker's Guide",
      href: "https://dot-puma-97f.notion.site/Hack-6-0-Hacker-s-Guide-19f095b2daf980058a2de1c0691aef59?pvs=74",
      isExternal: true,
      badge: "DOC",
    },
    {
      label: "Code of Conduct",
      href: "/coc",
      isExternal: false,
      badge: "RULES",
    },
    {
      label: "Discord Server",
      href: "https://discord.com/invite/kneqCFxKHY",
      isExternal: true,
      badge: "COMM",
    },
    {
      label: "FAQ Matrix",
      href: "#faq",
      isExternal: false,
      badge: "QUERY",
    },
  ];

  return (
      <footer className="relative px-4 py-20 sm:px-6 lg:px-8">

        <div className="container relative mx-auto max-w-7xl">

          {/* ================================================================
            HEADER
        ================================================================ */}

          <div className="mb-12 flex items-center justify-center gap-4">

            <div className="h-[2px] flex-1 bg-[#4b0082]" />

            <div
                style={{
                  boxShadow: "4px 4px 0 #00ffff",
                }}
                className="border-2 border-[#292929] bg-[#eeeeee] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#333]"
            >
              ROOT_INDEX://TERMINAL_FOOTER
            </div>

            <div className="h-[2px] flex-1 bg-[#4b0082]" />

          </div>

          {/* ================================================================
            FOUR PANEL GRID
        ================================================================ */}

          <div className="mb-12 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-12">

            {/* ==============================================================
              PANEL 1 — CSEC IDENTITY
          ============================================================== */}

            <div className="flex lg:col-span-4">

              <TiltCard
                  dropShadowColor="#8a2be2"
                  className="h-full"
              >

                <div className="flex h-full flex-col">

                  {/* TITLE BAR */}

                  <div className="flex h-8 shrink-0 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#d4b0f5] via-[#eadaf8] to-[#eeeeee] px-3">

                    <div className="flex items-center gap-2">

                      <div className="relative h-3.5 w-3.5 border border-[#555] bg-[#ff9edc]">
                        <div className="ml-[2px] mt-[2px] h-[4px] w-[6px] bg-[#8a2be2]" />
                      </div>

                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
                      CSEC_IDENTITY.EXE
                    </span>

                    </div>

                    <WindowControls />

                  </div>

                  {/* BODY */}

                  <div className="flex flex-1 flex-col justify-between bg-white p-5 sm:p-6">

                    <div>

                      <div className="mb-5 flex items-center gap-3">

                        <Link
                            href="https://csec.nith.ac.in/"
                            target="_blank"
                            className="group/logo relative h-12 w-12 shrink-0 border-2 border-[#292929] bg-white p-1 shadow-[3px_3px_0_#ff1493] transition-transform hover:scale-105"
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
                            className={`text-2xl font-bold tracking-wider text-[#222] ${Hacked_KerX.className}`}
                        >
                          CSEC
                        </span>

                          <p className="font-mono text-[10px] font-bold tracking-wide text-[#8a2be2]">
                            DEPT. OF CSE // NIT HAMIRPUR
                          </p>

                        </div>

                      </div>

                      <p className="font-mono text-xs leading-relaxed text-[#555]">
                        Empowering innovation through code,
                        creativity, and collaboration across
                        the next generation of technologists.
                      </p>

                    </div>

                    {/* SOCIALS */}

                    <div className="mt-8">

                    <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-[#333]">
                      &gt; SOCIAL_CHANNELS
                    </span>

                      <div className="flex flex-wrap gap-2">

                        <a
                            href="https://discord.com/invite/kneqCFxKHY"
                            target="_blank"
                            rel="noreferrer"
                            title="Discord"
                            className="flex h-9 w-9 items-center justify-center border-2 border-[#292929] bg-[#f8f8f8] text-[#222] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#8a2be2] hover:text-white"
                        >
                          <FaDiscord className="h-4 w-4" />
                        </a>

                        <a
                            href="https://www.instagram.com/hacknith?igsh=N3VtczNwa3pjNjNo"
                            target="_blank"
                            rel="noreferrer"
                            title="Instagram"
                            className="flex h-9 w-9 items-center justify-center border-2 border-[#292929] bg-[#f8f8f8] text-[#222] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#ff1493] hover:text-white"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>

                        <a
                            href="https://x.com/csec_nith?t=Ubyv6_7SLUkdaxtBS8MUew&s=09"
                            target="_blank"
                            rel="noreferrer"
                            title="Twitter / X"
                            className="flex h-9 w-9 items-center justify-center border-2 border-[#292929] bg-[#f8f8f8] text-[#222] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#00ffff] hover:text-black"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>

                        <a
                            href="https://www.linkedin.com/company/nith-csec/"
                            target="_blank"
                            rel="noreferrer"
                            title="LinkedIn"
                            className="flex h-9 w-9 items-center justify-center border-2 border-[#292929] bg-[#f8f8f8] text-[#222] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#0077b5] hover:text-white"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>

                      </div>

                    </div>

                  </div>

                  {/* STATUS BAR */}

                  <div className="flex h-6 shrink-0 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">

                  <span>
                    NODE: ACTIVE
                  </span>

                    <span className="font-bold text-[#8a2be2]">
                    COMMUNITY_HUB
                  </span>

                  </div>

                </div>

              </TiltCard>

            </div>

            {/* ==============================================================
              PANEL 2 — NAVIGATOR
          ============================================================== */}

            <div className="flex lg:col-span-3">

              <TiltCard
                  dropShadowColor="#ff1493"
                  className="h-full"
              >

                <div className="flex h-full flex-col">

                  <div className="flex h-8 shrink-0 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee] px-3">

                    <div className="flex items-center gap-2">

                      <div className="h-2.5 w-2.5 bg-[#8a2be2]" />

                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
                      NAVIGATOR.EXE
                    </span>

                    </div>

                    <WindowControls />

                  </div>

                  <div
                      style={{
                        boxShadow: BEVEL_INSET,
                      }}
                      className="flex-1 bg-white p-4 sm:p-5"
                  >

                    <ul className="space-y-2 font-mono text-xs">

                      {quickLinks.map((link) => (
                          <li key={link.label}>

                            <a
                                href={link.href}
                                onClick={(e) =>
                                    handleLinkClick(e, link.href)
                                }
                                className="group/item flex items-center justify-between border-2 border-[#ddd] bg-[#f8f8f8] px-2.5 py-1.5 font-bold text-[#222] transition-all hover:border-[#8a2be2] hover:bg-[#fff9fc] hover:text-[#8a2be2] hover:shadow-[2px_2px_0_#ff1493]"
                            >

                          <span className="flex items-center gap-1.5">

                            <span className="text-[#ff1493] transition-transform group-hover/item:translate-x-0.5">
                              &gt;
                            </span>

                            {link.label}

                          </span>

                              <span className="text-[9px] font-normal text-[#888]">
                            [{link.tag}]
                          </span>

                            </a>

                          </li>
                      ))}

                    </ul>

                  </div>

                  <div className="flex h-6 shrink-0 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">

                  <span>
                    ROUTES: 08
                  </span>

                    <span className="font-bold text-[#00bfff]">
                    INDEX_OK
                  </span>

                  </div>

                </div>

              </TiltCard>

            </div>

            {/* ==============================================================
              PANEL 3 — GUIDES
          ============================================================== */}

            <div className="flex lg:col-span-2">

              <TiltCard
                  dropShadowColor="#00ffff"
                  className="h-full"
              >

                <div className="flex h-full flex-col">

                  <div className="flex h-8 shrink-0 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#00ffff] via-[#c9ffff] to-[#eeeeee] px-3">

                    <div className="flex items-center gap-2">

                      <div className="h-2.5 w-2.5 bg-[#ff1493]" />

                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
                      GUIDES.TXT
                    </span>

                    </div>

                    <WindowControls />

                  </div>

                  <div
                      style={{
                        boxShadow: BEVEL_INSET,
                      }}
                      className="flex-1 bg-white p-4 sm:p-5"
                  >

                    <ul className="space-y-2 font-mono text-xs">

                      {resourceLinks.map((item) => (
                          <li key={item.label}>

                            <a
                                href={item.href}
                                target={
                                  item.isExternal
                                      ? "_blank"
                                      : undefined
                                }
                                rel={
                                  item.isExternal
                                      ? "noopener noreferrer"
                                      : undefined
                                }
                                onClick={(e) => {
                                  if (
                                      !item.isExternal &&
                                      item.href.startsWith("#")
                                  ) {
                                    handleLinkClick(
                                        e,
                                        item.href
                                    );
                                  }
                                }}
                                className="group/item flex items-center justify-between gap-2 border-2 border-[#ddd] bg-[#f8f8f8] px-2.5 py-1.5 font-bold text-[#222] transition-all hover:border-[#8a2be2] hover:bg-[#f6faff] hover:text-[#0088cc] hover:shadow-[2px_2px_0_#00ffff]"
                            >

                          <span className="truncate">
                            {item.label}
                          </span>

                              <span className="shrink-0 border border-[#ccc] bg-[#eee] px-1 py-0.5 text-[8px] font-bold text-[#555]">
                            {item.badge}
                          </span>

                            </a>

                          </li>
                      ))}

                    </ul>

                  </div>

                  <div className="flex h-6 shrink-0 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">

                  <span>
                    DOCS: SYNCED
                  </span>

                    <span className="font-bold text-[#2e7d32]">
                    READY
                  </span>

                  </div>

                </div>

              </TiltCard>

            </div>

            {/* ==============================================================
              PANEL 4 — NEWSLETTER
          ============================================================== */}

            <div className="flex lg:col-span-3">

              <TiltCard
                  dropShadowColor="#ff1493"
                  className="h-full"
              >

                <div className="flex h-full flex-col">

                  <div className="flex h-8 shrink-0 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee] px-3">

                    <div className="flex items-center gap-2">

                      <div className="h-2.5 w-2.5 bg-[#8a2be2]" />

                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
                      DISPATCH_FEED.EXE
                    </span>

                    </div>

                    <WindowControls />

                  </div>

                  <div
                      style={{
                        boxShadow: BEVEL_INSET,
                      }}
                      className="flex flex-1 flex-col justify-between bg-white p-4 sm:p-5"
                  >

                    <div>

                      <h4 className="mb-1 font-mono text-sm font-bold uppercase tracking-wide text-[#222]">
                        Stay In Sync
                      </h4>

                      <p className="mb-4 font-mono text-[11px] leading-relaxed text-[#555]">
                        Subscribe for real-time hackathon
                        announcements, track drops & alerts.
                      </p>

                      <form
                          onSubmit={handleSubscribe}
                          className="space-y-3"
                      >

                        <div className="space-y-1">

                          <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#333]">
                            &gt; SUBSCRIBER_EMAIL
                          </label>

                          <input
                              type="email"
                              required
                              placeholder="you@domain.com"
                              value={email}
                              onChange={(e) =>
                                  setEmail(e.target.value)
                              }
                              className="w-full border-2 border-[#292929] bg-[#f8f8f8] px-3 py-2 font-mono text-xs text-[#111] placeholder-[#888] shadow-[2px_2px_0_#d9a7f0] outline-none transition-all focus:border-[#8a2be2] focus:bg-white focus:shadow-[3px_3px_0_#ff1493]"
                          />

                        </div>

                        {isSubscribed && (
                            <motion.div
                                initial={{
                                  opacity: 0,
                                  y: -4,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                className="flex items-center gap-1.5 border-2 border-[#2e7d32] bg-[#e8f5e9] p-2 font-mono text-[10px] font-bold text-[#1b5e20]"
                            >

                              <CheckCircle2
                                  size={13}
                                  className="shrink-0 text-[#2e7d32]"
                              />

                              <span>
                            SUBSCRIBED // QUEUED
                          </span>

                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full cursor-pointer items-center justify-center gap-1.5 border-2 border-[#292929] bg-[#00ffff] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-[3px_3px_0_#ff1493] transition-all hover:bg-[#33ffff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-60"
                        >

                          {isSubmitting ? (
                              <>
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />

                                <span>
                              SYNCING...
                            </span>
                              </>
                          ) : (
                              <>
                                <Send size={13} />

                                <span>
                              [ SUBSCRIBE FEED ]
                            </span>
                              </>
                          )}

                        </button>

                      </form>

                    </div>

                  </div>

                  <div className="flex h-6 shrink-0 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">

                  <span>
                    RSS_PUSH: ACTIVE
                  </span>

                    <span className="font-bold text-[#8a2be2]">
                    ONLINE
                  </span>

                  </div>

                </div>

              </TiltCard>

            </div>

          </div>

          {/* ================================================================
            BOTTOM SYSTEM STATUS
        ================================================================ */}

          <div
              className="relative overflow-hidden border-2 border-[#292929] bg-[#eeeeee] p-4 font-mono text-xs text-[#222]"
              style={{
                boxShadow: "5px 5px 0 #4b0082",
              }}
          >

            <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

              <div className="flex items-center gap-2">

                <span className="h-2 w-2 bg-[#00bfff]" />

                <span className="font-bold">
                HACK 6.0{" "}
                  <span className="font-normal text-[#666]">
                  // NIT HAMIRPUR
                </span>
              </span>

              </div>

              <p className="text-[#444]">

                Designed with{" "}
                <span className="text-[#ff1493]">
                ♥
              </span>{" "}
                by the{" "}
                <span className="font-bold text-[#8a2be2]">
                HACK 6.0 Team
              </span>{" "}
                | Powered by innovation &amp;
                creativity

              </p>

              <div className="text-[11px] font-bold text-[#2e7d32]">
                [ GRID_STATUS: ONLINE ]
              </div>

            </div>

          </div>

        </div>

      </footer>
  );
}