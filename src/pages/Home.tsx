import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";

// Which section label to show in the navbar
type ActiveSection = "home" | "project" | "about" | "blog" | "contact";

const SECTION_LABELS: Partial<Record<ActiveSection, string>> = {
  project: "// Explore Work",
  about:   "// Skills",
};

export default function App() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [nearBottom, setNearBottom]       = useState(false);

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-menu]")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Track active section for navbar label ─────────────────────────────────
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as ActiveSection);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ── Hide scroll indicator when near page bottom ───────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const { scrollY, innerHeight } = window;
      const docH = document.documentElement.scrollHeight;
      setNearBottom(scrollY + innerHeight > docH - 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const navLabel   = SECTION_LABELS[activeSection];

  return (
    // Outer wrapper — just stacks children, no overflow tricks
    <div style={{ background: "#1c1c1c", minHeight: "100vh" }}>

      {/* ── ONE sticky navbar ───────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40"
        style={{ background: "#1c1c1c" }}
      >
        <Navbar
          label={navLabel}
          menuOpen={menuOpen}
          onToggleMenu={toggleMenu}
        />
        {/* 1 px separator so sections don't visually merge with nav */}
        <div className="h-px bg-white/5" />
      </div>

      {/* ── Sections — plain document flow ─────────────────────────────────── */}
      <Header />
      <SkillsSection />
      <ProjectsSection />

      {/* ── ONE fixed scroll indicator ──────────────────────────────────────── */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30 transition-opacity duration-500"
        style={{ opacity: nearBottom ? 0 : 1, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div className="w-px h-16 bg-white/20" />
        <span className="scroll-label">SCROLL</span>
      </div>

      {/* ── ONE FAB ─────────────────────────────────────────────────────────── */}
      <button
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/55 hover:text-white hover:border-white/60 transition-colors text-lg"
        aria-label="More options"
      >
        +
      </button>
    </div>
  );
}