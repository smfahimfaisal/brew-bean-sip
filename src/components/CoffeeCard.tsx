import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Coffee } from "@/data/coffees";

export function CoffeeCard({ coffee, index = 0 }: { coffee: Coffee; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
    >
      <Link
        to="/coffee/$slug"
        params={{ slug: coffee.slug }}
        className="group block overflow-hidden rounded-2xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={coffee.image}
            alt={coffee.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
            {coffee.roast}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold leading-tight">
                {coffee.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {coffee.origin}
              </p>
            </div>
            <span className="shrink-0 font-display text-lg font-semibold text-accent">
              ${coffee.price}
            </span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {coffee.tagline}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
