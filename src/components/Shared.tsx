import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "./Constants";

// ══════════════════════════════════════════════════════════════════════════════
// NAVBAR
// Reused across Hero, Projects and Skills sections.
// Pass `label` (e.g. "// Explore Work") to show a secondary tag beside the name.
// ══════════════════════════════════════════════════════════════════════════════
interface NavbarProps {
  label?: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export function Navbar({ label, menuOpen, onToggleMenu }: NavbarProps) {
  return (
    <header className="relative z-30 flex items-center justify-between px-8 pt-7 pb-4">
      {/* Left: brand + optional section label */}
      <div className="flex items-center gap-8">
        <span className="text-white text-sm font-semibold tracking-wide">
          JEFFERSON ONUNWA
        </span>
        {label && (
          <span className="text-sm font-semibold" style={{ color: "#6EFF6E" }}>
            {label}
          </span>
        )}
      </div>

      {/* Right: menu button + dropdown */}
      <div className="relative" data-menu>
        <button
          onClick={onToggleMenu}
          className="flex items-center gap-3 bg-white text-[#1a1a1a] rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          <span>Menu</span>
          <motion.span
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-xs"
          >
            {menuOpen ? "◁▷" : "<>"}
          </motion.span>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-2xl overflow-hidden min-w-[160px] z-50"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.18 }}
                  className="block px-6 py-3 text-[#1a1a1a] text-sm font-medium hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// FLOATING DOT
// A small green dot with a subtle mouse-parallax effect.
// `top` and `right` are CSS position values (default: "38%" / "25%").
// ══════════════════════════════════════════════════════════════════════════════
interface FloatingDotProps {
  top?: string;
  right?: string;
}

export function FloatingDot({ top = "38%", right = "25%" }: FloatingDotProps) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={dotRef}
      className="absolute w-3 h-3 rounded-full pointer-events-none"
      style={{
        background: "#6EFF6E",
        top,
        right,
        transition: "transform 0.7s ease-out",
      }}
    />
  );
}