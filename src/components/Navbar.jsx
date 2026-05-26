import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href, label,
  { href, label,
  { href, label,
  { href, label,
  { href, label,
  { href, label,
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y={{ y={{ delay, duration, ease, 0, 0.35, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3"={`container mx-auto px-4 ${scrolled ? "max-w-5xl"={`flex items-center justify-between rounded-full px-5 py-3 ${scrolled ? "glass elegant-shadow"="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center font-display font-bold text-primary-foreground text-sm group-hover="font-display font-semibold hidden sm="gradient-text">.dev</span></span>
          </a>

          <ul className="hidden lg) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover="absolute inset-x-4 -bottom-0.5 h-[1.5px] scale-x-0 group-hover))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity={{ opacity={{ opacity="fixed inset-0 z-50 lg="flex justify-end p-6">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full glass flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="flex flex-col items-center justify-center flex-1 gap-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity, y={{ opacity, y={{ delay={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl font-semibold hover))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
