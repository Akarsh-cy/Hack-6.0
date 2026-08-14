"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import TiltedInfoCard from "./TiltedInfoCard";

const Hacked_KerX = localFont({
  src: "../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
  fallback: ["monospace", "sans-serif"],
});

interface ContactItem {
  id: string;
  exeName: string;
  icon: typeof Mail;
  title: string;
  line1: string;
  value: string;
  href: string;
  status: string;
  port: string;
  badge: string;
  accentColor: string;
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
    accentColor: "#8a2be2",
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
    accentColor: "#ff1493",
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
    accentColor: "#00ffff",
  },
];

function WindowControls() {
  return (
    <div className="flex gap-[3px]">
      <div className="flex h-[17px] w-[17px] items-center justify-center border border-[#555] bg-[#3a334f] text-[9px] leading-none text-[#eee5ff]">
        _
      </div>
      <div className="flex h-[17px] w-[17px] items-center justify-center border border-[#555] bg-[#3a334f] text-[8px] leading-none text-[#eee5ff]">
        □
      </div>
      <div className="flex h-[17px] w-[17px] items-center justify-center border border-[#555] bg-[#ff8ed8] text-[9px] font-bold leading-none text-black">
        ×
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1000);
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden bg-[#d9a7f0] py-24"
    >
      {/* Pastel vaporwave background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #b58be3 0%,
              #d9a7f0 45%,
              #c87de8 100%
            )
          `,
        }}
      />

      {/* Retro grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(75,0,130,0.65) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(75,0,130,0.65) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft Cyan glow */}
      <div
        className="pointer-events-none absolute -left-36 top-24 h-[480px] w-[480px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, #00ffff 0%, transparent 68%)",
          filter: "blur(95px)",
        }}
      />

      {/* Pink glow */}
      <div
        className="pointer-events-none absolute -right-36 bottom-20 h-[500px] w-[500px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, #ff4fd8 0%, transparent 68%)",
          filter: "blur(95px)",
        }}
      />

      {/* Decorative desktop floating window background accents */}
      <div className="pointer-events-none absolute left-[3%] top-[15%] hidden h-24 w-36 -rotate-6 border-2 border-[#18151f] bg-[#302a45] opacity-50 lg:block">
        <div className="h-5 border-b-2 border-[#18151f] bg-[#ff4fd8]" />
        <div className="space-y-1.5 p-2">
          <div className="h-1.5 w-3/4 bg-[#8a2be2]" />
          <div className="h-1.5 w-1/2 bg-[#00ffff]" />
          <div className="h-1.5 w-2/3 bg-[#ff1493]" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-[3%] bottom-[20%] hidden h-28 w-40 rotate-6 border-2 border-[#18151f] bg-[#302a45] opacity-50 lg:block">
        <div className="h-5 border-b-2 border-[#18151f] bg-[#00ffff]" />
        <div className="space-y-1.5 p-2.5">
          <div className="h-2 w-4/5 bg-[#ff1493]" />
          <div className="h-2 w-1/2 bg-[#8a2be2]" />
          <div className="h-2 w-3/5 bg-[#00ffff]" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          {/* Retro badge */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 border-2 border-[#665b78] bg-[#443b5c] px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#d9ccef] shadow-[4px_4px_0_#ff1493]">
            <span className="h-3 w-3 border border-[#555] bg-[#ff9edc]" />
            SYSTEM_DIRECTORY://CONTACT_GRID
          </div>

          <h2
            className={`mb-4 text-3xl text-[#ffffff] drop-shadow-[3px_3px_0_#8a2be2] md:text-5xl ${Hacked_KerX.className}`}
          >
            Get In <span className="text-[#ff1493]">Touch</span>
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-24 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-[#ff1493]" />

          <p className="mx-auto mt-4 max-w-2xl font-mono text-xs sm:text-sm text-[#3b1647] md:text-base font-medium">
            Have queries regarding HACK 6.0? Connect with the operations grid through the channels below.
          </p>
        </div>

        {/* Main Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Master Form Dark Retro Window with 3D Parallax Tilt (7 Cols) */}
          <div className="lg:col-span-7">
            <TiltedInfoCard rotateAmplitude={6} scaleOnHover={1.02} className="w-full">
              <div className="group relative">
                {/* Cyan offset window */}
                <div className="pointer-events-none absolute -right-2 -bottom-2 left-2 top-2 border-2 border-[#00ffff]" />

                {/* Pink offset window */}
                <div className="pointer-events-none absolute -top-2 right-2 -bottom-1 left-[-5px] border-2 border-[#ff1493]" />

                {/* Main Dark Retro Window Container */}
                <div
                  className="relative overflow-hidden border-2 border-[#18151f] bg-[#302a45]"
                  style={{
                    boxShadow: "7px 7px 0 #8a2be2, -4px -4px 0 rgba(255,79,216,0.9)",
                  }}
                >
                  {/* Window Title Bar */}
                  <div
                    className="flex h-9 items-center justify-between border-b-2 border-[#18151f] px-3"
                    style={{
                      background: "linear-gradient(90deg, #ff4fd8 0%, #51445f 72%)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative h-4 w-4 border border-[#555] bg-[#ff9edc] shadow-[2px_2px_0_#00ffff]">
                        <div className="ml-[3px] mt-[3px] h-[5px] w-[7px] bg-[#8a2be2]" />
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#f4eaff]">
                        DISPATCH_MESSAGE.EXE
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Subheader Protocol Info Bar */}
                  <div className="flex items-center justify-between border-b-2 border-[#51465f] bg-[#221d33] px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-[#b8abc9]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-[#8a2be2]" />
                      PROTOCOL: HTTPS_SECURE
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-[#00ffff]">
                      <span className="h-1.5 w-1.5 bg-[#00ffff] animate-pulse" />
                      DISPATCH_NODE: ONLINE
                    </span>
                  </div>

                  {/* Form Body with Dark Retro Styling */}
                  <form onSubmit={handleSubmit} className="bg-[#29243a] p-5 sm:p-7 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#d9cbea]">
                          <span className="text-[#00ffff] font-black">&gt;</span> SENDER_NAME
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Chen"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full border-2 border-[#665b78] bg-[#1e192c] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#f4eaff] placeholder-[#8f83a6] outline-none transition-all focus:border-[#00ffff] focus:bg-[#251e36] focus:shadow-[inset_2px_2px_0_#120f1b,3px_3px_0_#ff1493]"
                          style={{
                            boxShadow: "inset 2px 2px 0 #120f1b, 2px 2px 0 #443b5c",
                          }}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#d9cbea]">
                          <span className="text-[#00ffff] font-black">&gt;</span> SENDER_EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@domain.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full border-2 border-[#665b78] bg-[#1e192c] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#f4eaff] placeholder-[#8f83a6] outline-none transition-all focus:border-[#00ffff] focus:bg-[#251e36] focus:shadow-[inset_2px_2px_0_#120f1b,3px_3px_0_#ff1493]"
                          style={{
                            boxShadow: "inset 2px 2px 0 #120f1b, 2px 2px 0 #443b5c",
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#d9cbea]">
                        <span className="text-[#ff1493] font-black">&gt;</span> SUBJECT_HEADER
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hackathon Track Query / Sponsor Opportunity"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full border-2 border-[#665b78] bg-[#1e192c] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#f4eaff] placeholder-[#8f83a6] outline-none transition-all focus:border-[#00ffff] focus:bg-[#251e36] focus:shadow-[inset_2px_2px_0_#120f1b,3px_3px_0_#ff1493]"
                        style={{
                          boxShadow: "inset 2px 2px 0 #120f1b, 2px 2px 0 #443b5c",
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#d9cbea]">
                        <span className="text-[#ff1493] font-black">&gt;</span> MESSAGE_PAYLOAD
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write your transmission here..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none border-2 border-[#665b78] bg-[#1e192c] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#f4eaff] placeholder-[#8f83a6] outline-none transition-all focus:border-[#00ffff] focus:bg-[#251e36] focus:shadow-[inset_2px_2px_0_#120f1b,3px_3px_0_#ff1493]"
                        style={{
                          boxShadow: "inset 2px 2px 0 #120f1b, 2px 2px 0 #443b5c",
                        }}
                      />
                    </div>

                    {/* Feedback Notification */}
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 border-2 border-[#00ffff] bg-[#1e3a3a] p-3 font-mono text-xs font-bold text-[#7df9ff] shadow-[3px_3px_0_#00ffff]"
                      >
                        <CheckCircle2 size={16} className="text-[#00ffff] shrink-0" />
                        <span>TRANSMISSION SENT SUCCESSFULLY // DISPATCH QUEUED</span>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-[#18151f] bg-gradient-to-r from-[#ff1493] via-[#e02da8] to-[#8a2be2] px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0_#00ffff] transition-all hover:brightness-110 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>TRANSMITTING PACKETS...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>[ TRANSMIT MESSAGE ]</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Dark Retro Status Bar */}
                  <div className="flex h-7 items-center justify-between border-t-2 border-[#51465f] bg-[#221d33] px-3 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-[#aaa0bd]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 bg-[#00ffff]" />
                      SYSTEM ONLINE
                    </span>
                    <span>HACK 6.0 // NIT HAMIRPUR</span>
                  </div>
                </div>
              </div>
            </TiltedInfoCard>
          </div>

          {/* Right Column: Contact Channels / Info Cards with 3D Tilt (5 Cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {contactChannels.map((item, index) => {
              const Icon = item.icon;
              return (
                <TiltedInfoCard
                  key={item.id}
                  rotateAmplitude={12}
                  scaleOnHover={1.035}
                  className="w-full"
                >
                  <div className="group relative">
                    {/* Subtle offset border */}
                    <div
                      className={`pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 ${
                        index % 2 === 0 ? "border-[#00ffff]" : "border-[#ff1493]"
                      }`}
                    />

                    {/* Dark Retro Window Card */}
                    <div
                      className="relative overflow-hidden border-2 border-[#18151f] bg-[#302a45]"
                      style={{
                        boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 rgba(0,255,255,0.7)",
                      }}
                    >
                      {/* Window Title Bar */}
                      <div
                        className="flex h-8 items-center justify-between border-b-2 border-[#18151f] px-3"
                        style={{
                          background: `linear-gradient(90deg, ${item.accentColor} 0%, #342d49 72%)`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 border border-[#333]"
                            style={{ backgroundColor: item.accentColor }}
                          />
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#f4eaff]">
                            {item.exeName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="border border-[#665b78] bg-[#443b5c] px-1.5 py-0.2 font-mono text-[8px] font-bold uppercase text-[#d9ccef]">
                            {item.badge}
                          </span>
                          <div className="flex h-4 w-4 items-center justify-center border border-[#555] bg-[#ff8ed8] text-[9px] font-bold text-black">
                            ×
                          </div>
                        </div>
                      </div>

                      {/* Dark Content Panel */}
                      <div className="bg-[#29243a] p-4 sm:p-5">
                        <div className="flex items-start gap-3.5">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#665b78] bg-[#3a334f] text-[#00ffff]"
                            style={{
                              boxShadow: "3px 3px 0 #ff1493",
                            }}
                          >
                            <Icon size={20} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="font-mono text-sm font-bold uppercase tracking-wide text-[#f4eaff]">
                              {item.title}
                            </h4>
                            <p className="mt-0.5 font-mono text-[11px] text-[#b8abc9]">
                              {item.line1}
                            </p>
                            <a
                              href={item.href}
                              target={item.id === "location" ? "_blank" : undefined}
                              rel={item.id === "location" ? "noopener noreferrer" : undefined}
                              className="mt-2 inline-block font-mono text-xs sm:text-sm font-bold text-[#00ffff] underline decoration-[#ff1493] underline-offset-4 hover:text-[#ff4fd8] break-all transition-colors"
                            >
                              {item.value}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Dark Status Bar */}
                      <div className="flex h-6 items-center justify-between border-t-2 border-[#51465f] bg-[#221d33] px-3 font-mono text-[8px] uppercase tracking-wider text-[#aaa0bd]">
                        <span>{item.port}</span>
                        <span className="flex items-center gap-1 font-bold text-[#00ffff]">
                          <span className="h-1.5 w-1.5 bg-[#00ffff] animate-pulse" />
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltedInfoCard>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}