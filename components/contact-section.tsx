"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Send, Terminal, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import localFont from "next/font/local"
import TiltedInfoCard from "./TiltedInfoCard"

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
  fallback: ["monospace", "sans-serif"],
})

interface ContactItem {
  id: string
  exeName: string
  icon: typeof Mail
  title: string
  line1: string
  value: string
  href: string
  status: string
  port: string
  badge: string
}

const contactChannels: ContactItem[] = [
  {
    id: "email",
    exeName: "MAIL_CLIENT.EXE",
    icon: Mail,
    title: "Email Dispatch",
    line1: "Questions or sponsor inquiries?",
    value: "hack.csec.nith26@gmail.com",
    href: "mailto:hack.csec.nith26@gmail.com",
    status: "ONLINE",
    port: "PORT://443",
    badge: "DIRECT_LINK",
  },
  {
    id: "location",
    exeName: "VENUE_COORDINATES.EXE",
    icon: MapPin,
    title: "Venue Location",
    line1: "Join us onsite at the arena",
    value: "NIT Hamirpur, HP - 177005",
    href: "https://www.google.co.in/maps/place/NIT+Hamirpur",
    status: "ACTIVE",
    port: "LOC://31.7084,76.5273",
    badge: "ONSITE_HUB",
  },
  {
    id: "phone",
    exeName: "VOICE_COMMS.EXE",
    icon: Phone,
    title: "Helpline Comms",
    line1: "Student & Team Coordinators",
    value: "+91 62675 31322 / +91 70233 26128",
    href: "tel:+916267531322",
    status: "READY",
    port: "FREQ://91.5MHZ",
    badge: "VOICE_LINK",
  },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Simulated transmission delay for vaporwave retro feel
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }, 1200)
  }

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0c0919]"
    >
      {/* Vaporwave Background Grid & Horizon Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Retro Grid Lines Pattern */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(236, 72, 153, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Diagonal Perspective Grid Horizon Line */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#0c0919] via-transparent to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0c0919] via-transparent to-transparent" />

        {/* Ambient Neon Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-pink-500/10 blur-[130px]" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 rounded-full bg-cyan-400/10 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header with Vaporwave OS Terminal Badge */}
        <div className="text-center mb-14 md:mb-20">
          {/* Retro Monospace Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-pink-500/40 bg-pink-500/10 backdrop-blur-md mb-5 shadow-[0_0_15px_rgba(236,72,153,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="font-mono text-xs md:text-sm tracking-widest text-pink-300 font-semibold uppercase">
              [ TRANSMISSION_CONSOLE // CHANNELS_ONLINE ]
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 ${Hacked_KerX.className}`}
          >
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-rose-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              Touch
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 max-w-xs mx-auto mb-5">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="w-2 h-2 rotate-45 border border-pink-400 bg-pink-500/50 shadow-[0_0_8px_#ec4899]" />
            <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400" />
            <div className="w-2 h-2 rotate-45 border border-pink-400 bg-pink-500/50 shadow-[0_0_8px_#ec4899]" />
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <p className="font-mono text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have queries regarding <span className="text-cyan-300 font-semibold">Hack 6.0</span>? Connect with the
            operations grid through the terminal channels below.
          </p>
        </div>

        {/* Main Grid: Form + 3D Tilt Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Master Form Terminal Window (7 Cols on desktop) */}
          <div className="lg:col-span-7">
            <div className="relative group rounded-xl p-[1px] bg-gradient-to-b from-cyan-400/50 via-purple-500/30 to-pink-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
              {/* Outer Cyber Accent Corners */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-pink-400" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-pink-400" />

              <div className="bg-[#110d24]/95 backdrop-blur-xl rounded-xl overflow-hidden border border-white/5">
                {/* Vaporwave OS Window Title Bar */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-r from-[#171233] via-[#201742] to-[#171233] border-b border-pink-500/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shadow-[0_0_8px_#22d3ee]">
                      <Terminal size={10} className="text-[#0c0919]" />
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-cyan-300">
                      DISPATCH_CONSOLE.EXE
                    </span>
                  </div>

                  {/* Window Control Buttons */}
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <div className="w-6 h-5 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                      _
                    </div>
                    <div className="w-6 h-5 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                      □
                    </div>
                    <div className="w-6 h-5 rounded-xs bg-pink-500/80 border border-pink-400 flex items-center justify-center text-white font-bold shadow-[0_0_10px_#ec4899] hover:bg-pink-600 transition-colors cursor-pointer">
                      ✕
                    </div>
                  </div>
                </div>

                {/* Terminal Subheader Info */}
                <div className="px-4 sm:px-6 py-2.5 bg-[#0e0a1f] border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="text-pink-400">PROTOCOL://HTTPS_ENCRYPTED</span>
                  <span className="text-cyan-400">NODE_STATUS: LISTENING</span>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs text-gray-300 flex items-center gap-1.5">
                        <span className="text-cyan-400">&gt;</span> SENDER_NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Chen"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#181236]/80 border border-pink-500/25 rounded-lg px-4 py-3 text-white placeholder-gray-500 font-mono text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs text-gray-300 flex items-center gap-1.5">
                        <span className="text-cyan-400">&gt;</span> SENDER_EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#181236]/80 border border-pink-500/25 rounded-lg px-4 py-3 text-white placeholder-gray-500 font-mono text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-gray-300 flex items-center gap-1.5">
                      <span className="text-pink-400">&gt;</span> SUBJECT_HEADER
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hackathon Track Query / Sponsor Opportunity"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#181236]/80 border border-pink-500/25 rounded-lg px-4 py-3 text-white placeholder-gray-500 font-mono text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-gray-300 flex items-center gap-1.5">
                      <span className="text-pink-400">&gt;</span> MESSAGE_PAYLOAD
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your transmission here..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#181236]/80 border border-pink-500/25 rounded-lg px-4 py-3 text-white placeholder-gray-500 font-mono text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all resize-none"
                    />
                  </div>

                  {/* Feedback Notification */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-lg border border-cyan-400/50 bg-cyan-500/15 text-cyan-200 font-mono text-xs flex items-center gap-2.5 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                    >
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                      <span>TRANSMISSION SENT SUCCESSFULLY // DISPATCH QUEUED</span>
                    </motion.div>
                  )}

                  {/* Submit Button with Vaporwave Glow */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group/btn relative overflow-hidden py-3.5 px-6 rounded-lg font-mono text-sm font-bold tracking-wider text-white transition-all duration-300 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:via-purple-700 hover:to-cyan-600 shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-50"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>TRANSMITTING PACKETS...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                          <span>[ TRANSMIT MESSAGE ]</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>

                {/* Terminal Footer Bar */}
                <div className="px-4 sm:px-6 py-2.5 bg-[#0e0a1f] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>HACK_6.0 // NIT_HAMIRPUR</span>
                  <span className="text-pink-400">READY_FOR_INPUT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Tilted Info Cards (5 Cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {contactChannels.map((item, idx) => {
              const Icon = item.icon
              return (
                <TiltedInfoCard
                  key={item.id}
                  rotateAmplitude={12}
                  scaleOnHover={1.03}
                  className="w-full select-none"
                >
                  <div className="relative group rounded-xl p-[1px] bg-gradient-to-b from-cyan-400/40 via-purple-500/20 to-pink-500/40 shadow-[0_0_20px_rgba(6,182,212,0.18)] hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] transition-shadow duration-300">
                    {/* Cyber Corner Markers */}
                    <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-pink-400" />

                    <div className="bg-[#110d24]/95 backdrop-blur-xl rounded-xl overflow-hidden border border-white/5 p-5 sm:p-6 flex flex-col justify-between">
                      {/* Card Window Title Bar */}
                      <div
                        className="flex items-center justify-between pb-3 mb-4 border-b border-pink-500/20"
                        style={{ transform: "translateZ(25px)" }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-xs bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                          <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">
                            {item.exeName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 font-mono text-[10px]">
                          <span className="px-1.5 py-0.5 rounded-xs bg-pink-500/20 border border-pink-500/40 text-pink-300 font-semibold">
                            {item.badge}
                          </span>
                          <div className="w-4 h-4 rounded-xs bg-pink-500/80 border border-pink-400 flex items-center justify-center text-[9px] text-white font-bold">
                            ✕
                          </div>
                        </div>
                      </div>

                      {/* Card Body with 3D Parallax Layering */}
                      <div className="flex items-start gap-4">
                        {/* 3D Elevated Glowing Icon */}
                        <div
                          className="shrink-0 p-3.5 rounded-lg bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                          style={{ transform: "translateZ(45px)" }}
                        >
                          <Icon size={24} className="text-cyan-300" />
                        </div>

                        {/* Text Details with 3D Depth */}
                        <div className="flex-1 min-w-0" style={{ transform: "translateZ(30px)" }}>
                          <h4 className="font-mono text-base font-bold text-white tracking-wide mb-1 flex items-center gap-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-400 mb-2 font-mono">{item.line1}</p>

                          <a
                            href={item.href}
                            target={item.id === "location" ? "_blank" : undefined}
                            rel={item.id === "location" ? "noopener noreferrer" : undefined}
                            className="inline-block font-mono text-xs sm:text-sm font-semibold text-pink-400 hover:text-cyan-300 transition-colors underline decoration-pink-500/40 hover:decoration-cyan-400 underline-offset-4 break-all"
                          >
                            {item.value}
                          </a>
                        </div>
                      </div>

                      {/* Card Window Footer Bar */}
                      <div
                        className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-gray-400"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <span className="text-gray-400">{item.port}</span>
                        <span className="text-cyan-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltedInfoCard>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}