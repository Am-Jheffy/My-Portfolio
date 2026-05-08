import { useEffect, useRef } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// FLOATING DOT
// Small green accent dot with subtle mouse-parallax.
// Position it by wrapping in a `relative` container and passing top/right.
// ══════════════════════════════════════════════════════════════════════════════
interface FloatingDotProps {
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
}

export default function FloatingDot({
  top,
  right,
  left,
  bottom,
}: FloatingDotProps) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;
      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="absolute w-3 h-3 rounded-full pointer-events-none"
      style={{
        background: "var(--green)",
        top,
        right,
        left,
        bottom,
        transition: "transform 0.7s ease-out",
        zIndex: 10,
      }}
    />
  );
}