"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
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
  status: string;
  port: string;
  badge: string;
  accentColor: string;
}

const contactChannels: ContactItem[] = [
  {
    id: "email",
    exeName: "MAIL_CLIENT.EXE",
    icon: Mail,
    title: "Email Dispatch",
    line1: "Questions or sponsor inquiries?",
    value: "hack.csec.nith26@gmail.com",
    href: "mailto:hack.csec.nith26@gmail.com",
    status: "ONLINE",
    port: "PORT://443",
    badge: "DIRECT_LINK",
    accentColor: "#00f0ff",
  },
  {
    id: "location",
    exeName: "VENUE_COORDINATES.EXE",
    icon: MapPin,
    title: "Venue Location",
    line1: "Join us onsite at the arena",
    value: "NIT Hamirpur, HP - 177005",
    href: "https://www.google.co.in/maps/place/NIT+Hamirpur",
    status: "ACTIVE",
    port: "LOC://31.7084,76.5273",
    badge: "ONSITE_HUB",
    accentColor: "#ff2a85",
  },
  {
    id: "phone",
    exeName: "VOICE_COMMS.EXE",
    icon: Phone,
    title: "Helpline Comms",
    line1: "Student & Team Coordinators",
    value: "+91 62675 31322 / +91 70233 26128",
    href: "tel:+916267531322",
    status: "READY",
    port: "FREQ://91.5MHZ",
    badge: "VOICE_LINK",
    accentColor: "#00f0ff",
  },
];

