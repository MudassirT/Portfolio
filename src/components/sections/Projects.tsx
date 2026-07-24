import { ExternalLink, Github, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const projects = [
  {
    title: "Research AI Chatbot",
    description:
      "An intelligent AI chatbot designed for in-depth research, capable of analyzing topics, citing sources, and generating structured insights.",
    tags: ["Next.js", "OpenAI", "Tailwind", "TypeScript"],
    accent: "from-primary to-primary-glow",
    emoji: "🔬",
    featured: true,
    live: "#",
    code: "https://github.com/MudassirT",
  },
  {
    title: "RAG Chatbot — FreshMart",
    description:
      "Retrieval-Augmented Generation chatbot integrated into an e-commerce experience to help customers quickly find products and answers.",
    tags: ["RAG", "Python", "LangChain", "MERN"],
    accent: "from-accent to-primary",
    emoji: "🛒",
    featured: true,
    live: "#",
    code: "https://github.com/MudassirT",
  },
  {
    title: "AI Personal Assistant",
    description:
      "An AI assistant that monitors emails, LinkedIn messages, and WhatsApp chats — surfacing what matters most with minimal effort.",
    tags: ["Agentic AI", "Node.js", "APIs", "Automation"],
    accent: "from-primary-glow to-accent",
    emoji: "🤖",
    featured: true,
    live: "#",
    code: "https://github.com/MudassirT",
  },
  {
    title: "Notes Saving Website",
    description:
      "A full-stack note-taking app with authentication, CRUD, and a polished responsive UI built with the MERN stack.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    accent: "from-primary to-accent",
    emoji: "📝",
    live: "https://paste-hub-opal.vercel.app/",
    code: "https://github.com/MudassirT/Paste-Hub",
  },
  {
    title: "Tic Tac Toe Game",
    description:
      "A classic game with responsive design, smooth animations, and reliable win detection for a polished interactive experience.",
    tags: ["React", "Tailwind", "Game Logic"],
    accent: "from-accent to-primary-glow",
    emoji: "🎮",
    live: "https://tic-tac-toe-blond-eight-45.vercel.app/",
    code: "https://github.com/MudassirT/Tic-Tac-Toe_Game",
  },
  {
    title: "Rock Paper Scissors",
    description:
      "An interactive browser game featuring score tracking and playful motion design built with JavaScript and CSS.",
    tags: ["JavaScript", "CSS", "DOM"],
    accent: "from-primary-glow to-primary",
    emoji: "✊",
    live: "https://rock-paper-scissors-xi-henna.vercel.app/",
    code: "https://github.com/MudassirT/Rock-Paper-Sicssors",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-30" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground">
            A selection of things I've built — always learning, always shipping.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, delay }: { project: typeof projects[0]; delay: number }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className={`group relative glass rounded-2xl overflow-hidden hover-lift transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Header visual */}
      <div className={`relative h-44 bg-gradient-to-br ${project.accent} overflow-hidden`}>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-125 group-hover:rotate-12 transition-spring duration-500">
          {project.emoji}
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-semibold">
            <Sparkles className="h-3 w-3 text-primary" />
            Featured
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-smooth">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 min-h-[60px]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-mono">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <a
            href={project.live}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-medium hover:opacity-90 hover:scale-[1.02] transition-spring shadow-elegant"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </a>
          <a
            href={project.code}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/70 hover:scale-[1.02] transition-spring"
          >
            <Github className="h-3.5 w-3.5" />
            Code
          </a>
        </div>
      </div>
    </article>
  );
};

export default Projects;
