import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import profileLight from "@/assets/Profile1.png";
import profileDark from "@/assets/Profile2.png";

export const Hero = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? resolvedTheme || theme : "light";
  const currentImage = activeTheme === "dark" ? profileDark : profileLight;
  const showProfileGlow = activeTheme === "dark";

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
        <div className="absolute top-20 -left-16 w-[420px] h-[420px] rounded-full bg-primary/25 blur-[72px] animate-blob" style={{ willChange: "transform" }} />
        <div
          className="absolute bottom-0 -right-16 w-[420px] h-[420px] rounded-full bg-accent/18 blur-[72px] animate-blob"
          style={{ animationDelay: "4s", willChange: "transform" }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left text */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono uppercase tracking-wider"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
              </span>
              Available for opportunities
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
              >
                Hi, I'm <span className="gradient-text">Mudassir</span>
                <br />
                <span className="text-foreground/90">Ahmed.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display text-xl sm:text-2xl text-muted-foreground"
              >
                MERN Stack Developer{" "}
                <span className="inline-flex items-center gap-1 text-foreground">
                  <Sparkles className="w-4 h-4 text-accent" />
                  building with AI
                </span>
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              19-year-old Computer Science undergraduate from Karachi, crafting
              intelligent full-stack applications with React, Node.js, Next.js
              and modern AI tooling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-primary-foreground font-medium elegant-shadow hover:scale-105 transition-transform duration-300"
              >
                View My Work
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass font-medium hover:bg-secondary transition-colors"
              >
                Let's Talk
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-3 pt-4"
            >
              {[
                { icon: Github, href: "https://github.com/MudassirT" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/mudassir-tariq-465102370" },
                { icon: Mail, href: "#contact" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="lg:col-span-2 relative flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-full lg:h-[420px] max-w-md">
              <div className="absolute inset-0 rounded-[2rem] gradient-bg blur-3xl opacity-50 animate-glow-pulse" />
              <div className="absolute inset-0 rounded-[2rem] gradient-bg p-[2px] animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
                <div className="relative w-full h-full rounded-[1.95rem] overflow-hidden bg-card">
                  <img
                    src={currentImage}
                    alt="Mudassir Ahmed"
                    width={768}
                    height={768}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 card-shadow"
              >
                <div className="text-xs text-muted-foreground font-mono">EXPERIENCE</div>
                <div className="font-display font-bold text-lg gradient-text">2+ Years</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 card-shadow"
              >
                <div className="text-xs text-muted-foreground font-mono">PROJECTS</div>
                <div className="font-display font-bold text-lg gradient-text">6+ Built</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};
