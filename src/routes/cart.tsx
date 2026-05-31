import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, cartTotal } from "@/stores/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Brew & Bean" },
      { name: "description", content: "Review your coffee selections before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const subtotal = cartTotal(items);
  const shipping = subtotal === 0 ? 0 : subtotal >= 30 ? 0 : 5;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
          <ShoppingBag className="h-6 w-6" />
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Start with something bright and floral, or something dark and syrupy.</p>
        <Link
          to="/menu"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Your cart</h1>
        <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive">
          Clear all
        </button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {items.map((i) => (
            <li
              key={`${i.slug}-${i.size}`}
              className="flex gap-4 rounded-2xl bg-card p-4 shadow-soft sm:p-5"
            >
              <img
                src={i.image}
                alt={i.name}
                className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight">{i.name}</h3>
                    <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">{i.size}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-accent">
                    ${(i.price * i.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      onClick={() => setQty(i.slug, i.size, i.quantity - 1)}
                      className="grid h-9 w-9 place-items-center rounded-l-full hover:bg-secondary"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold">{i.quantity}</span>
                    <button
                      onClick={() => setQty(i.slug, i.size, i.quantity + 1)}
                      className="grid h-9 w-9 place-items-center rounded-r-full hover:bg-secondary"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(i.slug, i.size)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl bg-card p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            {subtotal < 30 && (
              <p className="rounded-lg bg-secondary p-3 text-xs text-secondary-foreground">
                Add ${(30 - subtotal).toFixed(2)} more for free shipping.
              </p>
            )}
            <div className="flex justify-between border-t border-border pt-4 text-base">
              <dt className="font-display font-semibold">Total</dt>
              <dd className="font-display font-semibold text-accent">${total.toFixed(2)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Proceed to checkout
          </Link>
          <Link
            to="/menu"
            className="mt-2 inline-flex w-full items-center justify-center text-sm text-muted-foreground hover:text-foreground"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