/* ========================================================================
   3D TILT CARD
   Same visual behaviour as PrizeSection
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

  const glareX = useTransform(
      mouseX,
      [-0.5, 0.5],
      ["10%", "90%"]
  );

  const glareY = useTransform(
      mouseY,
      [-0.5, 0.5],
      ["10%", "90%"]
  );

  const shadowX = useTransform(
      mouseX,
      [-0.5, 0.5],
      [17, -17]
  );

  const shadowY = useTransform(
      mouseY,
      [-0.5, 0.5],
      [17, -17]
  );

  const boxShadowValue = useTransform(
      [shadowX, shadowY],
      (latest) => {
        const [sx, sy] = latest as [number, number];

        return `${sx}px ${sy}px 0px 0px ${dropShadowColor}, ${
            sx * 1.6
        }px ${sy * 1.6 + 14}px 32px -6px rgba(0,0,0,0.55)`;
      }
  );

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

  const handleMouseEnter = (
      e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (isTouchDevice) return;

    rectRef.current =
        e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (
      e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (isTouchDevice) return;

    if (!rectRef.current) {
      rectRef.current =
          e.currentTarget.getBoundingClientRect();
    }

    const rect = rectRef.current;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rawX =
          (clientX - rect.left) / rect.width - 0.5;

      const rawY =
          (clientY - rect.top) / rect.height - 0.5;

      const pctX = Math.min(
          0.5,
          Math.max(-0.5, rawX)
      );

      const pctY = Math.min(
          0.5,
          Math.max(-0.5, rawY)
      );

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
            className={`group relative bg-[#f4f4f6] border-2 border-[#1e1e2f] font-body overflow-hidden select-none flex flex-col h-full will-change-transform ${className}`}
        >
          {/* Holographic sheen */}
          {!isTouchDevice && (
              <motion.div
                  className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
                  style={{
                    background: useTransform(
                        [glareX, glareY],
                        (latest) => {
                          const [gx, gy] = latest as [
                            string,
                            string
                          ];

                          return `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.5), transparent 48%)`;
                        }
                    ),
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

const WindowControls = () => (
    <div className="flex items-center gap-1.5 flex-shrink-0">
    <span
        style={{
          boxShadow: BEVEL_RAISED,
        }}
        className="w-5 h-5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold"
    >
      _
    </span>

      <span
          style={{
            boxShadow: BEVEL_RAISED,
          }}
          className="w-5 h-5 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold"
      >
      □
    </span>

      <span
          style={{
            boxShadow: BEVEL_RAISED,
          }}
          className="w-5 h-5 bg-[#ff2a85] text-white flex items-center justify-center text-[10px] font-extrabold"
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

  const [isSubmitting, setIsSubmitting] =
      useState(false);

  const [submitStatus, setSubmitStatus] = useState<
      "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (
      e: React.FormEvent
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("idle");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    }, 1000);
  };

  return (
      <motion.section
          id="contact"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-50px",
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative py-24 px-4 sm:px-6"
      >
        <div className="container relative mx-auto max-w-6xl">

          {/* ================================================================
            HEADER
        ================================================================ */}

          <div className="mb-16 text-center">

            <div className="relative inline-block">

              <h2
                  className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.15em] uppercase text-white ${Hacked_KerX.className}`}
              >
                GET{" "}
                <span className="text-[#ff2a85]">
                IN TOUCH
              </span>
              </h2>

            </div>

            <div className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#00f0ff] shadow-[0_0_12px_#ff2a85]" />

            <p className="mx-auto mt-5 max-w-2xl font-mono text-xs sm:text-sm md:text-base font-semibold text-[#ffffff]">
              Have queries regarding HACK 6.0?
              Connect with the operations grid through
              the channels below.
            </p>
          </div>

          {/* ================================================================
            MAIN GRID
        ================================================================ */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* ==============================================================
              LEFT — MESSAGE WINDOW
          ============================================================== */}

            <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="lg:col-span-7 flex flex-col"
            >
              <TiltCard
                  dropShadowColor="#ff2a85"
                  className="border-2 border-black"
              >

                {/* TITLE BAR */}

                <div className="bg-gradient-to-r from-[#ff71ce] via-[#fbcfe8] to-[#f4f4f6] px-3 py-2 border-b-2 border-black flex items-center justify-between select-none shrink-0">

                  <div className="flex items-center gap-2 truncate">

                  <span className="text-[10px] text-[#1e1e2f] leading-none">
                    ■
                  </span>

                    <span className="font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                    DISPATCH_MESSAGE.EXE
                  </span>

                  </div>

                  <WindowControls />

                </div>

                {/* STATUS STRIP */}

                <div className="px-3 py-1.5 bg-[#e2e8f0] border-b-2 border-black flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#475569] select-none shrink-0">

                <span className="tracking-wider">
                  ■ PROTOCOL: HTTPS_SECURE
                </span>

                  <span className="text-[#00c2cb] font-bold tracking-wider">
                  ■ DISPATCH_NODE: ONLINE
                </span>

                </div>

                {/* FORM */}

                <div
                    style={{
                      boxShadow: BEVEL_INSET,
                    }}
                    className="m-2 p-5 sm:p-7 flex-1 bg-[#f4f4f6]"
                >

                  <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                  >

                    {/* NAME + EMAIL */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <div className="space-y-1.5">

                        <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1e1e2f]">
                        <span className="text-[#ff2a85] font-black">
                          &gt;
                        </span>
                          SENDER_NAME
                        </label>

                        <input
                            type="text"
                            required
                            placeholder="e.g. Alex Chen"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                  ...form,
                                  name: e.target.value,
                                })
                            }
                            className="w-full border-2 border-[#1e1e2f] bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#111] placeholder-[#888] outline-none transition-all focus:border-[#ff2a85] focus:shadow-[3px_3px_0_#00f0ff]"
                        />

                      </div>

                      <div className="space-y-1.5">

                        <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1e1e2f]">
                        <span className="text-[#00c2cb] font-black">
                          &gt;
                        </span>
                          SENDER_EMAIL
                        </label>

                        <input
                            type="email"
                            required
                            placeholder="alex@domain.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                  ...form,
                                  email: e.target.value,
                                })
                            }
                            className="w-full border-2 border-[#1e1e2f] bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#111] placeholder-[#888] outline-none transition-all focus:border-[#00c2cb] focus:shadow-[3px_3px_0_#ff2a85]"
                        />

                      </div>

                    </div>

                    {/* SUBJECT */}

                    <div className="space-y-1.5">

                      <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1e1e2f]">
                      <span className="text-[#ff2a85] font-black">
                        &gt;
                      </span>
                        SUBJECT_HEADER
                      </label>

                      <input
                          type="text"
                          required
                          placeholder="e.g. Hackathon Track Query / Sponsor Opportunity"
                          value={form.subject}
                          onChange={(e) =>
                              setForm({
                                ...form,
                                subject: e.target.value,
                              })
                          }
                          className="w-full border-2 border-[#1e1e2f] bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#111] placeholder-[#888] outline-none transition-all focus:border-[#ff2a85] focus:shadow-[3px_3px_0_#00f0ff]"
                      />

                    </div>

                    {/* MESSAGE */}

                    <div className="space-y-1.5">

                      <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1e1e2f]">
                      <span className="text-[#00c2cb] font-black">
                        &gt;
                      </span>
                        MESSAGE_PAYLOAD
                      </label>

                      <textarea
                          required
                          rows={4}
                          placeholder="Write your transmission here..."
                          value={form.message}
                          onChange={(e) =>
                              setForm({
                                ...form,
                                message: e.target.value,
                              })
                          }
                          className="w-full resize-none border-2 border-[#1e1e2f] bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#111] placeholder-[#888] outline-none transition-all focus:border-[#00c2cb] focus:shadow-[3px_3px_0_#ff2a85]"
                      />

                    </div>

                    {/* SUCCESS */}

                    {submitStatus === "success" && (
                        <motion.div
                            initial={{
                              opacity: 0,
                              y: -6,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            className="flex items-center gap-2 border-2 border-[#1e1e2f] bg-[#e2e8f0] p-3 font-mono text-xs font-bold text-[#166534] shadow-[3px_3px_0_#00c2cb]"
                        >
                          <CheckCircle2
                              size={16}
                              className="shrink-0"
                          />

                          <span>
                        TRANSMISSION SENT SUCCESSFULLY
                        // DISPATCH QUEUED
                      </span>
                        </motion.div>
                    )}

                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-[#1e1e2f] bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#7928ca] px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0_#00f0ff] transition-all hover:brightness-110 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-60"
                    >

                      {isSubmitting ? (
                          <>
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                            <span>
                          TRANSMITTING PACKETS...
                        </span>
                          </>
                      ) : (
                          <>
                            <Send size={15} />

                            <span>
                          [ TRANSMIT MESSAGE ]
                        </span>
                          </>
                      )}

                    </button>

                  </form>

                </div>

                {/* FOOTER */}

                <div className="px-3 py-2 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#475569] select-none shrink-0">

                <span className="text-[#00c2cb] font-bold tracking-wider">
                  ■ SYSTEM ONLINE
                </span>

                  <span className="tracking-wider">
                  HACK 6.0 // NIT HAMIRPUR
                </span>

                </div>

              </TiltCard>
            </motion.div>

            {/* ==============================================================
              RIGHT — CONTACT CARDS
          ============================================================== */}

            <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.15,
                }}
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

                      {/* ======================================================
                      TITLE BAR
                  ====================================================== */}

                      <div
                          style={{
                            background: `linear-gradient(to right, ${item.accentColor}, #fbcfe8 60%, #f4f4f6)`,
                          }}
                          className="px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none shrink-0"
                      >

                        <div className="flex items-center gap-2 truncate">

                      <span className="text-[10px] text-[#1e1e2f] leading-none">
                        ■
                      </span>

                          <span className="font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                        {item.exeName}
                      </span>

                        </div>

                        <div className="flex items-center gap-2">

                      <span className="text-[9px] font-mono font-bold text-[#1e1e2f] bg-white/70 px-1.5 py-0.5">
                        {item.badge}
                      </span>

                          <span
                              style={{
                                boxShadow: BEVEL_RAISED,
                              }}
                              className="w-4 h-4 bg-[#c9c9d4] text-[#1e1e2f] flex items-center justify-center text-[10px] font-bold"
                          >
                        ×
                      </span>

                        </div>

                      </div>

                      {/* ======================================================
                      CARD BODY
                  ====================================================== */}

                      <div
                          style={{
                            boxShadow: BEVEL_INSET,
                          }}
                          className="m-1.5 p-4 sm:p-5 flex items-start gap-4 flex-1 bg-[#f4f4f6]"
                      >

                        {/* ICON */}

                        <div
                            style={{
                              transform:
                                  "translateZ(45px)",
                              transformStyle:
                                  "preserve-3d",
                              boxShadow: `3px 3px 0px 0px ${item.accentColor}`,
                            }}
                            className="w-11 h-11 bg-[#f4f4f6] border-2 border-[#1e1e2f] flex items-center justify-center shrink-0 transition-transform duration-300"
                        >

                          <Icon
                              className="w-5 h-5"
                              style={{
                                color: item.accentColor,
                              }}
                          />

                        </div>

                        {/* CONTENT */}

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">

                            <h3 className="font-bold text-sm text-[#1e1e2f] uppercase tracking-wide">
                              {item.title}
                            </h3>

                          </div>

                          <p className="font-mono text-[10px] sm:text-xs text-[#64748b] mt-0.5 leading-tight">
                            {item.line1}
                          </p>

                          <a
                              href={item.href}
                              target={
                                item.id === "location"
                                    ? "_blank"
                                    : undefined
                              }
                              rel={
                                item.id === "location"
                                    ? "noopener noreferrer"
                                    : undefined
                              }
                              className="mt-2 inline-block font-mono text-xs sm:text-sm font-bold break-all transition-colors underline underline-offset-4"
                              style={{
                                color: item.accentColor,
                                textDecorationColor:
                                    item.id === "email"
                                        ? "#ff2a85"
                                        : "#00c2cb",
                              }}
                          >
                            {item.value}
                          </a>

                        </div>

                      </div>

                      {/* ======================================================
                      FOOTER METADATA
                  ====================================================== */}

                      <div className="px-3 py-1.5 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center justify-between text-[9px] sm:text-[10px] text-[#475569] select-none shrink-0">

                    <span className="tracking-wider truncate">
                      {item.port}
                    </span>

                        <span
                            className="font-bold tracking-wider shrink-0 pl-2"
                            style={{
                              color: item.accentColor,
                            }}
                        >
                      ■ {item.status}
                    </span>

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