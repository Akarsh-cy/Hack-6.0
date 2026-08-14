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
import TiltedInfoCard from "./TiltedInfoCard";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
  fallback: ["monospace", "sans-serif"],
});

function WindowControls() {
  return (
    <div className="flex gap-[3px]">
      <div className="flex h-[15px] w-[15px] items-center justify-center border border-[#555] bg-[#3a334f] text-[8px] leading-none text-[#eee5ff]">
        _
      </div>
      <div className="flex h-[15px] w-[15px] items-center justify-center border border-[#555] bg-[#ff8ed8] text-[8px] font-bold leading-none text-black">
        ×
      </div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1000);
  };

  const quickLinks = [
    { label: "Home", href: "#home", tag: "01" },
    { label: "About", href: "#about", tag: "02" },
    { label: "Timeline", href: "#timeline", tag: "03" },
    { label: "Prizes", href: "#prizes", tag: "04" },
    { label: "Sponsors", href: "#sponsors", tag: "05" },
    { label: "Team", href: "/team", tag: "06" },
    { label: "Contact", href: "#contact", tag: "07" },
  ];

  const resourceLinks = [
    {
      label: "Venue Guide",
      href: "https://dot-puma-97f.notion.site/Hack-5-0-Venue-19f095b2daf9809e86e5f0a3fcb7d3df",
      isExternal: true,
      badge: "LOC",
    },
    {
      label: "Hacker's Guide",
      href: "https://dot-puma-97f.notion.site/Hack-5-0-Hacker-s-Guide-19f095b2daf980058a2de1c0691aef59?pvs=74",
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
    <footer className="relative overflow-hidden bg-[#c87de8] py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-[#4b0082]">
      {/* Pastel vaporwave background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #c87de8 0%,
              #dca0e5 45%,
              #b584d4 100%
            )
          `,
        }}
      />

      {/* Retro grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(75,0,130,0.65) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(75,0,130,0.65) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Large soft cyan glow */}
      <div
        className="pointer-events-none absolute -left-32 top-10 h-[450px] w-[450px] rounded-full opacity-35"
        style={{
          background: "radial-gradient(circle, #00ffff 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />

      {/* Pink glow */}
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-[480px] w-[480px] rounded-full opacity-35"
        style={{
          background: "radial-gradient(circle, #ff4fd8 0%, transparent 68%)",
          filter: "blur(90px)",
        }}
      />

      <div className="container relative mx-auto max-w-7xl">
        {/* Top Header Pill */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="h-[2px] flex-1 bg-[#4b0082]" />
          <div className="border-2 border-[#18151f] bg-[#302a45] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#d9ccef] shadow-[4px_4px_0_#00ffff]">
            ROOT_INDEX://TERMINAL_FOOTER
          </div>
          <div className="h-[2px] flex-1 bg-[#4b0082]" />
        </div>

        {/* 4-Panel Dark Retro Windows Grid with 3D Tilt */}
        <div className="mb-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-12 items-stretch">
          {/* Panel 1: CSEC Hub Identity (4 Cols on lg) */}
          <div className="flex lg:col-span-4">
            <TiltedInfoCard rotateAmplitude={8} scaleOnHover={1.025} className="h-full w-full">
              <div className="group relative w-full flex flex-col h-full">
                <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#00ffff]" />

                <div
                  className="relative flex flex-col justify-between overflow-hidden border-2 border-[#18151f] bg-[#302a45] h-full"
                  style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 rgba(0,255,255,0.6)",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    className="flex h-8 items-center justify-between border-b-2 border-[#18151f] px-3"
                    style={{
                      background: "linear-gradient(90deg, #8a2be2 0%, #342d49 72%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative h-3.5 w-3.5 border border-[#555] bg-[#ff9edc]">
                        <div className="ml-[2px] mt-[2px] h-[4px] w-[6px] bg-[#8a2be2]" />
                      </div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#f4eaff]">
                        CSEC_IDENTITY.EXE
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Dark Panel Body */}
                  <div className="bg-[#29243a] p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand Row */}
                      <div className="mb-4 flex items-center gap-3">
                        <Link
                          href="https://csec.nith.ac.in/"
                          target="_blank"
                          className="group/logo relative h-12 w-12 shrink-0 border-2 border-[#665b78] bg-[#3a334f] p-1 shadow-[3px_3px_0_#ff1493] transition-transform hover:scale-105"
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
                            className={`text-2xl font-bold tracking-wider text-[#f4eaff] ${Hacked_KerX.className}`}
                          >
                            CSEC
                          </span>
                          <p className="font-mono text-[10px] font-bold tracking-wide text-[#00ffff]">
                            DEPT. OF CSE // NIT HAMIRPUR
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-6 font-mono text-xs text-[#b8abc9] leading-relaxed">
                        Empowering innovation through code, creativity, and collaboration across the next generation of technologists.
                      </p>
                    </div>

                    {/* Social Buttons */}
                    <div>
                      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-[#d9cbea]">
                        &gt; SOCIAL_CHANNELS
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="https://discord.com/invite/kneqCFxKHY"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border-2 border-[#665b78] bg-[#3a334f] text-[#f4eaff] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#8a2be2] hover:text-white hover:border-[#8a2be2]"
                          title="Discord"
                        >
                          <FaDiscord className="h-4 w-4" />
                        </a>
                        <a
                          href="https://www.instagram.com/hacknith?igsh=N3VtczNwa3pjNjNo"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border-2 border-[#665b78] bg-[#3a334f] text-[#f4eaff] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#ff1493] hover:text-white hover:border-[#ff1493]"
                          title="Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                        <a
                          href="https://x.com/csec_nith?t=Ubyv6_7SLUkdaxtBS8MUew&s=09"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border-2 border-[#665b78] bg-[#3a334f] text-[#f4eaff] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#00ffff] hover:text-black hover:border-[#00ffff]"
                          title="Twitter / X"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                        <a
                          href="https://www.linkedin.com/company/nith-csec/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border-2 border-[#665b78] bg-[#3a334f] text-[#f4eaff] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Dark Status Bar */}
                  <div className="flex h-6 items-center justify-between border-t-2 border-[#51465f] bg-[#221d33] px-3 font-mono text-[8px] uppercase tracking-wider text-[#aaa0bd]">
                    <span>NODE: ACTIVE</span>
                    <span className="font-bold text-[#00ffff]">COMMUNITY_HUB</span>
                  </div>
                </div>
              </div>
            </TiltedInfoCard>
          </div>

          {/* Panel 2: Navigation Links (2.5 Cols on lg) */}
          <div className="flex lg:col-span-3">
            <TiltedInfoCard rotateAmplitude={8} scaleOnHover={1.025} className="h-full w-full">
              <div className="group relative w-full flex flex-col h-full">
                <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#ff1493]" />

                <div
                  className="relative flex flex-col justify-between overflow-hidden border-2 border-[#18151f] bg-[#302a45] h-full"
                  style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 rgba(255,20,147,0.6)",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    className="flex h-8 items-center justify-between border-b-2 border-[#18151f] px-3"
                    style={{
                      background: "linear-gradient(90deg, #ff1493 0%, #342d49 72%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 bg-[#00ffff]" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#f4eaff]">
                        NAVIGATOR.EXE
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Dark Links list */}
                  <div className="bg-[#29243a] p-4 sm:p-5 flex-1">
                    <ul className="space-y-2 font-mono text-xs">
                      {quickLinks.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="group/item flex items-center justify-between border border-[#51465f] bg-[#342d49] px-2.5 py-1.5 font-bold text-[#e9ddff] transition-all hover:border-[#00ffff] hover:bg-[#443b5c] hover:text-[#00ffff] hover:shadow-[2px_2px_0_#ff1493]"
                          >
                            <span className="flex items-center gap-1.5">
                              <span className="text-[#ff1493] group-hover/item:translate-x-0.5 transition-transform">&gt;</span>
                              {link.label}
                            </span>
                            <span className="text-[9px] text-[#aaa0bd] font-normal">
                              [{link.tag}]
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dark Status Bar */}
                  <div className="flex h-6 items-center justify-between border-t-2 border-[#51465f] bg-[#221d33] px-3 font-mono text-[8px] uppercase tracking-wider text-[#aaa0bd]">
                    <span>ROUTES: 07</span>
                    <span className="font-bold text-[#00ffff]">INDEX_OK</span>
                  </div>
                </div>
              </div>
            </TiltedInfoCard>
          </div>

          {/* Panel 3: Resources & Guides (2.5 Cols on lg) */}
          <div className="flex lg:col-span-2">
            <TiltedInfoCard rotateAmplitude={8} scaleOnHover={1.025} className="h-full w-full">
              <div className="group relative w-full flex flex-col h-full">
                <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#00ffff]" />

                <div
                  className="relative flex flex-col justify-between overflow-hidden border-2 border-[#18151f] bg-[#302a45] h-full"
                  style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 rgba(0,255,255,0.6)",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    className="flex h-8 items-center justify-between border-b-2 border-[#18151f] px-3"
                    style={{
                      background: "linear-gradient(90deg, #00ffff 0%, #342d49 72%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 bg-[#ff1493]" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#f4eaff]">
                        GUIDES.TXT
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Dark Resources list */}
                  <div className="bg-[#29243a] p-4 sm:p-5 flex-1">
                    <ul className="space-y-2 font-mono text-xs">
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
                            className="group/item flex items-center justify-between border border-[#51465f] bg-[#342d49] px-2.5 py-1.5 font-bold text-[#e9ddff] transition-all hover:border-[#ff1493] hover:bg-[#443b5c] hover:text-[#ff4fd8] hover:shadow-[2px_2px_0_#00ffff]"
                          >
                            <span className="truncate">{item.label}</span>
                            <span className="border border-[#665b78] bg-[#443b5c] px-1 py-0.2 text-[8px] font-bold text-[#00ffff]">
                              {item.badge}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dark Status Bar */}
                  <div className="flex h-6 items-center justify-between border-t-2 border-[#51465f] bg-[#221d33] px-3 font-mono text-[8px] uppercase tracking-wider text-[#aaa0bd]">
                    <span>DOCS: SYNCED</span>
                    <span className="font-bold text-[#00ffff]">READY</span>
                  </div>
                </div>
              </div>
            </TiltedInfoCard>
          </div>

          {/* Panel 4: Newsletter Broadcast (3 Cols on lg) */}
          <div className="flex lg:col-span-3">
            <TiltedInfoCard rotateAmplitude={8} scaleOnHover={1.025} className="h-full w-full">
              <div className="group relative w-full flex flex-col h-full">
                <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#ff1493]" />

                <div
                  className="relative flex flex-col justify-between overflow-hidden border-2 border-[#18151f] bg-[#302a45] h-full"
                  style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 rgba(255,20,147,0.6)",
                  }}
                >
                  {/* Title Bar */}
                  <div
                    className="flex h-8 items-center justify-between border-b-2 border-[#18151f] px-3"
                    style={{
                      background: "linear-gradient(90deg, #ff4fd8 0%, #342d49 72%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 bg-[#8a2be2]" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#f4eaff]">
                        DISPATCH_FEED.EXE
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Dark Body */}
                  <div className="bg-[#29243a] p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-mono text-sm font-bold uppercase tracking-wide text-[#f4eaff] mb-1">
                        Stay In Sync
                      </h4>
                      <p className="font-mono text-[11px] text-[#b8abc9] mb-4 leading-relaxed">
                        Subscribe for real-time hackathon announcements, track drops & alerts.
                      </p>

                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <div className="space-y-1">
                          <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#d9cbea]">
                            &gt; SUBSCRIBER_EMAIL
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-[#665b78] bg-[#1e192c] px-3 py-2 font-mono text-xs text-[#f4eaff] placeholder-[#8f83a6] outline-none transition-all focus:border-[#00ffff] focus:bg-[#251e36] focus:shadow-[inset_2px_2px_0_#120f1b,3px_3px_0_#ff1493]"
                            style={{
                              boxShadow: "inset 2px 2px 0 #120f1b, 2px 2px 0 #443b5c",
                            }}
                          />
                        </div>

                        {isSubscribed && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1.5 border border-[#00ffff] bg-[#1e3a3a] p-2 font-mono text-[10px] font-bold text-[#7df9ff]"
                          >
                            <CheckCircle2 size={13} className="text-[#00ffff] shrink-0" />
                            <span>SUBSCRIBED // QUEUED</span>
                          </motion.div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex w-full cursor-pointer items-center justify-center gap-1.5 border-2 border-[#18151f] bg-[#00ffff] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-[3px_3px_0_#ff1493] transition-all hover:bg-[#33ffff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                              <span>SYNCING...</span>
                            </>
                          ) : (
                            <>
                              <Send size={13} />
                              <span>[ SUBSCRIBE FEED ]</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Dark Status Bar */}
                  <div className="flex h-6 items-center justify-between border-t-2 border-[#51465f] bg-[#221d33] px-3 font-mono text-[8px] uppercase tracking-wider text-[#aaa0bd]">
                    <span>RSS_PUSH: ACTIVE</span>
                    <span className="font-bold text-[#00ffff]">ONLINE</span>
                  </div>
                </div>
              </div>
            </TiltedInfoCard>
          </div>
        </div>

        {/* Bottom System Status Dark Credit Box */}
        <div
          className="relative overflow-hidden border-2 border-[#18151f] bg-[#302a45] p-4 font-mono text-xs text-[#f4eaff]"
          style={{
            boxShadow: "5px 5px 0 #4b0082",
          }}
        >
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#00ffff] animate-pulse" />
              <span className="font-bold">
                HACK 6.0 <span className="font-normal text-[#b8abc9]">// NIT HAMIRPUR</span>
              </span>
            </div>

            <p className="text-[#d9cbea]">
              Designed with ❤️ by the <span className="font-bold text-[#00ffff]">HACK 6.0 Team</span> | Powered by innovation &amp; creativity
            </p>

            <div className="text-[11px] font-bold text-[#00ffff]">
              [ GRID_STATUS: ONLINE ]
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
