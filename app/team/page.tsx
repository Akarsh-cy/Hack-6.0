"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, ArrowLeft, Users } from "lucide-react";
import localFont from "next/font/local";
import { motion, AnimatePresence } from "framer-motion";
import TiltedInfoCard from "@/components/TiltedInfoCard";

const Hacked_KerX = localFont({
  src: "../../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
  fallback: ["monospace", "sans-serif"],
});

interface TeamMember {
  name: string;
  batch: string;
  imgSrc: string;
}

const teamMembers: TeamMember[] = [
  // 2022 Batch
  {
    name: "Tanishq Verma",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945246/IMG_20240414_053937_668_nbxfaq.jpg",
  },
  {
    name: "Krishna Narzary",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1728579687/krishna_zp05q6.jpg",
  },
  {
    name: "Tanishq Chauhan",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945307/IMG_20231001_124926_evwtzl.jpg",
  },
  {
    name: "Shryansh",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738136152/csec_shry_kwh5tn.jpg",
  },
  {
    name: "Harshal",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738079965/Harshal_1_ljrjiy.jpg",
  },
  {
    name: "Kirti Sharma",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080065/IMG-20241110-WA0018_1_anaulw.jpg",
  },
  {
    name: "Arshita",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945377/IMG_20240920_223145_tc4rbp.jpg",
  },
  {
    name: "Prince Jaiswal",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945441/IMG_20230720_192947_flr5wg.jpg",
  },
  {
    name: "Aditya Kumar",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080338/IMG_0237_beywm0.jpg",
  },
  {
    name: "Tanmay Sharma",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dnif0edly/image/upload/v1728535568/IMG-20240307-WA0033_mfojpp.jpg",
  },
  {
    name: "Ankush Thakur",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080439/IMG_20240720_122823_ikkncj.jpg",
  },
  {
    name: "Arnav Gupta",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080697/e6a54564-6a33-48e1-ac19-e847758fd349_hqfhh8.jpg",
  },
  {
    name: "Avinash Sharma",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1739191084/AVIN_exe_uu0yqx_k2wamg.webp",
  },
  {
    name: "Himanshu Gupta",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1739194635/WhatsApp_Image_2025-02-10_at_18.19.54_eddb4d72_dah6jq.jpg",
  },
  {
    name: "Akash Kanwar",
    batch: "2022",
    imgSrc:
        "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1739960542/akash_bqdy3d.jpg",
  },

  // 2023 Batch
  {
    name: "Isha",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080640/IMG_5198_xz4pzl.jpg",
  },
  {
    name: "Chhavi Thakur",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726944805/IMG-20240308-WA0077_nq107z.jpg",
  },
  {
    name: "Lakshay Lalia",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080749/IMG_20241101_171749_392_auyw2u.jpg",
  },
  {
    name: "Saksham Chhabra",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1741525859/IMG-20240323-WA0015_dcsbh7_exdrze.jpg",
  },
  {
    name: "Navdeep Singh",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726944985/IMG_4625-1_xkfqoy.jpg",
  },
  {
    name: "Piyush",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945016/24-09-20_14-31-12-521_nop1fo.jpg",
  },
  {
    name: "Prince Khandelwal",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945058/IMG-20240920-WA0013_l6p9tg.jpg",
  },
  {
    name: "Piyush Mishra",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738138149/IMG-20250112-WA0084_akkh6m.jpg",
  },
  {
    name: "Ayush Sharma",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945095/IMG-20240513-WA0233_jgmvog.jpg",
  },
  {
    name: "Avirat Mahajan",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945139/IMG-20240410-WA0016_eow17z.jpg",
  },
  {
    name: "Vansh Pal",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738080858/WIN_20240415_20_11_54_Pro_zw1squ.jpg",
  },
  {
    name: "Sujal Choudhary",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738091293/sujal_sosrec_ghouip.jpg",
  },
  {
    name: "Anshuman Kapoor",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1728535411/anshuman_ugy7ne.jpg",
  },
  {
    name: "Abhay Chaudhary",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738081032/IMG-20240920-WA0002_kxrj0r.jpg",
  },
  {
    name: "Aanya Soni",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738082046/IMG_5200_uwq9wi.jpg",
  },
  {
    name: "Himanshu Mahajan",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dnbf0uwku/image/upload/v1726945205/formal_oi5vpb.jpg",
  },
  {
    name: "Ishan Choudhary",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738082088/IMG_20240921_005315_qwh3dd.jpg",
  },
  {
    name: "Harsh Goel",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1731838897/WhatsApp_Image_2024-11-17_at_15.51.00_2b583045_kqcd5x.jpg",
  },
  {
    name: "pratyush pragyey",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dvnrlqqpq/image/upload/v1721114549/rptdgsgi7qzijyojnja0.jpg",
  },
  {
    name: "Rudesh Kumar",
    batch: "2023",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738082144/photo_k91tqe.jpg",
  },

  // 2024 Batch
  {
    name: "Lavish",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/duezus2xn/image/upload/v1738075460/lavish_mupjh3.jpg",
  },
  {
    name: "Prashant Thakur",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/duezus2xn/image/upload/v1738075650/prashant_2_vsdpsb.jpg",
  },
  {
    name: "Aryan Sharma",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738087174/IMG_20241120_152145246_HDR_pavhc9.jpg",
  },
  {
    name: "Sanket Singh Sameer",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738087686/1000156654-01_ridyfs.jpg",
  },
  {
    name: "Raman Bansal",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738088074/profile_badm2f.jpg",
  },
  {
    name: "Utkarsh Shukla",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738088144/IMG-20241220-WA0110_qptedf.jpg",
  },
  {
    name: "Anshu Kumari",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738134087/IMG_20250128_201927_kwt4vg.jpg",
  },
  {
    name: "Avadhi",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738134129/20250128_204711_h36r6t.jpg",
  },
  {
    name: "Anilove",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738088682/IMG20241110215944_qx4ejt.jpg",
  },
  {
    name: "Bhola Prasad Sah",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738088411/1738076772514_ql73vg.jpg",
  },
  {
    name: "Tanmay Singh",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738134170/IMG-20240818-WA0002_dolerx.jpg",
  },
  {
    name: "Tanisha",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738088626/IMG_20241207_155127_mls1zh.jpg",
  },
  {
    name: "Aakriti",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738089007/IMG_20250128_235644_197_yttpst.jpg",
  },
  {
    name: "Chetna Singh",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738134304/c823d071-af30-45a7-9182-a85015e0cb33_fn17g3.jpg",
  },
  {
    name: "Divyam",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738134704/WhatsApp_Image_2024-11-10_at_10.47.39_PM_lpvlpg.jpg",
  },
  {
    name: "Sujal",
    batch: "2024",
    imgSrc:
        "https://res.cloudinary.com/dkcrhkz4m/image/upload/v1738089730/IMG_20241030_184111_nlzhqz.jpg",
  },
];

