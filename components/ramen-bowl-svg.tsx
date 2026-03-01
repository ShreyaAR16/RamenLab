"use client"

import type { SoupBase, NoodleType, ToppingId } from "@/lib/ramen-data"

interface RamenBowlSVGProps {
  soup: SoupBase | null
  noodle: NoodleType | null
  toppings: ToppingId[]
}

const soupColors: Record<string, { broth: string; highlight: string }> = {
  tonkotsu: { broth: "#F5E6C8", highlight: "#EDD9A3" },
  shoyu: { broth: "#8B6914", highlight: "#A07D1E" },
  miso: { broth: "#D4A053", highlight: "#C4903A" },
  shio: { broth: "#F0E8D0", highlight: "#E8DDBE" },
  tantanmen: { broth: "#C95A3C", highlight: "#B84E32" },
  veggie: { broth: "#7BA05B", highlight: "#8FB86A" },
}

/* Generates a wavy long noodle path that meanders across the bowl */
function noodlePath(
  startX: number,
  startY: number,
  seed: number,
  length: number
): string {
  let x = startX
  let y = startY
  let path = `M${x},${y}`
  const segments = length
  for (let i = 0; i < segments; i++) {
    // Alternate curving left/right with some pseudo-random variation
    const dir = ((i + seed) % 2 === 0 ? 1 : -1) * (12 + ((seed * 7 + i * 3) % 8))
    const dy = 3 + ((seed * 3 + i * 5) % 4)
    const cx = x + dir * 0.6
    const cy = y + dy * 0.5
    x = x + dir
    y = y + dy
    path += ` Q${cx},${cy} ${x},${y}`
  }
  return path
}

