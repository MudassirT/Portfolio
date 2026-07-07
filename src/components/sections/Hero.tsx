import { useEffect, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/Profile1.jpg";

const roles = [
  "MERN Stack Developer",
  "AI Enthusiast",
  "Next.js Engineer",
  "DevOps Learner",
  "Problem Solver",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-muted-foreground">Available for opportunities</span>
            </div>

            <div className="space-y-3">
              <p className="text-lg text-muted-foreground font-mono">
                <span className="text-accent">&lt;</span>Hello, World<span className="text-accent">/&gt;</span> I'm
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Mudassir
                <br />
                <span className="gradient-text">Ahmed</span>
              </h1>
              <div className="flex items-center gap-2 text-xl md:text-2xl font-medium text-muted-foreground h-9">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>{text}</span>
                <span className="w-0.5 h-6 bg-primary animate-pulse" />
              </div>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              19-year-old BS Computer Science undergraduate crafting modern web experiences with the
              <span className="text-foreground font-semibold"> MERN stack</span>,
              <span className="text-foreground font-semibold"> Next.js</span>, and
              <span className="text-foreground font-semibold"> AI</span>. Passionate about building intelligent products that make a difference.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 shadow-elegant group">
                <a href="#projects">
                  View My Work
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full">
                <a href="#" download>
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Follow</span>
              <div className="h-px flex-1 max-w-[60px] bg-border" />
              <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com/MudassirT", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mudassir-tariq-465102370", label: "LinkedIn" },
                  { icon: Mail, href: "#contact", label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 hover:border-primary/50 transition-spring"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - portrait */}
          <div className="relative flex justify-center lg:justify-end animate-scale-in">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Spinning gradient ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary-glow animate-spin-slow opacity-70 blur-md" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-primary-glow" />

              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background animate-pulse-glow">
                <img
                  src={profileImg}
                  alt="Mudassir Ahmed - MERN Stack Developer"
                  width={768}
                  height={768}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating tech badges */}
              <div className="absolute -top-4 -right-2 glass rounded-2xl px-4 py-2 shadow-card animate-float font-mono text-sm">
                <span className="text-accent">⚛</span> React
              </div>
              <div className="absolute top-1/3 -left-8 glass rounded-2xl px-4 py-2 shadow-card animate-float font-mono text-sm" style={{ animationDelay: "1.5s" }}>
                <span className="gradient-text font-bold">{ }</span> Node.js
              </div>
              <div className="absolute -bottom-2 -right-6 glass rounded-2xl px-4 py-2 shadow-card animate-float font-mono text-sm" style={{ animationDelay: "3s" }}>
                <span className="text-primary">✦</span> AI/ML
              </div>
              <div className="absolute bottom-1/4 -left-12 glass rounded-2xl px-4 py-2 shadow-card animate-float font-mono text-sm" style={{ animationDelay: "2s" }}>
                <span className="text-accent">▲</span> Next.js
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          {[
            { value: "6+", label: "Projects Built" },
            { value: "3+", label: "Years Learning" },
            { value: "10+", label: "Technologies" },
            { value: "∞", label: "Cups of Chai" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
