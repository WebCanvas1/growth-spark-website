import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-primary-foreground/10 bg-foreground/60 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#hero" className="text-2xl font-heading font-bold text-primary-foreground">
          <span className="text-primary">Web</span>Starter
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm font-medium text-primary-foreground/70 transition hover:text-primary-foreground">
              {label}
            </a>
          ))}
          <a href="#contact" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            Contact Us
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="text-primary-foreground md:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-primary-foreground/10 bg-foreground/95 px-6 pb-6 md:hidden">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)} className="block py-3 text-primary-foreground/70 transition hover:text-primary-foreground">
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-3 block rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground">
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
