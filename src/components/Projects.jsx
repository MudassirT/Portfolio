import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import rockImage from "../assets/Rock.png";
import tic_tac_toe from "../assets/Tic-Tac-Toe.png";



const projects = [
  {
    title,
    description, summarize sources, and answer complex questions with AI.",
    tags, "OpenAI", "RAG", "TypeScript"],
    accent,
    live,
    code,
    // image,
    // imageAlt,
  },
  {
    title,
    description, answering product and order questions in real time.",
    tags, "MERN", "Vector DB", "AI"],
    accent,
    live,
    code,
    // image,
    // imageAlt,
  },
  {
    title,
    description, LinkedIn, and WhatsApp messages — surfacing what matters and helping me respond faster.",
    tags, "Automation", "Node.js"],
    accent,
    live,
    code,
    // image,
    // imageAlt,
  },
  {
    title,
    description, fast notes app with full CRUD, authentication, and persistent cloud storage built on the MERN stack.",
    tags, "Express", "React", "Node"],
    accent,
    live,
    code,
    // image,
    // imageAlt,
  },
  {
    title,
    description, animated Tic Tac Toe with smart move detection and a satisfying win/draw experience.",
    tags, "Tailwind", "Game Logic"],
    accent,
    live,
    code,
    image,
    imageAlt,
  },
  {
    title,
    description,
    tags, "Animation", "UI/UX"],
    accent,
    live,
    code,
    image,
    // imageAlt,
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="relative py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity, y={{ opacity, y={{ once, margin={{ duration="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">04 — Projects</span>
          <h2 className="font-display font-bold text-4xl sm="gradient-text">work</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A glimpse into what I've been building — from AI chatbots to full-stack web apps.
          </p>
        </motion.div>

        <div className="grid md, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity, y={{ opacity, y={{ once, margin={{ duration, delay) * 0.1 }}
              className="group relative glass rounded-3xl overflow-hidden card-shadow hover={`relative h-44 overflow-hidden ${p.image ? "bg-secondary"={p.image}
                      alt={p.imageAlt ?? p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover)))}
                      </span>
                    </div>
                  </>
                )}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-background/90 flex items-center justify-center hover="w-4 h-4" />
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-background/90 flex items-center justify-center hover="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-2 group-hover="text-sm text-muted-foreground leading-relaxed mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ y, scale={{ type, stiffness, damping="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-secondary text-secondary-foreground border border-border/40 hover))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity={{ opacity={{ once={{ duration, delay="text-center mt-12 text-muted-foreground"
        >
          ✦ Always learning. Always shipping. More projects coming soon.
        </motion.p>
      </div>
    </section>
  );
};
