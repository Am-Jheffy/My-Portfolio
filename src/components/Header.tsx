import { motion } from "framer-motion";
import { Navbar, FloatingDot } from "./Shared";
import { SOCIAL_LINKS } from "./Constants";

// ══════════════════════════════════════════════════════════════════════════════
// PORTRAIT SVG PLACEHOLDER
// Replace the <svg> block with:
//   <img src="/your-photo.jpg" alt="Jefferson Onunwa" className="w-full h-full object-cover" />
// once you have your actual photo.
// ══════════════════════════════════════════════════════════════════════════════
function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 400 533"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 60px rgba(40,180,40,0.15))" }}
    >
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%"   stopColor="#2a5a2a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1c1c1c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="heroSkin" cx="50%" cy="40%" r="55%">
          <stop offset="0%"   stopColor="#b07c60" />
          <stop offset="100%" stopColor="#5a3a28" />
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="200" cy="260" rx="200" ry="273" fill="url(#heroGlow)" />

      {/* Shoulders / torso */}
      <path d="M60 533 Q100 380 200 360 Q300 380 340 533Z" fill="#2a2a2a" />

      {/* Neck */}
      <rect x="178" y="295" width="44" height="80" rx="10" fill="url(#heroSkin)" />

      {/* Head */}
      <ellipse cx="200" cy="250" rx="90" ry="108" fill="url(#heroSkin)" />

      {/* Hair */}
      <ellipse cx="200" cy="165" rx="92" ry="55" fill="#1a0f08" />
      <path
        d="M110 230 Q108 160 155 140 Q200 120 245 140 Q292 160 290 230 Q270 150 200 148 Q130 150 110 230Z"
        fill="#1a0f08"
      />

      {/* Eyes */}
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
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HEADER (Hero Section)
// ══════════════════════════════════════════════════════════════════════════════
interface HeaderProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Header({ menuOpen, onToggleMenu }: HeaderProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#1c1c1c" }}
    >
      {/* ── Radial green glow behind portrait ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 55% 60%, rgba(40,120,40,0.28) 0%, transparent 70%)",
        }}
      />

      {/* ── Navbar ── */}
      <Navbar menuOpen={menuOpen} onToggleMenu={onToggleMenu} />

      {/* ── Hero content ── */}
      <main className="relative z-10 px-8">

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-white text-base font-medium mb-3 flex items-center gap-2"
        >
          Hey, 👋 I'm a Full Stack Developer
        </motion.p>

        {/* Giant name — uses .hero-name from global CSS */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="hero-name relative z-20"
        >
          JEFFERSON ONUNWA
        </motion.h1>

        {/* Portrait — overlaps the name */}
        <div
          className="absolute left-1/2 -translate-x-[42%] z-10 pointer-events-none select-none"
          style={{ top: "80px", width: "clamp(340px, 55vw, 760px)" }}
        >
          <div
            className="w-full"
            style={{
              aspectRatio: "3/4",
              background:
                "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(255,255,255,0.05) 0%, transparent 70%)",
            }}
          >
            <PortraitPlaceholder />
          </div>
        </div>

        {/* Floating parallax dot */}
        <FloatingDot top="38%" right="25%" />

        {/* Right-side description */}
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="absolute right-8 text-white/80 text-sm leading-relaxed max-w-[260px] z-20"
          style={{ top: "calc(80px + 52vh)" }}
        >
          I craft fast, scalable, and user-friendly web applications with modern
          JavaScript frameworks — combining React on the frontend with robust
          server-side solutions using Node.js.
        </motion.p>

        {/* Vertical scroll indicator */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
          <div className="w-px h-16 bg-white/20" />
          <span className="scroll-label">SCROLL</span>
        </div>
      </main>

      {/* ── Footer contact + socials ── */}
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

      {/* ── FAB (+) button ── */}
      <button
        className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors text-lg"
        aria-label="More"
      >
        +
      </button>
    </section>
  );
}