"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/scroll-utils";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "TIMELINE", href: "#timeline" },
  { name: "PRIZES", href: "#prizes" },
  { name: "JUDGES", href: "/judges" },
  { name: "SPONSORS", href: "#sponsors" },
  { name: "FAQ", href: "#faq" },
  { name: "ORGANIZERS", href: "#team-section" },
  { name: "CONTACT", href: "#contact" },
  { name: "TEAM", href: "/team" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (href === "/team") {
      router.push("/team");
      setIsOpen(false);
      return;
    }
    if (href === "/judges") {
      const sectionElement = document.getElementById("judges");
      if (sectionElement && window.location.pathname === "/") {
        scrollToSection("judges");
      } else {
        router.push("/judges");
      }
      setIsOpen(false);
      return;
    }
    if (href.startsWith("#")) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        scrollToSection(sectionId);
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
    setIsOpen(false);
  };

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="fixed top-0 left-0 right-0 z-50 select-none font-subheading px-2 sm:px-4 md:px-8 py-2"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main OS Window Frame Container with Offset Deep Pink Dropshadow */}
        <div className="relative">
          {/* Offset Hard Deep Pink Shadow Layer #FF1493 */}
          <div className="absolute inset-0 bg-[#FF1493] translate-x-1.5 translate-y-1.5" />

          {/* Core Deep Indigo Terminal Window Container (#4B0082) */}
          <div className="relative bg-[#4B0082] border-[1.5px] border-[#00FFFF] shadow-2xl overflow-hidden">

            {/* 1. Retro OS Titlebar Header Strip (Top of Navbar) */}
            <div className="px-3 py-1.5 bg-gradient-to-r from-[#00FFFF] via-[#8A2BE2] to-[#FF4FD8] text-black font-extrabold text-xs flex items-center justify-between border-b border-black/20 select-none font-subheading">
              <div className="flex items-center gap-2 truncate pr-2">
                <span className="text-[10px] leading-none text-black"></span>
                <span className="truncate tracking-widest font-heading text-xs uppercase text-black font-black">
                  HACK_5.0.SYS // MAIN_MENU
                </span>
              </div>

              {/* Retro Win95-style Chunky Square Controls */}
              <div className="flex items-center gap-1.5 flex-shrink-0 font-subheading">
                <button
                  type="button"
                  tabIndex={-1}
                  className="w-5 h-5 bg-[#2D0052] border border-white/40 text-gray-200 flex items-center justify-center text-[10px]"
                  title="Minimize"
                >
                  _
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  className="w-5 h-5 bg-[#2D0052] border border-white/40 text-gray-200 flex items-center justify-center text-[10px]"
                  title="Maximize"
                >
                  □
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  className="w-5 h-5 bg-[#FF1493] text-white border border-white/50 flex items-center justify-center text-[10px] font-extrabold hover:bg-[#FF4FD8] transition-colors"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* 2. Main Navigation Bar Content Area */}
            <div className="px-4 py-2.5 bg-[#2D0052]/95 backdrop-blur-md flex items-center justify-between gap-4">

              {/* Brand Logo (Left Side) */}
              <a
                href="#home"
                onClick={(e) => handleNavLinkClick(e, "#home")}
                className="flex items-center gap-2 group cursor-pointer shrink-0"
              >
                {/* Glowing Retro Icon Box */}
                <div className="w-8 h-8 bg-[#4B0082] border border-[#00FFFF] shadow-[2px_2px_0px_0px_#FF1493] flex items-center justify-center text-[#00FFFF] group-hover:scale-105 transition-transform">
                  <Trophy className="w-4 h-4 text-[#00FFFF] drop-shadow-[0_0_6px_#00FFFF]" />
                </div>
                <div className="flex items-center font-heading font-black text-xl sm:text-2xl tracking-wider">
                  <span className="text-[#FF4FD8] drop-shadow-[0_0_8px_#FF4FD8] font-black">
                    HACK
                  </span>
                  <span className="text-[#00FFFF] drop-shadow-[0_0_8px_#00FFFF] font-black ml-1">
                    5.0
                  </span>
                  <span className="text-[#FF1493] text-lg font-bold animate-pulse ml-0.5">
                    _
                  </span>
                </div>
              </a>

              {/* Navigation Links (Center Zone - English Only) */}
              <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-subheading">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavLinkClick(e, link.href)}
                      className={cn(
                        "px-3 py-1 text-xs font-subheading font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-1",
                        isActive
                          ? "bg-[#FF4FD8]/20 border border-[#FF4FD8] text-[#FF4FD8] shadow-[0_0_10px_rgba(255,79,216,0.5)]"
                          : "text-cyan-100/90 hover:text-[#00FFFF] hover:drop-shadow-[0_0_6px_#00FFFF] border border-transparent"
                      )}
                    >
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </nav>

              {/* Primary CTA Action Button (`APPLY_NOW.EXE ↗`) */}
              <div className="hidden md:flex items-center shrink-0 font-subheading">
                <a
                  href="https://hack-1158.devfolio.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group inline-block"
                >
                  {/* Offset Deep Pink Box Shadow */}
                  <div className="absolute inset-0 bg-[#FF1493] translate-x-1 translate-y-1 transition-transform group-active:translate-x-0 group-active:translate-y-0" />

                  {/* Main Electric Cyan Button */}
                  <button
                    type="button"
                    className="relative bg-[#00FFFF] text-black font-subheading font-black px-4 py-1.5 text-xs uppercase tracking-widest border border-white flex items-center gap-1.5 hover:bg-[#52ffff] transition-all cursor-pointer"
                  >
                    <span>APPLY NOW</span>
                  </button>
                </a>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                className="lg:hidden bg-[#4B0082] border border-[#00FFFF] shadow-[2px_2px_0px_0px_#FF1493] p-1.5 text-[#00FFFF] hover:bg-[#00FFFF]/20 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* 3. Sub-Header Telemetry Status Bar (Bottom Strip) */}
            <div className="px-3 py-1 bg-[#21003D] border-t border-white/10 font-subheading text-[10px] text-gray-300 hidden sm:flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <span className="text-[#00FFFF] font-bold">
                  SYS_NAV://ACTIVE_ROUTE
                </span>
                <span className="text-[#FF4FD8]">
                  [ {activeSection.toUpperCase()} ]
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#00FFFF] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] animate-pulse shadow-[0_0_6px_#00FFFF]" />
                  ONLINE // CONNECTED
                </span>
                <span className="text-gray-300">[ 1995.EXE | 01/01 ]</span>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer (SYS_DRAWER.EXE) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden mt-2 relative font-subheading"
            >
              <div className="absolute inset-0 bg-[#FF1493] translate-x-1.5 translate-y-1.5" />
              <div className="relative bg-[#21003D] border-[1.5px] border-[#FF4FD8] p-3 font-subheading space-y-2">
                {/* Mobile Header Bar */}
                <div className="px-3 py-1 bg-gradient-to-r from-[#FF4FD8]/30 via-[#8A2BE2]/20 to-[#4B0082] border-b border-white/10 flex items-center justify-between text-xs text-[#FF4FD8] font-bold">
                  <span> SYS_DRAWER.EXE // MENU</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-4 h-4 bg-[#FF1493] text-white flex items-center justify-center text-[10px] font-bold"
                  >
                    ×
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="space-y-1 pt-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavLinkClick(e, link.href)}
                        className={cn(
                          "block px-3 py-1.5 text-xs font-subheading font-bold tracking-widest uppercase border transition-all",
                          isActive
                            ? "bg-[#FF4FD8]/20 text-[#FF4FD8] border-[#FF4FD8] shadow-[2px_2px_0px_0px_#00FFFF]"
                            : "text-gray-300 hover:text-[#00FFFF] border-gray-800"
                        )}
                      >
                        &gt; {link.name}
                      </a>
                    );
                  })}
                </div>

                {/* Mobile CTA Apply Button */}
                <div className="pt-2">
                  <a
                    href="https://hack-1158.devfolio.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <button
                      type="button"
                      className="w-full bg-[#00FFFF] text-black font-subheading font-black py-2 text-xs uppercase tracking-widest border border-white shadow-[3px_3px_0px_0px_#FF1493] active:translate-x-0.5 active:translate-y-0.5 transition-all text-center"
                    >
                      APPLY NOW
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
