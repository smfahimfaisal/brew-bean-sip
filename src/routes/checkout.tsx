import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, CreditCard, Loader2 } from "lucide-react";
import { useCart, cartTotal } from "@/stores/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Brew & Bean" },
      { name: "description", content: "Complete your order." },
    ],
  }),
  component: CheckoutPage,
});

// Luhn check
const luhn = (num: string) => {
  const digits = num.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

const cardBrand = (num: string) => {
  const n = num.replace(/\D/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^6/.test(n)) return "Discover";
  return "";
};

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  name: z.string().min(2, "Name is required"),
  address: z.string().min(4, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(3, "ZIP is required").max(10),
  cardholder: z.string().min(2, "Cardholder name required"),
  cardNumber: z
    .string()
    .transform((v) => v.replace(/\s/g, ""))
    .refine((v) => luhn(v), { message: "Invalid card number" }),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY")
    .refine(
      (v) => {
        const [mm, yy] = v.split("/").map((n) => parseInt(n, 10));
        const now = new Date();
        const exp = new Date(2000 + yy, mm); // first of next month
        return exp > now;
      },
      { message: "Card is expired" },
    ),
  cvv: z.string().regex(/^\d{3,4}$/, "3 or 4 digits"),
});

type FormValues = z.input<typeof schema>;

function formatCard(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = cartTotal(items);
  const shipping = subtotal === 0 ? 0 : subtotal >= 30 ? 0 : 5;
  const total = subtotal + shipping;

  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      zip: "",
      cardholder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  const cardNumber = watch("cardNumber") || "";
  const brand = cardBrand(cardNumber);

  if (items.length === 0 && !processing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <Link to="/menu" className="mt-4 inline-block text-accent underline">
          Browse the menu
        </Link>
      </div>
    );
  }

  const onSubmit = (_data: FormValues) => {
    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      const orderId = `BB-${Date.now().toString(36).toUpperCase()}`;
      const orderTotal = total;
      clear();
      navigate({
        to: "/checkout/success",
        search: { order: orderId, total: orderTotal.toFixed(2) } as never,
      });
    }, 1600);
  };

  const inputCls =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring/40 focus:ring-2";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        <Lock className="mr-1 inline h-3.5 w-3.5" />
        Demo checkout. Card details are validated locally — no real charge is made.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl font-semibold">Contact &amp; shipping</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
                <input className={inputCls} {...register("email")} placeholder="you@email.com" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Full name</label>
                <input className={inputCls} {...register("name")} placeholder="Jane Doe" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Address</label>
                <input className={inputCls} {...register("address")} placeholder="412 Mill Lane" />
                {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">City</label>
                <input className={inputCls} {...register("city")} placeholder="Brooklyn" />
                {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">ZIP</label>
                <input className={inputCls} {...register("zip")} placeholder="11201" />
                {errors.zip && <p className="mt-1 text-xs text-destructive">{errors.zip.message}</p>}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">Card payment</h2>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Secured
              </span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Cardholder name</label>
                <input className={inputCls} {...register("cardholder")} placeholder="As shown on card" />
                {errors.cardholder && <p className="mt-1 text-xs text-destructive">{errors.cardholder.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Card number</label>
                <div className="relative">
                  <input
                    className={inputCls + " pr-20 font-mono tracking-wider"}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    value={cardNumber}
                    onChange={(e) => setValue("cardNumber", formatCard(e.target.value), { shouldValidate: true })}
                    placeholder="1234 5678 9012 3456"
                  />
                  <span className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[11px] font-semibold text-secondary-foreground">
                    <CreditCard className="h-3 w-3" />
                    {brand || "Card"}
                  </span>
                </div>
                {errors.cardNumber && <p className="mt-1 text-xs text-destructive">{errors.cardNumber.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Expiry (MM/YY)</label>
                <input
                  className={inputCls + " font-mono"}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  value={watch("expiry") || ""}
                  onChange={(e) => setValue("expiry", formatExpiry(e.target.value), { shouldValidate: true })}
                  placeholder="12/28"
                />
                {errors.expiry && <p className="mt-1 text-xs text-destructive">{errors.expiry.message}</p>}
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">CVV</label>
                <input
                  className={inputCls + " font-mono"}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  maxLength={4}
                  {...register("cvv")}
                  placeholder="123"
                />
                {errors.cvv && <p className="mt-1 text-xs text-destructive">{errors.cvv.message}</p>}
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-card p-6 shadow-soft lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <ul className="mt-4 max-h-64 space-y-3 overflow-auto pr-1">
            {items.map((i) => (
              <li key={`${i.slug}-${i.size}`} className="flex gap-3 text-sm">
                <img src={i.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="font-medium leading-tight">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.size} · ×{i.quantity}</p>
                </div>
                <p className="font-medium">${(i.price * i.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-display font-semibold">Total</dt>
              <dd className="font-display font-semibold text-accent">${total.toFixed(2)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            disabled={processing}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" /> Pay ${total.toFixed(2)}
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            By placing this order you agree to our terms. Demo only — no charge.
          </p>
        </aside>
      </form>
    </div>
  );
}
