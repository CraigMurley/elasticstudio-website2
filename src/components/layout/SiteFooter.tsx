import { Link } from "react-router-dom";
import Logo from "@/components/site/Logo";

const SiteFooter = () => {
  return (
    <footer className="border-t border-hairline bg-background">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-3 md:items-center">
          <Logo />
          <nav className="flex flex-wrap items-center justify-start gap-6 md:justify-center" aria-label="Footer">
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/portfolio" className="nav-link">Work</Link>
            <Link to="/articles" className="nav-link">Articles</Link>
            <Link to="/testimonials" className="nav-link">Testimonials</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>
          <div className="text-left md:text-right">
            <p className="font-display text-sm font-light text-foreground">BUDAPEST · LONDON · ZUG</p>
            <p className="mt-1 text-sm text-muted-foreground">elasticstudio.com</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2014–2026 Elastic Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;