import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Cloud, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const items = [
  {
    icon: GraduationCap,
    period: "2023 — Present",
    title: "Governor Sindh Initiative",
    subtitle: "GenAI, Web3 & Metaverse",
    status: "4th Quarter",
    statusColor: "text-emerald-400 bg-emerald-500/10",
    description:
      "Completed 3 quarters successfully. Currently studying Python, Next.js, TypeScript, Agentic AI, AI Chatbots, AI-assisted development, and building personal AI assistants.",
    skills: ["Python", "Next.js", "TypeScript", "Agentic AI", "AI Chatbots"],
  },
  {
    icon: BookOpen,
    period: "Ongoing",
    title: "Hamdard University",
    subtitle: "BS Computer Science · 2nd Year",
    status: "Undergraduate",
    statusColor: "text-teal-400 bg-teal-500/10",
    description:
      "Building strong CS foundations: C, OOP in C++, Discrete Structures, Digital Logic Design, Application of ICT, and core software engineering subjects.",
    skills: ["C / C++", "OOP", "DSA", "Discrete Math", "DLD"],
  },
  {
    icon: Cloud,
    period: "Mar 2026 — Mar 2027",
    title: "Saylani Mass IT Training",
    subtitle: "DevOps Engineering",
    status: "In Progress",
    statusColor: "text-cyan-400 bg-cyan-500/10",
    description:
      "Cloud-based DevOps engineering with Azure, Docker, and modern industry tools. Learning to integrate AI into DevOps workflows for next-generation engineering.",
    skills: ["Azure", "Docker", "CI/CD", "AI in DevOps"],
  },
];

const cardVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.65, 0, 0.35, 1] } },
};

const Education = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="education" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div
          ref={ref}
          className={`max-w-xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-mono text-xs text-primary mb-4 tracking-[0.2em] uppercase">
            // Education
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
            My Learning{" "}
            <span className="shimmer-text bg-[length:200%_auto]">Journey</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Three pillars shaping me into a well-rounded engineer.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                variants={cardVariant}
                transition={{ delay: i * 0.1 }}
                className="relative pl-14 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-[14px] top-6 -translate-x-1/2 w-[22px] h-[22px] rounded-full border-2 border-primary bg-background flex items-center justify-center shadow-[0_0_12px_hsl(var(--primary)/0.5)]">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                {/* Card */}
                <div className="bento-card rounded-2xl p-6 border border-border/30 group-hover:border-primary/50 group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  {/* Ambient hover glow gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-muted-foreground">
                            {item.period}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium font-mono ${item.statusColor}`}>
                            {item.status}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.skills.map(s => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 rounded-lg bg-primary/8 text-primary font-mono border border-primary/15 hover:bg-primary/12 transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
