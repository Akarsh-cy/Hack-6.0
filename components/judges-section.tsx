"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
    src: "../public/fonts/Hacked-KerX.ttf",
    variable: "--custom-font",
});

/* ============================================================================
   TYPES
   ============================================================================ */

interface Judge {
    name: string;
    role: string;
    image: string;
}

interface JudgeGroup {
    title: string;
    judges: Judge[];
}

/* ============================================================================
   JUDGE DATA
   ============================================================================ */

const judgeData: JudgeGroup[] = [
    {
        title: "Technical Judges",
        judges: [
            {
                name: "Judge Name",
                role: "Technical Judge",
                image: "/placeholder.svg",
            },
            {
                name: "Judge Name",
                role: "Technical Judge",
                image: "/placeholder.svg",
            },
            {
                name: "Judge Name",
                role: "Technical Judge",
                image: "/placeholder.svg",
            },
            {
                name: "Judge Name",
                role: "Technical Judge",
                image: "/placeholder.svg",
            },
        ],
    },
];

/* ============================================================================
   JUDGE CARD
   ============================================================================ */

const JudgeCard = ({
                       judge,
                       index,
                   }: {
    judge: Judge;
    index: number;
}) => {
    const [glitching, setGlitching] = useState(false);

    const handleMouseEnter = () => {
        setGlitching(true);

        setTimeout(() => {
            setGlitching(false);
        }, 500);
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 25,
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
                duration: 0.6,
                delay: index * 0.04,
            }}
            whileHover={{
                y: -7,
            }}
            onMouseEnter={handleMouseEnter}
            className="group relative"
        >
            {/* ================================================================
          CYAN OFFSET WINDOW
      ================================================================ */}
            <div className="pointer-events-none absolute -bottom-2 -right-2 left-2 top-2 border-2 border-[#00ffff]" />

            {/* ================================================================
          PINK OFFSET WINDOW
      ================================================================ */}
            <div className="pointer-events-none absolute -bottom-1 -left-[5px] -top-2 right-2 border-2 border-[#ff4fd8]" />

            {/* ================================================================
          MAIN RETRO WINDOW
      ================================================================ */}
            <div
                className="relative overflow-hidden border-2 border-[#292929] bg-[#f2f2f2]"
                style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 #ff4fd8",
                }}
            >
                {/* ============================================================
            TITLE BAR
        ============================================================ */}
                <div className="flex h-10 items-center justify-between border-b-2 border-[#292929] bg-[#e7e7e7] px-2">
                    <div className="flex items-center gap-2">
                        {/* Retro icon */}
                        <div className="relative h-5 w-5 border border-[#555] bg-[#ff9edc]">
                            <div className="absolute left-[3px] top-[3px] h-2 w-3 bg-[#8a2be2]" />
                        </div>

                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#222]">
              JUDGE_{String(index + 1).padStart(2, "0")}.EXE
            </span>
                    </div>

                    {/* Window controls */}
                    <div className="flex items-center gap-1">
                        <div className="flex h-5 w-5 items-center justify-center border border-[#555] bg-[#f8f8f8] text-[10px] text-black">
                            _
                        </div>
                        <div className="flex h-5 w-5 items-center justify-center border border-[#555] bg-[#f8f8f8] text-[9px] text-black">
                            □
                        </div>
                        <div className="flex h-5 w-5 items-center justify-center border border-[#555] bg-[#ff7bcf] text-[10px] font-bold text-black">
                            ×
                        </div>
                    </div>
                </div>

                {/* ============================================================
            PHOTO
        ============================================================ */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#d8d8d8]">
                    <img
                        src={judge.image}
                        alt={judge.name}
                        className={`relative z-10 h-full w-full object-cover transition-all duration-300 ${
                            glitching
                                ? "scale-[1.025] brightness-110 saturate-150"
                                : "brightness-[0.96] saturate-[0.95]"
                        }`}
                    />

                    {/* ========================================================
              CYAN GLITCH GHOST
          ======================================================== */}
                    <motion.img
                        src={judge.image}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover mix-blend-screen"
                        style={{
                            filter: "sepia(1) saturate(8) hue-rotate(135deg)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={
                            glitching
                                ? {
                                    opacity: [0, 0.65, 0, 0.4, 0],
                                    x: [0, -5, 4, -2, 0],
                                    clipPath: [
                                        "inset(0 0 100% 0)",
                                        "inset(12% 0 62% 0)",
                                        "inset(48% 0 35% 0)",
                                        "inset(73% 0 10% 0)",
                                        "inset(0 0 100% 0)",
                                    ],
                                }
                                : { opacity: 0 }
                        }
                        transition={{
                            duration: 0.5,
                            ease: "linear",
                        }}
                    />

                    {/* ========================================================
              PINK GLITCH GHOST
          ======================================================== */}
                    <motion.img
                        src={judge.image}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover mix-blend-screen"
                        style={{
                            filter: "sepia(1) saturate(8) hue-rotate(275deg)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={
                            glitching
                                ? {
                                    opacity: [0, 0.5, 0, 0.35, 0],
                                    x: [0, 5, -4, 3, 0],
                                    clipPath: [
                                        "inset(100% 0 0 0)",
                                        "inset(55% 0 18% 0)",
                                        "inset(20% 0 57% 0)",
                                        "inset(65% 0 25% 0)",
                                        "inset(100% 0 0 0)",
                                    ],
                                }
                                : { opacity: 0 }
                        }
                        transition={{
                            duration: 0.5,
                            ease: "linear",
                        }}
                    />

                    {/* ========================================================
              GLITCH BARS
          ======================================================== */}
                    {glitching && (
                        <>
                            <motion.div
                                className="pointer-events-none absolute left-0 right-0 z-30 h-[3px] bg-[#00ffff]"
                                initial={{
                                    top: "18%",
                                    opacity: 0,
                                }}
                                animate={{
                                    top: ["18%", "42%", "72%", "31%"],
                                    opacity: [0, 0.8, 0.5, 0],
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: "linear",
                                }}
                            />

                            <motion.div
                                className="pointer-events-none absolute left-0 right-0 z-30 h-[2px] bg-[#ff1493]"
                                initial={{
                                    top: "70%",
                                    opacity: 0,
                                }}
                                animate={{
                                    top: ["70%", "25%", "58%", "84%"],
                                    opacity: [0, 0.7, 0.4, 0],
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "linear",
                                }}
                            />
                        </>
                    )}

                    {/* ========================================================
              CRT SCANLINES
          ======================================================== */}
                    <div
                        className="pointer-events-none absolute inset-0 z-40 opacity-[0.1]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 3px)",
                        }}
                    />

                    {/* ========================================================
              DITHER TEXTURE
          ======================================================== */}
                    <div
                        className="pointer-events-none absolute inset-0 z-40 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, rgba(0,0,0,0.9) 0.6px, transparent 0.7px)",
                            backgroundSize: "4px 4px",
                        }}
                    />

                    {/* ========================================================
              VAPORWAVE COLOR WASH
          ======================================================== */}
                    <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-br from-[#00ffff]/10 via-transparent to-[#ff4fd8]/20 mix-blend-screen" />

                    {/* ========================================================
              INFORMATION PANEL
          ======================================================== */}
                    <div className="absolute bottom-0 left-0 right-0 z-50 border-t-2 border-[#292929] bg-[#eeeeee]/95 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 border border-[#333] bg-[#ff4fd8]" />

                            <h4 className="font-mono text-lg font-bold text-[#222] md:text-xl">
                                {judge.name}
                            </h4>
                        </div>

                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-[#8a2be2] md:text-sm">
                            {judge.role}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ============================================================================
   JUDGE SECTION
   ============================================================================ */

export default function JudgesSection() {
    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.8,
            }}
            // Added z-10 here to establish a safe stacking context
            className="relative z-10 overflow-hidden py-24"
        >
            <div id="judges-section" className="container relative mx-auto px-6">
                {/* ============================================================
            HEADER
        ============================================================ */}
                <motion.div className="mb-16 text-center">
                    <div className="mx-auto mb-6 inline-flex items-center gap-2 border-2 border-[#333] bg-[#eeeeee] px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#333] shadow-[5px_5px_0_#ff1493]">
                        <span className="h-3 w-3 border border-[#333] bg-[#8a2be2]" />
                        SYSTEM_DIRECTORY://JUDGES
                    </div>

                    <h2
                        className={`mb-4 text-3xl text-[#ffffff] drop-shadow-[3px_3px_0_#8a2be2] md:text-5xl ${Hacked_KerX.className}`}
                    >
                        Meet Our <span className="text-[#ff4fd8]">Judges</span>
                    </h2>

                    <p className="mx-auto max-w-2xl font-mono text-sm text-[#ffffff] md:text-base">
                        Meet the experts who will evaluate the ideas, execution, and innovation at HACK 6.0.
                    </p>
                </motion.div>

                {/* ============================================================
            JUDGE GROUPS
        ============================================================ */}
                <div className="space-y-20">
                    {judgeData.map((group, groupIndex) => (
                        <div key={group.title}>
                            {/* ====================================================
                  GROUP LABEL
              ==================================================== */}
                            <div className="mb-8 flex items-center gap-4">
                                <div className="h-[2px] flex-1 bg-[#4b0082]" />

                                <div className="border-2 border-[#333] bg-[#eeeeee] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#333] shadow-[4px_4px_0_#00ffff]">
                                    DIRECTORY_{String(groupIndex + 1).padStart(2, "0")}
                                </div>

                                <div className="h-[2px] flex-1 bg-[#4b0082]" />
                            </div>

                            {/* ====================================================
                  JUDGE GRID
              ==================================================== */}
                            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {group.judges.map((judge, judgeIndex) => (
                                    <JudgeCard
                                        key={judge.name}
                                        judge={judge}
                                        index={judgeIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