export function RamenBowlSVG({ soup, noodle, toppings }: RamenBowlSVGProps) {
  const brothColor = soup ? soupColors[soup]?.broth ?? "#E8DCC8" : "#E8DCC8"
  const brothHighlight = soup ? soupColors[soup]?.highlight ?? "#DDD0B8" : "#DDD0B8"

  return (
    <svg
      viewBox="0 0 400 380"
      className="w-full h-full max-w-[400px] mx-auto"
      aria-label="Your ramen bowl"
    >
      <defs>
        {/* Clip path constraining all contents to the bowl opening */}
        <clipPath id="bowlInterior">
          <ellipse cx="200" cy="200" rx="150" ry="38" />
        </clipPath>
        <radialGradient id="brothGradient" cx="50%" cy="40%">
          <stop offset="0%" stopColor={brothHighlight} />
          <stop offset="100%" stopColor={brothColor} />
        </radialGradient>
        <radialGradient id="bowlGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#D44B2C" />
          <stop offset="70%" stopColor="#B8372A" />
          <stop offset="100%" stopColor="#8C2318" />
        </radialGradient>
        <radialGradient id="bowlInner" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#E8563E" />
          <stop offset="100%" stopColor="#C94432" />
        </radialGradient>
        <filter id="shadow" x="-10%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Chopsticks behind bowl */}
      <g transform="rotate(-25, 330, 100)">
        <rect x="310" y="40" width="8" height="220" rx="4" fill="#D4A76A" />
        <rect x="310" y="40" width="8" height="40" rx="4" fill="#8B4513" />
        <rect x="313" y="230" width="2" height="30" rx="1" fill="#C49A5C" opacity="0.8" />
      </g>
      <g transform="rotate(-18, 345, 100)">
        <rect x="328" y="50" width="8" height="220" rx="4" fill="#D4A76A" />
        <rect x="328" y="50" width="8" height="40" rx="4" fill="#8B4513" />
        <rect x="331" y="240" width="2" height="30" rx="1" fill="#C49A5C" opacity="0.8" />
      </g>

      {/* Bowl body */}
      <g filter="url(#shadow)">
        <ellipse cx="200" cy="250" rx="170" ry="45" fill="url(#bowlGradient)" />
        <path
          d="M30,200 Q30,250 55,270 Q100,310 200,310 Q300,310 345,270 Q370,250 370,200"
          fill="url(#bowlGradient)"
        />
        <ellipse cx="200" cy="200" rx="170" ry="50" fill="url(#bowlGradient)" />
        <ellipse cx="200" cy="200" rx="155" ry="42" fill="url(#bowlInner)" />

        {/* Japanese wave pattern on bowl body */}
        <g opacity="0.15">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <path
              key={i}
              d={`M${55 + i * 40},215 Q${65 + i * 40},200 ${75 + i * 40},215 Q${85 + i * 40},230 ${95 + i * 40},215`}
              fill="none"
              stroke="#FFE0C0"
              strokeWidth="2"
            />
          ))}
        </g>

        {/* Everything inside the bowl is clipped */}
        <g clipPath="url(#bowlInterior)">
          {/* Broth */}
          {soup ? (
            <ellipse cx="200" cy="200" rx="150" ry="38" fill="url(#brothGradient)">
              <animate attributeName="ry" values="38;39;38" dur="3s" repeatCount="indefinite" />
            </ellipse>
          ) : (
            <ellipse cx="200" cy="200" rx="150" ry="38" fill="#E8DCC8" opacity="0.3" />
          )}

          {/* Broth surface shimmer */}
          {soup && (
            <g opacity="0.2">
              <ellipse cx="170" cy="192" rx="35" ry="6" fill="#FFF" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.2;0.4" dur="4s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="240" cy="198" rx="22" ry="4" fill="#FFF" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.15;0.3" dur="3s" repeatCount="indefinite" />
              </ellipse>
            </g>
          )}

          {/* ======================== NOODLES ======================== */}
          {noodle && (() => {
            const noodleConfig: Record<NoodleType, {
              color: string
              width: number
              opacity: number
              count: number
              segLen: number
              secondColor?: string
              secondOpacity?: number
            }> = {
              shirataki: {
                color: "#F0EDE6",
                width: 1.8,
                opacity: 0.85,
                count: 14,
                segLen: 7,
                secondColor: "#FAFAF5",
                secondOpacity: 0.5,
              },
              glass: {
                color: "#D8D4C8",
                width: 2,
                opacity: 0.35,
                count: 12,
                segLen: 7,
                secondColor: "#C8C4B8",
                secondOpacity: 0.2,
              },
              udon: {
                color: "#F5ECD5",
                width: 6,
                opacity: 0.92,
                count: 8,
                segLen: 6,
                secondColor: "#EDE3C8",
                secondOpacity: 0.6,
              },
              thin: {
                color: "#F0DCA0",
                width: 1.6,
                opacity: 0.88,
                count: 16,
                segLen: 8,
                secondColor: "#E8D490",
                secondOpacity: 0.55,
              },
            }

            const cfg = noodleConfig[noodle]
            // Each noodle strand is a long wavy path spread across the bowl
            const strands = Array.from({ length: cfg.count }, (_, i) => {
              const startX = 80 + (i * 240) / cfg.count + ((i * 17) % 12)
              const startY = 178 + ((i * 7) % 10)
              return noodlePath(startX, startY, i, cfg.segLen)
            })

            return (
              <g>
                {/* Main noodle strands */}
                {strands.map((d, i) => (
                  <path
                    key={`n-${i}`}
                    d={d}
                    stroke={cfg.color}
                    strokeWidth={cfg.width}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={cfg.opacity - (i % 3) * 0.06}
                  />
                ))}
                {/* Secondary highlight layer for depth */}
                {strands.filter((_, i) => i % 2 === 0).map((d, i) => (
                  <path
                    key={`nh-${i}`}
                    d={d}
                    stroke={cfg.secondColor}
                    strokeWidth={cfg.width * 0.55}
                    fill="none"
                    strokeLinecap="round"
                    opacity={cfg.secondOpacity}
                  />
                ))}
              </g>
            )
          })()}

          {/* ======================== TOPPINGS ======================== */}

          {/* Chashu */}
          {toppings.includes("chashu") && (
            <g>
              <ellipse cx="165" cy="192" rx="24" ry="14" fill="#A0522D" />
              <ellipse cx="165" cy="192" rx="22" ry="12" fill="#CD853F" />
              <ellipse cx="165" cy="192" rx="12" ry="7" fill="#DEB887" opacity="0.6" />
              <path d="M150,189 Q162,185 178,191" stroke="#A0522D" strokeWidth="1" fill="none" opacity="0.5" />
            </g>
          )}

          {/* Egg */}
          {toppings.includes("egg") && (
            <g>
              <ellipse cx="240" cy="190" rx="18" ry="12" fill="#F5F5DC" />
              <ellipse cx="240" cy="190" rx="10" ry="6" fill="#FFD700" />
              <ellipse cx="238" cy="189" rx="4" ry="2.5" fill="#FFA500" opacity="0.6" />
            </g>
          )}

          {/* Nori */}
          {toppings.includes("nori") && (
            <g>
              <rect x="130" y="176" width="26" height="36" rx="3" fill="#2D3B2D" transform="rotate(-8, 143, 194)" />
              <rect x="132" y="180" width="22" height="28" rx="2" fill="#1A2A1A" opacity="0.6" transform="rotate(-8, 143, 194)" />
            </g>
          )}

          {/* Scallions */}
          {toppings.includes("scallions") && (
            <g>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i}>
                  <circle cx={158 + i * 16 + (i % 2) * 4} cy={188 + (i % 3) * 6} r="3.5" fill="#4CAF50" />
                  <circle cx={158 + i * 16 + (i % 2) * 4} cy={188 + (i % 3) * 6} r="1.8" fill="#66BB6A" />
                </g>
              ))}
            </g>
          )}

          {/* Corn */}
          {toppings.includes("corn") && (
            <g>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <circle
                  key={i}
                  cx={195 + (i % 4) * 7}
                  cy={198 + Math.floor(i / 4) * 6}
                  r="3"
                  fill="#FFD700"
                  stroke="#E6C200"
                  strokeWidth="0.5"
                />
              ))}
            </g>
          )}

          {/* Mushrooms */}
          {toppings.includes("mushrooms") && (
            <g>
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${222 + i * 16}, ${192 + (i % 2) * 5})`}>
                  <ellipse cx="0" cy="0" rx="7" ry="4" fill="#D2B48C" />
                  <rect x="-1.5" y="2" width="3" height="8" rx="1.5" fill="#DEB887" />
                </g>
              ))}
            </g>
          )}

          {/* Bamboo */}
          {toppings.includes("bamboo") && (
            <g>
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <path
                    d={`M${158 + i * 14},${196 + i * 2} L${166 + i * 14},${212 + i * 2} L${158 + i * 14 + 9},${212 + i * 2} L${153 + i * 14},${196 + i * 2} Z`}
                    fill="#F0E68C"
                    opacity="0.9"
                  />
                  <line x1={155 + i * 14} y1={204 + i * 2} x2={168 + i * 14} y2={204 + i * 2} stroke="#DAC66A" strokeWidth="0.5" />
                </g>
              ))}
            </g>
          )}

          {/* Narutomaki */}
          {toppings.includes("kamaboko") && (
            <g>
              {[0, 1, 2].map((i) => (
                <g key={i}>
                  <ellipse cx={210 + i * 14} cy={194 + (i % 2) * 4} rx="6" ry="7" fill="#FFF" />
                  <path
                    d={`M${205 + i * 14},${194 + (i % 2) * 4} A 5 6 0 0 1 ${215 + i * 14},${194 + (i % 2) * 4}`}
                    fill="#FF69B4"
                    opacity="0.7"
                  />
                  <path
                    d={`M${207 + i * 14},${194 + (i % 2) * 4} Q${210 + i * 14},${190 + (i % 2) * 4} ${213 + i * 14},${194 + (i % 2) * 4}`}
                    fill="#FF1493"
                    opacity="0.4"
                  />
                </g>
              ))}
            </g>
          )}

          {/* Bok Choy */}
          {toppings.includes("bokchoy") && (
            <g>
              {[0, 1].map((i) => (
                <g key={i} transform={`translate(${270 + i * 20}, ${190 + i * 4}) rotate(${-10 + i * 15})`}>
                  <path d="M0,15 Q2,8 0,0 Q-2,8 0,15" fill="#F0F0E0" strokeWidth="0.5" stroke="#D8D8C0" />
                  <ellipse cx="-5" cy="-3" rx="7" ry="5" fill="#5B8C3E" transform="rotate(-20)" />
                  <ellipse cx="5" cy="-3" rx="7" ry="5" fill="#4E7D34" transform="rotate(20)" />
                  <ellipse cx="0" cy="-6" rx="5" ry="4" fill="#6B9E4A" />
                </g>
              ))}
            </g>
          )}

          {/* Tempura */}
          {toppings.includes("tempura") && (
            <g>
              <g transform="translate(148, 186) rotate(-15)">
                <path d="M0,0 Q8,-4 16,0 Q20,6 16,12 Q8,16 0,12 Q-4,6 0,0" fill="#E8B84B" />
                <path d="M2,2 Q8,-1 14,2 Q17,6 14,10 Q8,13 2,10 Q-1,6 2,2" fill="#D4A033" opacity="0.6" />
                <circle cx="5" cy="4" r="1" fill="#C8922B" opacity="0.5" />
                <circle cx="10" cy="7" r="1.2" fill="#C8922B" opacity="0.4" />
                <circle cx="7" cy="10" r="0.8" fill="#C8922B" opacity="0.5" />
              </g>
              <g transform="translate(270, 193) rotate(10)">
                <path d="M0,0 Q8,-4 16,0 Q20,6 16,12 Q8,16 0,12 Q-4,6 0,0" fill="#E8B84B" />
                <path d="M2,2 Q8,-1 14,2 Q17,6 14,10 Q8,13 2,10 Q-1,6 2,2" fill="#D4A033" opacity="0.6" />
                <circle cx="5" cy="4" r="1" fill="#C8922B" opacity="0.5" />
                <circle cx="10" cy="7" r="1.2" fill="#C8922B" opacity="0.4" />
              </g>
            </g>
          )}
        </g>

        {/* Steam */}
        {soup && (
          <g opacity="0.35">
            <path d="M160,155 Q155,135 162,115 Q168,100 160,80" stroke="#999" strokeWidth="2" fill="none" strokeLinecap="round">
              <animate attributeName="d" values="M160,155 Q155,135 162,115 Q168,100 160,80;M160,155 Q165,133 158,113 Q152,97 160,77;M160,155 Q155,135 162,115 Q168,100 160,80" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0.15;0.35" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M200,150 Q195,130 202,110 Q208,95 200,75" stroke="#999" strokeWidth="2" fill="none" strokeLinecap="round">
              <animate attributeName="d" values="M200,150 Q195,130 202,110 Q208,95 200,75;M200,150 Q205,128 198,108 Q192,92 200,72;M200,150 Q195,130 202,110 Q208,95 200,75" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3.5s" repeatCount="indefinite" />
            </path>
            <path d="M240,153 Q235,133 242,113 Q248,98 240,78" stroke="#999" strokeWidth="2" fill="none" strokeLinecap="round">
              <animate attributeName="d" values="M240,153 Q235,133 242,113 Q248,98 240,78;M240,153 Q245,131 238,111 Q232,95 240,75;M240,153 Q235,133 242,113 Q248,98 240,78" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0.1;0.25" dur="4s" repeatCount="indefinite" />
            </path>
          </g>
        )}

        {/* Bowl rim highlight */}
        <ellipse cx="200" cy="198" rx="160" ry="42" fill="none" stroke="#FF8A70" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Empty bowl text */}
      {!soup && !noodle && toppings.length === 0 && (
        <text x="200" y="205" textAnchor="middle" fill="#999" fontSize="14" fontStyle="italic">
          Start building your bowl!
        </text>
      )}
    </svg>
  )
}
