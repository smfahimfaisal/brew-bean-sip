
# Brew & Bean — Coffee Shop Website

A polished, responsive coffee storefront built in React (TanStack Start) with a 16-coffee catalog, persistent cart, and a card payment checkout form (UI only — no real charges).

> Note: You asked for plain HTML/CSS/JS, but this project is a React/TanStack Start app. Building in React keeps everything working with the existing setup and still gives a fully custom look. Also: "card payment" without Stripe (or another processor) means we'll build a realistic checkout form that validates card details but does **not** actually charge money. If you want real card charging later, we'd need to plug in a processor.

## Design direction

A "modern artisan café" aesthetic — warm but refined.

- Palette: deep espresso `#2A1810`, cream `#F5EFE6`, caramel accent `#C8956D`, soft mocha surfaces
- Type: **Fraunces** (display serif) for headings, **Inter** for body
- Generous whitespace, rounded-2xl cards, soft shadows
- Smooth hover/scroll micro-interactions (framer-motion)
- Fully responsive: mobile drawer nav, fluid grids on tablet/desktop

## Pages & routes

- `/` — Hero, featured beans, "Our Story" strip, testimonials, footer
- `/menu` — Full grid of 16+ coffees with category filter (Espresso, Brewed, Cold, Specialty) + search
- `/coffee/$slug` — Product detail with size, quantity, "Add to cart"
- `/cart` — Line items, qty adjust, remove, subtotal, "Checkout"
- `/checkout` — Shipping form + card payment form (card number, expiry, CVV, name)
- `/checkout/success` — Mock order confirmation page with order number

## Coffee catalog (16 items)

Ethiopian Yirgacheffe, Colombian Supremo, Sumatra Mandheling, Brazilian Santos, Kenya AA, Costa Rican Tarrazú, Guatemalan Antigua, House Espresso, French Roast, Italian Roast, Decaf Swiss Water, Cold Brew Concentrate, Vanilla Bean Latte Blend, Caramel Macchiato Blend, Mocha Java, Holiday Spice. Each has price, roast level, tasting notes, and a generated image.

## Cart

- Zustand store with localStorage persistence
- Add, increment, decrement, remove, clear
- Header cart icon with item-count badge

## Checkout & card payment (UI only)

- Shipping form: name, email, address, city, zip
- Card form with proper UX:
  - Auto-formatted card number (groups of 4)
  - Luhn check + brand detection (Visa/Mastercard/Amex icon)
  - MM/YY expiry mask + validation (not expired)
  - 3–4 digit CVV
  - Cardholder name
  - Zod validation, inline errors
- On submit: simulate a 1.5s "processing" state, generate an order number, clear cart, redirect to `/checkout/success`
- Clear disclaimer on the page that no real charge is made

## Technical details

- Stack: TanStack Start, React 19, Tailwind v4, framer-motion, Zustand, react-hook-form + zod, lucide-react
- Design tokens added to `src/styles.css` (oklch values)
- Product data in `src/data/coffees.ts`; images generated to `src/assets/coffees/`
- No backend, no Lovable Cloud — fully client-side

## Out of scope (ask to add)

- Real card processing (needs Stripe or another processor)
- User accounts / order history
- Reviews & ratings
- Admin dashboard
