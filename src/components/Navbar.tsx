import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, SITE_NAME } from "./Constants";

// ══════════════════════════════════════════════════════════════════════════════
// NAVBAR
//
// This component is PURELY presentational — it does NOT manage position
// (sticky, fixed, relative). The parent layout (App.tsx) decides that.
//
// Props:
//   label        — optional green secondary label, e.g. "// Explore Work"
//   menuOpen     — controlled open state from App
//   onToggleMenu — toggle handler from App
// ══════════════════════════════════════════════════════════════════════════════
interface NavbarProps {
  label?: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Navbar({ label, menuOpen, onToggleMenu }: NavbarProps) {
  return (
    <nav
      className="flex items-center justify-between px-8"
      style={{
        height: "var(--nav-h, 72px)",
        background: "#1c1c1c", // always opaque — no transparency bleed
      }}
    >
      {/* ── Left: brand + optional section label ── */}
      <div className="flex items-center gap-8">
        <span className="text-white text-sm font-semibold tracking-wide select-none">
          {SITE_NAME}
        </span>
        {label && (
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--green)" }}
          >
            {label}
          </span>
        )}
      </div>

      {/* ── Right: menu pill + dropdown ── */}
      <div className="relative" data-menu>
        <button
          onClick={onToggleMenu}
          className="flex items-center gap-3 bg-white text-[#1a1a1a] rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          <span>Menu</span>
          <motion.span
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-mono"
          >
            {menuOpen ? "◁▷" : "<>"}
          </motion.span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
              style={{ minWidth: "160px" }}
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
    </nav>
  );
}