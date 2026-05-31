import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import { getCoffee, coffees } from "@/data/coffees";
import { useCart } from "@/stores/cart";
import { CoffeeCard } from "@/components/CoffeeCard";

const SIZES = [
  { label: "8 oz", mult: 0.75 },
  { label: "12 oz", mult: 1 },
  { label: "16 oz", mult: 1.35 },
];

export const Route = createFileRoute("/coffee/$slug")({
  loader: ({ params }) => {
    const coffee = getCoffee(params.slug);
    if (!coffee) throw notFound();
    return { coffee };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.coffee.name} — Brew & Bean` },
            { name: "description", content: loaderData.coffee.description },
            { property: "og:title", content: `${loaderData.coffee.name} — Brew & Bean` },
            { property: "og:description", content: loaderData.coffee.description },
            { property: "og:image", content: loaderData.coffee.image },
          ],
        }
      : {},
  component: CoffeePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl">Coffee not found</h1>
      <Link to="/menu" className="mt-4 inline-block text-accent underline">
        Back to menu
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <button onClick={reset} className="mt-4 text-accent underline">Try again</button>
    </div>
  ),
});

function CoffeePage() {
  const { coffee } = Route.useLoaderData();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const [size, setSize] = useState(SIZES[1].label);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const sizeMult = SIZES.find((s) => s.label === size)?.mult ?? 1;
  const unitPrice = +(coffee.price * sizeMult).toFixed(2);

  const handleAdd = () => {
    add(
      { slug: coffee.slug, name: coffee.name, price: unitPrice, image: coffee.image, size },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const related = coffees.filter((c) => c.slug !== coffee.slug && c.category === coffee.category).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <button
        onClick={() => router.history.back()}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="overflow-hidden rounded-3xl bg-muted shadow-soft">
          <img
            src={coffee.image}
            alt={coffee.name}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            {coffee.category} · {coffee.roast}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {coffee.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{coffee.origin}</p>
          <p className="mt-5 text-lg italic text-foreground/80">{coffee.tagline}</p>
          <p className="mt-4 text-foreground/80">{coffee.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {coffee.notes.map((n) => (
              <span
                key={n}
                className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {n}
              </span>
            ))}
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="font-display text-3xl font-semibold text-accent">
              ${unitPrice.toFixed(2)}
            </p>

            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Size</p>
              <div className="mt-2 flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSize(s.label)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      size === s.label
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="grid h-10 w-10 place-items-center rounded-l-full hover:bg-secondary"
                  aria-label="Decrease"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="grid h-10 w-10 place-items-center rounded-r-full hover:bg-secondary"
                  aria-label="Increase"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to cart
                  </>
                ) : (
                  `Add to cart — $${(unitPrice * qty).toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl font-semibold">You might also love</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((c, i) => (
              <CoffeeCard key={c.slug} coffee={c} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
