"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useGlitch } from "react-powerglitch"
import localFont from "next/font/local"

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
})

export default function HeroSection() {
  // Main title glitch with pink/cyan slice tear
  const glitch = useGlitch({
    timing: {
      duration: 3950,
    },
    shake: false,
    glitchTimeSpan: {
      start: 0.15,
      end: 0.75,
    },
    slice: {
      count: 7,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.14,
      hueRotate: false,
    },
  })

  const targetDate = new Date("2025-03-21T23:59:00").getTime()

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  // Devfolio script
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

  // Countdown
  function calculateTimeLeft() {
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      }
    }

    return {
      days: formatTime(
          Math.floor(difference / (1000 * 60 * 60 * 24))
      ),
      hours: formatTime(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
      ),
      minutes: formatTime(
          Math.floor((difference / (1000 * 60)) % 60)
      ),
      seconds: formatTime(
          Math.floor((difference / 1000) % 60)
      ),
    }
  }

  function formatTime(time: number) {
    return time < 10 ? `0${time}` : `${time}`
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
      <section id="home" className="relative select-none">
        <div className="h-screen flex flex-col">
          {/* Navbar spacing */}
          <div className="h-20" />

          {/* Main content */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
                className="container mx-auto px-4 z-10 text-center"
                variants={container}
                initial="hidden"
                animate="show"
            >
              {/* HACK 6.0 */}
              <motion.div variants={item} className="relative">
                <h1
                    className={`
                  relative
                  z-10
                  text-7xl
                  sm:text-9xl
                  md:text-9xl
                  font-bold
                  mb-4
                  md:mb-8
                  text-white
                  ${Hacked_KerX.className}
                `}
                >
                  {/* HACK with glitch-only cyan/pink RGB split */}
                  <span className="relative inline-block">
                  {/* Cyan Glitch Clone — only active during powerglitch frames */}
                    <span
                        ref={glitch.ref}
                        aria-hidden="true"
                        className="
                      absolute
                      inset-0
                      text-[#00f0ff]
                      opacity-80
                      pointer-events-none
                      mix-blend-screen
                    "
                    >
                    HACK
                  </span>

                    {/* Base HACK text (Pure pink, clean dark backing shadow) */}
                    <span
                        className="
                      relative
                      z-10
                      inline-block
                      text-[#ff2a85]
                      drop-shadow-[3px_3px_0_rgba(0,0,0,0.85)]
                    "
                    >
                    HACK
                  </span>
                </span>{" "}

                  {/* 6.0 */}
                  <span
                      className="
                    text-white
                    drop-shadow-[3px_3px_0_#ff2a85]
                  "
                  >
                  6.0
                </span>
                </h1>
              </motion.div>

              {/* Aesthetic Register Button */}
              <motion.div variants={item} className="mt-8 mb-12 relative z-20 flex justify-center">
                <a
                  href="https://hack-1158.devfolio.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block
                    bg-[#ff2a85]
                    text-white
                    font-mono
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-lg md:text-xl
                    px-10 py-4
                    border-2 border-[#292929]
                    shadow-[5px_5px_0px_#00f0ff]
                    hover:shadow-[7px_7px_0px_#00f0ff]
                    active:shadow-[2px_2px_0px_#00f0ff]
                    active:translate-y-[3px]
                    active:translate-x-[3px]
                    transition-all duration-200
                  "
                >
                  [ Register Now ]
                </a>
              </motion.div>

              {/* Devfolio 
              <motion.div
                  variants={item}
                  className="flex justify-center mt-12"
              >
                <div
                    className="apply-button"
                    data-hackathon-slug="hack-1158"
                    data-button-theme="dark-inverted"
                    style={{
                      height: "44px",
                      width: "312px",
                    }}
                >
                  Apply with Devfolio
                </div>
              </motion.div>
              */}

            </motion.div>
          </div>

          {/* Countdown */}
          <div className="w-full px-4 pb-12 sm:pb-16">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto"
            >
              <motion.div
                  variants={item}
                  className="
                mb-3
                text-center
                text-sm
                md:text-base
                lg:text-lg
                text-gray-300
                font-mono
              "
              >
                Registration Closes in
              </motion.div>

              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {Object.entries(timeLeft).map(([key, value], index) => {
                  const isPink = key === "days" || key === "seconds"

                  return (
                      <motion.div
                          key={key}
                          variants={item}
                          className="
                      bg-[#0f041c]/70
                      backdrop-blur-sm
                      p-2
                      md:p-3
                      border-2
                      border-black
                      shadow-[3px_3px_0px_#00f0ff]
                      flex
                      flex-col
                      items-center
                      justify-center
                    "
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.1 * index,
                            duration: 0.5,
                          }}
                      >
                        <div
                            className={`
                        text-2xl
                        md:text-3xl
                        lg:text-4xl
                        font-bold
                        font-mono
                        mb-1
                        ${isPink ? "text-[#ff2a85]" : "text-[#00f0ff]"}
                      `}
                        >
                          {value}
                        </div>

                        <div
                            className="
                        text-[10px]
                        md:text-xs
                        lg:text-sm
                        text-gray-300
                        uppercase
                        tracking-wider
                        font-mono
                      "
                        >
                          {key}
                        </div>
                      </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  )
}
