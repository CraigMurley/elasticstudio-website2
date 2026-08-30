import { Link } from "react-router-dom";
import elasticIcon from "@/assets/elastic-icon.png";

type Props = { variant?: "dark" | "light"; className?: string };

const Logo = ({ variant = "dark", className = "" }: Props) => {
  const wordmarkColor = variant === "dark" ? "text-foreground" : "text-[hsl(var(--light-foreground))]";
  return (
    <Link to="/" aria-label="Elastic Studio — home" className={`group inline-flex items-center gap-3 ${className}`}>
      <img
        src={elasticIcon}
        alt="Elastic Studio"
        className="h-9 w-9 rounded-full object-cover"
        loading="eager"
        decoding="async"
      />
      <span className={`font-display text-[15px] font-light tracking-[0.04em] ${wordmarkColor}`}>
        Elastic <span className="opacity-90">Studio</span>
      </span>
    </Link>
  );
};

export default Logo;