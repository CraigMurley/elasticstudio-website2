import { ReactNode } from "react";

type Props = { eyebrow?: string; children: ReactNode; align?: "left" | "center"; tone?: "dark" | "light" };

const SectionHeading = ({ eyebrow, children, align = "left", tone = "dark" }: Props) => (
  <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start"}`}>
    {eyebrow && (
      <span className={`label-eyebrow ${tone === "light" ? "text-[hsl(var(--light-foreground))]/60" : ""}`}>
        <span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />
        {eyebrow}
      </span>
    )}
    <h2
      className={`max-w-[22ch] font-display text-3xl font-light leading-[1.1] md:text-5xl ${
        tone === "light" ? "text-[hsl(var(--light-foreground))]" : "text-foreground"
      } ${align === "center" ? "mx-auto" : ""}`}
    >
      {children}
    </h2>
  </div>
);

export default SectionHeading;