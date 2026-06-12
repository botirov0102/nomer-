import React from "react";
import { PlateConfig, REGIONS, SOUVENIR_IDEAS } from "../types";
import { Scissors, Sparkles, Sliders, ToggleLeft, Layers, Palette, RefreshCw } from "lucide-react";

interface PlateDesignerProps {
  plate1: PlateConfig;
  plate2: PlateConfig;
  onChangePlate1: (config: PlateConfig) => void;
  onChangePlate2: (config: PlateConfig) => void;
  syncPlates: boolean;
  onToggleSync: (sync: boolean) => void;
  showScrews: boolean;
  onToggleScrews: (show: boolean) => void;
  printGuide: boolean;
  onTogglePrintGuide: (show: boolean) => void;
}

export default function PlateDesigner({
  plate1,
  plate2,
  onChangePlate1,
  onChangePlate2,
  syncPlates,
  onToggleSync,
  showScrews,
  onToggleScrews,
  printGuide,
  onTogglePrintGuide,
}: PlateDesignerProps) {
  
  // Safe handler to update plate parameters
  const updatePlate1 = (updates: Partial<PlateConfig>) => {
    const nextConfig = { ...plate1, ...updates };
    onChangePlate1(nextConfig);
    if (syncPlates) {
      onChangePlate2(nextConfig);
    }
  };

  const updatePlate2 = (updates: Partial<PlateConfig>) => {
    const nextConfig = { ...plate2, ...updates };
    onChangePlate2(nextConfig);
  };

  const handleApplyPreset = (preset: typeof SOUVENIR_IDEAS[0]) => {
    const config: PlateConfig = {
      numbers: preset.numbers,
      letters: preset.letters,
      region: preset.region,
      bgType: preset.bgType as any,
      textColor: "", // dynamic based on type
      borderColor: "",
    };
    onChangePlate1(config);
    onChangePlate2(config);
  };

  const cleanNumbers = (val: string): string => {
    return val.replace(/\D/g, "").slice(0, 3);
  };

  const cleanLetters = (val: string): string => {
    return val.toUpperCase().replace(/[^A-ZА-Я']/gi, "").slice(0, 3);
  };

  const cleanRegion = (val: string): string => {
    return val.replace(/\D/g, "").slice(0, 2);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Sync & Plate Mode Selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold tracking-wider uppercase text-slate-700 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          Raqam Rejimi
        </h3>
        
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={syncPlates}
              onChange={(e) => onToggleSync(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded-sm"
              id="chk-sync-plates"
            />
            <div>
              <span className="text-slate-800 font-semibold text-sm block">Uchburchak / Egizak Nomerlar (Sinxron)</span>
              <span className="text-slate-500 text-xs">Old va orqa raqamlarni bir xil sozlama bilan yaratish</span>
            </div>
          </label>
        </div>
      </div>

      {/* 2. Presets/Tayyor g'oyalar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold tracking-wider uppercase text-slate-700 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Tayyor G'oyalar & Shablonlar
        </h3>
        <p className="text-slate-500 text-xs mb-3">
          Bir marta bosish orqali dizayn g'oyasini qo'llang:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {SOUVENIR_IDEAS.map((preset, index) => (
            <button
              key={index}
              onClick={() => handleApplyPreset(preset)}
              id={`preset-btn-${index}`}
              className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-semibold text-slate-800 text-left transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <span className="text-blue-600 font-bold group-hover:text-blue-700">{preset.label}</span>
              <span className="text-slate-700 font-mono mt-1 text-xs">
                {preset.numbers} {preset.letters} {preset.region}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. PLATE 1 SOZLAMALARI */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold tracking-wider uppercase text-slate-700 mb-4 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          {syncPlates ? "Asosiy Raqam Sozlamalari" : "Raqam 1 (Old) Sozlamalari"}
        </h3>

        <div className="flex flex-col gap-4">
          {/* Numbers input */}
          <div>
            <label className="text-slate-600 text-xs font-semibold block mb-1.5 justify-between">
              <span>Uch xonali raqam (masalan, 000, 777)</span>
            </label>
            <input
              type="text"
              id="input-plate1-numbers"
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-slate-800 font-mono text-xl tracking-widest text-center uppercase shadow-inner focus:outline-hidden transition-all"
              placeholder="777"
              value={plate1.numbers}
              maxLength={3}
              onChange={(e) => updatePlate1({ numbers: cleanNumbers(e.target.value) })}
            />
          </div>

          {/* Letters input */}
          <div>
            <label className="text-slate-600 text-xs font-semibold block mb-1.5">
              Uchta harf (masalan, VIP, UZB, MMM)
            </label>
            <input
              type="text"
              id="input-plate1-letters"
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-slate-800 font-mono text-xl tracking-widest text-center uppercase shadow-inner focus:outline-hidden transition-all"
              placeholder="VIP"
              value={plate1.letters}
              maxLength={3}
              onChange={(e) => updatePlate1({ letters: cleanLetters(e.target.value) })}
            />
          </div>

          {/* Region code input */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-600 text-xs font-semibold block mb-1.5">
                Viloyat kodi (01, 10, ...)
              </label>
              <input
                type="text"
                id="input-plate1-region"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-slate-800 font-mono text-xl tracking-widest text-center uppercase shadow-inner focus:outline-hidden transition-all"
                placeholder="01"
                value={plate1.region}
                maxLength={2}
                onChange={(e) => updatePlate1({ region: cleanRegion(e.target.value) })}
              />
            </div>

            {/* Region Helper Selector */}
            <div>
              <label className="text-slate-600 text-xs font-semibold block mb-1.5">
                Viloyatni tanlang
              </label>
              <select
                id="select-plate1-region"
                className="w-full h-[46px] bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-2 text-slate-700 text-xs text-center uppercase shadow-inner focus:outline-hidden transition-all"
                value={plate1.region}
                onChange={(e) => updatePlate1({ region: e.target.value })}
              >
                <option value="">Shou-kod</option>
                {REGIONS.map((reg) => (
                  <option key={reg.code} value={reg.code}>
                    {reg.code} - {reg.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Style selector */}
          <div>
            <label className="text-slate-600 text-xs font-semibold block mb-1.5 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              Nomer Rangining Dizayni
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => updatePlate1({ bgType: "classic" })}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                  plate1.bgType === "classic"
                    ? "bg-white text-black border-blue-500 ring-2 ring-blue-500"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Klassik
              </button>
              <button
                onClick={() => updatePlate1({ bgType: "dark" })}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                  plate1.bgType === "dark"
                    ? "bg-slate-900 text-white border-blue-500 ring-2 ring-blue-500"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Qora VIP
              </button>
              <button
                onClick={() => updatePlate1({ bgType: "yellow" })}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                  plate1.bgType === "yellow"
                    ? "bg-amber-405 bg-amber-450 text-black border-blue-500 ring-2 ring-blue-500"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Sariq
              </button>
              <button
                onClick={() => updatePlate1({ bgType: "electric" })}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                  plate1.bgType === "electric"
                    ? "bg-emerald-400 text-slate-950 border-blue-500 ring-2 ring-blue-500"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Yashil
              </button>
              <button
                onClick={() => updatePlate1({ bgType: "gold" })}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                  plate1.bgType === "gold"
                    ? "bg-yellow-500 text-slate-950 border-blue-500 ring-2 ring-blue-500"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Oltin
              </button>
              <button
                onClick={() => updatePlate1({ bgType: "carbon" })}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                  plate1.bgType === "carbon"
                    ? "bg-neutral-800 text-cyan-400 border-blue-500 ring-2 ring-blue-500"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Karbon
              </button>
              <button
                onClick={() => updatePlate1({ bgType: "pink" })}
                className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                  plate1.bgType === "pink"
                    ? "bg-pink-500 text-white border-blue-400 ring-2 ring-blue-400"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Pushti
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. INDEPENDENT PLATE 2 SETTINGS (ONLY IF NOT SYNCED) */}
      {!syncPlates && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs animate-fadeIn">
          <h3 className="text-sm font-bold tracking-wider uppercase text-slate-700 mb-4 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            Raqam 2 (Orqa) Sozlamalari
          </h3>

          <div className="flex flex-col gap-4">
            {/* Numbers input */}
            <div>
              <label className="text-slate-600 text-xs font-semibold block mb-1.5">
                Uch xonali raqam (masalan, 000, 777)
              </label>
              <input
                type="text"
                id="input-plate2-numbers"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-slate-800 font-mono text-xl tracking-widest text-center uppercase shadow-inner focus:outline-hidden transition-all"
                placeholder="777"
                value={plate2.numbers}
                maxLength={3}
                onChange={(e) => updatePlate2({ numbers: cleanNumbers(e.target.value) })}
              />
            </div>

            {/* Letters input */}
            <div>
              <label className="text-slate-600 text-xs font-semibold block mb-1.5">
                Uchta harf (masalan, VIP, UZB, MMM)
              </label>
              <input
                type="text"
                id="input-plate2-letters"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-slate-800 font-mono text-xl tracking-widest text-center uppercase shadow-inner focus:outline-hidden transition-all"
                placeholder="VIP"
                value={plate2.letters}
                maxLength={3}
                onChange={(e) => updatePlate2({ letters: cleanLetters(e.target.value) })}
              />
            </div>

            {/* Region code input */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 text-xs font-semibold block mb-1.5">
                  Viloyat kodi (01, 10, ...)
                </label>
                <input
                  type="text"
                  id="input-plate2-region"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-slate-800 font-mono text-xl tracking-widest text-center uppercase shadow-inner focus:outline-hidden transition-all"
                  placeholder="01"
                  value={plate2.region}
                  maxLength={2}
                  onChange={(e) => updatePlate2({ region: cleanRegion(e.target.value) })}
                />
              </div>

              {/* Region Helper Selector */}
              <div>
                <label className="text-slate-600 text-xs font-semibold block mb-1.5">
                  Viloyatni tanlang
                </label>
                <select
                  id="select-plate2-region"
                  className="w-full h-[46px] bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-2 text-slate-700 text-xs text-center uppercase shadow-inner focus:outline-hidden transition-all"
                  value={plate2.region}
                  onChange={(e) => updatePlate2({ region: e.target.value })}
                >
                  <option value="">Shou-kod</option>
                  {REGIONS.map((reg) => (
                    <option key={reg.code} value={reg.code}>
                      {reg.code} - {reg.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Style selector */}
            <div>
              <label className="text-slate-600 text-xs font-semibold block mb-1.5 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-blue-600" />
                Nomer Rangining Dizayni
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  onClick={() => updatePlate2({ bgType: "classic" })}
                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    plate2.bgType === "classic"
                      ? "bg-white text-black border-blue-500 ring-2 ring-blue-500"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Klassik
                </button>
                <button
                  onClick={() => updatePlate2({ bgType: "dark" })}
                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    plate2.bgType === "dark"
                      ? "bg-slate-900 text-white border-blue-500 ring-2 ring-blue-500"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Qora VIP
                </button>
                <button
                  onClick={() => updatePlate2({ bgType: "yellow" })}
                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    plate2.bgType === "yellow"
                      ? "bg-amber-450 text-black border-blue-500 ring-2 ring-blue-500"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Sariq
                </button>
                <button
                  onClick={() => updatePlate2({ bgType: "electric" })}
                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    plate2.bgType === "electric"
                      ? "bg-emerald-400 text-slate-950 border-blue-500 ring-2 ring-blue-500"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Yashil
                </button>
                <button
                  onClick={() => updatePlate2({ bgType: "gold" })}
                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    plate2.bgType === "gold"
                      ? "bg-yellow-500 text-slate-950 border-blue-500 ring-2 ring-blue-500"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Oltin
                </button>
                <button
                  onClick={() => updatePlate2({ bgType: "carbon" })}
                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    plate2.bgType === "carbon"
                      ? "bg-neutral-800 text-cyan-400 border-blue-500 ring-2 ring-blue-500"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Karbon
                </button>
                <button
                  onClick={() => updatePlate2({ bgType: "pink" })}
                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                    plate2.bgType === "pink"
                      ? "bg-pink-500 text-white border-blue-400 ring-2 ring-blue-400"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  Pushti
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PAPER OPTIONS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold tracking-wider uppercase text-slate-700 mb-3 flex items-center gap-2">
          <ToggleLeft className="w-4 h-4 text-blue-600" />
          Chop Etish Sozlamalari
        </h3>
        <div className="flex flex-col gap-3">
          {/* Screw holes toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showScrews}
              onChange={(e) => onToggleScrews(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded-sm"
              id="chk-show-screws"
            />
            <span className="text-slate-600 text-xs">Simulyatsion mahkamlash datchiklarini (Screw holes) xaritaga qo'shish</span>
          </label>

          {/* Guidelines on/off */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={printGuide}
              onChange={(e) => onTogglePrintGuide(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded-sm"
              id="chk-print-guide"
            />
            <span className="text-slate-600 text-xs">Kesish chizig'i va yo'riqnomalarni ko'rsatish (Tavsiya etiladi)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
