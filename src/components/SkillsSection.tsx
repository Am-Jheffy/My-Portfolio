import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import FloatingDot from "./Floatingdot";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { category: "Frontend",                items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"] },
  { category: "Server-side development", items: ["Node.js", "Express.js", "MongoDB", "PHP", "Laravel"] },
  { category: "Tools",                   items: ["Git", "Github", "Stack Overflow", "AWS", "Docker"] },
];

const STATS = [
  { value: "6+",  label: "Years in Experience" },
  { value: "16+", label: "Clients Worldwide" },
  { value: "97+", label: "Completed Projects" },
];

// ─── Skill row ────────────────────────────────────────────────────────────────
function SkillRow({ category, items, index }: { category: string; items: string[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -14 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="border-b border-white/10 pb-5 last:border-b-0"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-white text-sm font-semibold">{category}</span>
        <span className="text-white/30 text-xs font-mono">&lt;/&gt;</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {items.map((item) => (
          <span
            key={item}
            className="text-white/45 text-sm cursor-default transition-colors duration-150 hover:text-white/75"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stat item ────────────────────────────────────────────────────────────────
function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex flex-col"
    >
      <div className="h-px bg-white/15 mb-5" />
      <span className="stat-number mb-2">{value}</span>
      <span className="text-sm font-medium" style={{ color: "var(--green)" }}>
        {label}
      </span>
    </motion.div>
  );
}

// ─── Section export ───────────────────────────────────────────────────────────
export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-8 pt-6 pb-24"
      style={{ background: "#1c1c1c" }}
    >
      {/* Decorative parallax dot */}
      <FloatingDot top="54%" right="11%" />

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold mb-10"
        style={{ color: "var(--green)" }}
      >
        // Skills
      </motion.p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20">

        {/* Left — skill rows */}
        <div className="flex flex-col gap-5">
          {SKILLS.map((s, i) => (
            <SkillRow key={s.category} category={s.category} items={s.items} index={i} />
          ))}
        </div>

        {/* Right — bio + resume */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <p className="text-white/65 text-base leading-relaxed mb-8">
            I thrive on solving real-world problems, turning ideas into clean,
            maintainable code, and learning through experimentation. You'll find
            me building side projects, diving into new tech stacks, or simply
            exploring what's next in the world of web development.
          </p>

          <a
            href="#"
            className="self-start inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold"
            style={{
              background: "var(--green)",
              color: "#1c1c1c",
              transition: "filter 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1.12)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "none";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            My Resume
          </a>
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {STATS.map((s, i) => (
          <StatItem key={s.label} value={s.value} label={s.label} index={i} />
        ))}
      </div>
    </section>
  );
}