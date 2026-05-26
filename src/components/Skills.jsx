import { motion } from "framer-motion";

const groups = [
  {
    title: "Frontend",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Express", "MongoDB", "REST APIs", "Authentication"],
  },
  {
    title: "AI",
    skills: ["RAG Systems", "AI Chatbots", "OpenAI APIs", "Python"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Git & GitHub", "CI/CD", "Linux"],
  },
  {
    title: "Foundations",
    skills: ["OOP", "Data Structures", "Discrete Math", "Digital Logic"],
  },
];

const marquee = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Express",
  "TypeScript",
  "Tailwind",
  "Python",
  "Docker",
  "Azure",
  "Agentic AI",
  "RAG",
  "OpenAI",
];

export const Skills = () => {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            03 — Skills
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl">
            Tech arsenal
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl border border-border/60 bg-muted/70 p-6 shadow-lg"
            >
              <h3 className="font-display font-bold text-xl mb-4 text-primary">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono rounded-full bg-secondary text-secondary-foreground border border-border/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative overflow-hidden py-6 border-y border-border/40 mt-16">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="font-display font-bold text-3xl text-primary">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
