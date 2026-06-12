import React from "react";

interface FlagProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function UzbekistanFlag({ className = "", width = 45, height = 30 }: FlagProps) {
  // Mathematical positions for 12 stars aligned in 3 rows on the top blue band
  const starsList = [
    // Row 1 (top, y = 25) - 3 stars
    { x: 135, y: 25, id: "r1-s1" },
    { x: 155, y: 25, id: "r1-s2" },
    { x: 175, y: 25, id: "r1-s3" },
    // Row 2 (middle, y = 45) - 4 stars
    { x: 115, y: 45, id: "r2-s1" },
    { x: 135, y: 45, id: "r2-s2" },
    { x: 155, y: 45, id: "r2-s3" },
    { x: 175, y: 45, id: "r2-s4" },
    // Row 3 (bottom, y = 65) - 5 stars
    { x: 95, y: 65, id: "r3-s1" },
    { x: 115, y: 65, id: "r3-s2" },
    { x: 135, y: 65, id: "r3-s3" },
    { x: 155, y: 65, id: "r3-s4" },
    { x: 175, y: 65, id: "r3-s5" },
  ];

  const getStarPoints = (cx: number, cy: number, rOuter = 6, rInner = 2.4) => {
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const r = i % 2 === 0 ? rOuter : rInner;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 300"
      className={`rounded-xs overflow-hidden border border-black/10 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Blue Band */}
      <rect width="500" height="90" fill="#0099B5" />
      
      {/* 2. Red Stripe Upper */}
      <rect y="90" width="500" height="10" fill="#CE1126" />
      
      {/* 3. White Band */}
      <rect y="100" width="500" height="100" fill="#FFFFFF" />
      
      {/* 4. Red Stripe Lower */}
      <rect y="200" width="500" height="10" fill="#CE1126" />
      
      {/* 5. Green Band */}
      <rect y="210" width="500" height="90" fill="#1EB53A" />

      {/* 6. Crescent Moon in white, facing right */}
      <path
        d="M 55,45 a 20,20 0 1,0 32,16 a 16,16 0 1,1 -32,-16 z"
        fill="#FFFFFF"
      />

      {/* 7. Precise Stars Group */}
      <g fill="#FFFFFF">
        {starsList.map((s) => (
          <polygon
            key={s.id}
            points={getStarPoints(s.x, s.y)}
            fill="#FFFFFF"
          />
        ))}
      </g>
    </svg>
  );
}

