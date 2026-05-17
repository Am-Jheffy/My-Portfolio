import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/* ─────────────────────────────────────────────
   PILL ICON  — <> closed  |  ⇅ open
───────────────────────────────────────────── */
function PillIcon({ open }: { open: boolean }) {
  if (!open) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L2 8l4 4"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4-3 4 3"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 10l4 3 4-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-6">
      <span
        className="text-[12px] font-bold uppercase select-none text-white/80"
        style={{ letterSpacing: "0.17em", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
      >
        Jefferson Onunwa
      </span>

      <button
        className="menu-pill"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span>Menu</span>
        <PillIcon open={menuOpen} />
      </button>
    </header>
  );
}

/* ─────────────────────────────────────────────
   DROPDOWN MENU
───────────────────────────────────────────── */
const NAV_LINKS = ["About", "Project", "Blog", "Contact"];

/* ─────────────────────────────────────────────
   DROPDOWN MENU
───────────────────────────────────────────── */
function DropMenu({ onClose, closing }: { onClose: () => void; closing: boolean }) {
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
      className={`${closing ? "animate-menu-out" : "animate-menu-in"} fixed top-[74px] right-8 z-[200] bg-white overflow-hidden`}
      style={{ borderRadius: 16, minWidth: 210, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
    >
      <div
        className="flex items-center justify-between px-5 py-3 cursor-pointer"
        style={{ borderBottom: "1px solid #f0f0f0" }}
        onClick={onClose}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: "#000", letterSpacing: "0.05em", fontFamily: "'Space Grotesk', sans-serif" }}>
          Home
        </span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M5 7l4-4 4 4"  stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 11l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <nav>
        {NAV_LINKS.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="nav-link" onClick={onClose}>
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
      style={{ width: "clamp(320px, 46vw, 640px)", height: "78vh" }}
    >
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
            <stop offset="0%"   stopColor="#7bc840" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7bc840" stopOpacity="0"    />
          </radialGradient>
        </defs>

        <ellipse cx="240" cy="285" rx="175" ry="200" fill="url(#headGlow)" />

        {/* Body */}
        <ellipse cx="240" cy="660" rx="240" ry="165" fill="#1d1d1d" />
        <rect x="80" y="530" width="320" height="165" rx="8" fill="#1d1d1d" />

        {/* Neck */}
        <rect x="206" y="405" width="68" height="98" rx="30" fill="#282828" />

        {/* Head */}
        <ellipse cx="240" cy="300" rx="132" ry="152" fill="#282828" />
        <ellipse cx="240" cy="382" rx="92"  ry="68"  fill="#2c2c2c" />
        <ellipse cx="240" cy="316" rx="84"  ry="108" fill="#303030" />
        <ellipse cx="240" cy="230" rx="60"  ry="50"  fill="#363636" opacity="0.5" />

        {/* Hair */}
        <ellipse cx="240" cy="172" rx="142" ry="115" fill="#181818" />
        <ellipse cx="118" cy="248" rx="65"  ry="84"  fill="#181818" />
        <ellipse cx="362" cy="248" rx="65"  ry="84"  fill="#181818" />
        <ellipse cx="152" cy="197" rx="52"  ry="74"  fill="#181818" />
        <ellipse cx="328" cy="197" rx="52"  ry="74"  fill="#181818" />
        <ellipse cx="240" cy="138" rx="105" ry="78"  fill="#161616" />
        <path d="M138 197 Q112 155 130 122 Q147 148 138 197" fill="#161616" />
        <path d="M342 197 Q368 155 350 122 Q333 148 342 197" fill="#161616" />
        <path d="M198 148 Q188 103 216 88  Q222 114 198 148" fill="#161616" />
        <path d="M282 148 Q292 103 264 88  Q258 114 282 148" fill="#161616" />

        {/* Eyebrows */}
        <path d="M188 268 Q205 260 224 265" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M256 265 Q275 260 292 268" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />

        {/* Eyes */}
        <ellipse cx="207" cy="283" rx="20" ry="8.5" fill="#1e1e1e" />
        <ellipse cx="273" cy="283" rx="20" ry="8.5" fill="#1e1e1e" />
        <path d="M189 281 Q207 273 225 281" stroke="#3a3a3a" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M255 281 Q273 273 291 281" stroke="#3a3a3a" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Nose */}
        <path d="M240 298 Q233 326 237 342 Q240 350 243 342 Q247 326 240 298" fill="#252525" opacity="0.65" />
        <path d="M229 342 Q240 349 251 342" stroke="#252525" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Lips */}
        <path d="M213 362 Q224 368 240 366 Q256 368 267 362" fill="#272727" />
        <path d="M217 362 Q240 376 263 362" stroke="#2d2d2d" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Beard */}
        <ellipse cx="240" cy="374" rx="57" ry="24" fill="#222" opacity="0.8"  />
        <ellipse cx="240" cy="355" rx="72" ry="32" fill="#222" opacity="0.28" />

        {/* Cheek light */}
        <ellipse cx="183" cy="325" rx="30" ry="40" fill="rgba(180,255,111,0.05)" />

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
      style={{ left: "57%", top: "44%", transform: "translate(-50%, -50%)" }}
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
      <div className="w-px h-14 bg-white/[0.16] relative overflow-hidden">
        <div className="scroll-line-animated absolute inset-0 bg-white/60" />
      </div>
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
  { label: "E", value: "jeffersiconunwa@gmail.com", href: "mailto:jeffersiconunwa@gmail.com" },
  { label: "T", value: "+234 815 515 0691",         href: "tel:+2348155150691"               },
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
          <a href={href} className="contact-link">{value}</a>
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
  { label: "LinkedIn",    href: "#" },
  { label: "GitHub",      href: "#" },
];

