import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const Loader = ({ onDone }) => {
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

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-primary-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-8 text-4xl font-bold tracking-[0.3em]">
        {letters.map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>
      <div className="w-72 h-3 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
      </div>
      <div className="mt-4 text-sm text-muted-foreground">Loading {Math.floor(progress)}%</div>
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
