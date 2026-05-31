export type Category = "Single Origin" | "Espresso" | "Cold" | "Specialty";
export type Roast = "Light" | "Medium" | "Medium-Dark" | "Dark";

export interface Coffee {
  slug: string;
  name: string;
  origin: string;
  category: Category;
  roast: Roast;
  price: number;
  tagline: string;
  notes: string[];
  description: string;
  image: string;
}

export const coffees: Coffee[] = [
  {
    slug: "ethiopian-yirgacheffe",
    name: "Ethiopian Yirgacheffe",
    origin: "Yirgacheffe, Ethiopia",
    category: "Single Origin",
    roast: "Light",
    price: 22,
    tagline: "Bright, floral, unmistakably Ethiopia.",
    notes: ["Jasmine", "Bergamot", "Lemon zest"],
    description:
      "Grown at 1,900m in the birthplace of coffee, this washed Yirgacheffe is delicate and tea-like with a sparkling citrus finish.",
    image:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "colombian-supremo",
    name: "Colombian Supremo",
    origin: "Huila, Colombia",
    category: "Single Origin",
    roast: "Medium",
    price: 19,
    tagline: "The everyday classic, perfected.",
    notes: ["Milk chocolate", "Toasted almond", "Red apple"],
    description:
      "A balanced, full-bodied cup sourced from smallholder farms in Huila. Smooth, sweet, and endlessly drinkable.",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "sumatra-mandheling",
    name: "Sumatra Mandheling",
    origin: "Aceh, Indonesia",
    category: "Single Origin",
    roast: "Dark",
    price: 21,
    tagline: "Earthy, syrupy, deeply satisfying.",
    notes: ["Dark cocoa", "Cedar", "Brown sugar"],
    description:
      "Wet-hulled in the Indonesian tradition, this Sumatra is heavy-bodied with low acidity and a long, syrupy finish.",
    image:
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "brazilian-santos",
    name: "Brazilian Santos",
    origin: "Minas Gerais, Brazil",
    category: "Single Origin",
    roast: "Medium",
    price: 17,
    tagline: "Nutty, mellow, eternally crowd-pleasing.",
    notes: ["Hazelnut", "Cocoa", "Caramel"],
    description:
      "Pulped-natural processing gives this Brazilian its trademark nuttiness and creamy body. A reliable daily driver.",
    image:
      "https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "kenya-aa",
    name: "Kenya AA",
    origin: "Nyeri, Kenya",
    category: "Single Origin",
    roast: "Light",
    price: 24,
    tagline: "Wine-like, bold, unforgettable acidity.",
    notes: ["Black currant", "Grapefruit", "Brown sugar"],
    description:
      "Top-grade AA beans from Nyeri, fully washed and sun-dried. Juicy, complex, and absolutely electric.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "costa-rican-tarrazu",
    name: "Costa Rican Tarrazú",
    origin: "Tarrazú, Costa Rica",
    category: "Single Origin",
    roast: "Medium",
    price: 20,
    tagline: "Clean, crisp, mountain-grown clarity.",
    notes: ["Honey", "Orange", "Almond"],
    description:
      "Grown in volcanic soil at high altitude. Bright but balanced, with a clean honeyed sweetness.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "guatemalan-antigua",
    name: "Guatemalan Antigua",
    origin: "Antigua, Guatemala",
    category: "Single Origin",
    roast: "Medium-Dark",
    price: 21,
    tagline: "Smoky, chocolaty, full of character.",
    notes: ["Dark chocolate", "Smoke", "Spice"],
    description:
      "Volcanic minerals and shade-growing produce a complex cup with a velvety body and a hint of cocoa.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "house-espresso",
    name: "House Espresso",
    origin: "Blend",
    category: "Espresso",
    roast: "Medium-Dark",
    price: 18,
    tagline: "Our flagship pull. Sweet, syrupy, balanced.",
    notes: ["Toffee", "Hazelnut", "Cocoa"],
    description:
      "A blend of Brazilian and Ethiopian beans built for espresso. Sweet shots and creamy milk drinks.",
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "french-roast",
    name: "French Roast",
    origin: "Blend",
    category: "Espresso",
    roast: "Dark",
    price: 18,
    tagline: "Bold and smoky, the way Paris likes it.",
    notes: ["Burnt sugar", "Smoke", "Dark chocolate"],
    description:
      "Roasted past second crack for an intense, smoky cup with a bittersweet edge.",
    image:
      "https://images.unsplash.com/photo-1559525839-d9acfd02363a?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "italian-roast",
    name: "Italian Roast",
    origin: "Blend",
    category: "Espresso",
    roast: "Dark",
    price: 19,
    tagline: "Heavy crema, traditional Italian intensity.",
    notes: ["Molasses", "Cocoa", "Roasted nut"],
    description:
      "A classic deep-roast espresso blend that delivers heavy crema and a punchy, bittersweet profile.",
    image:
      "https://images.unsplash.com/photo-1572286258217-215c98a5ddb6?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "decaf-swiss-water",
    name: "Decaf Swiss Water",
    origin: "Colombia",
    category: "Specialty",
    roast: "Medium",
    price: 20,
    tagline: "All the flavor. None of the buzz.",
    notes: ["Caramel", "Cocoa", "Cherry"],
    description:
      "Chemical-free Swiss Water decaffeination preserves a remarkably full, sweet cup. 99.9% caffeine free.",
    image:
      "https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "cold-brew-concentrate",
    name: "Cold Brew Concentrate",
    origin: "Blend",
    category: "Cold",
    roast: "Medium-Dark",
    price: 16,
    tagline: "16-hour steep. Smooth and chocolaty.",
    notes: ["Dark chocolate", "Vanilla", "Brown sugar"],
    description:
      "Coarse-ground and steeped cold for 16 hours. Dilute 1:1 with water or milk for the smoothest cup of the summer.",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "vanilla-bean-latte",
    name: "Vanilla Bean Latte Blend",
    origin: "Flavored",
    category: "Specialty",
    roast: "Medium",
    price: 17,
    tagline: "Real Madagascar vanilla, no syrups.",
    notes: ["Vanilla", "Cream", "Honey"],
    description:
      "Slow-infused with real Madagascar vanilla beans during roasting. Naturally sweet, no flavor syrup needed.",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "caramel-macchiato",
    name: "Caramel Macchiato Blend",
    origin: "Flavored",
    category: "Specialty",
    roast: "Medium-Dark",
    price: 17,
    tagline: "Buttery caramel, no sugar overload.",
    notes: ["Caramel", "Butter", "Toasted sugar"],
    description:
      "A medium-dark blend infused with real caramelized sugar for a buttery, dessert-like finish.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "mocha-java",
    name: "Mocha Java",
    origin: "Yemen & Indonesia",
    category: "Specialty",
    roast: "Medium-Dark",
    price: 23,
    tagline: "The original blend, since the 17th century.",
    notes: ["Cocoa", "Earth", "Spice"],
    description:
      "The world's oldest coffee blend. Pairs the wine-like complexity of Yemeni Mocha with the earthy body of Java.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
  {
    slug: "holiday-spice",
    name: "Holiday Spice",
    origin: "Seasonal Blend",
    category: "Specialty",
    roast: "Medium",
    price: 19,
    tagline: "Cinnamon, clove, and a fire in the hearth.",
    notes: ["Cinnamon", "Clove", "Orange peel"],
    description:
      "A seasonal favorite infused with warming spices. Brews like a cup of holiday morning, year-round.",
    image:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80",
  },
];

export const categories: Category[] = ["Single Origin", "Espresso", "Cold", "Specialty"];

export function getCoffee(slug: string) {
  return coffees.find((c) => c.slug === slug);
}
