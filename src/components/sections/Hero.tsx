import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import profileImg from "@/assets/Profile1.jpg";

const roles = [
  "MERN Stack Developer",
  "AI Enthusiast",
  "Next.js Engineer",
  "DevOps Learner",
  "Problem Solver",
];

const stats = [
  { value: "6+",  label: "Projects Built" },
  { value: "3+",  label: "Years Learning" },
  { value: "10+", label: "Technologies" },
  { value: "∞",   label: "Cups of Chai" },
];

const socials = [
  { icon: Github,   href: "https://github.com/MudassirT",                          label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mudassir-tariq-465102370",  label: "LinkedIn" },
  { icon: Mail,     href: "#contact",                                               label: "Email" },
];

/* Stagger container for children */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.65, 0, 0.35, 1] } },
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText]           = useState("");
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed   = deleting ? 45 : 95;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setRoleIndex(i => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 dot-pattern opacity-40" />
      {/* Radial spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/[0.07] blur-[120px] pointer-events-none" />
      {/* Blobs */}
      <div className="absolute -top-24 -left-32 w-[500px] h-[500px] rounded-full bg-primary/[0.055] blur-[110px] animate-blob pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-[420px] h-[420px] rounded-full bg-primary/[0.04] blur-[100px] animate-blob pointer-events-none" style={{ animationDelay: "5s" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left — Text content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 order-2 lg:order-1"
          >
            {/* Availability badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-xs font-medium font-mono text-primary tracking-wide">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                Available for select opportunities
              </span>
            </motion.div>

            {/* Name block */}
            <motion.div variants={item} className="space-y-1">
              <p className="font-mono text-sm text-muted-foreground tracking-wider mb-3">
                Full-Stack Engineer &amp; AI Builder
              </p>
              <h1 className="font-display font-extrabold leading-[1.05] tracking-tight text-foreground">
                <span className="block text-5xl md:text-6xl lg:text-7xl">Mudassir</span>
                <span className="block text-5xl md:text-6xl lg:text-7xl shimmer-text bg-[length:200%_auto]">
                  Ahmed
                </span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              variants={item}
              className="flex items-center gap-2 h-8 font-display font-semibold text-lg text-muted-foreground"
            >
              <span className="text-primary">✦</span>
              <span>{text}</span>
              <span className="w-[2px] h-5 bg-primary animate-pulse rounded-full" />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-base text-muted-foreground leading-relaxed max-w-md"
            >
              CS undergraduate at Hamdard University building production-grade
              web systems with the{" "}
              <span className="text-foreground font-medium">MERN stack</span>,{" "}
              <span className="text-foreground font-medium">Next.js</span>, and{" "}
              <span className="text-foreground font-medium">AI</span>. I architect
              intelligent, user-first products — then ship them.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_28px_hsl(var(--primary)/0.45)] transition-all duration-300 group"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-secondary/30 transition-all duration-300 group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                Download Résumé
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
                Find me
              </span>
              <div className="h-px w-12 bg-border" />
              <div className="flex gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right — Profile orb ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="relative flex justify-center items-center order-1 lg:order-2"
          >
            {/* Outer spinning ring */}
            <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px]">
              {/* Glow halos */}
              <div className="absolute -inset-8 rounded-full bg-primary/[0.08] blur-2xl" />
              <div className="absolute -inset-2 rounded-full bg-primary/[0.06] blur-md" />

              {/* Spinning gradient ring */}
              <div className="absolute inset-[-6px] rounded-full animate-spin-slow opacity-80">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-primary via-transparent via-50% to-primary/30 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-background" />
                </div>
              </div>

              {/* Static ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20" />

              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-primary/20 animate-pulse-glow">
                <img
                  src={profileImg}
                  alt="Mudassir Ahmed — MERN Stack Developer"
                  className="w-full h-full object-cover"
                />
                {/* Inner vignette */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-primary/10" />
              </div>

              {/* Floating tech badges */}
              <div
                className="absolute -top-3 -right-4 glass rounded-xl px-3 py-1.5 text-xs font-mono shadow-card animate-float"
                style={{ animationDelay: "0s" }}
              >
                <span className="text-primary mr-1">⚛</span>React
              </div>
              <div
                className="absolute top-1/3 -left-12 glass rounded-xl px-3 py-1.5 text-xs font-mono shadow-card animate-float"
                style={{ animationDelay: "1.8s" }}
              >
                <span className="gradient-text font-bold mr-1">{ }</span>Node.js
              </div>
              <div
                className="absolute -bottom-3 -right-8 glass rounded-xl px-3 py-1.5 text-xs font-mono shadow-card animate-float"
                style={{ animationDelay: "3.2s" }}
              >
                <span className="text-primary mr-1">✦</span>AI/ML
              </div>
              <div
                className="absolute bottom-1/4 -left-14 glass rounded-xl px-3 py-1.5 text-xs font-mono shadow-card animate-float"
                style={{ animationDelay: "2.1s" }}
              >
                <span className="text-primary mr-1">▲</span>Next.js
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {stats.map(s => (
            <div
              key={s.label}
              className="bento-card rounded-2xl p-5 text-center"
            >
              <div className="font-display font-extrabold text-3xl md:text-4xl shimmer-text bg-[length:200%_auto]">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1.5 uppercase tracking-[0.1em] font-mono">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
