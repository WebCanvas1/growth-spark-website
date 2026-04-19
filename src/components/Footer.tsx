const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-xl font-heading font-bold">
          <span className="text-primary">Web</span>Starter
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebStarter. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground">Services</a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
