import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"] },
  { category: "Server-side development", items: ["Node.js", "Express.js", "MongoDB", "PHP", "Laravel"] },
  { category: "Tools", items: ["Git", "Github", "Stack Overflow", "AWS", "Docker"] },
];

const PROJECTS = [
  {
    title: "Techzo",
    desc: "Techzo is a cutting-edge design agency template built to showcase innovation, digital expertise, and a bold creative presence online",
    tags: ["HTML5 & CSS", "Framer Motion", "Vite"],
    img: "https://framerusercontent.com/images/nwo6FeGFkLhs8zz649R3sZdI.jpg?width=800&height=600",
    href: "#",
  },
  {
    title: "Lumin Studio",
    desc: "LuminStudio blends elegance and clarity — a modern design agency template crafted to highlight creative work and impress potential clients",
    tags: ["HTML5 & Tailwind CSS", "React", "Vite"],
    img: "https://framerusercontent.com/images/sB2gGdW0ObzzZYTsMcU5JTcAFw.png?width=800&height=600",
    href: "#",
  },
  {
    title: "Nubuilt",
    desc: "Crafted with clean, semantic code — Nubuilt is a sleek architecture template built for performance, responsiveness, and timeless design.",
    tags: ["HTML5", "CSS", "GSAP"],
    img: "https://framerusercontent.com/images/UjlGf9MdwIfAf3xuDEfkB57fg.png?width=800&height=600",
    href: "#",
  },
  {
    title: "Design orbit",
    desc: "Bold, creative, and conversion-focused — DesignOrbit is a sleek portfolio website template made for design agencies to showcase their work and attract clients.",
    tags: ["HTML5 & CSS", "GSAP", "Vite"],
    img: "https://framerusercontent.com/images/i7nMIvRPhxKr8t9f7bcpeW5K08.jpg?width=800&height=600",
    href: "#",
  },
  {
    title: "Formation time",
    desc: "Professional and polished — FormationTime is a clean consultant website template designed to build trust, highlight services, and convert leads.",
    tags: ["HTML5", "Tailwind CSS", "Alpine.js"],
    img: "https://framerusercontent.com/images/EPjZNX2imcuSfs2yfE22NJIhyQ.jpg?width=800&height=600",
    href: "#",
  },
  {
    title: "LaundryBee",
    desc: "Fresh, fast, and user-friendly — Laundrybee is a clean and modern website template built to promote laundry services and boost online bookings",
    tags: ["Tailwind CSS", "Alpine.js", "Formspree"],
    img: "https://framerusercontent.com/images/NXKaeF99nFoPZMDBng8vYYk1g.jpg?width=800&height=600",
    href: "#",
  },
];

const SERVICES = [
  {
    num: "(01)",
    title: "Custom Web Development",
    desc: "Build complete web applications from scratch — frontend to backend — optimized for speed, security, and scalability.",
  },
  {
    num: "(02)",
    title: "Frontend Engineering",
    desc: "Craft pixel-perfect, responsive interfaces using modern React patterns, Tailwind CSS, and performance-first principles.",
  },
  {
    num: "(03)",
    title: "Server logic & API Development",
    desc: "Design and implement robust REST or GraphQL APIs, authentication systems, and server-side logic using Node.js or PHP.",
  },
  {
    num: "(04)",
    title: "Full Stack Application Development",
    desc: "End-to-end delivery of web apps — from database schema to deployment — with CI/CD integration and cloud hosting setup.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Plan & Architect",
    desc: "Before writing a single line of code, I dive deep into understanding the project goals, user needs, and technical constraints.",
  },
  {
    num: "02",
    title: "Build & Develop",
    desc: "Build pixel-perfect user interfaces and robust backend systems in parallel. I ensure that every component—UI or API—is maintainable.",
  },
  {
    num: "03",
    title: "Launch & Support",
    desc: "I also provide post-launch monitoring, performance optimization, and ongoing iteration support to keep your product growing.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Bruno immediately understood our product goals and translated them into a beautifully optimized web experience. His technical expertise and collaborative spirit made a complex project feel effortless.",
    name: "Carlos Méndez",
    role: "Co-Founder of Launchly",
    img: "https://framerusercontent.com/images/segnJi5cGsCMhvZ3MZQnn4lCk5w.png?width=200&height=200",
  },
  {
    quote:
      "Working with Bruno was a game-changer for our e-commerce revamp. He not only delivered scalable, high-quality code but also brought clarity and structure to the entire process. Communication was seamless from start to finish.",
    name: "Sophie Lin",
    role: "Head of Product, Drift & Bloom",
    img: "https://framerusercontent.com/images/bDKMbcPAvq2NV7UPTBQOM1VL3s.png?width=200&height=200",
  },
  {
    quote:
      "Working with Bruno Simon was one of the best decisions we made for our web platform. He understood our vision, delivered clean & scalable code, and communicated clearly throughout the project.",
    name: "Ronald Richards",
    role: "CEO, BankTech Inc.",
    img: "https://framerusercontent.com/images/lF8aitXAAVNmt78KrR89HePZ4.jpg",
  },
];

