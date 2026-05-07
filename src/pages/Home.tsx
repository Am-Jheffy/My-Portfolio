import { useState, useEffect } from "react";
import { GLOBAL_STYLES } from "../components/Constants";
import Header from "../components/Header";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";

// ══════════════════════════════════════════════════════════════════════════════
// APP  —  Single source of truth for menu state, injected down via props.
//
// File structure:
//   constants.ts         ← shared data (NAV_ITEMS, SOCIAL_LINKS, GLOBAL_STYLES)
//   shared.tsx           ← shared components (Navbar, FloatingDot)
//   Header.tsx           ← hero / landing section
//   ProjectsSection.tsx  ← "Explore Work" project cards
//   SkillsSection.tsx    ← skills table + bio + stats
//   App.tsx              ← root, wires everything, owns menu state
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close dropdown on any outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-menu]")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <>
      {/* Global styles injected once here — never duplicated in child components */}
      <style>{GLOBAL_STYLES}</style>

      {/* 1 ── Hero */}
      <Header menuOpen={menuOpen} onToggleMenu={toggleMenu} />

      {/* 3 ── Skills / About */}
      <SkillsSection menuOpen={menuOpen} onToggleMenu={toggleMenu} />

      {/* 2 ── Projects */}
      <ProjectsSection menuOpen={menuOpen} onToggleMenu={toggleMenu} />

      {/* Global FAB — sits above all sections */}
      <button
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors text-lg"
        aria-label="More"
      >
        +
      </button>
    </>
  );
}
