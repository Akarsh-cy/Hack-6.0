"use client";

import React, { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    if (form.current) {
      emailjs
        .sendForm("service_td08y99", "template_l4lxqnr", form.current, {
          publicKey: "3CF_8jifTQV-loMu_",
        })
        .then(
          (result) => {
            console.log(result.text);
            setSubmitSuccess(true);
            setFormData({
              name: "",
              email: "",
              subject: "",
              message: "",
            });
            setIsSubmitting(false);
          },
          (error) => {
            console.error(error.text);
            setSubmitError(true);
            setIsSubmitting(false);
          }
        );
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-[#18112d] via-[#241344] to-[#45185d] relative overflow-hidden select-none"
    >
      {/* Ambient Radial Lighting & Scanline Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#ff2a85]/15 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00f0ff]/15 rounded-full filter blur-[150px]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 42, 133, 0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-subheading font-extrabold uppercase tracking-[0.2em] text-[#00f0ff] mb-4">
            <span>◆</span>
            <span>CONTACT_PROTOCOL // DISPATCH</span>
            <span>◆</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-[0.15em] text-white">
            G E T  I N{" "}
            <span className="bg-gradient-to-r from-[#ff2a85] via-[#b967ff] to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,42,133,0.8)]">
              T O U C H
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base font-body text-gray-200 max-w-xl mx-auto tracking-wider">
            SYSTEM_DISPATCH://DIRECT_COMMS — Send a command transmission or connect directly with our operational nodes.
          </p>
        </motion.div>

        {/* 2-Column Main Layout Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* LEFT SIDE (7 Cols): Main Terminal Window "DISPATCH_MESSAGE.EXE" */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="bg-[#f4f4f6] border-2 border-[#1e1e2f] shadow-[6px_6px_0px_0px_#ff2a85] font-body relative overflow-hidden">
              {/* OS Titlebar */}
              <div className="bg-gradient-to-r from-[#ff71ce] via-[#fbcfe8] to-[#f4f4f6] px-3 py-2 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                  <span className="font-subheading font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                    DISPATCH_MESSAGE.EXE
                  </span>
                </div>

                {/* Retro OS Window Buttons (_ □ ×) inside pink box */}
                <div className="flex items-center gap-1.5 flex-shrink-0 font-subheading">
                  <span className="w-5 h-5 bg-[#2D0052] border border-[#1e1e2f] text-gray-200 flex items-center justify-center text-[10px]">
                    _
                  </span>
                  <span className="w-5 h-5 bg-[#2D0052] border border-[#1e1e2f] text-gray-200 flex items-center justify-center text-[10px]">
                    □
                  </span>
                  <span className="w-5 h-5 bg-[#ff2a85] text-white border border-[#1e1e2f] flex items-center justify-center text-[10px] font-extrabold">
                    ×
                  </span>
                </div>
              </div>

              {/* Sub-Header Status Strip */}
              <div className="px-3 py-1.5 bg-[#e2e8f0] border-b border-[#cbd5e1] flex items-center justify-between text-[11px] font-subheading text-[#475569] select-none">
                <span className="tracking-wider">■ PROTOCOL: HTTPS_SECURE</span>
                <span className="text-[#00c2cb] font-bold tracking-wider">
                  ■ DISPATCH_NODE: ONLINE
                </span>
              </div>

              {/* Form Content Area */}
              <form ref={form} onSubmit={sendEmail} className="p-5 md:p-6 space-y-4">
                {/* Status Feedback Messages */}
                {submitSuccess && (
                  <div className="p-3 bg-[#05ffa1]/20 border-2 border-[#05ffa1] text-[#006633] font-subheading text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00a86b] shrink-0" />
                    <span>■ TRANSMISSION SENT SUCCESSFULLY // NODE ACKNOWLEDGED</span>
                  </div>
                )}

                {submitError && (
                  <div className="p-3 bg-[#ff2a85]/20 border-2 border-[#ff2a85] text-[#990033] font-subheading text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#ff2a85] shrink-0" />
                    <span>■ TRANSMISSION FAILED // RETRY PROTOCOL</span>
                  </div>
                )}

                {/* 2-Column Row: SENDER_NAME & SENDER_EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-subheading font-bold text-xs text-[#1e1e2f] mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                      <span className="text-[#ff2a85] font-extrabold">&gt;</span> SENDER_NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Chen"
                      className="w-full bg-white border-2 border-[#1e1e2f] px-3 py-2.5 font-subheading text-xs text-[#1e1e2f] placeholder:text-[#94a3b8] focus:border-[#ff2a85] focus:outline-none transition-colors rounded-none"
                    />
                  </div>

                  <div>
                    <label className="font-subheading font-bold text-xs text-[#1e1e2f] mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                      <span className="text-[#ff2a85] font-extrabold">&gt;</span> SENDER_EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@domain.com"
                      className="w-full bg-white border-2 border-[#1e1e2f] px-3 py-2.5 font-subheading text-xs text-[#1e1e2f] placeholder:text-[#94a3b8] focus:border-[#ff2a85] focus:outline-none transition-colors rounded-none"
                    />
                  </div>
                </div>

                {/* Full-width: SUBJECT_HEADER */}
                <div>
                  <label className="font-subheading font-bold text-xs text-[#1e1e2f] mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                    <span className="text-[#ff2a85] font-extrabold">&gt;</span> SUBJECT_HEADER
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Hackathon Track Query / Sponsor Opportunity"
                    className="w-full bg-white border-2 border-[#1e1e2f] px-3 py-2.5 font-subheading text-xs text-[#1e1e2f] placeholder:text-[#94a3b8] focus:border-[#ff2a85] focus:outline-none transition-colors rounded-none"
                  />
                </div>

                {/* Full-width Textarea: MESSAGE_PAYLOAD */}
                <div>
                  <label className="font-subheading font-bold text-xs text-[#1e1e2f] mb-1.5 flex items-center gap-1 uppercase tracking-wider">
                    <span className="text-[#ff2a85] font-extrabold">&gt;</span> MESSAGE_PAYLOAD
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your transmission here..."
                    className="w-full bg-white border-2 border-[#1e1e2f] px-3 py-2.5 font-subheading text-xs text-[#1e1e2f] placeholder:text-[#94a3b8] focus:border-[#ff2a85] focus:outline-none transition-colors rounded-none resize-none"
                  />
                </div>

                {/* Action CTA Button: TRANSMIT MESSAGE */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#ff2a85] to-[#7928ca] text-white font-subheading font-extrabold text-xs sm:text-sm tracking-[0.15em] uppercase py-3 px-6 border-2 border-[#1e1e2f] shadow-[4px_4px_0px_0px_#00f0ff] hover:brightness-110 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>
                      {isSubmitting ? "[ ⌛ TRANSMITTING... ]" : "[ ✈ TRANSMIT MESSAGE ]"}
                    </span>
                  </button>
                </div>
              </form>

              {/* Bottom Footer Strip */}
              <div className="px-3 py-2 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center justify-between text-[11px] font-subheading text-[#475569] select-none">
                <span className="text-[#00c2cb] font-bold tracking-wider">
                  ■ SYSTEM ONLINE
                </span>
                <span className="tracking-wider text-[#64748b]">
                  HACK 6.0 // NIT HAMIRPUR
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (5 Cols): Stack of 3 OS Info Widgets */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-5">
            {/* CARD 1: EMAIL DISPATCH */}
            <div className="bg-[#f4f4f6] border-2 border-[#1e1e2f] shadow-[6px_6px_0px_0px_#00f0ff] flex flex-col justify-between font-body relative overflow-hidden">
              {/* Titlebar */}
              <div className="bg-gradient-to-r from-[#00f0ff] via-[#b9f8fc] to-[#f4f4f6] px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                  <span className="font-subheading font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                    MAIL_CLIENT.EXE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-subheading font-bold text-[#1e1e2f] bg-white/70 px-2 py-0.5 rounded">
                    DIRECT_LINK
                  </span>
                  <span className="w-4 h-4 bg-[#00f0ff] text-[#1e1e2f] border border-[#1e1e2f] flex items-center justify-center text-[10px] font-bold">
                    ×
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f4f4f6] border-2 border-[#1e1e2f] shadow-[3px_3px_0px_0px_#ff2a85] flex items-center justify-center text-[#ff2a85] font-bold shrink-0">
                  <Mail className="w-5 h-5 text-[#ff2a85]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-[#1e1e2f] uppercase tracking-wide">
                    EMAIL DISPATCH
                  </h3>
                  <p className="font-body text-xs text-[#64748b] mt-0.5">
                    Questions or sponsor inquiries?
                  </p>
                  <a
                    href="mailto:hack.csec.nith26@gmail.com"
                    className="inline-block mt-1.5 text-[#00c2cb] font-subheading font-bold text-xs underline hover:text-[#ff2a85] transition-colors break-all"
                  >
                    hack.csec.nith26@gmail.com
                  </a>
                </div>
              </div>

              {/* Footer Metadata */}
              <div className="px-3 py-1.5 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center justify-between text-[10px] font-subheading text-[#475569] select-none">
                <span className="tracking-wider">PORT://443</span>
                <span className="text-[#00c2cb] font-bold tracking-wider">
                  ■ ONLINE
                </span>
              </div>
            </div>

            {/* CARD 2: VENUE LOCATION */}
            <div className="bg-[#f4f4f6] border-2 border-[#1e1e2f] shadow-[6px_6px_0px_0px_#ff2a85] flex flex-col justify-between font-body relative overflow-hidden">
              {/* Titlebar */}
              <div className="bg-gradient-to-r from-[#ff2a85] via-[#fbcfe8] to-[#f4f4f6] px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                  <span className="font-subheading font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                    VENUE_COORDINATES.EXE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-subheading font-bold text-[#1e1e2f] bg-white/70 px-2 py-0.5 rounded">
                    ONSITE_HUB
                  </span>
                  <span className="w-4 h-4 bg-[#ff2a85] text-white border border-[#1e1e2f] flex items-center justify-center text-[10px] font-bold">
                    ×
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f4f4f6] border-2 border-[#1e1e2f] shadow-[3px_3px_0px_0px_#00f0ff] flex items-center justify-center text-[#ff2a85] font-bold shrink-0">
                  <MapPin className="w-5 h-5 text-[#ff2a85]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-[#1e1e2f] uppercase tracking-wide">
                    VENUE LOCATION
                  </h3>
                  <p className="font-body text-xs text-[#64748b] mt-0.5">
                    Join us onsite at the arena
                  </p>
                  <a
                    href="https://maps.google.com/?q=NIT+Hamirpur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1.5 text-[#00c2cb] font-subheading font-bold text-xs underline hover:text-[#ff2a85] transition-colors"
                  >
                    NIT Hamirpur, HP - 177005
                  </a>
                </div>
              </div>

              {/* Footer Metadata */}
              <div className="px-3 py-1.5 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center justify-between text-[10px] font-subheading text-[#475569] select-none">
                <span className="tracking-wider">LOC://31.7084,76.5273</span>
                <span className="text-[#ff2a85] font-bold tracking-wider">
                  ■ ACTIVE
                </span>
              </div>
            </div>

            {/* CARD 3: HELPLINE COMMS */}
            <div className="bg-[#f4f4f6] border-2 border-[#1e1e2f] shadow-[6px_6px_0px_0px_#00f0ff] flex flex-col justify-between font-body relative overflow-hidden">
              {/* Titlebar */}
              <div className="bg-gradient-to-r from-[#00f0ff] via-[#b9f8fc] to-[#f4f4f6] px-3 py-1.5 border-b-2 border-[#1e1e2f] flex items-center justify-between select-none">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] text-[#1e1e2f] leading-none">■</span>
                  <span className="font-subheading font-bold text-xs uppercase text-[#1e1e2f] tracking-wider truncate">
                    VOICE_COMMS.EXE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-subheading font-bold text-[#1e1e2f] bg-white/70 px-2 py-0.5 rounded">
                    VOICE_LINK
                  </span>
                  <span className="w-4 h-4 bg-[#00f0ff] text-[#1e1e2f] border border-[#1e1e2f] flex items-center justify-center text-[10px] font-bold">
                    ×
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f4f4f6] border-2 border-[#1e1e2f] shadow-[3px_3px_0px_0px_#ff2a85] flex items-center justify-center text-[#ff2a85] font-bold shrink-0">
                  <Phone className="w-5 h-5 text-[#ff2a85]" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm text-[#1e1e2f] uppercase tracking-wide">
                    HELPLINE COMMS
                  </h3>
                  <p className="font-body text-xs text-[#64748b] mt-0.5">
                    Student &amp; Team Coordinators
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1 font-subheading font-bold text-xs">
                    <a
                      href="tel:+916267531322"
                      className="text-[#00c2cb] underline hover:text-[#ff2a85] transition-colors"
                    >
                      +91 62675 31322
                    </a>
                    <span className="text-[#64748b]">/</span>
                    <a
                      href="tel:+917023326128"
                      className="text-[#00c2cb] underline hover:text-[#ff2a85] transition-colors"
                    >
                      +91 70233 26128
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer Metadata */}
              <div className="px-3 py-1.5 bg-[#e2e8f0] border-t-2 border-[#1e1e2f] flex items-center justify-between text-[10px] font-subheading text-[#475569] select-none">
                <span className="tracking-wider">FREQ://91.5MHZ</span>
                <span className="text-[#00c2cb] font-bold tracking-wider">
                  ■ READY
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
