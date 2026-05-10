import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import heroGardener from "@/assets/hero-gardener.jpg";
import heroElectrician from "@/assets/hero-electrician.jpg";
import heroBakery from "@/assets/hero-bakery.jpg";

const images = [heroGardener, heroElectrician, heroBakery];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="absolute inset-0 bg-slate-900/65" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-left text-white lg:px-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Unlock Your Business
            <br />
            Potential with Us
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/85 md:text-xl">
            We build beautiful, high-performing websites and provide reliable
            hosting so you can focus on what matters — growing your business.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
            <button
              onClick={scrollToServices}
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Our Services
            </button>

            <Link
              to="/contact"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Slider dots */}
        <div className="mt-8 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`h-2 rounded-full transition-all ${
                currentImage === i
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
