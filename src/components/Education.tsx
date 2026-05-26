import { motion } from "framer-motion";
import { GraduationCap, Cloud, BookOpen } from "lucide-react";

const items = [
  {
    icon: BookOpen,
    period: "2023 — Present · Q4 in progress",
    title: "Governor Sindh Initiative for GenAI, Web3 & Metaverse",
    role: "Full-Stack & Generative AI Track",
    points: [
      "Completed 3 quarters · currently in Quarter 4",
      "Python, Next.js, TypeScript, Agentic AI",
      "AI Chatbots, RAG, building personal AI assistants",
    ],
    accent: "from-primary to-primary-glow",
  },
  {
    icon: Cloud,
    period: "March 2026 — March 2027 (in shaa Allah)",
    title: "Saylani Mass IT Training (SMIT)",
    role: "DevOps Engineer Course",
    points: [
      "Cloud-based DevOps engineering on Microsoft Azure",
      "Docker, CI/CD pipelines, modern industry tooling",
      "Integrating AI into DevOps workflows",
    ],
    accent: "from-accent to-primary",
  },
  {
    icon: GraduationCap,
    period: "2nd Year Undergraduate",
    title: "Hamdard University, Karachi",
    role: "BS Computer Science",
    points: [
      "Strong CS foundations: C, OOP in C++",
      "Discrete Structures, Digital Logic Design",
      "Application of ICT and core software engineering subjects",
    ],
    accent: "from-primary-glow to-accent",
  },
];

export const Education = () => {
  return (
    <section id="education" className="relative py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">02 — Education</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mt-3">
            Learning <span className="gradient-text">never stops</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {items.map((it, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 ${left ? "" : "md:[&>*:first-child]:order-2"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-6 w-4 h-4 -translate-x-1/2 rounded-full gradient-bg ring-4 ring-background z-10" />

                  <div className={`pl-16 md:pl-0 ${left ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                    <div className="font-mono text-xs uppercase tracking-wider text-primary mb-2">{it.period}</div>
                    <h3 className="font-display font-bold text-2xl">{it.title}</h3>
                    <p className="text-muted-foreground mt-1">{it.role}</p>
                  </div>

                  <div className={`pl-16 md:pl-0 mt-4 md:mt-0 ${left ? "md:pl-8" : "md:pr-8"}`}>
                    <div className="glass rounded-2xl p-6 card-shadow group hover:-translate-y-1 transition-transform">
                      <div className={`inline-flex w-11 h-11 rounded-xl bg-gradient-to-br ${it.accent} items-center justify-center text-primary-foreground mb-4`}>
                        <it.icon className="w-5 h-5" />
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {it.points.map((p) => (
                          <li key={p} className="flex gap-2">
                            <span className="text-primary mt-1">▸</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
