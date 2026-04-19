import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How long does it take to build a website?", a: "Most projects are completed within 2-4 weeks, depending on complexity. We'll give you a clear timeline during your free consultation." },
  { q: "Do you provide web hosting?", a: "Yes! We offer fast, secure hosting with 99.9% uptime, free SSL, daily backups, and 24/7 monitoring included in our hosting plans." },
  { q: "Can I update the website myself?", a: "Absolutely. We build sites with easy-to-use content management so you can make updates anytime without technical knowledge." },
  { q: "What if I already have a website?", a: "No problem! We can redesign, optimize, or migrate your existing site to modern standards and better hosting." },
  { q: "Do you offer ongoing support?", a: "Yes. We offer maintenance packages that include updates, security monitoring, backups, and priority support." },
  { q: "How much does a website cost?", a: "Our pricing depends on your needs. We offer transparent quotes with no hidden fees. Contact us for a free estimate!" },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left font-semibold transition hover:text-primary"
              >
                {q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${
                  openIndex === i ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="px-5 text-muted-foreground">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
