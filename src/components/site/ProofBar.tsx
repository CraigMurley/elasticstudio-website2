import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 33, suffix: "", label: "International Creative Awards" },
  { value: 30, suffix: "+", label: "YEARS OF EXPERTISE" },
  { value: 3, suffix: "", label: "CONTINENTS OF EXPERIENCE" },
];

const DURATION = 1500;

const CountUp = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(1);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const from = 1;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - t, 3);
        const next = Math.round(from + (end - from) * eased);
        setCount(next);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const ProofBar = () => (
  <section className="bg-surface py-[60px]">
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
  </section>
);

export default ProofBar;