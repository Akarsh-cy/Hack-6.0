"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Twitter,
  Linkedin,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Send,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { scrollToSection } from "@/lib/scroll-utils";
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
   FOOTER COMPONENT
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
      label: "Community Discord",
      href: "https://discord.com/invite/kneqCFxKHY",
      isExternal: true,
    },
    {
      label: "FAQ Matrix",
      href: "#faq",
      isExternal: false,
    },
  ];

  const socialLinks = [
    {
      label: "Discord",
      href: "https://discord.com/invite/kneqCFxKHY",
      icon: FaDiscord,
      hoverClass:
        "hover:text-[#5865F2] hover:border-[#5865F2]/40 hover:bg-[#5865F2]/10 hover:shadow-[0_0_15px_rgba(88,101,242,0.3)]",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/csec_nith/",
      icon: Instagram,
      hoverClass:
        "hover:text-[#ff2a85] hover:border-[#ff2a85]/40 hover:bg-[#ff2a85]/10 hover:shadow-[0_0_15px_rgba(255,42,133,0.3)]",
    },
    {
      label: "Twitter / X",
      href: "https://x.com/csec_nith?t=Ubyv6_7SLUkdaxtBS8MUew&s=09",
      icon: Twitter,
      hoverClass:
        "hover:text-[#00f0ff] hover:border-[#00f0ff]/40 hover:bg-[#00f0ff]/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/nith-csec/",
      icon: Linkedin,
      hoverClass:
        "hover:text-[#0077b5] hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10 hover:shadow-[0_0_15px_rgba(0,119,181,0.3)]",
    },
  ];

  return (
    <footer className="relative w-full border-t border-white/10 bg-gradient-to-b from-[#0b081a]/40 via-[#0d0722]/75 to-[#0b051b]/95 backdrop-blur-md text-white font-sans overflow-hidden">
      {/* Decorative Ambient Background Glows */}
      <div className="pointer-events-none absolute -bottom-20 left-1/4 -z-10 h-64 w-64 rounded-full bg-[#ff2a85]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 -z-10 h-64 w-64 rounded-full bg-[#00f0ff]/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 h-40 w-80 rounded-full bg-[#7928ca]/10 blur-[90px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* 4 Column Main Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-12">
          {/* Col 1: CSEC Brand & Description */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-5">
            <div>
              {/* Brand Logo & Name */}
              <div className="flex items-center gap-3">
                <Link
                  href="https://csec.nith.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/80 border border-white/15 p-1.5 transition-all duration-300 hover:scale-105 hover:border-[#ff2a85]/50 hover:shadow-[0_0_15px_rgba(255,42,133,0.3)]"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/csec-RitzmBrgdmOMfzaijUqHFSmOVA4LzO.png"
                    alt="CSEC Logo"
                    width={34}
                    height={34}
                    className="h-full w-full object-contain"
                  />
                </Link>

                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-2xl font-black tracking-wider text-white ${Hacked_KerX.className}`}
                  >
                    HACK{" "}
                    <span className="bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#00f0ff] bg-clip-text text-transparent">
                      6.0
                    </span>
                  </span>
                </div>
              </div>

              {/* Subtitle / Department */}
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#00f0ff]">
                CSEC <span className="text-white/30">•</span> NIT HAMIRPUR
              </p>

              {/* Description */}
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-300/90">
                Empowering student innovation through code, creativity, and
                collaboration in the hills of Himachal.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 transition-all duration-200 ${social.hoverClass}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 sm:col-span-1 space-y-4">
            <h4 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-white">
              <Sparkles className="h-4 w-4 text-[#ff2a85] shrink-0" />
              <span>Quick Links</span>
            </h4>

            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="group inline-flex items-center gap-1.5 text-zinc-300/90 transition-all duration-200 hover:text-white hover:translate-x-1"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-500 transition-colors duration-200 group-hover:text-[#ff2a85]" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="lg:col-span-3 sm:col-span-1 space-y-4">
            <h4 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-white">
              <Sparkles className="h-4 w-4 text-[#00f0ff] shrink-0" />
              <span>Resources</span>
            </h4>

            <ul className="space-y-2.5 text-sm">
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
                    className="group inline-flex items-center gap-1.5 text-zinc-300/90 transition-all duration-200 hover:text-white hover:translate-x-1"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-500 transition-colors duration-200 group-hover:text-[#00f0ff]" />
                    <span className="truncate">{item.label}</span>
                    {item.isExternal && (
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-[#00f0ff]" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Stay Updated */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Stay Updated
            </h4>

            <p className="text-sm leading-relaxed text-zinc-300/90">
              Subscribe to the HACK 6.0 newsletter for updates, schedule
              releases, and announcements.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5 pt-1">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-[#ff2a85]/70 focus:bg-white/[0.08] focus:ring-1 focus:ring-[#ff2a85]/40"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#7928ca] py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-pink-500/20 transition-all duration-200 hover:brightness-110 hover:shadow-pink-500/35 active:scale-[0.99] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>

            {isSubscribed && (
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                <span>Thank you! You're subscribed.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Horizontal Rule & Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-400">
          <p>© 2026 CSEC, NIT Hamirpur. All rights reserved.</p>

          <p className="flex items-center gap-1.5 font-medium text-zinc-300">
            <span>Designed with</span>
            <Heart className="h-3.5 w-3.5 fill-[#ff2a85] text-[#ff2a85]" />
            <span>by the</span>
            <Link
              href="https://csec.nith.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white transition-colors duration-200 hover:text-[#00f0ff] hover:underline"
            >
              HACK 6.0 Team
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
