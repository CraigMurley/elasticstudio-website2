import { useEffect, useRef, useState, ReactNode } from "react";

const GENTLE = "cubic-bezier(.2,.7,.2,1)";

const useInView = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
};

type Props = { children: ReactNode; delay?: number; className?: string };

const Reveal = ({ children, delay = 0, className = "" }: Props) => {
  const { ref, shown } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .8s ${GENTLE} ${delay}ms, transform .9s ${GENTLE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/** Headline line that rises out from behind its own baseline, one line at a time. */
const RevealLine = ({ children, delay = 0, className = "" }: Props) => {
  const { ref, shown } = useInView();
  return (
    <span
      ref={ref as unknown as React.RefObject<HTMLSpanElement>}
      className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`}
    >
      <span
        className="block"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(112%)",
          transition: `opacity .9s ${GENTLE} ${delay}ms, transform 1s ${GENTLE} ${delay}ms`,
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </span>
  );
};

export { RevealLine };
export default Reveal;
