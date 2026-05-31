import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { coffees, categories, type Category } from "@/data/coffees";
import { CoffeeCard } from "@/components/CoffeeCard";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Brew & Bean" },
      {
        name: "description",
        content: "Browse all 16 single-origin, espresso, cold brew, and specialty coffees.",
      },
      { property: "og:title", content: "Menu — Brew & Bean" },
      {
        property: "og:description",
        content: "Browse all 16 single-origin, espresso, cold brew, and specialty coffees.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return coffees.filter((c) => {
      const matchCat = cat === "All" || c.category === cat;
      const text = `${c.name} ${c.origin} ${c.notes.join(" ")}`.toLowerCase();
      const matchQ = q.trim() === "" || text.includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [cat, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          The full menu
        </p>
        <h1 className="mt-2 font-display text-5xl font-semibold sm:text-6xl">
          Every bean we roast.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sixteen coffees, from bright Ethiopian washed lots to syrupy Sumatran wet-hulled
          classics. Filter by category or search by flavor.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c as Category | "All")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search flavor or origin"
            className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-4 text-sm outline-none ring-ring/40 focus:ring-2 sm:w-72"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((c, i) => (
          <CoffeeCard key={c.slug} coffee={c} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No coffees match your search.
        </p>
      )}
    </div>
  );
}
