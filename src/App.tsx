import React, { useState, useEffect } from "react";
import { PlateConfig } from "./types";
import PlatePreview from "./components/PlatePreview";
import PlateDesigner from "./components/PlateDesigner";
import A4DocumentPreview from "./components/A4DocumentPreview";
import { motion, AnimatePresence } from "motion/react";
import {
  Bike,
  Sliders,
  Eye,
  CheckCircle2,
  BookmarkPlus,
  BookmarkCheck,
  History,
  Trash2,
  FileText,
  HelpCircle,
  Printer,
  ChevronRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";

export default function App() {
  // Main Plate 1 Configuration
  const [plate1, setPlate1] = useState<PlateConfig>({
    numbers: "777",
    letters: "VIP",
    region: "01",
    bgType: "classic",
    textColor: "",
    borderColor: "",
  });

  // Main Plate 2 Configuration (Can be synced or customized separately)
  const [plate2, setPlate2] = useState<PlateConfig>({
    numbers: "555",
    letters: "UZB",
    region: "01",
    bgType: "dark",
    textColor: "",
    borderColor: "",
  });

  // Controls UI Toggles
  const [syncPlates, setSyncPlates] = useState<boolean>(false);
  const [showScrews, setShowScrews] = useState<boolean>(true);
  const [printGuide, setPrintGuide] = useState<boolean>(true);

  // Active viewing Tab ("design" for designer workspace, "preview" for A4 page validation before print)
  const [activeTab, setActiveTab] = useState<"design" | "preview">("design");

  // Local storage history state to save users creative sets
  const [savedHistory, setSavedHistory] = useState<
    Array<{ id: string; name: string; plate1: PlateConfig; plate2: PlateConfig; sync: boolean }>
  >([]);

  // Feedback notifications
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Load history on mounts
  useEffect(() => {
    const local = localStorage.getItem("scooter_plates_history");
    if (local) {
      try {
        setSavedHistory(JSON.parse(local));
      } catch (e) {
        console.error("Failed parsing localStorage", e);
      }
    }
  }, []);

  // Save history helper helper
  const saveToHistory = () => {
    const newItem = {
      id: Date.now().toString(),
      name: `${plate1.numbers} ${plate1.letters} ${plate1.region} (${
        plate1.bgType.slice(0, 1).toUpperCase() + plate1.bgType.slice(1)
      })`,
      plate1,
      plate2,
      sync: syncPlates,
    };
    const nextSaved = [newItem, ...savedHistory.slice(0, 11)]; // limit 12
    setSavedHistory(nextSaved);
    localStorage.setItem("scooter_plates_history", JSON.stringify(nextSaved));

    // Simple visual bookmark feedback
    setCopiedId(newItem.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const deleteFromHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = savedHistory.filter((item) => item.id !== id);
    setSavedHistory(nextSaved);
    localStorage.setItem("scooter_plates_history", JSON.stringify(nextSaved));
  };

  const loadFromHistory = (item: typeof savedHistory[0]) => {
    setPlate1(item.plate1);
    setPlate2(item.plate2);
    setSyncPlates(item.sync);
  };

  // Callback from successful PDF generation
  const handlePDFSuccess = () => {
    setShowSuccessModal(true);
    // Auto add to history on download so they never lose it
    saveToHistory();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16 antialiased">
      {/* Decorative Sleek Background Highlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container & Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand/Logo block */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-md">
              <Bike className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                Skuter Suvenir Nomer Maker
                <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest">
                  v1.0
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Skuterlar uchun suvenir davlat raqamlarini yaratish va chop etish portali
              </p>
            </div>
          </div>

          {/* Core Applet Navigation tab controls */}
          <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl self-start md:self-auto">
            <button
              id="tab-btn-design"
              onClick={() => setActiveTab("design")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === "design"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/55"
              }`}
            >
              <Sliders className="w-4 h-4" />
              1. Loyihalash
            </button>
            <button
              id="tab-btn-preview"
              onClick={() => setActiveTab("preview")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 relative cursor-pointer ${
                activeTab === "preview"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/55"
              }`}
            >
              <Eye className="w-4 h-4" />
              2. Vorosmotr & PDF
              {activeTab !== "preview" && (
                <span className="absolute -top-1 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Main Body Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* TAB 1: DESIGN CHASSIS */}
        {activeTab === "design" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual plates spotlight and instant previews */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
                {/* Subtle soft backdrop effect */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                
                {/* Plate label */}
                <div className="w-full flex justify-between items-center mb-6 z-10">
                  <span className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-blue-605 bg-blue-600 animate-pulse" />
                    Jonli Dizayn Nazorati (Live Preview)
                  </span>
                  {syncPlates && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full uppercase tracking-widest select-none">
                      Bir xil (Sinxronlangan)
                    </span>
                  )}
                </div>

                {/* Plates showcase */}
                <div className="flex flex-col gap-8 items-center w-full my-4 z-10 py-6 sm:py-10">
                  {/* Plate 1 Card Wrapper with entry animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-500">
                      Raqam 1: {syncPlates ? "Asosiy or Oldi" : "Old qism nomeri"}
                    </span>
                    <div className="duration-300 transition-transform transform group-hover:scale-102">
                      <PlatePreview config={plate1} scale={1.15} showScrews={showScrews} />
                    </div>
                  </motion.div>

                  {/* Spacer or Divider for non-sync plates */}
                  {!syncPlates && (
                    <div className="w-3/4 border-t border-dashed border-slate-200 my-2" />
                  )}

                  {/* Plate 2 Card Wrapper (Only show if not synced for workspace simplicity or customized separately) */}
                  <AnimatePresence>
                    {!syncPlates && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col items-center gap-2 group overflow-hidden"
                      >
                        <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-500 mt-2">
                          Raqam 2: Orqa qism nomeri
                        </span>
                        <div className="duration-300 transition-transform transform group-hover:scale-102">
                          <PlatePreview config={plate2} scale={1.15} showScrews={showScrews} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sync Plates Quick Helper Notice */}
                  {syncPlates && (
                    <p className="text-center text-xs text-slate-400 italic max-w-sm mt-2">
                      Egizak rejimi faol. Bitta nomer o'zgartirilganda orqadagi ikkinchi nomer ham avtomatik moslashadi.
                    </p>
                  )}
                </div>

                {/* Visual Actions Footer inside preview */}
                <div className="w-full flex justify-between items-center border-t border-slate-100 pt-6 mt-6 z-10 bg-slate-50 p-3 rounded-xl">
                  <button
                    onClick={saveToHistory}
                    id="btn-save-draft"
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <BookmarkPlus className="w-4 h-4 text-blue-600" />
                    Ushbu Dizaynni Saqlash
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    id="btn-go-to-preview"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    A4 Sahifani Ko'rish
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SAVED LOCAL DRAFTS/DESIGNS HISTORY BOX */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold tracking-wider uppercase text-slate-700 flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-500" />
                    Mening Saqlangan Nomerlarim ({savedHistory.length}/12)
                  </h3>
                  {savedHistory.length > 0 && (
                    <button
                      onClick={() => {
                        setSavedHistory([]);
                        localStorage.removeItem("scooter_plates_history");
                      }}
                      className="text-[10px] text-red-500 hover:text-red-600 transition-all font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Hammasini tozalash
                    </button>
                  )}
                </div>

                {savedHistory.length === 0 ? (
                  <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-4">
                    <p className="text-slate-400 text-xs">Saqlangan dizaynlar mavjud emas.</p>
                    <p className="text-slate-550 text-slate-500 text-[10px] mt-1">Dizaynni saqlash tugmasini bosib, ularni ruxsatsiz yo'qotmaslik uchun bu yerga qo'shishingiz mumkin.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                    {savedHistory.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => loadFromHistory(item)}
                        className="group flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-2xl cursor-pointer transition-all duration-300"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-all">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            Kodi: {item.plate1.region} | UZ
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => deleteFromHistory(item.id, e)}
                            className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                            title="O'chirish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Printing & Action Instructions */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 sm:p-8">
                <h4 className="font-bold text-blue-900 text-sm mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  Chop etish va tayyorlash bosqichlari:
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex gap-2">
                    <span className="w-5 h-5 bg-blue-600/15 text-blue-700 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                    <span>O'zingiz xohlagan raqam va harflarni tahrirlab oling hamda dizayn rangini tanlang.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 bg-blue-600/15 text-blue-700 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                    <span><strong>Vorosmotr & PDF</strong> sahifasiga o'tib, barchasi to'g'riligini jadal tekshirib oling.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 bg-blue-600/15 text-blue-700 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                    <span>PDF yuklab olib, uni oddiy yoki qalin qog'ozga (fotomaterial bo'lsa yanada a'lo) chop eting.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="w-5 h-5 bg-blue-600/15 text-blue-700 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
                    <span>Nomerlarni chiziq bo'ylab qaychi yordamida kesib olib, laminatsiya qiling yoki yupqa plastikka yopishtiring.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Design Sidebar Custom Controls */}
            <div className="lg:col-span-5">
              <PlateDesigner
                plate1={plate1}
                plate2={plate2}
                onChangePlate1={setPlate1}
                onChangePlate2={setPlate2}
                syncPlates={syncPlates}
                onToggleSync={setSyncPlates}
                showScrews={showScrews}
                onToggleScrews={setShowScrews}
                printGuide={printGuide}
                onTogglePrintGuide={setPrintGuide}
              />
            </div>

          </div>
        )}

        {/* TAB 2: FULL STAGE A4 PREVIEW */}
        {activeTab === "preview" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <A4DocumentPreview
              plate1={plate1}
              plate2={plate2}
              showScrews={showScrews}
              printGuide={printGuide}
              onSuccess={handlePDFSuccess}
            />

            {/* Back to designer notice */}
            <div className="text-center mt-12">
              <button
                onClick={() => setActiveTab("design")}
                id="btn-back-to-editor"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                ← Qaytadan tahrirlash (Dizaynerga qaytish)
              </button>
            </div>
          </motion.div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="w-full text-center py-10 text-slate-600 text-xs border-t border-slate-900 mt-20 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-4">
        <p>© 2026 Skuter Suvenir Davlat Belgilari Generator. Barcha huquqlar saqlangan.</p>
        <p className="flex items-center gap-2">
          Made with <span className="text-red-600">❤</span> in Uzbekistan
        </p>
      </footer>

      {/* DOWNLOAD SUCCESS CELEBRATION MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl overflow-hidden z-10 text-center"
            >
              {/* Confetti light glow background */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-indigo-500 to-amber-400" />
              
              <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8 animate-bounce" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">PDF Muvaffaqiyatli Tayyorlandi!</h3>
              <p className="text-slate-300 text-xs leading-relaxed max-w-md mx-auto mb-6">
                Skuter suvenir raqamingiz PDF fayl qilib kompyuteringiz yoki telefoningizga yuklab olindi.
                Uni chop etib, chiroyli qilib tayyorlab skuterga o'rnatishingiz mumkin!
              </p>

              {/* Instructions summary */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left mb-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5 text-indigo-400" />
                  Chop Etish Bo'yicha Maslahat:
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Printer sozlamalarida <strong>"Haqiqiy o'lcham" (Real Size / 100% Scale)</strong> variantini tanlang.
                  Bunda raqamlar standart o'lchamda aniq chiqadi. Kesgandan so'ng yomg'irda ivib ketmasligi uchun 
                  laminatlashni unutmang.
                </p>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
              >
                Tushunarli, Rahmat!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
