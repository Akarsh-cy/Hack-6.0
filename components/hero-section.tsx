"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useGlitch } from "react-powerglitch"
import localFont from "next/font/local"


export default function HeroSection() {
  const glitch = useGlitch({
    timing: {
      duration: 3950,
    },
    shake: false,
  })

  const targetDate = new Date("2025-03-21T23:59:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  // Add Devfolio script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://apply.devfolio.co/v2/sdk.js"
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Countdown timer logic
  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00"
    };

    return {
      days: formatTime(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: formatTime(Math.floor((difference / 1000 / 60) % 60)),
      seconds: formatTime(Math.floor((difference / 1000) % 60)),
    };
  }

  function formatTime(time: number) {
    return time < 10 ? `0${time}` : `${time}`;
  }

  // Set up timer interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
      <section id="home" className="relative min-h-screen overflow-hidden">

  {/* Background video */}
  <img
    src="/bg.jpg"
    className="absolute inset-0 w-full h-full z-0"
  />
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b820000,_#000000)]" />
  <div className="absolute inset-0 bg-black/40 z-10" />

  {/* Website content */}
  <div className="relative z-20 min-h-screen flex flex-col">

    <div className="h-20"></div>

    <div className="flex-1 flex items-center justify-center">

      <motion.div
        className="container mx-auto px-4 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >

        <motion.div variants={item}>
          <h1 className="text-9xl sm:text-9xl md:text-11xl font-bold text-white">
            HACK 6.0
          </h1>
        </motion.div>

        {/* Devfolio button */}
        <motion.div
          variants={item}
          className="flex justify-center mt-12"
        >
          <div
            className="apply-button"
            data-hackathon-slug="hack-1158"
            data-button-theme="dark-inverted"
            style={{ height: "44px", width: "312px" }}
          >
            Apply with Devfolio
          </div>
        </motion.div>

      </motion.div>

    </div>

    {/* Countdown */}
    <div className="w-full px-4 pb-12 sm:pb-16">
      {/* countdown here */}
    </div>

  </div>

</section>
  )
}