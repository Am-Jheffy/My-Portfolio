// ─── Nav & Social Data ────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "About",   href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Blog",    href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Twitter (X)", href: "#" },
  { label: "LinkedIn",    href: "#" },
  { label: "GitHub",      href: "#" },
  { label: "CodePen",     href: "#" },
] as const;

// ─── Global CSS (injected once in App.tsx) ────────────────────────────────────
export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #6EFF6E;
    --bg:    #1c1c1c;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  /* Hero name — matches your Header.tsx spec exactly */
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
    color: rgba(255,255,255,0.4);
  }
`;