"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export type WinCardVariant =
  | "cyan"
  | "pink"
  | "purple"
  | "gold"
  | "emerald"
  | "silver"
  | "bronze"
  | "classic"
  | "default";

interface WinCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  variant?: WinCardVariant;
  showControls?: boolean;
  trackLabel?: string;
  statusText?: string;
  counterText?: string;
  onlineStatus?: boolean;
  subtitle?: string;
}

export default function WinCard({
  title = "SYSTEM_DIALOG.EXE // MAIN_MENU",
  children,
  className,
  headerClassName,
  bodyClassName,
  variant = "cyan",
  showControls = true,
  trackLabel,
  statusText = "BIT_STREAM://CONNECTED",
  counterText = "[ 1995.EXE | 01 / 01 ]",
  onlineStatus = true,
  subtitle,
}: WinCardProps) {
  // Mobile / Touch detection for fallback
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

  // Framer Motion 3D Physics Tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Rotational angles (max 12 deg tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Holographic Sheen Radial Gradient Coordinates (%)
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["10%", "90%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const pctX = mouseXPos / width - 0.5;
    const pctY = mouseYPos / height - 0.5;

    x.set(pctX);
    y.set(pctY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  // Vaporwave 5-color theme: #4B0082, #8A2BE2, #FF4FD8, #FF1493, #00FFFF
  const variantStyles = {
    cyan: {
      border: "border-[#00FFFF]",
      dropShadow: "shadow-[6px_6px_0px_0px_#FF1493]",
      headerGradient: "bg-gradient-to-r from-[#00FFFF] via-[#8A2BE2] to-[#FF4FD8]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#00FFFF1f",
    },
    pink: {
      border: "border-[#FF4FD8]",
      dropShadow: "shadow-[6px_6px_0px_0px_#00FFFF]",
      headerGradient: "bg-gradient-to-r from-[#FF4FD8] via-[#8A2BE2] to-[#00FFFF]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#FF4FD81f",
    },
    purple: {
      border: "border-[#8A2BE2]",
      dropShadow: "shadow-[6px_6px_0px_0px_#FF1493]",
      headerGradient: "bg-gradient-to-r from-[#8A2BE2] via-[#FF4FD8] to-[#00FFFF]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#8A2BE21f",
    },
    gold: {
      border: "border-[#00FFFF]",
      dropShadow: "shadow-[6px_6px_0px_0px_#FF1493]",
      headerGradient: "bg-gradient-to-r from-[#00FFFF] via-[#FF4FD8] to-[#8A2BE2]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#00FFFF1f",
    },
    emerald: {
      border: "border-[#00FFFF]",
      dropShadow: "shadow-[6px_6px_0px_0px_#FF4FD8]",
      headerGradient: "bg-gradient-to-r from-[#00FFFF] via-[#8A2BE2] to-[#FF1493]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#00FFFF1f",
    },
    silver: {
      border: "border-slate-300",
      dropShadow: "shadow-[6px_6px_0px_0px_#FF1493]",
      headerGradient: "bg-gradient-to-r from-slate-200 via-[#8A2BE2] to-[#00FFFF]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#ffffff1f",
    },
    bronze: {
      border: "border-[#FF4FD8]",
      dropShadow: "shadow-[6px_6px_0px_0px_#8A2BE2]",
      headerGradient: "bg-gradient-to-r from-[#FF4FD8] via-[#FF1493] to-[#8A2BE2]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#FF4FD81f",
    },
    classic: {
      border: "border-[#00FFFF]",
      dropShadow: "shadow-[6px_6px_0px_0px_#FF1493]",
      headerGradient: "bg-gradient-to-r from-[#00FFFF] via-[#8A2BE2] to-[#FF4FD8]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#00FFFF1f",
    },
    default: {
      border: "border-[#00FFFF]",
      dropShadow: "shadow-[6px_6px_0px_0px_#FF1493]",
      headerGradient: "bg-gradient-to-r from-[#00FFFF] via-[#8A2BE2] to-[#FF4FD8]",
      titleText: "text-black font-extrabold font-heading",
      squareIcon: "text-black",
      gridColor: "#00FFFF1f",
    },
  };

  const style = variantStyles[variant] || variantStyles.cyan;
  const cleanTitle = title.replace(/\.[^/.]+$/, "");
  const defaultTrackLabel = subtitle ? subtitle.toUpperCase() : cleanTitle.toUpperCase();

  return (
    <div className="perspective-[1000px] w-full h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isPressed ? 0.98 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={cn(
          "group relative bg-[#4B0082] border-[1.5px] transition-shadow duration-300 select-none flex flex-col justify-between h-full font-body will-change-transform",
          style.border,
          style.dropShadow,
          className
        )}
      >
        {/* Holographic Sheen Overlay */}
        {!isTouchDevice && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.18), transparent 60%)`
              ),
            }}
          />
        )}

        {/* 1. Vaporwave Sunset Duotone Title Bar Header (Z-Offset: 20px) */}
        <div
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          className={cn(
            "px-3 py-2 flex items-center justify-between text-xs tracking-wider border-b border-black/20 select-none shrink-0 font-subheading",
            style.headerGradient,
            headerClassName
          )}
        >
          <div className="flex items-center gap-2 truncate pr-2" style={{ transform: "translateZ(10px)" }}>
            <span className={cn("text-[10px] leading-none", style.squareIcon)}>■</span>
            <span className={cn("truncate tracking-wider text-xs uppercase font-heading", style.titleText)}>
              {title}
            </span>
          </div>

          {/* Retro Win95-style Chunky Square Control Buttons (_ □ ×) */}
          {showControls && (
            <div className="flex items-center gap-1.5 flex-shrink-0 font-subheading" style={{ transform: "translateZ(10px)" }}>
              <button
                type="button"
                tabIndex={-1}
                className="w-5 h-5 bg-[#2D0052] border border-white/40 text-gray-200 hover:text-white flex items-center justify-center text-[10px] transition-colors"
                title="Minimize"
              >
                _
              </button>
              <button
                type="button"
                tabIndex={-1}
                className="w-5 h-5 bg-[#2D0052] border border-white/40 text-gray-200 hover:text-white flex items-center justify-center text-[10px] transition-colors"
                title="Maximize"
              >
                □
              </button>
              <button
                type="button"
                tabIndex={-1}
                className="w-5 h-5 bg-[#FF1493] text-white border border-white/50 flex items-center justify-center text-[10px] font-extrabold hover:bg-[#FF4FD8] transition-colors"
                title="Close"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* 2. Screen Viewport Canvas Area (Z-Offset: 0px) */}
        <div
          style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
          className={cn(
            "p-5 md:p-6 bg-[#2D0052] border border-[#8A2BE2]/40 relative overflow-hidden flex-1 flex flex-col justify-between font-body",
            bodyClassName
          )}
        >
          {/* Wireframe Grid Texture Layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, ${style.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${style.gridColor} 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
          />

          {/* Internal Content Container preserving 3D space */}
          <div style={{ transformStyle: "preserve-3d" }} className="relative z-10 w-full h-full flex flex-col justify-between">
            {children}
          </div>
        </div>

        {/* 3. Telemetry Footer & HUD Detailing (Z-Offset: 15px) */}
        <div
          style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}
          className="px-3 py-2 bg-[#21003D] border-t border-white/10 font-subheading text-[11px] text-gray-300 space-y-1 shrink-0"
        >
          {/* Row 1: Left item tag & Right status */}
          <div className="flex items-center justify-between">
            <span className="text-[#00FFFF] font-bold tracking-wider uppercase font-subheading">
              {trackLabel || defaultTrackLabel}
            </span>
            <div className="flex items-center gap-1.5 text-[#00FFFF] font-bold text-[10px] tracking-widest font-subheading">
              {onlineStatus && (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse shadow-[0_0_8px_#00FFFF]" />
                  <span>ONLINE // CONNECTED</span>
                </>
              )}
            </div>
          </div>

          {/* Row 2: Status link & Index Counter */}
          <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400 font-subheading">
            <span className="tracking-wider text-gray-400 uppercase">{statusText}</span>
            <span className="text-[#FF4FD8] font-semibold">{counterText}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
