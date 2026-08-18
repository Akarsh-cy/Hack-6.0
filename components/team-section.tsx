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

const TeamCard = ({
                      member,
                      index,
                  }: {
    member: TeamMember;
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
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.04,
            }}
            whileHover={{ y: -7 }}
            onMouseEnter={handleMouseEnter}
            className="group relative"
        >
            {/* Cyan offset window */}
            <div className="pointer-events-none absolute -right-2 -bottom-2 left-2 top-2 border-2 border-[#00ffff]" />

            {/* Pink offset window */}
            <div className="pointer-events-none absolute -top-2 right-2 -bottom-1 left-[-5px] border-2 border-[#ff4fd8]" />

            {/* Main retro window */}
            <div
                className="relative overflow-hidden border-2 border-[#292929] bg-[#f2f2f2]"
                style={{
                    boxShadow:
                        "5px 5px 0 #8a2be2, -3px -3px 0 #ff4fd8",
                }}
            >
                {/* Classic title bar */}
                <div className="flex h-10 items-center justify-between border-b-2 border-[#292929] bg-[#e7e7e7] px-2">
                    <div className="flex items-center gap-2">
                        {/* Small retro icon */}
                        <div className="relative h-5 w-5 border border-[#555] bg-[#ff9edc]">
                            <div className="absolute left-[3px] top-[3px] h-2 w-3 bg-[#8a2be2]" />
                        </div>

                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#222]">
                            MEMBER_{String(index + 1).padStart(2, "0")}.EXE
                        </span>
                    </div>

                    {/* Classic window buttons */}
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

                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#d8d8d8]">
                    <img
                        src={member.image}
                        alt={member.name}
                        className={`relative z-10 h-full w-full object-cover transition-all duration-300 ${
                            glitching
                                ? "scale-[1.025] brightness-110 saturate-150"
                                : "brightness-[0.96] saturate-[0.95]"
                        }`}
                    />

                    {/* Cyan glitch ghost */}
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

                    {/* Pink glitch ghost */}
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

                    {/* Glitch bars */}
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
                                className="pointer-events-none absolute left-0 right-0 z-30 h-[2px] bg-[#ff1493]"
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
                        className="pointer-events-none absolute inset-0 z-40 opacity-[0.1]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 3px)",
                        }}
                    />

                    {/* Dither / old screen texture */}
                    <div
                        className="pointer-events-none absolute inset-0 z-40 opacity-[0.07]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, rgba(0,0,0,0.9) 0.6px, transparent 0.7px)",
                            backgroundSize: "4px 4px",
                        }}
                    />

                    {/* Slight vaporwave color wash */}
                    <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-br from-[#00ffff]/10 via-transparent to-[#ff4fd8]/20 mix-blend-screen" />

                    {/* Information panel */}
                    <div className="absolute bottom-0 left-0 right-0 z-50 border-t-2 border-[#292929] bg-[#eeeeee]/95 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 border border-[#333] bg-[#ff4fd8]" />

                            <h4 className="font-mono text-lg font-bold text-[#222] md:text-xl">
                                {member.name}
                            </h4>
                        </div>

                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-[#8a2be2] md:text-sm">
                            {member.role}
                        </p>
                    </div>
                </div>

                {/* Retro status bar */}
                <div className="flex h-7 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-2 font-mono text-[8px] uppercase tracking-[0.12em] text-[#333]">
                    <span className="flex items-center gap-1">
                        <span className="h-2 w-2 bg-[#00bfff]" />
                        SYSTEM ONLINE
                    </span>

                    <span>HACK 6.0</span>
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
            className="relative overflow-hidden py-24"
        >
            <div
                id="team-section"
                className="container relative mx-auto px-6"
            >
                {/* Header */}
                <motion.div className="mb-16 text-center">
                    <div className="mx-auto mb-6 inline-flex items-center gap-2 border-2 border-[#333] bg-[#eeeeee] px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#333] shadow-[5px_5px_0_#ff1493]">
                        <span className="h-3 w-3 border border-[#333] bg-[#8a2be2]" />
                        SYSTEM_DIRECTORY://TEAM
                    </div>

                    <h2
                        className={`mb-4 text-3xl text-[#ffffff] drop-shadow-[3px_3px_0_#8a2be2] md:text-5xl ${Hacked_KerX.className}`}
                    >
                        Lead{" "}
                        <span className="text-[#ff4fd8]">
                            Organizers
                        </span>
                    </h2>

                    <pi className="mx-auto max-w-2xl font-mono text-sm text-[#ffffff] md:text-base">
                        Meet the passionate individuals who made HACK 6.0
                        possible
                    </pi>
                </motion.div>

                {/* Team groups */}
                <div className="space-y-20">
                    {teamData.map((group, groupIndex) => (
                        <div key={group.title}>
                            {/* Group label */}
                            <div className="mb-8 flex items-center gap-4">
                                <div className="h-[2px] flex-1 bg-[#4b0082]" />

                                <div className="border-2 border-[#333] bg-[#eeeeee] px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#333] shadow-[4px_4px_0_#00ffff]">
                                    DIRECTORY_
                                    {String(groupIndex + 1).padStart(2, "0")}
                                </div>

                                <div className="h-[2px] flex-1 bg-[#4b0082]" />
                            </div>

                            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {group.members.map(
                                    (member, memberIndex) => (
                                        <TeamCard
                                            key={member.name}
                                            member={member}
                                            index={memberIndex}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}