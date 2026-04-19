import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Business",
    badge: null,
    promoPrice: "30",
    promoPriceSup: "",
    normalPrice: "",
    tagline: "For ambitious professionals",
    features: [
      { included: true, text: "Free domain for 1 year" },
      { included: true, text: "Online store (Unlimited)" },
      { included: true, text: "1 XL mailbox" },
    ],
    highlight: false,
  },
  {
    name: "Pro",
    badge: "Bestseller",
    promoPrice: "20",
    promoPriceSup: "",
    normalPrice: "",
    tagline: "For small business owners",
    features: [
      { included: true, text: "Free domain for 1 year" },
      { included: true, text: "Online store (10 products)" },
      { included: true, text: "1 mailbox" },
    ],
    highlight: true,
    social: "341,702 satisfied customers!",
  },
  {
    name: "Lite",
    badge: null,
    promoPrice: "15",
    promoPriceSup: "",
    normalPrice: "",
    tagline: "For personal projects",
    features: [
      { included: true, text: "Free domain for 1 year" },
      { included: true, text: "All features from Free" },
      { included: true, text: "No ads on website" },
    ],
    highlight: false,
  },
];

const PricingSection = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl text-primary">
          We'll help you get started
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Build your own website for just $15 per month lifetime!
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-8 text-center transition-all ${
              plan.highlight
                ? "border-primary shadow-xl shadow-primary/10 scale-105 z-10"
                : "border-border bg-card"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-6 py-1.5 text-sm font-semibold text-accent-foreground">
                {plan.badge}
              </div>
            )}

            <h3 className="mt-2 text-2xl font-bold text-foreground">{plan.name}</h3>


            <div className="mt-4 flex items-start justify-center">
              <span className="text-sm text-muted-foreground mt-2">$</span>
              <span className="text-5xl font-bold text-foreground">{plan.promoPrice}</span>
            </div>
            <p className="text-sm text-muted-foreground">per month</p>

            <p className="mt-4 italic text-primary text-sm">{plan.tagline}</p>

            <ul className="mt-6 space-y-3 text-left">
              {plan.features.map((f) => (
                <li key={f.text} className="flex items-center gap-2 text-sm">
                  {f.included ? (
                    <Check className="h-4 w-4 text-accent shrink-0" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span className={f.included ? "text-foreground" : "text-muted-foreground"}>
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => navigate(`/plan-signup?plan=${encodeURIComponent(plan.name)}`)}
              className={`mt-8 w-full rounded-full ${
                plan.highlight
                  ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                  : "variant-outline border-2 border-foreground bg-transparent text-foreground hover:bg-muted"
              }`}
            >
              Start now
            </Button>

          </div>
        ))}
      </div>

    </div>
  </section>
  );
};

export default PricingSection;
