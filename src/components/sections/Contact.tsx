import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";

const Contact = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [form, setForm]         = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSending(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.message || "Message sending failed.");
      }

      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      try {
        const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: form.name,
              reply_to:  form.email,
              email:     form.email,
              message:   form.message,
            },
            publicKey,
          );

          toast.success("Message sent! I'll get back to you soon.");
          setForm({ name: "", email: "", message: "" });
          return;
        }
      } catch (emailError) {
        console.error("EmailJS fallback failed", emailError);
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-primary/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div
          ref={ref}
          className={`max-w-xl mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="font-mono text-xs text-primary mb-4 tracking-[0.2em] uppercase">
            // Contact
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-4">
            Let's Build{" "}
            <span className="shimmer-text bg-[length:200%_auto]">
              Something Great
            </span>
          </h2>
          <p className="text-muted-foreground text-base">
            Have a project, an opportunity, or just want to say hi? I'd love to
            hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-5 max-w-5xl">
          {/* ── Info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="md:col-span-2 space-y-3"
          >
            {[
              { icon: Mail,   label: "Email",    value: "hello@mudassirahmed.dev", href: "mailto:hello@mudassirahmed.dev" },
              { icon: MapPin, label: "Location", value: "Karachi, Pakistan" },
              { icon: Zap,    label: "Status",   value: "Open to opportunities" },
            ].map(c => (
              <div
                key={c.label}
                className="bento-card rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-0.5">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-sm font-medium hover:text-primary transition-colors truncate block"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="bento-card rounded-2xl p-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 mb-3">
                Find me on
              </p>
              <div className="flex gap-2">
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
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 transition-all duration-200"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Form ── */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
            className="md:col-span-3 bento-card rounded-2xl p-6 md:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
                  Name
                </label>
                <Input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-background/60 border-border focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
                  Email
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-background/60 border-border focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 block">
                Message
              </label>
              <Textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or opportunity..."
                rows={6}
                className="bg-background/60 border-border focus:border-primary/50 focus:ring-primary/20 rounded-xl resize-none transition-colors"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSending}
              className="w-full rounded-xl bg-primary text-primary-foreground font-display font-semibold hover:bg-primary/90 hover:shadow-[0_0_28px_hsl(var(--primary)/0.4)] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSending ? "Sending…" : "Send Message"}
              <Send className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
