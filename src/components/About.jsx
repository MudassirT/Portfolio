import { motion } from "framer-motion";
import { Brain, Code2, Rocket } from "lucide-react";

const stats = [
  { icon, label, value,
  { icon, label, value,
  { icon, label, value,
];

export const About = () => {
  return (
    <section id="about" className="relative py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity, y={{ opacity, y={{ once, margin={{ duration="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">01 — About</span>
          <h2 className="font-display font-bold text-4xl sm="gradient-text">curiosity</span>
          </h2>
        </motion.div>

        <div className="grid md={{ opacity, x={{ opacity, x={{ once, margin={{ duration="space-y-5 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I'm <span className="text-foreground font-medium">Mudassir Ahmed</span>, a 19-year-old
              Computer Science undergraduate at <span className="text-foreground">Hamdard University</span>,
              passionate about building modern, intelligent web experiences.
            </p>
            <p>
              My journey blends a strong CS foundation — C, C++ (OOP), Discrete
              Structures, Digital Logic — with practical full-stack engineering
              through the <span className="text-foreground">Governor Sindh Initiative for GenAI, Web3 & Metaverse</span>,
              and DevOps mastery at <span className="text-foreground">Saylani Mass IT Training (SMIT)</span>.
            </p>
            <p>
              I'm deeply ambitious about <span className="gradient-text font-semibold">Agentic AI</span>,
              chatbots, and shipping products that feel alive.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity, x={{ opacity, x={{ once, margin={{ duration, delay="grid gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity, y={{ opacity, y={{ once={{ delay="group glass rounded-2xl p-5 flex items-center gap-4 hover="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground group-hover="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  <div className="font-display font-semibold text-lg">{s.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
