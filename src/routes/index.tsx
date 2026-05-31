import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Flame, Truck } from "lucide-react";
import heroImg from "@/assets/hero-coffee.jpg";
import storyImg from "@/assets/story-beans.jpg";
import { coffees } from "@/data/coffees";
import { CoffeeCard } from "@/components/CoffeeCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brew & Bean — Small-batch coffee, roasted weekly" },
      {
        name: "description",
        content:
          "Single-origin and small-batch coffees, roasted weekly and shipped fresh from our roastery to your door.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = coffees.slice(0, 4);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-12 pb-20 sm:px-6 md:grid-cols-2 md:items-center md:gap-16 md:pt-20 md:pb-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Roasted this week
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Coffee worth <br />
              <span className="italic text-accent">slowing down</span> for.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
              Sixteen single-origin and small-batch coffees. Roasted Tuesday,
              shipped Wednesday, brewed by you Thursday morning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Shop the menu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/menu"
                search={{ category: "Espresso" } as never}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Espresso blends
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-accent/20 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="Barista pouring latte art"
              width={1600}
              height={1200}
              className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-glow md:aspect-[5/6]"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background p-4 shadow-soft sm:block md:-bottom-8 md:-left-8"
            >
              <p className="font-display text-2xl font-semibold">4.9★</p>
              <p className="text-xs text-muted-foreground">12,400+ orders shipped</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: Leaf, title: "Direct trade", body: "Sourced from farms we visit ourselves." },
            { icon: Flame, title: "Roasted weekly", body: "Never sits on a shelf. Ever." },
            { icon: Truck, title: "Free shipping $30+", body: "Carbon-neutral delivery, US-wide." },
          ].map((v) => (
            <div key={v.title} className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-background text-accent">
                <v.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              This week's picks
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
              Featured beans
            </h2>
          </div>
          <Link
            to="/menu"
            className="hidden items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground sm:inline-flex"
          >
            View all 16 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((c, i) => (
            <CoffeeCard key={c.slug} coffee={c} index={i} />
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 overflow-hidden rounded-3xl bg-espresso text-cream md:grid-cols-2">
          <img
            src={storyImg}
            alt="Coffee beans on wood"
            loading="lazy"
            width={1200}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="flex flex-col justify-center p-8 md:p-14">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Our story
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold leading-tight">
              A roastery built around <em className="font-normal italic">one</em> question.
            </h2>
            <p className="mt-5 text-cream/80">
              What if a great cup of coffee at home wasn't an accident? We started Brew &amp; Bean
              in 2014 to find out. Today we work directly with 22 producers across four continents,
              roasting in small batches so nothing ever loses its spark.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { q: "Best coffee I've made at home, full stop.", a: "Maya R." },
            { q: "The Yirgacheffe ruined every other coffee for me.", a: "Daniel K." },
            { q: "Subscription is the only good decision I've made this year.", a: "Priya S." },
          ].map((t) => (
            <figure
              key={t.a}
              className="rounded-2xl bg-card p-6 shadow-soft"
            >
              <blockquote className="font-display text-lg leading-snug">
                “{t.q}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
