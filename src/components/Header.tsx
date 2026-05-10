import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FloatingDot from "./Floatingdot";
import { SOCIAL_LINKS, CONTACT } from "./Constants";

// ══════════════════════════════════════════════════════════════════════════════
// useFitText
//
// Makes the h1 fill its container width in exactly one line.
//
// How it works:
//  1. Reset font-size to CSS default (13.5vw) so we always start large
//  2. If text overflows → shrink until it fits
//  3. Once it fits → reveal via opacity (was hidden in CSS to prevent flash)
//  4. ResizeObserver re-runs on every container resize
//
// IMPORTANT: the container width passed in must already account for any
// horizontal padding so the text doesn't measure against a padded parent.
// ══════════════════════════════════════════════════════════════════════════════
function useFitText(
  elRef: React.RefObject<HTMLElement | null>,
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const el        = elRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const fit = () => {
      // 1. Reset to CSS starting size
      el.style.fontSize = "";
      el.style.opacity  = "0";

      // 2. Get available width (container - its own padding)
      const style     = getComputedStyle(container);
      const padL      = parseFloat(style.paddingLeft)  || 0;
      const padR      = parseFloat(style.paddingRight) || 0;
      const available = container.clientWidth - padL - padR;

      // 3. Start from the CSS computed size and shrink if needed
      let size = parseFloat(getComputedStyle(el).fontSize);

      // Shrink loop — stops when text natural width ≤ available space
      // scrollWidth isn't reliable here because the parent clips; use Range instead
      const range = document.createRange();
      range.selectNodeContents(el);
      const getTextWidth = () => range.getBoundingClientRect().width;

      while (getTextWidth() > available && size > 12) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }

      // Optionally grow if there's room (so short names fill too)
      while (getTextWidth() < available - 2 && size < 300) {
        size += 0.5;
        el.style.fontSize = `${size}px`;
      }
      // Step back one to guarantee it doesn't overflow
      if (getTextWidth() > available) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }

      // 4. Reveal
      el.style.opacity = "1";
    };

    // Wait for fonts before measuring
    (document.fonts?.ready ?? Promise.resolve()).then(fit);

    const ro = new ResizeObserver(fit);
    ro.observe(container);
    return () => ro.disconnect();
  }, [elRef, containerRef]);
}

// ══════════════════════════════════════════════════════════════════════════════
// PORTRAIT SVG PLACEHOLDER
// Replace with your real photo:
//   <img src="/photo.jpg" alt="Jefferson Onunwa"
//        className="w-full h-full object-cover object-top" />
// ══════════════════════════════════════════════════════════════════════════════
function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 400 533"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 80px rgba(30,160,30,0.18))" }}
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
      <path
        d="M110 230 Q108 160 155 140 Q200 120 245 140 Q292 160 290 230 Q270 150 200 148 Q130 150 110 230Z"
        fill="#1a0f08"
      />
      <ellipse cx="170" cy="255" rx="14" ry="9" fill="#2a1a10" />
      <ellipse cx="230" cy="255" rx="14" ry="9" fill="#2a1a10" />
      <path
        d="M195 265 Q192 285 185 292 Q200 296 215 292 Q208 285 205 265Z"
        fill="rgba(0,0,0,0.2)"
      />
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
// HEADER
// ══════════════════════════════════════════════════════════════════════════════
export default function Header() {
  const nameRef      = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pass both refs so useFitText can measure available width correctly
  useFitText(
    nameRef      as React.RefObject<HTMLElement>,
    containerRef as React.RefObject<HTMLElement>
  );

  return (
    <section
      id="home"
      className="relative"
      style={{
        background: "#1c1c1c",
        minHeight: "calc(100vh - var(--nav-h, 68px))",
        // overflow-x hidden prevents the nowrap h1 from creating a horizontal
        // scrollbar. overflow-y stays visible so portrait bleeds out nicely.
        overflowX: "hidden",
        overflowY: "visible",
      }}
    >
      {/* ── Green ambient glow ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 58% 72% at 50% 56%, rgba(28,105,28,0.34) 0%, transparent 68%)",
        }}
      />

      {/* ── Text block ────────────────────────────────────────────────────────
          ref={containerRef} is the measurement anchor for useFitText.
          px-8 = 32px each side — same as the Navbar's px-8.
          The h1 will be sized to fill (container width - 64px).
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative z-20 px-8 pt-8"
      >
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white text-base font-medium mb-3"
        >
          Hey, 👋 I'm a Full Stack Developer
        </motion.p>

        {/*
          Hero name
          • .hero-name sets font-family, weight, colour, white-space:nowrap,
            and starts at opacity:0 (CSS) so there's no layout flash.
          • useFitText() sets the exact font-size and then sets opacity:1.
          • The motion.h1 fade-in only fires AFTER useFitText is done
            (delay:0.25 gives the hook time to run first).
        */}
        <motion.h1
          ref={nameRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="hero-name"
        >
          JEFFERSON ONUNWA
        </motion.h1>
      </div>

      {/* ── Portrait ──────────────────────────────────────────────────────────
          Centred on the page, top=55px so the name overlaps the head area.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none"
        style={{
          top: "55px",
          width: "clamp(260px, 44vw, 640px)",
        }}
      >
        <div className="w-full" style={{ aspectRatio: "3 / 4" }}>
          <PortraitPlaceholder />
        </div>
      </div>

      {/* ── Floating parallax dot — upper-right ───────────────────────────── */}
      <FloatingDot top="17%" right="18%" />

      {/* ── Right-side description ────────────────────────────────────────────
          bottom:110px keeps it above the contact row (which is ~pb-7 ≈ 28px
          tall + two lines of text ≈ ~48px = ~76px; 110px gives clear air).
          pr-8 matches the section's horizontal padding.
      ─────────────────────────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute z-20 text-white/75 text-sm leading-relaxed"
        style={{
          bottom:   "110px",
          right:    "32px",   /* matches px-8 */
          maxWidth: "255px",
        }}
      >
        I craft fast, scalable, and user-friendly web applications with modern
        JavaScript frameworks — combining React on the frontend with robust
        server-side solutions using Node.js.
      </motion.p>

      {/* ── Bottom bar ────────────────────────────────────────────────────────
          px-8 (32px) matches the navbar and text block padding exactly.
          pb-7 (28px) gives breathing room above the viewport bottom edge.
          pointer-events-none on the container, auto on the links/text.
      ─────────────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-8 pb-7 pointer-events-none"
      >
        {/* Contact — left */}
        <div className="text-white/60 text-xs leading-[1.8] pointer-events-auto">
          <div>
            <span className="font-bold text-white/30 mr-2">E</span>
            {CONTACT.email}
          </div>
          <div>
            <span className="font-bold text-white/30 mr-2">T</span>
            {CONTACT.phone}
          </div>
        </div>

        {/* Socials — right */}
        <div className="flex gap-5 text-white/50 text-xs pointer-events-auto">
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