import { motion } from "framer-motion";
import FloatingDot from "./Floatingdot";
import { SOCIAL_LINKS, CONTACT } from "./Constants";

// ══════════════════════════════════════════════════════════════════════════════
// PORTRAIT SVG PLACEHOLDER
// Swap the <svg> for an <img> once you have your real photo:
//   <img
//     src="/your-photo.jpg"
//     alt="Jefferson Onunwa"
//     className="w-full h-full object-cover object-top"
//   />
// ══════════════════════════════════════════════════════════════════════════════
function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 400 533"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 60px rgba(40,180,40,0.12))" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%"   stopColor="#2a5a2a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#1c1c1c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hSkin" cx="50%" cy="40%" r="55%">
          <stop offset="0%"   stopColor="#b07c60" />
          <stop offset="100%" stopColor="#5a3a28" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="260" rx="200" ry="273" fill="url(#hGlow)" />
      <path d="M60 533 Q100 380 200 360 Q300 380 340 533Z" fill="#2a2a2a" />
      <rect x="178" y="295" width="44" height="80" rx="10" fill="url(#hSkin)" />
      <ellipse cx="200" cy="250" rx="90" ry="108" fill="url(#hSkin)" />
      <ellipse cx="200" cy="165" rx="92" ry="55" fill="#1a0f08" />
      <path d="M110 230 Q108 160 155 140 Q200 120 245 140 Q292 160 290 230 Q270 150 200 148 Q130 150 110 230Z" fill="#1a0f08" />
      <ellipse cx="170" cy="255" rx="14" ry="9" fill="#2a1a10" />
      <ellipse cx="230" cy="255" rx="14" ry="9" fill="#2a1a10" />
      <path d="M195 265 Q192 285 185 292 Q200 296 215 292 Q208 285 205 265Z" fill="rgba(0,0,0,0.2)" />
      <path d="M180 308 Q200 316 220 308" stroke="#7a4030" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
//
// NOTE: No `fixed` or `sticky` positioning here.
// The sticky navbar is handled by App.tsx's layout shell.
// The fixed scroll indicator + footer are also in App.tsx so they only
// appear correctly relative to the overall page, not duplicated per section.
// ══════════════════════════════════════════════════════════════════════════════
export default function Header() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background: "#1c1c1c",
        // Full viewport minus the sticky navbar height at top
        minHeight: "calc(100vh - var(--nav-h, 72px))",
      }}
    >
      {/* Radial green glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 55% 60%, rgba(40,120,40,0.28) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-8 pt-4">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-white text-base font-medium mb-3"
        >
          Hey, 👋 I'm a Full Stack Developer
        </motion.p>

        {/* Hero name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="hero-name relative z-20"
        >
          JEFFERSON ONUNWA
        </motion.h1>
      </div>

      {/* Portrait — overlaps name, centered horizontally */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-[42%] z-10 pointer-events-none select-none"
        style={{ top: "40px", width: "clamp(300px, 52vw, 720px)" }}
      >
        <div
          className="w-full"
          style={{
            aspectRatio: "3 / 4",
            background:
              "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        >
          <PortraitPlaceholder />
        </div>
      </div>

      {/* Floating parallax dot */}
      <FloatingDot top="36%" right="24%" />

      {/* Right-side description — vertically centred in lower half */}
      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute right-8 z-20 text-white/75 text-sm leading-relaxed"
        style={{
          top: "calc(40px + 50vh)",
          maxWidth: "240px",
        }}
      >
        I craft fast, scalable, and user-friendly web applications with modern
        JavaScript frameworks — combining React on the frontend with robust
        server-side solutions using Node.js.
      </motion.p>

      {/* Bottom contact + socials — pinned to section bottom, NOT fixed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-8 pb-7 pointer-events-none"
      >
        <div className="text-white/65 text-xs leading-6 pointer-events-auto">
          <div>
            <span className="font-bold text-white/35 mr-2">E</span>
            {CONTACT.email}
          </div>
          <div>
            <span className="font-bold text-white/35 mr-2">T</span>
            {CONTACT.phone}
          </div>
        </div>

        <div className="flex gap-5 text-white/55 text-xs pointer-events-auto">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="hover:text-white transition-colors duration-200"
            >
              / {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}