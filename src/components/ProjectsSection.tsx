import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  bgColor: string;
  href: string;
  mockupType: "dark" | "blue";
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Techzo",
    description:
      "Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online",
    tags: ["Framer Motion", "Vite"],
    bgColor: "#1a1f2e",
    href: "#",
    mockupType: "dark",
  },
  {
    id: 2,
    title: "Lumin Studio",
    description:
      "LuminStudio blends elegance and clarity — a modern design agency template crafted to highlight creative work and impress potential clients",
    tags: ["HTML5 & Tailwind CSS", "React", "Vite"],
    bgColor: "#3b5ce4",
    href: "#",
    mockupType: "blue",
  },
];

// ─── Techzo mockup ────────────────────────────────────────────────────────────
function TechzoMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6" aria-hidden="true">
      {/* Main browser panel */}
      <div
        className="absolute left-6 top-6 bottom-6 w-[54%] rounded-lg overflow-hidden shadow-2xl"
        style={{ background: "#0d1117" }}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#161b22] border-b border-white/10">
          {["bg-red-500/60", "bg-yellow-500/60", "bg-green-500/60"].map((c, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${c}`} />
          ))}
        </div>
        <div className="p-3">
          <div
            className="w-full rounded flex items-center justify-center"
            style={{
              height: "130px",
              background: "linear-gradient(135deg, #0d1117 0%, #1a2744 50%, #0d1117 100%)",
            }}
          >
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "28px",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              TECHZO
            </span>
          </div>
          <div className="mt-2 space-y-1">
            {["BRANDING", "UX DESIGN", "DEVELOPMENT", "CODE DEVELOPMENT"].map((item) => (
              <div key={item} className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-white/40 text-[8px]">{item}</span>
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating service card */}
      <div
        className="absolute right-4 top-10 w-[46%] rounded-lg overflow-hidden shadow-2xl"
        style={{ background: "#1c2130" }}
      >
        <div className="p-4">
          <p className="text-white text-[9px] font-black uppercase leading-tight mb-2">
            TOP-NOTCH<br />SERVICES
          </p>
          <p className="text-white/50 text-[7px] uppercase mb-2">OUR WORK</p>
          <div className="grid grid-cols-2 gap-1">
            <div className="rounded bg-white/10 aspect-square" />
            <div className="rounded bg-white/10 aspect-square" />
          </div>
        </div>
      </div>

      {/* Bottom brand card */}
      <div
        className="absolute left-6 bottom-6 w-[52%] rounded-lg overflow-hidden shadow-xl"
        style={{ background: "#13171f" }}
      >
        <div className="p-3 flex gap-2 items-start">
          <div className="w-8 h-8 rounded bg-white/10 flex-shrink-0" />
          <div>
            <p className="text-white/80 text-[7px] font-bold uppercase leading-tight">
              Where branding goes beyond visuals
            </p>
            <p className="text-white/30 text-[6px] mt-1">Creating stories that resonate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Lumin Studio mockup ──────────────────────────────────────────────────────
function LuminMockup() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6" aria-hidden="true">
      <div
        className="w-full max-w-[88%] rounded-xl overflow-hidden shadow-2xl"
        style={{ background: "#0a0a0a" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border-b border-white/10">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/20" />
            ))}
          </div>
          <div className="flex-1 bg-white/10 rounded h-3 mx-2" />
          <span className="text-white/30 text-[7px]">Let's Talk ↗</span>
        </div>

        {/* Screen content */}
        <div
          className="relative p-4"
          style={{ background: "linear-gradient(135deg, #0a0a0a, #111)", minHeight: "155px" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/60" />
            </div>
            <span className="text-white/70 text-[8px] font-semibold">Lumin Studio.</span>
          </div>

          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "26px",
              color: "white",
              textTransform: "uppercase",
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            LUMIN STUDIO
          </p>

          {/* Phone overlay */}
          <div
            className="absolute right-4 top-4 w-10 h-16 rounded-xl shadow-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)" }}
          >
            <span className="text-white text-[8px] font-bold">15</span>
          </div>

          <div className="mt-3 pt-2 border-t border-white/10 text-center">
            <span className="text-white/30 text-[7px]">Macbook Air</span>
          </div>
        </div>
      </div>

      {/* Arrow badge */}
      <div className="absolute bottom-10 right-12 w-8 h-8 rounded-full border border-[#6EFF6E]/60 flex items-center justify-center">
        <span style={{ color: "#6EFF6E", fontSize: "13px" }}>↗</span>
      </div>
    </div>
  );
}

// ─── Single project card ──────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col"
    >
      {/* Thumbnail */}
      <a
        href={project.href}
        className="relative block rounded-xl overflow-hidden mb-5 cursor-pointer"
        style={{
          background: project.bgColor,
          height: "340px",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {project.mockupType === "dark" ? <TechzoMockup /> : <LuminMockup />}

        {/* Hover arrow */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.12)" }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-white/60 flex items-center justify-center backdrop-blur-sm bg-white/10">
            <span className="text-white text-lg">↗</span>
          </div>
        </div>
      </a>

      {/* Meta */}
      <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full border border-white/15 text-white/55"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

// ─── Section export ───────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="project" className="px-8 pt-6 pb-24" style={{ background: "#1c1c1c" }}>

      {/* Heading */}
      <div ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-white font-bold leading-tight mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 46px)", maxWidth: "420px" }}
        >
          A Showcase of My<br />Latest Projects
        </motion.h2>
      </div>

      {/* </ ──── > divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="flex items-center gap-3 mb-12"
        style={{ transformOrigin: "left" }}
      >
        <span className="text-white/30 text-xs font-mono">&lt;/</span>
        <div className="flex-1 h-px bg-white/15" />
        <span className="text-white/30 text-xs font-mono">&gt;</span>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}