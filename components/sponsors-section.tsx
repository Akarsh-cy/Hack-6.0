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

export default function SponsorsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const sponsorTiers = [
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

  return (
      <section
          id="sponsors"
          className="relative overflow-hidden bg-background py-20"
      >
        {/* Vaporwave background */}
        <div className="pointer-events-none absolute inset-0">
          <div
              className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full opacity-20"
              style={{
                background: "#8a2be2",
                filter: "blur(120px)",
              }}
          />

          <div
              className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full opacity-15"
              style={{
                background: "#ff1493",
                filter: "blur(130px)",
              }}
          />

          <div
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-10"
              style={{
                background: "#00ffff",
                filter: "blur(110px)",
              }}
          />
        </div>

        <motion.div
            ref={ref}
            className="container relative mx-auto px-4"
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
          {/* Heading */}
          <motion.div variants={item} className="mb-16 text-center">
            <h2
                className={`mb-4 text-3xl md:text-5xl ${Hacked_KerX.className}`}
            >
              Our <span className="text-primary">Sponsors</span>
            </h2>

            <div
                className="mx-auto mb-6 h-[3px] w-20"
                style={{
                  background:
                      "linear-gradient(90deg, #00ffff, #8a2be2, #ff4fd8, #ff1493)",
                }}
            />

            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              HACK 5.0 is made possible by the generous support of our sponsors
            </p>
          </motion.div>

          {/* Sponsor tiers */}
          {sponsorTiers.map((tier, index) => (
              <motion.div
                  key={index}
                  variants={item}
                  className="mb-16 last:mb-0"
              >
                <h3 className="mb-8 text-center text-2xl font-bold text-white">
                  {tier.tier}
                </h3>

                <div
                    className={`grid grid-cols-1 justify-items-center gap-6 md:gap-8 ${
                        tier.sponsors.length === 1
                            ? "md:grid-cols-1"
                            : tier.sponsors.length === 2
                                ? "md:grid-cols-2"
                                : "md:grid-cols-3"
                    }`}
                >
                  {tier.sponsors.map((sponsor, idx) => (
                      <motion.div
                          key={idx}
                          whileHover={{
                            y: -6,
                            scale: 1.02,
                          }}
                          transition={{
                            duration: 0.25,
                            ease: "easeOut",
                          }}
                          className="group relative w-full overflow-hidden rounded-2xl p-[2px]"
                      >
                        {/* Iridescent border */}
                        <div
                            className="absolute inset-0 rounded-2xl"
                            style={{
                              background:
                                  "linear-gradient(135deg, #00ffff, #8a2be2, #ff4fd8, #ff1493, #8a2be2, #00ffff)",
                            }}
                        />

                        {/* Card */}
                        <div className="relative flex h-full min-h-[130px] items-center justify-center overflow-hidden rounded-[14px] bg-[#09040f] px-6 py-8">
                          {/* Subtle vaporwave corner light */}
                          <div
                              className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full opacity-20 transition-opacity duration-300 group-hover:opacity-35"
                              style={{
                                background: "#00ffff",
                                filter: "blur(35px)",
                              }}
                          />

                          <div
                              className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full opacity-20 transition-opacity duration-300 group-hover:opacity-35"
                              style={{
                                background: "#ff1493",
                                filter: "blur(35px)",
                              }}
                          />

                          {/* CRT scanlines */}
                          <div
                              className="pointer-events-none absolute inset-0 opacity-[0.055]"
                              style={{
                                backgroundImage:
                                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.2) 4px)",
                              }}
                          />

                          {/* Sponsor logo */}
                          <div className="relative h-16 w-1/2 md:h-20">
                            <Image
                                src={sponsor.logo || "/placeholder.svg"}
                                alt={sponsor.name}
                                fill
                                className="object-contain brightness-100 transition-all duration-300 group-hover:brightness-110"
                            />
                          </div>
                        </div>
                      </motion.div>
                  ))}
                </div>
              </motion.div>
          ))}

          {/* CTA */}
          <motion.div variants={item} className="mt-16 text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Interested in Sponsoring?
            </h3>

            <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-300">
              Join our growing list of sponsors and connect with top talent and
              innovative projects
            </p>

            <Button
                className="relative overflow-hidden border-0 bg-[#8a2be2] text-white transition-all duration-300 hover:bg-[#ff1493]"
                onClick={() => {
                  const contactSection = document.getElementById("contact");

                  if (contactSection) {
                    contactSection.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
            >
              Become a Sponsor
            </Button>
          </motion.div>
        </motion.div>
      </section>
  );
}