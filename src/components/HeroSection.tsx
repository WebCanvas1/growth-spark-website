import { useState, useEffect } from "react";
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

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background images */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            opacity: currentImage === i ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 hero-gradient-overlay" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col justify-center max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl animate-fade-in-up">
            Unlock Your Business Potential with Us
          </h1>
          <p className="mt-6 max-w-lg text-lg font-bold text-primary-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            We build beautiful, high-performing websites and provide reliable hosting
            so you can focus on what matters — growing your business.
          </p>
          <div className="mt-8 flex gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a href="#services" className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 glow-primary">
              Our Services
            </a>
            <a href="#contact" className="rounded-lg border border-primary-foreground/30 px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary-foreground/10">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-2 rounded-full transition-all ${
              currentImage === i ? "w-8 bg-primary" : "w-2 bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
