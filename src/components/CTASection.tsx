import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-primary" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.3),transparent_50%)]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-5xl">
          Ready to Grow Your Business Online?
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
          Let's build something amazing together. Get started with a free consultation today.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-4 text-lg font-bold text-secondary-foreground transition hover:opacity-90"
          >
            Get Your Free Quote
            <ArrowRight className="h-5 w-5" />
          </Link>

          <button
            onClick={scrollToServices}
            className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-8 py-4 text-lg font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            Explore Services
          </button>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
