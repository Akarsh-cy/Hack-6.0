"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
   CONTACT DATA
   ======================================================================== */

interface ContactItem {
  id: string;
  exeName: string;
  icon: typeof Mail;
  title: string;
  line1: string;
  value: string;
  href: string;
  accentColor: string;
  textColor: string;
  hoverColor: string;
}

const contactChannels: ContactItem[] = [
  {
    id: "email",
    exeName: "MAIL_CLIENT.EXE",
    icon: Mail,
    title: "Email Dispatch",
    line1: "Questions or sponsor inquiries?",
    value: "csec@nith.ac.in",
    href: "mailto:csec@nith.ac.in",
    accentColor: "#00CFE8",
    textColor: "#243B64",
    hoverColor: "#FF3B8D",
  },
  {
    id: "location",
    exeName: "VENUE_COORDINATES.EXE",
    icon: MapPin,
    title: "Venue Location",
    line1: "Join us onsite at the arena",
    value: "NIT Hamirpur, HP - 177005",
    href: "https://www.google.com/maps/search/?api=1&query=National+Institute+of+Technology+Hamirpur",
    accentColor: "#FF3B8D",
    textColor: "#5A315D",
    hoverColor: "#FF3B8D",
  },
  {
    id: "phone",
    exeName: "VOICE_COMMS.EXE",
    icon: Phone,
    title: "Helpline Comms",
    line1: "Student & Team Coordinators",
    value: "+91 62306 46657 / +91 93582 57509",
    href: "tel:+916230646657",
    accentColor: "#00CFE8",
    textColor: "#243B64",
    hoverColor: "#FF3B8D",
  },
];

/* ========================================================================
   3D TILT CARD
   ======================================================================== */

