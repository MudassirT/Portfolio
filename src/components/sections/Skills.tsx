import { motion } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";

const allSkills = [
  // Row 1 — left to right
  { name: "React",       row: 1 },
  { name: "Next.js",     row: 1 },
  { name: "TypeScript",  row: 1 },
  { name: "Tailwind CSS",row: 1 },
  { name: "Node.js",     row: 1 },
  { name: "Express.js",  row: 1 },
  { name: "MongoDB",     row: 1 },
  { name: "REST APIs",   row: 1 },
  // Row 2 — right to left
  { name: "Python",      row: 2 },
  { name: "Agentic AI",  row: 2 },
  { name: "LangChain",   row: 2 },
  { name: "OpenAI",      row: 2 },
  { name: "Docker",      row: 2 },
  { name: "Azure",       row: 2 },
  { name: "Git",         row: 2 },
  { name: "C / C++",     row: 2 },
];

const groups = [
  {
    title: "Frontend",
    prefix: "⚛",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    prefix: "⚙",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Mongoose"],
  },
  {
    title: "AI & Tools",
    prefix: "✦",
    skills: ["Python", "Agentic AI", "RAG", "OpenAI", "LangChain", "AI Chatbots"],
  },
  {
    title: "DevOps & Core",
    prefix: "☁",
    skills: ["Docker", "Azure", "Git", "C / C++", "OOP", "DSA"],
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } },
};

const Skills = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const row1 = allSkills.filter(s => s.row === 1);
  const row2 = allSkills.filter(s => s.row === 2);

  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      {/* Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/[0.05] blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div
          ref={ref}
          className={`max-w-xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-mono text-xs text-primary mb-4 tracking-[0.2em] uppercase">
            // Skills
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
            My{" "}
            <span className="shimmer-text bg-[length:200%_auto]">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground">
            Tools and technologies I use to bring ideas to life.
          </p>
        </div>
      </div>

      {/* ── Dual-row marquee ── */}
      <div className="marquee-wrapper mb-16 space-y-3 overflow-hidden">
        {/* Row 1 → left */}
        <div className="flex gap-3 animate-marquee whitespace-nowrap w-max">
          {[...row1, ...row1].map((s, i) => (
            <span
              key={`r1-${i}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/60 backdrop-blur-sm text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default flex-shrink-0"
            >
              <span className="text-primary opacity-60">◈</span>
              {s.name}
            </span>
          ))}
        </div>

        {/* Row 2 ← right */}
        <div className="flex gap-3 animate-marquee-reverse whitespace-nowrap w-max">
          {[...row2, ...row2].map((s, i) => (
            <span
              key={`r2-${i}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/60 backdrop-blur-sm text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default flex-shrink-0"
            >
              <span className="text-primary opacity-60">◈</span>
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Category cards ── */}
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.08 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {groups.map(g => (
            <motion.div
              key={g.title}
              variants={cardVariant}
              className="group bento-card rounded-2xl p-5 relative overflow-hidden"
            >
              {/* Hover glow spot */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/[0.08] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xl text-primary">{g.prefix}</span>
                  <h3 className="font-display font-bold text-base text-foreground">
                    {g.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {g.skills.map(s => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-border bg-secondary/30 text-muted-foreground font-mono hover:border-primary/30 hover:text-primary hover:bg-primary/8 transition-all duration-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