function SocialLinks() {
  return (
    <div className="animate-fade-in-up-3 fixed bottom-8 right-8 z-30 flex items-center gap-5">
      {SOCIALS.map(({ label, href }) => (
        <a key={label} href={href} className="social-link">
          <span style={{ color: "rgba(255,255,255,0.18)", marginRight: 2 }}>/</span>
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

      {/* Tagline */}
      <div className="animate-fade-in-up absolute left-8 z-20" style={{ top: "12%" }}>
        <p
          className="text-[19px] font-bold text-white/[0.88]"
          style={{ letterSpacing: "0.04em", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          Hey, <span className="animate-wave">👋</span> I'm a Full Stack Developer
        </p>
      </div>

      {/* Giant name */}
      <div className="animate-slide-up absolute left-0 right-0 px-6 z-20" style={{ top: "18%" }}>
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

      <Portrait />
      <FloatingDot />

      {/* Description */}
      <div
        className="animate-fade-in-up-2 absolute right-8 z-20 text-right"
        style={{ bottom: "13%", maxWidth: 340 }}
      >
        <p
          className="text-[13px] text-white/70"
          style={{ lineHeight: 1.85, letterSpacing: "0.02em", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          I craft fast, scalable, and user-friendly web applications with modern
          JavaScript frameworks — combining React on the frontend with robust
          server-side solutions using Node.js.
        </p>
      </div>

      {/* ── ContactInfo pinned to bottom-left of hero only ── */}
      <div className="animate-fade-in-up-3 absolute bottom-8 left-8 z-30">
        {[
          { label: "E", value: "jeffersiconunwa@gmail.com", href: "mailto:jeffersiconunwa@gmail.com" },
          { label: "T", value: "+234 815 515 0691",         href: "tel:+2348155150691"               },
        ].map(({ label, value, href }) => (
          <div key={label} className="flex items-baseline gap-2 mb-1">
            <span className="text-[9px] text-white/30 min-w-[10px]" style={{ letterSpacing: "0.08em" }}>{label}</span>
            <a href={href} className="contact-link">{value}</a>
          </div>
        ))}
      </div>

      {/* ── SocialLinks pinned to bottom-right of hero only ── */}
      <div className="animate-fade-in-up-3 absolute bottom-8 right-8 z-30 flex items-center gap-5">
        {[
          { label: "Twitter (X)", href: "#" },
          { label: "LinkedIn",    href: "#" },
          { label: "GitHub",      href: "#" },
        ].map(({ label, href }) => (
          <a key={label} href={href} className="social-link">
            <span style={{ color: "rgba(255,255,255,0.18)", marginRight: 2 }}>/</span>
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS SECTION 
───────────────────────────────────────────── */

const SKILLS = [
  { title: "Frontend",                tags: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"] },
  { title: "Server-side development", tags: ["Node.js", "Express.js", "MongoDB", "PHP", "Laravel"] },
  { title: "Tools",                   tags: ["Git", "Github", "Stack Overflow", "AWS", "Docker"]   },
];

const STATS = [
  { number: "6+",  label: "Years in Experience" },
  { number: "16+", label: "Clients Worldwide"   },
  { number: "97+", label: "Completed Projects"  },
];

function SkillRow({ title, tags, delay }: { title: string; tags: string[]; delay: string }) {
  return (
    <div style={{ marginBottom: 20, opacity: 0, animation: `fadeInUp 0.8s ${delay} cubic-bezier(0.16,1,0.3,1) forwards` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{
          fontSize: 13,           /* ← was 15, tightened to match ref */
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          letterSpacing: "0.01em",
        }}>
          {title}
        </span>
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M7 5L3 9l4 4"  stroke="#3a3a3a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 5l4 4-4 4" stroke="#3a3a3a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ height: 1, background: "#242424", marginBottom: 10 }} />
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px 14px" }}>
        {tags.map((tag) => (
          <span key={tag} style={{
            fontSize: 12,          /* ← was 13, tightened */
            color: "#666",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            letterSpacing: "0.02em",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="about" style={{ background: "#1c1c1c", padding: "152px 188px 100px", position: "relative" }}>
      {/*            ↑ was 100px/64px — reduced to match ref spacing */}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", marginBottom: 64 }}>
        {/*                                               ↑ was 64   ↑ was 80 */}

        {/* LEFT */}
        <div>
          <p style={{
            fontSize: 12,          /* ← was 13 */
            color: "#444",
            marginBottom: 24,      /* ← was 32 */
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            letterSpacing: "0.04em",
            opacity: 0,
            animation: "fadeInUp 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) forwards",
          }}>
            // Skills
          </p>
          {SKILLS.map((skill, i) => (
            <SkillRow key={skill.title} title={skill.title} tags={skill.tags} delay={`${0.15 + i * 0.12}s`} />
          ))}
        </div>

        {/* RIGHT */}
        <div style={{ paddingTop: 40 }}>   {/* ← was 52 */}
          <p style={{
            fontSize: 14,          /* ← was 16 */
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            letterSpacing: "0.015em",
            marginBottom: 28,      /* ← was 36 */
            opacity: 0,
            animation: "fadeInUp 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
          }}>
            I thrive on solving real-world problems, turning ideas into clean,
            maintainable code, and learning through experimentation. You'll find
            me building side projects, diving into new tech stacks, or simply
            exploring what's next in the world of web development.
          </p>

          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            opacity: 0,
            animation: "fadeInUp 0.9s 0.42s cubic-bezier(0.16,1,0.3,1) forwards",
          }}>
            <a href="#" className="resume-btn" style={{
              display: "inline-block",
              padding: "10px 24px",  /* ← was 12/28, slightly tighter */
              background: "#b4ff6f",
              color: "#111",
              fontSize: 12,          /* ← was 13 */
              fontWeight: 700,
              borderRadius: 9999,
              textDecoration: "none",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              letterSpacing: "0.04em",
              transition: "background 0.2s ease, transform 0.15s ease",
            }}>
              My Resume
            </a>
            <div className="animate-pulse-dot" style={{ width: 11, height: 11, borderRadius: "50%", background: "#b4ff6f", flexShrink: 0 }} />
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: "1px solid #1e1e1e",
        opacity: 0,
        animation: "fadeInUp 1s 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{
            padding: "48px 0 72px",   /* ← was 60/80 */
            paddingRight: 32,
            position: "relative",
            ...(i < STATS.length - 1 ? { borderRight: "1px solid #1e1e1e" } : {}),
          }}>
            <span style={{
              display: "block",
              fontSize: "clamp(44px, 5.5vw, 72px)",  /* ← was clamp(52,6vw,80) */
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1,
              marginBottom: 10,
              letterSpacing: "-0.03em",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}>
              {stat.number}
            </span>
            <span style={{
              display: "block",
              fontSize: 12,          /* ← was 13 */
              color: "#b4ff6f",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              letterSpacing: "0.03em",
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}



/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function BrunoSimon() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, 350); // match your animate-menu-out duration
  };

  const openMenu = () => {
    setMenuOpen(true);
    setClosing(false);
  };

  return (
    <div className="relative min-h-screen" style={{ background: "#1c1c1c" }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={(val) => val ? openMenu() : closeMenu()} />
      {(menuOpen || closing) && <DropMenu onClose={closeMenu} closing={closing} />}
      <Hero />
     <SkillsSection />
     <ScrollIndicator />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PATCH 1 — Move ContactInfo & SocialLinks
   INSIDE the Hero section (not fixed globally).
   Replace your Hero function with this one.
───────────────────────────────────────────── */



/* ─────────────────────────────────────────────
   PATCH 2 — SkillsSection with tighter sizing
   matching the reference screenshot exactly.
   Replace your SkillsSection function with this.
───────────────────────────────────────────── */



/* ─────────────────────────────────────────────
   PATCH 3 — App root: remove the two standalone
   <ContactInfo /> and <SocialLinks /> renders,
   since they're now inside Hero.

   BEFORE:
     <Hero />
     <SkillsSection />
     <ScrollIndicator />
     <ContactInfo />      ← DELETE
     <SocialLinks />      ← DELETE

   AFTER:
     <Hero />
     <SkillsSection />
     <ScrollIndicator />
───────────────────────────────────────────── */