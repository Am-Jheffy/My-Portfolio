import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* ─────────────────────────────────────────────
   BURGER ICON
───────────────────────────────────────────── */
function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[3px] w-4 pointer-events-none">
      <span
        className="block w-4 bg-black rounded-sm transition-transform duration-[280ms] origin-center"
        style={{
          height: "1.5px",
          transform: open ? "rotate(45deg) translate(0, 4.5px)" : "none",
        }}
      />
      <span
        className="block w-4 bg-black rounded-sm transition-[transform,opacity] duration-[280ms]"
        style={{
          height: "1.5px",
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0)" : "none",
        }}
      />
      <span
        className="block w-4 bg-black rounded-sm transition-transform duration-[280ms] origin-center"
        style={{
          height: "1.5px",
          transform: open ? "rotate(-45deg) translate(0, -4.5px)" : "none",
        }}
      />
    </span>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8! py-4!">
      {/* Logo */}
      <span
        className="text-[12px] font-bold uppercase select-none text-white/80"
        style={{
          letterSpacing: "0.17em",
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
        }}
      >
        Jefferson Onunwa
      </span>

      {/* Menu pill — uses .menu-pill CSS class for reliable styling */}
      <button className="menu-pill" onClick={() => setMenuOpen((o) => !o)}>
        <span>Menu</span>
        <BurgerIcon open={menuOpen} />
      </button>
    </header>
  );
}

/* ─────────────────────────────────────────────
   DROPDOWN MENU
───────────────────────────────────────────── */
const NAV_LINKS = ["About", "Project", "Blog", "Contact"];

function DropMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="animate-menu-in fixed top-[74px] right-8 z-[200] bg-white overflow-hidden"
      style={{
        borderRadius: 18,
        minWidth: 192,
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      }}
    >
      {/* Header row */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <span
          className="text-[13px] font-bold text-black"
          style={{
            letterSpacing: "0.05em",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          Menu
        </span>
        {/* Close X arrow icon (matches screenshot) */}
        <button className="close-btn" onClick={onClose} aria-label="Close menu">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="nav-link"
            onClick={onClose}
          >
            {link}
          </a>
        ))}
      </nav>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PORTRAIT  (SVG silhouette)
───────────────────────────────────────────── */
function Portrait() {
  return (
    <div
      className="portrait-mask absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-[5]"
      style={{
        width: "clamp(320px, 46vw, 640px)",
        height: "78vh",
      }}
    >
      {/* Green ambient glow behind figure */}
      <div className="portrait-glow absolute inset-0 z-0" />

      <svg
        viewBox="0 0 480 680"
        className="relative w-full h-full block z-[1]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <radialGradient id="headGlow" cx="50%" cy="42%" r="40%">
            <stop offset="0%" stopColor="#7bc840" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7bc840" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow */}
        <ellipse cx="240" cy="285" rx="175" ry="200" fill="url(#headGlow)" />

        {/* Body / shirt */}
        <ellipse cx="240" cy="660" rx="240" ry="165" fill="#1d1d1d" />
        <rect x="80" y="530" width="320" height="165" rx="8" fill="#1d1d1d" />

        {/* Neck */}
        <rect x="206" y="405" width="68" height="98" rx="30" fill="#282828" />

        {/* Head shape */}
        <ellipse cx="240" cy="300" rx="132" ry="152" fill="#282828" />
        <ellipse cx="240" cy="382" rx="92" ry="68" fill="#2c2c2c" />

        {/* Face */}
        <ellipse cx="240" cy="316" rx="84" ry="108" fill="#303030" />
        <ellipse
          cx="240"
          cy="230"
          rx="60"
          ry="50"
          fill="#363636"
          opacity="0.5"
        />

        {/* Hair mass */}
        <ellipse cx="240" cy="172" rx="142" ry="115" fill="#181818" />
        <ellipse cx="118" cy="248" rx="65" ry="84" fill="#181818" />
        <ellipse cx="362" cy="248" rx="65" ry="84" fill="#181818" />
        <ellipse cx="152" cy="197" rx="52" ry="74" fill="#181818" />
        <ellipse cx="328" cy="197" rx="52" ry="74" fill="#181818" />
        <ellipse cx="240" cy="138" rx="105" ry="78" fill="#161616" />
        <path d="M138 197 Q112 155 130 122 Q147 148 138 197" fill="#161616" />
        <path d="M342 197 Q368 155 350 122 Q333 148 342 197" fill="#161616" />
        <path d="M198 148 Q188 103 216 88  Q222 114 198 148" fill="#161616" />
        <path d="M282 148 Q292 103 264 88  Q258 114 282 148" fill="#161616" />

        {/* Eyebrows */}
        <path
          d="M188 268 Q205 260 224 265"
          stroke="#1a1a1a"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M256 265 Q275 260 292 268"
          stroke="#1a1a1a"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* Eyes */}
        <ellipse cx="207" cy="283" rx="20" ry="8.5" fill="#1e1e1e" />
        <ellipse cx="273" cy="283" rx="20" ry="8.5" fill="#1e1e1e" />
        <path
          d="M189 281 Q207 273 225 281"
          stroke="#3a3a3a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M255 281 Q273 273 291 281"
          stroke="#3a3a3a"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* Nose */}
        <path
          d="M240 298 Q233 326 237 342 Q240 350 243 342 Q247 326 240 298"
          fill="#252525"
          opacity="0.65"
        />
        <path
          d="M229 342 Q240 349 251 342"
          stroke="#252525"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Lips */}
        <path d="M213 362 Q224 368 240 366 Q256 368 267 362" fill="#272727" />
        <path
          d="M217 362 Q240 376 263 362"
          stroke="#2d2d2d"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Beard */}
        <ellipse cx="240" cy="374" rx="57" ry="24" fill="#222" opacity="0.8" />
        <ellipse cx="240" cy="355" rx="72" ry="32" fill="#222" opacity="0.28" />

        {/* Green cheek light */}
        <ellipse
          cx="183"
          cy="325"
          rx="30"
          ry="40"
          fill="rgba(180,255,111,0.05)"
        />

        {/* Ears */}
        <ellipse cx="110" cy="308" rx="13" ry="22" fill="#282828" />
        <ellipse cx="370" cy="308" rx="13" ry="22" fill="#282828" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING DOT
