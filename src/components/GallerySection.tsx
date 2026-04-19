import { useState } from "react";
import heroGardener from "@/assets/hero-gardener.jpg";
import heroElectrician from "@/assets/hero-electrician.jpg";
import heroBakery from "@/assets/hero-bakery.jpg";

const projects = [
  { img: heroGardener, title: "Green Thumb Landscapes", category: "Gardening" },
  { img: heroElectrician, title: "SparkPro Electrical", category: "Electrical" },
  { img: heroBakery, title: "Golden Crust Bakery", category: "Food & Beverage" },
  { img: heroBakery, title: "Sweet Delights Café", category: "Food & Beverage" },
  { img: heroGardener, title: "Nature's Edge Gardens", category: "Gardening" },
  { img: heroElectrician, title: "PowerLine Solutions", category: "Electrical" },
];

const GallerySection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 section-gradient">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-semibold text-secondary-foreground">
            Our Work
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Project Gallery</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A showcase of websites we've built for small businesses just like yours.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              className="group relative overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={project.img}
                alt={project.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/80 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{project.category}</span>
                <h3 className="text-lg font-bold text-primary-foreground">{project.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
