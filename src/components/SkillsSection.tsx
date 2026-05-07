import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar, FloatingDot } from "./Shared";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SkillGroup {
  category: string;
  items: string[];
}

interface Stat {
  value: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS: SkillGroup[] = [
  { category: "Frontend",                items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"] },
  { category: "Server-side development", items: ["Node.js", "Express.js", "MongoDB", "PHP", "Laravel"] },
  { category: "Tools",                   items: ["Git", "Github", "Stack Overflow", "AWS", "Docker"] },
];

const STATS: Stat[] = [
  { value: "6+",  label: "Years in Experience" },
  { value: "16+", label: "Clients Worldwide" },
  { value: "97+", label: "Completed Projects" },
];

// ─── Skill row ────────────────────────────────────────────────────────────────
function SkillRow({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/10 pb-5 last:border-b-0"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {group.category}
        </span>
        <span className="text-white/35 text-xs font-mono">&lt;/&gt;</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {group.items.map((item) => (
          <span
            key={item}
            className="text-white/45 text-sm transition-colors duration-200 hover:text-white/80 cursor-default"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stat item ────────────────────────────────────────────────────────────────
function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="flex flex-col"
    >
      <div className="h-px bg-white/15 mb-5" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
        className="font-black text-white leading-none mb-2"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(52px, 7vw, 80px)",
          letterSpacing: "-0.02em",
        }}
      >
        {stat.value}
      </motion.span>
      <span className="text-sm font-medium" style={{ color: "#6EFF6E", fontFamily: "'DM Sans', sans-serif" }}>
        {stat.label}
      </span>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
interface SkillsSectionProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function SkillsSection({ menuOpen, onToggleMenu }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative" style={{ background: "#1c1c1c" }}>

      {/* Sticky navbar */}
      <div className="sticky top-0 z-30" style={{ background: "#1c1c1c" }}>
        <Navbar menuOpen={menuOpen} onToggleMenu={onToggleMenu} />
      </div>

      <div ref={sectionRef} className="relative px-8 pt-6 pb-20">

        {/* Floating green dot */}
        <FloatingDot top="55%" right="12%" />

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45 }}
          className="text-sm font-semibold mb-10"
          style={{ color: "#6EFF6E", fontFamily: "'DM Sans', sans-serif" }}
        >
          // Skills
        </motion.p>

        {/* Two-column: skills left | bio right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16">

          {/* Left — skill rows */}
          <div className="flex flex-col gap-5">
            {SKILLS.map((group, i) => (
              <SkillRow key={group.category} group={group} index={i} />
            ))}
          </div>

          {/* Right — bio + resume button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p
              className="text-white/70 text-base leading-relaxed mb-8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              I thrive on solving real-world problems, turning ideas into clean,
              maintainable code, and learning through experimentation. You'll find
              me building side projects, diving into new tech stacks, or simply
              exploring what's next in the world of web development.
            </p>

            <a
              href="#"
              className="inline-flex items-center justify-center self-start px-6 py-3 rounded-full font-semibold text-sm"
              style={{
                background: "#6EFF6E",
                color: "#1c1c1c",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#8fffaa";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#6EFF6E";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              My Resume
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}