// ─── Site identity ────────────────────────────────────────────────────────────
export const SITE_NAME = "JEFFERSON ONUNWA";

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "About",   href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Blog",    href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Footer socials ───────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: "Twitter (X)", href: "#" },
  { label: "LinkedIn",    href: "#" },
  { label: "GitHub",      href: "#" },
  { label: "CodePen",     href: "#" },
] as const;

// ─── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  email: "info@jeffersonon.com",
  phone: "+234 813 000 0000",
} as const;