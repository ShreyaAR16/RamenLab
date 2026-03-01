"use client"

import { useState, useCallback } from "react"
import { RamenBowlSVG } from "@/components/ramen-bowl-svg"
import { SoupSelector } from "@/components/soup-selector"
import { NoodleSelector } from "@/components/noodle-selector"
import { ToppingSelector } from "@/components/topping-selector"
import { OrderSummary } from "@/components/order-summary"
import type { SoupBase, NoodleType, ToppingId } from "@/lib/ramen-data"

export function RamenBuilder() {
  const [soup, setSoup] = useState<SoupBase | null>(null)
  const [noodle, setNoodle] = useState<NoodleType | null>(null)
  const [selectedToppings, setSelectedToppings] = useState<ToppingId[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  const handleToggleTopping = useCallback((topping: ToppingId) => {
    setSelectedToppings((prev) =>
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]
    )
  }, [])

  const handleReset = useCallback(() => {
    setSoup(null)
    setNoodle(null)
    setSelectedToppings([])
    setShowCelebration(false)
  }, [])

  const isComplete = soup && noodle && selectedToppings.length > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {/* Chopsticks icon */}
              <svg viewBox="0 0 32 32" className="w-8 h-8" aria-hidden="true">
                <rect x="8" y="2" width="3" height="28" rx="1.5" fill="#8B4513" transform="rotate(-8, 9.5, 16)" />
                <rect x="8" y="2" width="3" height="8" rx="1.5" fill="#D4A76A" transform="rotate(-8, 9.5, 16)" />
                <rect x="18" y="2" width="3" height="28" rx="1.5" fill="#8B4513" transform="rotate(8, 19.5, 16)" />
                <rect x="18" y="2" width="3" height="8" rx="1.5" fill="#D4A76A" transform="rotate(8, 19.5, 16)" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Ramen Lab</h1>
              <p className="text-xs text-muted-foreground">{"ラーメン工房"}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">Craft your perfect bowl</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
        {/* Japanese decorative top border */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <svg viewBox="0 0 60 20" className="w-16 h-5 text-primary/30" aria-hidden="true">
            <path d="M0,10 Q15,0 30,10 Q45,20 60,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0,14 Q15,4 30,14 Q45,24 60,14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side: Bowl preview */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-full max-w-md">
              {/* Decorative mat under bowl */}
              <div className="absolute inset-x-4 bottom-0 h-8 rounded-full bg-foreground/5" />
              
              <div className={`transition-transform duration-500 ${isComplete && !showCelebration ? "animate-[bounce_0.5s_ease-in-out]" : ""}`}>
                <RamenBowlSVG soup={soup} noodle={noodle} toppings={selectedToppings} />
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full transition-colors ${soup ? "bg-primary" : "bg-border"}`} />
                <span className={soup ? "text-foreground font-medium" : "text-muted-foreground"}>Broth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full transition-colors ${noodle ? "bg-primary" : "bg-border"}`} />
                <span className={noodle ? "text-foreground font-medium" : "text-muted-foreground"}>Noodles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full transition-colors ${selectedToppings.length > 0 ? "bg-primary" : "bg-border"}`} />
                <span className={selectedToppings.length > 0 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  Toppings {selectedToppings.length > 0 && `(${selectedToppings.length})`}
                </span>
              </div>
            </div>

            {/* Order Summary - visible on large screens */}
            <div className="hidden lg:block w-full max-w-md">
              <OrderSummary
                soup={soup}
                noodle={noodle}
                selectedToppings={selectedToppings}
                onReset={handleReset}
                onComplete={() => setShowCelebration(true)}
              />
            </div>
          </div>

          {/* Right side: Selectors */}
          <div className="flex flex-col gap-8">
            {/* Step indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Build Your Bowl
              </span>
              <span className="text-xs text-muted-foreground">{"・"}</span>
              <span className="text-xs text-muted-foreground">
                {!soup ? "Step 1: Choose broth" : !noodle ? "Step 2: Pick noodles" : "Step 3: Add toppings"}
              </span>
            </div>

            <SoupSelector selected={soup} onSelect={setSoup} />
            
            <div className="h-px bg-border" />
            
            <NoodleSelector selected={noodle} onSelect={setNoodle} />
            
            <div className="h-px bg-border" />
            
            <ToppingSelector selected={selectedToppings} onToggle={handleToggleTopping} />

            {/* Order Summary - visible on small screens */}
            <div className="lg:hidden">
              <OrderSummary
                soup={soup}
                noodle={noodle}
                selectedToppings={selectedToppings}
                onReset={handleReset}
                onComplete={() => setShowCelebration(true)}
              />
            </div>
          </div>
        </div>

        {/* Celebration overlay */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm">
            <div className="bg-card rounded-2xl p-8 max-w-sm text-center shadow-2xl mx-4">
              <p className="text-5xl mb-4">{"🍜"}</p>
              <h2 className="text-2xl font-bold text-foreground mb-2">Itadakimasu!</h2>
              <p className="text-muted-foreground text-sm mb-1">{"いただきます！"}</p>
              <p className="text-muted-foreground text-sm mb-6">Your perfect bowl is ready to enjoy!</p>
              <button
                onClick={() => setShowCelebration(false)}
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Footer wave */}
        <div className="flex items-center gap-3 mt-12 mb-6">
          <div className="h-px flex-1 bg-border" />
          <svg viewBox="0 0 60 20" className="w-16 h-5 text-primary/30" aria-hidden="true">
            <path d="M0,10 Q15,0 30,10 Q45,20 60,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0,14 Q15,4 30,14 Q45,24 60,14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
          <div className="h-px flex-1 bg-border" />
        </div>

        <footer className="text-center pb-8">
          <p className="text-xs text-muted-foreground">
            {"Made with 🍜 & ❤️ — Ramen Lab ラーメン工房"}
          </p>
        </footer>
      </main>
    </div>
  )
}
