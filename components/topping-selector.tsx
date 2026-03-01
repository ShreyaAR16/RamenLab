"use client"

import { cn } from "@/lib/utils"
import { toppings as toppingOptions, type ToppingId } from "@/lib/ramen-data"

interface ToppingSelectorProps {
  selected: ToppingId[]
  onToggle: (topping: ToppingId) => void
}

export function ToppingSelector({ selected, onToggle }: ToppingSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg font-medium text-foreground">Toppings</span>
        <span className="text-muted-foreground text-sm">{"トッピング"}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {toppingOptions.map((topping) => {
          const isSelected = selected.includes(topping.id)
          return (
            <button
              key={topping.id}
              onClick={() => onToggle(topping.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg border-2 px-3 py-2.5 text-left transition-all duration-200",
                "hover:scale-[1.02] hover:shadow-md",
                isSelected
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/40"
              )}
              aria-pressed={isSelected}
            >
              <span className="text-lg shrink-0" role="img" aria-hidden="true">{topping.emoji}</span>
              <div className="min-w-0">
                <div className="font-medium text-foreground text-xs leading-tight">{topping.name}</div>
                <div className="text-muted-foreground text-[10px]">{topping.japanese}</div>
              </div>
              {isSelected && (
                <svg className="w-4 h-4 text-primary shrink-0 ml-auto" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
