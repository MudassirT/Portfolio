import { motion } from "framer-motion";

const groups = [
  {
    title,
    skills, "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title,
    skills, "Express", "MongoDB", "REST APIs", "Authentication"],
  },
  {
    title,
    skills, "RAG Systems", "AI Chatbots", "OpenAI APIs", "Python"],
  },
  {
    title,
    skills, "Docker", "Git & GitHub", "CI/CD", "Linux"],
  },
  {
    title,
    skills, "OOP", "Data Structures", "Discrete Math", "Digital Logic"],
  },
];

const marquee = [
  "React", "Next.js", "Node.js", "MongoDB", "Express", "TypeScript",
  "Tailwind", "Python", "Docker", "Azure", "Agentic AI", "RAG", "OpenAI",
];

export const Skills = () => {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity, y={{ opacity, y={{ once, margin={{ duration="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">03 — Skills</span>
          <h2 className="font-display font-bold text-4xl sm="gradient-text">tech arsenal</span>
          </h2>
        </motion.div>

        <div className="grid sm, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity, y={{ opacity, y={{ once, margin={{ duration, delay="group relative glass rounded-2xl p-6 hover="absolute inset-0 opacity-0 group-hover="relative">
                <h3 className="font-display font-bold text-xl mb-4 gradient-text">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 text-xs font-mono rounded-full bg-secondary text-secondary-foreground border border-border/40 hover))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-6 border-y border-border/40">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="font-display font-bold text-3xl md="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
