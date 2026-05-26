import { motion } from "framer-motion";
import { GraduationCap, Cloud, BookOpen } from "lucide-react";

const items = [
  {
    icon: GraduationCap,
    period: "2023 — Present",
    title: "Computer Science Undergraduate",
    role: "Institute of Business Administration, Karachi",
    points: [
      "Core coursework in algorithms, OOP, and discrete structures",
      "Projects in React, Python, and agentic AI systems",
      "Strong focus on software engineering and modern web stacks",
    ],
    accent: "from-primary to-secondary",
  },
  {
    icon: Cloud,
    period: "2022 — 2023",
    title: "Web3 & Metaverse Training",
    role: "Governor Sindh Initiative",
    points: [
      "Hands-on experience with blockchain and metaverse concepts",
      "Built Web3 demos and AI-powered interfaces",
      "Learned DevOps tooling and cloud-native deployment",
    ],
    accent: "from-accent to-primary",
  },
  {
    icon: BookOpen,
    period: "2020 — 2022",
    title: "Intermediate Computer Science",
    role: "Federal Science College, Karachi",
    points: [
      "Study of OOP in C++, data structures, and digital logic",
      "Developed problem-solving and algorithmic thinking",
      "Applied ICT fundamentals to practical software projects",
    ],
    accent: "from-secondary to-accent",
  },
];

export const Education = () => {
  return (
    <section id="education" className="relative py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            02 — Education
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl">Never stops</h2>
        </motion.div>

        <div className="space-y-12">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-3xl p-6 border border-border/60"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{item.period}</p>
                    <h3 className="font-display text-2xl font-bold mt-2">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.role}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-primary mt-1">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
