import { useState } from "react";
import { Link } from "react-router-dom";
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
    <header className="fixed inset-x-0 top-0 z-50 bg-slate-900/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
        <a href="#" className="text-xl font-bold text-primary-foreground">
          Web Starter
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-primary-foreground/80 transition hover:text-primary-foreground"
            >
              {label}
            </a>
          ))}

          <Link
            to="/contact"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Contact Us
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-primary-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-900 px-6 py-4 md:hidden">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-primary-foreground/70 transition hover:text-primary-foreground"
            >
              {label}
            </a>
          ))}

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg bg-primary py-3 text-center font-semibold text-primary-foreground"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