const TiltCard = ({
  children,
  className = "",
  dropShadowColor = "#FF3B8D",
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
    return `${sx}px ${sy}px 0px 0px ${dropShadowColor}, ${
      sx * 1.6
    }px ${sy * 1.6 + 14}px 32px -6px rgba(0,0,0,0.55)`;
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
        {!isTouchDevice && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            style={{
              background: useTransform([glareX, glareY], (latest) => {
                const [gx, gy] = latest as [string, string];
                return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.5), transparent 48%)`;
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

const WindowControls = ({
  closeColor = "#FF3B8D",
}: {
  closeColor?: string;
}) => (
  <div className="flex items-center gap-1.5 flex-shrink-0">
    <span
      style={{ boxShadow: BEVEL_RAISED }}
      className="w-4 h-4 sm:w-5 sm:h-5 bg-[#c9c9d4] text-[#25233A] flex items-center justify-center text-[10px] font-bold"
    >
      _
    </span>
    <span
      style={{ boxShadow: BEVEL_RAISED }}
      className="w-4 h-4 sm:w-5 sm:h-5 bg-[#c9c9d4] text-[#25233A] flex items-center justify-center text-[10px] font-bold"
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
   CONTACT SECTION
   ======================================================================== */

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "3fa442a1-9ac9-4751-ab62-8716bc1c6c8b",
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: "HACK 6.0 Contact Dispatcher",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
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
              GET <span className="text-[#FF3B8D]">IN TOUCH</span>
            </h2>
          </div>

          <div className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-[#FF3B8D] via-[#b967ff] to-[#00CFE8] shadow-[0_0_12px_#FF3B8D]" />

          <p className="mx-auto mt-5 max-w-2xl font-mono text-xs sm:text-sm md:text-base font-semibold text-[#ffffff]">
            Have queries regarding HACK 6.0? Connect with the operations grid
            through the channels below.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT — MESSAGE WINDOW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col"
          >
            <TiltCard dropShadowColor="#FF3B8D" className="border-2 border-black">
              {/* TITLE BAR */}
              <div className="bg-gradient-to-r from-[#ff71ce] via-[#fbcfe8] to-[#f4f4f6] px-3 py-2 border-b-2 border-black flex items-center justify-between select-none shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] text-[#25233A] leading-none">
                    ■
                  </span>
                  <span className="font-bold text-xs uppercase text-[#25233A] tracking-wider truncate">
                    DISPATCH_MESSAGE.EXE
                  </span>
                </div>
                <WindowControls closeColor="#FF3B8D" />
              </div>

              {/* FORM BODY */}
              <div
                style={{ boxShadow: BEVEL_INSET }}
                className="m-2 p-5 sm:p-7 flex-1 bg-[#f4f4f6]"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* NAME + EMAIL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#25233A]">
                        <span className="text-[#FF3B8D] font-black">&gt;</span>
                        SENDER_NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Chen"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full border-2 border-[#1e1e2f] bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#25233A] placeholder-[#4B556B] outline-none transition-all focus:border-[#FF3B8D] focus:shadow-[3px_3px_0_#00CFE8]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#25233A]">
                        <span className="text-[#00CFE8] font-black">&gt;</span>
                        SENDER_EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@domain.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full border-2 border-[#1e1e2f] bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#25233A] placeholder-[#4B556B] outline-none transition-all focus:border-[#00CFE8] focus:shadow-[3px_3px_0_#FF3B8D]"
                      />
                    </div>
                  </div>

                  {/* SUBJECT */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#25233A]">
                      <span className="text-[#FF3B8D] font-black">&gt;</span>
                      SUBJECT_HEADER
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hackathon Track Query / Sponsor Opportunity"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full border-2 border-[#1e1e2f] bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#25233A] placeholder-[#4B556B] outline-none transition-all focus:border-[#FF3B8D] focus:shadow-[3px_3px_0_#00CFE8]"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#25233A]">
                      <span className="text-[#00CFE8] font-black">&gt;</span>
                      MESSAGE_PAYLOAD
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your transmission here..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full resize-none border-2 border-[#1e1e2f] bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#25233A] placeholder-[#4B556B] outline-none transition-all focus:border-[#00CFE8] focus:shadow-[3px_3px_0_#FF3B8D]"
                    />
                  </div>

                  {/* STATUS MESSAGES */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 border-2 border-[#1e1e2f] bg-[#e2e8f0] p-3 font-mono text-xs font-bold text-[#166534] shadow-[3px_3px_0_#00CFE8]"
                    >
                      <CheckCircle2 size={16} className="shrink-0" />
                      <span>TRANSMISSION SENT SUCCESSFULLY</span>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 border-2 border-[#1e1e2f] bg-[#ffe4e6] p-3 font-mono text-xs font-bold text-[#e11d48] shadow-[3px_3px_0_#FF3B8D]"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      <span>TRANSMISSION FAILED. PLEASE RETRY.</span>
                    </motion.div>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-[#1e1e2f] bg-gradient-to-r from-[#FF3B8D] via-[#b967ff] to-[#7928ca] px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0_#00CFE8] transition-all hover:brightness-110 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>[ TRANSMIT MESSAGE ]</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </TiltCard>
          </motion.div>

          {/* RIGHT — CONTACT CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-5 justify-between"
          >
            {contactChannels.map((item) => {
              const Icon = item.icon;

              return (
                <TiltCard
                  key={item.id}
                  dropShadowColor={item.accentColor}
                  className="border-2 border-black"
                >
                  {/* TITLE BAR */}
                  <div
                    style={{
                      background: `linear-gradient(to right, ${item.accentColor}, #fbcfe8 60%, #f4f4f6)`,
                    }}
                    className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[10px] text-[#25233A] leading-none">
                        ■
                      </span>
                      <span className="font-bold text-xs uppercase text-[#25233A] tracking-wider truncate">
                        {item.exeName}
                      </span>
                    </div>
                    <WindowControls closeColor={item.accentColor} />
                  </div>

                  {/* CARD BODY */}
                  <div
                    style={{ boxShadow: BEVEL_INSET }}
                    className="m-1.5 p-4 sm:p-5 flex items-start gap-4 flex-1 bg-[#f4f4f6]"
                  >
                    <div
                      style={{
                        transform: "translateZ(45px)",
                        transformStyle: "preserve-3d",
                        boxShadow: `3px 3px 0px 0px ${item.accentColor}`,
                      }}
                      className="w-11 h-11 bg-[#f4f4f6] border-2 border-[#1e1e2f] flex items-center justify-center shrink-0 transition-transform duration-300"
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: item.accentColor }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-[#25233A] uppercase tracking-wide">
                        {item.title}
                      </h3>

                      <p className="font-mono text-[10px] sm:text-xs text-[#4B556B] mt-0.5 leading-tight">
                        {item.line1}
                      </p>

                      {item.id === "location" ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/loc mt-2.5 inline-flex flex-col cursor-pointer transition-all duration-200"
                        >
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold text-[#5A315D] transition-colors duration-200 group-hover/loc:text-[#FF3B8D] underline underline-offset-4 decoration-[#5A315D]/40 group-hover/loc:decoration-[#FF3B8D]">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FF3B8D] transition-transform duration-200 group-hover/loc:-translate-y-0.5" />
                            <span>{item.value}</span>
                            <span className="text-[11px] text-[#FF3B8D] opacity-80 transition-transform duration-200 group-hover/loc:translate-x-0.5 group-hover/loc:-translate-y-0.5">
                              ↗
                            </span>
                          </span>
                          <span className="mt-1 font-mono text-[10px] text-[#4B556B] group-hover/loc:text-[#FF3B8D] transition-colors duration-200">
                            Click to view location on map
                          </span>
                        </a>
                      ) : (
                        <a
                          href={item.href}
                          className="mt-2 inline-block font-mono text-xs sm:text-sm font-bold break-all transition-colors underline underline-offset-4 cursor-pointer text-[#243B64] hover:text-[#FF3B8D] decoration-[#243B64]/40 hover:decoration-[#FF3B8D]"
                        >
                          {item.value}
                        </a>
                      )}
                    </div>
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
