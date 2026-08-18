"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import localFont from "next/font/local";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
});

/* ============================================================================
   TYPES
   ============================================================================ */

interface Sponsor {
  name: string;
  logo: string;
}

interface SponsorTier {
  tier: string;
  sponsors: Sponsor[];
}

/* ============================================================================
   SPONSOR DATA
   ============================================================================ */

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

/* ============================================================================
   BEVELS
   ============================================================================ */

const BEVEL_RAISED =
    "inset -1px -1px 0 rgba(0,0,0,0.35), inset 1px 1px 0 rgba(255,255,255,0.8)";

const BEVEL_INSET =
    "inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.25)";

/* ============================================================================
   WINDOW CONTROLS
   ============================================================================ */

function WindowControls() {
  return (
      <div className="flex items-center gap-1">
        <div
            style={{ boxShadow: BEVEL_RAISED }}
            className="flex h-[17px] w-[17px] items-center justify-center bg-[#c9c9d4] text-[9px] font-bold text-[#222]"
        >
          _
        </div>

        <div
            style={{ boxShadow: BEVEL_RAISED }}
            className="flex h-[17px] w-[17px] items-center justify-center bg-[#c9c9d4] text-[8px] font-bold text-[#222]"
        >
          □
        </div>

        <div
            style={{ boxShadow: BEVEL_RAISED }}
            className="flex h-[17px] w-[17px] items-center justify-center bg-[#ff8ed8] text-[9px] font-bold text-black"
        >
          ×
        </div>
      </div>
  );
}

/* ============================================================================
   PRIZE-STYLE TILT CARD
   ============================================================================ */

function TiltCard({
                    children,
                    shadow,
                  }: {
  children: React.ReactNode;
  shadow: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 220,
    damping: 25,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 220,
    damping: 25,
    mass: 0.5,
  });

  const rotateX = useTransform(
      springY,
      [-0.5, 0.5],
      ["5deg", "-5deg"],
  );

  const rotateY = useTransform(
      springX,
      [-0.5, 0.5],
      ["-5deg", "5deg"],
  );

  function handleMouseMove(
      e: React.MouseEvent<HTMLDivElement>,
  ) {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX =
        (e.clientX - rect.left) / rect.width - 0.5;

    const mouseY =
        (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
      <div className="w-full perspective-[1000px]">
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
              boxShadow: `7px 7px 0 ${shadow}`,
            }}
            className="relative w-full overflow-hidden border-2 border-[#292929] bg-[#eeeeee] will-change-transform"
        >
          {children}
        </motion.div>
      </div>
  );
}

/* ============================================================================
   WINDOW TITLE BAR
   ============================================================================ */

function WindowTitleBar({
                          title,
                          accent,
                        }: {
  title: string;
  accent: string;
}) {
  return (
      <div
          className="flex h-9 items-center justify-between border-b-2 border-[#292929] px-2.5"
          style={{
            background: `linear-gradient(
          90deg,
          ${accent} 0%,
          ${accent} 28%,
          #ffc5ee 65%,
          #eeeeee 100%
        )`,
          }}
      >
        <div className="flex items-center gap-2">
          <div
              style={{
                boxShadow: BEVEL_RAISED,
              }}
              className="flex h-5 w-5 items-center justify-center bg-[#eeeeee]"
          >
            <div
                className="h-2.5 w-3.5"
                style={{
                  backgroundColor: accent,
                }}
            />
          </div>

          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
          {title}
        </span>
        </div>

        <WindowControls />
      </div>
  );
}

/* ============================================================================
   VAPORWAVE BACKGROUND
   ============================================================================ */

