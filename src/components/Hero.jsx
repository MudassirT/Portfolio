import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ArrowDown, Sparkles } from "lucide-react";
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-slate-900 to-background" />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.3em] text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for opportunities
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <h1 className="font-display text-5xl font-bold sm:text-6xl">
                Hey, I&apos;m <span className="gradient-text">Mudassir</span> Ahmed.
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                I build intelligent full-stack applications with React, Node.js, Next.js, and AI-first experiences.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full gradient-bg px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                View Projects
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-7 py-3.5 text-sm font-medium transition hover:border-primary">
                Contact Me
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-border/50 bg-card p-4 shadow-2xl">
            <img src={currentImage} alt="Mudassir Ahmed" className="h-full w-full rounded-[1.5rem] object-cover" />
          </motion.div>
        </div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground">
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};
