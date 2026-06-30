import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-display font-bold text-primary text-sm">
              MA
            </div>
            <span className="font-display font-bold text-sm">
              Mudassir<span className="gradient-text">.dev</span>
            </span>
          </div>

          {/* Caption */}
          <p className="text-xs font-mono text-muted-foreground/60 text-center">
            © {year} Mudassir Ahmed · Built with React, TypeScript &amp; AI
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {[
              { icon: Github,   href: "https://github.com/MudassirT",                         label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mudassir-tariq-465102370", label: "LinkedIn" },
              { icon: Mail,     href: "mailto:hello@mudassirahmed.dev",                       label: "Email" },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200"
              >
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}

            <a
              href="#home"
              className="ml-2 inline-flex items-center gap-1 text-xs font-mono text-muted-foreground/60 hover:text-primary transition-colors"
            >
              Back to top <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
