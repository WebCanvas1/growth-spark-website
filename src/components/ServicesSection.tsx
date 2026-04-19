import { Globe, Server, Paintbrush, Search, ShieldCheck, Wrench } from "lucide-react";

const services = [
  { icon: Globe, title: "Website Design & Development", desc: "Custom, mobile-responsive websites tailored to your brand and business goals." },
  { icon: Server, title: "Web Hosting", desc: "Fast, secure, and reliable hosting with 99.9% uptime guarantee." },
  { icon: Paintbrush, title: "UI/UX Design", desc: "Intuitive, beautiful interfaces that convert visitors into customers." },
  { icon: Search, title: "SEO Optimization", desc: "Get found online with search engine optimization built into every site." },
  { icon: ShieldCheck, title: "Security & SSL", desc: "Enterprise-grade security with free SSL certificates on every plan." },
  { icon: Wrench, title: "Maintenance & Support", desc: "Ongoing updates, backups, and expert support when you need it." },
];

const ServicesSection = () => (
  <section id="services" className="py-24 section-gradient">
    <div className="container mx-auto px-6">
      <div className="mb-16 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          What We Offer
        </span>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Our Services</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Everything you need to establish and grow your online presence, all under one roof.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
