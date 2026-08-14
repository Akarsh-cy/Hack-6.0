"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
});

const faqs = [
  {
    question: "What exactly is Hack 5.0 - Obsidian Saga?",
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
        'Just click that big, shiny "Register Now" button on our website, fill in your details, and boom—you are in! Do not wait too long though; spots fill up fast!',
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
        "No, Hack 5.0 is completely free! Just register and you are in. There are no registration fees or hidden charges.",
  },
];

function WindowControls({ open }: { open: boolean }) {
  return (
      <div className="flex gap-[3px]">
        <div className="flex h-[18px] w-[18px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[9px] text-black">
          _
        </div>

        <div className="flex h-[18px] w-[18px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[8px] text-black">
          □
        </div>

        <div
            className={`flex h-[18px] w-[18px] items-center justify-center border border-[#555] text-[9px] font-bold text-black ${
                open ? "bg-[#00ffff]" : "bg-[#ff8ed8]"
            }`}
        >
          ×
        </div>
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
  return (
      <motion.div
          layout
          className="relative"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
      >
        {/* Offset color layer */}
        <div
            className={`pointer-events-none absolute inset-0 translate-x-[4px] translate-y-[4px] border-2 ${
                index % 2 === 0
                    ? "border-[#00ffff]"
                    : "border-[#ff1493]"
            }`}
        />

        {/* Window */}
        <div
            className={`relative overflow-hidden border-2 border-[#333] ${
                open ? "bg-[#e4e4e4]" : "bg-[#eeeeee]"
            }`}
        >
          {/* Window title bar */}
          <div
              className={`flex h-9 items-center justify-between border-b-2 border-[#333] px-2 ${
                  open
                      ? "bg-gradient-to-r from-[#00ffff] via-[#c9ffff] to-[#eeeeee]"
                      : "bg-gradient-to-r from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee]"
              }`}
          >
            <div className="flex min-w-0 items-center gap-2">
              {/* Window icon */}
              <div className="relative h-5 w-5 shrink-0 border border-[#555] bg-[#f4f4f4]">
                <div
                    className={`absolute left-[3px] top-[3px] h-2 w-3 ${
                        open ? "bg-[#00ffff]" : "bg-[#8a2be2]"
                    }`}
                />
              </div>

              <span className="truncate font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-[#222]">
              FAQ_{String(index + 1).padStart(2, "0")}.TXT
            </span>
            </div>

            <WindowControls open={open} />
          </div>

          {/* Question */}
          <button
              onClick={onClick}
              className="flex w-full items-center gap-3 px-4 py-4 text-left md:px-5"
          >
            <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center border border-[#555] font-mono text-[11px] font-bold ${
                    open
                        ? "bg-[#8a2be2] text-white"
                        : "bg-white text-[#8a2be2]"
                }`}
            >
              {open ? "−" : "+"}
            </div>

            <span className="font-mono text-sm font-bold text-[#292929] md:text-base">
            {faq.question}
          </span>
          </button>

          {/* Answer */}
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
            <div className="border-t-2 border-[#aaa] bg-white px-5 py-4 md:px-14">
              <div className="flex gap-3">
              <span className="font-mono text-xs font-bold text-[#ff1493]">
                &gt;
              </span>

                <p className="font-mono text-xs leading-relaxed text-[#4a4a4a] md:text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Status bar */}
          <div className="flex h-5 items-center justify-between border-t border-[#999] bg-[#d9d9d9] px-2 font-mono text-[7px] uppercase tracking-[0.1em] text-[#555]">
          <span>
            {open ? "DOCUMENT OPEN" : "DOUBLE_CLICK_TO_OPEN"}
          </span>

            <span>
            {String(index + 1).padStart(2, "0")}/06
          </span>
          </div>
        </div>
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
          className="relative overflow-hidden bg-[#efb5dc] py-24"
      >
        {/* ================================================================ */}
        {/* Background                                                       */}
        {/* ================================================================ */}

        <div className="pointer-events-none absolute inset-0">
          {/* Smooth continuation from sponsors */}
          <div
              className="absolute inset-0"
              style={{
                background:
                    "linear-gradient(180deg, #c59be8 0%, #efb5dc 42%, #d6a5ed 100%)",
              }}
          />

          {/* Grid */}
          <div
              className="absolute inset-0 opacity-[0.28]"
              style={{
                backgroundImage: `
              linear-gradient(
                rgba(75,0,130,0.55) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(75,0,130,0.55) 1px,
                transparent 1px
              )
            `,
                backgroundSize: "48px 48px",
              }}
          />

          {/* Cyan light */}
          <div
              className="absolute -left-40 top-[20%] h-[450px] w-[450px] rounded-full opacity-30"
              style={{
                background:
                    "radial-gradient(circle, #00ffff 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
          />

          {/* Pink light */}
          <div
              className="absolute -right-40 bottom-[10%] h-[500px] w-[500px] rounded-full opacity-30"
              style={{
                background:
                    "radial-gradient(circle, #ff4fd8 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
          />

          {/* Decorative desktop windows */}
          <div className="absolute left-[4%] top-[18%] hidden h-28 w-40 -rotate-3 border-2 border-[#555] bg-[#eeeeee] opacity-50 lg:block">
            <div className="h-6 border-b-2 border-[#555] bg-[#ff9edc]" />

            <div className="space-y-2 p-3">
              <div className="h-2 w-3/4 bg-[#8a2be2]" />
              <div className="h-2 w-1/2 bg-[#00ffff]" />
              <div className="h-2 w-2/3 bg-[#ff4fd8]" />
            </div>
          </div>

          <div className="absolute right-[4%] top-[40%] hidden h-32 w-44 rotate-3 border-2 border-[#555] bg-[#eeeeee] opacity-50 lg:block">
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
        </div>

        {/* ================================================================ */}
        {/* Content                                                          */}
        {/* ================================================================ */}

        <motion.div
            ref={ref}
            className="container relative mx-auto px-5"
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
          {/* Main FAQ application */}
          <motion.div variants={item} className="mx-auto max-w-5xl">
            <div
                className="relative border-2 border-[#333] bg-[#dedede]"
                style={{
                  boxShadow:
                      "9px 9px 0 #8a2be2, -5px -5px 0 #00ffff",
                }}
            >
              {/* Application title bar */}
              <div className="flex h-10 items-center justify-between border-b-2 border-[#333] bg-gradient-to-r from-[#ff8ed8] via-[#ffc8ef] to-[#eeeeee] px-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border border-[#555] bg-[#ff4fd8] shadow-[2px_2px_0_#00ffff]" />

                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#222]">
                  HELP_CENTER.EXE
                </span>
                </div>

                <WindowControls open={false} />
              </div>

              {/* Fake menu */}
              <div className="flex flex-wrap gap-5 border-b-2 border-[#999] bg-[#eeeeee] px-4 py-2 font-mono text-[8px] uppercase text-[#444]">
                <span className="font-bold underline">FILE</span>
                <span>EDIT</span>
                <span>VIEW</span>
                <span>SEARCH</span>
                <span>HELP</span>

                <span className="ml-auto text-[#8a2be2]">
                6 DOCUMENTS
              </span>
              </div>

              {/* Heading */}
              <div className="bg-[#eeeeee] px-5 pb-10 pt-10 text-center md:px-10">
                <div className="mx-auto mb-5 inline-flex items-center gap-2 border-2 border-[#333] bg-white px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#444] shadow-[4px_4px_0_#ff1493]">
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
                  Got questions? Open a document below to find your
                  answer.
                </p>
              </div>

              {/* FAQ documents */}
              <div className="bg-[#eeeeee] px-5 pb-8 md:px-10">
                <div className="space-y-5">
                  {faqs.map((faq, index) => (
                      <FaqWindow
                          key={faq.question}
                          faq={faq}
                          index={index}
                          open={openIndex === index}
                          onClick={() =>
                              setOpenIndex(
                                  openIndex === index ? null : index
                              )
                          }
                      />
                  ))}
                </div>
              </div>

              {/* Application status bar */}
              <div className="flex h-7 items-center justify-between border-t-2 border-[#333] bg-[#d5d5d5] px-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#444]">
                <span>HELP_CENTER.EXE</span>

                <span>
                {openIndex === null
                    ? "READY"
                    : `DOCUMENT_${String(openIndex + 1).padStart(2, "0")}_OPEN`}
              </span>

                <span className="hidden sm:block">
                HACK_5.0 // ONLINE
              </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ================================================================ */}
        {/* Transition into Organizers                                        */}
        {/* ================================================================ */}

        <div className="relative mt-24 h-24 overflow-hidden">
          {/* horizontal desktop divider */}
          <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#4b0082]" />

          {/* cyan/pink offset lines */}
          <div className="absolute left-0 right-0 top-[calc(50%-7px)] h-[2px] bg-[#00ffff] opacity-80" />

          <div className="absolute left-0 right-0 top-[calc(50%+7px)] h-[2px] bg-[#ff1493] opacity-80" />

          {/* Center application label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#333] bg-[#eeeeee] px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#333] shadow-[4px_4px_0_#8a2be2]">
            NEXT_DIRECTORY://TEAM
          </div>
        </div>
      </section>
  );
}