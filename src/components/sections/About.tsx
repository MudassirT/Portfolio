import { motion } from "framer-motion";
import { Code2, Brain, Rocket, Heart } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const traits = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Writing maintainable, scalable, and elegant solutions.",
  },
  {
    icon: Brain,
    title: "AI Curious",
    desc: "Exploring agentic AI, RAG, and intelligent assistants.",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    desc: "Picking up new tools and frameworks rapidly.",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    desc: "Building things I genuinely care about.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } },
};

const About = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 mesh-bg opacity-60" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: headline + bio ── */}
          <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="font-mono text-xs text-primary mb-4 tracking-[0.2em] uppercase">
              // About Me
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6">
              Engineering Systems that{" "}
              <span className="shimmer-text bg-[length:200%_auto]">Scale</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
              I build full-stack, AI-augmented web systems that are fast,
              purposeful, and production-ready — from architecture to deployment.
              My foundation is rigorous: MERN, Next.js, and Python-backed AI
              pipelines developed through real projects, not tutorials. I think
              in systems, ship in sprints, and always build with the end-user in
              mind.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Based in", value: "Karachi, Pakistan" },
                { label: "Degree", value: "BS Computer Science" },
                { label: "Focus", value: "MERN + AI + DevOps" },
                { label: "Status", value: "Open to work ✓" },
              ].map(f => (
                <div
                  key={f.label}
                  className="group bento-card rounded-xl p-3.5 relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5 cursor-pointer"
                >
                  {/* Ambient hover glow gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <p className="text-[11px] font-mono text-muted-foreground/70 uppercase tracking-widest mb-0.5 group-hover:text-primary transition-colors">
                      {f.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: trait cards ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {traits.map(t => (
              <motion.div
                key={t.title}
                variants={cardVariant}
                className="group bento-card rounded-2xl p-5 relative overflow-hidden hover:border-primary/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                {/* Ambient hover glow gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300">
                    <t.icon className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-base text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                    {t.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
