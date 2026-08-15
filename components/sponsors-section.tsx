"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
});

interface Sponsor {
  name: string;
  logo: string;
}

interface SponsorTier {
  tier: string;
  sponsors: Sponsor[];
}

const sponsorTiers: SponsorTier[] = [
  {
    tier: "Gold Sponsor",
    sponsors: [
      {
        name: "Devfolio",
        logo:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Devfolio_Logo-White%402x-ZaNDeRtKGecstXyvSLZkQ3boQYnwqb.png",
      },
    ],
  },
  {
    tier: "Silver Sponsors",
    sponsors: [
      {
        name: "ETHIndia",
        logo:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ethindia-light-YeS3YkDSlazR7JfV8TEd4DdgNJjS7O.png",
      },
      {
        name: "GitHub",
        logo:
            "https://res.cloudinary.com/dnbf0uwku/image/upload/v1741427703/GitHub_Logo_White_jxcin2.png",
      },
    ],
  },
  {
    tier: "Bronze Sponsor",
    sponsors: [
      {
        name: "InterviewBuddy",
        logo:
            "https://res.cloudinary.com/dnbf0uwku/image/upload/v1741430548/colored-logo_1_hanfeh.png",
      },
    ],
  },
  {
    tier: "In-Kind Sponsor",
    sponsors: [
      {
        name: "Appwrite",
        logo:
            "https://res.cloudinary.com/dmiq1mtz7/image/upload/f_auto,q_auto/v1/CSEC/sajmu7cc4h2olyrwb14b",
      },
      {
        name: "Proto.io",
        logo:
            "https://res.cloudinary.com/dnbf0uwku/image/upload/v1742214136/colored-logo_5_yerfhu.png",
      },
      {
        name: "EaseMyTrip",
        logo:
            "https://res.cloudinary.com/dnbf0uwku/image/upload/v1742214348/White_xa7tsz.png",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Retro Window                                                               */
/* -------------------------------------------------------------------------- */

function WindowControls() {
  return (
      <div className="flex gap-[3px]">
        <div className="flex h-[17px] w-[17px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[9px] leading-none text-[#222]">
          _
        </div>

        <div className="flex h-[17px] w-[17px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[8px] leading-none text-[#222]">
          □
        </div>

        <div className="flex h-[17px] w-[17px] items-center justify-center border border-[#555] bg-[#ff8ed8] text-[9px] font-bold leading-none text-black">
          ×
        </div>
      </div>
  );
}

function WindowTitleBar({
                          title,
                          accent = "#8a2be2",
                        }: {
  title: string;
  accent?: string;
}) {
  return (
      <div
          className="flex h-8 items-center justify-between border-b-2 border-[#333] px-2"
          style={{
            background: `linear-gradient(90deg, ${accent}, #eeeeee 72%)`,
          }}
      >
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 border border-[#555] bg-[#ff9edc] shadow-[2px_2px_0_#00ffff]">
            <div className="ml-[3px] mt-[3px] h-[6px] w-[8px] bg-[#8a2be2]" />
          </div>

          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#222]">
          {title}
        </span>
        </div>

        <WindowControls />
      </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Vaporwave Decorations                                                      */
/* -------------------------------------------------------------------------- */

function VaporwaveDecor() {
  return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating gradient sphere */}
        <motion.div
            className="absolute right-[5%] top-[18%] h-12 w-12 rounded-full opacity-30 md:h-16 md:w-16"
            style={{
              background:
                  "linear-gradient(145deg, #ff1493 0%, #8a2be2 52%, #00ffff 100%)",
              boxShadow: "0 0 35px rgba(255,20,147,0.35)",
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
        />

        {/* Thin geometric frame */}
        <div className="absolute right-[-25px] top-[28%] h-40 w-28 rotate-2 border border-[#00ffff]/20">
          <div className="absolute -left-5 top-8 h-20 w-20 border border-[#ff1493]/20" />
        </div>

        {/* Small vaporwave text */}
        <span className="absolute left-[-8px] top-[34%] hidden -rotate-90 font-mono text-[7px] uppercase tracking-[0.35em] text-[#00ffff]/25 md:block">
        未来 // DIGITAL DREAM
      </span>

        {/* Very subtle scanlines */}
        <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.8) 4px)",
            }}
        />
      </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Logo Treatment                                                             */
/* -------------------------------------------------------------------------- */

function SponsorLogo({
                       sponsor,
                       large = false,
                     }: {
  sponsor: Sponsor;
  large?: boolean;
}) {
  return (
      <div
          className={`relative flex items-center justify-center overflow-hidden border-2 border-[#625675] bg-[#eeeeee] ${
              large ? "h-32 md:h-36" : "h-24 md:h-28"
          }`}
          style={{
            boxShadow:
                "inset 2px 2px 0 #ffffff, inset -2px -2px 0 #c5c5c5",
          }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#00ffff]/10 via-transparent to-[#ff4fd8]/10" />

        <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `
            linear-gradient(rgba(75,0,130,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75,0,130,0.25) 1px, transparent 1px)
          `,
              backgroundSize: "22px 22px",
            }}
        />

        <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.06]"
            style={{
              backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.7) 3px)",
            }}
        />

        <div
            className={`relative z-20 ${
                large ? "h-16 w-[50%] md:h-20" : "h-14 w-[55%] md:h-16"
            }`}
        >
          <Image
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              fill
              sizes="400px"
              className="object-contain drop-shadow-[2px_2px_0_#00ffff]"
          />
        </div>
      </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Gold Sponsor                                                               */
/* -------------------------------------------------------------------------- */

function GoldSponsor({ sponsor }: { sponsor: Sponsor }) {
  return (
      <motion.div
          whileHover={{
            y: -6,
            rotate: -0.5,
          }}
          transition={{ duration: 0.25 }}
          className="relative mx-auto w-full max-w-3xl"
      >
        <div className="pointer-events-none absolute -right-2 -bottom-2 left-2 top-2 border-2 border-[#00ffff]" />

        <div className="pointer-events-none absolute -top-2 right-2 -bottom-2 left-[-4px] border-2 border-[#ff1493]" />

        <div
            className="relative border-2 border-[#333] bg-[#eeeeee]"
            style={{
              boxShadow:
                  "7px 7px 0 #8a2be2, -4px -4px 0 rgba(255,79,216,0.9)",
            }}
        >
          <WindowTitleBar
              title="GOLD_SPONSOR.EXE"
              accent="#ff4fd8"
          />

          <div className="grid gap-0 md:grid-cols-[120px_1fr]">
            <div className="border-b-2 border-[#aaa] bg-[#e2e2e2] p-3 md:border-b-0 md:border-r-2">
              <div className="mb-3 font-mono text-[8px] font-bold uppercase text-[#444]">
                SPONSOR
              </div>

              <div className="space-y-2 font-mono text-[7px] text-[#555]">
                <div className="border border-[#999] bg-[#f8f8f8] px-2 py-1.5">
                  STATUS:
                  <span className="ml-1 text-[#008c95]">ACTIVE</span>
                </div>

                <div className="border border-[#999] bg-[#f8f8f8] px-2 py-1.5">
                  LEVEL:
                  <span className="ml-1 text-[#d00078]">GOLD</span>
                </div>

                <div className="border border-[#999] bg-[#f8f8f8] px-2 py-1.5">
                  HACK_5.0
                </div>
              </div>
            </div>

            <div className="p-3 md:p-4">
              <SponsorLogo sponsor={sponsor} large />

              <div className="mt-1.5 flex justify-between font-mono text-[7px] uppercase tracking-wider text-[#666]">
                <span>CONNECTED</span>
                <span>01 / 01</span>
              </div>
            </div>
          </div>

          <div className="flex h-5 items-center justify-between border-t-2 border-[#aaa] bg-[#d9d9d9] px-2 font-mono text-[7px] text-[#555]">
            <span>SPONSOR_DIRECTORY</span>
            <span>READY</span>
          </div>
        </div>
      </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Silver Sponsor                                                             */
/* -------------------------------------------------------------------------- */

function SilverSponsor({
                         sponsor,
                         index,
                       }: {
  sponsor: Sponsor;
  index: number;
}) {
  return (
      <motion.div
          whileHover={{
            y: -6,
            rotate: index === 0 ? -1 : 1,
          }}
          transition={{ duration: 0.25 }}
          className="relative w-full"
      >
        <div
            className={`pointer-events-none absolute inset-0 ${
                index === 0
                    ? "-translate-x-1.5 translate-y-1.5 border-2 border-[#00ffff]"
                    : "translate-x-1.5 translate-y-1.5 border-2 border-[#ff1493]"
            }`}
        />

        <div className="relative border-2 border-[#333] bg-[#eeeeee]">
          <WindowTitleBar
              title={`SILVER_${String(index + 1).padStart(2, "0")}.EXE`}
              accent={index === 0 ? "#00ffff" : "#ff4fd8"}
          />

          <div className="p-2.5">
            <SponsorLogo sponsor={sponsor} />

            <div className="mt-1.5 flex justify-between px-1 font-mono text-[7px] uppercase text-[#666]">
              <span>{sponsor.name}</span>
              <span className="text-[#008c95]">ONLINE</span>
            </div>
          </div>

          <div className="flex h-5 items-center border-t-2 border-[#aaa] bg-[#d9d9d9] px-2 font-mono text-[7px] text-[#555]">
            SPONSOR_LINK://CONNECTED
          </div>
        </div>
      </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Small Sponsor                                                              */
/* -------------------------------------------------------------------------- */

function SmallSponsor({
                        sponsor,
                        index,
                      }: {
  sponsor: Sponsor;
  index: number;
}) {
  const accents = ["#8a2be2", "#ff1493", "#00ffff"];

  return (
      <motion.div
          whileHover={{
            y: -5,
            rotate: index % 2 === 0 ? -1 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative"
      >
        <div
            className="pointer-events-none absolute inset-0 translate-x-1 translate-y-1 border-2"
            style={{
              borderColor: accents[index % accents.length],
            }}
        />

        <div className="relative border-2 border-[#333] bg-[#eeeeee]">
          <WindowTitleBar
              title={`APP_${String(index + 1).padStart(2, "0")}.EXE`}
              accent={accents[index % accents.length]}
          />

          <div className="p-1.5">
            <SponsorLogo sponsor={sponsor} />
          </div>

          <div className="border-t-2 border-[#aaa] bg-[#d9d9d9] px-2 py-1 font-mono text-[6px] uppercase text-[#555]">
            {sponsor.name} //{" "}
            <span className="text-[#008c95]">OK</span>
          </div>
        </div>
      </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Section                                                               */
/* -------------------------------------------------------------------------- */

export default function SponsorsSection() {
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
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: {
      y: 25,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const gold = sponsorTiers[0];
  const silver = sponsorTiers[1];
  const bronze = sponsorTiers[2];
  const inKind = sponsorTiers[3];

  return (
      <section
          id="sponsors"
          className="relative overflow-hidden py-16 md:py-20"
      >
        <VaporwaveDecor />

        <motion.div
            ref={ref}
            className="relative mx-auto w-full max-w-5xl px-4 md:px-6"
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
          {/* ---------------------------------------------------------------- */}
          {/* Directory heading                                                */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
              variants={item}
              className="relative mb-10 text-center"
          >
            <div className="mb-3 inline-block border-2 border-[#777] bg-[#eeeeee] px-3 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-[#444] shadow-[3px_3px_0_#00ffff]">
              SPONSOR DIRECTORY
            </div>

            <h2
                className={`text-3xl text-white drop-shadow-[3px_3px_0_#8a2be2] md:text-5xl ${Hacked_KerX.className}`}
            >
              Our{" "}
              <span className="text-[#ff1493]">
              Sponsors
            </span>
            </h2>

            <div className="mx-auto mt-4 h-[3px] w-24 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-[#ff1493]" />

            <p className="mx-auto mt-4 max-w-xl font-mono text-[10px] leading-relaxed text-white/75 md:text-xs">
              HACK 5.0 is made possible by the generous
              support of our sponsors.
            </p>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* Gold                                                             */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
              variants={item}
              className="mb-10"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] flex-1 bg-[#8a2be2]" />

              <span className="border-2 border-[#777] bg-[#eeeeee] px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#444] shadow-[3px_3px_0_#00ffff]">
              {gold.tier}
            </span>

              <div className="h-[2px] flex-1 bg-[#8a2be2]" />
            </div>

            <GoldSponsor sponsor={gold.sponsors[0]} />
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* Silver                                                           */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
              variants={item}
              className="mb-10"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] flex-1 bg-[#8a2be2]" />

              <span className="border-2 border-[#777] bg-[#eeeeee] px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#444] shadow-[3px_3px_0_#ff1493]">
              {silver.tier}
            </span>

              <div className="h-[2px] flex-1 bg-[#8a2be2]" />
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {silver.sponsors.map((sponsor, index) => (
                  <SilverSponsor
                      key={sponsor.name}
                      sponsor={sponsor}
                      index={index}
                  />
              ))}
            </div>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* Bronze + In Kind                                                 */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
              variants={item}
              className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[0.85fr_1.5fr]"
          >
            {/* Bronze */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-[2px] flex-1 bg-[#8a2be2]" />

                <span className="border border-[#777] bg-[#eeeeee] px-2.5 py-1.5 font-mono text-[7px] font-bold uppercase text-[#444]">
                {bronze.tier}
              </span>
              </div>

              <SilverSponsor
                  sponsor={bronze.sponsors[0]}
                  index={0}
              />
            </div>

            {/* In Kind */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-[2px] flex-1 bg-[#8a2be2]" />

                <span className="border border-[#777] bg-[#eeeeee] px-2.5 py-1.5 font-mono text-[7px] font-bold uppercase text-[#444]">
                {inKind.tier}
              </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {inKind.sponsors.map((sponsor, index) => (
                    <SmallSponsor
                        key={sponsor.name}
                        sponsor={sponsor}
                        index={index}
                    />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------------- */}
          {/* CTA                                                              */}
          {/* ---------------------------------------------------------------- */}

          <motion.div
              variants={item}
              className="mx-auto mt-14 max-w-2xl"
          >
            <div
                className="relative border-2 border-[#333] bg-[#eeeeee] p-5 text-center md:p-6"
                style={{
                  boxShadow:
                      "6px 6px 0 #ff1493, -4px -4px 0 #00ffff",
                }}
            >
              <WindowTitleBar
                  title="BECOME_A_SPONSOR.EXE"
                  accent="#00ffff"
              />

              <div className="py-6">
                <div className="mx-auto mb-4 h-10 w-10 border-2 border-[#777] bg-[#ff9edc] p-2 shadow-[3px_3px_0_#8a2be2]">
                  <div className="h-full w-full border-2 border-[#8a2be2] bg-[#00ffff]" />
                </div>

                <h3 className="mb-2 font-mono text-lg font-bold uppercase text-[#222] md:text-xl">
                  Interested in Sponsoring?
                </h3>

                <p className="mx-auto mb-5 max-w-lg font-mono text-[10px] leading-relaxed text-[#555] md:text-xs">
                  Join our growing list of sponsors and connect
                  with top talent and innovative projects.
                </p>

                <Button
                    className="border-2 border-[#333] bg-[#ff4fd8] px-6 font-mono text-[10px] font-bold uppercase text-[#211522] shadow-[4px_4px_0_#8a2be2] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#00ffff] hover:shadow-[6px_6px_0_#ff1493]"
                    onClick={() => {
                      const contactSection =
                          document.getElementById("contact");

                      if (contactSection) {
                        contactSection.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                >
                  Become a Sponsor
                </Button>
              </div>

              <div className="flex justify-between border-t-2 border-[#aaa] pt-2 font-mono text-[6px] uppercase text-[#666]">
                <span>READY</span>
                <span>CONTACT://AVAILABLE</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
  );
}