import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Coffee } from "lucide-react";
import { useState } from "react";
import { useCart, cartCount } from "@/stores/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/cart", label: "Cart" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const count = cartCount(items);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-espresso text-cream transition-transform group-hover:rotate-12">
            <Coffee className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Brew &amp; Bean
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.slice(0, 2).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
