import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

type Search = { order?: string; total?: string };

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    order: typeof s.order === "string" ? s.order : undefined,
    total: typeof s.total === "string" ? s.total : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order confirmed — Brew & Bean" },
      { name: "description", content: "Thank you for your order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { order, total } = Route.useSearch();
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">
        Order confirmed
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Thanks for ordering with Brew &amp; Bean. We'll roast and ship your beans within
        48 hours. A receipt is on its way to your inbox.
      </p>
      <div className="mt-8 w-full max-w-sm rounded-2xl bg-card p-6 text-left shadow-soft">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Order number</span>
          <span className="font-mono font-semibold">{order ?? "BB-DEMO"}</span>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-muted-foreground">Total charged</span>
          <span className="font-display font-semibold text-accent">
            ${total ?? "0.00"}
          </span>
        </div>
      </div>
      <Link
        to="/menu"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Keep shopping
      </Link>
    </div>
  );
}
