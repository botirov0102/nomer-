export interface PlateConfig {
  numbers: string; // 3 digits, e.g. "000" or "777"
  letters: string; // 3 letters, e.g. "MMM" or "VIP"
  region: string;  // 2 digits, e.g. "01" or "10"
  bgType: "classic" | "dark" | "yellow" | "electric" | "gold" | "carbon" | "pink";
  textColor: string; // Hex or tailwind color
  borderColor: string; // Hex or tailwind color
}

export const REGIONS = [
  { code: "01", name: "Toshkent shahri" },
  { code: "10", name: "Toshkent viloyati" },
  { code: "20", name: "Sirdaryo" },
  { code: "25", name: "Jizzax" },
  { code: "30", name: "Samarqand" },
  { code: "40", name: "Farg'ona" },
  { code: "60", name: "Andijon" },
  { code: "70", name: "Qashqadaryo" },
  { code: "75", name: "Surxondaryo" },
  { code: "80", name: "Buxoro" },
  { code: "85", name: "Navoiy" },
  { code: "90", name: "Xorazm" },
  { code: "95", name: "Qoraqalpog'iston" }
];

export const SOUVENIR_IDEAS = [
  { label: "VIP Klass", numbers: "777", letters: "VIP", region: "01", bgType: "dark" },
  { label: "O'zbekiston Yoshlari", numbers: "001", letters: "UZB", region: "01", bgType: "classic" },
  { label: "Agent 007", numbers: "007", letters: "MRX", region: "10", bgType: "carbon" },
  { label: "Ekologik Toza (Yashil)", numbers: "555", letters: "ECO", region: "30", bgType: "electric" },
  { label: "Oltin Nomer", numbers: "999", letters: "GLD", region: "01", bgType: "gold" },
  { label: "Poygachi Skuter", numbers: "090", letters: "RSC", region: "40", bgType: "pink" }
];
