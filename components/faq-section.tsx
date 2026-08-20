"use client";

import { useState, useEffect } from "react";
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
                <div
                    className={`flex min-h-9 items-center justify-end border-b-2 border-[#292929] bg-gradient-to-r ${titleGradient} px-2.5 py-1.5`}
                >
                    <WindowControls open={open} />
                </div>

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
                    </div>
                </button>

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
            </TiltCard>
        </motion.div>
    );
}

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
                    <div className="mb-12 text-center">
                        <h2
                            className={`text-4xl text-white drop-shadow-[3px_3px_0_#8a2be2] md:text-6xl ${Hacked_KerX.className}`}
                        >
                            Frequently{" "}
                            <span className="text-[#ff1493]">
                                Asked Questions
                            </span>
                        </h2>

                        <div className="mx-auto mt-5 h-[3px] w-24 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-[#ff1493]" />

                        <p className="mx-auto mt-5 max-w-2xl font-mono text-xs text-[#ffffff] md:text-sm">
                            Got questions? Open a document below to find your answer.
                        </p>
                    </div>

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
                </motion.div>
            </motion.div>
        </section>
    );
}