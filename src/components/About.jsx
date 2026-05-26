import { motion } from "framer-motion";
import { Brain, Code2, Rocket } from "lucide-react";

const stats = [
  { icon: Brain, label: "AI", value: "Agentic Systems" },
  { icon: Code2, label: "Web", value: "Full-Stack Apps" },
  { icon: Rocket, label: "Launch", value: "Fast Delivery" },
];

export const About = () => {
  return (
    <section id="about" className="relative py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            01 — About
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl">Curiosity</h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I'm <span className="text-foreground font-medium">Mudassir Ahmed</span>, a 19-year-old Computer Science undergraduate.
            </p>
            <p>
              My work blends a strong CS foundation with practical full-stack engineering, AI research, and modern web design.
            </p>
            <p>
              I'm passionate about <span className="gradient-text font-semibold">Agentic AI</span>, chatbots, and building products that feel alive.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group glass rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl gradient-bg text-primary-foreground">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                    <div className="font-display font-semibold text-lg">{stat.value}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
