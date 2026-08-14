// theme 1

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
    src: "../public/fonts/Hacked-KerX.ttf",
    variable: "--custom-font",
});

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

interface TeamGroup {
    title: string;
    members: TeamMember[];
}

const teamData: TeamGroup[] = [
    {
        title: "Group 1",
        members: [
            {
                name: "Prince Jaiswal",
                role: "Student Coordinator",
                image:
                    "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945441/IMG_20230720_192947_flr5wg.jpg",
            },
            {
                name: "Ankush Thakur",
                role: "Lead Organizer",
                image:
                    "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080439/IMG_20240720_122823_ikkncj.jpg",
            },
            {
                name: "Harshal Sakhare",
                role: "Lead Organizer",
                image:
                    "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738079965/Harshal_1_ljrjiy.jpg",
            },
            {
                name: "Aditya Kumar",
                role: "Treasurer",
                image:
                    "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080338/IMG_0237_beywm0.jpg",
            },
            {
                name: "Arnav Gupta",
                role: "Treasurer",
                image:
                    "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080697/e6a54564-6a33-48e1-ac19-e847758fd349_hqfhh8.jpg",
            },
            {
                name: "Antriksh Katna",
                role: "Marketing Head & External Affairs",
                image:
                    "https://res.cloudinary.com/dnbf0uwku/image/upload/v1741529798/-ktgck2_dhyxpv.jpg",
            },
            {
                name: "Tanamy Sharma",
                role: "Marketing Head & External Affairs",
                image:
                    "https://res.cloudinary.com/dnif0edly/image/upload/v1728535568/IMG-20240307-WA0033_mfojpp.jpg",
            },
            {
                name: "Tanishq Chauhan",
                role: "Internal Affairs",
                image:
                    "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945307/IMG_20231001_124926_evwtzl.jpg",
            },
            {
                name: "Tanishq Verma",
                role: "Internal Affairs",
                image:
                    "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945246/IMG_20240414_053937_668_nbxfaq.jpg",
            },
        ],
    },
    {
        title: "Group 2",
        members: [
            {
                name: "Avinash Sharma",
                role: "Web Lead",
                image:
                    "https://res.cloudinary.com/dnbf0uwku/image/upload/v1739191084/AVIN_exe_uu0yqx_k2wamg.webp",
            },
            {
                name: "Kirti Sharma",
                role: "Web Lead",
                image:
                    "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080065/IMG-20241110-WA0018_1_anaulw.jpg",
            },
            {
                name: "Shryansh",
                role: "Web Lead",
                image:
                    "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738136152/csec_shry_kwh5tn.jpg",
            },
            {
                name: "Arshita Kangoo",
                role: "Public Relations",
                image:
                    "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945377/IMG_20240920_223145_tc4rbp.jpg",
            },
            {
                name: "Krishna Narzary",
                role: "Media & Promotions",
                image:
                    "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1728579687/krishna_zp05q6.jpg",
            },
            {
                name: "Akash Kanwar",
                role: "Discipline Head",
                image:
                    "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1739960542/akash_bqdy3d.jpg",
            },
            {
                name: "Himanshu Gupta",
                role: "Technical Lead",
                image:
                    "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1739194635/WhatsApp_Image_2025-02-10_at_18.19.54_eddb4d72_dah6jq.jpg",
            },
            {
                name: "Lakshay Kantiwal",
                role: "Discipline Head",
                image:
                    "https://res.cloudinary.com/dnbf0uwku/image/upload/v1741533922/DSC_0568_diq1x9.jpg",
            },
        ],
    },
];

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
    const [glitching, setGlitching] = useState(false);

    const handleMouseEnter = () => {
        setGlitching(true);

        setTimeout(() => {
            setGlitching(false);
        }, 500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.04,
            }}
            whileHover={{ y: -6 }}
            onMouseEnter={handleMouseEnter}
            className="group relative"
        >
            {/* Vaporwave window */}
            <div className="relative">
                {/* Cyan offset border */}
                <div className="pointer-events-none absolute -right-1 -bottom-1 left-1 top-1 border border-[#00ffff]" />

                {/* Pink offset border */}
                <div className="pointer-events-none absolute -top-1 right-1 -bottom-1 left-[-4px] border border-[#ff1493]" />

                {/* Main window */}
                <div
                    className="relative overflow-hidden border-2 border-[#8a2be2] bg-[#0b0612]"
                    style={{
                        boxShadow:
                            "6px 6px 0 #4b0082, -3px -3px 0 rgba(0,255,255,0.7)",
                    }}
                >
                    {/* Retro title bar */}
                    <div className="relative flex h-9 items-center justify-between border-b-2 border-[#8a2be2] bg-gradient-to-r from-[#4b0082] via-[#8a2be2] to-[#ff1493] px-2">
                        <div className="flex items-center gap-2">
                            {/* Fake application icon */}
                            <div className="h-4 w-4 border border-white bg-[#ff4fd8] shadow-[2px_2px_0_#00ffff]" />

                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                                member_{String(index + 1).padStart(2, "0")}.exe
                            </span>
                        </div>

                        {/* Fake window controls */}
                        <div className="flex items-center gap-1">
                            <div className="flex h-4 w-4 items-center justify-center border border-white/80 bg-[#8a2be2] text-[9px] text-white">
                                _
                            </div>
                            <div className="flex h-4 w-4 items-center justify-center border border-white/80 bg-[#8a2be2] text-[8px] text-white">
                                □
                            </div>
                            <div className="flex h-4 w-4 items-center justify-center border border-white/80 bg-[#ff1493] text-[8px] text-white">
                                ×
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#09040f]">
                        <img
                            src={member.image}
                            alt={member.name}
                            className={`relative z-10 h-full w-full object-cover brightness-[0.86] saturate-[0.82] contrast-[1.05] transition-all duration-300 ${
                                glitching
                                    ? "scale-[1.025] brightness-110 saturate-150"
                                    : "scale-100"
                            }`}
                        />

                        {/* Cyan RGB ghost */}
                        <motion.img
                            src={member.image}
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover mix-blend-screen"
                            style={{
                                filter:
                                    "sepia(1) saturate(8) hue-rotate(135deg)",
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

                        {/* Pink RGB ghost */}
                        <motion.img
                            src={member.image}
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover mix-blend-screen"
                            style={{
                                filter:
                                    "sepia(1) saturate(8) hue-rotate(275deg)",
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

                        {/* Glitch scan bars */}
                        {glitching && (
                            <>
                                <motion.div
                                    className="pointer-events-none absolute left-0 right-0 z-30 h-[3px] bg-[#00ffff]"
                                    initial={{ top: "18%", opacity: 0 }}
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
                                    className="pointer-events-none absolute left-0 right-0 z-30 h-[2px] bg-[#ff4fd8]"
                                    initial={{ top: "70%", opacity: 0 }}
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

                        {/* CRT scanlines */}
                        <div
                            className="pointer-events-none absolute inset-0 z-40 opacity-[0.12]"
                            style={{
                                backgroundImage:
                                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(255,255,255,0.22) 3px)",
                            }}
                        />

                        {/* Pixel / dither texture */}
                        <div
                            className="pointer-events-none absolute inset-0 z-40 opacity-[0.08] mix-blend-screen"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, #ffffff 0.7px, transparent 0.8px)",
                                backgroundSize: "4px 4px",
                            }}
                        />

                        {/* Color wash */}
                        <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-br from-[#00ffff]/10 via-transparent to-[#ff1493]/20 mix-blend-screen" />

                        {/* Bottom dark gradient */}
                        <div className="pointer-events-none absolute inset-0 z-50 bg-gradient-to-t from-[#09040f] via-[#09040f]/20 to-transparent" />

                        {/* Information panel */}
                        <div className="absolute bottom-0 left-0 right-0 z-[60] border-t border-[#8a2be2]/70 bg-[#09040f]/85 px-4 py-4 backdrop-blur-[2px]">
                            <div className="mb-1 flex items-center gap-2">
                                <span className="h-2 w-2 bg-[#00ffff] shadow-[0_0_6px_#00ffff]" />

                                <h4 className="font-mono text-lg font-bold uppercase tracking-tight text-white md:text-xl">
                                    {member.name}
                                </h4>
                            </div>

                            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#00ffff] md:text-sm">
                                {member.role}
                            </p>
                        </div>
                    </div>

                    {/* Bottom status bar */}
                    <div className="flex h-6 items-center justify-between border-t border-[#8a2be2] bg-[#10071c] px-2 font-mono text-[8px] uppercase tracking-[0.15em] text-[#ff4fd8]">
                        <span>SYS://ONLINE</span>
                        <span>HACK_5.0</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function TeamSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-[#09040f] py-24"
        >
            {/* Vaporwave grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.13]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(138,43,226,0.65) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,255,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Perspective horizon glow */}
            <div
                className="pointer-events-none absolute left-1/2 top-[38%] h-[420px] w-[900px] -translate-x-1/2 opacity-30"
                style={{
                    background:
                        "radial-gradient(ellipse, #ff1493 0%, #8a2be2 30%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Cyan glow */}
            <div
                className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] opacity-20"
                style={{
                    background:
                        "radial-gradient(circle, #00ffff 0%, transparent 70%)",
                    filter: "blur(70px)",
                }}
            />

            <div
                id="team-section"
                className="container relative mx-auto px-6"
            >
                {/* Section heading */}
                <motion.div className="mb-16 text-center">
                    <div className="mx-auto mb-5 inline-flex items-center gap-2 border border-[#00ffff] bg-[#0b0612] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#00ffff] shadow-[4px_4px_0_#ff1493]">
                        <span className="h-2 w-2 bg-[#ff1493]" />
                        SYSTEM_DIRECTORY://TEAM
                    </div>

                    <h2
                        className={`mb-4 text-3xl text-white md:text-5xl ${Hacked_KerX.className}`}
                    >
                        Lead{" "}
                        <span className="text-[#ff4fd8]">
                            Organizers
                        </span>
                    </h2>

                    <p className="mx-auto max-w-2xl font-mono text-sm text-gray-300 md:text-base">
                        Meet the passionate individuals who made HACK 5.0
                        possible
                    </p>
                </motion.div>

                {/* Team groups */}
                <div className="space-y-16">
                    {teamData.map((group, groupIndex) => (
                        <div key={group.title}>
                            {/* Group header */}
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#8a2be2] to-[#00ffff]" />

                                <div className="border border-[#ff1493] bg-[#0b0612] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#ff4fd8]">
                                    DIRECTORY_{String(
                                    groupIndex + 1
                                ).padStart(2, "0")}
                                </div>

                                <div className="h-[2px] flex-1 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-transparent" />
                            </div>

                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {group.members.map((member, memberIndex) => (
                                    <TeamCard
                                        key={member.name}
                                        member={member}
                                        index={memberIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}