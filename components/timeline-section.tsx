"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
});

export default function TimelineSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const timelineEvents = [
    {
      file: "PHASE_01.EXE",
      date: "February 21, 2025",
      title: "Registration Opens",
      description: "Sign up and secure your spot for HACK 5.0",
      theme: "cyan", // Cyan or Pink accent
      icon: "⚡",
    },
    {
      file: "PHASE_02.EXE",
      date: "March 21, 2025",
      title: "Registration Closes",
      description: "Last day to register for the hackathon",
      theme: "pink",
      icon: "⏳",
    },
    {
      file: "PHASE_03.EXE",
      date: "March 22, 2025",
      title: "Screening Round",
      description: "Screening round for the Hack-5.0",
      theme: "cyan",
      icon: "🔍",
    },
    {
      file: "PHASE_04.EXE",
      date: "April 4, 2025",
      title: "Hackathon Kickoff",
      description: "Opening ceremony and hacking begins",
      theme: "pink",
      icon: "🚀",
    },
    {
      file: "PHASE_05.EXE",
      date: "April 4-5, 2025",
      title: "Hacking Period",
      description: "48 hours of coding, building, and innovation",
      theme: "cyan",
      icon: "💻",
    },
    {
      file: "PHASE_06.EXE",
      date: "April 5, 2025",
      title: "Project Submission",
      description: "Submit your projects for evaluation",
      theme: "pink",
      icon: "📦",
    },
    {
      file: "PHASE_07.EXE",
      date: "April 6, 2025",
      title: "Judging & Results",
      description: "Project evaluation and winner announcement",
      theme: "cyan",
      icon: "🏆",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
      <section id="timeline" className="py-20 relative font-mono select-none">
        <motion.div
            ref={ref}
            className="container mx-auto px-4"
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={item} className="text-center mb-16 flex flex-col items-center">
            <div className="relative mb-3 inline-block">
              <div className="absolute inset-0 bg-[#e11d88] translate-x-1 translate-y-1"></div>
              <div className="relative bg-white text-black px-4 py-1 text-xs md:text-sm font-bold tracking-widest border-2 border-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#9333ea] inline-block"></span>
                DIRECTORY_02 // TIMELINE
              </div>
            </div>

            <h2
                className={`text-4xl md:text-6xl tracking-wider uppercase font-black ${Hacked_KerX.className}`}
            >
              <span className="text-white drop-shadow-[2px_2px_0px_#00E5FF]">EVENT </span>
              <span className="text-[#FF2A85] drop-shadow-[2px_2px_0px_#00E5FF]">TIMELINE</span>
            </h2>
            <p className="text-gray-300 text-xs md:text-sm mt-3 tracking-widest">
              Execute schedule according to project timeline
            </p>
          </motion.div>

          {/* Timeline Center Line */}
          <div ref={containerRef} className="relative max-w-4xl mx-auto py-8">
            {/* Base Neon Track */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-black/40 transform md:-translate-x-1/2 border-l border-white/20" />

            {/* Animated Glowing Progress Line */}
            <motion.div
                className="absolute left-4 md:left-1/2 top-0 w-1 bg-[#00E5FF] origin-top z-10 transform md:-translate-x-1/2 shadow-[0_0_10px_#00E5FF]"
                style={{
                  height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                }}
            />

            {timelineEvents.map((event, index) => {
              const isCyan = event.theme === "cyan";
              const headerBg = isCyan ? "bg-[#00E5FF]" : "bg-[#FF6584]";
              const accentText = isCyan ? "text-[#00E5FF]" : "text-[#FF2A85]";
              const iconBoxBg = isCyan ? "bg-[#002b36] border-[#00E5FF]" : "bg-[#2d0015] border-[#FF2A85]";

              return (
                  <div key={index} className="relative mb-12 md:mb-16 last:mb-0">
                    {/* Center Node Diamond */}
                    <div
                        className={`absolute left-4 md:left-1/2 top-7 w-3.5 h-3.5 border-2 border-black transform -translate-x-[5px] md:-translate-x-1/2 rotate-45 z-20 ${
                            isCyan ? "bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" : "bg-[#FF2A85] shadow-[0_0_8px_#FF2A85]"
                        }`}
                    />

                    <div
                        className={`flex flex-col md:flex-row ${
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                    >
                      <div className="hidden md:block md:w-1/2"></div>
                      <div
                          className={`pl-10 md:pl-0 md:w-1/2 ${
                              index % 2 === 0 ? "md:pl-10" : "md:pr-10"
                          }`}
                      >
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30, y: 15 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative group"
                        >
                          {/* Hard Solid Offset Drop Shadow */}
                          <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 border border-black/50"></div>

                          {/* Main Retro Window Box */}
                          <div className="relative bg-[#F8F9FA] border-2 border-black">
                            {/* Titlebar Header */}
                            <div
                                className={`${headerBg} text-black px-3 py-1.5 flex items-center justify-between border-b-2 border-black font-mono font-bold text-xs tracking-wider`}
                            >
                              <span className="uppercase">{event.file}</span>

                              {/* Retro OS Controls */}
                              <div className="flex items-center gap-1.5">
                            <span className="w-3.5 h-3.5 border border-black bg-[#D9D9D9] flex items-center justify-center text-[10px] leading-none">
                              _
                            </span>
                                <span className="w-3.5 h-3.5 border border-black bg-[#D9D9D9] flex items-center justify-center text-[10px] leading-none">
                              □
                            </span>
                                <span className="w-3.5 h-3.5 border border-black bg-[#FF6584] text-black flex items-center justify-center text-[10px] leading-none">
                              ×
                            </span>
                              </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-4 md:p-5 flex items-start gap-4">
                              {/* Retro Graphic Icon Block */}
                              <div
                                  className={`w-11 h-11 shrink-0 border-2 ${iconBoxBg} flex items-center justify-center text-lg shadow-sm`}
                              >
                                {event.icon}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                                  <h3 className="text-base md:text-lg font-black text-black uppercase tracking-tight truncate">
                                    {event.title}
                                  </h3>
                                  <span className={`text-xs md:text-sm font-black ${accentText} tracking-wider whitespace-nowrap`}>
                                {event.date}
                              </span>
                                </div>

                                <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-sans font-medium">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </motion.div>
      </section>
  );
}