const getRole = (batch: string) => {
  switch (batch) {
    case "2024":
      return "Member";
    case "2023":
      return "Executive";
    case "2022":
      return "Lead";
    default:
      return "Team Member";
  }
};

const getRoleBadgeStyle = (batch: string) => {
  switch (batch) {
    case "2022":
      return "bg-[#8a2be2] text-white border-[#8a2be2]";
    case "2023":
      return "bg-[#ff1493] text-white border-[#ff1493]";
    case "2024":
      return "bg-[#00ffff] text-black border-[#00ffff]";
    default:
      return "bg-[#eeeeee] text-[#222] border-[#292929]";
  }
};

function WindowControls() {
  return (
      <div className="flex gap-[3px]">
        <div className="flex h-[16px] w-[16px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[8px] leading-none text-[#222]">
          _
        </div>
        <div className="flex h-[16px] w-[16px] items-center justify-center border border-[#555] bg-[#f2f2f2] text-[7px] leading-none text-[#222]">
          □
        </div>
        <div className="flex h-[16px] w-[16px] items-center justify-center border border-[#555] bg-[#ff8ed8] text-[8px] font-bold leading-none text-black">
          ×
        </div>
      </div>
  );
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
      <TiltedInfoCard rotateAmplitude={10} scaleOnHover={1.03} className="w-full h-full">
        <div className="group relative w-full h-full flex flex-col">
          {/* Cyan offset layer */}
          <div className="pointer-events-none absolute -right-1.5 -bottom-1.5 left-1.5 top-1.5 border-2 border-[#00ffff]" />

          {/* Pink offset layer */}
          <div className="pointer-events-none absolute -top-1.5 right-1.5 -bottom-1 left-[-4px] border-2 border-[#ff1493]" />

          {/* Main Light Retro Window Container */}
          <div
              className="relative overflow-hidden border-2 border-[#292929] bg-[#eeeeee] flex flex-col justify-between h-full"
              style={{
                boxShadow: "5px 5px 0 #8a2be2, -3px -3px 0 #ff1493",
              }}
          >
            {/* Classic Title Bar */}
            <div className="flex h-9 items-center justify-between border-b-2 border-[#292929] bg-gradient-to-r from-[#ff8ed8] via-[#ffc5ee] to-[#eeeeee] px-2.5">
              <div className="flex items-center gap-1.5">
                <div className="relative h-4 w-4 border border-[#555] bg-[#ff9edc] shadow-[1px_1px_0_#00ffff]">
                  <div className="ml-[2px] mt-[2px] h-[5px] w-[7px] bg-[#8a2be2]" />
                </div>
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-[#222] truncate max-w-[130px] sm:max-w-[160px]">
                MEMBER_{String(index + 1).padStart(2, "0")}.EXE
              </span>
              </div>

              <WindowControls />
            </div>

            {/* Member Photo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e0e0e0] border-b-2 border-[#292929]">
              <img
                  src={imgError ? "/placeholder.svg" : member.imgSrc}
                  alt={member.name}
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Subtle vaporwave wash & scanlines overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.6) 3px)",
                  }}
              />

              {/* Top Right Batch Tag Overlay */}
              <div className="absolute top-2.5 right-2.5">
              <span className="border-2 border-[#292929] bg-white px-2 py-0.5 font-mono text-[9px] font-bold text-[#222] shadow-[2px_2px_0_#00ffff]">
                BATCH {member.batch}
              </span>
              </div>
            </div>

            {/* Info Details Panel */}
            <div className="bg-white p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="h-2.5 w-2.5 border border-[#333] bg-[#ff1493]" />
                  <h3 className="font-mono text-base sm:text-lg font-bold text-[#222] truncate">
                    {member.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span
                    className={`inline-block border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${getRoleBadgeStyle(
                        member.batch
                    )}`}
                >
                  {getRole(member.batch)}
                </span>
                  <span className="inline-block border border-[#ccc] bg-[#f8f8f8] px-2 py-0.5 font-mono text-[10px] text-[#666]">
                  CSE // NITH
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltedInfoCard>
  );
}

export default function Team() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filteredMembers = useMemo(() => {
    return selectedYear
        ? teamMembers.filter((member) => Number(member.batch) === selectedYear)
        : teamMembers;
  }, [selectedYear]);

  const yearFilters = [
    { label: "All Members", value: null, count: teamMembers.length },
    {
      label: "Lead Organizers (2022)",
      value: 2022,
      count: teamMembers.filter((m) => m.batch === "2022").length,
    },
    {
      label: "Executive Committee (2023)",
      value: 2023,
      count: teamMembers.filter((m) => m.batch === "2023").length,
    },
    {
      label: "Team Members (2024)",
      value: 2024,
      count: teamMembers.filter((m) => m.batch === "2024").length,
    },
  ];

  return (
      <div id="team" className="min-h-screen text-[#222] relative">
        {/* Top Cyber Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-[#292929] bg-[#eeeeee]/95 backdrop-blur-md py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.a
                  href="https://csec.nith.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 sm:h-11 sm:w-11 border-2 border-[#292929] bg-white p-1 shadow-[3px_3px_0_#ff1493] flex items-center justify-center transition-transform hover:scale-105"
                  whileHover={{ rotate: 10 }}
              >
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/csec-RitzmBrgdmOMfzaijUqHFSmOVA4LzO.png"
                    alt="CSEC Logo"
                    className="h-full w-full object-contain"
                />
              </motion.a>

              <div>
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#222] block">
                CSEC // NITH
              </span>
                <span className="font-mono text-[9px] text-[#8a2be2] font-semibold tracking-wide hidden sm:block">
                COMPUTER SCIENCE ENGINEERS' COMMUNITY
              </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 border-2 border-[#292929] bg-white hover:bg-[#ff8ed8] px-3 sm:px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#222] shadow-[3px_3px_0_#00ffff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
              >
                <ArrowLeft size={13} />
                <span>RETURN_ROOT</span>
              </Link>

              <div className="hidden md:flex items-center">
              <span
                  className={`text-2xl lg:text-3xl font-bold text-white drop-shadow-[2px_2px_0_#8a2be2] ${Hacked_KerX.className}`}
              >
                HACK <span className="text-[#ff1493]">6.0</span>
              </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Page Container */}
        <div className="container mx-auto px-4 sm:px-6 pt-32 pb-24 max-w-7xl">
          {/* Section Header */}
          <div className="mb-14 text-center">
            {/* Retro Pill Badge */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 border-2 border-[#333] bg-white px-5 py-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#333] shadow-[5px_5px_0_#ff1493]">
              <span className="h-3 w-3 border border-[#333] bg-[#8a2be2]" />
              SYSTEM_DIRECTORY://COMPLETE_TEAM
            </div>

            <h1
                className={`mb-4 text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-[4px_4px_0_#8a2be2] ${Hacked_KerX.className}`}
            >
              Team <span className="text-[#ff1493]">CSEC</span>
            </h1>

            <div className="mx-auto mt-4 h-[3px] w-28 bg-gradient-to-r from-[#00ffff] via-[#8a2be2] to-[#ff1493]" />

            <p className="mx-auto mt-5 max-w-2xl font-mono text-xs sm:text-sm md:text-base text-[#ffffff] font-semibold leading-relaxed">
              Meet the passionate individuals who drive innovation, creativity, and technological excellence across HACK 6.0.
            </p>
          </div>

          {/* Retro Filter Bar Container */}
          <div className="mb-14">
            <div className="mx-auto max-w-4xl border-2 border-[#292929] bg-[#eeeeee] p-4 sm:p-5 shadow-[5px_5px_0_#8a2be2]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#222]">
                  <Filter size={15} className="text-[#8a2be2]" />
                  <span>FILTER_BY_BATCH:</span>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                  {yearFilters.map((filter) => {
                    const isActive = selectedYear === filter.value;
                    return (
                        <button
                            key={filter.label}
                            onClick={() => setSelectedYear(filter.value)}
                            className={`cursor-pointer border-2 border-[#292929] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                                isActive
                                    ? "bg-[#ff4fd8] text-white shadow-[3px_3px_0_#00ffff] -translate-y-0.5"
                                    : "bg-white text-[#222] shadow-[2px_2px_0_#d9a7f0] hover:bg-[#fff0fa] hover:border-[#8a2be2] hover:shadow-[3px_3px_0_#ff1493]"
                            }`}
                        >
                          <span>{filter.label}</span>
                          <span
                              className={`ml-1.5 px-1.5 py-0.2 text-[10px] font-bold ${
                                  isActive ? "bg-white text-[#ff1493]" : "bg-[#eeeeee] text-[#555]"
                              }`}
                          >
                        {filter.count}
                      </span>
                        </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Responsive Grid */}
          <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-8"
          >
            <AnimatePresence>
              {filteredMembers.map((member, index) => (
                  <motion.div
                      key={member.name}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: index * 0.02 }}
                      className="h-full"
                  >
                    <MemberCard member={member} index={index} />
                  </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Return To Main Page Section */}
          <div className="mt-20 pt-10 border-t-2 border-[#4b0082] text-center">
            <div className="mx-auto max-w-xl border-2 border-[#292929] bg-[#eeeeee] p-6 shadow-[5px_5px_0_#4b0082]">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users size={18} className="text-[#8a2be2]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#222]">
                WANT TO CONNECT WITH OUR TEAM?
              </span>
              </div>

              <p className="font-mono text-xs text-[#555] mb-5 leading-relaxed">
                Reach out through our transmission channels on the main terminal or join our official Discord server.
              </p>

              <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 border-2 border-[#292929] bg-[#00ffff] hover:bg-[#33ffff] px-6 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-black shadow-[4px_4px_0_#ff1493] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>[ TRANSMIT MESSAGE ON CONTACT GRID ]</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}