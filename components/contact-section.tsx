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
  accentGradient: string;
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
    accentGradient: "from-[#d4b0f5] via-[#eadaf8] to-[#eeeeee]",
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
    accentGradient: "from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee]",
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
    accentGradient: "from-[#00ffff] via-[#c9ffff] to-[#eeeeee]",
    accentColor: "#00bfff",
  },
];

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
      className="relative py-24 px-4 sm:px-6"
    >
      <div className="container relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          {/* Retro badge */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 border-2 border-[#333] bg-white px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#333] shadow-[4px_4px_0_#ff1493]">
            <span className="h-3 w-3 border border-[#333] bg-[#8a2be2]" />
            SYSTEM_DIRECTORY://CONTACT_GRID
          </div>

          <h2
            className={`mb-4 text-3xl text-white drop-shadow-[3px_3px_0_#8a2be2] md:text-5xl ${Hacked_KerX.className}`}
          >
            Get In <span className="text-[#ff1493]">Touch</span>
          </h2>

          <div className="mx-auto mt-3 h-[3px] w-24 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-[#ff1493]" />

          <p className="mx-auto mt-4 max-w-2xl font-mono text-xs sm:text-sm text-[#3b1647] md:text-base font-semibold">
            Have queries regarding HACK 5.0? Connect with the operations grid through the channels below.
          </p>
        </div>

        {/* Main Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Master Form Light Retro Window with 3D Parallax Tilt (7 Cols) */}
          <div className="lg:col-span-7">
            <TiltedInfoCard rotateAmplitude={6} scaleOnHover={1.02} className="w-full">
              <div className="group relative">
                {/* Cyan offset window */}
                <div className="pointer-events-none absolute -right-2 -bottom-2 left-2 top-2 border-2 border-[#00ffff]" />

                {/* Pink offset window */}
                <div className="pointer-events-none absolute -top-2 right-2 -bottom-1 left-[-5px] border-2 border-[#ff1493]" />

                {/* Main Light Retro Window Container */}
                <div
                  className="relative overflow-hidden border-2 border-[#292929] bg-[#eeeeee]"
                  style={{
                    boxShadow: "7px 7px 0 #8a2be2, -4px -4px 0 #ff4fd8",
                  }}
                >
                  {/* Window Title Bar */}
                  <div className="flex h-10 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee] px-3">
                    <div className="flex items-center gap-2">
                      <div className="relative h-5 w-5 border border-[#555] bg-[#ff9edc] shadow-[2px_2px_0_#00ffff]">
                        <div className="ml-[3px] mt-[3px] h-[6px] w-[8px] bg-[#8a2be2]" />
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#222]">
                        DISPATCH_MESSAGE.EXE
                      </span>
                    </div>

                    <WindowControls />
                  </div>

                  {/* Subheader Protocol Info Bar */}
                  <div className="flex items-center justify-between border-b-2 border-[#ccc] bg-[#dedede] px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-[#444]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-[#8a2be2]" />
                      PROTOCOL: HTTPS_SECURE
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-[#8a2be2]">
                      <span className="h-1.5 w-1.5 bg-[#00bfff]" />
                      DISPATCH_NODE: ONLINE
                    </span>
                  </div>

                  {/* Form Body with Light White Theme Styling */}
                  <form onSubmit={handleSubmit} className="bg-[#ffffff] p-5 sm:p-7 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#222]">
                          <span className="text-[#8a2be2] font-black">&gt;</span> SENDER_NAME
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Chen"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full border-2 border-[#292929] bg-[#f8f8f8] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#111] placeholder-[#888] shadow-[3px_3px_0_#d9a7f0] outline-none transition-all focus:border-[#8a2be2] focus:bg-[#ffffff] focus:shadow-[4px_4px_0_#ff4fd8]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#222]">
                          <span className="text-[#8a2be2] font-black">&gt;</span> SENDER_EMAIL
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@domain.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full border-2 border-[#292929] bg-[#f8f8f8] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#111] placeholder-[#888] shadow-[3px_3px_0_#d9a7f0] outline-none transition-all focus:border-[#8a2be2] focus:bg-[#ffffff] focus:shadow-[4px_4px_0_#ff4fd8]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#222]">
                        <span className="text-[#ff1493] font-black">&gt;</span> SUBJECT_HEADER
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hackathon Track Query / Sponsor Opportunity"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full border-2 border-[#292929] bg-[#f8f8f8] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#111] placeholder-[#888] shadow-[3px_3px_0_#d9a7f0] outline-none transition-all focus:border-[#8a2be2] focus:bg-[#ffffff] focus:shadow-[4px_4px_0_#ff4fd8]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#222]">
                        <span className="text-[#ff1493] font-black">&gt;</span> MESSAGE_PAYLOAD
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write your transmission here..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none border-2 border-[#292929] bg-[#f8f8f8] px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#111] placeholder-[#888] shadow-[3px_3px_0_#d9a7f0] outline-none transition-all focus:border-[#8a2be2] focus:bg-[#ffffff] focus:shadow-[4px_4px_0_#ff4fd8]"
                      />
                    </div>

                    {/* Feedback Notification */}
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 border-2 border-[#2e7d32] bg-[#e8f5e9] p-3 font-mono text-xs font-bold text-[#1b5e20] shadow-[3px_3px_0_#81c784]"
                      >
                        <CheckCircle2 size={16} className="text-[#2e7d32] shrink-0" />
                        <span>TRANSMISSION SENT SUCCESSFULLY // DISPATCH QUEUED</span>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-[#292929] bg-gradient-to-r from-[#ff4fd8] via-[#e836be] to-[#8a2be2] px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0_#00ffff] transition-all hover:brightness-105 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-60"
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

                  {/* Retro Status Bar */}
                  <div className="flex h-7 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-[#333]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 bg-[#00bfff]" />
                      SYSTEM ONLINE
                    </span>
                    <span>HACK 5.0 // NIT HAMIRPUR</span>
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

                    {/* Light Retro Window Card */}
                    <div
                      className="relative overflow-hidden border-2 border-[#292929] bg-[#eeeeee]"
                      style={{
                        boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 #00ffff",
                      }}
                    >
                      {/* Window Title Bar */}
                      <div
                        className={`flex h-8 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r ${item.accentGradient} px-3`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3.5 w-3.5 border border-[#333]"
                            style={{ backgroundColor: item.accentColor }}
                          />
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222]">
                            {item.exeName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="border border-[#333] bg-white px-1.5 py-0.2 font-mono text-[8px] font-bold uppercase text-[#333]">
                            {item.badge}
                          </span>
                          <div className="flex h-4 w-4 items-center justify-center border border-[#555] bg-[#ff8ed8] text-[9px] font-bold text-black">
                            ×
                          </div>
                        </div>
                      </div>

                      {/* White Content Panel */}
                      <div className="bg-[#ffffff] p-4 sm:p-5">
                        <div className="flex items-start gap-3.5">
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#292929] bg-[#f2f2f2] text-[#8a2be2]"
                            style={{
                              boxShadow: "3px 3px 0 #ff1493",
                            }}
                          >
                            <Icon size={20} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="font-mono text-sm font-bold uppercase tracking-wide text-[#222]">
                              {item.title}
                            </h4>
                            <p className="mt-0.5 font-mono text-[11px] text-[#555]">
                              {item.line1}
                            </p>
                            <a
                              href={item.href}
                              target={item.id === "location" ? "_blank" : undefined}
                              rel={item.id === "location" ? "noopener noreferrer" : undefined}
                              className="mt-2 inline-block font-mono text-xs sm:text-sm font-bold text-[#8a2be2] underline decoration-[#ff1493] underline-offset-4 hover:text-[#ff1493] break-all transition-colors"
                            >
                              {item.value}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Light Status Bar */}
                      <div className="flex h-6 items-center justify-between border-t-2 border-[#292929] bg-[#dedede] px-3 font-mono text-[8px] uppercase tracking-wider text-[#444]">
                        <span>{item.port}</span>
                        <span className="flex items-center gap-1 font-bold text-[#8a2be2]">
                          <span className="h-1.5 w-1.5 bg-[#00bfff]" />
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