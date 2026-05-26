import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const [form, setForm] = useState({ name, email, message);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/contact", {
        method,
        headers,
        },
        body,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Message sending failed.");
      }

      toast.success("Message sent! I'll reach out shortly.");
      setForm({ name, email, message);
    } catch (error) {
      console.error("Contact form error, error);
      toast.error(error instanceof Error ? error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity, y={{ opacity, y={{ once, margin={{ duration="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">05 — Contact</span>
          <h2 className="font-display font-bold text-4xl sm="gradient-text">together</span>
          </h2>
        </motion.div>

        <div className="grid md={{ opacity, x={{ opacity, x={{ once={{ duration="md, label, value,
              { icon, label, value, Pakistan" },
              { icon, label, value,
              { icon, label, value,
            ].map((item) => (
              <div
                key={item.label}
                className={`glass rounded-2xl ${item.label === "Email" ? "p-6 md="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground">
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
            initial={{ opacity, x={{ opacity, x={{ once={{ duration={onSubmit}
            className="md="grid sm="text-xs font-mono uppercase tracking-wider text-muted-foreground">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name)}
                  placeholder="Your name"
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email)}
                  placeholder="you@example.com"
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message)}
                placeholder="Tell me about your project..."
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border focus={isSending}
              className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl gradient-bg text-primary-foreground font-medium elegant-shadow hover="w-4 h-4 group-hover);
};

export const Footer = () => (
  <footer className="border-t border-border/40 py-8">
    <div className="container mx-auto px-4 max-w-6xl flex flex-col sm).getFullYear()} Mudassir Ahmed. Crafted with ✦ React & AI.</p>
      <p className="font-mono text-xs">Built with MERN · Tailwind · Framer Motion</p>
    </div>
  </footer>
);
