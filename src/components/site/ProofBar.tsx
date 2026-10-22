import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const stats = [
  { value: 33, suffix: "", label: "International Creative Awards" },
  { value: 30, suffix: "+", label: "YEARS OF EXPERTISE" },
  { value: 3, suffix: "", label: "CONTINENTS OF EXPERIENCE" },
];

const DURATION = 1500;

/** Headless/automated browsers (incl. our build-time prerender) and
 *  reduced-motion users never animate, so the snapshot HTML always holds the
 *  real values. */
const shouldAnimate = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  if (navigator.webdriver) return false;
  if (/bot|crawl|spider|slurp|headless|preview|facebookexternalhit|whatsapp|linkedin/i.test(navigator.userAgent)) return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  return typeof IntersectionObserver !== "undefined";
};

const CountUp = ({ end, suffix }: { end: number; suffix: string }) => {
  // Final value is the default render; animation is a client-only enhancement.
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldAnimate()) return;

    // Only animate if the counter is still below the fold, so a visitor
    // never sees the real number flick back to 1.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    let raf = 0;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const from = 1;
      setCount(from);
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(from + (end - from) * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end]);

  return (
    <span ref={ref}>
      {/* Real value always present for screen readers and text extractors. */}
      <span className="sr-only">
        {end}
        {suffix}
      </span>
      <span aria-hidden="true">
        {count}
        {suffix}
      </span>
    </span>
  );
};

const ProofBar = () => (
  <section className="bg-surface py-[60px]" aria-label="Elastic Studio in numbers">
    <div className="container-x grid grid-cols-3 gap-4 md:gap-10">
      {stats.map((s) => (
        <div key={s.label} className="reveal flex flex-col items-center gap-3 text-center md:border-l-0 md:pl-0">
          <span className="font-display font-extralight leading-none text-primary sm:text-6xl md:text-8xl text-4xl">
            <CountUp end={s.value} suffix={s.suffix} />
          </span>
          <span className="label-eyebrow max-w-[18ch] text-[10px] md:text-[11px]">{s.label}</span>
        </div>
      ))}
    </div>
    <p className="container-x mt-10 text-center text-sm font-light leading-relaxed text-muted-foreground md:mt-12">
      Including Gold for Best Television and Best Ambient at Creatives (judged in Paris), Best Digital Campaign at the
      Orange Global Brand Awards, and Bronze at The Loeries.{" "}
      <Link to="/awards" className="text-primary underline-offset-4 hover:underline">
        See every award
      </Link>
    </p>
  </section>
);

export default ProofBar;
