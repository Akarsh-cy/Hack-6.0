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
      count: 6,
      velocity: 12,
      minHeight: 0.02,
      maxHeight: 0.12,
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
      <section id="home" className="relative">
        <div className="h-screen flex flex-col">

          {/* Background */}
          <div className="absolute inset-0 -z-10">

            {/* Main gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 z-10" />

            {/* Blur */}
            <div className="absolute inset-0 backdrop-blur-md z-0" />

            {/* Purple glow */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-700/20 blur-[80px] animate-pulse" />

            {/* Magenta glow */}
            <div
                className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-fuchsia-600/20 blur-[100px] animate-pulse"
                style={{
                  animationDelay: "1s",
                }}
            />

            {/* Cyan accent glow */}
            <div
                className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-cyan-500/10 blur-[90px] animate-pulse"
                style={{
                  animationDelay: "2s",
                }}
            />
          </div>

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

              {/* HACK 5.0 */}
              <motion.div
                  variants={item}
                  className="relative"
              >

                {/* Magenta / cyan glow behind title */}
                <div
                    className="
                  absolute
                  w-full
                  h-24
                  md:h-72
                  rounded-full
                  blur-[60px]
                  top-[90%]
                  left-0
                  -z-10
                  opacity-40
                  bg-gradient-to-r
                  from-fuchsia-500/20
                  via-purple-500/20
                  to-cyan-400/20
                "
                />

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

                  {/* HACK */}
                  <span
                      ref={glitch.ref}
                      className="
                    inline-block
                    text-fuchsia-500
                    drop-shadow-[4px_0_0_rgba(0,255,255,0.8)]
                  "
                  >
                  HACK
                </span>

                  {" "}

                  {/* 5.0 */}
                  <span
                      className="
                    text-white
                    drop-shadow-[3px_0_0_rgba(168,85,247,0.8)]
                  "
                  >
                  5.0
                </span>

                </h1>
              </motion.div>

              {/* Devfolio */}
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
              "
              >
                Registration Closes in
              </motion.div>

              <div className="grid grid-cols-4 gap-2 md:gap-3">

                {Object.entries(timeLeft).map(
                    ([key, value], index) => (
                        <motion.div
                            key={key}
                            variants={item}
                            className="
                      bg-gradient-to-br
                      from-gray-900/80
                      to-gray-800/40
                      backdrop-blur-sm
                      p-2
                      md:p-3
                      rounded-lg
                      border
                      border-gray-700
                      shadow-lg
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
                              className="
                        text-2xl
                        md:text-3xl
                        lg:text-4xl
                        font-bold
                        text-fuchsia-500
                        mb-1
                      "
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
                      "
                          >
                            {key}
                          </div>

                        </motion.div>
                    )
                )}

              </div>
            </motion.div>
          </div>

        </div>
      </section>
  )
}