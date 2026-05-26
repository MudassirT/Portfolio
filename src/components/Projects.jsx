import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import rockImage from "../assets/Rock.png";
import tic_tac_toe from "../assets/Tic-Tac-Toe.png";


type Project = {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  live: string;
  code: string;
  image?: string;
  imageAlt?: string;
};

const projects: Project[] = [
  {
    title: "Research AI Chatbot",
    description:
      "An intelligent research assistant chatbot that helps users explore topics, summarize sources, and answer complex questions with AI.",
    tags: ["Next.js", "OpenAI", "RAG", "TypeScript"],
    accent: "from-primary to-primary-glow",
    live: "#",
    code: "#",
    // image: "/images/projects/research-ai-chatbot.png",
    // imageAlt: "Research AI Chatbot preview",
  },
  {
    title: "FreshMart RAG Chatbot",
    description:
      "A RAG-powered shopping assistant integrated into the FreshMart e-commerce site, answering product and order questions in real time.",
    tags: ["RAG", "MERN", "Vector DB", "AI"],
    accent: "from-accent to-primary",
    live: "#",
    code: "#",
    // image: "/images/projects/freshmart-rag-chatbot.png",
    // imageAlt: "FreshMart chat experience",
  },
  {
    title: "Personal AI Assistant",
    description:
      "An agent that monitors my Emails, LinkedIn, and WhatsApp messages — surfacing what matters and helping me respond faster.",
    tags: ["Agentic AI", "Automation", "Node.js"],
    accent: "from-primary-glow to-accent",
    live: "#",
    code: "#",
    // image: "/images/projects/personal-ai-assistant.png",
    // imageAlt: "Personal AI assistant dashboard",
  },
  {
    title: "Notes Saving Web App",
    description:
      "A clean, fast notes app with full CRUD, authentication, and persistent cloud storage built on the MERN stack.",
    tags: ["MongoDB", "Express", "React", "Node"],
    accent: "from-primary to-accent",
    live: "#",
    code: "#",
    // image: "/images/projects/notes-saving-web-app.png",
    // imageAlt: "Notes app interface",
  },
  {
    title: "Tic Tac Toe Game",
    description:
      "A polished, animated Tic Tac Toe with smart move detection and a satisfying win/draw experience.",
    tags: ["React", "Tailwind", "Game Logic"],
    accent: "from-accent to-primary-glow",
    live: "https://tic-tac-toe-game-phi-sooty.vercel.app/",
    code: "https://github.com/MudassirT/Tic-Tac-Toe_Game",
    image: tic_tac_toe,
    imageAlt: "Tic Tac Toe game board",
  },
  {
    title: "Rock Paper Scissors",
    description:
      "Classic Rock Paper Scissors reimagined with delightful micro-interactions and score tracking.",
    tags: ["React", "Animation", "UI/UX"],
    accent: "from-primary-glow to-primary",
    live: "https://rock-paper-scissors-mudassirahmed.vercel.app/",
    code: "https://github.com/MudassirT/Rock-Paper-Sicssors",
    image: rockImage,
    // imageAlt: "Rock Paper Scissors game UI",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="relative py-28">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">04 — Projects</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mt-3">
            Selected <span className="gradient-text">work</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A glimpse into what I've been building — from AI chatbots to full-stack web apps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group relative glass rounded-3xl overflow-hidden card-shadow hover:elegant-shadow transition-all duration-500 hover:-translate-y-2"
            >
              {/* Visual header */}
              <div className={`relative h-44 overflow-hidden ${p.image ? "bg-secondary" : `bg-gradient-to-br ${p.accent}`}`}>
                {p.image ? (
                  <>
                    <img
                      src={p.image}
                      alt={p.imageAlt ?? p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/20" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 grid-pattern opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-bold text-7xl text-primary-foreground/20 select-none group-hover:scale-125 group-hover:rotate-6 transition-transform duration-700">
                        {p.title.charAt(0)}
                      </span>
                    </div>
                  </>
                )}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-background/90 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-background/90 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-2 group-hover:gradient-text transition-all">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ y: -2, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full bg-secondary text-secondary-foreground border border-border/40 hover:border-primary/60 hover:text-primary transition-all duration-300"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-muted-foreground"
        >
          ✦ Always learning. Always shipping. More projects coming soon.
        </motion.p>
      </div>
    </section>
  );
};
