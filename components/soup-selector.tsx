"use client"

import { cn } from "@/lib/utils"
import { soupBases, type SoupBase } from "@/lib/ramen-data"

interface SoupSelectorProps {
  selected: SoupBase | null
  onSelect: (soup: SoupBase) => void
}

export function SoupSelector({ selected, onSelect }: SoupSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-medium text-foreground">Soup Base</span>
        <span className="text-muted-foreground text-sm">{"スープ"}</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {soupBases.map((soup) => (
          <button
            key={soup.id}
            onClick={() => onSelect(soup.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-all duration-200",
              "hover:scale-[1.02] hover:shadow-md",
              selected === soup.id
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card hover:border-primary/40"
            )}
            aria-pressed={selected === soup.id}
          >
            <div
              className={cn("h-8 w-8 rounded-full shrink-0 border border-border/50", soup.color)}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground text-sm">{soup.name}</span>
                <span className="text-muted-foreground text-xs">{soup.japanese}</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed truncate">{soup.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
