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

  const activeTheme = mounted ? resolvedTheme || theme;
  const currentImage = activeTheme === "dark" ? profileDark;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
        <div className="absolute top-20 -left-16 w-[420px] h-[420px] rounded-full bg-primary/25 blur-[72px] animate-blob" style={{ willChange="absolute bottom-0 -right-16 w-[420px] h-[420px] rounded-full bg-accent/18 blur-[72px] animate-blob"
          style={{ animationDelay, willChange="container mx-auto px-4 max-w-6xl">
        <div className="grid lg="lg={{ opacity, y={{ opacity, y={{ duration="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono uppercase tracking-wider"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
              </span>
              Available for opportunities
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity, y={{ opacity, y={{ duration, delay="font-display font-bold text-5xl sm, I'm <span className="gradient-text">Mudassir</span>
                <br />
                <span className="text-foreground/90">Ahmed.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity, y={{ opacity, y={{ duration, delay="font-display text-xl sm="inline-flex items-center gap-1 text-foreground">
                  <Sparkles className="w-4 h-4 text-accent" />
                  building with AI
                </span>
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity, y={{ opacity, y={{ duration, delay="text-base sm, crafting
              intelligent full-stack applications with React, Node.js, Next.js
              and modern AI tooling.
            </motion.p>

            <motion.div
              initial={{ opacity, y={{ opacity, y={{ duration, delay="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg text-primary-foreground font-medium elegant-shadow hover="w-4 h-4 group-hover="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass font-medium hover={{ opacity={{ opacity={{ duration, delay="flex items-center gap-3 pt-4"
            >
              {[
                { icon, href,
                { icon, href,
                { icon, href,
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank"={s.href.startsWith("http") ? "noopener noreferrer"="w-11 h-11 rounded-full glass flex items-center justify-center text-muted-foreground hover="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right portrait */}
          <motion.div
            initial={{ opacity, scale={{ opacity, scale={{ duration, delay, ease, 1.56, 0.64, 1] }}
            className="lg="relative w-72 h-72 sm="absolute inset-0 rounded-[2rem] gradient-bg blur-2xl opacity-30 animate-glow-pulse" />
              <div className="absolute inset-0 rounded-[2rem] gradient-bg p-[2px] animate-gradient-shift" style={{ backgroundSize="relative w-full h-full rounded-[1.95rem] overflow-hidden bg-card">
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
                animate={{ y, -10, 0] }}
                transition={{ duration, repeat="absolute -top-4 -left-4 glass rounded-2xl px-4 py-3 card-shadow"
              >
                <div className="text-xs text-muted-foreground font-mono">EXPERIENCE</div>
                <div className="font-display font-bold text-lg gradient-text">2+ Years</div>
              </motion.div>
              <motion.div
                animate={{ y, 10, 0] }}
                transition={{ duration, repeat, delay="absolute -bottom-4 -right-4 glass rounded-2xl px-4 py-3 card-shadow"
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
        animate={{ y, 8, 0] }}
        transition={{ duration, repeat="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};
