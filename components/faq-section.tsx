"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
    src: "../public/fonts/Hacked-KerX.ttf",
    variable: "--custom-font",
});

const BEVEL_RAISED =
    "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.7)";

const BEVEL_INSET =
    "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.25)";

const faqs = [
    {
        question: "What exactly is Hack 6.0 - Obsidian Saga?",
        answer:
            "It is not just a hackathon—it is an epic fusion of creativity, caffeine, and code! Think of it as a 48-hour sprint where brilliant minds come together to solve real problems, build cool stuff, and maybe win some brag-worthy prizes.",
    },
    {
        question: "Who can participate?",
        answer:
            "Whether you're a coding ninja, a design wizard, or just someone with crazy ideas—everyone is welcome! Students, beginners, pros... if you have got the passion, you have got a spot here.",
    },
    {
        question: "How do I register?",
        answer:
            'Just click that big, shiny "Register Now" button on our website, fill in the details, and boom—you are in! Do not wait too long though; spots fill up fast!',
    },
    {
        question: "What if I do not have a team?",
        answer:
            "No worries! We have got a team formation session before the hackathon kicks off. So, you will find your crew and maybe your next best friends.",
    },
    {
        question: "Can I participate solo?",
        answer:
            "No, teams must have a minimum of 2 members (maximum 4). We will help you find teammates if needed!",
    },
    {
        question: "Is there a registration fee?",
        answer:
            "No, Hack 6.0 is completely free! Just register and you are in. There are no registration fees or hidden charges.",
    },
];

/* ========================================================================
   WIN9X WINDOW CONTROLS
   ======================================================================== */

function WindowControls({ open }: { open: boolean }) {
    return (
        <div className="flex items-center gap-1">

            <div
                style={{ boxShadow: BEVEL_RAISED }}
                className="flex h-[18px] w-[18px] items-center justify-center bg-[#c9c9d4] text-[9px] font-bold text-[#222]"
            >
                _
            </div>

            <div
                style={{ boxShadow: BEVEL_RAISED }}
                className="flex h-[18px] w-[18px] items-center justify-center bg-[#c9c9d4] text-[8px] font-bold text-[#222]"
            >
                □
            </div>

            <div
                style={{ boxShadow: BEVEL_RAISED }}
                className={`flex h-[18px] w-[18px] items-center justify-center text-[9px] font-bold text-black ${
                    open ? "bg-[#00ffff]" : "bg-[#ff8ed8]"
                }`}
            >
                ×
            </div>

        </div>
    );
}

/* ========================================================================
   PRIZE-STYLE 3D TILT CARD
   ======================================================================== */

function TiltCard({
                      children,
                      dropShadowColor,
                  }: {
    children: React.ReactNode;
    dropShadowColor: string;
}) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, {
        stiffness: 220,
        damping: 26,
        mass: 0.5,
    });

    const mouseY = useSpring(y, {
        stiffness: 220,
        damping: 26,
        mass: 0.5,
    });

    const rotateX = useTransform(
        mouseY,
        [-0.5, 0.5],
        ["5deg", "-5deg"],
    );

    const rotateY = useTransform(
        mouseX,
        [-0.5, 0.5],
        ["-5deg", "5deg"],
    );

    const shadowX = useTransform(
        mouseX,
        [-0.5, 0.5],
        [17, -17],
    );

    const shadowY = useTransform(
        mouseY,
        [-0.5, 0.5],
        [17, -17],
    );

    const boxShadow = useTransform(
        [shadowX, shadowY],
        ([sx, sy]) =>
            `${sx}px ${sy}px 0 ${dropShadowColor}, ${sx}px ${
                Number(sy) + 12
            }px 28px rgba(0,0,0,0.35)`,
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        setIsTouchDevice(
            window.matchMedia("(pointer: coarse)").matches ||
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0,
        );
    }, []);

    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement>,
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
    };

    return (
        <div className="w-full perspective-[1000px]">

            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: isTouchDevice ? 0 : rotateX,
                    rotateY: isTouchDevice ? 0 : rotateY,
                    transformPerspective: 1000,
                    transformStyle: "preserve-3d",
                    boxShadow: isTouchDevice
                        ? `6px 6px 0 ${dropShadowColor}`
                        : boxShadow,
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeOut",
                }}
                className="group relative w-full overflow-hidden border-2 border-[#292929] bg-[#eeeeee] will-change-transform"
            >
                {children}
            </motion.div>

        </div>
    );
}

