import { motion } from "framer-motion";
import { GraduationCap, Cloud, BookOpen } from "lucide-react";

const items = [
  {
    icon,
    period,
    title, Web3 & Metaverse",
    role,
    points,
      "Python, Next.js, TypeScript, Agentic AI",
      "AI Chatbots, RAG, building personal AI assistants",
    ],
    accent,
  },
  {
    icon,
    period)",
    title)",
    role,
    points,
      "Docker, CI/CD pipelines, modern industry tooling",
      "Integrating AI into DevOps workflows",
    ],
    accent,
  },
  {
    icon,
    period,
    title, Karachi",
    role,
    points, OOP in C++",
      "Discrete Structures, Digital Logic Design",
      "Application of ICT and core software engineering subjects",
    ],
    accent,
  },
];

export const Education = () => {
  return (
    <section id="education" className="relative py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity, y={{ opacity, y={{ once, margin={{ duration="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">02 — Education</span>
          <h2 className="font-display font-bold text-4xl sm="gradient-text">never stops</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md="space-y-12">
            {items.map((it, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={it.title}
                  initial={{ opacity, y={{ opacity, y={{ once, margin={{ duration, delay={`relative md="absolute left-6 md={`pl-16 md="font-mono text-xs uppercase tracking-wider text-primary mb-2">{it.period}</div>
                    <h3 className="font-display font-bold text-2xl">{it.title}</h3>
                    <p className="text-muted-foreground mt-1">{it.role}</p>
                  </div>

                  <div className={`pl-16 md="glass rounded-2xl p-6 card-shadow group hover={`inline-flex w-11 h-11 rounded-xl bg-gradient-to-br ${it.accent} items-center justify-center text-primary-foreground mb-4`}>
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
