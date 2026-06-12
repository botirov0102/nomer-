import React from "react";
import { PlateConfig } from "../types";
import UzbekistanFlag from "./UzbekistanFlag";

interface PlatePreviewProps {
  config: PlateConfig;
  scale?: number; // Scaling factor for UI
  showScrews?: boolean; // Toggle decorative mounting screws
  width?: number; // Optional custom physical width in pixels
  height?: number; // Optional custom physical height in pixels
}

export default function PlatePreview({
  config,
  scale = 1,
  showScrews = true,
  width,
  height,
}: PlatePreviewProps) {
  const { numbers, letters, region, bgType } = config;

  // Background style classes or gradients
  let bgClass = "";
  let textClass = "";
  let borderClass = "";
  let lineClass = "";

  switch (bgType) {
    case "classic":
      bgClass = "bg-white";
      textClass = "text-slate-950";
      borderClass = "border-slate-950";
      lineClass = "bg-slate-950";
      break;
    case "dark":
      bgClass = "bg-gradient-to-br from-neutral-900 to-neutral-950";
      textClass = "text-white";
      borderClass = "border-neutral-100";
      lineClass = "bg-neutral-100/90";
      break;
    case "yellow":
      bgClass = "bg-amber-400";
      textClass = "text-slate-950";
      borderClass = "border-slate-950";
      lineClass = "bg-slate-950";
      break;
    case "electric":
      bgClass = "bg-emerald-400";
      textClass = "text-slate-950";
      borderClass = "border-slate-950";
      lineClass = "bg-slate-950";
      break;
    case "gold":
      bgClass = "bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600";
      textClass = "text-slate-950 font-extrabold";
      borderClass = "border-amber-950";
      lineClass = "bg-amber-950";
      break;
    case "carbon":
      bgClass = "bg-neutral-900 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px]";
      textClass = "text-cyan-400 font-bold tracking-wide select-none";
      borderClass = "border-cyan-400";
      lineClass = "bg-cyan-405 bg-cyan-400";
      break;
    case "pink":
      bgClass = "bg-pink-500";
      textClass = "text-white";
      borderClass = "border-white";
      lineClass = "bg-white";
      break;
  }

  // Base dimension (e.g. 350px width, 280px height of the actual plate)
  const plateWidth = width ?? (350 * scale);
  const plateHeight = height ?? (280 * scale);

  // Render Uzbekistan label with flag
  return (
    <div
      style={{
        width: `${plateWidth}px`,
        height: `${plateHeight}px`,
        fontSize: `${scale * 16}px`,
      }}
      className={`relative select-none rounded-[16px] border-[5px] flex flex-col justify-between overflow-hidden p-[8px] transition-all duration-300 ${bgClass} ${borderClass} shadow-xl`}
    >
      {/* Glossy Overlay for realism */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/15 rounded-[12px]" />

      {/* Plate Internal border - typical of license plates */}
      <div
        className={`absolute inset-[3px] rounded-[10px] border-[1.5px] pointer-events-none ${borderClass} opacity-60`}
      />

      {/* Decorative Mounting Screw Holes */}
      {showScrews && (
        <>
          {/* Top Left Hole */}
          <div className="absolute top-[16px] left-[16px] w-[14px] h-[14px] rounded-full bg-linear-to-b from-gray-300 to-gray-600 border border-gray-900 flex items-center justify-center shadow-xs">
            <div className="w-[4px] h-[4px] bg-gray-950 rounded-full" />
          </div>
          {/* Top Right Hole */}
          <div className="absolute top-[16px] right-[16px] w-[14px] h-[14px] rounded-full bg-linear-to-b from-gray-300 to-gray-600 border border-gray-900 flex items-center justify-center shadow-xs">
            <div className="w-[4px] h-[4px] bg-gray-950 rounded-full" />
          </div>
        </>
      )}

      {/* Core License plate grid division */}
      <div className="w-full h-full flex mt-[4px]">
        {/* Left wider section (Top: Digits, Bottom: Letters) */}
        <div className="w-[70%] flex flex-col justify-center items-center h-full relative pl-[10px]">
          {/* Digits row */}
          <div
            style={{ fontSize: `${scale * 5.2}rem`, lineHeight: 1 }}
            className={`font-plate font-extrabold tracking-widest leading-none ${textClass} select-all`}
          >
            {numbers || "000"}
          </div>

          {/* Spacer */}
          <div className="h-[2px] w-4/5 my-[6px] opacity-10" />

          {/* Letters row */}
          <div
            style={{ fontSize: `${scale * 4.6}rem`, lineHeight: 1 }}
            className={`font-plate font-bold tracking-widest leading-none ${textClass} select-all uppercase`}
          >
            {letters || "MMM"}
          </div>
        </div>

        {/* Vertical Separator Line */}
        <div className={`w-[3px] h-full ${lineClass} rounded-full`} />

        {/* Right narrower section (Top: Region Code, Bottom: Flag + UZ) */}
        <div className="w-[30%] flex flex-col h-full">
          {/* Top right side: Region code */}
          <div className="h-[55%] flex items-center justify-center border-b-[3px] border-inherit">
            <div
              style={{ fontSize: `${scale * 4.4}rem`, lineHeight: 1 }}
              className={`font-plate font-extrabold leading-none ${textClass} select-all`}
            >
              {region || "00"}
            </div>
          </div>

          {/* Bottom right side: Flag and Country Code */}
          <div className="h-[45%] flex flex-col items-center justify-center gap-[4px] pt-[6px]">
            {/* Uzbekistan Flag */}
            <UzbekistanFlag
              width={scale * 56}
              height={scale * 33}
              className="shadow-sm border-[1px] border-black/20"
            />
            {/* Country code (UZ) */}
            <span
              style={{ fontSize: `${scale * 1.5}rem` }}
              className={`font-display font-extrabold tracking-wider leading-none select-none ${textClass}`}
            >
              UZ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
