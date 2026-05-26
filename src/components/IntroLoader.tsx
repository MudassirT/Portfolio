import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const Loader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const letters = useMemo(() => "MUDASSIR AHMED".split(""), []);

  useEffect(() => {
    const duration = 2400;
    let rafId: number;
    const start = performance.now();

    const update = (now: number) => {
      const p = Math.min(100, ((now - start) / duration) * 100);
      setProgress(p);
      if (p < 100) {
        rafId = requestAnimationFrame(update);
      }
    };

    rafId = requestAnimationFrame(update);
    const timer = window.setTimeout(onDone, duration + 400);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [onDone]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.4,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
      style={{ willChange: "opacity, transform" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/25 blur-2xl animate-blob" style={{ willChange: "transform" }} />
      <div className="absolute bottom-[18%] right-[10%] w-72 h-72 rounded-full bg-accent/15 blur-2xl animate-blob" style={{ animationDelay: "3s", willChange: "transform" }} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center text-primary-foreground font-display font-bold text-4xl elegant-shadow"
          style={{ willChange: "transform, opacity" }}
        >
          MA
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-1 overflow-hidden"
          style={{ willChange: "transform, opacity" }}
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
              className="font-display font-bold text-2xl md:text-4xl tracking-tight gradient-text"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.55 }}
          className="font-mono text-xs md:text-sm text-muted-foreground tracking-[0.3em] uppercase"
        >
          MERN · AI · Full-Stack
        </motion.p>

        <div className="w-64 md:w-80 h-[2px] bg-border/60 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-bg"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{Math.floor(progress)}%</span>
      </div>
    </motion.div>
  );
};

export const IntroLoader = ({ children }: { children: React.ReactNode }) => {
  const [done, setDone] = useState(false);
  return (
    <>
      <AnimatePresence mode="wait">
        {!done && <Loader key="loader" onDone={() => setDone(true)} />}
      </AnimatePresence>
      {done && children}
    </>
  );
};
