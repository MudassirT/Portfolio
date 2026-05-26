import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import rockImage from "../assets/Rock.png";
import tic_tac_toe from "../assets/Tic-Tac-Toe.png";

const projects = [
  {
    title: "AI Research Assistant",
    description: "A knowledge-driven chatbot that summarizes sources and answers complex questions with AI.",
    tags: ["OpenAI", "RAG", "TypeScript"],
    accent: "bg-primary/10 text-primary",
    live: "#",
    code: "#",
    image: rockImage,
    imageAlt: "AI Research Assistant",
  },
  {
    title: "MERN Support Bot",
    description: "A customer support assistant for product and order questions in real time.",
    tags: ["MERN", "Vector DB", "AI"],
    accent: "bg-secondary/10 text-secondary",
    live: "#",
    code: "#",
  },
  {
    title: "Chat Automation",
    description: "An automation dashboard for LinkedIn and WhatsApp responses with smart message suggestions.",
    tags: ["Automation", "Node.js"],
    accent: "bg-accent/10 text-accent",
    live: "#",
    code: "#",
  },
  {
    title: "Note Keeper",
    description: "A fast notes app with full CRUD, auth, and persistent cloud storage built on the MERN stack.",
    tags: ["Express", "React", "Node"],
    accent: "bg-muted/10 text-muted-foreground",
    live: "#",
    code: "#",
  },
  {
    title: "Tic Tac Toe",
    description: "A polished Tic Tac Toe game with smart move detection and animated gameplay.",
    tags: ["Tailwind", "Game Logic"],
    accent: "bg-primary/10 text-primary",
    live: "#",
    code: "#",
    image: tic_tac_toe,
    imageAlt: "Tic Tac Toe game",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="relative py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            04 — Projects
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl">Work</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A glimpse into what I've been building — from AI chatbots to full-stack web apps.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-3xl border border-border/60 bg-muted/70 overflow-hidden"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-56 w-full bg-slate-800" />
              )}

              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full bg-secondary text-secondary-foreground border border-border/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex gap-3">
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-primary transition hover:bg-background"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-primary transition hover:bg-background"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-12 text-muted-foreground"
        >
          ✦ Always learning. Always shipping. More projects coming soon.
        </motion.p>
      </div>
    </section>
  );
};
