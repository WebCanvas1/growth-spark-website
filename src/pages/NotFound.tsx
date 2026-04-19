import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
    <h1 className="text-6xl font-heading font-bold text-primary">404</h1>
    <p className="text-xl text-muted-foreground">Page not found</p>
    <Link
      to="/"
      className="mt-4 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
    >
      Return to Home
    </Link>
  </div>
);

export default NotFound;
