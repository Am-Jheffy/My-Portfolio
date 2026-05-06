import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "Twitter (X)", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "CodePen", href: "#" },
];

// ─── Floating dot component ───────────────────────────────────────────────────
function FloatingDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dotRef.current) return;
      const { clientX, clientY } = e;
      // Subtle parallax — dot drifts slightly toward cursor
      const x = (clientX / window.innerWidth - 0.5) * 60;
      const y = (clientY / window.innerHeight - 0.5) * 60;
      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={dotRef}
      className="absolute w-3 h-3 rounded-full bg-[#6EFF6E] transition-transform duration-700 ease-out"
      style={{ top: "38%", right: "25%" }}
    />
  );
}

// ─── Menu Dropdown ────────────────────────────────────────────────────────────
function MenuDropdown({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
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
              className="block px-6 py-3 text-[#1a1a1a] text-sm font-medium hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-menu]")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Google Font — Barlow Condensed for the big name */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --green: #6EFF6E;
          --bg: #1c1c1c;
        }

        body {
          background: var(--bg);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        .hero-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(62px, 10vw, 150px);
          line-height: 0.88;
          letter-spacing: -0.02em;
          color: var(--green);
          text-transform: uppercase;
          user-select: none;
        }

        .scroll-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden" style={{ background: "#1c1c1c" }}>

        {/* ── Background glow behind portrait ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 55% 60%, rgba(40,120,40,0.28) 0%, transparent 70%)",
          }}
        />

        {/* ══════════ NAVBAR ══════════ */}
        <header className="relative z-30 flex items-center justify-between px-8 pt-7 pb-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-white text-sm font-semibold tracking-wide"
          >
            BRUNO SIMON
          </motion.span>

          {/* Menu button */}
          <div className="relative" data-menu>
            <button
              onClick={() => setMenuOpen((v) => !v)}
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
            <MenuDropdown isOpen={menuOpen} />
          </div>
        </header>

        {/* ══════════ HERO ══════════ */}
        <main className="relative z-10 px-8">

          {/* Subtitle row */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-white text-base font-medium mb-3 flex items-center gap-2"
          >
            Hey, 👋 I'm a Full Stack Developer
          </motion.p>

          {/* Giant name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="hero-name relative z-20"
          >
            JEFFERSON ONUNWA
          </motion.h1>

          {/* Portrait — absolutely positioned to overlap name */}
          <div
            className="absolute left-1/2 -translate-x-[42%] z-10 pointer-events-none select-none"
            style={{ top: "80px", width: "clamp(340px, 55vw, 760px)" }}
          >
            {/* Placeholder portrait — replace <img> src with your actual image */}
            <div
              className="w-full"
              style={{
                aspectRatio: "3/4",
                background:
                  "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(255,255,255,0.05) 0%, transparent 70%)",
              }}
            >
              {/*
                Place your portrait here:
                <img src="/portrait.jpg" alt="Bruno Simon" className="w-full h-full object-cover" />

                For demo purposes we render a dark silhouette placeholder:
              */}
              <svg
                viewBox="0 0 400 533"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 0 60px rgba(40,180,40,0.15))" }}
              >
                {/* Soft body silhouette */}
                <defs>
                  <radialGradient id="glow" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#2a5a2a" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#1c1c1c" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="skinGrad" cx="50%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#b07c60" />
                    <stop offset="100%" stopColor="#5a3a28" />
                  </radialGradient>
                </defs>
                <ellipse cx="200" cy="260" rx="200" ry="273" fill="url(#glow)" />
                {/* Shoulders / torso */}
                <path
                  d="M60 533 Q100 380 200 360 Q300 380 340 533Z"
                  fill="#2a2a2a"
                />
                {/* Neck */}
                <rect x="178" y="295" width="44" height="80" rx="10" fill="url(#skinGrad)" />
                {/* Head */}
                <ellipse cx="200" cy="250" rx="90" ry="108" fill="url(#skinGrad)" />
                {/* Hair */}
                <ellipse cx="200" cy="165" rx="92" ry="55" fill="#1a0f08" />
                <path
                  d="M110 230 Q108 160 155 140 Q200 120 245 140 Q292 160 290 230 Q270 150 200 148 Q130 150 110 230Z"
                  fill="#1a0f08"
                />
                {/* Eyes — closed / looking up feel */}
                <ellipse cx="170" cy="255" rx="14" ry="9" fill="#2a1a10" />
                <ellipse cx="230" cy="255" rx="14" ry="9" fill="#2a1a10" />
                {/* Nose */}
                <path
                  d="M195 265 Q192 285 185 292 Q200 296 215 292 Q208 285 205 265Z"
                  fill="rgba(0,0,0,0.2)"
                />
                {/* Mouth */}
                <path
                  d="M180 308 Q200 316 220 308"
                  stroke="#7a4030"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Floating green dot with parallax */}
          <FloatingDot />

          {/* Right-side description text */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="absolute right-8 text-white/80 text-sm leading-relaxed max-w-[260px] z-20"
            style={{ top: "calc(80px + 52vh)" }}
          >
            I craft fast, scalable, and user-friendly web applications with modern JavaScript frameworks — combining React on the frontend with robust server-side solutions using Node.js.
          </motion.p>

          {/* Scroll indicator */}
          <div
            className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20"
          >
            <div className="w-px h-16 bg-white/20" />
            <span className="scroll-label">SCROLL</span>
          </div>

        </main>

        {/* ══════════ FOOTER ROW ══════════ */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-20 flex items-end justify-between px-8 pb-7 pointer-events-none"
        >
          {/* Contact info */}
          <div className="text-white/70 text-xs leading-6 pointer-events-auto">
            <div>
              <span className="font-bold text-white/40 mr-2">E</span>
              info@brunosimon.com
            </div>
            <div>
              <span className="font-bold text-white/40 mr-2">T</span>
              +39 03 463 853 02
            </div>
          </div>

          {/* Social links */}
          <div className="flex gap-5 text-white/60 text-xs pointer-events-auto">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-white transition-colors"
              >
                / {s.label}
              </a>
            ))}
          </div>
        </motion.footer>

        {/* ══════════ FAB (+) button ══════════ */}
        <button
          className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors text-lg"
          aria-label="More"
        >
          +
        </button>

      </div>
    </>
  );
}