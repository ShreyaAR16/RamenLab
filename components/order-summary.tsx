"use client"

import { type SoupBase, type NoodleType, type ToppingId, soupBases, noodleTypes, toppings } from "@/lib/ramen-data"

interface OrderSummaryProps {
  soup: SoupBase | null
  noodle: NoodleType | null
  selectedToppings: ToppingId[]
  onReset: () => void
  onComplete: () => void
}

export function OrderSummary({ soup, noodle, selectedToppings, onReset, onComplete }: OrderSummaryProps) {
  const soupName = soup ? soupBases.find((s) => s.id === soup)?.name : null
  const noodleName = noodle ? noodleTypes.find((n) => n.id === noodle)?.name : null
  const toppingNames = selectedToppings.map(
    (t) => toppings.find((tp) => tp.id === t)?.name ?? t
  )

  const isComplete = soup && noodle && selectedToppings.length > 0

  return (
    <div className="rounded-xl border-2 border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Your Bowl</h3>
        <span className="text-muted-foreground text-sm">{"あなたのラーメン"}</span>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground min-w-[70px] shrink-0">Broth:</span>
          <span className="text-foreground font-medium">
            {soupName ?? <span className="text-muted-foreground font-normal italic">Not selected</span>}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground min-w-[70px] shrink-0">Noodles:</span>
          <span className="text-foreground font-medium">
            {noodleName ?? <span className="text-muted-foreground font-normal italic">Not selected</span>}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground min-w-[70px] shrink-0">Toppings:</span>
          <span className="text-foreground font-medium">
            {toppingNames.length > 0 ? (
              toppingNames.join(", ")
            ) : (
              <span className="text-muted-foreground font-normal italic">None selected</span>
            )}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <button
          onClick={onReset}
          className="flex-1 rounded-lg border-2 border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          Start Over
        </button>
        {isComplete && (
          <button
            onClick={onComplete}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 shadow-md"
          >
            {"Itadakimasu! 🍜"}
          </button>
        )}
      </div>
    </div>
  )
}
