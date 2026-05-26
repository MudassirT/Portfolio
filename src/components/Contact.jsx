import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Message sending failed.");
      }

      toast.success("Message sent! I'll reach out shortly.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error instanceof Error ? error.message : "Message sending failed.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">05 — Contact</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mt-3">
            Let's build something <span className="gradient-text">together</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, label: "Email", value: "mudassirahmedmuhammadtariq@gmail.com" },
              { icon: MapPin, label: "Location", value: "Karachi, Pakistan" },
              { icon: Linkedin, label: "LinkedIn", value: "/in/mudassir-tariq-465102370" },
              { icon: Github, label: "GitHub", value: "@MudassirT" },
            ].map((item) => (
              <div
                key={item.label}
                className={`glass rounded-2xl ${item.label === "Email" ? "p-6 md:p-5" : "p-4"} flex items-center gap-4 hover:elegant-shadow transition-all`}
              >
                <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{item.label}</div>
                  <div className="font-medium text-sm break-all">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={onSubmit}
            className="md:col-span-3 glass rounded-3xl p-6 sm:p-8 space-y-5 elegant-shadow"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl gradient-bg text-primary-foreground font-medium elegant-shadow hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:pointer-events-none"
            >
              {isSending ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="border-t border-border/40 py-8">
    <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} Mudassir Ahmed. Crafted with ✦ React & AI.</p>
      <p className="font-mono text-xs">Built with MERN · Tailwind · Framer Motion</p>
    </div>
  </footer>
);
