"use client"

import { cn } from "@/lib/utils"
import { noodleTypes, type NoodleType } from "@/lib/ramen-data"

interface NoodleSelectorProps {
  selected: NoodleType | null
  onSelect: (noodle: NoodleType) => void
}

function NoodleIcon({ type, isSelected }: { type: NoodleType; isSelected: boolean }) {
  const stroke = isSelected ? "#8B4513" : "#A0522D"
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
      {type === "shirataki" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M${8 + i * 6},5 Q${12 + i * 6},20 ${8 + i * 6},35`} stroke={stroke} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
          ))}
        </g>
      )}
      {type === "glass" && (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${8 + i * 8},5 Q${14 + i * 8},20 ${8 + i * 8},35`} stroke={stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" strokeDasharray="2 2" />
          ))}
        </g>
      )}
      {type === "udon" && (
        <g>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${8 + i * 10},6 Q${14 + i * 10},20 ${8 + i * 10},34`} stroke={stroke} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
          ))}
        </g>
      )}
      {type === "thin" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={10 + i * 5} y1="5" x2={12 + i * 5} y2="35" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          ))}
        </g>
      )}
    </svg>
  )
}

export function NoodleSelector({ selected, onSelect }: NoodleSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-medium text-foreground">Noodles</span>
        <span className="text-muted-foreground text-sm">{"麺"}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {noodleTypes.map((noodle) => (
          <button
            key={noodle.id}
            onClick={() => onSelect(noodle.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border-2 px-3 py-4 text-center transition-all duration-200",
              "hover:scale-[1.02] hover:shadow-md",
              selected === noodle.id
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card hover:border-primary/40"
            )}
            aria-pressed={selected === noodle.id}
          >
            <NoodleIcon type={noodle.id} isSelected={selected === noodle.id} />
            <div>
              <div className="font-medium text-foreground text-sm">{noodle.name}</div>
              <div className="text-muted-foreground text-xs">{noodle.japanese}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
