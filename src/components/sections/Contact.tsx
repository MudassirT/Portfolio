import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Github, Linkedin, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useReveal } from "@/hooks/use-reveal";

const Contact = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: form.name,
              reply_to: form.email,
              email: form.email,
              message: form.message,
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

      toast.error(error instanceof Error ? error.message : "Something went wrong while sending your message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={ref} className={`max-w-2xl mx-auto text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="font-mono text-sm text-primary mb-3 tracking-widest uppercase">// Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build <span className="gradient-text">Something Great</span>
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind, an opportunity, or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6">
          {/* Info side */}
          <div className="md:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@mudassirahmed.dev", href: "mailto:hello@mudassirahmed.dev" },
              { icon: MapPin, label: "Location", value: "Karachi, Pakistan" },
              { icon: Phone, label: "Status", value: "Open to opportunities" },
            ].map((c) => (
              <div key={c.label} className="group glass rounded-2xl p-5 flex items-center gap-4 hover-lift relative overflow-hidden border border-border/30 group-hover:border-primary/50 transition-all duration-300">
                {/* Ambient hover glow gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex items-center gap-4 w-full min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-smooth break-all"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Find me on</p>
              <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com/MudassirT", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mudassir-tariq-465102370", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:hello@mudassirahmed.dev", label: "Email" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-xl border border-border/60 bg-background/50 text-foreground hover:border-primary hover:text-primary hover:bg-primary/10 hover:scale-110 transition-spring flex items-center justify-center"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="md:col-span-3 glass rounded-2xl p-6 md:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-background/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-background/50"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or opportunity..."
                rows={6}
                className="bg-background/50 resize-none"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSending}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 shadow-elegant group disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSending ? "Sending..." : "Send Message"}
              <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
