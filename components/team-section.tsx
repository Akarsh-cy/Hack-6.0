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
                name: "Abhishika",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051535/IMG_20251223_153641_284_ivwq8b.jpg",
            },
            {
                name: "Anshu Kumari",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051544/anshu_ddqvhu.jpg",
            },
            {
                name: "Aryaman Chauhan",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051507/IMG-20260111-WA0184_bkqlzj.jpg",
            },
            {
                name: "Aryan",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051509/PFP_orcdec.jpg",
            },
            {
                name: "Ayushi",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051547/IMG_003529_0_Original_xmm6us.jpg",
            },
            {
                name: "Bhola Prasad Sah",
                role: "Executive",
                image: "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738088411/1738076772514_ql73vg.jpg",
            },
            {
                name: "Chetna Singh",
                role: "Executive",
                image: "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738134304/c823d071-af30-45a7-9182-a85015e0cb33_fn17g3.jpg",
            },
            {
                name: "Jatin",
                role: "Executive",
                image: "https://res.cloudinary.com/dkpnbush2/image/upload/v1771081952/WhatsApp_Image_2026-02-14_at_5.03.05_PM_zmsnhm.jpg",
            },
        ],
    },
    {
        title: "Group 2",
        members: [
            {
                name: "Khushvinder",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051540/IMG-20250606-WA0026_wdhj8i.jpg",
            },
            {
                name: "Lavish",
                role: "Executive",
                image: "https://res.cloudinary.com/dtrv7xbm5/image/upload/v1768491424/lavish_peoxgv.jpg",
            },
            {
                name: "Manoj Mohi",
                role: "Executive",
                image: "https://i.ibb.co/MyT4MBzB/My-photo.jpg",
            },
            {
                name: "Mohammad Asad",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770053013/1768897004233_ihwvo4.jpg",
            },
            {
                name: "Neerad Sood",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051986/20260124_141323_y7mnq7.jpg",
            },
            {
                name: "Raman Bansal",
                role: "Executive",
                image: "https://res.cloudinary.com/dkpnbush2/image/upload/v1771082448/DSC_3638.JPG_s7l02t.jpg",
            },
            {
                name: "Sameer Varshney",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051518/IMG_20240919_214713_277_Original_t9f7dp.jpg",
            },
            {
                name: "Sanket Singh Sameer",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051533/1000156654-01_ridyfs_f5n46n.jpg",
            },
        ],
    },
    {
        title: "Group 3",
        members: [
            {
                name: "Sourav Choudhary",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051556/IMG-20260120-WA0006_allwpg.jpg",
            },
            {
                name: "Sujal",
                role: "Executive",
                image: "https://res.cloudinary.com/dkpnbush2/image/upload/v1771082595/WhatsApp_Image_2026-02-14_at_8.52.00_PM_gpv3h8.jpg",
            },
            {
                name: "Sumit Kumar",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770051564/BeautyPlus_20251111031426182_save_yis9r7.jpg",
            },
            {
                name: "Utkarsh Shukla",
                role: "Executive",
                image: "https://res.cloudinary.com/dqftjf73g/image/upload/v1770052951/image_utkarsh_dh2ard.png",
            },
            {
                name: "Hridanshu",
                role: "Executive",
                image: "https://res.cloudinary.com/dfgnzhgko/image/upload/v1771672514/WhatsApp_Image_2026-02-21_at_4.44.29_PM_fo8odm.jpg",
            },
        ],
    },
];

/* CRT Screen Turn-on & Turn-off Keyframe Variants */
const crtBootVariants = {
    hidden: {
        scaleY: 0.005,
        scaleX: 0,
        opacity: 0,
        filter: "brightness(4) blur(4px)",
    },
    visible: (customIndex: number) => ({
        scaleY: [0.005, 0.005, 1, 1],
        scaleX: [0, 1, 1, 1],
        opacity: [0, 1, 1, 1],
        filter: [
            "brightness(4) blur(4px)",
            "brightness(3) blur(2px)",
            "brightness(1.5) blur(0.5px)",
            "brightness(1) blur(0px)",
        ],
        transition: {
            duration: 0.55,
            delay: customIndex * 0.08,
            times: [0, 0.25, 0.7, 1],
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

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
            custom={index}
            variants={crtBootVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -7 }}
            onMouseEnter={handleMouseEnter}
            /* Added w-[80%] and mx-auto to scale down the card smoothly by 20% */
            className="group relative z-0 origin-center w-[80%] mx-auto"
        >
            {/* Cyan offset window */}
            <div className="pointer-events-none absolute -right-2 -bottom-2 left-2 top-2 border-2 border-[#00ffff]" />

            {/* Pink offset window */}
            <div className="pointer-events-none absolute -top-2 right-2 -bottom-1 left-[-5px] border-2 border-[#ff4fd8]" />

            {/* Main retro window */}
            <div
                className="relative overflow-hidden border-2 border-[#292929] bg-[#f2f2f2]"
                style={{
                    boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 #ff4fd8",
                }}
            >
                {/* Classic title bar */}
                <div className="flex h-10 items-center justify-between border-b-2 border-[#292929] bg-[#e7e7e7] px-2">
                    <div className="flex items-center gap-2">
                        <div className="relative h-5 w-5 border border-[#555] bg-[#ff9edc]">
                            <div className="absolute left-[3px] top-[3px] h-2 w-3 bg-[#8a2be2]" />
                        </div>

                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#222]">
                            MEMBER_{String(index + 1).padStart(2, "0")}.EXE
                        </span>
                    </div>

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

                {/* Photo Area */}
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

                    {/* Pink glitch ghost */}
                    <motion.img
                        src={member.image}
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

                    {/* Glitch horizontal lines */}
                    {glitching && (
                        <>
                            <motion.div
                                className="pointer-events-none absolute left-0 right-0 z-20 h-[3px] bg-[#00ffff]"
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
                                className="pointer-events-none absolute left-0 right-0 z-20 h-[2px] bg-[#ff1493]"
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

                    {/* CRT Scanlines */}
                    <div
                        className="pointer-events-none absolute inset-0 z-20 opacity-[0.12]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.4) 3px)",
                        }}
                    />

                    {/* Dither Texture */}
                    <div
                        className="pointer-events-none absolute inset-0 z-20 opacity-[0.08]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, rgba(0,0,0,0.9) 0.6px, transparent 0.7px)",
                            backgroundSize: "4px 4px",
                        }}
                    />

                    {/* Vaporwave Tint Wash */}
                    <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-[#00ffff]/10 via-transparent to-[#ff4fd8]/20 mix-blend-screen" />

                    {/* Information Panel */}
                    <div className="absolute bottom-0 left-0 right-0 z-30 border-t-2 border-[#292929] bg-[#eeeeee]/95 px-4 py-3">
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

                    <p className="mx-auto max-w-2xl font-mono text-sm text-[#ffffff] md:text-base">
                        Meet the passionate individuals who made HACK 6.0
                        possible
                    </p>
                </motion.div>

                {/* Team Groups */}
                <div className="space-y-20">
                    {teamData.map((group, groupIndex) => (
                        <div key={group.title}>
                            {/* Group Label */}
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
