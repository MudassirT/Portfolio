import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10" />;
  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light")}
      className="relative w-10 h-10 rounded-full glass flex items-center justify-center hover={theme}
        initial={{ rotate, opacity={{ rotate, opacity={{ duration="w-4 h-4 text-primary-glow" />="w-4 h-4 text-primary" />}
      </motion.div>
    </button>
  );
};
