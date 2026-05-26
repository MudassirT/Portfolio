import { motion } from "framer-motion";

const groups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
  },
  {
    title: "AI / GenAI",
    skills: ["Agentic AI", "RAG Systems", "AI Chatbots", "OpenAI APIs", "Python"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Azure", "Docker", "Git & GitHub", "CI/CD", "Linux"],
  },
  {
    title: "Foundations",
    skills: ["C / C++", "OOP", "Data Structures", "Discrete Math", "Digital Logic"],
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">03 — Skills</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mt-3">
            My <span className="gradient-text">tech arsenal</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative glass rounded-2xl p-6 hover:elegant-shadow transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              <div className="relative">
                <h3 className="font-display font-bold text-xl mb-4 gradient-text">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 text-xs font-mono rounded-full bg-secondary text-secondary-foreground border border-border/40 hover:border-primary/60 hover:text-primary transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-6 border-y border-border/40">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="font-display font-bold text-3xl md:text-5xl text-muted-foreground/40 hover:text-primary transition-colors">
                {m} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
