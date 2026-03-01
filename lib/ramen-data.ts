export type SoupBase = "tonkotsu" | "shoyu" | "miso" | "shio" | "tantanmen" | "veggie"
export type NoodleType = "shirataki" | "glass" | "udon" | "thin"
export type ToppingId =
  | "chashu"
  | "egg"
  | "nori"
  | "scallions"
  | "corn"
  | "mushrooms"
  | "bamboo"
  | "kamaboko"
  | "bokchoy"
  | "tempura"

export interface SoupOption {
  id: SoupBase
  name: string
  japanese: string
  description: string
  color: string
}

export interface NoodleOption {
  id: NoodleType
  name: string
  japanese: string
  description: string
}

export interface ToppingOption {
  id: ToppingId
  name: string
  japanese: string
  emoji: string
}

export const soupBases: SoupOption[] = [
  {
    id: "tonkotsu",
    name: "Tonkotsu",
    japanese: "豚骨",
    description: "Rich, creamy pork bone broth",
    color: "bg-amber-100",
  },
  {
    id: "shoyu",
    name: "Shoyu",
    japanese: "醤油",
    description: "Clear soy sauce based broth",
    color: "bg-amber-700",
  },
  {
    id: "miso",
    name: "Miso",
    japanese: "味噌",
    description: "Hearty fermented soybean broth",
    color: "bg-amber-500",
  },
  {
    id: "shio",
    name: "Shio",
    japanese: "塩",
    description: "Light and delicate salt broth",
    color: "bg-amber-50",
  },
  {
    id: "tantanmen",
    name: "Tantanmen",
    japanese: "担々麺",
    description: "Spicy sesame broth with chili oil",
    color: "bg-red-400",
  },
  {
    id: "veggie",
    name: "Veggie Green",
    japanese: "野菜",
    description: "Light herbal broth with green onion and spinach",
    color: "bg-green-400",
  },
]

export const noodleTypes: NoodleOption[] = [
  {
    id: "shirataki",
    name: "Shirataki",
    japanese: "しらたき",
    description: "Translucent, gelatinous thin noodles from konjac",
  },
  {
    id: "glass",
    name: "Glass Noodles",
    japanese: "春雨",
    description: "Clear, slippery noodles from mung bean starch",
  },
  {
    id: "udon",
    name: "Udon",
    japanese: "うどん",
    description: "Thick, chewy wheat flour noodles",
  },
  {
    id: "thin",
    name: "Thin Noodles",
    japanese: "細麺",
    description: "Delicate and firm, classic ramen noodles",
  },
]

export const toppings: ToppingOption[] = [
  { id: "chashu", name: "Chashu Pork", japanese: "チャーシュー", emoji: "🍖" },
  { id: "egg", name: "Soft-Boiled Egg", japanese: "味玉", emoji: "🥚" },
  { id: "nori", name: "Nori", japanese: "海苔", emoji: "🟫" },
  { id: "scallions", name: "Scallions", japanese: "ネギ", emoji: "🟢" },
  { id: "corn", name: "Sweet Corn", japanese: "コーン", emoji: "🌽" },
  { id: "mushrooms", name: "Mushrooms", japanese: "きのこ", emoji: "🍄" },
  { id: "bamboo", name: "Bamboo Shoots", japanese: "メンマ", emoji: "🎋" },
  { id: "kamaboko", name: "Narutomaki", japanese: "鳴門巻き", emoji: "🍥" },
  { id: "bokchoy", name: "Bok Choy", japanese: "青梗菜", emoji: "🥬" },
  { id: "tempura", name: "Tempura", japanese: "天ぷら", emoji: "🍤" },
]
