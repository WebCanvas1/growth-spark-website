import { CheckCircle, Zap, Users, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed — your site loads in under 2 seconds." },
  { icon: Users, title: "Small Business Experts", desc: "We specialize in helping local businesses thrive online." },
  { icon: HeartHandshake, title: "Personal Touch", desc: "You're not a ticket number. We build real relationships." },
  { icon: CheckCircle, title: "No Hidden Fees", desc: "Transparent pricing with no surprises, ever." },
];

const WhyUsSection = () => (
  <section id="why-us" className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <div className="mb-16 text-center">
        <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
          Why Choose Us
        </span>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Built Different, Built Better</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          We're not just another web agency. Here's why businesses trust us.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
