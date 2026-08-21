"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/scroll-utils";
import localFont from "next/font/local";
import { useGlitch } from "react-powerglitch";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font", // Optional: for CSS variables
});

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Timeline", href: "#timeline" },
  { name: "Prizes", href: "#prizes" },
  { name: "Judges", href: "#judges" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "FAQ", href: "#faq" },
  { name: "Organizers", href: "#team-section" },
  { name: "Contact", href: "#contact" },
  { name: "Team", href: "/team" },
];

export default function Navbar() {
  const glitch = useGlitch({
    timing: {
      duration: 3950,
    },
    shake: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showHackText, setShowHackText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      // Show HACK 6.0 text only when scrolled away from hero section
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setShowHackText(window.scrollY > heroHeight * 0.5);
      }

      // Filter out external routes (like /team) and get only valid hash links
      const pageSections = navLinks
        .filter((link) => link.href.startsWith("#"))
        .map((link) => link.href.substring(1));

      let currentActive = "home"; // Default fallback

      for (const section of pageSections) {
        const element = document.getElementById(section);
        if (element) {
          // 150px offset to trigger slightly before the section hits the top
          // This prevents it from getting stuck and guarantees smooth transitions
          if (window.scrollY >= element.offsetTop - 150) {
            currentActive = section;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Call once on mount to set initial state correctly
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();
  const handleNavLinkClick = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
  ) => {
    e.preventDefault();
    console.log(`handleNavLinkClick triggered with href: ${href}`);
    
    if (href.startsWith("/")) {
      router.push(href);
      setIsOpen(false);
      return;
    }
    
    const sectionId = href.substring(1); // Remove the # from the href
    console.log(`Extracted section ID: ${sectionId}`);
    
    if (sectionId === "team") {
      router.push("/team");
    }
    if (sectionId === "judges") {
      router.push("/judges");
    }
    
    scrollToSection(sectionId);
    setIsOpen(false); // Close mobile menu if open
  };

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
      <motion.nav
          initial="hidden"
          animate="visible"
          variants={navbarVariants}
          className={cn(
              "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono select-none",
              scrolled
                  ? "bg-[#0b0314]/90 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-[#ff2a85]/30"
                  : "bg-transparent py-5"
          )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              {!showHackText ? (
                  <motion.div
                      key="logos"
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                  >
                    {/* CSEC Logo - Link to external site */}
                    <motion.a
                        href="https://csec.nith.ac.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-[48px] h-[48px] mr-3"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/csec-RitzmBrgdmOMfzaijUqHFSmOVA4LzO.png"
                          alt="CSEC Logo"
                          fill
                          className="object-contain"
                          style={{
                            filter: "drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))",
                          }}
                      />
                    </motion.a>

                    {/* Separator */}
                    <div className="h-7 w-px bg-gray-600 mx-3"></div>

                    {/* HACK Logo - Link to home section */}
                    <motion.a
                        href="#home"
                        onClick={(e) => handleNavLinkClick(e, "#home")}
                        className="relative w-[48px] h-[48px] mr-3"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                      <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%2816%29_20250208_222328_0000-50pdDbAwyrTeA1mMlMT3c72vROO2oA.png"
                          alt="HACK Logo"
                          fill
                          className="object-contain"
                          style={{
                            filter: "drop-shadow(0 0 8px rgba(255, 42, 133, 0.6))",
                          }}
                      />
                    </motion.a>
                  </motion.div>
              ) : (
                  <motion.div
                      key="hacktext"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`${Hacked_KerX.className} whitespace-nowrap`}
                  >
                    <a
                        href="#home"
                        onClick={(e) => handleNavLinkClick(e, "#home")}
                        className="text-2xl md:text-4xl font-black text-[#ff2a85] drop-shadow-[2px_2px_0px_#00f0ff] ml-1 tracking-wider"
                    >
                      HACK<span className="text-white drop-shadow-[2px_2px_0px_#ff2a85]"> 6.0</span>
                    </a>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <ul className="flex space-x-6 lg:space-x-8">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                    <motion.li key={link.name} custom={i} variants={linkVariants}>
                      <Link
                          href={link.href}
                          className={cn(
                              "text-sm lg:text-base font-semibold tracking-wide text-gray-300 hover:text-[#ff2a85] transition-colors relative py-1",
                              isActive && "text-[#ff2a85] font-bold"
                          )}
                      >
                        {link.name}
                        {isActive && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#ff2a85] shadow-[0_0_8px_#ff2a85]"
                            />
                        )}
                      </Link>
                    </motion.li>
                );
              })}
            </ul>

            <motion.div
                variants={linkVariants}
                custom={navLinks.length}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              <a
                  href="https://hack-1158.devfolio.co/"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <Button className="bg-[#ff2a85] hover:bg-[#ff2a85]/90 text-white font-mono font-bold uppercase tracking-wider text-sm px-5 py-2 h-auto rounded-none border border-black shadow-[3px_3px_0px_#00f0ff] transition-all">
                  Apply Now
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Mobile Navigation Toggle */}
          <motion.button
              className="md:hidden text-white hover:text-[#ff2a85] p-2 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={28} className="text-[#ff2a85]" /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  className="md:hidden bg-[#0e0419]/95 border-b-2 border-[#ff2a85] backdrop-blur-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
              >
                <div className="container mx-auto px-4 py-4">
                  <ul className="flex flex-col space-y-3">
                    {navLinks.map((link, i) => {
                      const isActive = activeSection === link.href.substring(1);
                      return (
                          <motion.li
                              key={link.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                          >
                            <a
                                href={link.href}
                                onClick={(e) => handleNavLinkClick(e, link.href)}
                                className={cn(
                                    "text-base font-semibold tracking-wider text-gray-300 hover:text-[#ff2a85] transition-colors block py-2 border-b border-white/5",
                                    isActive && "text-[#ff2a85] font-bold pl-2 border-l-2 border-l-[#ff2a85]"
                                )}
                            >
                              {link.name}
                            </a>
                          </motion.li>
                      );
                    })}
                    <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: navLinks.length * 0.05 }}
                        className="pt-2"
                    >
                      <a
                          href="https://hack-1158.devfolio.co/"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                        <Button className="bg-[#ff2a85] hover:bg-[#ff2a85]/90 text-white w-full border border-black shadow-[3px_3px_0px_#00f0ff] font-mono font-bold uppercase tracking-wider text-base py-2.5 rounded-none">
                          Apply Now
                        </Button>
                      </a>
                    </motion.li>
                  </ul>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
  );
}
