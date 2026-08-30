import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = { headline?: string; cta?: string; to?: string };

const CtaBanner = ({
  headline = "Let's get the world to love your business.",
  cta = "Start the Conversation",
  to = "/contact",
}: Props) => (
  <section className="bg-primary">
    <div className="container-x flex flex-col items-start gap-8 py-20 md:flex-row md:items-center md:justify-between md:py-24">
      <h2 className="max-w-[20ch] font-display text-4xl font-light leading-[1.05] text-primary-foreground md:text-6xl">
        {headline}
      </h2>
      <Button asChild size="lg" className="rounded-full bg-foreground px-8 py-6 text-background hover:bg-foreground/90">
        <Link to={to}>{cta} →</Link>
      </Button>
    </div>
  </section>
);

export default CtaBanner;
