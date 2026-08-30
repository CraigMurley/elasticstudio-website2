import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "@/components/site/Logo";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Work" },
  { to: "/articles", label: "Articles" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="h-[3px] w-full bg-primary" aria-hidden />
      <div className="border-b border-hairline/70 bg-background/85 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild variant="default" size="sm" className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">Let's Talk</Link>
            </Button>
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-foreground md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden">
            <div className="container-x flex flex-col gap-4 pb-6 pt-2">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link text-[14px] ${isActive ? "nav-link-active" : ""}`}>
                  {l.label}
                </NavLink>
              ))}
              <Button asChild className="mt-2 w-fit rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">Let's Talk</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;