/* ========================================================================
   FAQ WINDOW
   ======================================================================== */

function FaqWindow({
                       faq,
                       index,
                       open,
                       onClick,
                   }: {
    faq: (typeof faqs)[number];
    index: number;
    open: boolean;
    onClick: () => void;
}) {
    const accent =
        index % 2 === 0 ? "#00ffff" : "#ff1493";

    const titleGradient =
        index % 2 === 0
            ? "from-[#00ffff] via-[#c9ffff] to-[#eeeeee]"
            : "from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee]";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.04,
            }}
        >
            <TiltCard dropShadowColor={accent}>

                {/* ================================================================
            TITLE BAR
        ================================================================ */}

                <div
                    className={`flex min-h-9 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r ${titleGradient} px-2.5 py-1.5`}
                >

                    <div className="flex min-w-0 items-center gap-2">

                        <div
                            style={{
                                boxShadow: BEVEL_RAISED,
                            }}
                            className="relative flex h-5 w-5 shrink-0 items-center justify-center bg-[#f4f4f4]"
                        >
                            <div
                                className="h-2.5 w-3.5"
                                style={{
                                    backgroundColor:
                                        open ? "#00ffff" : "#8a2be2",
                                }}
                            />
                        </div>

                        <span className="truncate font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-[#222]">
              FAQ_{String(index + 1).padStart(2, "0")}.TXT
            </span>

                    </div>

                    <WindowControls open={open} />

                </div>

                {/* ================================================================
            QUESTION AREA
        ================================================================ */}

                <button
                    onClick={onClick}
                    className="flex w-full items-center gap-4 bg-[#f4f4f6] px-4 py-4 text-left transition-colors hover:bg-white md:px-5"
                >

                    <div
                        style={{
                            boxShadow: BEVEL_RAISED,
                        }}
                        className={`flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#292929] font-mono text-sm font-bold ${
                            open
                                ? "bg-[#8a2be2] text-white"
                                : "bg-[#eeeeee] text-[#8a2be2]"
                        }`}
                    >
                        {open ? "−" : "+"}
                    </div>

                    <div className="flex-1 min-w-0">

            <span className="block font-mono text-sm font-bold leading-relaxed text-[#292929] md:text-base">
              {faq.question}
            </span>

                        <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.12em] text-[#777]">
              {open
                  ? "DOCUMENT://OPEN"
                  : "DOCUMENT://DOUBLE_CLICK_TO_OPEN"}
            </span>

                    </div>

                    <span
                        className="hidden shrink-0 font-mono text-[9px] font-bold uppercase tracking-wider sm:block"
                        style={{
                            color: accent,
                        }}
                    >
            {String(index + 1).padStart(2, "0")}/06
          </span>

                </button>

                {/* ================================================================
            ANSWER
        ================================================================ */}

                <motion.div
                    initial={false}
                    animate={{
                        height: open ? "auto" : 0,
                        opacity: open ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                    }}
                    className="overflow-hidden"
                >

                    <div
                        style={{
                            boxShadow: BEVEL_INSET,
                        }}
                        className="mx-2 mb-2 bg-white px-4 py-4 md:px-5"
                    >

                        <div className="flex gap-3">

              <span
                  className="font-mono text-xs font-bold"
                  style={{
                      color: "#ff1493",
                  }}
              >
                &gt;
              </span>

                            <p className="font-mono text-xs leading-relaxed text-[#4a4a4a] md:text-sm">
                                {faq.answer}
                            </p>

                        </div>

                    </div>

                </motion.div>

                {/* ================================================================
            STATUS BAR
        ================================================================ */}

                <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#555]">

          <span>
            {open
                ? "DOCUMENT OPEN"
                : "DOUBLE_CLICK_TO_OPEN"}
          </span>

                    <span
                        className="font-bold"
                        style={{
                            color: accent === "#00ffff"
                                ? "#008b95"
                                : "#d41478",
                        }}
                    >
            {open ? "READING" : "READY"}
          </span>

                </div>

            </TiltCard>
        </motion.div>
    );
}

