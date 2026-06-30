import { useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: Props) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => onComplete(), 3400);
    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-700 ${
        phase >= 3 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 mesh-bg opacity-60" />

      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated logo MA */}
        <div className="relative">
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary-glow blur-2xl transition-all duration-1000 ${phase >= 1 ? "scale-150 opacity-80" : "scale-100 opacity-40"}`} />

          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            className="relative"
          >
            <defs>
              <linearGradient id="introGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="url(#introGrad)"
              strokeWidth="2"
              strokeDasharray="465"
              strokeDashoffset={phase >= 1 ? "0" : "465"}
              style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
            />
            <text
              x="80"
              y="100"
              textAnchor="middle"
              fontSize="56"
              fontWeight="700"
              fill="url(#introGrad)"
              fontFamily="Space Grotesk"
              className={`transition-all duration-700 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}
            >
              MA
            </text>
          </svg>
        </div>

        {/* Name reveal */}
        <div className="overflow-hidden">
          <h1
            className={`text-2xl md:text-3xl font-bold tracking-wide gradient-text transition-all duration-700 ${
              phase >= 2 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            MUDASSIR AHMED
          </h1>
        </div>
        <div className="overflow-hidden">
          <p
            className={`text-sm md:text-base font-mono text-muted-foreground tracking-[0.3em] uppercase transition-all duration-700 delay-100 ${
              phase >= 2 ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            Full Stack Developer
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-muted overflow-hidden rounded-full mt-4">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-glow"
            style={{
              width: phase >= 2 ? "100%" : phase >= 1 ? "60%" : "10%",
              transition: "width 1.5s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