const BLOGS = [
  {
    tag: "React JS",
    date: "Dec 12, 2025",
    title: "Frontend vs. Backend: Which Path Should You Choose?",
    img: "https://framerusercontent.com/images/EHMb8zKzqVJD0QzkFNeNdjhSgN0.png?width=730&height=644",
    href: "#",
  },
  {
    tag: "Development",
    date: "Dec 27, 2025",
    title: "11 SEO for Developers: Optimizing Websites for Better Rankings",
    img: "https://framerusercontent.com/images/oUHF4Vm4XW6MxC1QbnMplAecIo.png?width=731&height=645",
    href: "#",
  },
  {
    tag: "Freelancing",
    date: "May 31, 2025",
    title: "Working Remotely as a Full Stack Developer: My Workflow & Tools",
    img: "https://framerusercontent.com/images/lD4yb7dFgcMM2VA3QzizUeLOD8.png?width=730&height=644",
    href: "#",
  },
];

const CLIENT_LOGOS = [
  "https://framerusercontent.com/images/DQK7Tmnv6SJkWA9stJXhvtKwH4.svg",
  "https://framerusercontent.com/images/hzcZqfxQdB6RC633eKXn6iw7z8c.svg",
  "https://framerusercontent.com/images/5pxWC5y8WjyU1Uv3Bc54OholU5c.svg",
  "https://framerusercontent.com/images/ogreyPfU7HvLlj0EdTcBlsYkaoY.svg",
  "https://framerusercontent.com/images/c3diMwF7bReOTfz5ulmHithyolk.svg",
  "https://framerusercontent.com/images/rGfUYQmvR0LTNjAQB6jpFnrgNI.svg",
  "https://framerusercontent.com/images/skuc3F76nMZGwe4zi4L4syyFDU.svg",
  "https://framerusercontent.com/images/tpHQiLZevwwAKHlMDYgbIDdKPNY.svg",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Marquee ticker
function Marquee({ items, speed = 30 }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight pr-10 text-[#1a1a1a] select-none"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {item} <span className="text-[#b5f23d] text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Animated counter
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {val}{suffix}
    </span>
  );
}

// Section label
function SectionLabel({ children }) {
  return (
    <span
      className="text-xs tracking-widest uppercase text-gray-400 font-mono border border-gray-200 px-3 py-1 rounded-full"
    >
      // {children}
    </span>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #f0f0f0" : "none",
        }}
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2">
          <img
            src="https://framerusercontent.com/images/JC1bEh11aJKz6aSoyBXUXJCu2qw.svg"
            alt="DevSync"
            className="h-7"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "block";
            }}
          />
          <span
            className="hidden font-black text-xl tracking-tight text-[#1a1a1a]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            DevSync
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm tracking-wider uppercase text-gray-500 hover:text-[#1a1a1a] transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm px-5 py-2.5 rounded-full font-medium hover:bg-[#b5f23d] hover:text-[#1a1a1a] transition-all duration-300"
        >
          Hire Me
        </a>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className="block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300"
            style={{ transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "" }}
          />
          <span
            className="block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-[#1a1a1a] transition-all duration-300"
            style={{ transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center gap-8 transition-all duration-500 md:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transform: menuOpen ? "scale(1)" : "scale(1.05)",
        }}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-black uppercase tracking-tight text-[#1a1a1a] hover:text-[#b5f23d] transition-colors"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-4 bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-medium text-sm"
        >
          Hire Me
        </a>
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end bg-[#f5f4ef] overflow-hidden pt-28"
    >
      {/* Top row */}
      <div className="px-6 md:px-12 pb-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-0">
          {/* Left: greeting + name */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 animate-[fadeUp_0.8s_ease_forwards]">
              <span className="text-2xl">👋</span>
              <span className="text-sm text-gray-500 tracking-wider uppercase font-medium">
                Hey, I'm a Full Stack Developer
              </span>
            </div>
            <h1
              className="text-[clamp(4rem,10vw,9rem)] font-black leading-none tracking-tight text-[#1a1a1a]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Bruno
              <br />
              Simon
            </h1>
          </div>

          {/* Right: bio + links */}
          <div className="max-w-sm mb-4">
            <p className="text-gray-500 leading-relaxed mb-6 text-sm">
              I craft fast, scalable, and user-friendly web applications with modern
              JavaScript frameworks — combining React on the frontend with robust
              server-side solutions using Node.js.
            </p>
            <div className="space-y-1 text-xs text-gray-400 mb-5">
              <div>
                <span className="font-semibold text-gray-700 mr-2">E</span>
                <a href="mailto:info@brunosimon.com" className="hover:text-[#1a1a1a] transition-colors">
                  info@brunosimon.com
                </a>
              </div>
              <div>
                <span className="font-semibold text-gray-700 mr-2">T</span>
                <a href="tel:+390346385302" className="hover:text-[#1a1a1a] transition-colors">
                  +39 03 463 853 02
                </a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Twitter (X)", "LinkedIn", "GitHub", "CodePen"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs tracking-wider text-gray-400 hover:text-[#1a1a1a] transition-colors border-b border-gray-200 pb-0.5 hover:border-[#1a1a1a]"
                >
                  / {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero image strip */}
      <div className="relative w-full h-[40vh] md:h-[50vh] mt-8 overflow-hidden">
        <div className="absolute inset-0 flex gap-3 px-6 md:px-12">
          <div className="flex-1 rounded-t-2xl overflow-hidden">
            <img
              src="https://framerusercontent.com/images/ongsUhQe6MN61RIFPZ76l7o1y0.jpg?width=600&height=900"
              alt="Bruno"
              className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex-1 rounded-t-2xl overflow-hidden hidden md:block">
            <img
              src="https://framerusercontent.com/images/58g8kT7PCKKDa9uQOTfYozAIfw.png?width=600&height=900"
              alt="Bruno"
              className="w-full h-full object-cover object-top scale-100 hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex-1 rounded-t-2xl overflow-hidden hidden md:block">
            <img
              src="https://framerusercontent.com/images/ifh5y70AZnZIeMOzpBk7K3RCwLc.jpg?width=600&height=900"
              alt="Bruno"
              className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
        {/* SCROLL label */}
        <div className="absolute bottom-4 right-8 flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gray-400">
          SCROLL
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Name marquee strip */}
      <div className="bg-[#b5f23d] py-4 overflow-hidden">
        <Marquee items={["Bruno Simon", "Bruno Simon", "Bruno Simon"]} speed={20} />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>Skills</SectionLabel>
        </FadeIn>

        <div className="mt-12 grid md:grid-cols-2 gap-16">
          {/* Skills grid */}
          <FadeIn delay={0.1}>
            <div className="space-y-10">
              {SKILLS.map((s) => (
                <div key={s.category}>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-3 font-mono">
                    {s.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-[#b5f23d] hover:border-[#b5f23d] transition-all duration-200 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Bio + stats */}
          <FadeIn delay={0.2}>
            <div>
              <p className="text-gray-500 leading-relaxed text-sm mb-8">
                I thrive on solving real-world problems, turning ideas into clean,
                maintainable code, and learning through experimentation. You'll find me
                building side projects, diving into new tech stacks, or simply exploring
                what's next in the world of web development.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-[#1a1a1a] text-[#1a1a1a] text-sm px-5 py-2.5 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 mb-12"
              >
                My Resume
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 5, suffix: "+", label: "Years in Experience" },
                  { value: 20, suffix: "+", label: "Clients Worldwide" },
                  { value: 50, suffix: "+", label: "Completed Projects" },
                ].map((s) => (
                  <div key={s.label} className="text-center border border-gray-100 rounded-2xl p-4">
                    <p
                      className="text-3xl font-black text-[#1a1a1a] mb-1"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      <Counter target={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs text-gray-400 leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function WorksSection() {
  return (
    <section id="works" className="bg-[#f5f4ef] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Explore Work</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-black mt-4 text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                A Showcase of My
                <br />
                Latest Projects
              </h2>
            </div>
            <span className="text-6xl text-gray-200 font-black select-none hidden md:block">&lt;/ &gt;</span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.07}>
              <a
                href={p.href}
                className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="overflow-hidden h-52">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${p.title}/800/600`;
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="font-black text-lg text-[#1a1a1a] mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] tracking-wider px-2.5 py-1 bg-[#f5f4ef] text-gray-500 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1}>
          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#b5f23d] hover:text-[#1a1a1a] transition-all duration-300"
            >
              View More Projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="services" className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Service</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-black mt-4 text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                End-to-End Web
                <br />
                Development Services
              </h2>
            </div>
            <span className="text-6xl text-gray-200 font-black select-none hidden md:block">&lt;/ &gt;</span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Accordion */}
          <FadeIn delay={0.1}>
            <div className="space-y-0">
              {SERVICES.map((s, i) => (
                <div
                  key={s.num}
                  className="border-t border-gray-100 py-6 cursor-pointer group"
                  onClick={() => setActiveIdx(i === activeIdx ? -1 : i)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-400 font-mono">{s.num}</span>
                      <h3
                        className={`font-black text-lg transition-colors duration-200 ${activeIdx === i ? "text-[#1a1a1a]" : "text-gray-400"}`}
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {s.title}
                      </h3>
                    </div>
                    <span
                      className="text-xl text-gray-300 flex-shrink-0 transition-transform duration-200"
                      style={{ transform: activeIdx === i ? "rotate(45deg)" : "" }}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: activeIdx === i ? "120px" : "0px" }}
                  >
                    <p className="text-sm text-gray-500 mt-3 leading-relaxed ml-10">
                      {s.desc}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 bg-[#b5f23d] text-[#1a1a1a] text-xs font-semibold px-4 py-2 rounded-full mt-4 ml-10 hover:bg-[#a8e830] transition-colors"
                    >
                      Hire Me
                    </a>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-100" />
            </div>
          </FadeIn>

          {/* Illustration / decorative */}
          <FadeIn delay={0.2}>
            <div className="relative h-80 rounded-3xl overflow-hidden bg-[#f5f4ef] flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-10">
                <div className="w-20 h-20 rounded-2xl bg-[#b5f23d] flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M6 18h24M18 6v24M10 10l16 16M26 10L10 26" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-center text-sm text-gray-400 max-w-xs">
                  Delivering complete, production-ready web solutions from concept to deployment.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  {["React", "Node.js", "MongoDB", "AWS"].map((t) => (
                    <span key={t} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#1a1a1a] py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel>Process</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-black mt-4 text-white leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                My Development work
                <br />
                Process
              </h2>
            </div>
            <span className="text-6xl text-gray-700 font-black select-none hidden md:block">&lt;/ &gt;</span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {PROCESS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.12}>
              <div className="border border-gray-700 rounded-3xl p-8 hover:border-[#b5f23d] hover:bg-[#1e1e1e] transition-all duration-300 group">
                <span
                  className="text-5xl font-black text-gray-700 group-hover:text-[#b5f23d] transition-colors duration-300 block mb-6"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {p.num}
                </span>
                <h3
                  className="text-white font-black text-xl mb-3"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Testimonials</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-black mt-4 text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                What Clients Say
                <br />
                About Me
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a1a1a] hover:border-[#1a1a1a] hover:text-white transition-all duration-200 text-gray-500"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1a1a1a] hover:border-[#1a1a1a] hover:text-white transition-all duration-200 text-gray-500"
              >
                →
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Cards - show 1 on mobile, 2 on md, 3 on lg */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="bg-[#f5f4ef] rounded-3xl p-8 transition-all duration-500"
              style={{
                opacity: i === current || window.innerWidth >= 768 ? 1 : 0,
                display: i === current || window.innerWidth >= 768 ? "block" : "none",
              }}
            >
              <p className="text-gray-600 text-sm leading-relaxed mb-8 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=b5f23d&color=1a1a1a`;
                  }}
                />
                <div>
                  <p className="font-bold text-sm text-[#1a1a1a]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{ background: i === current ? "#1a1a1a" : "#e0e0e0" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section className="bg-[#f5f4ef] py-20 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel>My Client</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-black mt-4 text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Worked With
                <br />
                Amazing Clients
              </h2>
            </div>
            <span className="text-6xl text-gray-200 font-black select-none hidden md:block">&lt;/ &gt;</span>
          </div>
        </FadeIn>

        {/* Logo ticker */}
        <div className="relative overflow-hidden">
          <div className="flex gap-12 animate-[clientScroll_25s_linear_infinite]">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-10 w-28 flex items-center justify-center grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={src}
                  alt={`client-${i}`}
                  className="max-h-10 max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.parentElement.innerHTML = `<span class="text-xs text-gray-400 font-bold tracking-wider">CLIENT ${(i % 8) + 1}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogsSection() {
  return (
    <section id="blogs" className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Blogs</SectionLabel>
              <h2
                className="text-4xl md:text-5xl font-black mt-4 text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Developer Insights
                <br />
                &amp; Ideas
              </h2>
            </div>
            <span className="text-6xl text-gray-200 font-black select-none hidden md:block">&lt;/ &gt;</span>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOGS.map((b, i) => (
            <FadeIn key={b.title} delay={i * 0.08}>
              <a
                href={b.href}
                className="group block bg-[#f5f4ef] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-400 hover:-translate-y-1"
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={b.img}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${b.title}/730/644`;
                    }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] tracking-wider uppercase bg-[#b5f23d] text-[#1a1a1a] px-2.5 py-1 rounded-full font-semibold">
                      {b.tag}
                    </span>
                    <span className="text-xs text-gray-400">{b.date}</span>
                  </div>
                  <h3
                    className="font-black text-[#1a1a1a] leading-snug text-sm group-hover:text-gray-600 transition-colors"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {b.title}
                  </h3>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15}>
          <div className="mt-10 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#b5f23d] hover:text-[#1a1a1a] transition-all duration-300"
            >
              View More Blogs
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="contact" className="bg-[#1a1a1a] py-24 px-6 md:px-12 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-5">
        <div className="w-full h-full rounded-full border-[40px] border-[#b5f23d]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <SectionLabel>Contact</SectionLabel>
          <h2
            className="text-5xl md:text-7xl font-black text-white mt-8 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ready to take your
            <br />
            idea to{" "}
            <span className="text-[#b5f23d] italic">the next</span>
            <br />
            level?
          </h2>
          <a
            href="mailto:info@brunosimon.com"
            className="mt-10 inline-flex items-center gap-3 bg-[#b5f23d] text-[#1a1a1a] font-black px-10 py-4 rounded-full text-base hover:scale-105 transition-transform duration-200"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Start Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 14L14 2M14 2H6M14 2v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div
              className="text-2xl font-black text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              DevSync
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-5">
              Full Stack Developer crafting fast, scalable, and user-friendly web experiences.
            </p>
            <div className="space-y-1">
              <a href="mailto:brunosimon@gmail.com" className="block text-sm text-gray-400 hover:text-[#b5f23d] transition-colors">
                brunosimon@gmail.com
              </a>
              <a href="tel:6845550102" className="block text-sm text-gray-400 hover:text-[#b5f23d] transition-colors">
                (684) 555-0102
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-5 font-mono">Quick links</p>
            {["Home", "About", "Works", "Blogs", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
              >
                {l.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Portfolio */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-5 font-mono">Portfolio</p>
            {["CONTRA", "GITHUB", "CODEPEN"].map((l) => (
              <a
                key={l}
                href="#"
                className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Social */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-5 font-mono">Social Link</p>
            {["INSTAGRAM", "LINKEDIN", 'TWITTER "X"'].map((l) => (
              <a
                key={l}
                href="#"
                className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© 2025 Bruno Simon. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms & Conditions"].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Google Fonts + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes clientScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: 'Syne', sans-serif; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ClientsSection />
      <BlogsSection />
      <CtaSection />
      <Footer />
    </>
  );
}