/* ========================================================================
   VAPORWAVE BACKGROUND
   ======================================================================== */

function VaporwaveBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <motion.div
                className="absolute left-1/2 top-[8%] h-[420px] w-[650px] -translate-x-1/2 rounded-full opacity-[0.055] blur-[100px]"
                style={{
                    background:
                        "linear-gradient(90deg, #8a2be2, #ff1493, #00ffff)",
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    x: ["-50%", "-48%", "-50%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* SUN */}

            <motion.div
                className="absolute right-[5%] top-[7%] hidden h-32 w-32 overflow-hidden rounded-full opacity-[0.18] md:block lg:right-[9%] lg:h-40 lg:w-40"
                animate={{
                    y: [0, -7, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >

                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, #ffb1ce 0%, #ff8ed8 45%, #8a2be2 100%)",
                    }}
                />

                <div className="absolute inset-x-0 bottom-0">

                    <div className="h-[2px] bg-[#333]/60" />
                    <div className="h-[7px]" />

                    <div className="h-[2px] bg-[#333]/60" />
                    <div className="h-[9px]" />

                    <div className="h-[2px] bg-[#333]/60" />
                    <div className="h-[11px]" />

                    <div className="h-[2px] bg-[#333]/60" />
                    <div className="h-[13px]" />

                    <div className="h-[2px] bg-[#333]/60" />

                </div>

            </motion.div>

            {/* SPHERE */}

            <motion.div
                className="absolute left-[2%] top-[26%] hidden h-28 w-28 opacity-[0.12] md:block"
                animate={{
                    rotate: [0, 8, 0, -8, 0],
                    y: [0, -8, 0],
                }}
                transition={{
                    duration: 17,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >

                <div className="absolute inset-0 rounded-full border border-[#00ffff]" />

                <div className="absolute inset-[15%] rounded-full border border-[#00ffff]" />

                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-[25deg] bg-[#00ffff]" />

                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 -rotate-[25deg] bg-[#00ffff]" />

                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#00ffff]" />

                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-[35deg] bg-[#8a2be2]" />

            </motion.div>

            {/* FLOATING ORB */}

            <motion.div
                className="absolute left-[6%] top-[58%] h-10 w-10 rounded-full opacity-[0.16] md:h-14 md:w-14"
                style={{
                    background:
                        "linear-gradient(145deg, #ff1493, #8a2be2 60%, #00ffff)",
                    boxShadow:
                        "0 0 35px rgba(255,20,147,0.25)",
                }}
                animate={{
                    x: [0, 12, 0, -8, 0],
                    y: [0, -15, 0, 9, 0],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute right-[6%] top-[56%] h-5 w-5 rounded-full border border-[#00ffff]/20"
                animate={{
                    x: [0, -10, 0],
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* GEOMETRIC FRAME */}

            <motion.div
                className="absolute right-[-20px] top-[30%] hidden h-52 w-40 rotate-[3deg] border border-[#00ffff]/10 md:block"
                animate={{
                    rotate: [3, 5, 3, 1, 3],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >

                <div className="absolute -left-7 top-10 h-28 w-28 border border-[#8a2be2]/10" />

                <div className="absolute -right-4 bottom-8 h-16 w-16 border border-[#ff1493]/10" />

            </motion.div>

            {/* GRID */}

            <motion.div
                className="absolute bottom-0 left-0 right-0 h-36 overflow-hidden opacity-[0.06]"
                animate={{
                    opacity: [0.045, 0.07, 0.045],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >

                <div
                    className="absolute -bottom-16 left-[-20%] h-64 w-[140%]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, #00ffff 1px, transparent 1px),
              linear-gradient(to bottom, #8a2be2 1px, transparent 1px)
            `,
                        backgroundSize: "46px 25px",
                        transform:
                            "perspective(180px) rotateX(58deg)",
                        transformOrigin: "bottom",
                    }}
                />

            </motion.div>

            <div className="absolute left-[2%] top-[44%] hidden rotate-90 font-mono text-[7px] uppercase tracking-[0.5em] text-[#00ffff]/15 lg:block">
                未来 // DIGITAL DREAM
            </div>

            <div className="absolute right-[1%] top-[67%] hidden -rotate-90 font-mono text-[7px] uppercase tracking-[0.45em] text-[#ff1493]/15 lg:block">
                SYSTEM // 1999
            </div>

            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent 0px, transparent 4px, rgba(255,255,255,0.8) 5px)",
                }}
            />

        </div>
    );
}

/* ========================================================================
   MAIN FAQ SECTION
   ======================================================================== */

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.08,
    });

    const container = {
        hidden: {
            opacity: 0,
        },

        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.15,
            },
        },
    };

    const item = {
        hidden: {
            opacity: 0,
            y: 20,
        },

        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            id="faq"
            className="relative overflow-hidden py-24"
        >

            <VaporwaveBackground />

            {/* ================================================================
          DECORATIVE DESKTOP WINDOWS
      ================================================================ */}

            <div className="pointer-events-none absolute left-[4%] top-[18%] hidden h-28 w-40 -rotate-3 border-2 border-[#555] bg-[#eeeeee] opacity-50 lg:block">

                <div className="h-6 border-b-2 border-[#555] bg-[#ff9edc]" />

                <div className="space-y-2 p-3">

                    <div className="h-2 w-3/4 bg-[#8a2be2]" />
                    <div className="h-2 w-1/2 bg-[#00ffff]" />
                    <div className="h-2 w-2/3 bg-[#ff4fd8]" />

                </div>

            </div>

            <div className="pointer-events-none absolute right-[4%] top-[40%] hidden h-32 w-44 rotate-3 border-2 border-[#555] bg-[#eeeeee] opacity-50 lg:block">

                <div className="h-6 border-b-2 border-[#555] bg-[#9cecff]" />

                <div className="grid grid-cols-5 gap-1 p-3">

                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-4 ${
                                i % 3 === 0
                                    ? "bg-[#ff1493]"
                                    : i % 3 === 1
                                        ? "bg-[#8a2be2]"
                                        : "bg-[#00ffff]"
                            }`}
                        />
                    ))}

                </div>

            </div>

            {/* ================================================================
          MAIN
      ================================================================ */}

            <motion.div
                ref={ref}
                className="container relative mx-auto px-5"
                variants={container}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >

                <motion.div
                    variants={item}
                    className="mx-auto max-w-5xl"
                >

                    {/* ============================================================
              APPLICATION SHELL
          ============================================================ */}

                    <div
                        className="relative border-2 border-[#333] bg-[#dedede]"
                        style={{
                            boxShadow:
                                "9px 9px 0 #8a2be2, -5px -5px 0 #00ffff",
                        }}
                    >

                        {/* TITLE BAR */}

                        <div className="flex h-10 items-center justify-between border-b-2 border-[#333] bg-gradient-to-r from-[#ff8ed8] via-[#ffc8ef] to-[#eeeeee] px-2">

                            <div className="flex items-center gap-2">

                                <div
                                    style={{
                                        boxShadow: BEVEL_RAISED,
                                    }}
                                    className="h-5 w-5 bg-[#ff4fd8]"
                                />

                                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#222]">
                  HELP_CENTER.EXE
                </span>

                            </div>

                            <WindowControls open={false} />

                        </div>

                        {/* MENU */}

                        <div className="flex flex-wrap gap-5 border-b-2 border-[#999] bg-[#eeeeee] px-4 py-2 font-mono text-[8px] uppercase text-[#444]">

              <span className="font-bold underline">
                FILE
              </span>

                            <span>EDIT</span>
                            <span>VIEW</span>
                            <span>SEARCH</span>
                            <span>HELP</span>

                            <span className="ml-auto text-[#8a2be2]">
                6 DOCUMENTS
              </span>

                        </div>

                        {/* ==========================================================
                HEADING
            ========================================================== */}

                        <div className="bg-[#eeeeee] px-5 pb-10 pt-10 text-center md:px-10">

                            <div
                                style={{
                                    boxShadow: "4px 4px 0 #ff1493",
                                }}
                                className="mx-auto mb-5 inline-flex items-center gap-2 border-2 border-[#333] bg-white px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#444]"
                            >

                                <span className="h-3 w-3 bg-[#00ffff]" />

                                USER_SUPPORT://FAQ

                            </div>

                            <h2
                                className={`text-4xl text-white drop-shadow-[3px_3px_0_#8a2be2] md:text-6xl ${Hacked_KerX.className}`}
                            >
                                Frequently{" "}
                                <span className="text-[#ff1493]">
                  Asked Questions
                </span>
                            </h2>

                            <div className="mx-auto mt-5 h-[3px] w-24 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-[#ff1493]" />

                            <p className="mx-auto mt-5 max-w-2xl font-mono text-xs text-[#555] md:text-sm">
                                Got questions? Open a document below to
                                find your answer.
                            </p>

                        </div>

                        {/* ==========================================================
                FAQ CARDS
            ========================================================== */}

                        <div className="bg-[#eeeeee] px-5 pb-10 md:px-10">

                            <div className="space-y-6">

                                {faqs.map((faq, index) => (
                                    <FaqWindow
                                        key={faq.question}
                                        faq={faq}
                                        index={index}
                                        open={openIndex === index}
                                        onClick={() =>
                                            setOpenIndex(
                                                openIndex === index
                                                    ? null
                                                    : index,
                                            )
                                        }
                                    />
                                ))}

                            </div>

                        </div>

                        {/* ==========================================================
                STATUS BAR
            ========================================================== */}

                        <div className="flex h-7 items-center justify-between border-t-2 border-[#333] bg-[#d5d5d5] px-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#444]">

              <span>
                HELP_CENTER.EXE
              </span>

                            <span>
                {openIndex === null
                    ? "READY"
                    : `DOCUMENT_${String(
                        openIndex + 1,
                    ).padStart(2, "0")}_OPEN`}
              </span>

                            <span className="hidden sm:block">
                HACK_6.0 // ONLINE
              </span>

                        </div>

                    </div>

                </motion.div>

                {/* ================================================================
            TRANSITION
        ================================================================ */}

                <div className="relative mt-24 h-24 overflow-hidden">

                    <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#4b0082]" />

                    <div className="absolute left-0 right-0 top-[calc(50%-7px)] h-[2px] bg-[#00ffff] opacity-80" />

                    <div className="absolute left-0 right-0 top-[calc(50%+7px)] h-[2px] bg-[#ff1493] opacity-80" />

                    <div
                        style={{
                            boxShadow: "4px 4px 0 #8a2be2",
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#333] bg-[#eeeeee] px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#333]"
                    >
                        NEXT_DIRECTORY://TEAM
                    </div>

                </div>

            </motion.div>

        </section>
    );
}