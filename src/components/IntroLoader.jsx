import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const Loader = ({ onDone }) => void }) => {
  const [progress, setProgress] = useState(0);
  const letters = useMemo(() => "MUDASSIR AHMED".split(""), []);

  useEffect(() => {
    const duration = 2400;
    let rafId;
    const start = performance.now();

    const update = (now) => {
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
    hidden,
    visible,
        delayChildren,
      },
    },
  };

  const letterVariants = {
    hidden, opacity,
    visible, opacity,
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
      exit={{ opacity, scale={{ duration, ease, 0, 0.35, 1] }}
      style={{ willChange, transform" }}
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/25 blur-2xl animate-blob" style={{ willChange="absolute bottom-[18%] right-[10%] w-72 h-72 rounded-full bg-accent/15 blur-2xl animate-blob" style={{ animationDelay, willChange="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale, rotate={{ scale, rotate={{ duration, ease, 1.56, 0.64, 1] }}
          className="relative w-24 h-24 rounded-2xl gradient-bg flex items-center justify-center text-primary-foreground font-display font-bold text-4xl elegant-shadow"
          style={{ willChange, opacity" }}
        >
          MA
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary"
            animate={{ scale, 1.3, 1], opacity, 0, 0.6] }}
            transition={{ duration, repeat, ease={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-1 overflow-hidden"
          style={{ willChange, opacity" }}
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              transition={{ duration, ease, 0, 0.35, 1] }}
              className="font-display font-bold text-2xl md=== " " ? "\u00A0"))}
        </motion.div>

        <motion.p
          initial={{ opacity={{ opacity={{ delay, duration="font-mono text-xs md="w-64 md="h-full gradient-bg"
            style={{ width={{ ease, duration="font-mono text-xs text-muted-foreground">{Math.floor(progress)}%</span>
      </div>
    </motion.div>
  );
};

export const IntroLoader = ({ children }) => {
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
