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
      <div className="flex h-[15px] w-[15px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[8px] leading-none text-[#222]">
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
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="container relative mx-auto max-w-7xl">
        {/* Top Header Pill */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="h-[2px] flex-1 bg-[#4b0082]" />
          <div className="border-2 border-[#333] bg-[#eeeeee] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#333] shadow-[4px_4px_0_#00ffff]">
            ROOT_INDEX://TERMINAL_FOOTER
          </div>
          <div className="h-[2px] flex-1 bg-[#4b0082]" />
        </div>

        {/* 4-Panel Light Retro Windows Grid with 3D Tilt */}
        <div className="mb-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-12 items-stretch">
          {/* Panel 1: CSEC Hub Identity (4 Cols on lg) */}
          <div className="flex lg:col-span-4">
            <TiltedInfoCard rotateAmplitude={8} scaleOnHover={1.025} className="h-full w-full">
              <div className="group relative w-full flex flex-col h-full">
                <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#00ffff]" />

                <div
                  className="relative flex flex-col justify-between overflow-hidden border-2 border-[#292929] bg-[#eeeeee] h-full"
                  style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 #00ffff",
                  }}
                >
                  {/* Title Bar */}
                  <div className="flex h-8 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#d4b0f5] via-[#eadaf8] to-[#eeeeee] px-3">
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

                  {/* Light Panel Body */}
                  <div className="bg-[#ffffff] p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Brand Row */}
                      <div className="mb-4 flex items-center gap-3">
                        <Link
                          href="https://csec.nith.ac.in/"
                          target="_blank"
                          className="group/logo relative h-12 w-12 shrink-0 border-2 border-[#292929] bg-[#ffffff] p-1 shadow-[3px_3px_0_#ff1493] transition-transform hover:scale-105"
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

                      {/* Description */}
                      <p className="mb-6 font-mono text-xs text-[#555] leading-relaxed">
                        Empowering innovation through code, creativity, and collaboration across the next generation of technologists.
                      </p>
                    </div>

                    {/* Social Buttons */}
                    <div>
                      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-[#333]">
                        &gt; SOCIAL_CHANNELS
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="https://discord.com/invite/kneqCFxKHY"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border-2 border-[#292929] bg-[#f8f8f8] text-[#222] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#8a2be2] hover:text-white"
                          title="Discord"
                        >
                          <FaDiscord className="h-4 w-4" />
                        </a>
                        <a
                          href="https://www.instagram.com/hacknith?igsh=N3VtczNwa3pjNjNo"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border-2 border-[#292929] bg-[#f8f8f8] text-[#222] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#ff1493] hover:text-white"
                          title="Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                        <a
                          href="https://x.com/csec_nith?t=Ubyv6_7SLUkdaxtBS8MUew&s=09"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border-2 border-[#292929] bg-[#f8f8f8] text-[#222] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#00ffff] hover:text-black"
                          title="Twitter / X"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                        <a
                          href="https://www.linkedin.com/company/nith-csec/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border-2 border-[#292929] bg-[#f8f8f8] text-[#222] shadow-[2px_2px_0_#ff1493] transition-all hover:-translate-y-0.5 hover:bg-[#0077b5] hover:text-white"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">
                    <span>NODE: ACTIVE</span>
                    <span className="font-bold text-[#8a2be2]">COMMUNITY_HUB</span>
                  </div>
                </div>
              </div>
            </TiltedInfoCard>
          </div>

          {/* Panel 2: Navigation Links (3 Cols on lg) */}
          <div className="flex lg:col-span-3">
            <TiltedInfoCard rotateAmplitude={8} scaleOnHover={1.025} className="h-full w-full">
              <div className="group relative w-full flex flex-col h-full">
                <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#ff1493]" />

                <div
                  className="relative flex flex-col justify-between overflow-hidden border-2 border-[#292929] bg-[#eeeeee] h-full"
                  style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 #ff1493",
                  }}
                >
                  {/* Title Bar */}
                  <div className="flex h-8 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee] px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 bg-[#8a2be2]" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
                        NAVIGATOR.EXE
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Light Links list */}
                  <div className="bg-[#ffffff] p-4 sm:p-5 flex-1">
                    <ul className="space-y-2 font-mono text-xs">
                      {quickLinks.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="group/item flex items-center justify-between border border-[#ddd] bg-[#f8f8f8] px-2.5 py-1.5 font-bold text-[#222] transition-all hover:border-[#8a2be2] hover:bg-[#fff9fc] hover:text-[#8a2be2] hover:shadow-[2px_2px_0_#ff1493]"
                          >
                            <span className="flex items-center gap-1.5">
                              <span className="text-[#ff1493] group-hover/item:translate-x-0.5 transition-transform">&gt;</span>
                              {link.label}
                            </span>
                            <span className="text-[9px] text-[#888] font-normal">
                              [{link.tag}]
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Bar */}
                  <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">
                    <span>ROUTES: 07</span>
                    <span className="font-bold text-[#00bfff]">INDEX_OK</span>
                  </div>
                </div>
              </div>
            </TiltedInfoCard>
          </div>

          {/* Panel 3: Resources & Guides (2 Cols on lg) */}
          <div className="flex lg:col-span-2">
            <TiltedInfoCard rotateAmplitude={8} scaleOnHover={1.025} className="h-full w-full">
              <div className="group relative w-full flex flex-col h-full">
                <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#00ffff]" />

                <div
                  className="relative flex flex-col justify-between overflow-hidden border-2 border-[#292929] bg-[#eeeeee] h-full"
                  style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 #00ffff",
                  }}
                >
                  {/* Title Bar */}
                  <div className="flex h-8 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#00ffff] via-[#c9ffff] to-[#eeeeee] px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 bg-[#ff1493]" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
                        GUIDES.TXT
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Light Resources list */}
                  <div className="bg-[#ffffff] p-4 sm:p-5 flex-1">
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
                            className="group/item flex items-center justify-between border border-[#ddd] bg-[#f8f8f8] px-2.5 py-1.5 font-bold text-[#222] transition-all hover:border-[#8a2be2] hover:bg-[#f6faff] hover:text-[#0088cc] hover:shadow-[2px_2px_0_#00ffff]"
                          >
                            <span className="truncate">{item.label}</span>
                            <span className="border border-[#ccc] bg-[#eee] px-1 py-0.2 text-[8px] font-bold text-[#555]">
                              {item.badge}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Bar */}
                  <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">
                    <span>DOCS: SYNCED</span>
                    <span className="font-bold text-[#2e7d32]">READY</span>
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
                  className="relative flex flex-col justify-between overflow-hidden border-2 border-[#292929] bg-[#eeeeee] h-full"
                  style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 #ff1493",
                  }}
                >
                  {/* Title Bar */}
                  <div className="flex h-8 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee] px-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 bg-[#8a2be2]" />
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
                        DISPATCH_FEED.EXE
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Light Body */}
                  <div className="bg-[#ffffff] p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-mono text-sm font-bold uppercase tracking-wide text-[#222] mb-1">
                        Stay In Sync
                      </h4>
                      <p className="font-mono text-[11px] text-[#555] mb-4 leading-relaxed">
                        Subscribe for real-time hackathon announcements, track drops & alerts.
                      </p>

                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <div className="space-y-1">
                          <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#333]">
                            &gt; SUBSCRIBER_EMAIL
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-[#292929] bg-[#f8f8f8] px-3 py-2 font-mono text-xs text-[#111] placeholder-[#888] shadow-[2px_2px_0_#d9a7f0] outline-none transition-all focus:border-[#8a2be2] focus:bg-[#ffffff] focus:shadow-[3px_3px_0_#ff1493]"
                          />
                        </div>

                        {isSubscribed && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1.5 border border-[#2e7d32] bg-[#e8f5e9] p-2 font-mono text-[10px] font-bold text-[#1b5e20]"
                          >
                            <CheckCircle2 size={13} className="text-[#2e7d32] shrink-0" />
                            <span>SUBSCRIBED // QUEUED</span>
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

                  {/* Status Bar */}
                  <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">
                    <span>RSS_PUSH: ACTIVE</span>
                    <span className="font-bold text-[#8a2be2]">ONLINE</span>
                  </div>
                </div>
              </div>
            </TiltedInfoCard>
          </div>
        </div>

        {/* Bottom System Status Credit Box */}
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
                HACK 5.0 <span className="font-normal text-[#666]">// NIT HAMIRPUR</span>
              </span>
            </div>

            <p className="text-[#444]">
              Designed with ❤️ by the <span className="font-bold text-[#8a2be2]">HACK 5.0 Team</span> | Powered by innovation &amp; creativity
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
