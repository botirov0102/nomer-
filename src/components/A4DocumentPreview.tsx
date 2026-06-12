import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PlateConfig } from "../types";
import PlatePreview from "./PlatePreview";
import { Printer, Download, Eye, CheckCircle2, FileText, AlertCircle, Scissors } from "lucide-react";

interface A4DocumentPreviewProps {
  plate1: PlateConfig;
  plate2: PlateConfig;
  showScrews: boolean;
  printGuide: boolean;
  onSuccess: () => void;
}

export default function A4DocumentPreview({
  plate1,
  plate2,
  showScrews,
  printGuide,
  onSuccess
}: A4DocumentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);

  // Generate a high-resolution PDF download of the exact A4 document
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);
    setDownloadProgress("A4 sahifa tahlil qilinmoqda...");

    try {
      // Small timeout to allow state updates
      await new Promise((resolve) => setTimeout(resolve, 300));

      setDownloadProgress("Rasmlar o'girilmoqda (UHD)...");
      const canvas = await html2canvas(printRef.current, {
        scale: 2.5, // High resolution scale for premium printing
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
      });

      setDownloadProgress("PDF hujjat shakllantirilmoqda...");
      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      
      // A4 dimensions: 210mm x 297mm
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
      
      const fileName = `skuter_nomer_${plate1.numbers}_${plate1.letters}.pdf`;
      setDownloadProgress("Yuklab olinmoqda...");
      pdf.save(fileName);
      
      setIsGenerating(false);
      setDownloadProgress(null);
      onSuccess();
    } catch (error) {
      console.error("PDF generation failed:", error);
      setIsGenerating(false);
      setDownloadProgress("Xatolik yuz berdi. Iltimos qaytadan urunib ko'ring.");
      setTimeout(() => setDownloadProgress(null), 4000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full lg:max-w-4xl mx-auto">
      {/* Information Alert Badge */}
      <div className="w-full flex items-start gap-3 bg-blue-50/80 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 shadow-xs mb-2">
        <AlertCircle className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-blue-900 mb-1">A4 Qog'oz Hujjatining Ko'rinishi</p>
          <p className="leading-relaxed">
            Quyida ko'rinayotgan sahifa haqiqiy A4 qog'oz (210mm x 297mm) o'lchamlariga muvofiq qilib
            tayyorlangan. Ikkala nomer ham chop etish va tekis qilib kesib olish uchun qulay joylashtirilgan.
            Buni tasdiqlaganingizdan so'ng, PDF yuklab olish tugmasini bosing.
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="w-full flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          id="btn-download-pdf"
          className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          {isGenerating ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          {isGenerating ? "PDF Yuklanmoqda..." : "Tasdiqlash va PDF Yuklab Olish"}
        </button>
      </div>

      {/* Progress Alert */}
      {downloadProgress && (
        <div className="w-full text-center py-2 px-4 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 text-sm font-medium animate-pulse">
          {downloadProgress}
        </div>
      )}

      {/* Interactive PDF layout box with shadow */}
      <div className="w-full flex justify-center py-6 px-2 sm:px-6 bg-slate-200/50 hover:bg-slate-200/80 rounded-2xl transition-colors duration-305">
        {/* A4 Document Box styled according to standard screen size ratios (794 x 1123) */}
        <div
          ref={containerRef}
          id="printable-a4-sheet"
          className="relative w-[340px] h-[480px] sm:w-[595px] sm:h-[842px] bg-white rounded-xs shadow-xl flex flex-col justify-between overflow-hidden p-6 sm:p-12 text-slate-800 border border-neutral-200"
          style={{
            minWidth: "340px",
            aspectRatio: "210 / 297",
          }}
        >
          {/* Subtle A4 background watermark that won't show in PDF if printed but looks good on screen */}
          <div className="absolute inset-0 pointer-events-none border-[3px] border-neutral-100/40 m-[2px]" />

          {/* Top Document Header Content */}
          {printGuide ? (
            <div className="w-full text-center flex flex-col items-center border-b border-dashed border-gray-250 border-gray-200 pb-3 sm:pb-5">
              <h2 className="text-xs sm:text-lg font-extrabold uppercase tracking-widest text-slate-855 text-slate-800 flex items-center gap-2">
                <FileText className="w-3 h-3 sm:w-5 h-5 text-blue-600" />
                Skuterlar Uchun Suvenir Davlat Raqami
              </h2>
              <p className="text-[9px] sm:text-xs text-slate-500 mt-1">
                A4 formatida 1:1 o'lchamda chop etib, chiziq bo'ylab kesib oling va skuterga taqing.
              </p>
            </div>
          ) : (
            <div className="h-4 sm:h-8" />
          )}

          {/* First License Plate Section */}
          <div className="w-full flex flex-col items-center py-2 sm:py-6">
            <span className="text-[9px] sm:text-xs text-slate-400 font-mono mb-2 uppercase tracking-widest flex items-center gap-1">
              <Scissors className="w-3 h-3" /> Nomer 1 / Old Raqam (Front Plate)
            </span>
            <div className="scale-[0.8] sm:scale-115 md:scale-125 transform origin-center transition-all">
              <PlatePreview config={plate1} scale={1} showScrews={showScrews} />
            </div>
          </div>

          {/* Dividing/Cutoff line */}
          <div className="relative w-full flex items-center justify-center my-1 sm:my-3">
            <div className="absolute left-0 right-0 border-t-2 border-dashed border-gray-300" />
            <div className="absolute px-3 py-1 bg-white border border-gray-200 rounded-full text-[9px] sm:text-xs font-mono text-slate-500 flex items-center gap-1.5 shadow-xs">
              <Scissors className="w-3.5 h-3.5 text-gray-500 animate-bounce" />
              <span>Shu chiziq bo'ylab kesib oling (Kesim Chizig'i)</span>
            </div>
          </div>

          {/* Second License Plate Section */}
          <div className="w-full flex flex-col items-center py-2 sm:py-6">
            <span className="text-[9px] sm:text-xs text-slate-400 font-mono mb-2 uppercase tracking-widest flex items-center gap-1">
              <Scissors className="w-3 h-3" /> Nomer 2 / Orqa Raqam (Rear Plate)
            </span>
            <div className="scale-[0.8] sm:scale-115 md:scale-125 transform origin-center transition-all">
              <PlatePreview config={plate2} scale={1} showScrews={showScrews} />
            </div>
          </div>

          {/* Footer of A4 Sheet */}
          {printGuide ? (
            <div className="w-full text-center border-t border-dashed border-gray-300 pt-3 flex justify-between items-center text-[8px] sm:text-xs text-slate-400">
              <span className="font-mono">Suvenir Nomer Generator v1.0</span>
              <span className="font-medium text-blue-600">O'zbekistonda Ishlab Chiqarilgan (Made in UZ)</span>
              <span>Chop etish: Landshat (100% Scale)</span>
            </div>
          ) : (
            <div className="h-4 sm:h-8" />
          )}
        </div>
      </div>

      {/* Hidden high-fidelity absolute 210mm x 297mm A4 print blueprint for PDF export */}
      <div
        ref={printRef}
        style={{
          width: "210mm",
          height: "297mm",
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          backgroundColor: "#FFFFFF",
          color: "#0f172a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15mm 20mm 15mm 20mm",
          boxSizing: "border-box",
        }}
        className="font-sans antialiased"
      >
        {/* Printable top header */}
        {printGuide ? (
          <div className="w-full text-center flex flex-col items-center border-b border-dashed border-gray-300 pb-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 flex items-center justify-center gap-2">
              Skuterlar Uchun Suvenir Davlat Raqami
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              O'lchamlari: Eni 14 sm, Bo'yi 11 sm. A4 qog'oz formatida 1:1 o'lchamda chop etilgan.
            </p>
          </div>
        ) : (
          <div className="h-4" />
        )}

        {/* Plate 1 Area */}
        <div className="w-full flex flex-col items-center py-2">
          {printGuide && (
            <span className="text-[10px] text-slate-400 font-mono mb-2 uppercase tracking-widest flex items-center gap-1">
              Kesish Chizig'i - Nomer 1 / Old Raqam (14 sm x 11 sm)
            </span>
          )}
          <div 
            style={{ 
              width: "140mm", 
              height: "110mm", 
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <PlatePreview
              config={plate1}
              width={529}
              height={415}
              scale={1.51}
              showScrews={showScrews}
            />
          </div>
        </div>

        {/* Divider dashed line */}
        <div className="relative w-full flex items-center justify-center my-2">
          <div className="w-full border-t-2 border-dashed border-gray-300" />
          {printGuide && (
            <div className="absolute px-4 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-mono text-slate-500">
              Kesim Chizig'i / Cho'ntak Chizig'i
            </div>
          )}
        </div>

        {/* Plate 2 Area */}
        <div className="w-full flex flex-col items-center py-2">
          {printGuide && (
            <span className="text-[10px] text-slate-400 font-mono mb-2 uppercase tracking-widest flex items-center gap-1">
              Kesish Chizig'i - Nomer 2 / Orqa Raqam (14 sm x 11 sm)
            </span>
          )}
          <div 
            style={{ 
              width: "140mm", 
              height: "110mm", 
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <PlatePreview
              config={plate2}
              width={529}
              height={415}
              scale={1.51}
              showScrews={showScrews}
            />
          </div>
        </div>

        {/* Printable footer */}
        {printGuide ? (
          <div className="w-full text-center border-t border-dashed border-gray-300 pt-4 flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span>Suvenir Nomer Generator v1.0</span>
            <span className="font-semibold text-blue-600">UZBEKISTAN (MADE IN UZ)</span>
            <span>Chop etish miqyosi: 100% Scale (Actual Size)</span>
          </div>
        ) : (
          <div className="h-4" />
        )}
      </div>
    </div>
  );
}
