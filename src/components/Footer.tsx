import { Coffee, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-espresso text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-espresso">
              <Coffee className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-semibold">Brew &amp; Bean</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-cream/70">
            Small-batch, single-origin coffee, roasted weekly and shipped fresh.
            Made by people who take the morning ritual seriously.
          </p>
        </div>
        <div>
          <h4 className="font-display text-base text-cream">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>Single Origin</li>
            <li>Espresso Blends</li>
            <li>Cold Brew</li>
            <li>Subscriptions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base text-cream">Visit</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>412 Mill Lane</li>
            <li>Open Mon–Sun, 7a–7p</li>
            <li>hello@brewandbean.co</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            <a className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-cream/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Brew &amp; Bean Coffee Roasters. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
