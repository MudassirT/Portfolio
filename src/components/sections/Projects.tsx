import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const projects = [
  {
    title: "Research AI Chatbot",
    description:
      "An intelligent AI chatbot designed for in-depth research, capable of analyzing topics, citing sources, and generating structured insights.",
    tags: ["Next.js", "OpenAI", "TypeScript"],
    emoji: "🔬",
    featured: true,
    live: "#",
    code: "https://github.com/MudassirT",
  },
  {
    title: "RAG Chatbot — FreshMart",
    description:
      "Retrieval-Augmented Generation chatbot integrated into e-commerce to help customers quickly find products and answers.",
    tags: ["RAG", "Python", "LangChain"],
    emoji: "🛒",
    featured: false,
    live: "#",
    code: "https://github.com/MudassirT",
  },
  {
    title: "AI Personal Assistant",
    description:
      "An AI assistant that monitors emails, LinkedIn, and WhatsApp — surfacing what matters most with minimal effort.",
    tags: ["Agentic AI", "Node.js", "APIs"],
    emoji: "🤖",
    featured: false,
    live: "#",
    code: "https://github.com/MudassirT",
  },
  {
    title: "Notes Saving Website",
    description:
      "Full-stack note-taking app with auth, CRUD, and polished responsive UI built with the MERN stack.",
    tags: ["MongoDB", "Express", "React"],
    emoji: "📝",
    live: "#",
    code: "https://github.com/MudassirT",
  },
  {
    title: "Tic Tac Toe Game",
    description:
      "Classic game with responsive design, smooth animations, and reliable win detection.",
    tags: ["React", "Tailwind"],
    emoji: "🎮",
    live: "#",
    code: "https://github.com/MudassirT",
  },
  {
    title: "Rock Paper Scissors",
    description:
      "Interactive browser game featuring score tracking and playful motion design.",
    tags: ["JavaScript", "CSS"],
    emoji: "✊",
    live: "#",
    code: "https://github.com/MudassirT",
  },
];

/* Featured card (large) */
const FeaturedCard = ({ project }: { project: typeof projects[0] }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className={`group bento-card rounded-2xl overflow-hidden md:col-span-2 md:row-span-2 flex flex-col transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Visual header */}
      <div className="relative h-52 md:h-64 bg-gradient-to-br from-emerald-950/80 via-[hsl(var(--card))] to-teal-950/40 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/[0.12] blur-3xl rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
          {project.emoji}
        </div>

        {/* FEATURED label */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/15 border border-primary/25 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-primary font-medium tracking-wide">Featured Project</span>
        </div>

        {/* Link arrow */}
        <a
          href={project.live}
          aria-label={`Open ${project.title}`}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-background/50 backdrop-blur border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
        >
          <ArrowUpRight className="w-4 h-4" />
        </a>

        {/* Fade to card */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-primary/8 text-primary font-mono border border-primary/15">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <a
            href={project.live}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-display font-semibold hover:bg-primary/90 hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)] transition-all duration-300"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Live Demo
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-muted-foreground text-sm hover:text-foreground hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </a>
        </div>
      </div>
    </article>
  );
};

/* Regular card (compact) */
const ProjectCard = ({
  project,
  delay = 0,
}: {
  project: typeof projects[0];
  delay?: number;
}) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <article
      ref={ref}
      className={`group bento-card rounded-2xl overflow-hidden flex flex-col transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Mini header */}
      <div className="relative h-28 bg-gradient-to-br from-emerald-950/60 via-card to-teal-950/30 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-400">
          {project.emoji}
        </div>
        <a
          href={project.live}
          aria-label={`Open ${project.title}`}
          className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-background/50 backdrop-blur border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
        >
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/50 text-muted-foreground font-mono border border-border/70">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-1.5">
          <a
            href={project.live}
            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-xs font-display font-semibold hover:bg-primary/15 transition-all duration-200"
          >
            Demo
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-xs hover:border-primary/30 hover:text-foreground transition-all duration-200"
          >
            <Github className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-40" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div
          ref={ref}
          className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-mono text-xs text-primary mb-4 tracking-[0.2em] uppercase">
            // Projects
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight">
              Featured{" "}
              <span className="shimmer-text bg-[length:200%_auto]">Work</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              A selection of things I've built — always learning, always shipping.
            </p>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        {/* Layout:
            Row 1+2: [Featured col-span-2 row-span-2] | [Card] stacked 2x
            Row 3:   [Card] [Card] [Card]
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Featured — large */}
          <FeaturedCard project={featured} />

          {/* Medium stack — right column */}
          {rest.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 80} />
          ))}

          {/* Bottom row — 3 equal */}
          {rest.slice(2).map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={(i + 2) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