function VaporwaveDecor() {
  return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
            className="absolute left-1/2 top-[5%] h-[420px] w-[650px] -translate-x-1/2 rounded-full opacity-[0.055] blur-[100px]"
            style={{
              background:
                  "linear-gradient(90deg, #8a2be2, #ff1493, #00ffff)",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
        />

        <motion.div
            className="absolute right-[5%] top-[17%] h-12 w-12 rounded-full opacity-30 md:h-16 md:w-16"
            style={{
              background:
                  "linear-gradient(145deg, #ff1493, #8a2be2 52%, #00ffff)",
              boxShadow:
                  "0 0 35px rgba(255,20,147,0.35)",
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

        <div className="absolute right-[-25px] top-[28%] h-40 w-28 rotate-2 border border-[#00ffff]/20">
          <div className="absolute -left-5 top-8 h-20 w-20 border border-[#ff1493]/20" />
        </div>

        <span className="absolute left-[-8px] top-[34%] hidden -rotate-90 font-mono text-[7px] uppercase tracking-[0.35em] text-[#00ffff]/25 md:block">
        未来 // DIGITAL DREAM
      </span>

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

/* ============================================================================
   SPONSOR LOGO
   ============================================================================ */

function SponsorLogo({
                       sponsor,
                       large = false,
                     }: {
  sponsor: Sponsor;
  large?: boolean;
}) {
  return (
      <div
          style={{
            boxShadow: BEVEL_INSET,
          }}
          className={`relative flex items-center justify-center overflow-hidden border-2 border-[#292929] bg-[#f4f4f4] ${
              large
                  ? "h-32 md:h-36"
                  : "h-24 md:h-28"
          }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#00ffff]/10 via-transparent to-[#ff1493]/10" />

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
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.7) 3px)",
            }}
        />

        <div
            className={`relative z-10 ${
                large
                    ? "h-16 w-[55%] md:h-20"
                    : "h-14 w-[60%] md:h-16"
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

/* ============================================================================
   SPONSOR CARD
   ============================================================================ */

function SponsorCard({
                       sponsor,
                       index,
                       tier,
                       large = false,
                     }: {
  sponsor: Sponsor;
  index: number;
  tier: "gold" | "silver" | "bronze" | "inkind";
  large?: boolean;
}) {
  const accents = {
    gold: "#ff1493",
    silver: index % 2 === 0 ? "#00ffff" : "#ff1493",
    bronze: "#8a2be2",
    inkind: ["#8a2be2", "#ff1493", "#00ffff"],
  };

  const accent =
      tier === "inkind"
          ? accents.inkind[index % 3]
          : accents[tier];

  const filename =
      tier === "gold"
          ? "GOLD_SPONSOR.EXE"
          : tier === "silver"
              ? `SILVER_${String(index + 1).padStart(2, "0")}.EXE`
              : tier === "bronze"
                  ? "BRONZE_SPONSOR.EXE"
                  : `IN_KIND_${String(index + 1).padStart(2, "0")}.EXE`;

  return (
      <TiltCard shadow={accent}>
        <WindowTitleBar
            title={filename}
            accent={accent}
        />

        <div className={large ? "p-3 md:p-4" : "p-2.5"}>
          <SponsorLogo
              sponsor={sponsor}
              large={large}
          />

          <div className="mt-2 flex items-center justify-between gap-2">
          <span className="truncate font-mono text-[8px] font-bold uppercase tracking-wider text-[#292929]">
            {sponsor.name}
          </span>

            <span
                className="shrink-0 font-mono text-[7px] font-bold uppercase"
                style={{ color: accent }}
            >
            ONLINE
          </span>
          </div>
        </div>

        <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#d9d9d9] px-2.5 font-mono text-[7px] uppercase tracking-[0.08em] text-[#555]">
        <span>
          SPONSOR://CONNECTED
        </span>

          <span style={{ color: accent }}>
          READY
        </span>
        </div>
      </TiltCard>
  );
}

/* ============================================================================
   TIER LABEL
   ============================================================================ */

function TierLabel({
                     children,
                     accent,
                   }: {
  children: React.ReactNode;
  accent: string;
}) {
  return (
      <div className="mb-5 flex items-center gap-3">
        <div
            className="h-[2px] flex-1"
            style={{
              backgroundColor: accent,
            }}
        />

        <div
            style={{
              boxShadow: `3px 3px 0 ${accent}`,
            }}
            className="border-2 border-[#555] bg-[#eeeeee] px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-[#444]"
        >
          {children}
        </div>

        <div
            className="h-[2px] flex-1"
            style={{
              backgroundColor: accent,
            }}
        />
      </div>
  );
}

/* ============================================================================
   MAIN SPONSOR SECTION
   ============================================================================ */

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
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
        duration: 0.65,
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
          {/* ==================================================================
            HEADER
        ================================================================== */}

          <motion.div
              variants={item}
              className="relative mb-12 text-center"
          >
            <div
                style={{
                  boxShadow: "3px 3px 0 #00ffff",
                }}
                className="mb-4 inline-block border-2 border-[#555] bg-[#eeeeee] px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#444]"
            >
              SPONSOR DIRECTORY
            </div>

            <h2
                className={`text-4xl text-white drop-shadow-[3px_3px_0_#8a2be2] md:text-6xl ${Hacked_KerX.className}`}
            >
              Our{" "}
              <span className="text-[#ff1493]">
              Sponsors
            </span>
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-24 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-[#ff1493]" />

            <p className="mx-auto mt-5 max-w-xl font-mono text-[10px] leading-relaxed text-white/75 md:text-xs">
              HACK 6.0 is made possible by the generous
              support of our sponsors.
            </p>
          </motion.div>

          {/* ==================================================================
            GOLD
        ================================================================== */}

          <motion.div
              variants={item}
              className="mb-12"
          >
            <TierLabel accent="#ff1493">
              {gold.tier}
            </TierLabel>

            <div className="mx-auto max-w-3xl">
              <SponsorCard
                  sponsor={gold.sponsors[0]}
                  index={0}
                  tier="gold"
                  large
              />
            </div>
          </motion.div>

          {/* ==================================================================
            SILVER
        ================================================================== */}

          <motion.div
              variants={item}
              className="mb-12"
          >
            <TierLabel accent="#00ffff">
              {silver.tier}
            </TierLabel>

            <div className="mx-auto grid max-w-4xl gap-7 md:grid-cols-2">
              {silver.sponsors.map((sponsor, index) => (
                  <SponsorCard
                      key={sponsor.name}
                      sponsor={sponsor}
                      index={index}
                      tier="silver"
                  />
              ))}
            </div>
          </motion.div>

          {/* ==================================================================
            BRONZE + IN-KIND
        ================================================================== */}

          <motion.div
              variants={item}
              className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[0.85fr_1.5fr]"
          >
            {/* ================================================================
              BRONZE
          ================================================================ */}

            <div>
              <TierLabel accent="#8a2be2">
                {bronze.tier}
              </TierLabel>

              <SponsorCard
                  sponsor={bronze.sponsors[0]}
                  index={0}
                  tier="bronze"
              />
            </div>

            {/* ================================================================
              IN-KIND
          ================================================================ */}

            <div>
              <TierLabel accent="#ff1493">
                {inKind.tier}
              </TierLabel>

              <div className="grid gap-5 sm:grid-cols-3">
                {inKind.sponsors.map((sponsor, index) => (
                    <SponsorCard
                        key={sponsor.name}
                        sponsor={sponsor}
                        index={index}
                        tier="inkind"
                    />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ==================================================================
            CTA
        ================================================================== */}

          <motion.div
              variants={item}
              className="mx-auto mt-16 max-w-2xl"
          >
            <TiltCard shadow="#ff1493">
              <WindowTitleBar
                  title="BECOME_A_SPONSOR.EXE"
                  accent="#00ffff"
              />

              <div className="bg-[#eeeeee] px-5 py-7 text-center md:px-8">
                <div
                    style={{
                      boxShadow:
                          "3px 3px 0 #8a2be2",
                    }}
                    className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border-2 border-[#333] bg-[#ff9edc]"
                >
                  <div className="h-6 w-6 border-2 border-[#8a2be2] bg-[#00ffff]" />
                </div>

                <h3 className="mb-2 font-mono text-lg font-bold uppercase text-[#222] md:text-xl">
                  Interested in Sponsoring?
                </h3>

                <p className="mx-auto mb-6 max-w-lg font-mono text-[10px] leading-relaxed text-[#555] md:text-xs">
                  Join our growing list of sponsors and
                  connect with top talent and innovative
                  projects.
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

              <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#d9d9d9] px-2.5 font-mono text-[7px] uppercase tracking-[0.08em] text-[#555]">
                <span>READY</span>

                <span className="text-[#008c95]">
                CONTACT://AVAILABLE
              </span>
              </div>
            </TiltCard>
          </motion.div>

          {/* ==================================================================
            BOTTOM TRANSITION
        ================================================================== */}

          <div className="relative mt-20 h-16">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#8a2be2]" />

            <div className="absolute left-0 right-0 top-[calc(50%-6px)] h-[2px] bg-[#00ffff]/70" />

            <div className="absolute left-0 right-0 top-[calc(50%+6px)] h-[2px] bg-[#ff1493]/70" />

            <div
                style={{
                  boxShadow: "4px 4px 0 #8a2be2",
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#333] bg-[#eeeeee] px-4 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#333]"
            >
              SPONSOR_DIRECTORY://END
            </div>
          </div>
        </motion.div>
      </section>
  );
}