───────────────────────────────────────────── */
function FloatingDot() {
  return (
    <div
      className="animate-float-dot absolute z-20 pointer-events-none"
      style={{
        left: "57%",
        top: "44%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="animate-pulse-dot rounded-full bg-[#b4ff6f]"
        style={{ width: 13, height: 13 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL INDICATOR
───────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none">
      <div className="w-px h-14 bg-white/[0.16]" />
      <span
        className="writing-vertical text-[8px] font-bold uppercase text-white/30"
        style={{ letterSpacing: "0.35em" }}
      >
        SCROLL
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT INFO
───────────────────────────────────────────── */
const CONTACTS = [
  {
    label: "E",
    value: "info@brunosimon.com",
    href: "mailto:info@brunosimon.com",
  },
  { label: "T", value: "+39 03 463 853 02", href: "tel:+390346385302" },
];

function ContactInfo() {
  return (
    <div className="animate-fade-in-up-3 fixed bottom-8 left-8 z-30">
      {CONTACTS.map(({ label, value, href }) => (
        <div key={label} className="flex items-baseline gap-2 mb-1">
          <span
            className="text-[9px] text-white/30 min-w-[10px]"
            style={{ letterSpacing: "0.08em" }}
          >
            {label}
          </span>
          <a href={href} className="contact-link">
            {value}
          </a>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SOCIAL LINKS
───────────────────────────────────────────── */
const SOCIALS = [
  { label: "Twitter (X)", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "CodePen", href: "#" },
];

function SocialLinks() {
  return (
    <div className="animate-fade-in-up-3 fixed bottom-8 right-8 z-30 flex items-center gap-5">
      {SOCIALS.map(({ label, href }) => (
        <a key={label} href={href} className="social-link">
          <span style={{ color: "rgba(255,255,255,0.18)", marginRight: 2 }}>
            /
          </span>
          {label}
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Tagline — top left */}
      <div
        className="animate-fade-in-up absolute left-8 z-20"
        style={{ top: "12%" }}
      >
        <p
          className="text-[19px] font-bold text-white/[0.88]"
          style={{
            letterSpacing: "0.04em",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          Hey, <span className="animate-wave">👋</span> I'm a Full Stack
          Developer
        </p>
      </div>

      {/* Giant name */}
      <div
        className="animate-slide-up absolute left-0 right-0 px-6! z-20"
        style={{ top: "18%" }}
      >
        <h1
          className="font-bold uppercase text-[#b4ff6f] whitespace-nowrap"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: "clamp(56px, 12.5vw, 115px)",
            lineHeight: 0.92,
            letterSpacing: "-0.025em",
          }}
        >
          JEFFERSON ONUNWA
        </h1>
      </div>

      {/* Portrait centred, sitting behind name but above background */}
      <Portrait />

      {/* Floating dot */}
      <FloatingDot />

      {/* Description — bottom right */}
      <div
        className="animate-fade-in-up-2 absolute right-8 z-20 text-right"
        style={{ bottom: "13%", maxWidth: 340 }}
      >
        <p
          className="text-[13px] text-white/70"
          style={{
            lineHeight: 1.85,
            letterSpacing: "0.02em",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          I craft fast, scalable, and user-friendly web applications with modern
          JavaScript frameworks — combining React on the frontend with robust
          server-side solutions using Node.js.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function BrunoSimon() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#1c1c1c" }}
    >
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <DropMenu onClose={() => setMenuOpen(false)} />}
      <Hero />
      <ScrollIndicator />
      <ContactInfo />
      <SocialLinks />
    </div>
  );
}
